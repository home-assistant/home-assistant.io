---
title: Daikin AC
description: Instructions on how to integrate Daikin AC devices with Home Assistant.
ha_category:
  - Climate
  - Sensor
  - Switch
ha_release: 0.59
ha_iot_class: Local Polling
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - '@fredrike'
ha_domain: daikin
---

The `daikin` integration integrates Daikin air conditioning systems into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Climate](#climate)
- [Sensor](#sensor)
- [Switch](#switch)

## Supported hardware

- The European versions of the Wifi Controller Unit (BRP069A41, 42, 43, 45), which is powered by the [Daikin Online Controller](https://play.google.com/store/apps/details?id=eu.daikin.remoapp) application. The new version of WiFi Controller Unit BRP069Bxx also confirmed to work, tested and working devices are the BRP069B41 and BRP069B45.
- The Australian version of the Daikin Wifi Controller Unit BRP072A42. Confirmed working on a Daikin Cora Series Reverse Cycle Split System Air Conditioner 2.5kW Cooling FTXM25QVMA with operation mode, temp, fan swing (3d, horizontal, vertical) which is powered by the [Daikin Mobile Controller](https://itunes.apple.com/au/app/daikin-mobile-controller/id917168708?mt=8) ([Android version](https://play.google.com/store/apps/details?id=eu.daikin.remoapp)) application.
  - BRP072Cxx based units (including Zena devices) need to provide the API-key found on a sticker under the front cover during setup.
- The Australian version of the Daikin Wifi Controller for **AirBase** units (BRP15B61), which is powered by the [Daikin Airbase](https://play.google.com/store/apps/details?id=au.com.daikin.airbase) application.
- SKYFi based units (using the SKYFi app). These devices need to provide the password found on a sticker under the front cover during setup.


## Configuration

The Daikin integration can be configured via the Home Assistant user interface where it will let you enter the IP-address of your Daikin AC (SKYFi based devices need to provide a password and BRP072Cxx devices need to provide a key).


## Climate

The `daikin` climate platform integrates Daikin air conditioning systems into Home Assistant, enabling control of setting the following parameters:

- [**set_hvac_mode**](/integrations/climate/#service-climateset_hvac_mode) (`off`, `heat`, `cool`, `heat_cool`, or `fan_only`)
- [**target temperature**](/integrations/climate#service-climateset_temperature)
- [**turn on/off**](/integrations/climate#service-climateturn_on)
- [**fan mode**](/integrations/climate#service-climateset_fan_mode) (speed)
- [**swing mode**](/integrations/climate#service-climateset_swing_mode)
- [**set_preset_mode**](/integrations/climate#service-climateset_preset_mode) (away, none)

Current inside temperature is displayed.

<div class='note'>
  
Some models do not support setting of **fan speed** or **swing mode**.
  
</div>

<div class='note'>

Preset mode **away** translates to Daikin's "Holiday Mode":<br/>
<br>
_"Holiday mode" is used when you want to turn off your units when you leave you home for a longer time._<br>
<br>
_When "Holiday mode" is enabled, the following action take place:_
 - _All connected units are turned OFF._
 - _All schedule timers are disabled._

</div>

## Sensor

The `daikin` sensor platform integrates Daikin air conditioning systems into Home Assistant, enabling displaying the following parameters:

- Inside temperature
- Outside temperature
- Inside humidity
- Total instant power consumption
- Hourly energy consumption in cool mode
- Hourly energy consumption in heat mode

<div class='note'>

- Some models only report outside temperature when they are turned on.
- Some models does not have humidity sensor.
- Some models does not report the power/energy consumption.

</div>

## Switch

AirBase and SKYFi units exposes zones (typically rooms) that can be switched on/off individually.

<div class='note'>

Zones with the name `-` will be ignored, just as the AirBase application is working.

</div>
