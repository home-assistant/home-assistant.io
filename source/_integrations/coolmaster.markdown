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
---

The `coolmaster` climate platform lets you control HVAC through [CoolMasterNet](https://coolautomation.com/products/coolmasternet/).

## Configuration via the frontend

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **CoolMasterNet**.
Select the host and port of your instance, and check the box for the modes
supported by your HVAC units. The units you have configured in CoolMasterNet
will be automatically added to Home Assistant as Climate entities and
matching devices.
