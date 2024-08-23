---
title: Sky Remote
description: The Sky Remote integration allows you to control a Sky box with Home Assistant.
ha_category:
  - Remote
ha_release:
ha_domain: sky_remote
ha_config_flow: true
ha_codeowners:
  - "@dunnmj"
  - "@saty9"
ha_iot_class: Assumed State
ha_platforms:
  - remote
ha_integration_type: device
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `sky_remote` {% term integration %} lets you control a Sky box using Home Assistant.

## Supported models

This integration is intended to control all Sky satellite receiver boxes with a LAN port. It will not control Sky stream pucks.

## Configuration

{% include integrations/config_flow.md %}

## Remote

The Sky Remote platform will create a [Remote](/integrations/remote/) entity for the device. This entity allows you to send the following commands via the [remote.send_command](/integrations/remote/) action.

`power`

`sky`

`tvguide` `boxoffice` `services` `interactive`

`up` `down` `left` `right`

`select` `backup`

`channelup` `channeldown`

`i` `text` `help`

`red` `green` `yellow` `blue`

`0` `1` `2` `3` `4` `5` `6` `7` `8` `9`

`play` `pause` `stop` `record` `fastforward` `rewind`

`sidebar`
`dismiss`
`search`
`home`
