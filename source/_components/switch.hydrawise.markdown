---
layout: page
title: "Hunter Hydrawise Switch"
description: "Instructions on how to integrate your Hunter Hydrawise Wi-Fi irrigation control system within Home Assistant."
date: 2018-04-11 08:02
sidebar: true
comments: false
sharing: true
footer: true
logo: hydrawise_logo.png
ha_category: Switch
ha_release: 0.68
ha_iot_class: Cloud Polling
---

Before setting up the [Hunter Hydrawise](https://hydrawise.com) switches please follow the instructions for setting up the [Hydrawise hub](/components/hydrawise) component.

Once you have enabled the `hydrawise` component, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: hydrawise
```

{% configuration %}
watering_minutes:
  description: When manual watering is enabled this will determine the length of time in minutes that irrigation zone will run. The allowed values are 5, 10, 15, 30, 45, or 60.
  required: false
  type: int
  default: 15
monitored_conditions:
  description: Selects the set of switches that should be enabled on the frontend. Also sets the length of time a zone will run under manual control.
  required: false
  type: list
  default: All switches are enabled.
  keys:
    auto_watering:
      description: Enables the Smart Watering features for this zone.
    manual_watering:
      description: Enables the manual watering control for this zone.
{% endconfiguration %}

### {% linkable_title Switch Operation %}

When `auto_watering` is `on` the irrigation zone will follow the Smart Watering schedule set through the Hydrawise [mobile or web app](https://www.hydrawise.com). When the `auto_watering` switch is `off` the zone's Smart Watering schedule is suspended for 1 year.

When `manual_watering` is `on` the zone will run for the amount of time set by `watering_minutes`.

```yaml
# An example that enables all the switches, and sets the manual watering time to 20 minutes.
switch:
  - platform: hydrawise
    watering_minutes: 20
```

```yaml
# An example that enables only the manual control switches.
switch:
  - platform: hydrawise
    monitored_conditions: manual_watering
```


Finish the configuration by visiting the [Hydrawise binary sensor](/components/binary_sensor.hydrawise) and [Hydrawise sensor](/components/sensor.hydrawise/) documentation.
