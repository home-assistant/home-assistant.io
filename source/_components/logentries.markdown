---
layout: page
title: "Logentries"
description: "Send events to Logentries."
date: 2016-04-29 16:50
sidebar: true
comments: false
sharing: true
logo: logentries.png
footer: true
ha_category: "History"
---

The `logentries` component makes it possible to log all state changes to [Logentries](http://logentries.com/) using Logentries Webhook endpoint.

Open the **Add a Log** page and choose **Manual**. Enter a name for your log in **Log Name**, add a group in **Select Log Set**, set **Token TCP - logs are identified by a token.** and press **Create Log Token**. The generated token is required for the Home Assistant configuration.

To use the `logentries` component in your installation, add the following to your `configuration.yaml` file:

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

