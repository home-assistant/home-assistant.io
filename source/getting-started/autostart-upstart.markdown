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

Many linux distributions use the <a href="http://upstart.ubuntu.com/cookbook/" target="_blank">Upstart</a> system (or similar) for managing daemons. Typically, systems based on Debian 7 or previous use Upstart. This includes Ubuntu releases before 15.04. If you are unsure if your system is using Upstart, you may check with the following command:

```bash
$ ps -p 1 -o comm=
```

If the preceding command returns the string `init`, you are likely using Upstart. Just to be really sure, request the Upstart version with:

```bash
$ init --version
```

The output should mention something similar to `init (upstart 1.12.1)`. If it doesn't, you're dealing with a traditional (SysV-style) init system and you should follow [these instructions](/getting-started/autostart-init).

Upstart will use configuration files in `/etc/init/`. A sample Upstart configuration is included in the <a href="https://github.com/home-assistant/home-assistant/blob/dev/script/hass.conf">Home Assistant source code</a>.

Installation
-------------
Create a file named `/etc/init/hass.conf` with the following contents:

```
description "Home Assistant"

start on runlevel [2345]
stop on runlevel [016]

setuid hass

# change paths according to your situation:
exec /srv/hass/bin/python3 /srv/hass/bin/hass -c /home/hass/homeassistant --pid-file /home/hass/homeassistant/hass.pid
```

Be sure to check the paths in the last line. That is where it all gets toghether. That's it! From now on, Upstart will make sure Home Assistant is started at boot and stopped when shutting down the system. To start Home Assistent manually, use:

```bash
$ sudo start hass
```

Likewise for stopping and, important when tweaking your Home Assistant configuration, restarting:

```
$ sudo stop hass
$ sudo restart hass
```
