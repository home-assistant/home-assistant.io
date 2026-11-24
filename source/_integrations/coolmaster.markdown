---
description: Instructions on how to integrate CoolMasterNet within Home Assistant.
ha_release: 0.88
ha_domain: coolmaster
---

The **CoolMasterNet** {% term integration %} lets you control HVAC through [CoolMasterNet](https://coolautomation.com/products/coolmasternet/).

{% include integrations/config_flow.md %}

## Data updates

The integration {% term polling polls %} the CoolMasterNet device every 60 seconds.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
