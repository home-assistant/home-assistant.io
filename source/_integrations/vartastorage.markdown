---
title: VARTA Storage
description: Instructions on how to configure VARTA Storage integration.
ha_category:
  - Sensor
ha_release: 2022.1
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Vip0r'
ha_domain: vartastorage
ha_platforms:
  - sensor
---

[VARTA Storage](https://www.varta-storage-portal.com) allows you to integrate your Battery device into HomeAssistant.

There is currently support for the following device types within Home Assistant:

- Sensor

The integration will create sensor entities for the different values of the device like State of Charge, Charge Power, Power Grid Consumption and many more.
Setup of this integrations requires that your battery device is connected to your LAN and you know the actual IP Address/Hostname of it.
The Port ist pre-defined with 502 (Standard Modbus Port). The integration is using this [PyPI Package](https://github.com/vip0r/vartastorage)

{% include integrations/config_flow.md %}
