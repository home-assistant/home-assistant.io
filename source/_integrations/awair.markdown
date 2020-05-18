---
title: Awair
description: Instructions on how to setup Awair devices in Home Assistant.
ha_category:
  - Health
ha_release: 0.84
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@danielsjf'
ha_domain: awair
---

The `awair` sensor platform will fetch data from your [Awair device(s)](https://getawair.com).

You will need to request access to the Awair API and obtain an access token from the Awair [Developer Console](https://developer.getawair.com/).

## Configuring the Platform

To enable these sensors, add the following lines to your `configuration.yaml` file:

```yaml
sensor:
  - platform: awair
    access_token: ACCESS_TOKEN
```

The Awair API has stringent usage quotas. The API method to discover devices in your account is
limited to only 6 calls per 24 hours. If you find that you've exceeded this quota, you may optionally
append device information to your configuration to bypass this call:

```yaml
sensor:
  - platform: awair
    access_token: ACCESS_TOKEN
    devices:
      - uuid: UUID
```

{% configuration %}
access_token:
  description: The access token for the Awair API.
  required: true
  type: string
devices:
  description: An optional list to manually configure devices rather than relying upon API discovery.
  required: false
  type: list
  keys:
    uuid:
      description: UUID of the Awair sensor to monitor.
      required: true
      type: string
{% endconfiguration %}

## Available Sensors

The platform will fetch all available sensors from each Awair device linked to your account. Supported sensors:

  * Temperature
  * Humidity
  * CO2
  * VOC
  * Dust, PM2.5, PM10: varies according to Awair model

This platform refreshes at an interval based on a 300 API call per-day quota, and the number of devices you have configured.
