---
title: MirAIe AC
description: Instructions for how to integrate MirAIe Air Conditioners within Home Assistant.
ha_category:
  - Climate
ha_release: 2023.7
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@milothomas'
ha_domain: miraie_ac
ha_platforms:
  - climate
ha_integration_type: integration
---

[MirAIe](https://www.panasonic.com/in/consumer/miraie.html) devices from Panasonic, is a class of IoT and AI enabled home appliances. This integration supports MirAIe Air Conditioners.

To set up this integration, you will need to access to an account registered on the Panasonic MirAIe mobile application.

Air Conditioners configured on your Panasonic MirAIe mobile app will be discovered by Home Assistant after this integration is configured.

{% include integrations/config_flow.md %}
