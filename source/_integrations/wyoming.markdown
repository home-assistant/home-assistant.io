---
title: Wyoming
description: Connect remote voice services to Home Assistant.
ha_category:
  - Voice
ha_iot_class: Local Push
ha_release: '2023.5'
ha_codeowners:
  - '@balloob'
  - '@synesthesiam'
ha_domain: wyoming
ha_integration_type: integration
ha_quality_scale: internal
---

The Wyoming integration connects external voice services to Home Assistant using a [small protocol](https://github.com/rhasspy/rhasspy3/blob/master/docs/wyoming.md). This allows [Assist](/docs/assist) to use 100% local speech-to-text and text-to-speech systems.

{% include integrations/config_flow.md %}
