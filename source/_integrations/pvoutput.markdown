---
title: PVOutput
description: Instructions on how to use PVOutput within Home Assistant.
ha_category:
  - Energy
ha_release: 0.33
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@frenck'
ha_config_flow: true
ha_domain: pvoutput
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: device
---

The PVOutput integration consumes information from [PVOutput](https://pvoutput.org/) which was uploaded by your solar photovoltaic (PV) system.

{% include integrations/config_flow.md %}
