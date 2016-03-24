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

Home Assistant will be able to automatically discover and configure any Google Chromecasts, Netgear routers, Belkin WeMo switches, Philips Hue bridges and Sonos speakers on your network if you have [the discovery component]({{site_root}}/components/discovery/) enabled (which is by default).

See the [components overview page](/components/) to find installation instructions for your devices and services. If you can't find support for your favorite device or service, [consider adding support](/developers/add_new_platform/).

Usually every entity needs its own entry in the `configuration.yaml` file. There are two styles for multiple entries:

#### {% linkable_title Style 1: Collect every entity under the "parent" %}
 

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

#### {% linkable_title Style 2: List each device separately %}

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

<p class='note note'>
If your devices are not showing up in the frontend then check the entries in your <code>configuration.yaml</code> file for duplicates. 
</p>

### {% linkable_title Grouping devices %}

Once you have a bunch of devices set up, it is time to organize them into groups.  
Each group exists of a name and a list of entity IDs. Entity IDs can be retrieved from the web interface by using the Set State page in the Developer Tools (second icon).

```yaml
# Example configuration.yaml entry showing two styles
group:
  living_room: light.table_lamp, switch.ac
  bedroom:
    - light.bedroom
    - media_player.nexus_player
```

For more details please check the [Group](https://home-assistant.io/components/group/) page.

### {% linkable_title Customizing devices and services %}

By default, all of your devices will be visible and have a default icon determined by their domain. You can customize the look and feel of your front page by altering some of these parameters. This can be done by adding the following configuration inside the `homeassistant:` section.

`entity_picture`entries, badges, `device_tracker` pictures, etc. can either be external URLs (e.g. `http://example.com/example.jpg`) or of the form `/local/filename.jpg`, where `/local` represents the directory `www` in the HASS configuration directory. You may have to create the `www` directory yourself as it is not made automatically.

You can also use `icon` and refer to any icon from [MaterialDesignIcons.com](http://MaterialDesignIcons.com).

```yaml
# Example configuration.yaml entry
homeassistant:

  # Add this to your existing configuration
  # Only the `entity_id` is required.  All other options are optional.
  customize:
    thermostat.family_roomfamily_room:
      hidden: true
      entity_picture: https://dl.dropboxusercontent.com/u/12345/images/nest.jpg
      friendly_name: Nest
    switch.wemo_switch_1:
      friendly_name: Kitchen kettle
      icon: mdi:kettle
```

### [Next step: Setting up presence detection &raquo;](/getting-started/presence-detection/)
