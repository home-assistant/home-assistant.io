---
title: 棉花糖智能
description: Instructions on how to setup mhtzn with Home Assistant.
ha_category:
  - Energy
ha_release: 0.76
ha_iot_class: Local Polling
ha_domain: mhtzn
ha_zeroconf: true
ha_config_flow: true
ha_codeowners:
  - '@leonardlcl'
ha_platforms:
  - curtain
  - light
  - scene
ha_integration_type: integration
---

### step1
> Select or enter and select [棉花糖智能]
### step2
> Select the type of intelligent lighting control: single lamp/lamp group, click [Submit]
>
> Single Light: Control smart lights by a single device
>
> Light Groups: Control smart lights by room and light group
### step3
> Select a scanned gateway and click [Submit]
>
> Once complete you can sync the devices in the 棉花糖智能 APP to HomeAssistantvoy` with the last 6 digits of the unit's serial number as password. See [the enphase documentation](https://www4.enphase.com/en-us/support/faq/what-username-and-password-administration-page-envoy-local-interface) for more details on other units.
