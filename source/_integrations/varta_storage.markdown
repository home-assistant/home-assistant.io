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

[VARTA Storage](https://www.varta-storage-portal.com) allows you to integrate your Battery device into Home Assistant.

There is currently support for the following device types within Home Assistant:

- Sensor

The integration will create sensor entities for the different values of the device like the State of Charge, Charge Power, Power Grid Consumption, and many more.

# Prerequisites

To set up this integration, it is required that your battery device is connected to your network.

{% include integrations/config_flow.md %}
