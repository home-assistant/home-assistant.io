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
ha_quality_scale: internal
---

The VoIP integration enables users to talk to [Assist](/docs/assist) using an analog phone and a VoIP adapter such as the [Grandstream HT801](https://www.grandstream.com/products/gateways-and-atas/analog-telephone-adaptors/product/ht801).

<p class='img'>
  <img src="/images/integrations/voip/voip_adapter.png" />
  Connecting a phone to Home Assistant requires an adapter.
</p>

{% include integrations/config_flow.md %}

Calls from new devices are blocked by default since voice commands could be used to control sensitive devices, such as locks and garage doors. Ensure that you've configured [Assist](/docs/assist/) to only expose the entities you want to be controllable via voice.
