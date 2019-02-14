---
layout: page
title: "Space Launch sensor"
description: "Instructions on how to integrate space launch information within Home Assistant."
date: 2018-11-06 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: rocket.png
ha_category: Sensor
ha_iot_class: "Cloud Polling"
ha_release: "0.83"
---

The `launch_library` sensor will provide you with information about the next planned space launch.

## {% linkable_title Configuration %}

Add the data to your `configuration.yaml` file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: launch_library
```

{% configuration %}
name:
  description: Name of the sensor.
  required: false
  type: string
{% endconfiguration %}

The data this platform presents comes from [launchlibrary.net][launchlibrary].

[launchlibrary]: http://launchlibrary.net/
