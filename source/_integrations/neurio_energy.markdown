---
title: Neurio energy
description: Instructions on how to integrate Neurio within Home Assistant.
ha_category:
  - Energy
ha_iot_class: Cloud Polling
ha_release: 0.14
ha_domain: neurio_energy
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

Integrate your [Neurio](https://neur.io/) meter information into Home Assistant. To get an API key and secret, login to your [Neurio account](https://my.neur.io/#settings/applications/register) and register an application. Note the Homepage URL and Callback URL are optional.

To enable this {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  platform: neurio_energy
  api_key: "CLIENT_ID"
  api_secret: "CLIENT_SECRET"
  sensor_id: "SENSOR_ID"
```

Two sensors will be created with the following names:

- **Energy Usage**: Current active power usage in Watts. Updated every 10 seconds.
- **Daily Energy Usage**: Daily power usage in kWh.  Updated every 2.5 minutes.

{% configuration %}
api_key:
  description: The API key for your account/application.
  required: true
  type: string
api_secret:
  description: The API secret for your account/application.
  required: true
  type: string
sensor_id:
  description: "The sensor ID, a hex number as shown on the [PWRView webpage](https://mypwrview.generac.com/#settings/sensors), e.g., `0x0000XXXXXXXXXXXX`."
  required: true
  type: string
{% endconfiguration %}
