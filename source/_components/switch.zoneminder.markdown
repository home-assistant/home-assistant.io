---
layout: page
title: "ZoneMinder Switch"
description: "How to toggle the function of ZoneMinder monitors in Home Assistant."
date: 2016-10-13 22:57
sidebar: true
comments: false
sharing: true
footer: true
logo: zoneminder.png
ha_category: Switch
ha_release: 0.31
ha_iot_class: "Local Polling"
---


The `zoneminder` switch platform allows you to toggle the current function of all cameras attached to your [ZoneMinder](https://www.zoneminder.com) instance.

<p class='note'>
You must have the [ZoneMinder component](/components/zoneminder/) configured to use this and if ZoneMinder authentication is enabled the account specified in the component configuration must have "Edit" permission for "System".
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
