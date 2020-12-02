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
  variables:
    notification_service: notify.paulus_iphone
  action:
    # Actions are scripts so can also be a list of actions
    - service: "{{ notification_service }}"
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
- alias: 'Office at evening'
  trigger:
    platform: state
    entity_id: sensor.office_occupancy
    to: 'on'
  action:
    - service: notify.notify
      data:
        message: Testing conditional actions
    - condition: or
      conditions:
        - condition: template
          value_template: '{% raw %}{{ state_attr('sun.sun', 'elevation') < 4 }}{% endraw %}'
        - condition: template
          value_template: '{% raw %}{{ states('sensor.office_illuminance') < 10 }}{% endraw %}'
    - service: scene.turn_on
      entity_id: scene.office_at_evening
```

## Script actions in automations

Within actions you can also use [script syntax][script-syntax].

To achieve more in one single automation it might be needed to add logic to the action.
In this case we can use a `choose` action.
> The choose action can be used like an “if” statement. The first conditions/sequence pair is like the “if/then”, and can be used just by itself. Or additional pairs can be added, each of which is like an “elif/then”. And lastly, a default can be added, which would be like the “else.”

For more information about `choose` you can see over here: [choose-a-group-of-actions][choose-a-group-of-actions]

In the example below we want a single button to turn on the lights, as well as increase brightness if the lights are already on.

{% raw %}

```yaml
automation:
  - alias: 'Light button'
    # Our trigger is the press of the button.
    trigger:
      platform: device
      device_id: 63d99fbdffe411ea
      type: click
      subtype: single_right
    # We don't have a seperate condition, we manage this in the action.
    condition: []
    action:
    - choose:
      # The first condition, if the light is off turn on 1 out of the 3 lights.
      - conditions:
        - condition: state
          entity_id: group.bathroom
          state: 'off'
        sequence:
        - type: turn_on
          entity_id: light.bathroom_1
          domain: light
          brightness_pct: 10
      # If the lights are already on, call the increase_brightness script.
      - conditions:
        - condition: state
          state: 'on'
          entity_id: group.bathroom
        sequence:
        - service: script.increase_brightness
          data:
            group: light.bathroom_lights_group
      # We don't use the default action in this case
      default: []
```

{% endraw %}

[script-syntax]: /docs/scripts
[choose-a-group-of-actions]: /docs/scripts#choose-a-group-of-actions
