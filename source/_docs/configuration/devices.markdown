---
layout: page
title: "Adding devices to Home Assistant"
description: "Steps to help you get your devices in Home Assistant."
date: 2015-09-19 09:40
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/devices/
---

Home Assistant will be able to automatically discover many devices and services available on your network if you have [the discovery component](/components/discovery/) enabled (the default setting).

See the [components overview page](/components/) to find installation instructions for your devices and services. If you can't find support for your favorite device or service, [consider adding support](/developers/add_new_platform/).

Classification for the available integrations:

- [IoT class(/blog/2016/02/12/classifying-the-internet-of-things): Classifier for the device's behavior.
- [Quality scale](/docs/quality_scale/): Representation of the integration's quality.

Usually every entity needs its own entry in the `configuration.yaml` file. There are two styles for multiple entries:

## {% linkable_title Style 1: Collect every entity under the "parent" %}

```yaml
sensor:
  - platform: mqtt
    state_topic: "home/bedroom/temperature"
    name: "MQTT Sensor 1"
  - platform: mqtt
    state_topic: "home/kitchen/temperature"
    name: "MQTT Sensor 2"
  - platform: rest
    resource: http://IP_ADDRESS/ENDPOINT

switch:
  - platform: vera
```

## {% linkable_title Style 2: List each device separately %}

You need to append numbers or strings to differentiate the entries, as in the example below. The appended number or string must be unique.

```yaml
media_player livingroom:
  platform: mpd
  server: IP_ADDRESS

media_player kitchen:
  platform: plex

camera 1:
  platform: generic

camera 2:
  platform: mjpeg
```

## {% linkable_title Grouping devices %}

Once you have several devices set up, it is time to organize them into groups.
Each group consists of a name and a list of entity IDs. Entity IDs can be retrieved from the web interface by using the Set State page in the Developer Tools (<img src='/images/screenshots/developer-tool-states-icon.png' alt='service developer tool icon' class="no-shadow" height="38" />).

```yaml
# Example configuration.yaml entry showing two styles
group:
  living_room:
    entities: light.table_lamp, switch.ac
  bedroom:
    entities:
      - light.bedroom
      - media_player.nexus_player
```

For more details please check the [Group](/components/group/) page.

