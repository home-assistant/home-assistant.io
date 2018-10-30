---
layout: page
title: "Skybell Binary Sensor"
description: "Instructions on how to integrate your Skybell HD devices within Home Assistant."
date: 2017-10-03 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: skybell.png
ha_category: Doorbell
ha_release: 0.56
ha_iot_class: "Cloud Polling"
---

To get your [Skybell.com](https://skybell.com/) binary sensors working within Home Assistant, please follow the instructions for the general [Skybell component](/components/skybell).

## {% linkable_title Configuration %}

Once you have enabled the [Skybell component](/components/skybell), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: skybell
    monitored_conditions:
      - button
      - motion
```

{% configuration %}
monitored_conditions:
  description: Conditions to display in the frontend. The following conditions can be monitored.
  required: true
  type: list
  keys:
    button:
      description: Returns whether the doorbell button was pressed.
    motion:
      description: Returns whether movement was detected by the Skybell doorbell.
{% endconfiguration %}
