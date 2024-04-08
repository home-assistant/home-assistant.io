---
title: Room Occupancy
description: Instructions to create a room occupancy sensor.
ha_category:
  - Binary sensor
ha_iot_class: calculated
ha_release: 2024.4
ha_domain: room_occupancy
ha_config_flow: true
ha_quality_scale: silver
ha_codeowners:
  - '@maxgeilert'
ha_platforms:
  - binary_sensor
---

You need quiet a few sensors to reliably tell if a room is occupied or not. This ranges from motion- and presence sensors over door contacts to media players and input booleans. This integration combines all of those into a neat package and adds a timeout functionality, making it easy to base automations on a simple binary sensor.

{% include integrations/config_flow.md %}

When adding the integration, the following configuration is necessary:

{% configuration %}
name:
  description: The name of the sensor, most likely a room name
  required: true
  type: string
timeout:
  description: Number of minutes it takes to set the sensor to off.
  required: true
  type: integer
entities_toggle:
  description: List of entities which are allowed to turn the sensor on. These should be sensors with low false-positive rates, e.g. motion sensors.
  required: true
  type: list
entities_keep:
  description: List of entities which will only be taken into account if the sensor is already on. These can be sensors which tend to have false positives like mmwave sensors.
  required: false
  type: list
{% endconfiguration %}

## Example automations
To use this sensor, you've to create automations to control your room.

### Light automation
``` yaml
- alias: room light
  description: 'occupancy light control'
  trigger:
  - platform: state
    entity_id: binary_sensor.room_occupancy
    id: 'on'
    to: detected
  - platform: state
    entity_id: binary_sensor.room_occupancy
    id: 'on'
    to: clear
  condition: []
  action:
  - choose:
    - conditions:
        - condition: trigger
          id: "on"
      sequence:
        - service: light.turn_on
          target:
            entity_id: light.my_light
    - conditions:
      - condition: trigger
        id: 'off'
      sequence:
      - service: light.turn_off
        target:
          entity_id: light.my_light
    default: []
  mode: single
  id: someid
```

### Music automation
``` yaml
- alias: room music
  description: 'occupancy music control'
  trigger:
  - platform: state
    entity_id: binary_sensor.room_occupancy
    id: 'on'
    to: detected
  - platform: state
    entity_id: binary_sensor.room_occupancy
    id: 'on'
    to: clear
  condition: []
  action:
  - choose:
    - conditions:
      - condition: trigger
        id: 'on'
      sequence:
      - service: media_player.volume_mute
        data:
          is_volume_muted: false
        target:
          entity_id: 
            - media_player.room
    - conditions:
      - condition: trigger
        id: 'off'
      sequence:
      - service: media_player.volume_mute
        data:
          is_volume_muted: true
        target:
          entity_id: 
            - media_player.room
    default: []
  mode: single
  id: someid
```