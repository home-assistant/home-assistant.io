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
---


The `zoneminder` switch platform allows you to toggle the current function of all cameras attached to your [ZoneMinder](https://www.zoneminder.com) instance.

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

External trigger mode:

Zoneminder supports "External Trigger", where recording is triggered out-of-band (not with ZM's built-in motion detector).
This is useful if your camera takes a while to 'warmup' and you use some external sensor like PIR motion detector.
In this case camera can be kept in 'Nodect' state so it is warm and ready to capture. Once external trigger is activated camera starts recording immediately.
This way you will not lose any frames and actually see how your S.W.A.T team deals with the intruder stepped into your nuclear facility.

Configuration variables:

- **ext_trigger_enable** (*Optional*): Enable external trigger switch. This will create 'trigger' switch for each of your monitors.
- **ext_trigger_time** (*Optional*): How long ZM is to record once switch is triggered.
- **ext_trigger_cause** (*Optional*): Text that will appear as 'cause' in ZM event log.

Please note:
* If you use trigger mode, it is recommended to keep camera in 'Nodect' state, so set both **command_on** and **command_off** to Nodect.
* Make sure OPT_TRIGGER is enabled in ZM
* If your trigger source can generate "no motion" event, you may want to set **ext_trigger_time** to some large value.

<p class='note'>
The default functions installed by ZoneMinder are: None, Monitor, Modect, Record, Mocord, Nodect.
</p>
