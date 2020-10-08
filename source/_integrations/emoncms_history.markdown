---
title: Emoncms History
description: Instructions on how to integrate Emoncms history into Home Assistant.
ha_category:
  - History
ha_iot_class: Local Polling
ha_release: 0.31
ha_domain: emoncms_history
---

The `emoncms_history` integration makes it possible to transfer details collected with Home Assistant to [Emoncms.org](https://emoncms.org/) or your local running Emoncms instance. It will send the data to a specific input node on Emoncms with the entity IDs as a key. Afterwards you can create feeds and dashboards in Emoncms with the collected data.

To use the `emoncms_history` integration in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
emoncms_history:
  api_key: YOUR_EMONCMS_WRITE_API_KEY
  url: https://emoncms.org
  inputnode: 19
  whitelist:
    - sensor.owm_temperature
    - sensor.owm_wind_speed
```

{% configuration %}
api_key:
  description: Your Emoncms write API key
  required: true
  type: string
url:
  description: The root URL of your Emoncms installation. (Use `https://emoncms.org` for the cloud based version)
  required: true
  type: string
inputnode:
  description:  Input node that will be used inside Emoncms. Please make sure you use a dedicated, not used before, node for this component!
  required: true
  type: integer
whitelist:
  description: List of entity IDs you want to publish.
  required: true
  type: list
scan_interval:
  description:  Defines, in seconds, how regularly the states of the whitelisted entities are being gathered and send to Emoncms.
  required: false
  type: integer
  default: 30
{% endconfiguration %}
