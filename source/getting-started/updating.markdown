---
layout: page
title: "Updating Home Assistant"
description: "Step to update Home Assistant."
date: 2016-05-04 10:00
sidebar: true
comments: false
sharing: true
footer: true
---


To update Home Assistant to the latest release when available, run:

```bash
$ pip3 install --upgrade homeassistant
```

After updating, restart Home Assistant for the changes to take effect. This means that you have to restart `hass` itself or the [autostarting](/getting-started/autostart/) daemon if you use any.


<p class='note note'>
  The upgrade needs to be run as the same user as the installation was done to avoid permission errors.
</p>

#### {% linkable_title Run the development version %}
If you want to stay on top of the development of Home Assistant then you can upgrade to the `dev` branch. 

<p class='note warning'>
  This can result in an unstable system, loss of data, etc. etc.
</p>

```bash
$ pip3 install --upgrade git+git://github.com/home-assistant/home-assistant.git@dev
```
