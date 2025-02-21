---
title: Voice over IP
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
ha_platforms:
  - assist_satellite
  - binary_sensor
  - select
  - switch
ha_config_flow: true
---

The **VoIP** {% term integration %} enables users to talk to [Assist](/voice_control/) using an analog phone and a VoIP adapter. Currently, the system works with the [Grandstream HT801](https://amzn.to/40k7mRa). See [the tutorial](/voice_control/worlds-most-private-voice-assistant) for detailed instructions.

As an alternative, the [Grandstream HT802](https://www.amazon.com/Grandstream-GS-HT802-Analog-Telephone-Adapter/dp/B01JH7MYKA/) can be used, which is basically the same as the previously mentioned HT801, but has two phone ports, of which Home Assistant currently support using only one of them.

Also, the Grandstream HT812 has been reported to work. Home Assistant supports using only one of the two phone ports.

If you are running Home Assistant on a machine with other VoIP software, you can configure the port the **VoIP** {%term integration %} listens on in the configuration. For outgoing calls, you can specify a **SIP user** value that will be sent to the phone in the **From** header, if required.

<p class='img'>
  <img src="/images/integrations/voip/voip_adapter.png" />
  Connecting a phone to Home Assistant requires an adapter.
</p>

{% include integrations/config_flow.md %}
