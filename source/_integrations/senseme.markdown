---
title: SenseME
description: Instructions on how to integrate SenseME devices into Home Assistant.
ha_category:
  - Fan
ha_release: 2022.2
ha_iot_class: Local Push
ha_codeowners:
  - '@mikelawrence'
  - '@bdraco'
ha_domain: senseme
ha_config_flow: true
ha_platforms:
  - fan
---

Integrates SenseME devices into Home Assistant.

The [SenseME](https://www.bigassfans.com/senseme/) integration supports Haiku Fans and standalone lights.

### Supported devices

Haiku Fans with SenseME
Haiku standalone lights

{% include integrations/config_flow.md %}
