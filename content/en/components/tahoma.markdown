---
layout: page
title: "Tahoma"
description: "Instructions on how to integrate Somfy Tahoma devices with Home Assistant."
date: 2017-07-18 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tahoma.png
ha_category: Hub
ha_release: 0.59
ha_iot_class: "Cloud Polling"
---


The `Tahoma` component platform is used as an interface to the [tahomalink.com](https://www.tahomalink.com) website. It adds covers, scenes and a sun sensor from the Tahoma platform.

To use your Tahoma devices in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
tahoma:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  exclude: [BridgeHUEComponent, HueLampHUEComponent, PodComponent]
```

{% configuration %}
username:
  description: Username for tahomalink.com
  required: true
  type: string
password:
  description: Password for tahomalink.com
  required: true
  type: string
exclude:
  description: Excludes devices
  required: false
  type: list
{% endconfiguration %}
