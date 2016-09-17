---
layout: page
title: "Z-Wave Device Specific Settings"
description: "Extended instructions how to setup Z-Wave."
date: 2016-03-24 08:49 -0700
sidebar: true
comments: false
sharing: true
footer: true
---

##### {% linkable_title Motion or alarm sensors %}

In order for Home Assistant to recognize well the sensor, you will need to change its configuration from `Basic Set (default)` to `Binary Sensor report` or `Alarm report`. Currently there's no way to do this in Home Assistant but you can use ozwcp (OpenZWave control panel), Domoticz or similar to do it
These devices will either show as a binary sensor or a sensor called `Alarm xxxx` and will report a numeric value. Test to see what value is what. Sometimes this is noted in the device manual.


##### {% linkable_title Locks and other secure devices %}

These devices require a network key to be set for the zwave network before they are paired. This key is set in OpenZwave's `options.xml` which is located in Open Zwave's directory. This should also be the same directory as `config_path:` in your `configuration.yaml`. If it's not, make sure you have the same values in all the files you are using.
The option is commented out by default in `options.xml` and is a default key. Make your own unique key. The key is in Hexadecimals.
It is best to pair these devices in Open Zwave Control Panel or other Zwave tool that can show you logs while pairing. Test the device before you save the configuration.
Make sure you copy the newly saved `zwcfg_[home_id].xml`into your HomeAssistant config directory.


##### {% linkable_title Aeon Minimote %}

Here's a handy configuration for the Aeon Labs Minimote that defines all possible button presses. Put it into `automation.yaml`.

```yaml
 - alias: Minimote Button 1 Pressed
   trigger:
     platform: event
     event_type: zwave.scene_activated
     event_data:
       object_id: aeon_labs_minimote_1
       scene_id: 1

 - alias: Minimote Button 1 Held
   trigger:
     platform: event
     event_type: zwave.scene_activated
     event_data:
       object_id: aeon_labs_minimote_1
       scene_id: 2

 - alias: Minimote Button 2 Pressed
   trigger:
     platform: event
     event_type: zwave.scene_activated
     event_data:
       object_id: aeon_labs_minimote_1
       scene_id: 3

 - alias: Minimote Button 2 Held
   trigger:
     platform: event
     event_type: zwave.scene_activated
     event_data:
       object_id: aeon_labs_minimote_1
       scene_id: 4

 - alias: Minimote Button 3 Pressed
   trigger:
     platform: event
     event_type: zwave.scene_activated
     event_data:
       object_id: aeon_labs_minimote_1
       scene_id: 5

 - alias: Minimote Button 3 Held
   trigger:
     platform: event
     event_type: zwave.scene_activated
     event_data:
       object_id: aeon_labs_minimote_1
       scene_id: 6

 - alias: Minimote Button 4 Pressed
   trigger:
     platform: event
     event_type: zwave.scene_activated
     event_data:
       object_id: aeon_labs_minimote_1
       scene_id: 7

 - alias: Minimote Button 4 Held
   trigger:
     platform: event
     event_type: zwave.scene_activated
     event_data:
       object_id: aeon_labs_minimote_1
       scene_id: 8
```
