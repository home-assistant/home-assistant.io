---
layout: page
title: "Installation on a Raspberry Pi"
description: "Instructions to install Home Assistant on a Raspberry Pi."
date: 2016-04-16 11:36
sidebar: true
comments: false
sharing: true
footer: true
---

Home Assistant requires the Raspberry Pi to run [Raspbian Jessie](https://www.raspberrypi.org/downloads/raspbian/). This version was released on September 24, 2015 and comes by default with Python 3.4 which is required for Home Assistant.

Execute the following code in a console:

```bash
$ sudo pip3 install homeassistant
$ hass
```

Running these commands will:

 - Install Home Assistant
 - Launch Home Assistant and serve the web interface on [http://localhost:8123](http://localhost:8123)

There is also a [video tutorial](https://www.youtube.com/watch?v=GjzOXkPb7XE) created by [brusc](https://github.com/brusc).

### {% linkable_title Updating %}

To update Home Assistant to the latest release when available, run: `pip3 install --upgrade homeassistant`

You have to restart Home Assistant (`hass` itself or with the help of the autostarting daemon if you use any) for the changes to take effect.

### {% linkable_title Troubleshooting %}

If you run into any issues, please see [the troubleshooting page](/getting-started/troubleshooting/). It contains solutions to many of the more commonly encountered issues.

In addition to this site, check out these sources for additional help:

 - [Forum](https://community.home-assistant.io) for Home Assistant discussions and questions.
 - [Gitter Chat Room](https://gitter.im/balloob/home-assistant) for real-time chat about Home Assistant.
 - [GitHub Page](https://github.com/home-assistant/home-assistant/issues) for issue reporting.

### {% linkable_title What's next %}

If you want to have Home Assistant start on boot, [autostart instructions can be found here](/getting-started/autostart-systemd/).

To see what Home Assistant can do, launch demo mode: `hass --demo-mode` or visit the [demo page](/demo).

### [Next step: Configuring Home Assistant &raquo;](/getting-started/configuration/)
