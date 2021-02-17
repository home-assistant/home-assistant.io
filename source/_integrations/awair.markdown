---
title: Awair
description: Instructions on how to setup Awair devices in Home Assistant.
ha_category:
  - Health
ha_config_flow: true
ha_release: 0.84
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@ahayworth'
  - '@danielsjf'
ha_domain: awair
ha_platforms:
  - sensor
---

The Awair integration will fetch data from your [Awair devices](https://getawair.com).

You will need to request access to the Awair API and obtain an access token from the Awair [Developer Console](https://developer.getawair.com/). It is free, but getting a token can take up to 24 hours.

{% include integrations/config_flow.md %}

## Available Sensors

The integration will fetch data from each device linked to your Awair developer account. The following sensors are supported:

  * Temperature
  * Humidity
  * Carbon dioxide
  * Total volatile organic compounds
  * PM2.5 density
  * PM10 density
  * Sound level
  * Luminescence

Not all devices support all sensors; consult Awair's documentation to find out what sensors are present on your device. For first-generation Awair devices with a "dust" sensor, the integration will create identical PM2.5 and PM10 sensors (which reflects the capabilities of the sensor - it can detect dust between PM2.5 and PM10 but cannot differentiate between them).

This integration refreshes once every 5 minutes, based on the [default per-device quota](https://docs.developer.getawair.com/?version=latest#tiers--quotas) of 300 API calls per day.
