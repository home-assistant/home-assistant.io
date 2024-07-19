---
title: Philips Dynalite
description: Instructions on setting up Philips Dynalite within Home Assistant.
ha_category:
  - Cover
  - Hub
  - Light
  - Switch
ha_iot_class: Local Push
ha_release: 0.106
ha_codeowners:
  - '@ziv1234'
ha_config_flow: true
ha_domain: dynalite
ha_platforms:
  - cover
  - light
  - switch
ha_integration_type: integration
---

Philips Dynalite support is integrated into Home Assistant as a hub that can drive the light, switch, and cover platforms. 

There is currently support for the following device types within Home Assistant:

- Lights
- Switches
- Covers

A Philips Dynalite hub connects to the Dynet network, which is composed of areas, channels, and preset. 

A Dynalite area typically (although not necessarily) defines some physical area, such as a room. 

Each area can have one or more channels that correspond to the different devices they control. A channel can relate to a dimmable light, or other devices.

Additionally, each area can have one or more presets that determine the behavior of all the channels, and sometimes trigger additional actions. Typically, preset '1' in an area means 'on', and preset '4' means 'off'. Additional presets could be used for scenes and dimming.

{% include integrations/config_flow.md %}

## Setup

Since Philips Dynalite has virtually no auto-discover capabilities, once it is added via the UI, it needs to be configured via Dynalite panel. Note that the panel is only available to "admin" level users.

There are global setup parameters and advanced parameters that should normally be left as is. The most important part is defining the areas. Each area normally corresponds to a room or function. They have to be added manually via the UI and match the setup of the existing dynalite installation.

## Initial configuration and discovery

Maybe the most difficult thing about a Dynalite system is finding out the areas and channel mapping. If you have them or have access to the Dynalite software and your configuration files, this could be easy,
but in the likely case that your system was installed by an integrator, you will have to discover them on your own.

This is where the `autodiscover` option comes handy. If it is on, the component will track the Dynet network and every time a device is used, it will be added to Home Assistant. It will initially show as "Area 123 Channel 7", but you can then add it to your {% term "`configuration.yaml`" %} with the correct configuration.

For example, you would go to your kitchen light and turn it on. Now you log into Home Assistant and see what the channel was. If there was more than one discovered (e.g., someone turned off the living room lights), you can try one, turn it on and off in Home Assistant and see which light it affects.

The initial process can be a bit time consuming and tedious, but it only has to be done once. Once you are done configuring, it is better to set `autodiscover` to `false`, since there are many "fake" channels and areas that the system uses for internal communication and you do not want to have visible.

## Actions

### Action `dynalite.request_area_preset`

Send a command on the Dynalite network asking an area to report its currently selected preset. Normally, channel 1 (default) is used, but in some implementation, specific areas will need other channels.

{% note %}

This does not return the area preset. It sends a network command asking the area to report its preset. Once it reports, that will be caught and handled by the system.

{% endnote %}

| Data attribute | Optional | Description                                                                               |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------- |
| `host`                 | yes      | Which gateway to send the command to. If not specified, sends to all configured gateways. |
| `area`                 | no       | Area for the requested channel.                                                           |
| `channel`              | no       | Which channel to request.                                                                 |

### Action `dynalite.request_channel_level`

Send a command on the Dynalite network asking a specific channel in an area to report its current level.

{% note %}

This does not return the channel level. It sends a network command asking the channel to report its level. Once it reports, that will be caught and handled by the system.

{% endnote %}

| Data attribute | Optional | Description                                                                               |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------- |
| `host`                 | yes      | Which gateway to send the command to. If not specified, sends to all configured gateways. |
| `area`                 | no       | Which area to request the preset for.                                                     |
| `channel`              | yes      | Which channel to use. If not specified, uses the area configuration or system default.    |

## Events

### Event `dynalite_preset`

Event `dynalite_preset` is fired every time a preset is selected in a given Dynalite area.

| Field    | Description                           |
| -------- | ------------------------------------- |
| `host`   | Host IP of the Dynalite gateway       |
| `area`   | Area number where preset was selected |
| `preset` | The specific preset that was selected |

### Event `dynalite_packet`

Event `dynalite_packet` is fired whenever there is a packet on the Dynalite network.

| Field    | Description                                                             |
| -------- | ----------------------------------------------------------------------- |
| `host`   | Host IP of the Dynalite gateway                                         |
| `packet` | List of integers representing the 8-byte packet, including the checksum |
