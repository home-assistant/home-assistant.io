---
layout: page
title: "Autostart using Upstart"
description: "Instructions how to setup Home Assistant to launch on boot using Upstart."
date: 2015-9-1 22:57
sidebar: true
comments: false
sharing: true
footer: true
---

Many linux distributions use the Upstart system (or similar) for managing daemons. Typically, systems based on Debian 7 or previous use Upstart. This includes Ubuntu releases before 15.04. If you are unsure if your system is using Upstart, you may check with the following command:

```bash
$ ps -p 1 -o comm=
```

If the preceding command returns the string `init`, you are likely using Upstart.

Upstart will launch init scripts that are located in the directory `/etc/init.d/`. A sample init script for systems using Upstart is <a href="https://raw.githubusercontent.com/balloob/home-assistant/dev/script/hass-daemon">maintained by this project</a>.

To install this script, download it, tweak it to you liking, and install it by following the directions in the header. This script will setup Home Assistant to run when the system boots. To start/stop Home Assistant manually, issue the following commands:

```bash
$ sudo service hass-daemon start
$ sudo service hass-daemon stop
```

When running Home Assistant with this script, the configuration directory will be located at `/var/opt/homeassistant`. This directory will contain a verbose log rather than simply an error log.

When running daemons, it is good practice to have the daemon run under its own user name rather than the default user's name. Instructions for setting this up are outside the scope of this document.
