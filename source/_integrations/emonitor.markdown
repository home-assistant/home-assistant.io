---
title: SiteSage Emonitor
description: Instructions on how to integrate a SiteSage Emonitor within Home Assistant.
ha_release: '2021.5'
ha_category:
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_dhcp: true
ha_codeowners:
  - '@bdraco'
ha_domain: emonitor
ha_platforms:
  - sensor
ha_integration_type: integration
---

The SiteSage Emonitor allows local power monitoring on a per circuit basis via an [Emonitor](https://powerhousedynamics.com/solutions/sitesage/) device.

{% include integrations/config_flow.md %}
