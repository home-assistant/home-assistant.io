---
layout: page
title: "Autostart using an init script"
description: "Instructions how to setup Home Assistant to launch on boot using an init script."
date: 2015-9-1 22:57
sidebar: true
comments: false
sharing: true
footer: true
---

At bootup, `init` will launch scripts that are located in the directory `/etc/init.d/`. A sample init script is included in the <a href="https://github.com/home-assistant/home-assistant/blob/dev/script/hass-daemon">Home Assistant code repository</a>.

To install this script, download it, tweak it to you liking, and install it by following the directions in the header. This script will setup Home Assistant to run when the system boots. To make sure the daemon runs at the run levels specified in the header of the script, run the following command:

```bash
$ sudo update-rc.d hass-daemon defaults
```

This will create the appropriate symlinks in the `/etc/rc${runlevel}.d/` directories on Debian based systems. For Red Hat derivatives, use `chkconfig` instead:

```bash
$ sudo chkconfig --add hass-daemon
```

To start/stop Home Assistant manually, issue the following commands:

```bash
$ sudo service hass-daemon start
$ sudo service hass-daemon stop
```

When running Home Assistant with this script, the configuration directory will be located at `/var/opt/homeassistant`. This directory will contain a verbose log rather than simply an error log.

When running daemons, it is good practice to have the daemon run under its own user name rather than the default user's name. Instructions for setting this up are outside the scope of this document.
