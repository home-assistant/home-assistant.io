---
layout: page
title: "Autostart using systemd"
description: "Instructions how to setup Home Assistant to launch on boot using systemd."
date: 2015-9-1 22:57
sidebar: true
comments: false
sharing: true
footer: true
---

Newer linux distributions are trending towards using `systemd` for managing daemons. Typically, systems based on Fedora, ArchLinux, or Debian (8 or later) use `systemd`. This includes Ubuntu releases including and after 15.04, CentOS, and Red Hat. If you are unsure if your system is using `systemd`, you may check with the following command:

```bash
$ ps -p 1 -o comm=
```

If the preceding command returns the string `systemd`, you are likely using `systemd`.

If you want Home Assistant to be launched automatically, an extra step is needed to setup `systemd`. You need a service file to control Home Assistant with `systemd`. If you are using a Raspberry Pi with Raspbian then replace the `[your user]` with `pi` otherwise use your user you want to run Home Assistant. `ExecStart` contains the path to `hass` and this may vary. Check with `whereis hass` for the location.

```bash
$ su -c 'cat <<EOF >> /etc/systemd/system/home-assistant@[your user].service
[Unit]
Description=Home Assistant
After=network.target

[Service]
Type=simple
User=%i
ExecStart=/usr/bin/hass

[Install]
WantedBy=multi-user.target
EOF'
```

If you've setup Home Assistant in `virtualenv` following our [manual installation guide](https://home-assistant.io/getting-started/installation-raspberry-pi/), the following template should work for you.

```
[Unit]
Description=Home Assistant
After=network.target

[Service]
Type=simple
User=homeassistant
#make sure the virtualenv python binary is used
Environment=VIRTUAL_ENV="/srv/homeassistant/homeassistant_venv"
Environment=PATH="$VIRTUAL_ENV/bin:$PATH"
ExecStart=/srv/homeassistant/homeassistant_venv/bin/hass -c "/home/homeassistant/.homeassistant"

[Install]
WantedBy=multi-user.target
```

If you want to use docker, the following template should work for you.

```
[Unit]
Description=Home Assistant
Requires=docker.service
After=docker.service

[Service]
Restart=always
RestartSec=3
ExecStart=/usr/bin/docker run --name="home-assistant-%i" -v /home/%i/.homeassistant/:/config -v /etc/localtime:/etc/localtime:ro --net=host homeassistant/home-assistant
ExecStop=/usr/bin/docker stop -t 2 home-assistant-%i
ExecStopPost=/usr/bin/docker rm -f home-assistant-%i

[Install]
WantedBy=multi-user.target
```

You need to reload `systemd` to make the daemon aware of the new configuration. Enable and launch Home Assistant after that.

```bash
$ sudo systemctl --system daemon-reload
$ sudo systemctl enable home-assistant@[your user]
$ sudo systemctl start home-assistant@[your user]
```

If everything went well, `sudo systemctl start home-assistant@[your user]` should give you a positive feedback.

```bash
$ sudo systemctl status home-assistant@[your user] -l
● home-assistant@fab.service - Home Assistant for [your user]
   Loaded: loaded (/etc/systemd/system/home-assistant@[your user].service; enabled; vendor preset: disabled)
   Active: active (running) since Sat 2016-03-26 12:26:06 CET; 13min ago
 Main PID: 30422 (hass)
   CGroup: /system.slice/system-home\x2dassistant.slice/home-assistant@[your user].service
           ├─30422 /usr/bin/python3 /usr/bin/hass
           └─30426 /usr/bin/python3 /usr/bin/hass
[...]
```

To get Home Assistant's logging output, simple use `journalctl`.

```bash
$ journalctl -f -u home-assistant@[your user]
```

Because the log can scroll quite quickly, you might want to open a second terminal to view only the errors:
```bash
$ journalctl -f -u home-assistant@[your user] | grep -i 'error'
```
