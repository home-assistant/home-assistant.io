---
title: Sonarr
description: Instructions on how to integrate Sonarr with Home Assistant
ha_category:
  - Downloading
ha_release: 0.34
ha_iot_class: Local Polling
ha_domain: sonarr
ha_config_flow: true
ha_codeowners:
  - '@ctalkington'
ha_quality_scale: silver
---

The `Sonarr` integration pulls data from a given [Sonarr](https://sonarr.tv/) instance.

### Configuration

Go to the integrations page in your configuration and click on new integration -> Sonarr.

### YAML Configuration

Manual configuration of your Sonarr instance is also possible, add the following to your `configuration.yaml` file:


```yaml
# Example configuration.yaml entry
sonarr:
  - host: HOST
    api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  required: true
  type: string
  description: "Your Sonarr API key, found in Settings > General in the Sonarr Web UI."
host:
  required: true
  type: string
  description: The host Sonarr is running on.
  default: "`localhost`"
port:
  required: false
  type: integer
  description: The port Sonarr is running on.
  default: 8989
base_path:
  required: false
  type: string
  description: The base path to Sonarr API.
  default: "`/api`"
upcoming_days:
  required: false
  type: integer
  description: How many days to look ahead for the upcoming sensor, 1 means today only.
  default: 1
wanted_max_items:
  required: false
  type: integer
  description: How many items to lookup for the wanted sensor.
  default: 50
ssl:
  required: false
  type: boolean
  description: Whether or not to use SSL for Sonarr.
  default: false
verify_ssl:
  required: false
  type: boolean
  description: Whether or not to verify SSL certificate for Sonarr.
  default: false
{% endconfiguration %}
