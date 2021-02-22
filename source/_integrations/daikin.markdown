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
ha_zeroconf: true
ha_platforms:
  - climate
  - sensor
  - switch
---

The `daikin` integration integrates Daikin air conditioning systems into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Climate](#climate)
- [Sensor](#sensor)
- [Switch](#switch)

## Supported hardware

- The European versions of the Wifi Controller Unit (BRP069A41, 42, 43, 45), which is powered by the [Daikin Online Controller](https://play.google.com/store/apps/details?id=eu.daikin.remoapp) application. The new version of WiFi Controller Unit BRP069Bxx is also confirmed to work, tested and working devices are the BRP069B41 and BRP069B45.
- The Australian version of the Daikin Wifi Controller Unit BRP072A42, which is operated by the [Daikin Mobile Controller](https://itunes.apple.com/au/app/daikin-mobile-controller/id917168708?mt=8) ([Android version](https://play.google.com/store/apps/details?id=eu.daikin.remoapp)) application. Confirmed working on a Daikin Cora Series Reverse Cycle Split System Air Conditioner 2.5kW Cooling FTXM25QVMA with operation mode, temp, fan swing (3d, horizontal, vertical).
  - BRP072Cxx based units (including Zena devices)*.
- The United States version of the Wifi Controller Unit (BRP069A43), which is powered by the [Daikin Comfort Control](https://play.google.com/store/apps/details?id=us.daikin.wwapp) application. Confirmed working on a Daikin Wall Unit FTXS15LVJU and a Floor Unit FVXS15NVJU with operation mode, temp, fan swing (3d, horizontal, vertical).
- The Australian version of the Daikin Wifi Controller for **AirBase** units (BRP15B61), which is operated by the [Daikin Airbase](https://play.google.com/store/apps/details?id=au.com.daikin.airbase) application.
- **SKYFi** based units, which is operated by the SKYFi application*.

<div class='note'>

* The integration for BRP072Cxx and SKYFi based units need API-key / password respectively. The API-key/password can be found on a sticker under the front cover. The other models are auto detected and the API-key and password field must be left empty.
  
</div>

{% include integrations/config_flow.md %}

<div class='note'>
  
If your Daikin unit does not reside in the same network as your Home Assistant instance, i.e. your network is segmented, note that a couple of UDP connections are made during discovery:

- From Home Assistant to the Daikin controller: `UDP:30000` => `30050`
- From the Daikin controller to Home Assistant: `UDP:<random port>` => `30000`

If this situation applies to you, you may need to adjust your firewall(s) accordingly.

</div>

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

Additionally the Daikin Streamer (air purifier) function can be toggled on supported devices using a switch.

## Region Changing

The European and United States controllers (Most likely the Australian controllers too) have an HTTP API endpoint that allows you to change the controllers region so that other regional apps can be used. (Sometimes these controllers get exported to regions that can not download the app for the controllers region.)

`http://Daikin-IP-Address/common/set_regioncode?reg=XX` Replace XX with your region code of choice.

Currently known region codes: 
- AU
- EU
- JP
- US
- TH
