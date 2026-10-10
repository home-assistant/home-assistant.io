---
title: Speech-to-text (STT)
description: Instructions on how to set up speech-to-text (STT) with Home Assistant.
ha_release: '0.102'
ha_codeowners:
  - '@home-assistant/core'
ha_domain: stt
ha_quality_scale: internal
ha_category: []
ha_integration_type: entity
related:
  - url: https://support.nabucasa.com/hc/articles/29718084245149
    title: Nabu Casa Cloud speech-to-text service
  - docs: /voice_control/voice_remote_cloud_assistant/
    title: Setting up a Nabu Casa Cloud voice assistant
  - docs: /voice_control/voice_remote_local_assistant/
    title: Setting up a local voice assistant
  - docs: /voice_control/builtin_sentences/
    title: Supported sentences to use with Assist
  - docs: /integrations/?cat=speech-to-text
    title: Integrations that use the speech-to-text integration
---

A speech-to-text (STT) entity allows other integrations or applications to stream speech data to the STT API and get text back.

{% include integrations/building_block_integration.md %}

## Speech-to-text states

The {% term state %} of a speech-to-text entity is a timestamp showing the date and time when the entity was last used to process speech. Home Assistant stores the timestamp in UTC, for example, `2026-01-01T12:00:00.123456+00:00`. The Home Assistant interface shows it in your local date and time format.

In addition, the entity can have the following states. Each item shows the interface label, followed by the stored state:

- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.
