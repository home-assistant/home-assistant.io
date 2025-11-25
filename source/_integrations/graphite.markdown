---
title: Graphite
description: Instructions on how to record Home Assistant history in Graphite.
ha_category:
  - History
ha_release: 0.13
ha_domain: graphite
ha_iot_class: Local Push
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `graphite` {% term integration %} records all events and state changes and feeds the data to a [graphite](http://graphiteapp.org/) instance.

To enable this {% term integration %}, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
graphite:
```

{% configuration %}
host:
  description: IP address of your graphite host, e.g., 192.168.1.10.
  required: false
  type: string
  default: localhost
port:
  description: Port on graphite host.
  required: false
  type: integer
  default: 2003
protocol:
  description: "Type of communication protocol: `tcp` or `udp`."
  required: false
  type: string
  default: tcp
prefix:
  description: Prefix is the metric prefix in graphite.
  required: false
  type: string
  default: ha
{% endconfiguration %}
