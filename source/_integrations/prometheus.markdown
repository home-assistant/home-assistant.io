---
title: Prometheus
description: Record events in Prometheus.
ha_category:
  - History
ha_release: 0.49
ha_iot_class: Assumed State
ha_domain: prometheus
ha_codeowners:
  - '@knyar'
ha_integration_type: integration
---

The `prometheus` integration exposes metrics in a format which [Prometheus](https://prometheus.io/) can read.

## Configuration

To use the `prometheus` integration in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
prometheus:
```

{% configuration %}
namespace:
  description: The "namespace" that will be assigned to all the Prometheus metrics. This is the prefix of the metric name. E.g., having `myhass` as the namespace will cause the device tracker metrics to be `myhass_device_tracker_state`, the switch metrics to be `myhass_switch_state` and so on. The default is to not add any prefix to the metrics name. (available in version 0.73.0 and later)
  required: false
  type: string
filter:
  description: Filtering directives for the integrations which should be included or excluded from recording. ([Configure Filter](#configure-filter))
  required: false
  type: list
  keys:
    exclude_entities:
      description: The list of entity ids to be excluded from recording.
      required: false
      type: list
    exclude_entity_globs:
      description: Exclude all entities matching a listed pattern (e.g., `sensor.weather_*`).
      required: false
      type: list
    exclude_domains:
      description: The list of domains to be excluded from recording.
      required: false
      type: list
    include_entities:
      description: The list of entity ids to be included from recordings. If set, all other entities will not be recorded. Values set by the **exclude_*** option will prevail.
      required: false
      type: list
    include_entity_globs:
      description: Include all entities matching a listed pattern (e.g., `sensor.weather_*`). If set, all other entities will not be recorded. Values set by the **exclude_*** option will prevail.
      required: false
      type: list
    include_domains:
      description: The list of domains to be included from recordings. If set, all other entities will not be recorded. Values set by the **exclude_*** option will prevail.
      required: false
      type: list
default_metric:
  type: string
  description: Metric name to use when an entity doesn't have a unit.
  required: false
  default: uses the entity id of the entity
override_metric:
  type: string
  description: Metric name to use instead of unit or default metric. This will store all data points in a single metric.
  required: false
component_config:
  type: string
  required: false
  description: This attribute contains component-specific override values. See [Customizing devices and services](/getting-started/customizing-devices/) for format.
  keys:
    override_metric:
      type: string
      description: Metric name to use instead of unit or default metric. This will store all data points in a single metric.
      required: false
component_config_domain:
  type: string
  required: false
  description: This attribute contains domain-specific component override values. See [Customizing devices and services](/getting-started/customizing-devices/) for format.
  keys:
    override_metric:
      type: string
      description: Metric name to use instead of unit or default metric. This will store all data points in a single metric.
      required: false
component_config_glob:
  type: string
  required: false
  description: This attribute contains component-specific override values. See [Customizing devices and services](/getting-started/customizing-devices/) for format.
  keys:
    override_metric:
      type: string
      description: Metric name to use instead of unit or default metric. This will store all data points in a single metric.
      required: false
api_authentication:
  type: boolean
  description: This makes authentication optional for this /api/prometheus endpoint
  required: false
  default: true
{% endconfiguration %}

### Configure Filter

By default, no entity will be excluded. To limit which entities are being exposed to `Prometheus`, you can use the `filter` parameter.

```yaml
# Example filter to include specified domains and exclude specified entities
prometheus:
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

## Full Example

Advanced configuration example:

```yaml
# Advanced configuration.yaml entry
prometheus:
  namespace: hass
  component_config_glob:
    sensor.*_hum:
      override_metric: humidity_percent
    sensor.*_temp:
      override_metric: temperature_c
    sensor.temperature*:
      override_metric: temperature_c
    sensor.*_bat:
      override_metric: battery_percent
  filter:
    include_domains:
      - sensor
    exclude_entity_globs:
      - sensor.weather_*
```

You can then configure Prometheus to fetch metrics from Home Assistant by adding to its `scrape_configs` configuration.

```yaml
# Example Prometheus scrape_configs entry
  - job_name: "hass"
    scrape_interval: 60s
    metrics_path: /api/prometheus

    # Legacy api password
    params:
      api_password: ['PASSWORD']

    # Long-Lived Access Token
    bearer_token: "your.longlived.token"

    scheme: https
    static_configs:
      - targets: ['HOSTNAME:8123']
```

Replace `your.longlived.token` with a Home Assistant [generated token](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token).

The format to configure the bearer token has changed in Prometheus 2.26, so if you have a newer version, you can use this configuration sample:

```yaml
# Example Prometheus scrape_configs entry (For version 2.26+
  - job_name: "hass"
    scrape_interval: 60s
    metrics_path: /api/prometheus

    # Long-Lived Access Token
    authorization:
      credentials: "your.longlived.token"

    scheme: https
    static_configs:
      - targets: ['HOSTNAME:8123']
```

When looking into the metrics on the Prometheus side, there will be:

- All Home Assistant domains, which can be easily found through the common **namespace** prefix, if defined.
- The [client library](https://github.com/prometheus/client_python) provided metrics, which are a bunch of **process_\*** and also a single pseudo-metric **python_info** which contains (not as value but as labels) information about the Python version of the client, i.e., the Home Assistant Python interpreter.
  
Typically, you will only be interested in the first set of metrics.

## Metrics in unavailable or unknown states

When the Prometheus exporter starts (typically when Home Assistant starts), all non-excluded entities in an unavailable or unknown state are not be exported until they are available again. If the entity goes into state unavailable or unknown again, the value exported will always be the latest known one.

While an entity is in those states, the `entity_available` corresponding metric is set to 0. This metric can be used to filter out values while the entity is unavailable or in an unknown state thanks to a [recording rule](https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/).

For example:

```yaml
- record: "known_temperature_c"
  expr: "temperature_c unless entity_available == 0"
```
