---
title: Datadog
description: Send data and events to Datadog.
ha_category:
  - History
ha_iot_class: Local Push
ha_release: 0.45
ha_domain: datadog
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **Datadog** {% term integration %} sends all state changes to [Datadog](https://www.datadoghq.com/) using a [Datadog Agent](https://docs.datadoghq.com/guides/basic_agent_usage/).

Datadog allows you to analyze, monitor, cross-reference and alert upon your data. You can use it to detect statistical anomalies, see graphs across multiple sources in real-time, send critical alerts to Slack, etc.

<p class='img'>
  <img src='/images/screenshots/datadog-board-example.png' />
</p>

The integration also sends events from the logbook into Datadog, allowing you to correlate these events with your data.

<p class='img'>
  <img src='/images/screenshots/datadog-event-stream.png' />
</p>

## Setup

You need to have a Datadog agent installed in a network accessible by Home Assistant.

In the [Datadog Agent configuration](https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml#L2203-L2207), you must enable [DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/) non-local traffic to allow StatsD data collection from outside `localhost`.

## Configuration

To use the `datadog` integration in your installation, add the following to your  {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
datadog:
```

{% configuration %}
host:
  description: The IP address or hostname of your Datadog host, e.g., 192.168.1.23.
  required: false
  default: localhost
  type: string
port:
  description: Port to use.
  required: false
  default: 8125
  type: integer
prefix:
  description: Metric prefix to use.
  required: false
  default: "`hass`"
  type: string
rate:
  description: The sample rate of UDP packets sent to Datadog.
  required: false
  default: 1
  type: integer
{% endconfiguration %}
