---
title: Eliqonline
description: Instructions on how to integrate Eliqonline devices within Home Assistant.
ha_category:
  - Energy
ha_release: '0.10'
ha_iot_class: Cloud Polling
ha_domain: eliqonline
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

Integrate your [ELIQ Online](https://eliq.io/) smart meter information into Home Assistant. To get an [access token](https://my.eliq.io/user/settings/api) and the [Channel ID](https://my.eliq.io/user/settings/locations), log in to your account.

To enable this sensor in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: eliqonline
    access_token: ACCESS_TOKEN
    channel_id: CHANNEL_ID
```

{% configuration %}
access_token:
  description: The Access Token for your account.
  required: true
  type: string
channel_id:
  description: Channel ID (as integer) of your device.
  required: true
  type: integer
name:
  description: The name of the sensor, e.g., the city.
  required: false
  default: ELIQ Online
  type: string
{% endconfiguration %}

For details please check the [API documentation](https://eliq.zendesk.com/hc/en-us/articles/115002708449-API-Eliq-Online).
