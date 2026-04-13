---
title: "Automation behavior options"
description: "Learn how automation behavior options affect triggers and conditions when you target multiple entities in Home Assistant."
---

When creating automations with triggers or conditions that target multiple entities, here is how Home Assistant evaluates them.

## Trigger behavior

When multiple entities are specified in a trigger, the automation fires when **any one** of them matches the condition. There is no extra field needed — this is the default behavior.

```yaml
automation:
  triggers:
    - trigger: state
      entity_id:
        - sensor.temperature_living_room
        - sensor.temperature_kitchen
      to: "hot"
  actions:
    - action: notify.mobile_app
      data:
        message: "A room is getting hot!"
```

## Condition behavior

### All conditions must pass (AND logic)

By default, multiple conditions are evaluated as AND — all must pass for the automation to run.

```yaml
automation:
  triggers:
    - trigger: time
      at: "18:00"
  conditions:
    - condition: state
      entity_id: person.alice
      state: "home"
    - condition: state
      entity_id: person.bob
      state: "home"
  actions:
    - action: media_player.play_media
      target:
        entity_id: media_player.living_room
```

### At least one condition must pass (OR logic)

Use `match: any` when checking multiple entities against the same state, or use a `condition: or` block for different condition types.

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:00"
  conditions:
    - condition: state
      entity_id:
        - person.alice
        - person.bob
      state: "home"
      match: any
  actions:
    - action: climate.set_temperature
      data:
        temperature: 21
      target:
        entity_id: climate.living_room
```