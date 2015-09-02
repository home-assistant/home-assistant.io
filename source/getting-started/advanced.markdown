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
<input name='advanced-installs' type='radio' id='docker-install' checked>
<input name='advanced-installs' type='radio' id='debian-install'>
<input name='advanced-installs' type='radio' id='fedora-install'>
<label class='menu-selector docker' for='docker-install'>Docker Installation</label>
<label class='menu-selector debian' for='debian-install'>Debian (Ubuntu, Raspbian) Daemon</label>
<label class='menu-selector fedora' for='fedora-install'>Fedora (RHEL, CentOS) Daemon</label>

<div class='advanced-installs docker'>
**Docker Deployment**
<p>Installation with Docker is straightforward. Adjust the following command so that <code>/path/to/your/config/</code> points at the folder where you want to store your config and run it:</p>

```bash
docker run -d --name="home-assistant" -v /path/to/your/config:/config -v /etc/localtime:/etc/localtime:ro --net=host balloob/home-assistant
```

<p>This will launch Home Assistant and serve its web interface from port 8123 on your Docker host.</p>

<p class='note'>
When using boot2docker on OS X you are unable to map the local time to your Docker container. Replace <code>-v /etc/localtime:/etc/localtime:ro</code> with <code>-e "TZ=America/Los_Angeles"</code> (replacing America/Los_Angeles with <a href='http://en.wikipedia.org/wiki/List_of_tz_database_time_zones'>your timezone</a>)
</p>
</div> <!-- DOCKER -->

<div class='advanced-installs debian'>
**Debian Deamon**
<p>Debian based systems, including Ubuntu and Raspbian for the Raspberry Pi use an application called Init to manage daemon services. Init will launch init scripts that are located in the directory <code>/etc/init.d/</code>. A sample init script for Debian based systems is <a href="https://raw.githubusercontent.com/balloob/home-assistant/dev/scripts/hass-daemon">maintained in this project</a>.</p>

<p>To install this script, download it, tweak it to you liking, and install it by following the directions in the header. This script will setup Home Assistant to run when the system boots. To start/stop Home Assistant manually, issue the following commands:
```bash
sudo service hass-daemon start
sudo service hass-daemon stop
```
</p>

<p>When running Home Assistant with this script, the configuration directory will be located at <code>/var/opt/homeassistant</code>. This directory will contain a verbose log rather than simply an error log.</p>

<p>When running daemons, it is good practice to have the daemon run under its own user name rather than the default user's name. Instructions for setting this up are outside the scope of this document.</p>
</div> <!-- DEBIAN -->

<div class='advanced-installs fedora'>
**Fedora Daemon**
<p>If you want that Home Assistant is lauched automatically, an extra step is needed to setup <code>systemd</code>. You need a service file to control Home Assistant with <code>systemd</code>. <!-- The <code>WorkingDirectory</code> and the <code>PYTHONPATH</code> must point to your clone git repository. --></p>

<!-- WorkingDirectory=/home/fab/home-assistant/
Environment="PYTHONPATH=/home/fab/home-assistant/" -->


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

<p>You need to reload <code>systemd</code> to make the daemon aware of the new configuration. Enable and launch Home Assistant after that.</p>

```bash
sudo systemctl --system daemon-reload
sudo systemctl enable home-assistant
sudo systemctl start home-assistant
```

<p>If everything went well, <code>sudo systemctl start home-assistant</code> should give you a positive feedback.</p>

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

<p>To get Home Assistant's logging output, simple use <code>journalctl</code>.</p>

```bash
sudo journalctl -f -u home-assistant
```
</div> <!-- FEDORA -->

###[&laquo; Back to Getting Started](/getting-started/index.html)
