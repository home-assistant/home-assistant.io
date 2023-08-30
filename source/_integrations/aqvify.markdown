---
title: Aqvify
description: Instructions on how to setup Aqvify devices within Home Assistant.
ha_category:
  - Sensor
ha_release: 2023.9
ha_iot_class: Cloud Polling
ha_domain: aqvify
ha_codeowners:
  - '@ptz0n'
ha_platforms:
  - sensor
ha_config_flow: true
ha_dhcp: false
ha_integration_type: hub
---

Home Assistant has support to integrate your [Aqvify](https://aqvify.com) devices.

There is currently support for the sensor measuring well water level.

{% include integrations/config_flow.md %}
