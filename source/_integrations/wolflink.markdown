---
title: Wolf SmartSet Service
description: Instructions on how to integrate Wolf Smart-Set cloud within Home Assistant.
ha_category:
  - Climate
ha_release: 0.114
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@adamkrol93'
  - '@EnjoyingM'
ha_domain: wolflink
ha_platforms:
  - sensor
ha_integration_type: device
---

The **Wolf SmartSet Service** {% term integration %} uses the [Wolf Smart-Set](https://www.wolf-smartset.com/) web service as a source to fetch the status of your Wolf heating, heat pump, and solar thermal systems.

The {% term integration %} can collect information such as temperature, pressure, and system state for a wide range of Wolf devices, including gas heaters, heat pumps, and solar thermal systems.

Remember that to integrate your Wolf device with Home Assistant, you need to have a Wolf ISM7 or Wolf Link Home device connected to your heating or energy system.

The {% term integration %} fetches all data based on parameters that are exposed by your device.

## Tested devices

- Wolf Link Home Pro connected to a FGB-28 device
- Wolf ISM7e / Link Pro connected to a COB-20 device
- Wolf ISM7 (HW v1.0, SW v2.10.47) connected to a CGB-2-14 device
- Wolf ISM7 / Link Home connected to a CGB-2 device (gas heater)

{% include integrations/config_flow.md %}

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
