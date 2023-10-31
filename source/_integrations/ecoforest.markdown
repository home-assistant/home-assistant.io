---
title: Ecoforest
description: Instructions on how to integrate Ecoforest fireplaces with Home Assistant.
ha_category:
  - Climate
ha_release: '2023.10'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@pjanuario'
ha_domain: ecoforest
ha_platforms:
  - number
  - sensor
  - switch
ha_integration_type: integration
---

The Ecoforest integration allows monitoring and control of local [Ecoforest](https://ecoforest.com) fireplaces in Home Assistant.

There is currently support for the following device platforms within Home Assistant:

- [Number](#number)
- [Switch](#switch)
- [Sensor](#sensor)

## Prerequisites

To configure the Ecoforest integration you will need to enter your Ecoforest credentials which are the same ones you would use with the manufacturer app. The image below shows how to obtain the credentials:

- Username: use the serial number of the device as identified by 1.
- Password: use the first 8 characters of the wifi password as identified by 4.

![Ecoforest Credentials](/images/integrations/ecoforest/credentials.png)

{% include integrations/config_flow.md %}

## Supported models

Any Ecoforest device working with [Ecoforest Home](https://ecoforesthome.com/) should be supported, this integration is confirmed to support:

- Ecoforest Cordoba Glass (using firmware version `30Abr19_v2z`)

## Number

The Ecoforest integration exposes a number entity for the device power level.

## Switch

The Ecoforest integration exposes a switch entity to turn status of the device to on and off.

## Sensor

The Ecoforest integration exposes multiple sensors to monitor various features:

- temperature: a sensor for the current ambient temperature
- cpu_temperature: a sensor for the current CPU temperature
- gas_temperature: a sensor for the current gas temperature
- ntc_temperature: a sensor for the current <abbr title="negative temperature coefficient">NTC</abbr> probe temperature
- status: a sensor for the current status of the device. Possible values are: off, starting, pre-heating, on, shutting down, standby, alarm.
- alarm: a sensor for the current alarm of the device. Possible values are: air depression, pellets, CPU overheating, unknown.
- depression: a sensor for the current depression air entrance.
- working_hours: a sensor for the total number of working hours of the device.
- ignitions: a sensor for the total number of ignitions of the device.
- live_pulse: a sensor for the current duration of the live pulse.
- pulse_offset: a sensor for the current duration of the waiting pulse.
- extractor: a sensor for the current extractor velocity.
- convecto_air_flow: a sensor for the current device air velocity.
