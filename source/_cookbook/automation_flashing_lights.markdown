---
title: "Examples for flashing lights"
description: "Automation examples for flashing lights in case of an alarm."
ha_category: Automation Examples
---

#### Flashing lights triggered by an alarm

For flashing regular lights in case an alarm is triggered.

```yaml
# AlmAct1 - switch to activate the alarm in Room1
# AlmSnd1 - switch for a buzzer

automation:
- alias: "Alarm_PIR_Room1"
  trigger:
    platform: state
    entity_id: binary_sensor.PIR1
    to: "on"
  condition:
    - condition: state
      entity_id: switch.AlmAct1
      state: "on"
    - condition: state
      entity_id: script.alarm_room1
      state: "off"
  action:
    # start alarm on movement if alarm activated
    # and the alarm is not triggered
    service: script.turn_on
    target:
      entity_id: script.alarm_room1

- alias: "flash_room1_start"
  trigger:
    platform: state
    entity_id: switch.AlmSnd1
    to: "on"
  action:
    service: script.turn_on
    target:
      entity_id: script.flash_room1

- alias: "flash_room1_stop"
  trigger:
    platform: state
    entity_id: switch.REL1
    to: "off"
  condition:
    condition: state
    entity_id: switch.AlmSnd1
    state: "off"
  action:
    service: script.turn_off
    target:
      entity_id: script.flash_room1

script:
  alarm_room1:
    alias: "Alarm room1"
    sequence:
      - alias: "Alarm Room1 Start"
        service: homeassistant.turn_on
        target:
          entity_id: switch.AlmSnd1
      - alias: "Set Ack Room1"
        service: homeassistant.turn_on
        target:
          entity_id: input_boolean.ack1
      - alias: "email_Room1"
        service: notify.email
        data:
          message: "Movement alarm in Room1"
      - delay:
          # time interval for alarm sound and light flashing
          seconds: 60
      - alias: "Alarm Room1 Stop"
        service: homeassistant.turn_off
        target:
          entity_id: switch.AlmSnd1

  flash_room1:
    alias: "Flash Room1 On"
    sequence:
      - alias: "Light Room1 On"
        service: homeassistant.turn_on
        target:
          entity_id: switch.REL1
      - delay:
          # time for flash light on
          seconds: 1
      - alias: "Light Room1 Off"
        service: homeassistant.turn_off
        target:
          entity_id: switch.REL1
      - alias: "loop_room1"
        service: script.turn_on
        target:
          entity_id: script.flash_loop

  flash_loop:
    alias: "Flash loop"
    sequence:
      - delay:
          # time for flash light off
          seconds: 1
      - alias: "loop_room1"
        service: script.turn_on
        target:
          entity_id: script.flash_room1
```

