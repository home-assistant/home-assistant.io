---
layout: page
title: "Advanced Installation"
description: "Brief advanced installation tutorials."
date: 2015-9-1 22:57
sidebar: false
comments: false
sharing: true
footer: true
---

Here are some general tutorials on how to setup some of the more advanced deployments that are frequently requested.

<div class='advanced-installs-container'>
<input name='advanced-installs' type='radio' id='upstart-install' checked>
<input name='advanced-installs' type='radio' id='systemd-install'>
<input name='advanced-installs' type='radio' id='osx-install'>
<label class='menu-selector upstart' for='upstart-install'>Upstart Daemon</label>
<label class='menu-selector systemd' for='systemd-install'>Systemd Daemon</label>
<label class='menu-selector osx' for='osx-install'>OS X</label>


<div class='advanced-installs upstart'>
Many linux distributions use the Upstart system (or similar) for managing daemons. Typically, systems based on Debian 7 or previous use Upstart. This includes Ubuntu releases before 15.04 and all current Raspian releases. If you are unsure if your system is using Upstart, you may check with the following command:

```bash
ps -p 1 -o comm=
```

If the preceding command returns the string `init`, you are likely using Upstart.

Upstart will launch init scripts that are located in the directory <code>/etc/init.d/</code>. A sample init script for systems using Upstart is <a href="https://raw.githubusercontent.com/balloob/home-assistant/dev/scripts/hass-daemon">maintained by this project</a>.

To install this script, download it, tweak it to you liking, and install it by following the directions in the header. This script will setup Home Assistant to run when the system boots. To start/stop Home Assistant manually, issue the following commands:
```bash
sudo service hass-daemon start
sudo service hass-daemon stop
```

When running Home Assistant with this script, the configuration directory will be located at <code>/var/opt/homeassistant</code>. This directory will contain a verbose log rather than simply an error log.

When running daemons, it is good practice to have the daemon run under its own user name rather than the default user's name. Instructions for setting this up are outside the scope of this document.
</div> <!-- UPSTART -->



<div class='advanced-installs systemd'>
Newer linux distributions are trending towards using systemd for managing daemons. Typically, systems based on Fedora or Debian 8 or later use systemd. This includes Ubuntu releases including and after 15.04, CentOS, and Red Hat. If you are unsure if your system is using systemd, you may check with the following command:

```bash
ps -p 1 -o comm=
```

If the preceding command returns the string `systemd`, you are likely using systemd.

If you want Home Assistant to be launched automatically, an extra step is needed to setup systemd. You need a service file to control Home Assistant with systemd.

```bash
su -c 'cat <<EOF >> /lib/systemd/system/home-assistant.service
[Unit]
Description=Home Assistant
After=network.target

[Service]
Type=simple
ExecStart=hass

[Install]
WantedBy=multi-user.target
EOF'
```

You need to reload systemd to make the daemon aware of the new configuration. Enable and launch Home Assistant after that.

```bash
sudo systemctl --system daemon-reload
sudo systemctl enable home-assistant
sudo systemctl start home-assistant
```

If everything went well, <code>sudo systemctl start home-assistant</code> should give you a positive feedback.

```bash
$ sudo systemctl status home-assistant -l
● home-assistant.service - Home Assistant
   Loaded: loaded (/usr/lib/systemd/system/home-assistant.service; disabled; vendor preset: disabled)
   Active: active (running) since Thu 2015-06-25 23:38:37 CEST; 3min 13s ago
 Main PID: 8557 (python3.4)
   CGroup: /system.slice/home-assistant.service
           └─8557 /usr/bin/python3.4 -m homeassistant
[...]
```

To get Home Assistant's logging output, simple use <code>journalctl</code>.

```bash
sudo journalctl -f -u home-assistant
```
</div> <!-- SYSTEMD -->

<div class='advanced-installs osx'>
Setting up Home Assistant to run as a background service is simple. OS X will
start it on boot and make sure it's always running.

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

###[&laquo; Back to Getting Started](/getting-started/index.html)
