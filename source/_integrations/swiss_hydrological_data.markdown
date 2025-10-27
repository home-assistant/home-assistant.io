---
title: Swiss Hydrological Data
description: Instructions on how to integrate hydrological data of Swiss waters within Home Assistant.
ha_category:
  - Environment
ha_iot_class: Cloud Polling
ha_release: 0.22
ha_codeowners:
  - '@fabaff'
ha_domain: swiss_hydrological_data
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `swiss_hydrological_data` {% term integration %} will show you details (temperature, level, and discharge) of rivers and lakes in Switzerland.

## Setup

The [station overview](https://www.hydrodaten.admin.ch/en/stations-and-data.html) contains a list of all available measuring points and will help to determine the ID of station which is needed for the configuration.

## Configuration

To enable this {% term integration %}, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: swiss_hydrological_data
    station: STATION_ID
    monitored_conditions:
      - temperature
      - level
      - discharge
```

{% configuration %}
station:
  description: The ID of the measurement point.
  required: true
  type: string
monitored_conditions:
  description: The list of measurements you want to use. Available is `temperature`, `level` or `discharge`.
  required: false
  type: list
  default: temperature
{% endconfiguration %}

Sensors are exposing additional values through their attributes for all available conditions:

- `max-24h`: The maximum measurement for the last 24 hours.
- `mean-24h`: The mean measurement for the last 24 hours.
- `min-24h`: The minimum measurement for the last 24 hours.
- `station_update`: There is a time span between the sensor update in Home Assistant and the updates from the stations. Include those information if you are building automations based on the discharge of a water body.

{% note %}
The sensors don't show the latest measurement, but those from the last hour due to the source of data. Some stations also don't provide data for certain measurements.
{% endnote %}

The hydrological measurements are coming from the [Swiss Federal Office for the Environment (Bundesamt für Umwelt - Abt. Hydrologie)](https://www.hydrodaten.admin.ch/) and are updated every 10 minutes.
