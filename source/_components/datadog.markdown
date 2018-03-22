---
layout: page
title: "Datadog"
description: "Send data and events to Datadog."
date: 2017-04-18 00:00
sidebar: true
comments: false
sharing: true
logo: datadog.png
footer: true
ha_category: History
ha_release: 0.45
---

The `datadog` component sends all state changes to [Datadog](https://www.datadoghq.com/) using a [Datadog Agent](http://docs.datadoghq.com/guides/basic_agent_usage/).

Datadog allows you to analyze, monitor, cross-reference and alert upon your data. You can use it to detect statistical anomalies, see graphs across multiple sources in real-time, send critical alerts to Slack, etc.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/datadog-board-example.png' />
</p>

The component also sends events from the logbook into Datadog, allowing you to correlate these events with your data.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/datadog-event-stream.png' />
</p>

To use the `datadog` component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
datadog:
```

Configuration variables:

- **host** (*Optional*): The IP address or hostname of your Datadog host, e.g., 192.168.1.23. Defaults to `localhost`.
- **port** (*Optional*): Port to use. Defaults to 8125.
- **prefix** (*Optional*): Prefix to use. Defaults to `hass`.
- **rate** (*Optional*): The sample rate of UDP packets sent to Datadog. Defaults to 1.
