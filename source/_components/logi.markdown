---
layout: page
title: "Logi"
description: "Instructions on how to integrate your Logi Circle cameras within Home Assistant."
date: 2018-09-08 11:00
sidebar: true
comments: false
sharing: true
footer: true
logo: logi.png
ha_category: Camera
ha_release: 0.78
ha_iot_class: "Cloud Polling"
---

The `logi` implementation allows you to integrate your [Logi Circle](https://circle.logi.com/) cameras in Home Assistant.

## {% linkable_title Configuration %}

To integrate cameras linked with your [Logi Circle](https://circle.logi.com/) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
logi:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The username for accessing your Logi Circle account.
  required: true
  type: string
password:
  description: The password for accessing your Logi Circle account.
  required: true
  type: string
{% endconfiguration %}

Finish its configuration by visiting the [Logi camera](/components/camera.logi/) or [Logi sensor](/components/sensor.logi/) documentation.
