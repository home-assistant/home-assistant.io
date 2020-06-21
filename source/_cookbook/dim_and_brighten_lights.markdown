---
title: "Dim (and brighten) lights via a remote"
description: "The scripts and automations to allow you to use a remote to dim and brighten a light"
ha_category: Automation Examples
---

This requires both a dimmable light, and a Z-Wave remote control that sends one scene when a button is held, and another when released. This ensures that the scripts (which follow) are stopped, avoiding the risks of a script that never ends.

In the following automation, replace `zwave.YOUR_REMOTE` with the actual entity ID of your controller. For the controller this was written for scene ID 13 was sent when the up button was held, and 15 when released. Similarly, scene 14 when the down button was held, and 16 when released. You'll need to use the scene IDs that are sent by your remote if different.

```yaml
automation: 

  - alias: 'Make the lights go bright'
    initial_state: 'on'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          scene_id: 13
          entity_id: zwave.YOUR_REMOTE
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
          entity_id: zwave.YOUR_REMOTE
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
          entity_id: zwave.YOUR_REMOTE
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
          entity_id: zwave.YOUR_REMOTE
    action:
      - service: script.turn_off
        data:
          entity_id: script.light_dim
      - service: script.turn_off
        data:
          entity_id: script.light_dim_pause
```

There are 2 variables that control the speed of the change for the scripts below. The first is the `step`, small steps create a smooth transition. The second is the delay, larger delays will create a slower transition.

To allow flexibility, an [Input Number](/integrations/input_number/) is used for the step (at the time of writing this, it's not possible to template the delay when the delay uses milliseconds). Two additional [Input Numbers](/integrations/input_number/) are used to set the minimum and maximum brightness, so that it's easy to tune that (or manage it through an automation).

```yaml
input_number:
  light_step:
    name: 'Step the lights this much'
    initial: 20
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
    min: 50
    max: 255
    step: 1
```

Now the scripts. There are 2 pairs of scripts. The first steps the light brighter to the maximum and the second provides the delay. These call each other until both are stopped. The second pair does the same for dimming.

```yaml
# Replace YOURLIGHT with the actual light entity
script:
    light_bright:
      sequence:
        - service: light.turn_on
          data_template:
            entity_id: light.YOUR_LIGHT
            brightness: >-
              {% raw %}{% set current = state_attr('light.YOUR_LIGHT', 'brightness')|default(0)|int %}
              {% set step = states('input_number.light_step')|int %}
              {% set next = current + step %}
              {% if next > states('input_number.light_maximum')|int %}
                {% set next = states('input_number.light_maximum')|int %}
              {% endif %}
              {{ next }}{% endraw %}

        - service_template: >
            {% raw %}{% if state_attr('light.YOUR_LIGHT', 'brightness')|default(0)|int < states('input_number.light_maximum')|int %}
              script.turn_on
            {% else %}
              script.turn_off
            {% endif %}{% endraw %}
          data:
            entity_id: script.light_bright_pause
        
    light_bright_pause:
      sequence:
        - delay:
            milliseconds: 1
        - service: script.turn_on
          data:
            entity_id: script.light_bright

    light_dim:
      sequence:
        - service: light.turn_on
          data_template:
            entity_id: light.YOUR_LIGHT
            brightness: >-
              {% raw %}{% set current = state_attr('light.YOUR_LIGHT', 'brightness')|default(0)|int %}
              {% set step = states('input_number.light_step')|int %}
              {% set next = current - step %}
              {% if next < states('input_number.light_minimum')|int %}
                {% set next = states('input_number.light_minimum')|int %}
              {% endif %}
              {{ next }}{% endraw %}

        - service_template: >
            {% raw %}{% if state_attr('light.YOUR_LIGHT', 'brightness')|default(0)|int > states('input_number.light_minimum')|int %}
              script.turn_on
            {% else %}
              script.turn_off
            {% endif %}{% endraw %}
          data:
            entity_id: script.light_dim_pause
        
    light_dim_pause:
      sequence:
        - delay:
            milliseconds: 1
        - service: script.turn_on
          data:
            entity_id: script.light_dim
```
