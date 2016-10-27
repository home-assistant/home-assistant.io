---
layout: page
title: "Getting Started"
description: "Step by step guide to get started with Home Assistant."
date: 2014-12-18 22:57
sidebar: true
comments: false
sharing: true
footer: true
---

Below you can find the standard instructions. See the sidebar for installation instructions for specific platforms. If you're running a Linux-based platform, we suggest you to follow the [VirtualEnv Linux instructions] to avoid using root.

[Virtualenv Linux instructions]: /getting-started/installation-virtualenv/

Installing and running Home Assistant on your local machine is easy. Make sure you have [Python 3.4 or higher](https://www.python.org/downloads/) installed and execute the following code in a console:

```bash
$ pip3 install homeassistant
$ hass --open-ui
```

Running these commands will:

 - Install Home Assistant
 - Launch Home Assistant and serve the web interface on [http://localhost:8123](http://localhost:8123)

If you prefer to watch a video tutorial, [tktino](https://github.com/tktino) has made some great ones:

 - [Windows 10](https://www.youtube.com/watch?v=X27eVvuqwnY)
 - [Mac OS X](https://www.youtube.com/watch?v=hej6ipN86ls)
 - [Ubuntu 14.04](https://www.youtube.com/watch?v=SXaAG1lGNH0)

### {% linkable_title Updating %}

To update Home Assistant to the latest release check the [Updating section](/getting-started/updating/).

### {% linkable_title Troubleshooting %}

If you run into any issues, please see [the troubleshooting page](/getting-started/troubleshooting/). It contains solutions to many commonly encountered issues.

In addition to this site, check out these sources for additional help:

 - [Forum](https://community.home-assistant.io) for Home Assistant discussions and questions
 - [Gitter Chat Room](https://gitter.im/home-assistant/home-assistant) for real-time chat about Home Assistant
 - [GitHub Page](https://github.com/home-assistant/home-assistant/issues) for issue reporting

### {% linkable_title What's next? %}

To see what Home Assistant can do, launch demo mode: `hass --demo-mode` or visit the [demo page](/demo).

### [Next step: Configuring Home Assistant &raquo;](/getting-started/configuration/)
