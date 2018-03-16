---
layout: page
title: "Arlo Control Panel"
description: "Instructions how to setup the Netgear Arlo Base Stations as a control panel within Home Assistant."
date: 2017-10-05 17:45
sidebar: true
comments: false
sharing: true
footer: true
logo: arlo.png
ha_category: Alarm
ha_release: 0.56
ha_iot_class: "Cloud Polling"
---

The `arlo` alarm control panel allows you to control your [Arlo](https://arlo.netgear.com/) base stations. You can use it to switch modes and trigger alarms from Home Assistant.

To get your [Arlo](https://arlo.netgear.com/) base stations working within Home Assistant, please follow the instructions for the general [Arlo component](/components/arlo).

Once you have enabled the [Arlo component](/components/arlo), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: arlo
```

{% configuration %}
home_mode_name:
  description: "Arlo base station does not have a built-in home mode. You can map one of your custom modes to Home Assistant's home mode by setting the name of the custom mode in this configuration variable. The name of the custom mode should match exactly as you set it up in the Arlo app."
  required: false
  type: string
away_mode_name:
  description: "Arlo base station does not have a built-in away mode. You can map one of your custom modes to Home Assistant's away mode by setting the name of the custom mode in this configuration variable. The name of the custom mode should match eactly as you set it up in the Arlo app."
  required: false
  type: string
  default: "`Armed` mode in Arlo"
{% endconfiguration %}

## {% linkable_title Examples %}

These examples are based on an Arlo base station named `my_arlo_base_station`. Replace this with the name of your base station's `entity_id`.

Arming the Arlo Base Station when leaving.

```yaml
- id: arm_arlo_when_leaving
  alias: Arm Arlo cameras when leaving
  trigger:
    platform: state
    entity_id: group.family
    from: home
    to: not_home
  action:
    service: alarm_control_panel.alarm_arm_away
    entity_id: alarm_control_panel.my_arlo_base_station
```

Setting Arlo to a custom mode (mapped to `home_mode_name` in `configuration.yaml`) when arriving.

```yaml
- id: disarm_arlo_when_arriving
  alias: Set Arlo cameras to Home mode when arriving
  trigger:
    platform: state
    entity_id: group.family
    from: not_home
    to: home
  action:
    service: alarm_control_panel.alarm_arm_home
    entity_id: alarm_control_panel.my_arlo_base_station
```

You can also completely disarm the Arlo base station by calling the `alarm_control_panel.alarm_disarm` service, and trigger the alarm by calling the `alarm_control_panel.alarm_trigger` service.

More examples and configuration options can be found on the [Manual Alarm Control page](/components/alarm_control_panel.manual/#examples).
