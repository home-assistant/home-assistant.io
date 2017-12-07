---
layout: page
title: "Digital Ocean"
description: "Instructions how to integrate the Digital Ocean within Home Assistant."
date: 2016-09-24 20:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Hub
ha_release: "0.30"
logo: digital_ocean.png
ha_iot_class: "Local Polling"
---


The `digital_ocean` component allows you to access the information about your [Digital Ocean](https://www.digitalocean.com/) droplets from Home Assistant.

Obtain your API key from your [Digital Ocean dashboard](https://cloud.digitalocean.com/settings/api/tokens).

To integrate your Digital Ocean droplets with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
digital_ocean:
  access_token: YOUR_API_KEY
```

{% configuration %}
access_token:
  description: Your Digital Ocean API access token.
  required: true
  type: string
{% endconfiguration %}

