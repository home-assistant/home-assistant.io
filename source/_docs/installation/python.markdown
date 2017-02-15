---
layout: page
title: "Installation on your computer"
description: "Step by step guide to install Home Assistant on your computer."
date: 2014-12-18 22:57
sidebar: true
comments: false
sharing: true
footer: true
---

Installing and running Home Assistant on your local machine is easy. The only requirement is that you have [Python](https://www.python.org/downloads/) installed. For Windows we require at least **Python 3.5** and for other operating systems at least **Python 3.4.2**.

Once installed, execute the following code in a console:

```bash
$ pip3 install homeassistant
$ hass --open-ui
```

Running these commands will:

 - Install Home Assistant
 - Launch Home Assistant and serve the web interface on [http://localhost:8123](http://localhost:8123)

If you're running a Linux-based platform, we suggest you follow the [VirtualEnv Linux instructions][/docs/installation/virtualenv/] to avoid using root.

Video tutorials of this process for various operating systems are available here:

 - [Windows 10](https://www.youtube.com/watch?v=X27eVvuqwnY)
 - [Mac OS X](https://www.youtube.com/watch?v=hej6ipN86ls)
 - [Ubuntu 14.04](https://www.youtube.com/watch?v=SXaAG1lGNH0)

