---
title: "Automation actions"
description: "Actions are what an automation does, for example, turning on a light or sending a notification. Building blocks control whether, when, and in which order the actions run."
toc: false
---

The actions of an automation make something happen, for example, turning on a light or sending a notification. Usually, they run after a trigger has started the automation and the conditions are met. In the visual automation editor, the actions are in the **Then do** section. You can also run them directly from there, for example, with **Run actions**. This skips the triggers and the conditions.

An automation can also use building blocks. Building blocks control whether, when, and in which order the actions run, for example, to wait a few seconds or to repeat steps. For all building blocks, refer to [Building blocks and actions](/docs/scripts/). For all actions that you can use, refer to the [list of available actions](/actions/).

Many actions have a target, for example, the lights to turn on, and options, for example, the brightness.

An action can also activate a [scene](/docs/scene/), which sets its devices and entities to saved states in one step.

The following examples show two automations. The first changes two lights at sunset. The second sends notifications before and after sunset and uses a variable to set the `action:` value for the first notification.

```yaml
automation:
  - alias: "Set sunset lighting"
    triggers:
      - trigger: sun
        event: sunset
    actions:
      - action: light.turn_on
        target:
          entity_id:
            - light.kitchen
            - light.living_room
        data:
          brightness: 150
          rgb_color:
            - 255
            - 0
            - 0

  - alias: "Send sunset notifications"
    triggers:
      - trigger: sun
        event: sunset
        offset: -00:30
    variables:
      notification_action: notify.paulus_iphone
    actions:
      # The action value can be templated with a variable.
      - action: "{{ notification_action }}"
        data:
          message: "Beautiful sunset!"
      - delay: 0:35
      - action: notify.notify
        data:
          message: "Oh wow you really missed something great."
```

Conditions can also be steps in an action sequence. You can combine action and condition steps in one sequence, and Home Assistant processes them in the order you put them in. If a condition evaluates to false, the sequence stops there, so the actions after it don't run.

In the following example, the `or` condition lets the remaining actions run when either the sun is low enough or the office illuminance is below 10. If neither condition is true, the automation stops before activating the scene, lights, and switches. For more information about the available condition types and their syntax, refer to [Conditions](/docs/scripts/conditions/).

```yaml
automation:
  - alias: "Office at evening"
    triggers:
      - trigger: state
        entity_id: sensor.office_occupancy
        to: "on"
    actions:
      - action: notify.notify
        data:
          message: "Testing conditional actions"
      - condition: or
        conditions:
          - condition: numeric_state
            entity_id: sun.sun
            attribute: elevation
            below: 4
          - condition: numeric_state
            entity_id: sensor.office_illuminance
            below: 10
      - action: scene.turn_on
        target:
          entity_id: scene.office_at_evening
      - action: light.turn_on
        target:
          entity_id:
            - light.office
            - light.office_2
      - action: switch.turn_on
        target:
          label_id:
            - office_evening
            - office_after_15
```
