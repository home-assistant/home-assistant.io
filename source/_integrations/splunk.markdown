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

The `splunk` integration makes it possible to log all state changes to an external [Splunk](https://splunk.com/) database using Splunk's HTTP Event Collector (HEC) feature. You can either use this alone, or with the Home Assistant for Splunk [app](https://github.com/miniconfig/splunk-homeassistant). Since the HEC feature is new to Splunk, you will need to use at least version 6.3.

{% include integrations/config_flow.md %}

## Configuration

The Splunk integration is configured through the Home Assistant user interface. YAML configuration is only used when you need to filter which entities are sent to Splunk.

This integration supports a single instance only.

### Configuration via the user interface

To add the Splunk integration to your Home Assistant instance, use this My button:

{% my config_flow_start badge domain=page.ha_domain %}

{% details "Manual configuration steps" %}

If the above My button doesn't work, you can also perform the following steps manually:

- Browse to your Home Assistant instance.
- Go to {% my integrations title="**Settings** > **Devices & Services**" %}.
- In the bottom right corner, select the
  {% my config_flow_start badge icon domain=page.ha_domain %} button.
- From the list, select **Splunk**.
- Follow the instructions on screen to complete the setup.

{% enddetails %}

### Configuration via YAML

YAML configuration is only required if you need to filter which entities are sent to Splunk. The integration supports a single instance, and entity filters defined in YAML will be applied to the config entry.

If you don't need entity filtering, use the UI configuration instead.

To configure entity filtering, add the following to your {% term "`configuration.yaml`" %} file.
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
  description: Filters for entities to be included/excluded from Splunk. Default is to include all entities. ([Configure Filter](#configure-filter))
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

### Configure filter

By default, no entity will be excluded. To limit which entities are being exposed to `Splunk`, you can use the `filter` parameter.

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
