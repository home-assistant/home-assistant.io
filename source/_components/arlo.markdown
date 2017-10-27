---
layout: page
title: "Arlo"
description: "Instructions on how to integrate your Netgear Arlo cameras within Home Assistant."
date: 2017-05-30 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: arlo.png
ha_category: Hub
ha_release: 0.46
ha_iot_class: "Cloud Polling"
---

The `arlo` implementation allows you to integrate your [Arlo](https://arlo.netgear.com/) devices in Home Assistant.

To enable device linked in your [Arlo](https://arlo.netgear.com/) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
arlo:
  username: you@example.com
  password: secret
```

Configuration variables:

- **username** (*Required*): The username for accessing your Arlo account.
- **password** (*Required*): The password for accessing your Arlo account.

It is recommended to create a dedicated user on Arlo website to be used within Home Assistant and then share your Arlo cameras.

Finish its configuration by visiting the [Arlo sensor page](/components/sensor.arlo/) or [Arlo camera page](/components/camera.arlo/) or [Arlo control panel page](/components/alarm_control_panel.arlo/).

The Arlo component also provides a service to enable/disable the motion detection sensor. The example below enables the motion detection every time the Home Assistant service starts.

```yaml
#automation.yaml
- alias: Enable Arlo upton HA start'
  initial_state: 'on'
  trigger:
    platform: homeassistant
    event: start
  action:
    service: camera.enable_motion_detection
    entity_id: camera.arlo_frontdoor
```
