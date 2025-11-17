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

## Setting up your Matter integration requires Thread

To use this integration, you need a Thread border router that supports Matter. For more information, refer to the [Thread documentation](/integrations/thread/).

## Home Assistant Connect ZBT-1 support

The Home Assistant Connect ZBT-1 supports Matter devices over Thread and can function as a Thread border router for remote access. For information on setting up the Connect ZBT-1 as a Thread border router, refer to the [Thread documentation](/integrations/thread/).

For more information on setting up Matter with Nuki devices, refer to the [Nuki Matter setup guide](https://help.nuki.io/hc/en-001/articles/14596875392017-Setting-up-your-Matter-integration).


## Supported devices

The following devices are supported:

- [Nuki Smart Lock Go](https://nuki.io/en-uk/products/smart-lock-go)
- [Nuki Smart Lock Pro](https://nuki.io/en-uk/products/smart-lock-pro-5th-gen)
- [Nuki Smart Lock Ultra](https://nuki.io/en-uk/products/smart-lock-ultra)
