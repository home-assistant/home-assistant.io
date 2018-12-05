---
layout: page
title: "Skybell Switch"
description: "Instructions on how to integrate your Skybell HD devices within Home Assistant."
date: 2017-10-03 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: skybell.png
ha_category: Switch
ha_release: 0.56
ha_iot_class: "Cloud Polling"
---

To get your [Skybell.com](https://skybell.com/) switches working within Home Assistant, please follow the instructions for the general [Skybell component](/components/skybell).

## {% linkable_title Configuration %}

Once you have enabled the [Skybell component](/components/skybell), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: skybell
    monitored_conditions:
      - do_not_disturb
      - motion_sensor
```

{% configuration %}
monitored_conditions:
  description: Conditions to display in the frontend.
  required: true
  type: list
  keys:
    do_not_disturb:
      description: Control the state of your doorbells indoor chime.
    motion_sensor:
      description: Control the state of your doorbells motion sensor.
{% endconfiguration %}
