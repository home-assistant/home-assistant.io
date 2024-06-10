---
title: Kermi
description: Kermi integration
ha_category:
  - Water Heater
ha_release: 2024.07
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: kermi
ha_platforms:
  - water_heater
ha_integration_type: integration
---

The `kermi` integration integrates [Kermi](https://www.kermi.com/en/)'s heat pumps with water heaters into Home Assistant. It uses the local interface module via Modbus TCP.
When trying this integration with unsupported devices check the modbus device address for the water heater in the modbus register table you got from Kermi.

## Prerequisites

The integration requires a device with an interface which is usually part of the x-center control module. Additionally, Modbus TCP has to be turned on, which cannot be done by the user, but an authorized installer or Kermi itself. When asking the installer or Kermi also ask for the Modbus register table, if you want to test this integration with an unsupported device.

## Device support

- Kermi x-buffer combi pro - **Supported**
- Kermi x-buffer fresh water station - **Not supported**
- Other x-buffer variants with xcenter pro - **Not tested, but should work**
- Other - **Not supported**

When trying this integration with unsupported devices, check the modbus device address for the water heater in the modbus register table you got from Kermi. Use that address when setting up the integration and overwrite the default.

{% include integrations/config_flow.md %}

### Water heater

The following parameters can be controlled for the `water_heater` platform entities:

- Target tank temperature
- Operation mode
