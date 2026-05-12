---
title: Gate
description: Use gate triggers and conditions in Home Assistant automations.
ha_category:
  - Automation
ha_release: 2026.4
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: gate
ha_integration_type: system
---

The **Gate** {% term integration %} provides dedicated triggers and conditions for gates in Home Assistant. It works with `cover` entities that use the `gate` device class, so you can react when a gate opens or closes, or check whether one is open before running an automation.

## Supported entities

The Gate integration works with the following entity type when it uses the `gate` device class:

- `cover`, like driveway or courtyard gates that report whether they are open or closed

## Configuration

The Gate integration does not require any configuration. It becomes available automatically when another integration provides a supported gate entity.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

## Gate automation examples

You can use these triggers and conditions to light your way, confirm that your property is secure, and get reminders when a gate is left open.

{% include docs/paste_yaml_tip.md %}

### Automation: turn on the driveway lights when the gate opens after dark

If you come home after sunset, this automation turns on the driveway lights as soon as the gate opens. That gives you light where you need it without leaving the lights on all evening.

- **Trigger**: Gate opened
- **Target**: Driveway gate
- **Action**: Light: Turn on

{% details "YAML example for driveway lights when the gate opens" %}

{% example %}
automation: |
  alias: "Turn on driveway lights when the gate opens after dark"
  triggers:
    - trigger: gate.opened
      target:
        entity_id: cover.driveway_gate
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.driveway
{% endexample %}

{% enddetails %}

### Automation: remind you at bedtime if the gate is still open

At the end of the day, this automation checks whether the gate is still open before you settle in for the night. If it is, Home Assistant sends a reminder so you can close it.

- **Trigger**: Time
- **Condition**: Gate is open
  - **Target**: Driveway gate
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: Mobile app

{% details "YAML example for a bedtime gate reminder" %}

{% example %}
automation: |
  alias: "Remind me if the gate is still open at bedtime"
  triggers:
    - trigger: time
      at: "22:30:00"
  conditions:
    - condition: gate.is_open
      target:
        entity_id: cover.driveway_gate
      options:
        behavior: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_mobile_app
      data:
        title: "Gate still open"
        message: "The driveway gate is still open. Close it before bed."
{% endexample %}

{% enddetails %}

## Known limitations

Only `cover` entities that use the `gate` device class appear in these triggers and conditions. If your device uses a different entity type or device class, it will not be available here.
