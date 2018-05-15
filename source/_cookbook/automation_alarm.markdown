---
layout: page
title: "Manual alarm control panel setup"
description: "How to set up an alarm control panel"
date: 2017-11-22 15:35
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---

Assume that you have a few motion sensors in various rooms and a wall
siren.  This recipe will show how to set up the alarm control panel so
that each motion sensor has custom rules for when to trigger the alarm,
and the overall alarm state is visible and modifiable in the Home
Assistant dashboard.

For simplicity and to allow for easy experimentation, the recipe uses
[**input_boolean**](/components/input_boolean) components instead of
actual motion detectors.  These can be changed, depending on your setup,
to GPIO pins, Zigbee sensors, or anything else.

```yaml
input_boolean:
  alarm_presence_garage:
    name: IR sensor for the garage area
    initial: off
  alarm_presence_livingroom:
    name: IR sensor for the living room area
    initial: off
  alarm_presence_bedroom:
    name: IR sensor for the bedroom area
    initial: off
  alarm_tamper_garage:
    name: Anti-tampering signal on garage area IR sensor
    initial: off
  alarm_tamper_livingroom:
    name: Anti-tampering signal on living room IR sensor
    initial: off
  alarm_tamper_bedroom:
    name: Anti-tampering signal on bedroom IR sensor
    initial: off
  alarm_tamper_siren:
    name: Anti-tampering signal on the siren
    initial: off
```

We also want two LEDs that show the state of the alarm without opening
the dashboard.  In this example, I'm using
[**input_boolean**](/components/input_boolean) for those as well,
though in a real-world scenario you might use GPIO pins or MQTT.

```yaml
  led_siren:
    name: Siren LED
    initial: off
  led_armed:
    name: Alarm LED
    initial: off
```

The heart of this example is the configuration of the
[**manual**](/components/alarm_control_panel.manual)
and [**group**](/components/alarm_control_panel.group) alarm
control panel components.  If desired, the manual control panels can be
hidden using the **[customize](/docs/configuration/customizing-devices/)**
YAML entries, so that only the group remains visible.

```yaml
alarm_control_panel:
- platform: manual
  name: 'Living room'
  code: '5555'
  # The living room fires immediately when the alarm is armed
  pending_time: 0
  disarmed:
    trigger_time: 0

- platform: manual
  name: 'Garage'
  code: '5555'
  # The garage door fires after 30 seconds when the alarm is armed-away;
  # this gives you some time to leave or enter the building.  Because
  # we're using delay_time, there's no need for pending_time in the
  # "triggered" state.
  pending_time: 30
  triggered:
    pending_time: 0
  delay_time: 30
  armed_home:
    delay_time: 0
  disarmed:
    trigger_time: 0

- platform: manual
  name: 'Bedroom'
  code: '5555'
  # The bedroom alarm fires immediately when the alarm is armed-away,
  # but not at all when it is armed-home.
  pending_time: 0
  armed_home:
    trigger_time: 0
  disarmed:
    trigger_time: 0

- platform: manual
  name: 'Tampering'
  code: '5555'
  # The anti-tamper can trigger even if the alarm is not armed
  pending_time: 0

- platform: group
  name: Home Alarm
  code_format: '\d+'
  panels:
    - panel: alarm_control_panel.garage
    - panel: alarm_control_panel.living_room
    - panel: alarm_control_panel.bedroom
    - panel: alarm_control_panel.tampering
```

The next step is adding a template switch to trigger the siren.  In this
simplified example I'm only turning the LED on/off, and therefore the
script only has one action.  However, in a real application, you would
probably toggle the siren itself in these scripts!

```yaml
script:
  siren_off:
    alias: Turn off siren
    sequence:
      - service: input_boolean.turn_off
        data:
          entity_id: input_boolean.led_siren
  siren_on:
    alias: Turn on siren
    sequence:
      - service: input_boolean.turn_on
        data:
          entity_id: input_boolean.led_siren
```

Finally, here are the automation rules; first of all, each sensor needs
to trigger one of the alarm control panels:

```yaml
automation:
  # Rules to trigger the alarm_control_panel.manual components
  - alias: 'Garage trigger'
    hide_entity: True
    trigger:
      - platform: state
        entity_id: input_boolean.alarm_presence_garage
        to: 'on'
    action:
      service: alarm_control_panel.alarm_trigger
      entity_id: alarm_control_panel.garage

  - alias: 'Livingroom trigger'
    hide_entity: True
    trigger:
      - platform: state
        entity_id: input_boolean.alarm_presence_livingroom
        to: 'on'
    action:
      service: alarm_control_panel.alarm_trigger
      entity_id: alarm_control_panel.living_room

  - alias: 'Bedroom trigger'
    hide_entity: True
    trigger:
      - platform: state
        entity_id: input_boolean.alarm_presence_bedroom
        to: 'on'
    action:
      - service: alarm_control_panel.alarm_trigger
        entity_id: alarm_control_panel.bedroom

  - alias: 'Tamper trigger'
    hide_entity: True
    trigger:
      - platform: state
        entity_id: input_boolean.alarm_tamper_livingroom
        to: 'on'
      - platform: state
        entity_id: input_boolean.alarm_tamper_garage
        to: 'on'
      - platform: state
        entity_id: input_boolean.alarm_tamper_bedroom
        to: 'on'
      - platform: state
        entity_id: input_boolean.alarm_tamper_siren
        to: 'on'
    action:
      - service: alarm_control_panel.alarm_trigger
        entity_id: alarm_control_panel.tampering
```

Then, let's expose the alarm state on the LEDs:

```yaml
  - alias: 'Alarm armed'
    hide_entity: True
    trigger:
      - platform: state
        entity_id: alarm_control_panel.home_alarm
        from: 'disarmed'
    action:
      - service: input_boolean.turn_on
        entity_id: input_boolean.led_armed

  - alias: 'Alarm disarmed'
    hide_entity: True
    trigger:
      - platform: state
        entity_id: alarm_control_panel.home_alarm
        to: 'disarmed'
    action:
      - service: input_boolean.turn_off
        entity_id: input_boolean.led_armed
```

And finally, let's turn on and off the siren!

```yaml
  - alias: 'Alarm triggered'
    hide_entity: True
    trigger:
      - platform: state
        entity_id: alarm_control_panel.home_alarm
        to: 'triggered'
    action:
      - service: switch.turn_on
        entity_id: switch.alarm_siren

  - alias: 'Turn off siren'
    hide_entity: True
    trigger:
      - platform: state
        entity_id: alarm_control_panel.home_alarm
        from: 'triggered'
    action:
      - service: switch.turn_off
        entity_id: switch.alarm_siren
```

As you can see, the timing is entirely described by the
[**manual**](/components/alarm_control_panel.manual) alarm
control panels and transparently brought to the entire group.
