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
---

A speech-to-text (STT) entity allows other integrations or applications to stream speech data to the STT API and get text back.

{% include integrations/building_block_integration.md %}

## The state of a speech-to-text entity

Every speech-to-text entity keeps track of the timestamp of when the last time
the speech-to-text entity was used to process speech.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.
