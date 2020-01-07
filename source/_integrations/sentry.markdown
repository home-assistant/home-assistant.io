---
title: Sentry
description: Record errors to Sentry.
logo: sentry.png
ha_category:
  - System Monitor
ha_iot_class: Cloud Polling
ha_release: 0.104
---

The `sentry` integration integrates with [Sentry](https://sentry.io/) to capture both logged errors as well as unhandled exceptions in Home Assistant.

## Configuration

To use the `sentry` integration in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sentry:
  dsn: SENTRY_DSN
```

{% configuration %}
dsn:
  description: The DSN provided to you by Sentry.
  required: true
  type: string
environment:
  description: An environment name to associate with events.
  required: false
  type: string
{% endconfiguration %}
