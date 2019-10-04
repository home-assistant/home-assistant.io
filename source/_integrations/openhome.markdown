---
title: "Linn / Openhome"
description: "Instructions on how to integrate Linn Ds and Openhome renderers into Home Assistant."
logo: linn.png
ha_category:
  - Media Player
ha_release: 0.39
ha_iot_class: Local Polling
---


The `openhome` platform allows you to connect an [Openhome Compliant Renderer](http://openhome.org/) to Home Assistant such as a [Linn Products Ltd](https://www.linn.co.uk) HiFi streamer. It will allow you to control media playback, volume, source and see the current playing item. Openhome devices should be discovered by using the [the discovery component](/integrations/discovery/), their device names are taken from the name of the room configured on the device.

```yaml
# Example configuration.yaml entry
discovery:
media_player:
  - platform: openhome
```
