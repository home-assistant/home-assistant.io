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
ha_release: 0.74  
---

The `push` camera platform allows you to integrate images sent over HTTP POST to Home Assistant as a camera. External applications/daemons/scripts are therefore able to "stream" images through Home Assistant.

Optionally the Push Camera can **buffer** a given number of images, creating an animation of the detected motion after the event has been recorded.

Images are cleared on new events, and events are separated by a soft (configurable) **timeout**.

## Integration with motionEye

The `push` camera can as an example be used with [motionEye](https://github.com/ccrisan/motioneye/wiki) a web frontend for the motion daemon. motionEye is usually configured to save/record files ***only*** when motion is detected. It provides a hook to run a command whenever an image is saved, which can be used together with cURL to send the motion detected images to the `push` camera, as shown in this example:

In motionEye, under **File Storage -> Run A Command** type in:
```bash
curl -X POST -F "image=@%f" http://my.hass.server.com:8123/api/camera_push/camera.push_camera?token=12345678
```

Optionally configure motionEye to save only motion triggered images by going into **Still Images -> Capture Mode** and setting **Motion Triggered**. Tune your preferences under **Motion Detection**.

In this setup, you can configure the push camera to continuously replay the last motion triggered event using a configuration such as:

```yaml
camera:
  - platform: push
    name: MotionEye Outdoor
    buffer: 3
    timeout: 5
    token: 12345678
```

## {% linkable_title Configuration %}

To enable this camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: push
    name: My Push Camera
    token: 12345678
```

{% configuration %}
name:
  description:  The name you would like to give to the camera.
  required: false
  default: Push Camera
  type: string
buffer:
  description: Number of images to buffer per event. Be conservative, large buffers will starve your system memory.
  required: false
  default: 1
  type: string
timeout:
  description: Amount of time after which the event is considered to have finished.
  required: false
  default: 5 seconds
  type: time
token:
  description: User provided token acting as access control, should be a large string (more then 8 chars). Required if you can't use HA new auth system (0.77).
  required: false 
  type: string
field:
  description: HTTP POST field containing the image file
  required: false
  default: image
  type: string
{% endconfiguration %}
