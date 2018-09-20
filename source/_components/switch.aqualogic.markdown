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
ha_release: 0.79
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

Configuration variables:

- **monitored_conditions** array (*Required*): Conditions to display in the frontend. The following conditions can be monitored/controlled:
  - **filter**: Controls the filter pump.
  - **filter_low_speed**: Controls low speed mode on the filter pump (multi-speed pumps only).
  - **lights**: Controls the Lights relay.
  - **aux_1**: Controls the Aux 1 relay.
  - **aux_2**: Controls ths Aux 2 relay.
  - **aux_3**: Controls ths Aux 3 relay.
  - **aux_4**: Controls ths Aux 4 relay.
  - **aux_5**: Controls ths Aux 5 relay.
  - **aux_6**: Controls ths Aux 6 relay.
  - **aux_7**: Controls ths Aux 7 relay.
