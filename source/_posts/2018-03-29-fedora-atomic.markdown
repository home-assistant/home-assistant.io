---
title: "Using Fedora Atomic with Home Assistant"
description: "Running Home Assistant on a Fedora Atomic host."
date: 2018-03-29 22:00:00
date_formatted: "March 29, 2018"
author: Fabian Affolter
author_twitter: fabaff
categories: Announcements
og_image: /images/blog/2018-03-fedora-atomic/social.png
---


The Hackerspace [Eastermundigen](http://www.eastermundigen.ch/) is often my real-world playground for Home Assistant-related topics which sometimes more belong in the industrial automation area than in a home. Also, it gives me access to devices which I don't have like 3D printers, laser cutters, connected power strips and a like. In the past the local Home Assistant instance there was running on an old [CubieBoard2](http://cubieboard.org/) with [Fedora ARM](https://arm.fedoraproject.org/). It was one of several systems which were running 24/7. To reduce the electricity costs we decided to consolidate the physical systems to only two. One for storage and one for all other services.

<!--more-->

This blog post contains the details of the setup. They may be useful for others as well. Our new system is running Fedora 27 from [Project Atomic](http://www.projectatomic.io). We will not cover the setup of an Atomic host and the details of Project Atomic itself. For more details, have a look at [Benjamin Affolter](https://twitter.com/bliemli)'s [blog post](https://www.puzzle.ch/blog/articles/2017/09/28/atomic-host-basic-setup-and-usage) which also covers some of the basics. 

The installation process of an Atomic host is pretty much the same as for Fedora Server or Fedora Workstation. Either create a Live USB device or use PXE to get the installation going. E.g., lauch iPXE and chainload [netboot.yxz](https://netboot.xyz/) with `chain --autofree https://boot.netboot.xyz`. Then let `anaconda` guide you through the setup.

After the first boot, copy the SSH keys, use `visudo` to add users and perform the usual steps you do for a new system. We only allow SSH with keys, are enforcing the usage of `sudo`, need special network settings and a couple of other things. But those configuration settings are irrelevant for a setup in a local network.

If the system is up and running then check if you are using the latest release. 

```bash
$ sudo atomic host status
State: idle; auto updates disabled
Deployments:
● ostree://fedora-atomic:fedora/27/x86_64/atomic-host
                   Version: 27.100 (2018-03-13 17:19:44)
                    Commit: 326f62b93a5cc836c97d31e73a71b6b6b6955c0f225f7651b52a693718e6aa91
              GPGSignature: Valid signature by 860E19B0AFA800A1751881A6F55E7430F5282EE4
```

The release is 27.100. The latest is 27.105. So, let's update the host and reboot it.

```bash
sudo atomic host upgrade
sudo systemctl reboot
```

You can also see that Docker is already running. No installation needed.

```bash
$ sudo systemctl status docker
● docker.service - Docker Application Container Engine
   Loaded: loaded (/usr/lib/systemd/system/docker.service; enabled; vendor preset: disabled)
   Active: active (running) since Thu 2018-03-28 15:44:04 CEST; 35min ago
...
```

Further we will cover how it works for Home Assistant and [Mosquitto](https://mosquitto.org/). For a small setup using [kubernetes](https://kubernetes.io) seems a bit overkill. Thus, we decided to stick to `systemd`.

Instead of `docker` we can use the command-line tool [`atomic`](http://www.projectatomic.io/docs/usr-bin-atomic/) to perform a lot of tasks. Download the images for the containers. We are pulling the images from [Docker Hub](https://hub.docker.com/), thus we need to add the registry to use.

```bash
sudo atomic install docker.io/​homeassistant/home-assistant
sudo atomic install docker.io/eclipse-mosquitto
```

Both containers need additional directories for persistent storage.

```bash
sudo mkdir -p /opt/home-assistant
sudo mkdir -p /opt/mosquitto/{config,data,log}
```

We need a copy of `mosquitto.conf` to run Mosquitto later:

```bash
sudo curl -o /opt/mosquitto/config/mosquitto.conf \
  https://raw.githubusercontent.com/eclipse/mosquitto/master/mosquitto.conf
```

To handle the containers we created service unit files for the [Home Assistant](https://hub.docker.com/r/homeassistant/home-assistant/) and the [Mosquitto](https://hub.docker.com/_/eclipse-mosquitto/) container. For Home Assistant and Mosquitto the file can looks like the sample below. Further details about the `ExecStart` line can be found in the documentation about a [Docker](/docs/installation/docker/) setup. For Home Assistant

```bash
$ su
# cat <<'EOF' >> /etc/systemd/system/home-assistant.service
[Unit]
Description=Home Assistant
Requires=docker.service
Wants=docker.service
After=docker.service
 
[Service]
Restart=on-failure
RestartSec=10
ExecStart=/usr/bin/docker run --rm --name %p -v /opt/home-assistant:/config:Z -v /etc/localtime:/etc/localtime:ro --network host homeassistant/home-assistant
ExecStop=-/usr/bin/docker stop -t 30 %p
 
[Install]
WantedBy=multi-user.target
EOF
```

and for Mosquitto.

```bash
# cat <<'EOF' >> /etc/systemd/system/mosquitto.service
[Unit]
Description=Mosquitto MQTT docker container
Requires=docker.service
Wants=docker.service
After=docker.service

[Service]
Restart=on-failure
RestartSec=10
ExecStart=/usr/bin/docker run --name %p -v mosquitto.conf:/opt/mosquitto/config/mosquitto.conf -v /opt/mosquitto/data:/opt/mosquitto/data -v /opt/mosquitto/log:/mosquitto/log -p 1883:1883 -p 9001:9001 eclipse-mosquitto
ExecStop=/usr/bin/docker stop -t 2 %p
ExecStopPost=/usr/bin/docker rm -f %p

[Install]
WantedBy=multi-user.target
EOF
```

Exit to be not longer `root`.

```bash
# exit
```

Reload `systemd` to make it aware of the new configurations.

```bash
sudo systemctl daemon-reload
```

Now, both container can be controlled by `systemctl`.

```bash
sudo systemctl enable home-assistant.service --now
sudo systemctl enable mosquitto.service --now
```

Check with `$ sudo systemctl status [name].service` if there are error or the services are running.

The deployment of [NGINX](https://nginx.org/en/) as webserver for static content, [grafana](https://grafana.com/) and [InfluxBD](https://www.influxdata.com/) works the same way as for Home Assistant and Mosquitto. To get a proper [traefik](https://traefik.io/) setup additional reading and work is required. 

