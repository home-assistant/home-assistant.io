---
title: VoIP
description: Voice over IP
ha_category:
  - Voice
ha_iot_class: Local Push
ha_release: '2023.5'
ha_codeowners:
  - '@balloob'
  - '@synesthesiam'
ha_domain: voip
ha_integration_type: integration
---

The VoIP integration enables users to talk to [Assist](/docs/assist) using an analog phone and a VoIP adapter. Currently, the system works with the [Grandstream HT801](https://amzn.to/40k7mRa). See [the tutorial](/projects/worlds-most-private-voice-assistant) for detailed instructions.

<p class='img'>
  <img src="/images/integrations/voip/voip_adapter.png" />
  Connecting a phone to Home Assistant requires an adapter.
</p>

{% include integrations/config_flow.md %}
