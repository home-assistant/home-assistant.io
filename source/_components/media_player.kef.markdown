---
layout: page
title: "KEF Wireless speakers"
description: "How to set up the KEF media player platform"
date: 2018-11-28
sidebar: true
comments: false
sharing: true
footer: true
logo: kef.png
ha_category: Media Player
ha_release: 0.85
---

The `Kef` platform allows you to control a KEF LS50 Wireless speaker from Home Assistant.

The KEF LSX speaker might also work with this integration. Though it is untested for now.

To setup your KEF speaker, update your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: kef
    host: <ip-address-to-kef-speaker>
```

{% configuration %}
name:
  description: The name of the device.
  required: false
  default: KEFWirelessSpeaker
  type: string
port:
  description: The Port number of Kef speaker.
  required: false
  default: 50001
  type: integer
host:
  description: The IP address or hostname of the device.
  required: true
  default: None
  type: string
turn_on_service:
  description: The service to call to turn in the speaker. Turning on is disabled if this or  turn_on_data is not supplied.
  required: false
  default: None
  type: string
turn_on_data:
  description: The data to use in the service call to turn in the speaker. Turning on is disabled if this or turn_on_service is not supplied.
  required: false
  default: None
  type: string
{% endconfiguration %}

Because the KEF LS50 Wireless speaker disconnects the wifi automatically when turned off/standby, another service can be configured to turn on the speaker. This service should turn on the speaker using IR.

```yaml
# Example configuration.yaml entry with turn on service
media_player:
  - platform: kef
    host: <ip-address-to-kef-speaker>
    name: My KEF Speaker
    turn_on_service: switch.turn_on
    turn_on_data: '{"entity_id": "switch.some_switch"}'
```
