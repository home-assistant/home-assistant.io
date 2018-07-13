---
layout: page
title: "LifeSOS Sensor"
description: "Instructions on how to setup the LifeSOS sensor within Home Assistant."
date: 2018-07-03 22:15
sidebar: true
comments: false
sharing: true
footer: true
logo: lifesos.png
ha_release: 0.73
ha_category: Sensor
ha_iot_class: "Local Push"
---

The `lifesos` sensor platform allows you to integrate the sensors from your [LifeSOS](http://lifesos.com.tw/) system.

The platform supports LifeSOS Temperature, Humidity, Light and Power sensors.

The requirement is that you have setup [LifeSOS](/components/lifesos/).

### {% linkable_title Attributes %}

There are several attributes available on the sensor panel to give you more information about your sensor.

- `zone`: The zone the sensor is assigned to.
- `rssi_db`: RF signal strength, in dB.
- `rssi_bars`: RF signal strength, ranked from 0 to 4 bars.
- `high_limit`: \[LS-30 Only\] Top limit for allowable range; values higher will trigger HighTemp or HighLimitAlarm if alarm enabled on sensor, or switches if not.
- `low_limit`: \[LS-30 Only\] Bottom limit for allowable range; values lower will trigger LowTemp or LowLimitAlarm if alarm enabled on sensor, or switches if not.
- `alarm_high_limit`: \[LS-20/LS-10 Only\] Top limit for allowable alarm range; values higher will trigger HighTemp or HighLimitAlarm.
- `alarm_low_limit`: \[LS-20/LS-10 Only\] Bottom limit for allowable alarm range; values lower will trigger LowTemp or LowLimitAlarm.
- `control_high_limit`: \[LS-20/LS-10 Only\] Top limit for allowable control range; values higher will trigger switches.
- `control_low_limit`: \[LS-20/LS-10 Only\] Bottom limit for allowable control range; values lower will trigger switches.

#### {% linkable_title Template Sensor example to track the RSSI %}

This example demonstrates how you can break out the RSSI attributes into a separate sensor for tracking RF signal issues:

```yaml
# Example configuration.yaml entry
- platform: template
  sensors:
    lounge_temperature_rssi:
      friendly_name: "Lounge Temperature RSSI"
      icon_template: {% raw %}"mdi:wifi-strength-{{ state_attr('sensor.lifesos_tempsensor_123456', 'rssi_bars') or 'outline' }}"{% endraw %}
      value_template: {% raw %}"{{ state_attr('sensor.lifesos_tempsensor_123456', 'rssi_db') }}"{% endraw %}
      unit_of_measurement: 'dB'
```
