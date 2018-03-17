---
layout: page
title: "Autostart using systemd"
description: "Instructions on how to setup Home Assistant to launch on boot using systemd."
date: 2015-9-1 22:57
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/autostart-systemd/
---

Newer Linux distributions are trending towards using `systemd` for managing daemons. Typically, systems based on Fedora, ArchLinux, or Debian (8 or later) use `systemd`. This includes Ubuntu releases including and after 15.04, CentOS, and Red Hat. If you are unsure if your system is using `systemd`, you may check with the following command:

```bash
$ ps -p 1 -o comm=
```

If the preceding command returns the string `systemd`, continue with the instructions below.

A service file is needed to control Home Assistant with `systemd`. The template below should be created using a text editor. Note, root permissions via `sudo` will likely be needed. The following should be noted to modify the template:

- `ExecStart` contains the path to `hass` and this may vary. Check with `whereis hass` for the location.
- For most systems, the file is `/etc/systemd/system/home-assistant@[your user].service` with [your user] replaced by the user account that Home Assistant will run as (normally `homeassistant`).  In particular, this is the case for Ubuntu 16.04. 
- If unfamiliar with command-line text editors, `sudo nano -w [filename]` can be used with `[filename]` replaced with the full path to the file.  Ex. `sudo nano -w /etc/systemd/system/home-assistant@[your user].service`.  After text entered, press CTRL-X then press Y to save and exit.
- If you're running Home Assistant in a Python virtual environment or a Docker container, please skip to the appropriate template listed below.

```
[Unit]
Description=Home Assistant
After=network-online.target

[Service]
Type=simple
User=%i
ExecStart=/usr/bin/hass

[Install]
WantedBy=multi-user.target
```

### {% linkable_title Python virtual environment %}

If you've setup Home Assistant in `virtualenv` following our [Python installation guide](https://home-assistant.io/getting-started/installation-virtualenv/) or [manual installation guide for Raspberry Pi](https://home-assistant.io/getting-started/installation-raspberry-pi/), the following template should work for you. If Home Assistant install is not located at `/srv/homeassistant`, please modify the `ExecStart=` line appropriately.

```
[Unit]
Description=Home Assistant
After=network-online.target

[Service]
Type=simple
User=%i
ExecStart=/srv/homeassistant/bin/hass -c "/home/homeassistant/.homeassistant"

[Install]
WantedBy=multi-user.target
```

### {% linkable_title Docker %}

If you want to use Docker, the following template should work for you.

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

### Next Steps

You need to reload `systemd` to make the daemon aware of the new configuration. 

```bash
$ sudo systemctl --system daemon-reload
```

To have Home Assistant start automatically at boot, enable the service.

```bash
$ sudo systemctl enable home-assistant@[your user]
```

To disable the automatic start, use this command.

```bash
$ sudo systemctl disable home-assistant@[your user]
```

To start Home Assistant now, use this command.
```bash
$ sudo systemctl start home-assistant@[your user]
```

You can also substitute the `start` above with `stop` to stop Home Assistant, `restart` to restart Home Assistant, and 'status' to see a brief status report as seen below.

```bash
$ sudo systemctl status home-assistant@[your user]
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
$ sudo journalctl -f -u home-assistant@[your user]
```

Because the log can scroll quite quickly, you can select to view only the error lines:
```bash
$ sudo journalctl -f -u home-assistant@[your user] | grep -i 'error'
```

When working on Home Assistant, you can easily restart the system and then watch the log output by combining the above commands using `&&`

```bash
$ sudo systemctl restart home-assistant@[your user] && sudo journalctl -f -u home-assistant@[your user]
```

