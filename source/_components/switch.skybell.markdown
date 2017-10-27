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

Once you have enabled the [Skybell component](/components/skybell), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: skybell
    monitored_conditions:
      - do_not_disturb
      - motion_sensor
```

Configuration variables:

- **monitored_conditions** array (*Required*): Conditions to display in the frontend. The following conditions can be monitored.
  - **do_not_disturb**: Control the state of your doorbells indoor chime.
  - **motion_sensor**: Control the state of your doorbells motion sensor.
