---
title: Monoprice 6-Zone Amplifier
description: Instructions on how to integrate Monoprice 6-Zone Home Audio Controller into Home Assistant.
logo: monoprice.svg
ha_category:
  - Media Player
ha_release: 0.56
ha_iot_class: Local Polling
ha_codeowners:
  - '@etsinko'
---

The `monoprice` platform allows you to control [Monoprice 6-Zone Amplifier](https://www.monoprice.com/product?p_id=10761) using a serial connection.

To add a Monoprice device to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: monoprice
    port: /dev/ttyUSB0
    zones:
      11:
        name: Main Bedroom
      12:
        name: Living Room
      13:
        name: Kitchen
      14:
        name: Bathroom
      15:
        name: Dining Room
      16:
        name: Guest Bedroom
    sources:
      1:
        name: Sonos
      5:
        name: Chromecast
```

{% configuration %}
port:
  description: The serial port to which Monoprice amplifier is connected.
  required: true
  type: string
zones:
  description: This is the list of zones available. Valid zones are 11, 12, 13, 14, 15 or 16. In case multiple Monoprice devices are stacked together the list of valid zones is extended by 21, 22, 23, 24, 25 or 26 for the second device and 31, 32, 33, 34, 35 or 36 for the third device. Each zone must have a name assigned to it.
  required: true
  type: integer
sources:
  description: The list of sources available. Valid source numbers are 1, 2, 3, 4, 5 or 6. Each source number corresponds to the input number on the Monoprice amplifier. Similar to zones, each source must have a name assigned to it.
  required: true
  type: integer
{% endconfiguration %}

### Service `monoprice.snapshot`

Take a snapshot of one or more zones' states. This service, and the following one are useful if you want to play a doorbell or notification sound and resume playback afterward. If no `entity_id` is provided, all zones are snapshotted.

The following attributes are stored in a snapshot:
- Power status (On/Off)
- Mute status (On/Off)
- Volume level
- Source

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`s of zones.

### Service `monoprice.restore`

Restore a previously taken snapshot of one or more speakers. If no `entity_id` is provided, all zones are restored.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`s of zones.
