---
layout: page
title: "MQTT Camera"
description: "Instructions on how to use an MQTT image message as a Camera within Home Assistant."
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

## {% linkable_title Configuration %}

To enable this camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: mqtt
    topic: zanzito/shared_locations/my-device
```

{% configuration %}
topic:
  description: The MQTT topic to subscribe to.
  required: true
  type: string
name:
  description: The name of the camera.
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this camera. If two cameras have the same unique ID Home Assistant will raise an exception.
  required: false
  type: string
{% endconfiguration %}
