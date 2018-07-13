---
layout: page
title: "LifeSOS Binary Sensor"
description: "Instructions on how to setup the LifeSOS binary sensor within Home Assistant."
date: 2018-07-03 22:15
sidebar: true
comments: false
sharing: true
footer: true
logo: lifesos.png
ha_release: 0.73
ha_category: Binary Sensor
ha_iot_class: "Local Push"
---

The `lifesos` binary sensor platform allows you to integrate the sensors from your [LifeSOS](http://lifesos.com.tw/) system.

The platform supports LifeSOS Magnet, Motion, Breakage, Flood, Vibration, Smoke and Gas sensors.

The requirement is that you have setup [LifeSOS](/components/lifesos/).

#### {% linkable_title Important note about trigger-based binary sensors %}

Only the Magnet sensor provides an accurate binary state (Open / Close).

All other sensors raise a single Trigger event when activated. To represent these as a binary sensor in Home Assistant, this
platform will use the `On` state when triggered, and automatically reset to the `Off` state
after a fixed duration, as specified by the **trigger_duration** configuration variable (default is `5` seconds).

<p class="note warning">
  Motion sensors are designed not to trigger again until at least 3 minutes have elapsed with no
  motion in the monitored area. While this is fine in an alarm system, it unfortunately may make
  it unsuitable for many automations, such as turning on (and keeping on) a light in an area where
  there is continual motion.
</p>

### {% linkable_title Attributes %}

There are several attributes available on the binary sensor panel to give you more information about your sensor.

- `zone`: The zone the sensor is assigned to.
- `rssi_db`: RF signal strength, in dB.
- `rssi_bars`: RF signal strength, ranked from 0 to 4 bars.

#### {% linkable_title Template Sensor example to track the RSSI %}

This example demonstrates how you can break out the RSSI attributes into a separate sensor for tracking RF signal issues:

```yaml
# Example configuration.yaml entry
- platform: template
  sensors:
    front_door_rssi:
      friendly_name: "Front Door RSSI"
      icon_template: {% raw %}"mdi:wifi-strength-{{ state_attr('binary_sensor.lifesos_doormagnet_123456', 'rssi_bars') or 'outline' }}"{% endraw %}
      value_template: {% raw %}"{{ state_attr('binary_sensor.lifesos_doormagnet_123456', 'rssi_db') }}"{% endraw %}
      unit_of_measurement: 'dB'
```
