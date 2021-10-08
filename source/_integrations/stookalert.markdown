---
title: RIVM Stookalert
description: Instructions on how to use Stookalert data within Home Assistant
ha_category:
  - Binary Sensor
  - Environment
ha_release: 0.104
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fwestenberg'
ha_domain: stookalert
ha_platforms:
  - binary_sensor
---

The `stookalert` sensor platform queries the [RIVM Stookalert](https://www.rivm.nl/stookalert) API for unfavorable weather conditions or poor air quality. With a Stookalert, the RIVM calls on people not to burn wood. This can prevent health problems in people in the area.

## Configuration

To enable the platform, add the following lines to your `configuration.yaml` file:

```yaml
binary_sensor:
  - platform: stookalert
    province: YOUR_NL_PROVINCE
```

{% configuration %}
province:
  description: A province to use for the binary sensor's state. Currently only provinces in the Netherlands are supported. Valid values are `Drenthe`, `Flevoland`, `Friesland`, `Gelderland`, `Groningen`, `Limburg`, `Noord-Brabant`, `Noord-Holland`, `Overijssel`, `Utrecht`, `Zeeland` or `Zuid-Holland`.
  required: true
  type: string
name:
  description: The sensor name to use in the frontend.
  required: false
  default: "Stookalert"
  type: string
{% endconfiguration %}
