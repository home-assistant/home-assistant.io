---
title: StatsD
description: Record events in StatsD.
ha_category:
  - History
ha_iot_class: Local Push
ha_release: 0.12
ha_domain: statsd
---

The `statsd` integration makes it possible to transfer all state changes to an external [StatsD](https://github.com/etsy/statsd) instance.

To use the `statsd` integration in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
statsd:
```

{% configuration %}
host:
  description: "IP address of your StatsD host, e.g., 192.168.1.10."
  required: true
  default: localhost
  type: string
port:
  description: Port to use.
  required: false
  default: 8125
  type: integer
prefix:
  description: Prefix to use.
  required: false
  default: hass
  type: string
rate:
  description: The sample rate.
  required: false
  default: 1
  type: integer
log_attributes:
  description: Log state and attribute changes. This changes the default stats path.
  required: false
  default: false
  type: boolean
value_mapping:
  description: Map non-numerical values to numerical ones.
  required: false
  type: list
{% endconfiguration %}

Full example:

```yaml
# Example configuration.yaml entry
statsd:
  prefix: home
  rate: 5
  value_mapping:
    cooling: 1
    heating: 10
```

StatsD supports various [backends](https://github.com/etsy/statsd/blob/master/docs/backend.md).
