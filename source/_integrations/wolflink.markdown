---
title: Wolf SmartSet Service
description: Instructions on how to integrate Wolf Smart-Set cloud within Home Assistant.
ha_category:
  - Heating
ha_release: 0.114
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@adamkrol93'
ha_domain: wolflink
ha_platforms:
  - sensor
---

The `wolflink` integration uses the [Wolf Smart-Set](https://www.wolf-smartset.com/) web service as a source to fetch your heating system status.

Currently, integration can collect information such as temperature, pressure and heating state. 

Remember that to integrate your heating device with Home Assistant, you need to have a WOLF LinkHome device connected to your heating device.

The integration fetches all data based on parameters, that are exposed by your heating device.

## Tested devices

- Wolf Link Home Pro connected to a FGB-28 device
- Wolf ISM7e / Link Pro connected to a COB-20 device

{% include integrations/config_flow.md %}
