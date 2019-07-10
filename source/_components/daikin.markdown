---
layout: page
title: "Daikin AC"
description: "Instructions on how to integrate Daikin AC devices with Home Assistant."
date: 2017-12-10 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: daikin.png
ha_category:
  - Climate
  - Sensor
  - Switch
ha_release: 0.59
ha_iot_class: Local Polling
ha_qa_scale: platinum
redirect_from:
  - /components/climate.daikin/
  - /components/sensor.daikin/
---

The `daikin` integration integrates Daikin air conditioning systems into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Climate](#climate)
- [Sensor](#sensor)
- [Switch](#switch)

## Supported hardware

- The European versions of the Wifi Controller Unit (BRP069A41, 42, 43, 45), which is powered by the [Daikin Online Controller](https://play.google.com/store/apps/details?id=eu.daikin.remoapp) application.
- The Australian version of the Daikin Wifi Controller Unit BRP072A42. Confirmed working on a Daikin Cora Series Reverse Cycle Split System Air Conditioner 2.5kW Cooling FTXM25QVMA with operation mode, temp, fan swing (3d, horizontal, vertical) which is powered by the [DAIKIN Mobile Controller](https://itunes.apple.com/au/app/daikin-mobile-controller/id917168708?mt=8) ([Android version](https://play.google.com/store/apps/details?id=eu.daikin.remoapp)) application.
- The Australian version of the Daikin Wifi Controller for **AirBase** units (BRP15B61), which is powered by the [Daikin Airbase](https://play.google.com/store/apps/details?id=au.com.daikin.airbase) application.

## Configuration

The Daikin integration can be configured in three ways. 

- Automatically via the [discovery]({{site_root}}/components/discovery/) integration.
- Via the Home Assistant user interface where it will let you enter the IP-address of your Daikin AC.
- Or via the `configuration.yaml` file by adding the following:

```yaml
# Full manual example configuration.yaml entry
daikin:
  hosts:
    - 192.168.4.161
```

{% configuration %}
hosts:
  description: List of IP addresses or hostnames.
  required: false
  default: All discovered hosts
  type: list
{% endconfiguration %}

## Climate

The `daikin` climate platform integrates Daikin air conditioning systems into Home Assistant, enabling control of setting the following parameters:

- [**set_hvac_mode**](/components/climate/#service-climateset_hvac_mode) (off, heat, cool, auto, or fan only)
- [**target temperature**](https://www.home-assistant.io/components/climate#service-climateset_temperature)
- [**fan mode**](https://www.home-assistant.io/components/climate#service-climateset_fan_mode) (speed)
- [**swing mode**](https://www.home-assistant.io/components/climate#service-climateset_swing_mode)
- [**set_preset_mode**](https://www.home-assistant.io/components/climate#service-climateset_away_mode) (away, home)

Current inside temperature is displayed.

<p class='note'>
Some models do not support setting of **fan speed** or **swing mode**.
</p>

## Sensor

The `daikin` sensor platform integrates Daikin air conditioning systems into Home Assistant, enabling displaying the following parameters:

- Inside temperature
- Outside temperature

<p class='note'>
Some models only report outside temperature when they are turned on.
</p>

## Switch

Daikin AirBase units exposes zones (typically rooms) that can be switched on/off individually.

<p class='note'>
Zones with the name `-` will be ignored, just as the AirBase application is working.
</p>
