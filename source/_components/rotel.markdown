---
layout: page
title: "Rotel Media Player"
description: "Rotel Media Player platform implementation.   Currently only supports the Rotel RSP-1570 Processor."
date: 2019-04-27 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: rotel.svg
ha_release: 0.93.0
ha_category: Media Player
ha_iot_class: Local Push
---

A Media Player platform that can control a Rotel Amplifier or Processor.

At the moment the platform only supports the Rotel RSP-1570 processor but the underlying third party library could be adapted to support other devices of the same vintage.

## Supported Devices

* [Rotel RSP-1570 Processor](http://www.rotel.com/en-gb/product/rsp-1570)

## {% linkable_title Configuration %}

Example configuration.yaml entry

```yaml
media_player:
- platform: rotel
  device: /dev/ttyUSB0
  source_aliases:
    TUNER:
    TAPE:
    MULTI:
    VIDEO 1: CATV
    VIDEO 2: NMT
    VIDEO 3: APPLE TV
    VIDEO 4: FIRE TV
    VIDEO 5: BLU RAY
```

{% configuration %}
device:
  description: Connection string for the device. See below for details.
  required: true
  type: string
name:
  description: Name of the device.
  required: false
  default: Rotel RSP-1570
  type: string
source_aliases:
  description: Mapping of default sources to aliases. The default sources are `' CD'`, `TAPE`, `TUNER`, `MULTI`, `VIDEO 1`, `VIDEO 2`, `VIDEO 3`, `VIDEO 4`, `VIDEO 5`. Each key must exactly match a default source name. The values must exactly match the labels configured in the device.  An empty alias indicates that the source is not used. A missing alias means that the default source should appear as-is in the source list.
  required: false
  default: {}
  type: dict
{% endconfiguration %}

### {% linkable_title Device Connection String %}

The device connection string formats accepted are defined [here](https://pythonhosted.org/pyserial/url_handlers.html).

Some examples might be:

* `/dev/ttyUSB0` (Linux)
* `COM3` (Windows)
* `socket://192.168.0.100:50000` (if you are using a TCP/IP to serial  converter)

## {% linkable_title Services %}

The media player component offers the followiing services:

Service Name | Parameters | Description
-------------|------------|------------
`rotel_send_command`|`entity_id`, `command_name`|Send a command to the media player.   See `commands.py` ([here](https://github.com/pp81381/rsp1570serial/blob/master/rsp1570serial/commands.py)) in the [rsp1570serial](https://github.com/pp81381/rsp1570serial) GitHub project for a full list of available commands.
`rotel_reconnect`|`entity_id`|Reconnect to the media player

The `entity_id` parameter can be a single entity id, a comma separated list or the word `all`.

Examples of parameters for `rotel_send_command`
```
{"entity_id": "media_player.rotel_rsp_1570_emulator", "command_name": "ZONE_2_SOURCE_VIDEO_1"}

{"entity_id": ["media_player.rotel_rsp_1570_emulator","media_player.rotel_rsp_1570"], "command_name": "VOLUME_UP"}

{"entity_id": "all", "command_name": "MUTE_TOGGLE"}
```

Examples of parameters for `rotel_reconnect`:
```
{"entity_id": "media_player.rotel_rsp_1570"}
```
