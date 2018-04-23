---
layout: page
title: "Hunter Hydrawise"
description: "Instructions on how to integrate your Hunter Hydrawise Wi-Fi irrigation control system within Home Assistant."
date: 2018-04-11 08:02
sidebar: true
comments: false
sharing: true
footer: true
logo: hydrawise_logo.png
ha_category: Hub
ha_release: 0.68
ha_iot_class: Cloud Polling
---

The `hydrawise` component allows you to integrate your [Hunter Hydrawise](https://hydrawise.com) Wi-Fi irrigation controller system in Home Assistant.

To enable it, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
hydrawise:
  access_token: YOUR_API_KEY
```

{% configuration %}
access_token:
  description: The API KEY assigned to your Hydrawise account.
  required: true
  type: string
scan_interval:
  description: The time interval, in seconds, to poll the Hydrawise cloud.
  required: false
  type: int
  default: 20
{% endconfiguration %}

To get your API access token log into your [Hydrawise account](https://app.hydrawise.com/config/account) and in the 'My Account Details' section under Account Settings click 'Generate API Key'. Enter that key in your configuration file as the `API_KEY`.

Finish the configuration by visiting the [Hydrawise binary sensor](/components/binary_sensor.hydrawise/), [Hydrawise sensor](/components/sensor.hydrawise/) and [Hydrawise switch](/components/switch.hydrawise/) documentation.
