---
title: CoolMasterNet
description: Instructions on how to integrate CoolMasterNet within Home Assistant.
ha_category:
  - Climate
ha_release: 0.88
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@OnFreund'
ha_domain: coolmaster
ha_platforms:
  - binary_sensor
  - button
  - climate
  - sensor
ha_integration_type: hub
---

The **CoolMasterNet** {% term integration %} lets you control HVAC through [CoolMasterNet](https://coolautomation.com/products/coolmasternet/).

{% include integrations/config_flow.md %}

## Supported functionality

### Climate

The current activity of each unit is shown as the climate entity's HVAC action. A unit that is calling for heating or cooling shows **heating**, **cooling**, or **drying** to match its mode, a unit in fan only mode shows **fan**, a unit that is on but has already reached its target temperature shows **idle**, and a unit that is switched off shows **off**.

The action is unknown when the bridge uses a status format that does not report demand. It is also unknown for a unit in automatic mode whose current temperature matches its target temperature, because the bridge does not report which way such a unit is working.

### Binary sensors

- **Demand**
  - **Description**: Indicates whether the unit is calling for heating or cooling. A unit that is on but has already reached its target temperature is off. This is unknown when the bridge uses a status format that does not report demand.
