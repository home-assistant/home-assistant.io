---
title: Daikin AC
description: Instructions on how to integrate Daikin AC devices with Home Assistant.
ha_category:
  - Climate
  - Energy
  - Sensor
  - Switch
ha_release: 0.59
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@fredrike'
ha_domain: daikin
ha_zeroconf: true
ha_platforms:
  - climate
  - sensor
  - switch
ha_integration_type: integration
---

{% warning %}

Daikin has removed their local API in newer products. They offer a Onecta cloud API for controlling Daikin devices through the cloud, see the [Daikin Europe Developer Portal](https://developer.cloud.daikineurope.com) for more details. This affects units fitted with the BRP069C4x wifi adapter. Units listed under Supported Hardware below continue to have access to local control. Additionally the older but commonly available BRP072A42 adapter can be fitted to most if not all newer units for access to local control.

{% endwarning %}

The **Daikin** {% term integration %} integrates Daikin air conditioning systems into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Climate](#climate)
- [Sensor](#sensor)
- [Switch](#switch)

## Supported hardware

- The European versions of the Wifi Controller Unit (BRP069A41, 42, 43, 45), which is powered by the [Daikin Online Controller](https://play.google.com/store/apps/details?id=eu.daikin.remoapp) application. The new version of WiFi Controller Unit BRP069Bxx is also confirmed to work, tested and working devices are the BRP069B41 and BRP069B45.
- The Australian version of the Daikin Wifi Controller Unit BRP072A42, which is operated by the [Daikin Mobile Controller (iOS)](https://itunes.apple.com/au/app/daikin-mobile-controller/id917168708?mt=8) ([Android](https://play.google.com/store/apps/details?id=ao.daikin.remoapp)) application. Confirmed working on a Daikin Cora Series Reverse Cycle Split System Air Conditioner 2.5kW Cooling FTXM25QVMA with operation mode, temp, fan swing (3d, horizontal, vertical).
  - BRP072Cxx based units (including Zena devices)*.
- The United States version of the Wifi Controller Unit (BRP072A43), which is powered by the [Daikin Comfort Control](https://play.google.com/store/apps/details?id=us.daikin.comfortcontrols) application. Confirmed working on a Daikin Wall Units FTXS09LVJU, FTXS15LVJU, FTXS18LVJU and a Floor Unit FVXS15NVJU with operation mode, temp, fan swing (3d, horizontal, vertical).
- The Australian version of the Daikin Wifi Controller for **AirBase** units (BRP15B61), which is operated by the [Daikin Airbase](https://play.google.com/store/apps/details?id=au.com.daikin.airbase) application.
- **SKYFi** based units, which is operated by the SKYFi application*.

{% note %}

- The integration for BRP072Cxx and SKYFi based units need API-key / password respectively. The API-key/password can be found on a sticker under the front cover. The other models are auto detected and the API-key and password field must be left empty.
- BRP084Cxx firmware update from 1.19.0 to 2.8.0 breaks local API there is however ongoing work in fixing local API support again.

{% endnote %}

{% include integrations/config_flow.md %}

{% note %}
  
If your Daikin unit does not reside in the same network as your Home Assistant instance, i.e. your network is segmented, note that a couple of UDP connections are made during discovery:

- From Home Assistant to the Daikin controller: `UDP:30000` => `30050`
- From the Daikin controller to Home Assistant: `UDP:<random port>` => `30000`

If this situation applies to you, you may need to adjust your firewall(s) accordingly.

{% endnote %}

## Climate

The `daikin` climate platform integrates Daikin air conditioning systems into Home Assistant, enabling control of setting the following parameters:

- [**set_hvac_mode**](/integrations/climate/#action-climateset_hvac_mode) (`off`, `heat`, `cool`, `heat_cool`, or `fan_only`)
- [**target temperature**](/integrations/climate#action-climateset_temperature)
- [**turn on/off**](/integrations/climate#action-climateturn_on)
- [**fan mode**](/integrations/climate#action-climateset_fan_mode) (speed)
- [**swing mode**](/integrations/climate#action-climateset_swing_mode)
- [**set_preset_mode**](/integrations/climate#action-climateset_preset_mode) (away, none)

Current inside temperature is displayed.

{% note %}
  
Some models do not support setting of **fan speed** or **swing mode**.
  
{% endnote %}

{% note %}

Preset mode **away** translates to Daikin's "Holiday Mode":<br/>
<br>
_"Holiday mode" is used when you want to turn off your units when you leave you home for a longer time._<br>
<br>
_When "Holiday mode" is enabled, the following action take place:_

- _All connected units are turned OFF._
- _All schedule timers are disabled._

{% endnote %}

## Sensor

The `daikin` sensor platform integrates Daikin air conditioning systems into Home Assistant, enabling displaying the following parameters by device:

- Inside temperature
- Inside humidity
- Hourly energy consumption in cool mode
- Hourly energy consumption in heat mode
- Today's total energy consumption (updated hourly, resets at 00:00)

The integration displays the following parameters for the outdoor compressor:

- Outside temperature
- Outside compressor Estimated power consumption (sum of all devices)
- Outside compressor Energy consumption (sum of all devices, resets at 00:00)
- Outside compressor frequency

{% note %}

- Some models only report outside temperature when they are turned on.
- Some models do not have humidity sensor.
- Some models do not report the power/energy consumption.
- Some models do not report the compressor frequency.

{% endnote %}

{% note %}

- The 'Outdoor compressor Energy consumption' and 'Outdoor compressor Estimated power consumption' sensors are updated every time 100 Wh are consumed by all different operating modes summed together.
- The 'Outdoor compressor Estimated power consumption' sensor is derived from the above energy consumption and not provided by the AC directly.
- The 'cool/heat' energy sensors are updated hourly with the previous hour energy consumption
  of a given mode and a given AC.
- The 'cool' mode also includes the 'fan' and 'dehumidifier' modes' power consumption.
- If you have multiple indoor devices, the 'Outdoor compressor' sensors will be created multiple times but will all report the same values. You can disable all but one.

{% endnote %}

## Switch

AirBase and SKYFi units exposes zones (typically rooms) that can be switched on/off individually.

{% note %}

Zones with the name `-` will be ignored, just as the AirBase application is working.

{% endnote %}

A switch is created for each device that will toggle the unit on/off. This will turn the unit on to its previous state, or toggle it off. This switch works in conjunction with the climate entity.

Additionally the Daikin Streamer (air purifier) function can be toggled on supported devices using a switch. Note that it isn't currently possible to reliably detect whether a specific device has streamer support, so the switch may appear in the UI even if the functionality isn't actually supported.

## Region changing

The European and United States controllers (Most likely the Australian controllers too) have an HTTP API endpoint that allows you to change the controllers region so that other regional apps can be used. (Sometimes these controllers get exported to regions that can not download the app for the controllers region.)

`http://Daikin-IP-Address/common/set_regioncode?reg=XX` Replace XX with your region code of choice.

Currently known region codes:

- AU
- EU
- JP
- US
- TH

If you experience problems with certain apps like the Daikin ONECTA try setting a lower-case region code (e.g. 'eu').
