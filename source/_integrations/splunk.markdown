---
title: Splunk
description: Record events in Splunk.
ha_category:
  - History
ha_iot_class: Local Push
ha_release: 0.13
ha_domain: splunk
ha_codeowners:
  - '@Bre77'
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **Splunk** {% term integration %} makes it possible to log all state changes to an external [Splunk](https://splunk.com/) database using Splunk's HTTP Event Collector (HEC) feature. You can either use this alone, or with the Home Assistant for Splunk [app](https://github.com/miniconfig/splunk-homeassistant). Since the HEC feature is new to Splunk, you will need to use at least version 6.3.

{% include integrations/config_flow.md %}

## Filters

Optionally, add the following lines to your {% term "`configuration.yaml`" %} file for filtering which entities are sent to Splunk:

{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry with entity filter
splunk:
  filter:
    include_domains:
      - sensor
      - binary_sensor
```

{% configuration %}
filter:
  description: Filters for entities to be included/excluded from Splunk. Default is to include all entities. ([Configuring a filter](#configuring-a-filter))
  required: false
  type: map
  keys:
    include_domains:
      description: Domains to be included.
      required: false
      type: list
    include_entity_globs:
      description: Include all entities matching a listed pattern (e.g., `sensor.weather_*`).
      required: false
      type: list
    include_entities:
      description: Entities to be included.
      required: false
      type: list
    exclude_domains:
      description: Domains to be excluded.
      required: false
      type: list
    exclude_entity_globs:
      description: Exclude all entities matching a listed pattern (e.g., `sensor.weather_*`).
      required: false
      type: list
    exclude_entities:
      description: Entities to be excluded.
      required: false
      type: list
{% endconfiguration %}

### Configuring a filter

By default, no entity will be excluded. To limit which entities are exposed to Splunk, you can use the `filter` parameter.

```yaml
# Example filter to include specified domains and exclude specified entities
splunk:
  filter:
    include_domains:
      - alarm_control_panel
      - light
    include_entity_globs:
      - binary_sensor.*_occupancy
    exclude_entities:
      - light.kitchen_light
```

{% include common-tasks/filters.md %}
