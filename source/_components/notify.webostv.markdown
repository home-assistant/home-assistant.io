---
layout: page
title: "LG WebOS TV notifications"
description: "Instructions how to integrate a LG WebOS TV within Home Assistant."
date: 2016-04-18 23:24
sidebar: true
comments: false
sharing: true
footer: true
logo: webos.png
ha_category: Notifications
ha_iot_class: "Local Polling"
ha_release: 0.18
---

The `webostv` platform allows you to send notifications to a LG WebOS Smart TV.

When the TV is first connected, you will need to accept Home Assistant on the TV to allow communication.

To add a TV to your installation, add the following to your `configuration.yaml` file and follow the configurator instructions:

```yaml
# Example configuration.yaml entry
notify:
  - platform: webostv
    host: 192.168.0.112
    name: livingroom_tv
    filename: webostv.conf
```

Configuration variables:

- **host** (*Required*): The IP of the LG WebOS Smart TV, e.g. 192.168.0.10
- **name** (*Required*): The name you would like to give to the LG WebOS Smart TV.
- **filename** (*Optional*): The filename where the pairing key with the TV should be stored. This path is relative to Home Assistant's config directory. It defaults to `webostv.conf`.
- **icon** (*Optional*): The path to an image file to use as the icon in notifications. If provided, this image will override the Home Assistant logo.

A possible automation could be:

```yaml
# Example configuration.yaml entry
automation:
  - alias: Open a window
    trigger:
      platform: numeric_state
      entity_id: sensor.netatmo_livingroom_co2
      above: 999
    action:
      service: notify.livingroom_tv
      data:
        message: "You should open a window! (Livingroom Co2: {{ states.sensor.netatmo_livingroom_co2.state }}ppm)"
```

The icon can be overridden for individual notifications by providing a path to an alternative icon image to use:

```yaml
automation:
  - alias: Front door motion
    trigger:
      platform: state
      entity_id: binary_sensor.front_door_motion
      to: 'on'
    action:
      service: notify.livingroom_tv
      data:
        message: "Movement detected: Front Door"
        data:
          icon: "/home/homeassistant/images/doorbell.png"
```
