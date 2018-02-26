---
layout: page
title: "MQTT Camera"
description: "Instructions how to use an MQTT image message as a Camera within Home Assistant."
date: 2017-04-14 00:45
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Camera
ha_release: 0.43
ha_iot_class: depends
---

The `mqtt` camera platform allows you to integrate the content of an image file sent through MQTT into Home Assistant as a camera. Every time a message under the `topic` in the configuration is received, the image displayed in Home Assistant will also be updated.

This can be used with an application or a service capable of sending images through MQTT, for example [Zanzito](https://play.google.com/store/apps/details?id=it.barbaro.zanzito).

To enable this camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: mqtt
    topic: zanzito/shared_locations/my-device
```

Configuration variables:

 - **topic** (*Required*): MQTT topic to subscribe to.
 - **name** (*Optional*): Name of the camera

