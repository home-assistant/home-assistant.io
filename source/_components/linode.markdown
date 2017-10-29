---
layout: page
title: "Linode"
description: "Instructions on how to set up Linode within Home Assistant."
date: 2017-10-20 08:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Hub
logo: linode.png
ha_release: 0.57
ha_iot_class: "Cloud Polling"
---

The `linode` component allows you to access the information about your [Linode](https://welcome.linode.com) systems from Home Assistant.

Obtain your API key from Linode account.

To integrate Linode with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
linode:
  access_token: YOUR_API_KEY
```

{% configuration %}
  access_token:
    description: The Linode access token.
    required: true
    type: string
{% endconfiguration %}

