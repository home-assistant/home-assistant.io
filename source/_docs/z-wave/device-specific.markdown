---
layout: page
title: "Z-Wave Device Specific Settings"
description: "Extended instructions how to setup Z-Wave."
date: 2016-03-24 08:49 -0700
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/z-wave-device-specific/
---

## {% linkable_title Motion or alarm sensors %}

In order for Home Assistant to recognize the sensor properly, you will need to change its configuration from `Basic Set (default)` to `Binary Sensor report` or `Alarm report`.
These devices will either show as a binary sensor or a sensor called `Alarm xxxx` and will report a numeric value. Test to see what value is what. Sometimes this is noted in the device manual.

As of version 0.30 you can set the settings of a Z-Wave device through the dev_service page of Home Assistant with the service: `zwave/set_config_parameter`.

The following parameters can be entered:
- **node_id** (*Required*): The node_id of the device that you are going to set a parameter to.
- **parameter** (*Required*): The index number of the parameter to be set. Refer to device manual or zwcfg_[home_id].xml
- **value** (*Required*): The value to set the parameter to. Refer to device manual or zwcfg_[home_id].xml
- **size** (*Optional*): The size of the value. It is normally not needed to specify this parameter, but in some cases it's needed. Check OZW.log for details on this.

You should check OZW.log to see if your new setting has been set.

Example entry in dev-service, setting binary reports for an Aeotec Multisensor 6:


```yaml
# Example entry in dev-service
{
"node_id": 42,
"parameter": 5,
"value": 2
}
```

## {% linkable_title Locks and other secure devices %}

All locks and some security sensors require a network key to be set for the Z-Wave network before they are paired. See [Adding Security Devices](/docs/z-wave/#adding-security-devices) for details on how to include this key in `configuration.yaml`. After the network key is set up, make sure to use 'Add Node Secure' on the Z-Wave Configuration page when including the device into the Z-Wave network.

##### {% linkable_title Aeon Minimote %}

Here's a handy configuration for the Aeon Labs Minimote that defines all possible button presses. Put it into `automation.yaml`.

```yaml
  - id: mini_1_pressed
    alias: 'Minimote Button 1 Pressed'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 1

  - id: mini_1_held
    alias: 'Minimote Button 1 Held'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 2

  - id: mini_2_pressed
    alias: 'Minimote Button 2 Pressed'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 3

  - id: mini_2_held
    alias: 'Minimote Button 2 Held'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 4

  - id: mini_3_pressed
    alias: 'Minimote Button 3 Pressed'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 5

  - id: mini_3_held
    alias: 'Minimote Button 3 Held'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 6

  - id: mini_4_pressed
    alias: 'Minimote Button 4 Pressed'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 7

  - id: mini_4_held
    alias: 'Minimote Button 4 Held'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 8
```


##### {% linkable_title HomeSeer Switches %}

For the HomeSeer devices specifically, you may need to update the `COMMAND_CLASS_CENTRAL_SCENE` for each node in your `zwcfg` file with the following:

```xml
			<CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="4" innif="true" scenecount="0">
				<Instance index="1" />
                <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="2" />
        		<Value type="int" genre="user" instance="1" index="1" label="Top Button Scene" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
        		<Value type="int" genre="user" instance="1" index="2" label="Bottom Button Scene" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
			</CommandClass>
```

Below is a table of the action/scenes for the HomeSeer devices (as a reference for other similar devices):

**Action**|**scene\_id**|**scene\_data**
:-----:|:-----:|:-----:
Single tap on|1|0
Single tap off|2|0
Double tap on|1|3
Double tap off|2|3
Triple tap on|1|4
Triple tap off|2|4
Tap and hold on|1|2
