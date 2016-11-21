---
layout: page
title: "ZoneMinder Switch"
description: "Instructions how to integrate ZoneMinder switches into Home Assistant."
date: 2016-10-13 22:57
sidebar: true
comments: false
sharing: true
footer: true
logo: zoneminder.png
ha_category: Switch
ha_release: 0.31
---


The `zoneminder` switch platform allows you to toggle the current function of cameras attached to your ZoneMinder instance.

<p class='note'>
You must have the [ZoneMinder component](/components/zoneminder/) configured to use this.
</p>

To enable this switch, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: zoneminder
    command_on: Modect
    command_off: Monitor
```

Configuration variables:

- **command_on** (*Required*): The function you want the camera to run when turned on.
- **command_off** (*Required*): The function you want the camera to run when turned off.


<p class='note'>
The default functions installed by ZoneMinder are: None, Monitor, Modect, Record, Mocord, Nodect.
</p>

