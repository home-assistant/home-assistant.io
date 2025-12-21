---
title: World Tides
description: Instructions on how to add Tides information to Home Assistant.
ha_category:
  - Environment
ha_release: 0.52
ha_iot_class: Cloud Polling
ha_domain: worldtidesinfo
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `worldtidesinfo` {% term integration %} uses details from [World Tides](https://www.worldtides.info/) to provide information about the prediction for the tides for any location in the world.

## Setup

Get your API key from your account at [https://www.worldtides.info/](https://www.worldtides.info/).

## Configuration

To use this {% term integration %}, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: worldtidesinfo
    api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: Your API key.
  required: true
  type: string
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: WorldTidesInfo
latitude:
  description: Latitude of the location to display the tides.
  required: false
  type: float
  default: "The latitude in your `configuration.yaml` file."
longitude:
  description: Longitude of the location to display the tides.
  required: false
  type: float
  default: "The longitude in your `configuration.yaml` file."
{% endconfiguration %}
