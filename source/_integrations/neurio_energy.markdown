---
title: Neurio energy
description: Instructions on how to integrate Neurio within Home Assistant.
logo: neurio.png
ha_category:
  - Energy
ha_iot_class: Cloud Polling
ha_release: 0.14
ha_domain: neurio_energy
---

Integrate your [Neurio](https://neur.io/) meter information into Home Assistant. To get an API key and secret, login to your [Neurio account](https://my.neur.io/#settings/applications/register) and register an application. Note the Homepage URL and Callback URL are optional.

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: neurio_energy
  api_key: CLIENT_ID
  api_secret: CLIENT_SECRET
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
  description: In previous versions of the neurio API, the sensor ID was auto-detected. Current versions of the API require the sensor_id. Sensor_id is in the form of a hex string 0x0000XXXXXXXXXXXX and can be found here https://mypwrview.generac.com/#settings/sensors
  required: true
  type: string
{% endconfiguration %}
