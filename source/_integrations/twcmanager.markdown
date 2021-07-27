---
title: TWCManager
description: Instructions on how to integrate TWCManager into Home Assistant.
ha_release: 2021.9
ha_category:
  - Car
  - Energy
ha_iot_class: Local Polling
ha_quality_scale: silver
ha_config_flow: true
ha_domain: twcmanager
ha_codeowners:
  - '@jherby2k'
ha_platforms:
  - sensor
---

The TWCManager integration allows you to integrate your
[TWCManager](https://github.com/ngardiner/TWCManager) server into Home Assistant. TWCManager is an open source hardware hack (typically Raspberry Pi-based) for the Tesla wall charger (gen 2) that allows you to control the charging rate dynamically by leveraging Tesla's load-sharing protocol. A typical use case is to track solar production and charge your car entirely with green energy.

{% include integrations/config_flow.md %}

This integration exposes several sensors to Home Assistant, and replaces the push-based [status interface](https://github.com/ngardiner/TWCManager/blob/main/docs/modules/Status_HASS.md). For TWCManager to also retrieve solar production and energy usage data from Home Assistant, you would still need to configure the [Home Assistant EMS interface](https://github.com/ngardiner/TWCManager/blob/main/docs/modules/EMS_HASS.md) as that is currently not covered by this integration.

<div class='note warning'>

  Enabling TWCManager's [Home Assistant EMS interface](https://github.com/ngardiner/TWCManager/blob/main/docs/modules/EMS_HASS.md) requires configuring a long-lived access token in Home Assistant, and since TWCManager provides no user authentication the security implications should be weighed carefully. It is recommended that you configure TWCManager to pull your solar / energy data directly from the source, if it is [supported directly](https://github.com/ngardiner/TWCManager#ems-interfaces) by TWCManager.

</div>
