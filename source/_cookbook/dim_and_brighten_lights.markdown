---
title: "Dim (and brighten) lights via a remote"
description: "The scripts and automations to allow you to use a remote to dim and brighten a light"
ha_category: Automation Examples
---

This requires both a dimmable light, and a Z-Wave remote control that sends one scene when a button is held, and another when released. This ensures that the scripts (which follow) are stopped, avoiding the risks of a script that never ends.

In the following automations, replace `zwave.YOUR_REMOTE` with the actual entity ID of your controller, and `light.YOUR_LIGHT` with the actual entity ID of your light.

For the controller this was written for scene ID 13 was sent when the up button was held, and 15 when released. Similarly, scene 14 when the down button was held, and 16 when released. You'll need to use the scene IDs that are sent by your remote if different.

```yaml
automation: 

  - alias: "Make the lights go bright"
    initial_state: "on"
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          scene_id: 13
          entity_id: zwave.YOUR_REMOTE
    action:
      - service: script.turn_on
        target:
          entity_id: script.ramp_light
        data:
          variables:
            direction: up
            light: light.YOUR_LIGHT

  - alias: "Make the lights go dim"
    initial_state: "on"
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          scene_id: 14
          entity_id: zwave.YOUR_REMOTE
    action:
      - service: script.turn_on
        target:
          entity_id: script.ramp_light
        data:
          variables:
            direction: down
            light: light.YOUR_LIGHT

  - alias: "Stop the light just there"
    initial_state: "on"
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          scene_id: 15
          entity_id: zwave.YOUR_REMOTE
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          scene_id: 16
          entity_id: zwave.YOUR_REMOTE
    action:
      - service: script.turn_off
        target:
          entity_id: script.ramp_light
```

There are two variables that control the speed of the change for the script below. The first is the step -- small steps create a smooth transition. The second is the delay -- larger delays will create a slower transition.
Please note that some lights do not update their new brightness attribute very quickly, so make sure to use a large enough delay for your particular light.

There are two other variables that control the minimum and maximum brightness levels at which to stop the script.

To allow flexibility all four variables are controlled by [Input Number](/integrations/input_number/) entities so that it's easy to tune (or manage through an automation).

```yaml
input_number:
  light_step:
    name: "Step the lights this much"
    initial: 20
    min: 1
    max: 64
    step: 1

  light_minimum:
    name: "No dimmer than this"
    initial: 5
    min: 1
    max: 255
    step: 1

  light_maximum:
    name: "No brighter than this"
    initial: 255
    min: 50
    max: 255
    step: 1

  light_delay_ms:
    name: "Step the lights this often (ms)"
    initial: 500
    min: 100
    max: 5000
    step: 100
```

Now the script.

{% raw %}
```yaml
script:
  ramp_light:
    alias: "Ramp Light Brightness"
    description: Ramp light brightness up or down
    fields:
      direction:
        description: "Direction to change brightness: up or down"
        example: up
      light:
        description: Light entity_id
        example: light.family_room_lamp
    mode: restart
    sequence:
      - repeat:
          while:
            - condition: template
              value_template: >
                {% set br = state_attr(light, 'brightness')|int(0) %}
                {% set mn = states('input_number.light_minimum')|int %}
                {% set mx = states('input_number.light_maximum')|int %}
                {{ direction == 'up' and br < mx or
                   direction == 'down' and br > mn }}
          sequence:
            - service: light.turn_on
              target:
                entity_id: "{{ light }}"
              data:
                brightness: >
                  {% set br = state_attr(light, 'brightness')|int(0) %}
                  {% set mn = states('input_number.light_minimum')|int %}
                  {% set mx = states('input_number.light_maximum')|int %}
                  {% set st = states('input_number.light_step')|int %}
                  {% if direction == 'up' %}
                    {{ [br + st, mx]|min }}
                  {% else %}
                    {{ [br - st, mn]|max }}
                  {% endif %}
            - delay:
                milliseconds: "{{ states('input_number.light_delay_ms')|int }}"
```
{% endraw %}
