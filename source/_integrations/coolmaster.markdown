---
description: Instructions on how to integrate CoolMasterNet within Home Assistant.
ha_release: 0.88
ha_domain: coolmaster
---

The **CoolMasterNet** {% term integration %} lets you control HVAC through [CoolMasterNet](https://coolautomation.com/products/coolmasternet/).

{% include integrations/config_flow.md %}

## Fan speeds

The climate entity offers the fan speeds that the CoolMasterNet protocol defines: very low, low, medium, high, top, and auto. Not every indoor unit has every speed. A unit ignores a speed it doesn't support and keeps its current fan speed.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
