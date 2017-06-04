---
layout: page
title: "Examples using first light"
description: "Automation examples that trigger lights in the morning."
date: 2016-10-08 19:05
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---

#### {% linkable_title Create an input_boolean in your configuration.yaml  %}

```yaml
input_boolean:
  trigger_first_morning:
    name: Waiting for first morning motion
    icon: mdi:kettle
```

#### {% linkable_title The Main Automation  %}

```yaml
## These first two control t input_boolean that allows the "first morning action" to occur
## If the action is triggered, it will also disable this boolean. This assumes you have the sun platform enabled.

automation:
#turns it on at 5am
  - alias: Enable First Morning Trigger
    trigger:
      - platform: time
        at: '5:00'
    action: 
      service: homeassistant.turn_on
      entity_id: input_boolean.trigger_first_morning

# turns it off an hour after sunrise
  - alias: Disable First Morning Trigger
    trigger:
      - platform: sun
        event: sunrise
        offset: "01:00:00"
    action: 
      service: homeassistant.turn_off
      entity_id: input_boolean.trigger_first_morning


      
# This is the main automation. It triggers when my motion sensor is triggered
# (in this case, a motion sensor from a security system attached to my Vera)
  - alias: First Morning Motion
    trigger:
      platform: state
      entity_id: binary_sensor.livingroom_motion
      to: 'on'
    # only complete the automation if we're still waiting for the first motion
    condition:
        condition: state
        entity_id: input_boolean.trigger_first_morning
        state: 'on'
        
    action:
      # turn off the "waiting" boolean regardless of whether lights will turn on
      # so that this happens only once
      - service: homeassistant.turn_off
        entity_id: input_boolean.trigger_first_morning
        
      # But only turn on lights if the living room and kitchen lights are off or dimmed
      # If a condition tests false, the automation will end 
      - condition: and
        conditions: 
          - condition: numeric_state
            entity_id: light.livingroom_ec
            # if light is off, force a 0, otherwise use the brightness value
            value_template: {% raw %}'{% if states.light.livingroom_ec.state == "on"  %}{{ states.light.livingroom_ec.attributes.brightness }}{% else %}0{% endif %}'{% endraw %}
            # brightness below 50% (255 = 100%)
            below: 128
          - condition: numeric_state
            entity_id: light.kitchen_bar
            value_template: {% raw %}'{% if states.light.kitchen_bar.state == "on"  %}{{ states.light.kitchen_bar.attributes.brightness }}{% else %}0{% endif %}'{% endraw %}
            below: 128
          - condition: numeric_state
            entity_id: light.kitchen_ceiling
            value_template: {% raw %}'{% if states.light.kitchen_ceiling.state == "on"  %}{{ states.light.kitchen_ceiling.attributes.brightness }}{% else %}0{% endif %}'{% endraw %}
            below: 128
                
      # Trigger a scene
      # You could add as many services or scenes as you'd like
      - service: scene.turn_on
        entity_id: scene.morning_first_motion

      
```

#### {% linkable_title The Scene %}

Here is the Scene that is called via the Automations above.

```yaml
# here's the scene that gets called. Lights in 
# my living room and kitchen turn on.
scene:
  - name: Morning First Motion
    entities:
      light.kitchen_ceiling:
        state: on
        brightness: 127
      light.kitchen_bar:
        state: on
        brightness: 178
      light.kitchen_above_cabinet:
        state: on
        brightness: 178
      light.livingroom_ec:
        state: on
        brightness: 153
      light.livingroom_track:
        state: on
        brightness: 153
```
