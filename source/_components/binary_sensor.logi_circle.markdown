---
layout: page
title: "Logi Circle Binary Sensor"
description: "Instructions on how to integrate your Logi Circle binary sensors within Home Assistant."
date: 2019-01-15 11:00
sidebar: true
comments: false
sharing: true
footer: true
logo: logi_circle.png
ha_category: Binary Sensor
ha_release: 0.86
ha_iot_class: "Cloud Push"
---

The `logi_circle` binary sensor platform lets you monitor binary sensors connected to your [Logi Circle](https://circle.logi.com) cameras in Home Assistant.

<p class='note'>
You must have the [Logi Circle component](/components/logi_circle/) configured to use this binary sensor platform. The `logi_circle` binary sensor will be automatically setup when you do.
</p>

## {% linkable_title Configuration %}

To customize which sensors are setup, you can extend the [Logi Circle component](/components/logi_circle/) configuration in your `configuration.yaml` file with the following settings:

```yaml
# Example configuration.yaml entry
logi_circle:
  binary_sensors:
    monitored_conditions:
      - activity
      - is_charging
      - privacy_mode
      - streaming_enabled
```

By default, all binary sensors available from your Logi Circle devices will be monitored. Leave `monitored_conditions` blank to disable all binary sensors for the Logi Circle component. Devices without an internal battery will not expose a `is_charging` sensor.

{% configuration variables %}
binary_sensor:
  description: Configuration to pass to all binary sensors.
  required: false
  type: map
  keys:
    monitored_conditions:
      description: The conditions to create binary sensors from.
      required: false
      type: list
      default: all
      keys:
        activity:
          description: Indicates whether there is an activity in-progress.
        is_charging:
          description: Indicates whether the camera is currently charging.
        privacy_mode:
          description: The configured privacy mode. If true, the camera will not capture activities.
        streaming_enabled:
          description: The soft on/off status of the camera.
{% endconfiguration %}

## {% linkable_title Activities %}

The Activity binary sensors abstracts Logi Circle's `activity_created`, `activity_updated` and `activity_finished` events, pushed through their WebSockets API. Activity events can take anywhere up to 1-2 minutes to fire following any detected motion.

When an activity is detected, the following metadata will be available from the Activity binary sensor's state properties:

* `activity_id`: An internal ID that uniquely identifies this activity.
* `relevance_level`: A score between 0-1 that determines the level of activity. This can change during the activity event lifecycle. 0 refers to low activity, 1 to high.
* `start_time`: An ISO8601 date time string that corrosponds to when relevant motion was first detected, casted to your [configured time zone](https://www.home-assistant.io/docs/configuration/basic/#time_zone).
* `duration`: The activity duration, in seconds. This can change during the activity event lifecycle.

Activities cannot exceed 3 minutes. Should actual activity exceed 3 minutes, the binary sensor may briefly switch off until a new activity is generated and pushed by the Logi Circle API.