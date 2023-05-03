---
title: Awattar
description: Instructions on setting up Awattar within Home Assistant.
ha_category:
  - Energy
  - Environment
  - Sensor
ha_iot_class: Cloud Polling
ha_quality_scale: silver
ha_release: '2023.5'
ha_config_flow: true
ha_codeowners:
  - '@openkfw'
ha_domain: smartenergy_awattar
ha_platforms:
  - sensor
ha_integration_type: hub
---

The Awattar integration allows you to collect forecast market price information about energy. The integration currently supports the following countries:

- Austria (at)
- Germany (de)

{% include integrations/config_flow.md %}

## Sensors

The following sensors are available to monitor the wallbox (and the car respectively):

| Sensor Name                    | Attribute  | Description                                                                                                                                       |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `smartenergy_awattar_forecast` | `forecast` | Sensor having a market price forecast in the `forecast` attribute. Format is an array of objects with `start_time`, `end_time` and `marketprice`. |
