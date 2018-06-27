---
layout: page
title: "Traccar"
description: "Instructions on how to use a Traccar GPS Platform as a device tracker."
date: 2018-06-26 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: traccar.png
ha_category: Presence Detection
ha_release: 0.70
---


This platform allows you to integrate [Traccar](https://www.traccar.org/) GPS Tracking Platform into Home Assistant.

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: traccar
    url: <http://server:port>
    username: <USERNAME>
    password: <PASSWORD>
```

{% configuration %}
url:
  description: Your Traccar server url including port. ( ex. http://yourtraccarserver.com:8082 )
  required: true
  type: url
username:
  description: Your Traccar username.
  required: true
  type: string
password:
  description: Your Traccar password.
  required: true
  type: string
{% endconfiguration %}

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
