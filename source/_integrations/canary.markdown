---
title: Canary
description: Instructions on how to integrate your Canary devices into Home Assistant.
ha_category:
  - Alarm
  - Camera
  - Sensor
ha_release: '0.60'
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_domain: canary
ha_platforms:
  - alarm_control_panel
  - camera
  - sensor
ha_integration_type: integration
---

The **Canary** {% term integration %} allows you to integrate your [Canary](https://canary.is) devices in Home Assistant.

There is currently support for the following device types within Home Assistant:

- Alarm
- [Camera](#camera)
- [Sensor](#sensor)

{% include integrations/config_flow.md %}

Once loaded, your front end will have the following entities:

- A camera image triggered by motion for each camera.
- An alarm control panel for each location.
- A sensor per camera that reports temperature.
- A sensor per camera that reports humidity.
- A sensor per camera that reports air quality.

## Camera

The `canary` camera platform allows you to watch the live stream of your [Canary](https://canary.is) camera in Home Assistant. This requires the [`ffmpeg` integration](/integrations/ffmpeg/) to be already configured.

Once you have [Canary integration](/integrations/canary/) setup, your [Canary](https://canary.is) camera(s) should show up automatically.

## Sensor

The `canary` sensor platform allows you to integrate the sensors of your [Canary](https://canary.is) devices in Home Assistant.

To add `canary` sensors to your installation, follow instructions above.

Once loaded, you will see following sensors:

- A sensor per camera that reports temperature.
- A sensor per camera that reports humidity.
- A sensor per camera that reports air quality.
