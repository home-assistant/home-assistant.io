---
layout: page
title: "Getting Started"
description: "Step by step guide to get started with Home Assistant."
date: 2014-12-18 22:57
sidebar: false
comments: false
sharing: true
footer: true
---

<div class='install-instructions-container' markdown='0'>
<input name='install-instructions' type='radio' id='normal-install' checked>
<input name='install-instructions' type='radio' id='raspberry-install'>
<input name='install-instructions' type='radio' id='docker-install'>
<label class='menu-selector normal' for='normal-install'>Install on local machine</label>
<label class='menu-selector raspberry' for='raspberry-install'>Install on a Raspberry Pi</label>
<label class='menu-selector docker' for='docker-install'>Install using Docker</label>

<div class='install-instructions normal' markdown='1'>
Installing and running Home Assistant on your local machine is easy. Make sure you have [Python 3.4 or higher](https://www.python.org/downloads/) installed and execute the following code in a console:

```bash
$ pip3 install homeassistant
$ hass --open-ui
```

Running these commands will:

 - Install Home Assistant
 - Launch Home Assistant and serve the web interface on [http://localhost:8123](http://localhost:8123)
 
 
If would prefer to watch a video tutorial however, [tktino](https://github.com/tktino) has made some great ones.

 - [Windows 10](https://www.youtube.com/watch?v=X27eVvuqwnY)
 - [Mac OS X](https://www.youtube.com/watch?v=hej6ipN86ls)
 - [Ubuntu 14.04](https://www.youtube.com/watch?v=SXaAG1lGNH0)

</div> <!-- INSTALL-INSTRUCTIONS NORMAL -->


<div class='install-instructions docker' markdown='1'>

Installation with Docker is straightforward. Adjust the following command so that `/path/to/your/config/` points at the folder where you want to store your config and run it:

```bash
$ docker run -d --name="home-assistant" -v /path/to/your/config:/config -v /etc/localtime:/etc/localtime:ro --net=host balloob/home-assistant
```

This will launch Home Assistant and serve the web interface from port 8123 on your Docker host.

<p class='note'>
When using boot2docker on OS X you are unable to map the local time to your Docker container. Replace `-v /etc/localtime:/etc/localtime:ro` with `-e "TZ=America/Los_Angeles"` (replacing America/Los_Angeles with [your timezone](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones))
</p>

</div> <!-- INSTALL-INSTRUCTIONS DOCKER -->


<div class='install-instructions raspberry' markdown='1'>

Home Assistant requires the Raspberry Pi to run [Raspbian Jessie](https://www.raspberrypi.org/downloads/raspbian/). This version was released on September 24, 2015 and comes by default with Python 3.4 which is required for Home Assistant.

Execute the following code in a console:

```bash
$ sudo pip3 install homeassistant
$ hass
```

Running these commands will:

 - Install Home Assistant
 - Launch Home Assistant and serve the web interface on [http://localhost:8123](http://localhost:8123)

</div> <!-- INSTALL-INSTRUCTIONS RASPBERRY -->
</div>

### {% linkable_title Troubleshooting %}

If you run into any issues, please see [the troubleshooting page](/getting-started/troubleshooting/). It contains solutions to many of the more commonly encountered issues.

For additional help, in addition to this site, there are four sources:

 - [Forum](https://automic.us/forum/)
 - [Gitter Chatroom](https://gitter.im/balloob/home-assistant) for general Home Assistant discussions and questions.
 - [Development Mailing List](https://groups.google.com/forum/#!forum/home-assistant-dev) for development related questions and discussing new features.
 - [GitHub Page](https://github.com/balloob/home-assistant/issues) for issue reporting.

### What's next
If you want to have Home Assistant start on boot, autostart instructions can be found [here](/getting-started/autostart/).

To see what Home Assistant can do, launch demo mode: `hass --demo-mode` or visit the [demo page](/demo).

To update Home Assistant to the latest release run: `pip3 install --upgrade homeassistant`

### [Next step: Configuring Home Assistant &raquo;](/getting-started/configuration/)
