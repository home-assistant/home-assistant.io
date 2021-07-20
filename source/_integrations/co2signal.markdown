---
title: CO2 Signal
description: Instructions on how to use CO2Signal data within Home Assistant
ha_category:
  - Environment
ha_release: 0.87
ha_iot_class: Cloud Polling
ha_domain: co2signal
ha_platforms:
  - sensor
---

The `co2signal` sensor platform queries the [CO2Signal](https://www.co2signal.com/) API for the CO2 intensity of a specific region. Data can be collected via latitude/longitude or by country code. This API uses the same data as <https://www.electricitymap.org> Not all countries/regions in the world are supported so please consult this website to check local availability.

This platform requires a CO2Signal API key, which can be obtained [here](https://www.co2signal.com/). Note that this API key is for personal use only and other options exist when the data is used commercially.

At the moment, the free CO2Signal API only supports the average carbon intensity of a country and not the marginal carbon intensity.

<div class='note warning'>
The "free" API key is limited to a limited number of calls. Too many requests can result in data loss.
</div>

## Prerequisites

To configure and use this integration, you need to obtain an [API key from CO2Signal](https://www.co2signal.com/).

{% include integrations/config_flow.md %}


## Sensor Types

When configured, the platform will create one sensor for each configured location.
