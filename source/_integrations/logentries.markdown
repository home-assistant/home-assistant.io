---
title: Logentries
description: Send events to Logentries.
ha_category:
  - History
ha_iot_class: Cloud Push
ha_release: 0.13
ha_domain: logentries
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `logentries` {% term integration %} makes it possible to log all state changes to [Logentries](https://logentries.com) using Logentries Webhook endpoint.

Open the **Add a Log** page and choose **Manual**. Enter a name for your log in **Log Name**, add a group in **Select Log Set**, set **Token TCP - logs are identified by a token.** and press **Create Log Token**. The generated token is required for the Home Assistant configuration.

To use the `logentries` {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
logentries:
  token: TOKEN
```

{% configuration %}
token:
  description: The token for the log to use.
  required: true
  type: string
{% endconfiguration %}
