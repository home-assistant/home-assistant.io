---
title: "Philips Dynalite"
description: "Instructions on setting up Philips Dynalite within Home Assistant."
logo: dynalite.png
ha_category:
  - Hub
  - Light
ha_iot_class: Local Push
ha_qa_scale: No Score
featured: true
ha_release: "0.60"
---

Philips Dynalite support is integrated into Home Assistant as a hub that can drive the light platforms. 

There is currently support for the following device types within Home Assistant:

- Lights

A Philips Dynalite hub connects to the Dynet network, which is composed of areas, channels, and preset. 

A Dynalite area typically (although not necessarily) defines some physical area, such as a room. 

Each area can have one or more channels that correspond to the different devices they control. A channel can relate to a dimmable light, or other devices, such as a cover.

Additionally each area can have one or more presets that determine the behavior of all the channels, and sometimes trigger additional actions. Typically, preset 1 in an area means 'on', and preset '4' means off. Additional presets could be used for scenes and dimming.

Since Philips Dynalite has virtually no autodiscover capabilities, it needs to be configured via the `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
hue:
  bridges:
    - host: DEVICE_IP_ADDRESS
```

{% configuration %}
host:
  description: The IP address of the bridge (e.g., 192.168.1.10).
  required: true
  type: string
port:
  description: Port number of the bridge
  required: false
  type: integer
  default: 12345
name:
  description: Name for the bridge
  required: false
  type: string
  default: dynalite
log_level:
  description: Log level for the libraries
  required: false
  type: string
  default: info
autodiscover:
  description: Enable autodiscover. As Dynalite does not support autodiscovery, this tracks event on your network, so if you turn on a light, it will be added to Home Assistant
  required: false
  type: boolean
  default: true
polltimer:
  description: Polling interval for devices in transition. Value in seconds. When devices are in transition (e.g. a light fading), it will ask for a new state every X seconds until it is at the target level.
  required: false
  type: float
  default: 1.0
area:
  description: Definition for the various Dynalite areas
  required: true
  type: map
  keys:
    'AREA_NUMBER':
      description: The Dynalite area number, 1-255
      required: true
      type: map
      keys:
        name:
          description: Name of the area
          required: true
          type: string
        fade:
          description: Fade time for the area, in seconds
          required: false
          type: float
          default: 2.0
        channel:
          description: Map of the channels in this area
          required: false
          type: map
          keys:
            'CHANNEL_NUMBER':
              description: The Dynalite channel number in the area, 1-255
              required: true
              type: map
              keys:
                name:
                  description: Name of the channel
                  required: false
                  type: string
                  default: \"AREA_NAME Channel CHANNEL_NUMBER\"
                fade:
                  description: Fade time for the channel, in seconds
                  required: false
                  type: float
                  default: 2.0
{% endconfiguration %}

## Examples

```yaml
# Example configuration.yaml entry specifying optional parameters
hue:
  bridges:
    - host: DEVICE_IP_ADDRESS
      port: 12345
      autodiscover: true
      polltimer: 1
      areacreate: auto
      log_level: debug
      area:
        '2':
          name: Living Room
          channel:
            '2': 
              name: Entrance Spot
              fade: 10.0
            '3': 
              name: Dining Table
```

### Initial configuration and discovery

Maybe the most difficult thing about a Dynalite system is finding out the areas and channel mapping. If you have them or have access to the Dynalite software and your configuration files, this could be easy,
but in the likely case that your system was installed by an integrator, you will have to discover them on your own.

This is where the `autodiscover` option comes handy. If it is on, the component will track the Dynet network and every time a device is used, it will be added to home assistant. It will initially show as "Area 123 Channel 7", but you can then add it to your `configuration.yaml` with the correct configuration.

For example, you would go to your kitchen light and turn it on. Now you log into Home Assistant and see what the channel was. If there was more than one discovered (e.g. someone turned off the living room lights), you can try one, turn it on and off in Home Assistant and see which light it affects.

The initial process can be a bit time consuming and tidious, but it only has to be done once. Once you are done configuring, it is better to set `autodiscover` to `false`, since there are many "fake" channels and areas that the system use for internal communication and you do not want to have visible.
