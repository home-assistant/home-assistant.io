---
title: "Stookalert"
description: "Instructions on how to use Stookalert data within Home Assistant"
logo: stookalert.png
ha_category:
  - Binary Sensor
  - Environment
ha_release: 0.104
ha_iot_class: Cloud Polling
---

The `stookalert` sensor platform queries the [RIVM stookalert](https://www.rivm.nl/stookalert) API for unfavorable weather conditions or poor air quality. With a Stookalert, the RIVM calls on people not to burn wood. This can prevent health problems in people in the area.


## Configuration

To enable the platform, add the following lines to your `configuration.yaml` file:

```yaml
binary_sensor:
  - platform: stookalert
    province: YOUR_NL_PROVINCE
```

{% configuration %}
province:
  description: a province to use for the binary sensor's state. Currently only provinces in the Netherlands are supported. Valid values are `drenthe`, `flevoland`, `friesland`, `gelderland`, `groningen`, `limburg`, `noord-brabant`, `noord-holland`, `overijssel`, `utrecht`, `zeeland` or `zuid-holland`.
  required: true
  type: string
name:
  description: The sensor name to use in the frontend.
  required: false
  default: "Stookalert"
  type: string
{% endconfiguration %}
