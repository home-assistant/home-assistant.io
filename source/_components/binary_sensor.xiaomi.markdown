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
ha_category: Binary sensor
ha_release: "0.50"
---

To get your Xiaomi binary sensors working with Home Assistant, follow the instructions for the general [Xiaomi Gateway component](/components/xiaomi/)

### Type of sensors supported:
- Motion
- Door / Window
- Smoke
- Gas
- Xiaomi Wireless Button
- Xiaomi Cube

### Some automation examples to get you started:
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
- Smoke
  ```yaml
    # Trigger for smoke sensor

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
            gw_mac: xxxxxxxxxxxx
            ringtone_id: 2
            ringtone_vol: 100
  ```
- Gas
```yaml
    # Trigger for natgas detected

    - alias: Send notification on gas alarm
      trigger:
        platform: state
        entity_id: binary_sensor.natgas_sensor_158dxxxxxxxxxx
        from: 'off'
        to: 'on'
      action:
        - service: notify.html5
          data_template:
            title: Gas alarm!
            message: 'Gas with a density of {{ states.binary_sensor.natgas_sensor_158dxxxxxxxxxx.attributes.density }} detected.'
```
- Xiaomi Wireless Button (available events are `single`, `double`, `hold`, `long_click_press` and `long_click_release`). For Square version (Aqara brand) only `single` and `double` events are supported. Furthermore the space between two clicks to generate a double click must be quite large now
```yaml
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
          gw_mac: xxxxxxxxxxxx
          ringtone_id: 8
          ringtone_vol: 8
  ```

- Xiaomi Cube (available events are `flip90`, `flip180`, `move`, `tap_twice`, `shake_air`, `swing`, `alert`, `free_fall` and `rotate`).
```yaml
    # Trigger for a few cube events

    - alias: Cube event flip90
      trigger:
        platform: event
        event_type: cube_action
        event_data:
          entity_id: binary_sensor.cube_15xxxxxxxxxxxx
          action_type: flip90
      action:
        - service: light.turn_on
          entity_id: light.gateway_light_28xxxxxxxxxx
          data:
            color_name: "springgreen"
                                                                                                                                                                                                       
    - alias: Cube event flip180                                                                                                                                                                              
      trigger:                                                                                                                                                                                         
        platform: event                                                                                                                                                                                
        event_type: cube_action                                                                                                                                                                        
        event_data:                                                                                                                                                                                    
          entity_id: binary_sensor.cube_15xxxxxxxxxxxx                                                                                                                                                 
          action_type: flip180                                                                                                                                                                         
      action:                                                                                                                                                                                          
        - service: light.turn_on
          entity_id: light.gateway_light_28xxxxxxxxxx
          data:
            color_name: "darkviolet"
                                                                                                                                                                                                       
    - alias: Cube event move                                                                                                                                                                                 
      trigger:                                                                                                                                                                                         
        platform: event                                                                                                                                                                                
        event_type: cube_action                                                                                                                                                                        
        event_data:                                                                                                                                                                                    
          entity_id: binary_sensor.cube_15xxxxxxxxxxxx                                                                                                                                                 
          action_type: move                                                                                                                                                                            
      action:                                                                                                                                                                                          
        - service: light.turn_on
          entity_id: light.gateway_light_28xxxxxxxxxx
          data:
            color_name: "gold"
                                                                                                                                                                                                       
    - alias: Cube event tap_twice                                                                                                                                                                            
      trigger:                                                                                                                                                                                         
        platform: event                                                                                                                                                                                
        event_type: cube_action                                                                                                                                                                        
        event_data:
          entity_id: binary_sensor.cube_15xxxxxxxxxxxx
          action_type: tap_twice
      action:
        - service: light.turn_on
          entity_id: light.gateway_light_28xxxxxxxxxx
          data:
            color_name: "deepskyblue"
    
    - alias: Cube event shake_air
      trigger:
        platform: event
        event_type: cube_action
        event_data:
          entity_id: binary_sensor.cube_15xxxxxxxxxxxx
          action_type: shake_air
      action:
        - service: light.turn_on
          entity_id: light.gateway_light_28xxxxxxxxxx
          data:
            color_name: "blue"
 ```
