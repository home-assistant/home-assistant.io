---
title: Nuki Matter
description: Control your Nuki Matter devices using the Matter integration.
ha_category:
  - Lock
ha_domain: nuki_matter
ha_release: '2025.5'
ha_codeowners:
  - '@home-assistant/matter'
ha_config_flow: true
ha_platforms:
  - lock
ha_iot_class: Local Push
ha_integration_type: virtual
ha_iot_standard:
  - matter
works_with:
  - matter
---

{% include integrations/wwha.md url="https://nuki.io" name="Nuki" %}

## Setting up your Nuki via Matter integrations requires Thread

To use this integration, you need a Thread border router that supports Matter. For more information, refer to the [Thread documentation](/integrations/thread/). You can turn your Home Assistant installation into a Thread border router e.g. by using the Home Assistant [Connect ZBT-1](https://www.home-assistant.io/connectzbt1/) or [ZBT-2](https://www.home-assistant.io/connect/zbt-2/). For more information on setting this up, go to [Turning Home Assistant into a Thread border router section](/integrations/thread/#turning-home-assistant-into-a-thread-border-router)

For more information on setting up Matter with Nuki devices, refer to the [Nuki Matter setup guide](https://help.nuki.io/hc/en-001/articles/14596875392017-Setting-up-your-Matter-integration).

## Supported devices

The following devices are supported:

- [Nuki Smart Lock Go](https://nuki.io/en-uk/products/smart-lock-go)
- [Nuki Smart Lock Pro](https://nuki.io/en-uk/products/smart-lock-pro-5th-gen)
- [Nuki Smart Lock Ultra](https://nuki.io/en-uk/products/smart-lock-ultra)
