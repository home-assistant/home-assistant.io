---
title: Airgradient
description: Instructions on how to setup Airgradient devices in Home Assistant.
ha_category:
  - Health
  - Sensor
ha_config_flow: true
ha_release: 2024.5
ha_iot_class: Local Polling
ha_codeowners:
  - '@airgradienthq'
  - '@joostlek'
ha_domain: airgradient
ha_platforms:
  - sensor
ha_integration_type: integration
ha_zeroconf: true
---

The Airgradient integration will fetch data from your [Airgradient devices](https://www.airgradient.com/).

{% include integrations/config_flow.md %}

## Available sensors

The integration will fetch data from each device. The following sensors are supported:

- Temperature
- Humidity
- PM0.1 density
- PM2.5 density
- PM10 density
- Nitrogen index
- Total volatile organic compounds index
- Boot time