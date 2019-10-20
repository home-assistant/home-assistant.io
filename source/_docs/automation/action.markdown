---
title: "Automation Actions"
description: "Automations result in action."
redirect_from: /getting-started/automation-action/
---

The action of an automation rule is what is being executed when a rule fires. The action part follows the [script syntax](/docs/scripts/) which can be used to interact with anything via services or events. For services you can specify the entity_id that it should apply to and optional service parameters (to specify for example the brightness).

You can also call the service to activate [a scene](/integrations/scene/) which will allow you to define how you want your devices to be and have Home Assistant call the right services.

```yaml
automation:
  # Change the light in the kitchen and living room to 150 brightness and color red.
  trigger:
    platform: sun
    event: sunset
  action:
    service: light.turn_on
    data:
      brightness: 150
      rgb_color: [255, 0, 0]
      entity_id:
        - light.kitchen
        - light.living_room
automation 2:
  # Notify me on my mobile phone of an event
  trigger:
    platform: sun
    event: sunset
    offset: -00:30
  action:
    # Actions are scripts so can also be a list of actions
    - service: notify.notify
      data:
        message: Beautiful sunset!
    - delay: 0:35
    - service: notify.notify
      data:
        message: Oh wow you really missed something great.
```

Conditions can also be part of an action. You can combine multiple service calls and conditions in a single action, and they will be processed in the order you put them in. If the result of a condition is false, the action will stop there so any service calls after that condition will not be executed.

```yaml
automation:
- alias: 'Enciende Despacho'
  trigger:
    platform: state
    entity_id: sensor.mini_despacho
    to: 'ON'
  action:
    - service: notify.notify
      data:
        message: Testing conditional actions
    - condition: or
      conditions:
        - condition: template
          value_template: '{% raw %}{{ state_attr('sun.sun', 'elevation') < 4 }}{% endraw %}'
        - condition: template
          value_template: '{% raw %}{{ states('sensor.sensorluz_7_0') < 10 }}{% endraw %}'
    - service: scene.turn_on
      entity_id: scene.DespiertaDespacho
```
