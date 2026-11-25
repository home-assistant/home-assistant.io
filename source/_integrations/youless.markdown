---
description: Instructions on how to integrate your YouLess device into Home Assistant.
ha_release: 2021.8
ha_domain: youless
---

The **YouLess** {% term integration %} for Home Assistant allows you to read the meter values from sensors created by [YouLess](https://www.youless.nl/home.html).

The {% term integration %} is tested and verified for the following devices from YouLess:

- LS110
- LS120 running PVOutput firmware
- LS120 running Enologic firmware

{% include integrations/config_flow.md %}

The {% term integration %} will create sensors for you to display:

- The current power usage
- The gas meter
- The water meter
- The current meter value (including high and low)
- The delivery meter value, for Solar power

## Changing the IP address of the device

The {% term integration %} stores the hostname or IP address you entered during setup and does not update it when the device gets a different IP address: it has no reconfigure option and does not discover the device on the network. To use the new address, remove the integration entry as described below and add the integration again with the new address. The sensors keep their entity IDs, because their unique IDs are based on the device's MAC address rather than its network address.

To avoid this, give the YouLess device a fixed IP address with a DHCP reservation in your router, or enter its hostname instead of its IP address when you set up the integration.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
