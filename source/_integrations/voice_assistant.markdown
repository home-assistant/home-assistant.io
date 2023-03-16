---
title: Voice Assistant
description: Voice Assistant Integration.
ha_category:
  - Voice
ha_iot_class: Local Push
ha_release: '2023.4'
ha_config_flow: false
ha_codeowners:
  - '@balloob'
  - '@synesthesiam'
ha_domain: voice_assistant
ha_integration_type: integration
---

The Voice Assistant integration contains logic for running *pipelines*, which perform the common steps of a voice assistant like [Assist](/docs/assist/):

1. [Speech to text](/integrations/stt/)
2. [Intent recognition](/integrations/conversation/)
3. [Text to speech](/integrations/tts/)
