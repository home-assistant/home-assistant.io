---
title: Emoncms History
description: Instructions on how to integrate Emoncms history into Home Assistant.
ha_category:
  - History
ha_iot_class: Local Polling
ha_release: 0.31
ha_domain: emoncms_history
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `emoncms_history` {% term integration %} makes it possible to transfer (write) details collected with Home Assistant to [Emoncms.org](https://emoncms.org/) or your local running Emoncms instance. It will send the data to a specific input node on Emoncms with the entity IDs as a key. Afterwards you can create feeds and dashboards in Emoncms with the collected data.

To use the `emoncms_history` {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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

To read information from Emoncms to Home Assistant, you can use the [`emoncms`](/integrations/emoncms) integration.

{% configuration %}
api_key:
  description: The write API key for your Emoncms user.
  required: true
  type: string
url:
  description: "The base URL of Emoncms, use <https://emoncms.org> for the cloud-based version. For self-hosted Emoncms or EmonPi you may need a URL of `http://x.x.x.x/emoncms`."
  required: true
  type: string
inputnode:
  description: Input node that will be used inside Emoncms. Please make sure you use a dedicated, not used before, node for this integration!
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
