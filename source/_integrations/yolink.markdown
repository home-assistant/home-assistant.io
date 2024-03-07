---
title: YoLink
description: Instructions on how to integrate YoLink Devices into Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Cover
  - Light
  - Lock
  - Number
  - Sensor
  - Siren
  - Switch
ha_release: 2022.6
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@matrixd2'
ha_domain: yolink
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - light
  - lock
  - number
  - sensor
  - siren
  - switch
ha_integration_type: integration
---

Integrates [YoLink](https://www.yosmart.com/) Devices into Home Assistant.

{% include integrations/config_flow.md %}

{% details "Using custom application credentials" %}
Home Assistant will use account linking provided by Nabu Casa for authenticating with YoLink, this service is provided for free and does not require a Nabu Casa subscription. The steps below are thus not required.
If you want to use separate credentials, please contact <service@yosmart.com> to obtain a `client_id` and `client_secret`. Then you can add your credentials via application credentials. Settings > Devices & Services > click the menu (three dots at the top right of the screen) and then **Application Credentials**. Enter your credentials in the pop-up window.
{% enddetails %}

## Services

### `Play on SpeakerHub`

With this service, you can convert text to speech for playback on SpeakerHub.

Service data attribute | Optional | Description
-|-|-
`target_device` | no| SpeakerHub device ID for audio playback.
`message` | no| Text for speech conversion.
`tone` | no| Tone before playing audio.
`volume` | no| Speaker volume during playback.
`repeat` | no| The number of times the text will be repeated.

The integration is tested and verified for the following devices from YoLink:

- YS1603-UC (Hub)
- YS1604-UC (SpeakerHub)
- YS3604-UC (YoLink KeyFob)
- YS3605-UC (YoLink On/OffFob)
- YS3606-UC (YoLink DimmerFob)
- YS3607-UC (YoLink SirenFob)
- YS4002-UC (YoLink Thermostat)
- YS4003-UC (YoLink Thermostat Heatpump)
- YS4906-UC + YS7706-UC (Garage Door Kit 1)
- YS4908-UC + YS7706-UC (Garage Door Kit 2 (Finger))
- YS4909-UC (Water Valve Controller)
- YS5001-UC (X3 Water Valve Controller)
- YS5002-UC (YoLink Motorized Ball Valve)
- YS5003-UC (Water Valve Controller 2)
- YS5705-UC (In-Wall Switch)
- YS5706-UC (YoLink Relay)
- YS5707-UC (Dimmer Switch)
- YS5708-UC (In-Wall Switch 2)
- YS6602-UC (YoLink Energy Plug)
- YS6604-UC (YoLink Plug Mini)
- YS6704-UC (In-wall Outlet)
- YS6801-UC (Smart Power Strip)
- YS6802-UC (Smart Outdoor Power Strip)
- YS7103-UC (Siren Alarm)
- YS7104-UC (Outdoor Alarm Controller)
- YS7105-UC (X3 Outdoor Alarm Controller)
- YS7106-UC (Power Fail Alarm)
- YS7107-UC (Outdoor Alarm Controller 2)
- YS7201-UC (Vibration Sensor)
- YS7606-UC (YoLink Smart Lock M1)
- YS7607-UC (YoLink Smart Lock M2)
- YS7704-UC (Door Sensor)
- YS7706-UC (Garage Door Sensor)
- YS7707-UC (Contact Sensor)
- YS7804-UC (Motion Sensor)
- YS7805-UC (Outdoor Motion Sensor)
- YS7903-UC (Water Leak Sensor)
- YS7904-UC (Water Leak Sensor 2)
- YS7906-UC (Water Leak Sensor 4)
- YS7916-UC (Water Leak Sensor 4 MoveAlert)
- YS7A01-UC (Smart Smoke/CO Alarm)
- YS8003-UC (Temperature Humidity Sensor)
- YS8004-UC (Weatherproof Temperature Sensor)
- YS8005-UC (Weatherproof Temperature & Humidity Sensor)
- YS8006-UC (X3 Temperature & Humidity Sensor)
- YS8014-UC (X3 Outdoor Temperature Sensor)
- YS8015-UC (X3 Outdoor Temperature & Humidity Sensor)
- YS7905-UC (WaterDepthSensor)
