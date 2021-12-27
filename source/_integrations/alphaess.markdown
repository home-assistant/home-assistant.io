---
title: Alpha Ess
description: Instructions on how to integrate Alpha ESS Solar Storage with Home Assistant
  - Sensor
ha_category:
  - Energy
ha_iot_class: Cloud Polling
ha_release: 2022.2
ha_config_flow: true
ha_domain: alphaess
ha_platforms:
  - sensor
ha_codeowners:
  - '@CharlesGillanders'
---

This integration pulls data from an [Alpha ESS](https://www.alpha-ess.com/) Energy Storage Solution.

## Configuration

The integration can be entirely setup from within the GUI.  Add the integration to Home Assistant and provide the username and password needed to logon to the Alpha ESS website.  Any Alpha ESS energy storage units registered with Alpha ESS will be automatically discovered and added to Home Assistant.  
  
## Integration Entities
  
Each added configuration entry will create the following sensors:  


- **Solar Production**: Shows Solar Production for today.
- **Solar to Battery**: Shows Solar contribution to battery storage for today.
- **Solar to Grid**: Shows Solar feed to Grid for today.
- **Solar to Load**: Shows the Solar contribution to home load for today.
- **Total Load**: Shows the total measured home load for today.
- **Grid to Load**: Shows the Grid contribution to home load for today.
- **Grid to Battery**: Shows the Grid contribution to battery storage for today.
- **State of Charge**: Shows the current battery charge as a percentage.
- **Charge**: Shows the total energy sent to battery storage today from all sources.
- **Discharge**: Shows the total energy drawn from battery storage today.
  
(All measurements are in Watt hours (Wh) unless otherwise noted)