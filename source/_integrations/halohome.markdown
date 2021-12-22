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

Devices are read from the HALO Home API upon setup and stored by this
integration to allow devices to be controlled even when the internet is not
accessible. Because of this, if devices are added or removed, the integration
must be reconfigured.

{% include integrations/config_flow.md %}
