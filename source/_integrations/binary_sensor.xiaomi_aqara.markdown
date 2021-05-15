---
title: "Xiaomi Binary Sensor"
description: "Instructions on how to setup the Xiaomi binary sensors within Home Assistant."
ha_category:
  - Binary Sensor
ha_release: "0.50"
ha_iot_class: Local Push
ha_domain: xiaomi_aqara
---

The `xiaomi aqara` binary sensor platform allows you to get data from your [Xiaomi](https://www.mi.com/en/) binary sensors.

The requirement is that you have setup the [`xiaomi aqara` integration](/integrations/xiaomi_aqara/).

### Type of sensors supported

| Name | Zigbee entity | Model no. | States | Event | Event key | Event values |
| ---- | ------------- | --------- | ------ | ----- | --------- | ------------ |
| Motion Sensor (1st gen) | motion | RTCGQ01LM | on, off | `xiaomi_aqara.motion` | | |
| Motion Sensor (2nd gen) | sensor_motion.aq2 | RTCGQ11LM | on, off | `xiaomi_aqara.motion` | | |
| Xiaomi Door and Window Sensor (1st gen) | magnet | MCCGQ01LM | on, off | | | |
| Aqara Door and Window Sensor (2nd gen) | sensor_magnet.aq2 | MCCGQ11LM | on, off | | | |
| Smoke Detector | smoke | JTYJ-GD-01LM/BW | on, off | | | |
| Gas Leak Detector | natgas | JTQJ-BF-01LM/BW | on, off | | | |
| Water Leak Sensor | sensor_wleak.aq1 | SJCGQ11LM | on, off | | | |
| Button (1st gen) | switch | WXKG01LM | on (through long_click_press), off | `xiaomi_aqara.click`| `click_type`| `long_click_press`, `hold`, `single`, `double` |
| Button (2nd gen) | sensor_switch.aq2, remote.b1acn01 | WXKG11LM | on (through long_click_press), off | `xiaomi_aqara.click` | `click_type` | `single`, `double`, `long_click_press`, `hold` |
| Button (2nd gen, model b) | sensor_switch.aq3 | WXKG12LM | off (always) | `xiaomi_aqara.click` | `click_type` | `single`, `double`, `long_click_press`, `shake` |
| Aqara Wireless Switch (Single) | 86sw1 | WXKG03LM | off (always) | `xiaomi_aqara.click` | `click_type` | `single` |
| Aqara Wireless Switch (Double) | 86sw2 | WXKG02LM | off (always) | `xiaomi_aqara.click` | `click_type` | `single`, `both` |
| Aqara Wireless Switch (Single) (2nd gen) | remote.b186acn01 | WXKG03LM | off (always) | `xiaomi_aqara.click` | `click_type` | `single`, `double`, `long` |
| Aqara Wireless Switch (Double) (2nd gen) | remote.b286acn01 | WXKG02LM | off (always) | `xiaomi_aqara.click` | `click_type` | `single`, `double`, `long`, `both`, `double_both`, `long_both` |
| Cube | cube | MFKZQ01LM | off (always) | `xiaomi_aqara.cube_action` | `action_type`, `action_value` (rotate) | `flip90`, `flip180`, `move`, `tap_twice`, `shake_air`, `swing`, `alert`, `free_fall`, `rotate` (degrees at action_value) |
| Vibration Sensor | vibration | DJT11LM | off (always) | `xiaomi_aqara.movement` | `movement_type` | `vibrate`, `tilt`, `free_fall` |

### Automation examples

#### Motion

```yaml
- alias: "If there is motion and its dark turn on the gateway light"
  trigger:
    platform: state
    entity_id: binary_sensor.motion_sensor_158d000xxxxxc2
    from: "off"
    to: "on"
  condition:
    condition: numeric_state
    entity_id: sensor.illumination_34ce00xxxx11
    below: 300
  action:
    - service: light.turn_on
      target:
        entity_id: light.gateway_light_34ce00xxxx11
      data:
        brightness: 5
    - service: automation.turn_on
      target:
        entity_id: automation.MOTION_OFF
- alias: "If there no motion for 5 minutes turn off the gateway light"
  trigger:
    platform: state
    entity_id: binary_sensor.motion_sensor_158d000xxxxxc2
    from: "on"
    to: "off"
    for:
      minutes: 5
  action:
    - service: light.turn_off
      target:
        entity_id: light.gateway_light_34ce00xxxx11
    - service: automation.turn_off
      target:
        entity_id: automation.Motion_off
```

#### Door and/or Window

```yaml
- alias: "If the window is open turn off the radiator"
  trigger:
    platform: state
    entity_id: binary_sensor.door_window_sensor_158d000xxxxxc2
    from: "off"
    to: "on"
  action:
    service: climate.set_operation_mode
    target:
      entity_id: climate.livingroom
    data:
      operation_mode: "Off"
- alias: "If the window is closed for 5 minutes turn on the radiator again"
  trigger:
    platform: state
    entity_id: binary_sensor.door_window_sensor_158d000xxxxxc2
    from: "on"
    to: "off"
    for:
      minutes: 5
  action:
    service: climate.set_operation_mode
    target:
      entity_id: climate.livingroom
    data:
      operation_mode: "Smart schedule"
- alias: "Notify if door is opened when away"
  trigger:
    platform: state
    entity_id: binary_sensor.door_window_sensor_15xxxxxxc9xx6b
    from: "off"
    to: "on"
  condition:
    - condition: state
      entity_id: group.family
      state: "not_home"
  action:
    - service: notify.notify_person
      data:
        message: "The door has been opened"
```

#### Smoke

```yaml
- alias: "Send notification on fire alarm"
  trigger:
    platform: state
    entity_id: binary_sensor.smoke_sensor_158d0001574899
    from: "off"
    to: "on"
  action:
    - service: notify.html5
      data:
        title: Fire alarm!
        message: Fire/Smoke detected!
    - service: xiaomi_aqara.play_ringtone
      data:
        gw_mac: xxxxxxxxxxxx
        ringtone_id: 2
        ringtone_vol: 100
```

#### Gas

{% raw %}

```yaml
- alias: "Send notification on gas alarm"
  trigger:
    platform: state
    entity_id: binary_sensor.natgas_sensor_158dxxxxxxxxxx
    from: "off"
    to: "on"
  action:
    - service: notify.html5
      data:
        title: Gas alarm!
        message: "Gas with a density of {{ state_attr('binary_sensor.natgas_sensor_158dxxxxxxxxxx', 'density') }} detected."
```

{% endraw %}

#### Xiaomi Wireless Button

As indicated in the table on top of this page there are 3 versions of the button. For the round shaped button the available events are `single`, `double`, `hold`, `long_click_press` and `long_click_release`. Aqara branded buttons are square shaped. Model WXKG11LM only supports `single`, `double`, `long_click_press`and `hold` events. WXKG12LM supports `single`, `double`, `long_click_press` and `shake` events. For the Aqara versions the delay between two clicks to generate a double click must be larger than with the round button. Clicking too quickly generates a single click event.

```yaml
- alias: "Toggle dining light on single press"
  trigger:
    platform: event
    event_type: xiaomi_aqara.click
    event_data:
      entity_id: binary_sensor.switch_158d000xxxxxc2
      click_type: single
  action:
    service: switch.toggle
    target:
      entity_id: switch.wall_switch_left_158d000xxxxx01
- alias: "Toggle couch light on double click"
  trigger:
    platform: event
    event_type: xiaomi_aqara.click
    event_data:
      entity_id: binary_sensor.switch_158d000xxxxxc2
      click_type: double
  action:
    service: switch.toggle
    target:
      entity_id: switch.wall_switch_right_158d000xxxxx01
- alias: "Let a dog bark on long press"
  trigger:
    platform: event
    event_type: xiaomi_aqara.click
    event_data:
      entity_id: binary_sensor.switch_158d000xxxxxc2
      click_type: long_click_press
  action:
    service: xiaomi_aqara.play_ringtone
    data:
      gw_mac: xxxxxxxxxxxx
      ringtone_id: 8
      ringtone_vol: 8
```

#### Xiaomi Cube

Available events are `flip90`, `flip180`, `move`, `tap_twice`, `shake_air`, `swing`, `alert`, `free_fall` and `rotate`. The integration stores the last action as the attribute `last_action`.

```yaml
- alias: "Cube event flip90"
  trigger:
    platform: event
    event_type: xiaomi_aqara.cube_action
    event_data:
      entity_id: binary_sensor.cube_15xxxxxxxxxxxx
      action_type: flip90
  action:
    - service: light.turn_on
      target:
        entity_id: light.gateway_light_28xxxxxxxxxx
      data:
        color_name: "springgreen"
- alias: "Cube event flip180"
  trigger:
    platform: event
    event_type: xiaomi_aqara.cube_action
    event_data:
      entity_id: binary_sensor.cube_15xxxxxxxxxxxx
      action_type: flip180
  action:
    - service: light.turn_on
      target:
        entity_id: light.gateway_light_28xxxxxxxxxx
      data:
        color_name: "darkviolet"
- alias: "Cube event move"
  trigger:
    platform: event
    event_type: xiaomi_aqara.cube_action
    event_data:
      entity_id: binary_sensor.cube_15xxxxxxxxxxxx
      action_type: move
  action:
    - service: light.turn_on
      target:
        entity_id: light.gateway_light_28xxxxxxxxxx
      data:
        color_name: "gold"
- alias: "Cube event tap_twice"
  trigger:
    platform: event
    event_type: xiaomi_aqara.cube_action
    event_data:
      entity_id: binary_sensor.cube_15xxxxxxxxxxxx
      action_type: tap_twice
  action:
    - service: light.turn_on
      target:
        entity_id: light.gateway_light_28xxxxxxxxxx
      data:
        color_name: "deepskyblue"
- alias: "Cube event shake_air"
  trigger:
    platform: event
    event_type: xiaomi_aqara.cube_action
    event_data:
      entity_id: binary_sensor.cube_15xxxxxxxxxxxx
      action_type: shake_air
  action:
    - service: light.turn_on
      target:
        entity_id: light.gateway_light_28xxxxxxxxxx
      data:
        color_name: "blue"
```

#### Aqara Wireless Switch

The Aqara Wireless Switch is available as single-key and double-key version. Each key behaves like the Wireless Button limited to the click event `single`. The double key version adds a third device called `binary_sensor.wall_switch_both_158xxxxxxxxx12` which reports a click event called `both` if both keys are pressed.

{% raw %}

```yaml
- alias: "Decrease brightness of the gateway light"
  trigger:
    platform: event
    event_type: xiaomi_aqara.click
    event_data:
      entity_id: binary_sensor.wall_switch_left_158xxxxxxxxx12
      click_type: single
  action:
    service: light.turn_on
    target:
      entity_id: light.gateway_light_34xxxxxxxx13
    data:
      brightness: >-
        {% if state_attr('light.gateway_light_34xxxxxxxx13', 'brightness') %}
          {% if state_attr('light.gateway_light_34xxxxxxxx13', 'brightness') - 60 >= 10 %}
            {{state_attr('light.gateway_light_34xxxxxxxx13', 'brightness') - 60}}
          {% else %}
            {{state_attr('light.gateway_light_34xxxxxxxx13', 'brightness')}}
          {% endif %}
        {% else %}
          10
        {% endif %}

- alias: "Increase brightness of the gateway light"
  trigger:
    platform: event
    event_type: xiaomi_aqara.click
    event_data:
      entity_id: binary_sensor.wall_switch_right_158xxxxxxxxx12
      click_type: single
  action:
    service: light.turn_on
    target:
      entity_id: light.gateway_light_34xxxxxxxx13
    data:
      brightness: >-
        {% if state_attr('light.gateway_light_34xxxxxxxx13', 'brightness') %}
          {% if state_attr('light.gateway_light_34xxxxxxxx13', 'brightness') + 60 <= 255 %}
            {{state_attr('light.gateway_light_34xxxxxxxx13', 'brightness') + 60}}
          {% else %}
            {{state_attr('light.gateway_light_34xxxxxxxx13', 'brightness')}}
          {% endif %}
        {% else %}
          10
        {% endif %}

- alias: "Turn off the gateway light"
  trigger:
    platform: event
    event_type: xiaomi_aqara.click
    event_data:
      entity_id: binary_sensor.wall_switch_both_158xxxxxxxxx12
      click_type: both
  action:
    service: light.turn_off
    target:
      entity_id: light.gateway_light_34xxxxxxxx13
```

{% endraw %}

#### Vibration Sensor

This automation toggles the living room lamp on vibration/tilt.

```yaml
- alias: "Turn on Living Room Lamp on vibration"
  trigger:
    platform: event
    event_type: xiaomi_aqara.movement
    event_data:
      entity_id: binary_sensor.vibration_xxxx000000
      movement_type: vibrate
  action:
    service: light.toggle
    target:
      entity_id: light.living_room_lamp
- alias: "Turn on Living Room Lamp on tilt"
  trigger:
    platform: event
    event_type: xiaomi_aqara.movement
    event_data:
      entity_id: binary_sensor.vibration_xxxx000000
      movement_type: tilt
  action:
    service: light.toggle
    target:
      entity_id: light.living_room_lamp
```
