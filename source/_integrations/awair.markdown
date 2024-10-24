---
title: Awair
description: Instructions on how to setup Awair devices in Home Assistant.
ha_category:
  - Health
ha_config_flow: true
ha_release: 0.84
ha_iot_class: Local Polling
ha_codeowners:
  - '@ahayworth'
  - '@danielsjf'
ha_domain: awair
ha_platforms:
  - sensor
ha_integration_type: integration
ha_zeroconf: true
---

The Awair integration will fetch data from your [Awair devices](https://getawair.com).

## Prerequisites

### Connect locally (preferred)

When connecting locally, the integration will poll the device every 30 seconds. Awair provides a [list of devices](https://support.getawair.com/hc/en-us/articles/360049221014-Awair-Element-Local-API-Feature#h_01F40FB3ETMR4TZKPVXJNE86HQ) that support the Local API. This API must be enabled via the Awair app via [these steps](https://support.getawair.com/hc/en-us/articles/360049221014-Awair-Element-Local-API-Feature#h_01F40FBBW5323GBPV7D6XMG4J8). If you add new Awair devices to your home, you must follow these steps again.

### Connect via the cloud

When connecting via the cloud, data is summarized over 5-minute intervals. All devices are supported. You will need to request access to the Awair API and obtain an access token from the Awair [Developer Console](https://developer.getawair.com/). It is free, but getting a token can take up to 24 hours.

This integration refreshes once every 5 minutes, based on the [default per-device quota](https://docs.developer.getawair.com/?version=latest#tiers--quotas) of 300 API calls per day.

{% include integrations/config_flow.md %}

## Available sensors

The integration will fetch data from each device. The following sensors are supported:

- Temperature
- Humidity
- Carbon dioxide
- Total volatile organic compounds
- PM2.5 density
- PM10 density
- Sound level
- Luminescence

Not all devices support all sensors; consult Awair's documentation to find out what sensors are present on your device. For first-generation Awair devices with a "dust" sensor, the integration will create identical PM2.5 and PM10 sensors (which reflects the capabilities of the sensor - it can detect dust between PM2.5 and PM10 but cannot differentiate between them).
