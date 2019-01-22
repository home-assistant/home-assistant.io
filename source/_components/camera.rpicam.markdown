---
layout: page
title: "MQTT Raspberry PI camera"
description: "Instructions on how to integrate Raspberry Pi cameras within Home Assistant."
date: 2019-01-15 8:15
sidebar: true
comments: true
sharing: true
footer: true
ha_category: Camera
logo: home-assistant.png
ha_release: 0.85
ha_iot_class: "depends"
---

The `rpicam` camera platform allows controlling a raspberry pi camera through MQTT commands.
This is a third-party integration for homeassistant that provides further control from HA for a raspberry PI camera based on RPi-Cam-Web-Interface (`https://elinux.org/RPi-Cam-Web-Interface`).

## {% linkable_title Configuration %}

It can be configured like a `generic` IP camera and supports the same configuration parameters:

    https://www.home-assistant.io/components/camera.generic/

Set `rpicam` (instead of `generic`) as platform and follow the link above for further configuration details.

Configuration example:

```yaml
      - platform: rpicam
        name: backyard
        still_image_url: http://192.168.1.12/cam.jpg
        username: <USER>
        password: !secret <USER_PASS>
```


## {% linkable_title What provides %}

This platform uses MQTT for interaction with the remote raspberry PI where an agent is configured and running (`https://gitlab.com/gbus/rpi-cam-mqtt`).
You can:

    - enable/disable the camera
    - take pictures/videos
    - enable/disable motion detection
    - change exposure mode
    - pan/tilt the camera

## {% linkable_title What it dosn't provide %}

ha-rpicam doesn't send or receive streaming data through MQTT. This is a specific solution to only control the behaviour of the camera as an automation component under HA. Commands to capture images/videos are equivalent to pushing the camera web interface buttons. The captured media content would still be accessible as normal from the download area of the web interface itself.


## {% linkable_title Automation examples %}

````yaml
    automation:
    
      # Example 1
      alias: Set night exposure after sunset
      trigger:
        platform: sun
        event: sunset
      action:
        service: camera.rpi_exposure_mode
        data:
          entity_id: "camera.backyard"
          mode: "night"
          
      # Example 2
      alias: Disable indoor camera when family is back home
      trigger:
        platform: state
        entity_id: group.family
        from: not_home
        to: home
      action:
        service: camera.turn_off
        data:
          entity_id: "camera.living"
          
      alias: ... and enable it again when family has left home
      trigger:
        platform: state
        entity_id: group.family
        from: home
        to: not_home
      action:
        service: camera.turn_on
        data:
          entity_id: "camera.living"
          
      # Example 3
      alias: Reposition the camera when motion reported by PIR
      trigger:
      - entity_id: binary_sensor.gatepir
        platform: state
        to: 'on'
      action:
        service: camera.rpi_pantilt_view
        data:
          entity_id: "camera.backyard"
          view: "gate"
````
