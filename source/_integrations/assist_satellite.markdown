---
title: Assist Satellite
description: Remote satellites that use Assist.
ha_category:
  - Voice
ha_release: '2024.10'
ha_codeowners:
  - '@home-assistant/core'
  - '@synesthesiam'
ha_domain: assist_satellite
ha_integration_type: entity
ha_quality_scale: internal
---

This is an {% term integration %} for remote satellites that use [Assist](/voice_control/) to control and interact with Home Assistant. This allows other integrations to represent these satellites in a consistent manner.

{% include integrations/building_block_integration.md %}

## Actions

An Assist satellite entity exposes additional actions to remotely control the satellite in automations or scripts. These actions can be created via the UI, but are
also available in YAML (examples below).

### Action `assist_satellite.announce`

The {% my developer_call_service service="assist_satellite.announce" %} action announces a message or media id on the satellite. If a message is to be announced, it will first be converted to a media id using the [text-to-speech](/integrations/tts) system of the satellite's configured [pipeline](/voice_control/voice_remote_local_assistant/).


{% my developer_call_service badge service="assist_satellite.announce" %}

Examples in YAML:

```yaml
action: assist_satellite.announce
target:
  entity_id: assist_satellite.my_entity
  message: "Dinner is ready!"
```

```yaml
action: assist_satellite.announce
target:
  entity_id: assist_satellite.my_entity
  media_id: ITEM_ID
```
