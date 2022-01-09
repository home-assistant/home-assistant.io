---
title: HALO Home
description: Instructions on integrating HALO Home smart lights into Home Assistant.
ha_category:
  - Light
ha_release: 2022.1
ha_iot_class: Assumed State
ha_codeowners:
  - '@nayaverdier'
ha_domain: halohome
ha_config_flow: true
ha_platforms:
  - light
---

Integrates [HALO Home](https://www.cooperlighting.com/global/brands/halo-home) smart lights into Home Assistant.

Supports brightness and color temperature for Bluetooth HALO Home lights.

Internet access is required for the initial setup, but devices are stored for
usage even when the internet is not available.

{% include integrations/config_flow.md %}
