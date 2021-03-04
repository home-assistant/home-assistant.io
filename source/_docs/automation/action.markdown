---
title: "Automation Actions"
description: "Automations result in action."
---

The action of an automation rule is what is being executed when a rule fires. The action part follows the [script syntax](/docs/scripts/) which can be used to interact with anything via services or events. For services you can specify the entity_id that it should apply to and optional service parameters (to specify for example the brightness).

You can also call the service to activate [a scene](/integrations/scene/) which will allow you to define how you want your devices to be and have Home Assistant call the right services.

```yaml
automation:
  # Change the light in the kitchen and living room to 150 brightness and color red.
  trigger:
    - platform: sun
      event: sunset
  action:
    - service: light.turn_on
      target:
        entity_id:
          - light.kitchen
          - light.living_room
      data:
        brightness: 150
        rgb_color: [255, 0, 0]

automation 2:
  # Notify me on my mobile phone of an event
  trigger:
    - platform: sun
      event: sunset
      offset: -00:30
  variables:
    notification_service: notify.paulus_iphone
  action:
    # Actions are scripts so can also be a list of actions
    - service: "{{ notification_service }}"
      data:
        message: "Beautiful sunset!"
    - delay: 0:35
    - service: notify.notify
      data:
        message: "Oh wow you really missed something great."
```

Conditions can also be part of an action. You can combine multiple service calls and conditions in a single action, and they will be processed in the order you put them in. If the result of a condition is false, the action will stop there so any service calls after that condition will not be executed.

```yaml
automation:
- alias: "Office at evening"
  trigger:
    - platform: state
      entity_id: sensor.office_occupancy
      to: "on" 
  action:
    - service: notify.notify
      data:
        message: "Testing conditional actions"
    - condition: or
      conditions:
        - condition: numeric_state
          entity_id: sun.sun
          attribute: elevation
          below: 4
        - condition: state
          entity_id: sensor.office_illuminance
          below: 10
    - service: scene.turn_on
      target:
        entity_id: scene.office_at_evening
```
