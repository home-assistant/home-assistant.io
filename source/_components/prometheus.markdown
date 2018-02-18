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

- **exclude** (*Optional*): Configure which components should be excluded from recording.
  - **entities** (*Optional*): The list of entity ids to be excluded from recording.
  - **domains** (*Optional*): The list of domains to be excluded from recording.
- **include** (*Optional*): Configure which components should be included in recordings. If set, all other entities will not be recorded. Values set by the **blacklist** option will prevail.
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
