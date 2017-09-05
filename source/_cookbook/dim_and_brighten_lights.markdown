---
layout: page
title: "Dim (and brighten) lights via a remote"
description: "The scripts and automations to allow you to use a remote to dim and brighten a light"
date: 2017-09-04 22:30
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---

This requires both a light on a dimmer, and a z-wave remote control that sends one scene when a button is held, and another when released. This ensures that the scripts (which follow) are stopped, avoiding the risks of a script that never ends.

In the following automation, replace `zwave.YOURCONTROLLER` with the actual entity ID of your controller. For the controller this was written for scene ID `13` was sent when the up button was held, and `15` when released. Similarly scene `14` when the down button was held, and `16` when released. You'll need to use the scene IDs that are sent by your remote if different.

```yaml
automation: 

  - alias: 'Make the lights go bright'
    initial_state: 'on'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          scene_id: 13
          entity_id: zwave.YOURCONTROLLER
    action:
      - service: script.turn_on
        data:
          entity_id: script.light_bright

  - alias: 'Stop the bright just there'
    initial_state: 'on'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          scene_id: 15
          entity_id: zwave.YOURCONTROLLER
    action:
      - service: script.turn_off
        data:
          entity_id: script.light_bright
      - service: script.turn_off
        data:
          entity_id: script.light_bright_pause

  - alias: 'Make the lights go dim'
    initial_state: 'on'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          scene_id: 14
          entity_id: zwave.YOURCONTROLLER
    action:
      - service: script.turn_on
        data:
          entity_id: script.light_dim

  - alias: 'Stop the dim just there'
    initial_state: 'on'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          scene_id: 16
          entity_id: zwave.YOURCONTROLLER
    action:
      - service: script.turn_off
        data:
          entity_id: script.light_dim
      - service: script.turn_off
        data:
          entity_id: script.light_dim_pause
```

There are 2 variables that control the speed of the change for the scripts below. The first is the `step` - smaller steps create a smoother transition. The second is the delay, smaller delays will create a faster transition.

To allow flexibility, we'll use an [input_slider](/components/input_slider/) for the step (at the time of writing this, it's not possible to template the delay when the delay uses milliseconds). We're also using a slider to set the minimum and maximum brightness, so that it's easy to tune that (or manage it through an automation).

```yaml
input_slider:
  light_step:
    name: 'Step the lights this much'
    initial: 3
    min: 1
    max: 64
    step: 1

  light_minimum:
    name: 'No dimmer than this'
    initial: 5
    min: 1
    max: 255
    step: 1
    
  light_maximum:
    name: 'No brighter than this'
    initial: 255
    min: 5
    max: 255
    step: 1
```

Now the scripts. There are 2 pairs of scripts. The first steps the light brighter, up to the maximum, and the second provides the delay between steps. These call each other until both are stopped. The second pair do the same for dimming.

```yaml
# Replace YOURLIGHT with the actual light entity
script:
    light_bright:
      sequence:
        - service: light.turn_on
          data_template:
            entity_id: light.YOURLIGHT
            brightness: >-
              {% set current = states.light.YOURLIGHT.attributes.brightness|int %}
              {% set step = states.input_slider.light_step.state|int %}
              {% set next = current + step %}
              {% if next > states.input_slider.light_maximum.state|int %}
                {% set next = states.input_slider.light_maximum.state|int %}
              {% endif %}
              {{ next }}

        - service: script.turn_on
          data:
            entity_id: script.light_bright_pause
        
    light_bright_pause:
      sequence:
        - delay:
            milliseconds: 5
        - service: script.turn_on
          data:
            entity_id: script.light_bright

    light_dim:
      sequence:
        - service: light.turn_on
          data_template:
            entity_id: light.YOURLIGHT
            brightness: >-
              {% set current = states.light.YOURLIGHT.attributes.brightness|int %}
              {% set step = states.input_slider.light_step.state|int %}
              {% set next = current - step %}
              {% if next < states.input_slider.light_minimum.state|int %}
                {% set next = states.input_slider.light_minimum.state|int %}
              {% endif %}
              {{ next }}

        - service: script.turn_on
          data:
            entity_id: script.light_dim_pause
        
    light_dim_pause:
      sequence:
        - delay:
            milliseconds: 5
        - service: script.turn_on
          data:
            entity_id: script.light_dim
```

