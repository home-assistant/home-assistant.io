---
title: Roth Touchline
description: Instructions on how to integrate Roth Touchline within Home Assistant.
ha_category:
  - Climate
ha_release: 0.61
ha_iot_class: Local Polling
ha_domain: touchline
ha_platforms:
  - climate
ha_integration_type: hub
ha_codeowners:
  - '@mnordseth'
ha_config_flow: true
---

The **Roth Touchline** {% term integration %} lets you control [ROTH Touchline](https://www.roth-uk.com/en/roth-touchline.htm) floor heating thermostats from Roth.

{% include integrations/config_flow.md %}

{% configuration_basic %}
host:
  description: The IP address of your controller. For example, `http://192.168.1.1`.
{% endconfiguration_basic %}

## Entities

The integration will present each Roth Touchline SL zone as a climate entity, which can:

- Display the current temperature
- Set a target temperature
- Assign to a configured **Global Schedule** using Home Assistant climate entity presets.
