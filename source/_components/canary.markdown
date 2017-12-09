---
layout: page
title: "Canary"
description: "Instructions on how to integrate your Canary devices into Home Assistant."
date: 2017-12-07 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: canary.png
ha_category: Hub
ha_release: "0.60"
ha_iot_class: "Cloud Polling"
---

The `canary` component allows you to integrate your [Canary](https://canary.is) devices in Home Assistant.

You will need your Canary login information (username, usually you email address, and password) to use this module.

To set it up, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
canary:
  username: you@example.com
  password: secret
```

{% configuration %}
  username:
    description: The username for accessing your Canary account.
    required: true
    type: string
  password:
    description: The password for accessing your Canary account.
    required: true
    type: string
  timeout:
    description: Timeout to wait for connections.
    required: false
    type: int
    default: 10
{% endconfiguration %}



Once loaded, your front end will have the following components:

* A camera image triggered by motion for each camera
* An alarm control panel for each location
* A sensor per camera that reports temperature.
* A sensor per camera that reports humidity.
* A sensor per camera that reports air quality.
