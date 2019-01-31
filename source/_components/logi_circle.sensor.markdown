---
layout: page
title: "Logi Circle Sensor"
description: "Instructions on how to integrate your Logi Circle sensors within Home Assistant."
date: 2018-09-08 11:00
sidebar: true
comments: false
sharing: true
footer: true
logo: logi_circle.png
ha_category: Sensor
ha_release: 0.79
ha_iot_class: "Cloud Polling"
---

The `logi_circle` sensor platform lets you monitor sensors connected to your [Logi Circle](https://circle.logi.com) cameras in Home Assistant.

<p class='note'>
You must have the [Logi Circle component](/components/logi_circle/) configured to use this sensor platform. The `logi_circle` sensor will be automatically setup when you do.
</p>

## {% linkable_title Configuration %}

To customize which sensors are setup, you can extend the [Logi Circle component](/components/logi_circle/) configuration in your `configuration.yaml` file with the following settings:

```yaml
# Example configuration.yaml entry
logi_circle:
  sensors:
    monitored_conditions:
      - battery_level
      - last_activity_time
      - recording
      - signal_strength_category
      - signal_strength_percentage
      - streaming
```

By default, all sensors available from your Logi Circle devices will be monitored. Leave `monitored_conditions` blank to disable all sensors for the Logi Circle component. Devices without an internal battery will not expose a `battery_level` sensor.

{% configuration %}
sensor:
  description: Configuration to pass to all sensors.
  required: false
  type: map
  keys:
    monitored_conditions:
      description: The conditions to create sensors from.
      required: false
      type: list
      default: all
      keys:
        battery_level:
          description: Returns the battery level percentage from the camera.
        last_activity_time:
          description: Return the timestamp from the last time the Logi Circle camera detected any activity.
        recording:
          description: The camera's recording mode. If false, the camera will not capture activities.
        signal_strength_category:
          description: Return the WiFi signal level from the camera.
        signal_strength_percentage:
          description: Return the WiFi signal percentage from the camera.
        streaming:
          description: The soft on/off status of the camera.
{% endconfiguration %}