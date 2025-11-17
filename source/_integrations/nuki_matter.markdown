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

## Supported devices

The following devices are supported:

- [Nuki Smart Lock Go](https://nuki.io/en-uk/products/smart-lock-go)
- [Nuki Smart Lock Pro](https://nuki.io/en-uk/products/smart-lock-pro-5th-gen)
- [Nuki Smart Lock Ultra](https://nuki.io/en-uk/products/smart-lock-ultra)

## Setting up your Matter integration requires Thread

To integrate your Smart Lock into your Smart Home, you need a suitable hub that supports **Matter via Thread**.

## 🏡 Home Assistant Connect ZBT-1 Support

| Type | Matter via Thread | Remote Access via Thread* |
| :--- | :---: | :---: |
| Home Assistant Connect ZBT-1 | ✅ | ✅ |

***

*\* Remote Access via Thread requires a compatible Thread Border Router.*

[Nuki Documentation](https://help.nuki.io/hc/en-001/articles/14596875392017-Setting-up-your-Matter-integration)
