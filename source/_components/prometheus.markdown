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

The Prometheus component has no configuration variables.

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
