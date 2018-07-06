---
layout: page
title: "LifeSOS Alarm Control Panel"
description: "Instructions on how to setup the LifeSOS alarm control panel within Home Assistant."
date: 2018-07-03 22:15
sidebar: true
comments: false
sharing: true
footer: true
logo: lifesos.png
ha_release: 0.73
ha_category: Alarm
ha_iot_class: "Local Push"
---

The `lifesos` alarm control panel platform allows you to control your [LifeSOS](http://lifesos.com.tw/) alarm.

The requirement is that you have setup [LifeSOS](/components/lifesos/).

### {% linkable_title Services %}

This component provides you access to several services that allow you to control your alarm:

- `alarm_arm_away`: Arms the alarm in Away mode; all burglar sensors will trigger the alarm.
- `alarm_arm_home`: Arms the alarm in Home mode; only door and window burglar sensors will trigger the alarm.
- `alarm_disarm`: Disarms the alarm from any state.
- `lifesos_alarm_monitor`: Disarms the alarm, but logs events on the base unit when any sensors are triggered.
- `lifesos_clear_status`: Resets the alarm on the base unit, silencing any sirens and clearing the alarm/warning lights on the base unit.

### {% linkable_title Attributes %}

There are several attributes available on the alarm panel to give you more information about your alarm.

- `exit_delay`: When the alarm system is armed by a remote controller, the alarm system will wait this many seconds before entering Away mode, giving the user time to exit their home.
- `entry_delay`: When a burglar sensor is triggered, the alarm system will wait this many seconds before raising an alarm, giving the user time to disarm before an alarm is triggered.
- `operation_mode`: Provides the actual operation mode on the base unit; one of: `Disarm`, `Home`, `Away` and `Monitor`. This is similar to the state in Home Assistant, but excludes Pending and Triggered states (ie. it provides the current underlying mode while in these states). It also indicates when we're in Monitor mode for testing sensors.

<p class='note'>
  Exit delay is *only* supported by the base unit for remote controllers and keypads. Arming the Away mode via Home Assistant does not support an exit delay.
</p>
