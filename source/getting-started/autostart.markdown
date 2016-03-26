---
layout: page
title: "Launch Home Assistant on boot"
description: "Instructions how to setup Home Assistant to launch on boot on various platforms."
date: 2015-9-1 22:57
sidebar: false
comments: false
sharing: true
footer: true
---

<div class='advanced-installs-container' markdown='0'>
<input name='advanced-installs' type='radio' id='upstart-install' checked>
<input name='advanced-installs' type='radio' id='systemd-install'>
<input name='advanced-installs' type='radio' id='osx-install'>
<input name='advanced-installs' type='radio' id='synology-install'>
<label class='menu-selector upstart' for='upstart-install'>Upstart Daemon</label>
<label class='menu-selector systemd' for='systemd-install'>Systemd Daemon</label>
<label class='menu-selector osx' for='osx-install'>OS X</label>
<label class='menu-selector synology' for='synology-install'>Synology NAS</label>

<div class='advanced-installs upstart' markdown='1'>
Many linux distributions use the Upstart system (or similar) for managing daemons. Typically, systems based on Debian 7 or previous use Upstart. This includes Ubuntu releases before 15.04 and all current Raspian releases. If you are unsure if your system is using Upstart, you may check with the following command:

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
</div> <!-- UPSTART -->

<div class='advanced-installs systemd' markdown='1'>
Newer linux distributions are trending towards using systemd for managing daemons. Typically, systems based on Fedora or Debian 8 or later use systemd. This includes Ubuntu releases including and after 15.04, CentOS, and Red Hat. If you are unsure if your system is using `systemd`, you may check with the following command:

```bash
$ ps -p 1 -o comm=
```

If the preceding command returns the string `systemd`, you are likely using `systemd`.

If you want Home Assistant to be launched automatically, an extra step is needed to setup `systemd`. You need a service file to control Home Assistant with `systemd`. If you are using a Raspberry Pi then replace the `[your user]` with `pi` otherwise use your user you want to run Home Assistant.

```bash
$ su -c 'cat <<EOF >> /lib/systemd/system/home-assistant@[your user].service
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

There is also another [sample service file](https://raw.githubusercontent.com/balloob/home-assistant/master/script/home-assistant%40.service) available. To use this one, just download it. 

```bash
$ sudo wget https://raw.githubusercontent.com/balloob/home-assistant/master/script/home-assistant%40.service -O /lib/systemd/system/home-assistant@[your user].service
```

You need to reload `systemd` to make the daemon aware of the new configuration. Enable and launch Home Assistant after that.

```bash
$ sudo systemctl --system daemon-reload
$ sudo systemctl enable home-assistant@[your user]
$ sudo systemctl start home-assistant@[your user]
```

If everything went well, `sudo systemctl start home-assistant` should give you a positive feedback.

```bash
$ sudo systemctl status home-assistant@[your user] -l
● home-assistant@fab.service - Home Assistant for [your user]
   Loaded: loaded (/usr/lib/systemd/system/home-assistant@[your user].service; enabled; vendor preset: disabled)
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

</div> <!-- SYSTEMD -->

<div class='advanced-installs osx' markdown='1'>
Setting up Home Assistant to run as a background service is simple. OS X will start it on boot and make sure it's always running.

To get Home Assistant installed as a background service, run:


```bash
$ hass --install-osx

Home Assistant has been installed.         Open it here: http://localhost:8123
```

Home Assistant will log to `~/Library/Logs/homeassistant.log`

To uninstall the service, run:

```bash
$ hass --uninstall-osx

Home Assistant has been uninstalled.
```

</div> <!-- OSX -->

<div class='advanced-installs synology' markdown='1'>
To get Home Assistant to automatically start when you boot your Synology NAS:

SSH onto your synology & login as admin or root

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
$ ln -s homeassistant-conf /etc/init/homeassistant-conf
```

Make the relevant files executable:

```bash
$ chmod -r 777 /etc/init/homeassistant-conf
```

That's it - reboot your NAS and Home Assistant should automatically start
</div> <!-- SYNOLOGY -->
</div>

### [&laquo; Back to Getting Started](/getting-started/)
