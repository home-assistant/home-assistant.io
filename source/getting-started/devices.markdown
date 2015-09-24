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

Home Assistant will be able to automatically discover and configure any Google Chromecasts, Netgear
routers, Belkin WeMo switches, Philips Hue bridges and Sonos speakers in your network if you have
[the discovery component]({{site_root}}/components/discovery.html) enabled (which is by default).

See the [components overview page](/components/) to find installation instructions for your devices
and services.  Many components use the `sensor` platform.  Sensors need to be added into the `configuration.yaml` as `sensor:`, `sensor 2:`, `sensor 3:`, etc.  There should not be gaps in the sequence or your sensors might not load correctly.

To get the most out of automation, it is useful to setup the following things:

 * [Presence Detection](/components/#presence)
 * [Notification service](/components/#notify-service)

If you can't find support for your favorite device or service,
[consider adding support](/developers/add_new_platform.html)

### {% linkable_title Grouping devices %}

Once you get a bunch of devices set up, it is time to organize them. This can be done using groups.
Each group exists of a name and a list of entity IDs. Entity IDs can be retrieved from the web interface
by using the Set State page in the Developer Tools (icon in the middle).


```yaml
# Example configuration.yaml entry
group:
  living_room: light.table_lamp, switch.ac
  bedroom:
    - light.bedroom
    - media_player.nexus_player
```

### {% linkable_title Customizing devices and services %}

By default, all of your devices will be visible and have a default icon determined by their domain.
You may find it desireable to customize the look and feel of your front page by altering some
of these parameters. This can be done by adding the following config to the `homeassistant:` section.

```yaml
# Example configuration.yaml entry
homeassistant:

    # Add this to your existing configuration
    customize:
        some.entity_id:
            hidden: true
            entity_picture: http://placehold.it/200x200
            friendly_name: My better name
```


###[Next step: Setting up automation &raquo;](/getting-started/automation.html)
