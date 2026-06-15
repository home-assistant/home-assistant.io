---
title: Lawn mower
description: Instructions on how to set up and use lawn mowers in Home Assistant.
ha_release: 2023.9
ha_domain: lawn_mower
ha_quality_scale: internal
ha_category:
  - Lawn mower
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Lawn mower** {% term integration %} lets you bring compatible robotic lawn mowers into Home Assistant.
Use it to monitor whether your mower is mowing, paused, returning to dock, docked, or reporting an error, and build automations around those states.

{% include integrations/building_block_integration.md %}

## The state of a lawn mower entity

A lawn mower entity can have the following states:

- **Mowing**: The lawn mower is currently mowing.
- **Docked**: The lawn mower is done mowing and is currently docked.
- **Paused**: The lawn mower was active and is now paused.
- **Returning**: The lawn mower is returning to the dock.
- **Error**: The lawn mower encountered an error while active and needs assistance.
- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

{% include integrations/actions.md %}

## Lawn mower automation examples

You can use lawn mower triggers and conditions to react when mowing starts, pauses, or finishes.
You can also combine them with weather, time, and notifications to keep your yard routine simple.

{% include docs/paste_yaml_tip.md %}

### Automation: Send a notification when mowing is done

When the mower returns to dock, send a message so you know the job is finished without checking the app.

- **Trigger**: Lawn mower returned to dock
  - **Target**: Backyard mower
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying when mowing is done" %}

{% example %}
automation: |
  alias: "Notify when the mower is done"
  triggers:
    - trigger: lawn_mower.docked
      target:
        entity_id: lawn_mower.backyard
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The backyard mower is back at the dock."
{% endexample %}

{% enddetails %}

### Automation: Return the mower to dock when rain starts

If rain starts while the mower is active, you can stop the run early and send it back to the dock.

- **Trigger**: State: Rain sensor turned on
- **Condition**: Lawn mower is mowing
  - **Target**: Backyard mower
- **Action**: Return lawn mower to dock

{% details "YAML example for docking the mower when rain starts" %}

{% example %}
automation: |
  alias: "Dock the mower when it starts raining"
  triggers:
    - trigger: state
      entity_id: binary_sensor.rain_detected
      to: "on"
  conditions:
    - condition: lawn_mower.is_mowing
      target:
        entity_id: lawn_mower.backyard
  actions:
    - action: lawn_mower.dock
      target:
        entity_id: lawn_mower.backyard
{% endexample %}

{% enddetails %}
