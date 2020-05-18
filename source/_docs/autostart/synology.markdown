---
title: "Autostart on Synology NAS boot"
description: "Instructions on how to setup Home Assistant to launch on boot on Synology NAS."
redirect_from: /getting-started/autostart-synology/
---

To get Home Assistant to automatically start when you boot your Synology NAS:

SSH into your Synology & login as admin or root

```bash
$ cd /volume1/homeassistant
```

Create "homeassistant.conf" file using the following code

```bash
# only start this service after the httpd user process has started
start on started httpd-user

# stop the service gracefully if the runlevel changes to 'reboot'
stop on runlevel [06]

# run the scripts as the 'http' user. Running as root (the default) is a bad ide
#setuid admin

# exec the process. Use fully formed path names so that there is no reliance on
# the 'www' file is a node.js script which starts the foobar application.
exec /bin/sh /volume1/homeassistant/hass-daemon start
```

Register the autostart

```bash
ln -s homeassistant.conf /etc/init/homeassistant.conf
```

Make the relevant files executable:

```bash
chmod -r 777 /etc/init/homeassistant.conf
```

That's it - reboot your NAS and Home Assistant should automatically start
