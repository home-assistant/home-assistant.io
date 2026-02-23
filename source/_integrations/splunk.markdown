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

[Splunk](https://www.splunk.com/) is a data platform for searching, monitoring, and analyzing machine-generated data. The **Splunk** {% term integration %} sends all Home Assistant state changes to a Splunk instance using the [HTTP Event Collector (HEC)](https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector) feature.

## Prerequisites

- A Splunk instance (version 6.3 or later) that is network-accessible from Home Assistant.
- The HTTP Event Collector (HEC) must be enabled and a token created. To set this up in Splunk:
  1. Go to **Settings** > **Data inputs**.
  2. Select **HTTP Event Collector**.
  3. Select **Global Settings** and ensure HEC is **Enabled**.
  4. Select **New Token** and follow the prompts to create a token for Home Assistant.
  5. Copy the generated token value for use in the configuration below.

## Configuration

To use the `splunk` integration in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
splunk:
  token: YOUR_SPLUNK_TOKEN
```

{% configuration %}
token:
  description: The HTTP Event Collector Token already created in your Splunk instance.
  required: true
  type: string
host:
  description: "IP address or host name of your Splunk host, e.g., 192.168.1.10."
  required: false
  default: localhost
  type: string
port:
  description: Port to use.
  required: false
  default: 8088
  type: integer
ssl:
  description: Use HTTPS instead of HTTP to connect.
  required: false
  default: false
  type: boolean
verify_ssl:
  description: Allows you do disable checking of the SSL certificate.
  required: false
  default: true
  type: boolean
name:
  description: This parameter allows you to specify a friendly name to send to Splunk as the host, instead of using the name of the HEC.
  required: false
  default: "`HASS`"
  type: string
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
  token: YOUR_SPLUNK_TOKEN
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

## Removing the integration

To remove the Splunk integration:

1. Remove the `splunk:` section from your {% term "`configuration.yaml`" %} file.
2. Restart Home Assistant.

Data already sent to your Splunk instance will remain there and can still be queried.
