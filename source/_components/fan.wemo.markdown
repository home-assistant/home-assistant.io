---
layout: page
title: "Belkin WeMo (Holmes) Smart Humidifier"
description: "Instructions on how to integrate Belkin WeMo humidifiers into Home Assistant."
date: 2018-10-29 19:58
sidebar: true
comments: false
sharing: true
footer: true
logo: belkin_wemo.png
ha_category: Fan
ha_iot_class: "Local Push"
ha_release: 0.82
---


The `wemo` platform allows you to control your [Belkin WeMo](http://www.belkin.com/us/p/P-F7C027/) humidifiers from within Home Assistant. This includes support for the [Holmes Smart Humidifier](https://www.holmesproducts.com/wemo-humidifier.html).

WeMo devices are automatically discovered if the `discovery` component is enabled. For more configuration information, see the [WeMo component](/components/wemo/) documentation.

### {% linkable_title Attributes %}

There are several attributes which can be used for automations and templates:

| Attribute | Description |
| --------- | ----------- |
| `current_humidity` | An integer that indicates the current relative humidity percentage of the room, as determined by the device's onboard humidity sensor.
| `fan_mode` | String that indicates the current fan speed setting, as reported by the WeMo humidifier.
| `filter_expired` | A boolean that indicates whether the filter has expired and needs to be replaced.
| `filter_life` | The used life of the filter (as a percentage).
| `target_humidity` | An integer that indicates the desired relative humidity percentage (this is constrained to the humidity settings of the device, which are 45, 50, 55, 60, and 100).
| `water level` | String that indicates whether the water level is Good, Low, or Empty.

### {% linkable_title Services %}

There are several services which can be used for automations and control of the humidifier:

| Service | Description |
| --------- | ----------- |
| `set_speed` | Calling this service sets the fan speed (entity_id and speed are required parameters, and speed must be one of the following: off, low, medium, or high). When selecting low for the speed, this will map to the WeMo humidifier speed of minimum. When selecting high for the speed, this will map to the WeMo humidifier speed of maximum. The WeMo humidifier speeds of low and high are unused due to constraints on which fan speeds Home Assistant supports.
| `toggle` | Calling this service will toggle the humidifier between on and off states.
| `turn_off` | Calling this service will turn the humidifier off (entity_id is required).
| `turn_on` | Calling this service will turn the humidifier on and set the speed to the last used speed (defaults to medium, entity_id is required).
| `wemo_set_humidity` | Calling this service will set the desired relative humidity setting on the device (entity_id is a required list of 1 or more entities to set humidity on, and target_humidity is a required float value between 0 and 100 (this value will be rounded down and mapped to one of the valid desired humidity settings of 45, 50, 55, 60, or 100 that are supported by the WeMo humidifier)).
| `wemo_reset_filter_life` | Calling this service will reset the humdifier's filter life back to 100% (entity_id is a required list of 1 or more entities to reset the filter life on). Call this service when you change the filter on your humidifier.
