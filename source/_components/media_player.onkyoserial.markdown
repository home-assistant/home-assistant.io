---
layout: page
title: "Onkyo Serial"
description: "Instructions how to integrate Onkyo receivers into Home Assistant via the RS232 protocol."
date: 2017-02-22 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: onkyo.png
ha_category: Media Player
ha_release: 0.38.3
ha_iot_class: "Local Polling"
---


The `onkyo` platform allows you to control a [Onkyo receiver](http://www.onkyo.com/) from Home Assistant.

To add an Onkyo receiver to your installation, add the following to your `configuration.yaml` file:

Documentation for the commands and queries come from the [Protocol Documentation](http://michael.elsdoerfer.name/onkyo/ISCP-V1.21_2011.xls). commands are used to map zones to the supported functions (power, volume, source, mute). queries are used to query the initial state of the receiver as well as on update of state.

```yaml
# Example configuration.yaml entry
media_player:
  - platform: onkyo_serial
    name: 'Onkyo TX-SR705'
    port: '/dev/ttyUSB0'
    zones:
        master:
            commands:
                power:  'PWR'
                volume: 'MVL'
                source: 'SLI'
                mute:   'AMT'
            queries:
                power:  'PWRQSTN'
                volume: 'MVLQSTN'
                source: 'SLIQSTN'
                mute:   'AMTQSTN'
        zone2:
            commands:
                power:  'ZPW'
                volume: 'ZVL'
                source: 'SLZ'
                mute:   'ZMT'
            queries:
                power:  'ZPWQSTN'
                volume: 'SVLQSTN'
                source: 'SLZQSTN'
                mute:   'ZMTQSTN'

```

Configuration variables:

- **port** device name of the USB port. This requires a USB RS232 adapter.
- **name** (*Optional*) ignored as the name is overriden to match the zone.
- **zones** A list of commands and queries for that zone. Must be one of the supported types (power, volume, source, mute)

