---
title: Fan
description: Instructions on how to setup Fan devices within Home Assistant.
ha_category:
  - Fan
ha_release: 0.27
ha_quality_scale: internal
ha_domain: fan
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Fan** {% term integration %} allows you to control and monitor fan devices.

{% include integrations/building_block_integration.md %}

## The state of a fan entity

The state of a fan entity can be either **On** or **Off**.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Supported functionality

The **Fan** integration provides fan entities with these common features:

- Turning a fan on and off.
- Setting the speed as a percentage.
- Setting a preset mode.
- Turning oscillation on or off.
- Changing the rotation direction.
- Increasing or decreasing the speed in steps.

Not every fan supports every action. The actions available for a specific fan depend on the features exposed by that device.

{% include integrations/triggers_conditions_actions.md %}

## Fan automation examples

### Automation: Turn on the bedroom fan at bedtime

Start the bedroom fan automatically when you usually go to bed.

```yaml
automation:
  - alias: "Turn on bedroom fan at bedtime"
    triggers:
      - trigger: time
        at: "22:00:00"
    actions:
      - action: fan.turn_on
        target:
          entity_id: fan.bedroom
```

### Automation: Notify when the bathroom fan has been left on

If the bathroom fan has been running for a while, send a reminder to turn it off after the room has cleared.

```yaml
automation:
  - alias: "Bathroom fan reminder"
    triggers:
      - trigger: fan.turned_on
        target:
          entity_id: fan.bathroom
        options:
          behavior: any
          for: "00:20:00"
    actions:
      - action: notify.send_message
        target:
          entity_id: notify.my_device
        data:
          message: "The bathroom fan has been on for 20 minutes."
```
