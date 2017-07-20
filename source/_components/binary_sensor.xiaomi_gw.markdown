---
layout: page
title: "Xiaomi Binary sensors”
description: "Instructions how to integrate your Xiaomi Binary sensors within Home Assistant."
date: 2017-07-21 16:34
sidebar: true
comments: false
sharing: true
footer: true
logo: xiaomi.png
ha_category: binary_sensor
ha_release: 0.50
---

To get your Xiaomi binary sensors working with Home Assistant, follow the instructions for the general [Xiaomi Gateway component](https://home-assistant.io/components/xiaomi_gw)

Type of sensors supported:
- Motion
```yaml
    # Trigger for motion sensor

    - alias: If there is motion and its dark turn on the gateway light
      trigger:
        platform: state
        entity_id: binary_sensor.motion_sensor_158d000xxxxxc2
        from: 'off'
        to: 'on'
      condition:
        condition: numeric_state
        entity_id: sensor.illumination_34ce00xxxx11
        below: 300
      action:
        service: light.turn_on
        entity_id: light.gateway_light_34ce00xxxx11
        data:
          brightness: 5

    - alias: If there no motion for 5 minutes turn off the gateway light
      trigger:
        platform: state
        entity_id: binary_sensor.motion_sensor_158d000xxxxxc2
        from: 'on'
        to: 'off'
        for:
          minutes: 5
      action:
        service: light.turn_off
        entity_id: light.gateway_light_34ce00xxxx11
  ```
  
- Door / Window
 ```yaml
    # Trigger for door window sensor

    - alias: If the window is open turn off the radiator
      trigger:
        platform: state
        entity_id: binary_sensor.door_window_sensor_158d000xxxxxc2
        from: 'off'
        to: 'on'
      action:
        service: climate.set_operation_mode
        entity_id: climate.livingroom
        data:
          operation_mode: 'Off'

    - alias: If the window is closed for 5 minutes turn on the radiator again
      trigger:
        platform: state
        entity_id: binary_sensor.door_window_sensor_158d000xxxxxc2
        from: 'on'
        to: 'off'
        for:
          minutes: 5
      action:
        service: climate.set_operation_mode
        entity_id: climate.livingroom
        data:
          operation_mode: 'Smart schedule'
  ```

  ```yaml
    # Trigger for door window sensor

    - alias: Send notification on fire alarm
      trigger:
        platform: state
        entity_id: binary_sensor.smoke_sensor_158d0001574899
        from: 'off'
        to: 'on'
      action:
        - service: notify.html5
          data:
            title: Fire alarm!
            message: Fire/Smoke detected!
        - service: xiaomi.play_ringtone
          data:
            gw_sid: xxxxxxxxxxxx
            ringtone_id: 2
            ringtone_vol: 100
  ```
- Smoke
- Gas
- Xiaomi Wireless Button (available events are `single`, `double`, `hold`, `long_click_press` and `long_click_release`.
 ```yaml
  automation:
    # Trigger for the wireless button with different click types

    - alias: Toggle dining light on single press
      trigger:
        platform: event
        event_type: click
        event_data:
          entity_id: binary_sensor.switch_158d000xxxxxc2
          click_type: single
      action:
        service: switch.toggle
        entity_id: switch.wall_switch_left_158d000xxxxx01

    - alias: Toggle couch light on double click
      trigger:
        platform: event
        event_type: click
        event_data:
          entity_id: binary_sensor.switch_158d000xxxxxc2
          click_type: double
      action:
        service: switch.toggle
        entity_id: switch.wall_switch_right_158d000xxxxx01

    - alias: Let a dog bark on long press
      trigger:
        platform: event
        event_type: click
        event_data:
          entity_id: binary_sensor.switch_158d000xxxxxc2
          click_type: long_click_press
      action:
        service: xiaomi.play_ringtone
        data:
          gw_sid: xxxxxxxxxxxx
          ringtone_id: 8
          ringtone_vol: 8
  ```

- Xiaomi Cube (available events are `flip90`, `flip180`, `move`, `tap_twice`, `shake_air`, `swing`, `alert`, `free_fall` and `rotate`.
```yaml
    trigger:
      platform: event
      event_type: cube_action
      event_data:
        entity_id: binary_sensor.cube_158d000xxxxxc2
        action_type: flip90
 ```


