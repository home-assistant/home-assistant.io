---
layout: page
title: "Tibber"
description: "Instructions on how to integrate Tibber within Home Assistant."
date: 2015-10-04 16:34
sidebar: true
comments: false
sharing: true
footer: true
logo: tibber.png
ha_category: Energy
ha_release: 0.80
ha_qa_scale: silver
ha_iot_class: "Cloud Polling"
---

The `tibber` component provides a sensor with the current electricity price if you are a [Tibber](https://tibber.com/) customer.
If you have a [Tibber Pulse](https://norge.tibber.com/products/pulse/) it will also show the electricity consumption in real time.

It also provides a notification service.

## {% linkable_title Setup %}

Go to [developer.tibber.com/](https://developer.tibber.com/) to get your API token.

## {% linkable_title Configuration %}

To add Tibber to your installation, add the following to your `configuration.yaml` file:

```yaml
tibber:
  access_token: YOUR_ACCESS_TOKEN
```

{% configuration %}
access_token:
  description: Your Tibber API token.
  required: true
  type: string
{% endconfiguration %}
