---
layout: page
title: "AlarmDecoder Alarm Control Panel"
description: "Instructions on how to setup the AlarmDecoder Alarm control panel within Home Assistant."
date: 2017-04-02 13:28
sidebar: true
comments: false
sharing: true
footer: true
logo: alarmdecoder.png
ha_category: Alarm
ha_release: 0.43
ha_iot_class: "Local Push"
---

The `alarmdecoder` alarm control panel platform allows you to control your [AlarmDecoder](https://www.alarmdecoder.com) alarms.

The requirement is that you have setup your [AlarmDecoder hub](/components/alarmdecoder/).

### {% linkable_title Services %}

The Alarm Decoder component gives you access to several services for you to control your alarm with.

- `alarm_arm_away`: Arms the alarm in away mode; all faults will trigger the alarm.
- `alarm_arm_home`: Arms the alarm in stay mode; faults to the doors or windows will trigger the alarm.
- `alarm_arm_night`: Arms the alarm in instant mode; all faults will trigger the alarm. Additionally, the entry delay is turned off on the doors.
- `alarm_disarm`: Disarms the alarm from any state. Also clears a `check_zone` flag after an alarm was triggered.
- `alarmdecoder_alarm_toggle_chime`: Toggles the alarm's chime state.

**Note**: `alarm_arm_custom_bypass` and `alarm_trigger`, while available in the services list in Home Assistant, are not currently implemented in the Alarm Decoder component.

### {% linkable_title Attributes %}

There are several attributes available on the alarm panel to give you more information about your alarm.

- `ac_power`: Set to `true` if your system has AC power supplying it.
- `backlight_on`: Set to `true` if your keypad's backlight is on.
- `battery_low`: Set to `true` if your system's back-up battery is low.
- `check_zone`: Set to `true` if your system was recently triggered. When `check_zone` is `true`, it must be cleared by entering your code + 1 before attempting to rearm your alarm.
- `chime`: Set to `true` if your system's chime is activated. When activated, your system will beep anytime a door or window is faulted while the alarm is disarmed.
- `entry_delay_off`: Set to `true` if your system is in "Instant" mode, meaning the alarm will sound on any faults.
- `programming_mode`: Set to `true` if your system is in programming mode.
- `ready`: Set to `true` if your system is ready to be armed. Any faults, including motions sensors, will make this value `false`.
- `zone_bypassed`: Set to `true` if your system is currently bypassing a zone.

### {% linkable_title Examples %}

Using a combination of the available services and attributes, you can create switch templates.

#### {% linkable_title Chime Status and Control %}

{% raw %}
```yaml
- platform: template
  switches:
    alarm_chime:
      friendly_name: Chime
      value_template: "{{ is_state_attr('alarm_control_panel.alarm_panel', 'chime', true) }}"
      turn_on:
        service: alarm_control_panel.alarmdecoder_alarm_toggle_chime
        data:
          code: !secret alarm_code
      turn_off:
        service: alarm_control_panel.alarmdecoder_alarm_toggle_chime
        data:
          code: !secret alarm_code
      icon_template: >-
          {% if is_state_attr('alarm_control_panel.alarm_panel', 'chime', true) %}
            mdi:bell-ring
          {% else %}
            mdi:bell-off
          {% endif %}
```
{% endraw %}
