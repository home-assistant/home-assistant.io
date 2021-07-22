---
title: Logentries
description: Send events to Logentries.
ha_category:
  - History
ha_iot_class: Cloud Push
ha_release: 0.13
ha_domain: logentries
---

The `logentries` integration makes it possible to log all state changes to [Logentries](http://logentries.com/) using Logentries Webhook endpoint.

Open the **Add a Log** page and choose **Manual**. Enter a name for your log in **Log Name**, add a group in **Select Log Set**, set **Token TCP - logs are identified by a token.** and press **Create Log Token**. The generated token is required for the Home Assistant configuration.

To use the `logentries` integration in your installation, add the following to your `configuration.yaml` file:

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
