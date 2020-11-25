---
title: "Advanced Actions"
description: "Automations can have conditionals"
---

Sometimes to keep things organized in one automation it might be needed to add logic to the action. 
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


[choose-a-group-of-actions]: /docs/scripts#choose-a-group-of-actions