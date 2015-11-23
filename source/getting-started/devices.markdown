---
layout: page
title: "Adding devices to Home Assistant"
description: "Steps to help you get your devices in Home Assistant."
date: 2015-09-19 09:40
sidebar: false
comments: false
sharing: true
footer: true
---

Home Assistant will be able to automatically discover and configure any Google Chromecasts, Netgear routers, Belkin WeMo switches, Philips Hue bridges and Sonos speakers in your network if you have [the discovery component]({{site_root}}/components/discovery/) enabled (which is by default).

See the [components overview page](/components/) to find installation instructions for your devices and services. If you can't find support for your favorite device or service, [consider adding support](/developers/add_new_platform/).

Usually every entity needs its own entry in the `configuration.yaml` file. There are two kind of styles for multiple entries:

#### {% linkable_title Style 1 %}

Collect every entity under the "parent". 

```yaml
sensor:
  - platform: mqtt
    state_topic: "home/bedroom/temperature"
    name: "MQTT Sensor 1"
  - platform: mqtt
    state_topic: "home/bedroom/temperature"
    name: "MQTT Sensor 2"
  - platform: rest
    resource: http://IP_ADDRESS/ENDPOINT

switch:
  - platform: vera
```

#### {% linkable_title Style 2 %}

If you prefer to place your entries somewhere in the `configuration.yaml` file then you just choose this style. There should not be gaps in the sequence when you use numbers or your entities might not load correctly. Instead of numbers you are free to use strings (like `media_player livingroom:` or `media_player kitchen:`) to differentiate the entries as long as the appended strings are unique.

```yaml
media_player 1:
  platform: mpd
  server: IP_ADDRESS

media_player 2:
  platform: plex

camera:
  platform: generic

media_player 3:
  platform: sonos
```

### {% linkable_title Grouping devices %}

Once you get a bunch of devices set up, it is time to organize them. This can be done using groups. Each group exists of a name and a list of entity IDs. Entity IDs can be retrieved from the web interface by using the Set State page in the Developer Tools (icon in the middle).

```yaml
# Example configuration.yaml entry
group:
  living_room: light.table_lamp, switch.ac
  bedroom:
    - light.bedroom
    - media_player.nexus_player
```

### {% linkable_title Customizing devices and services %}

By default, all of your devices will be visible and have a default icon determined by their domain. You may find it desireable to customize the look and feel of your front page by altering some of these parameters. This can be done by adding the following config to the `homeassistant:` section.

Entity_pictures, badges, device_tracker pictures, etc can either be a URL or `/local/file.jpg`, which points to directory `www` in the HASS configuration directory.

```yaml
# Example configuration.yaml entry
homeassistant:

  # Add this to your existing configuration
  # Only the `entity_id` is required.  All other options are optional.
  customize:
    some.entity_id:
      hidden: true
      entity_picture: http://placehold.it/200x200
      friendly_name: My better name
```

### [Next step: Setting up presence detection &raquo;](/getting-started/presence-detection/)
