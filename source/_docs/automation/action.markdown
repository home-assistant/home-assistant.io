---
title: "Automation actions"
description: "Automations result in action."
toc: false
---

The action of an automation is what is being executed when an automation fires. The action part follows the [script syntax](/docs/scripts/) which can be used to interact with anything via other actions or events.

For actions, you can specify the `entity_id` that it should apply to and optional parameters (to specify for example the brightness).

You can also perform the action to activate [a scene](/integrations/scene/) which will allow you to define how you want your devices to be and have Home Assistant perform the right action.

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

Conditions can also be steps in an action sequence. You can combine action and condition steps in one sequence, and Home Assistant processes them in the order you put them in. If a condition evaluates to false, the sequence stops there, so later actions are not executed.

In the following example, the `or` condition lets the remaining actions run when either the sun is low enough or the office illuminance is below 10. If neither condition is true, the automation stops before activating the scene, lights, and switches. For more information about the available condition types and their syntax, see [conditions](/docs/scripts/conditions/).

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
