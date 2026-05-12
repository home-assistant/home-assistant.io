---
title: Window
description: Use window triggers and conditions in Home Assistant automations.
ha_category:
  - Automation
ha_release: 2026.4
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: window
ha_integration_type: system
---

The **Window** {% term integration %} provides dedicated triggers and conditions for windows in Home Assistant. It works with binary sensors and covers that use the `window` device class, so you can react when a window opens or closes, or check whether one is open before running an automation.

{% include integrations/building_block_integration.md %}

{% include integrations/triggers_conditions_actions.md %}

## Window automation examples

You can use these triggers and conditions to protect your home, avoid wasting energy, and get timely reminders.

{% include docs/paste_yaml_tip.md %}

### Automation: send a reminder if a window opens after sunset

If a kitchen window opens after dark, you might want a quick reminder so you can check whether everything is fine before going to bed.

- **Trigger**: Window opened
- **Target**: Kitchen window sensor
- **Action**: Send a mobile notification

{% details "YAML example for an evening window reminder" %}

{% example %}
automation: |
  alias: "Notify when the kitchen window opens after sunset"
  triggers:
    - trigger: window.opened
      target:
        entity_id: binary_sensor.kitchen_window
      options:
        behavior: any
        for: "00:00:00"
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: notify.mobile_app_phone
      data:
        title: "Kitchen window opened"
        message: "The kitchen window was opened after sunset."
{% endexample %}

{% enddetails %}

### Automation: turn heating back on after bedroom window is closed

If you open a bedroom window to air out the room, you can wait until it is closed again before turning the heating back on.

- **Trigger**: Window closed
- **Target**: Bedroom window sensor
- **Action**: Climate: Set HVAC mode to heat

{% details "YAML example for restoring heating after a window closes" %}

{% example %}
automation: |
  alias: "Resume bedroom heating when the window closes"
  triggers:
    - trigger: window.closed
      target:
        entity_id: binary_sensor.bedroom_window
      options:
        behavior: any
        for: "00:02:00"
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id: climate.bedroom
      data:
        hvac_mode: heat
{% endexample %}

{% enddetails %}
