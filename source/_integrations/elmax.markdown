---
title: Elmax
description: Instructions on how to integrate Elmax panels within Home Assistant.
ha_category:
  - Switch
ha_release: 2022.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@albertogeniola'
ha_domain: elmax
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - cover
  - switch
ha_integration_type: integration
ha_zeroconf: true
---

The Elmax integration enables Home Assistant integration with 
[ELMAX](https://www.elmaxsrl.it/) control panels. Elmax panels are 
domotic systems focused on intrusion detection and home surveillance.

The current integration is capable of controlling domotic switches 
and actuators connected to the Elmax panels.

{% include integrations/config_flow.md %}
