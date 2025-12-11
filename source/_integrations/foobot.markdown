---
title: Foobot
description: Instructions on how to setup Foobot Air Quality sensor in Home Assistant.
ha_category:
  - Health
ha_release: 0.66
ha_iot_class: Cloud Polling
ha_domain: foobot
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

The `foobot` sensor platform will fetch air quality data from your or yours [Foobot device(s)](https://foobot.io/features/).

This sensor requires an API token. Please obtain one at [Foobot API site](https://api.foobot.io/apidoc/index.html).

## Configuring the Platform

To enable this sensor, add the following lines to your {% term "`configuration.yaml`" %} file:

```yaml
sensor:
  - platform: foobot
    token: FOOBOT_SECRET_KEY
    username: FOOBOT_USERNAME
```

{% configuration %}
  token:
    description: The token for the Foobot API.
    required: true
    type: string
  username:
    description: Your Foobot username, used to fetch devices associated with an account.
    required: true
    type: string
{% endconfiguration %}

## Available metrics

Every ten minutes, it'll fetch the last ten minutes average of the following measurements:

  - Temperature
  - Humidity
  - Co2
  - VOC
  - PM2.5
  - [Index](https://help.foobot.io/hc/en-us/articles/204814371-What-does-central-number-mean-)
