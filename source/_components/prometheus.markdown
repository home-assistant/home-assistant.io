---
layout: page
title: "Prometheus"
description: "Record events in Prometheus."
date: 2017-06-25 08:00
sidebar: true
comments: false
sharing: true
logo: prometheus.png
footer: true
ha_category: "History"
ha_release: 0.49
---

The `prometheus` component exposes metrics in a format which [Prometheus](https://prometheus.io/) can read.

To use the `prometheus` component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
prometheus:
```

Configuration variables:

- **namespace** (*Optional*): The "namespace" that will be assigned for all the prometheus metrics. This is the prefix of the metric name. E.g. having `myhass` as the namespace will causes the device tracker metrics to be `myhass_device_tracker_state`, the switch metrics to be `myhass_switch_state` and so on. The default namespace is `hass`.
- **filter** (*Optional*): Filtering directives for the components which should be included or excluded from recording.
  - **exclude** (*Optional*): Excluded from recording.
    - **entities** (*Optional*): The list of entity ids to be excluded from recording.
    - **domains** (*Optional*): The list of domains to be excluded from recording.
  - **include** (*Optional*): Included in recordings. If set, all other entities will not be recorded. Values set by the **exclude** option will prevail.
    - **entities** (*Optional*): The list of entity ids to be included from recordings.
    - **domains** (*Optional*): The list of domains to be included from recordings.

You can then configure Prometheus to fetch metrics from Home Assistant by adding to its `scrape_configs` configuration.

```yaml
# Example Prometheus scrape_configs entry
  - job_name: 'hass'
    scrape_interval: 60s
    metrics_path: /api/prometheus
    params:
      api_password: ['PASSWORD']
    scheme: https
    static_configs:
      - targets: ['HOSTNAME:8123']
```

When looking into the metrics in the prometheus side, there will be:

  - All HomeAssistant domains, which can be easily found through the common **namespace** prefix (`hass` by default).
  - The [client library](https://github.com/prometheus/client_python) provided metrics, which are a bunch of **process_\*** and also a single pseudo-metric **python_info** which contains (not as value but as labels) information about the Python version of the client, i.e. HomeAssistant python interpreter.
  
Typically, you will only be interested in the first set of metrics.
