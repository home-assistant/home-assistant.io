---
layout: page
title: "Push"
description: "Instructions how to use Push Camera within Home Assistant."
date: 2018-06-26 23:50
sidebar: true
comments: false
sharing: true
footer: true
logo: camcorder.png
ha_category: Camera
ha_iot_class: "Local Push"
ha_release: 0.73
---

The `push` camera platform allows you to integrate images sent over HTTP POST to Home Assistant as a camera. External applications/daemons/scripts are therefore able to "stream" images through Home Assistant.

Optionally the Push Camera can **cache** a given number of images, creating an animation of the detected motion after the event has been recorded.

Images are cleared on new events, and events are separated by a soft (configurable) **timeout**.

## Integration with motionEye

The `push` camera can as an example be used with [motionEye](https://github.com/ccrisan/motioneye/wiki) a web frontend for the motion daemon. motionEye is usually configured to save/record files ***only*** when motion is detected. It provides a hook to run a command whenever an image is saved, which can be used together with cURL to send the motion detected images to the `push` camera, as shown in this example:

In motionEye, under **File Storage -> Run A Command** type in:
```bash
curl -X POST -F "image=@%f" http://my.hass.server.com:8123/api/camera_push/camera.push_camera
```

Please take note that you might need to add `-H "x-ha-access: YOUR_PASSWORD"` if you have API authentication enabled.

Optionally configure motionEye to save only motion triggered images by going into **Still Images -> Capture Mode** and setting **Motion Triggered**. Tune your preferences under **Motion Detection**.

In this setup, you can configure the push camera to continuously replay the last motion triggered event using a configuration such as:

```yaml
camera:
  - platform: push
    name: MotionEye Outdoor
    cache: 3
    timeout: 5
```

## {% linkable_title Configuration %}

To enable this camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: push
    name: My Push Camera
```

{% configuration %}
name:
  description:  The name you would like to give to the camera.
  required: false
  default: Push Camera
  type: string
cache:
  description: Number of images to cache per event. Be conservative, large caches will starve your system memory.
  required: false
  default: 1
  type: string
timeout:
  description: Amount of time after which the event is considered to have finished.
  required: false
  default: 5 seconds
  type: time
field:
  description: HTTP POST field containing the image file
  required: false
  default: image
  type: string
force_update:
  description: Sends update events even if the value hasn't changed. Useful if you want to have event triggers for every single image pushed.
  required: false
  type: boolean
  default: False
{% endconfiguration %}
