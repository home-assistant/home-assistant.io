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

In order for Home Assistant to recognize the sensor properly, you will need to change its configuration from `Basic Set (default)` to `Binary Sensor report` or `Alarm report`.
These devices will either show as a binary sensor or a sensor called `Alarm xxxx` and will report a numeric value. Test to see what value is what. Sometimes this is noted in the device manual.

As of version 0.30 you can set the settings of a Z-Wave device through the dev_service page of Home Assistant with the service: `zwave/set_config_parameter`.

The following parameters can be entered:
- **node_id** (*Required*): The node_id of the device that you are going to set a parameter to.
- **parameter** (*Required*): The index number of the parameter to be set. Refer to device manual or zwcfg_[home_id].xml
- **value** (*Required*): The value to set the parameter to. Refer to device manual or zwcfg_[home_id].xml
- **size** (*Optional*): The size of the value. It is normally not needed to specify this parameter, but in some cases it's needed. Check OZW.log for details on this.
You should check OZW.log to see if your new setting has been set
Example entry in dev-service, setting binary reports for an Aeotec Multisensor 6:
```yaml
# Example entry in dev-service
{
"node_id": 42,
"parameter": 5,
"value": 2
}
```

##### {% linkable_title Locks and other secure devices %}

These devices require a network key to be set for the Z-Wave network before they are paired. This key is set in OpenZWave's `options.xml` which is located in OpenZWave's directory. This should also be the same directory as `config_path:` in your `configuration.yaml`. If it's not, make sure you have the same values in all the files you are using.
The option is commented out by default in `options.xml` and is a default key. Make your own unique key. The key is in Hexadecimals.
It is best to pair these devices in OpenZWave Control Panel or another Z-Wave tool that can show you logs while pairing. Home Assistant stores logs from Z-Wave in `OZW.log` in the Home Assistant config directory.
You should see communication from the node with lines starting with `info: NONCES` in `OZW.log` when the device is paired successfully with a secure connection. If you use OpenZWave Control Panel to pair, test the device before you save the configuration.
Make sure you copy the newly saved `zwcfg_[home_id].xml`into your Home Assistant configuration directory.


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
