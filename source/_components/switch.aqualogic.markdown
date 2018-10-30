---
layout: page
title: "AquaLogic Switch"
description: "Instructions on how to integrate your AquaLogic devices within Home Assistant."
date: 2018-09-17 9:16
sidebar: true
comments: false
sharing: true
footer: true
logo: hayward.png
ha_category: Switch
ha_release: "0.80"
ha_iot_class: "Local Push"
---

To get your AquaLogic switches working within Home Assistant, please follow the instructions for the general [AquaLogic component](/components/aqualogic).

## {% linkable_title Configuration %}

Once you have enabled the [AquaLogic component](/components/aqualogic), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: aqualogic
    monitored_conditions:
      - lights
      - filter
```

{% configuration %}
monitored_conditions:
  description: List of items you want to monitor/control.
  required: false
  default: all
  type: list
  keys:
    filter:
      description: Controls the filter pump.
    filter_low_speed:
      description: Controls low speed mode on the filter pump (multi-speed pumps only).
    lights:
      description: Controls the Lights relay.
    aux_1:
      description: Controls the Aux 1 relay.
    aux_2:
      description: Controls the Aux 2 relay.
    aux_3:
      description: Controls the Aux 3 relay.
    aux_4:
      description: Controls the Aux 4 relay.
    aux_5:
      description: Controls the Aux 5 relay.
    aux_6:
      description: Controls the Aux 6 relay.
    aux_7:
      description: Controls the Aux 7 relay.
{% endconfiguration %}
