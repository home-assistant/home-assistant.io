---
title: Power
description: This integration provides power automation triggers and conditions.
ha_category:
  - Automation
ha_release: 2026.4
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: power
ha_integration_type: system
---

This {% term integration %} provides automation triggers and conditions for sensors with the power device class. Use it when you want to react to how much power a device or circuit is using right now. There are no configuration options for this integration.

## Power and energy

- **Power** is the rate of energy use at a specific moment. It is usually shown in units like W or kW. Use the triggers and conditions in this integration when you want to react to a live load change, such as a washing machine finishing or a heater starting.
- **Energy** is the total amount used over time. It is usually shown in kWh. If you want to track accumulated usage, use an energy sensor or the [Energy dashboard](/docs/energy/).

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

## Power automation examples

Here are a few ways you can use power automations in Home Assistant.

{% include docs/paste_yaml_tip.md %}

### Automation: notify when the washing machine finishes

When the washing machine power drops below 3 W for 5 minutes, send a notification so you know the cycle is done.

- **Trigger**: Power crossed threshold
  - **Target**: Washing machine power sensor
  - **Threshold type**: Below 3 W
  - **For at least**: 00:05:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a washing machine finished notification" %}

{% example %}
automation: |
  alias: "Notify when the washing machine finishes"
  triggers:
    - trigger: power.crossed_threshold
      target:
        entity_id: sensor.washing_machine_power
      options:
        threshold:
          type: below
          value:
            number: 3
            unit_of_measurement: "W"
        for: "00:05:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The washing machine cycle is finished."
{% endexample %}

{% enddetails %}

### Automation: only turn on the water heater boost when power use is low enough

At 02:00, turn on the water heater boost switch only if the current household power use is below 2500 W.

- **Trigger**: Time: 02:00
- **Condition**: Power value (below 2500 W)
  - **Target**: Main power sensor
- **Action**: Turn on switch
  - **Target**: switch.water_heater_boost

{% details "YAML example for checking power before turning on a water heater boost" %}

{% example %}
automation: |
  alias: "Turn on water heater boost when power use is low enough"
  triggers:
    - trigger: time
      at: "02:00:00"
  conditions:
    - condition: power.is_value
      target:
        entity_id: sensor.main_power
      options:
        threshold:
          type: below
          value:
            number: 2500
            unit_of_measurement: "W"
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.water_heater_boost
{% endexample %}

{% enddetails %}
