---
title: Wake-word detection
description: Detect a wake word in streaming audio.
ha_category:
  - Voice
ha_release: '2023.9'
ha_codeowners:
  - '@home-assistant/core'
  - '@synesthesiam'
ha_domain: wake_word
ha_integration_type: entity
ha_quality_scale: internal
---

A wake-word-detection {% term entity %} allows other {% term integrations %} or applications to detect wake words in streaming audio.

The wake-word-detection entities cannot be implemented manually, but can be provided by integrations such as [Wyoming](/integrations/wyoming). The API in [Assist Pipelines](https://developers.home-assistant.io/docs/voice/pipelines/) enables wake-word-detection as part of [Assist](/voice_control/).

{% include integrations/building_block_integration.md %}

## The state of a wake word detection entity

The state of a wake word detection {% term entity %} is a timestamp showing the date and time when the wake word was last detected.

<p class='img'>
<img src='/images/integrations/wake_word/state_wake-word.png' alt='Screenshot showing the state of a wake word detection entity in the developer tools' />
Screenshot showing the state of a wake word detection entity in the developer tools.
</p>

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.
