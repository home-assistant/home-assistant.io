---
layout: page
title: "Abode Home Security"
description: "Instructions on integrating Abode home security with Home Assistant."
date: 2017-08-26 0:28
sidebar: true
comments: false
sharing: true
footer: true
logo: abode.jpg
ha_category: Hub
ha_release: 0.52
ha_iot_class: "Cloud Polling"
---

The `abode` component will allow users to integrate their Abode Home Security systems into Home Assistant and use its alarm system and sensors to automate their homes.  

Please visit the [Abode website](https://goabode.com/) for further information about Abode Security.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](/components/binary_sensor.abode/): Reports on `Door Contacts` (open or close) and `Motion Camera` (motion detected or not)
- [Alarm Control Panel](/components/alarm_control_panel.abode/): Reports on current alarm status and can be used to arm/disarm the system

The component currently polls every 30 seconds, so device status may not be immediately reflected in Home Assistant.

An `abode` section must be present in the `configuration.yaml` file and contain the following options as required:

```yaml
# Example configuration.yaml entry
abode:
  username: abode_username
  password: abode_password
```

Configuration variables:

- **username** (*Required*): Username for the Abode account.
- **password** (*Required*): Password for Abode account.
