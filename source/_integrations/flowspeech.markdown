---
title: FlowSpeech
description: Instructions on how to set up the FlowSpeech integration with Home Assistant.
ha_category:
  - Text-to-speech
ha_iot_class: Cloud Polling
ha_domain: flowspeech
ha_platforms:
  - tts
ha_config_flow: true
ha_integration_type: service
ha_quality_scale: bronze
---

The **FlowSpeech** {% term integration %} provides a text-to-speech (TTS) service
for Home Assistant. It lets automations, scripts, and Assist pipelines speak
with FlowSpeech voices by using your FlowSpeech API key.

## Prerequisites

- A [FlowSpeech](https://flowspeech.io/) account is required.
- You need a FlowSpeech API key from your [API keys page](https://flowspeech.io/settings/apikeys).
- Your Home Assistant instance must have internet access to reach the FlowSpeech API.

{% include integrations/config_flow.md %}

## Text-to-speech (TTS)

The `tts.speak` service allows you to use FlowSpeech in automations and scripts.
Select the `tts.flowspeech` entity, choose a media player, and enter your
message.

Example service call:

```yaml
actions:
  - action: tts.speak
    target:
      entity_id: tts.flowspeech
    data:
      media_player_entity_id: media_player.living_room_speaker
      message: "The front door is open."
      options:
        voice: "Kore"
```

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
