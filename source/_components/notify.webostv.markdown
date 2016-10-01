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
```

Configuration variables:

- **host** (*Required*): The IP of the LG WebOS Smart TV, e.g. 192.168.0.10
- **name** (*Required*): The name you would like to give to the LG WebOS Smart TV.

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
