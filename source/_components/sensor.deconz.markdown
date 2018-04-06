---
layout: page
title: deCONZ Sensor
description: "Instructions on how to integrate Zigbee sensors from deCONZ into Home Assistant."
date: 2017-11-12 16:30
sidebar: true
comments: false
sharing: true
footer: true
logo: deconz.jpeg
ha_category: Sensor
ha_release: "0.61"
ha_iot_class: "Local Push"
---

See the [deCONZ main component](/components/deconz/) for configuration instructions.

The following sensor types are supported:

 * Humidity sensor
 * Light level sensor
 * Pressure sensor
 * Switches
 * Temperature sensor

Entity ids will be sensor.device_name, where device_name is defined in deCONZ. Switches aren't exposed as ordinary entities, see the [deCONZ main component](/components/deconz/) for more details.

#### {% linkable_title Verified to be supported sensors %}

- Humidity Sensor
  - Xiaomi Aqara Humidity/Temperature Sensor
  - Xiaomi MiJia Smart Temperature & Humidity Sensor
- Light Level Sensor
- Pressure Sensor
- Switches
  - IKEA Trådfri Wireless Dimmer
  - Philips Hue Motion Sensor
  - IKEA Trådfri Remote
  - Philips Hue Dimmer Switch
  - Xiaomi Cube
  - Xiaomi Aqara Smart Light Switch
  - Xiaomi Aqara Smart Wireless Switch
  - Xiaomi Smart Home Wireless Switch
- Temperature Sensor
  - Xiaomi Temperature/Humidity Sensor

#### {% linkable title deCONZ Daylight Sensor %}

The deCONZ Daylight sensor is a special sensor built into the deCONZ software since version 2.05.12. It is represented in Home Assistant as a sensor called sensor.daylight. The sensor's state value is a string corresponding to the phase of daylight (descriptions below taken from https://github.com/mourner/suncalc, on which the deCONZ implementation is based):

| Sensor State | Description |
|--------------|-------------|
| sunrise_start | sunrise (top edge of the sun appears on the horizon) |
| sunrise_end | sunrise ends (bottom edge of the sun touches the horizon) |
| golden_hour_1 | morning golden hour (soft light, the best time for photography) |
| solar_noon | solar noon (sun is in the highest position) |
| golden_hour_2 | evening golden hour |
| sunset_start | sunset starts (bottom edge of the sun touches the horizon) |
| sunset_end | sunset (sun disappears below the horizon, evening civil twilight starts) |
| dusk | dusk (evening nautical twilight starts) |
| nautical_dusk | nautical dusk (evening astronomical twilight starts) |
| night_start | night starts (dark enough for astronomical observations) |
| nadir | nadir (darkest moment of the night, the sun is in the lowest position) |
| night_end | night ends (morning astronomical twilight starts) |
| nautical_dawn | nautical dawn (morning nautical twilight starts) |
| dawn | dawn (morning nautical twilight ends, morning civil twilight starts) |

The sensor also has an attribute called "daylight" that has the value `true` when the sensor's state is `golden_hour_1`, `solar_noon`, or `golden_hour_2`, and `false` otherwise.

These states can be used in automations as a trigger (e.g., trigger when a certain phase of daylight starts or ends) or condition (e.g., trigger only if in a certain phase of daylight).
