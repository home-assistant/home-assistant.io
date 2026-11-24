---
description: Instructions on how to integrate a Midea CCM15 module into Home Assistant.
ha_release: 2024.1
ha_domain: ccm15
---

The **CCM15** {% term integration %} allows you to integrate [Midea CCM15](https://mbt.midea.com/hvac-goods/midea-products-category/vrfs/vrf-controller/central-controller-ccm-15) devices in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Configuration](#configuration)
- [Climate](#climate)

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your CCM15 controller."
Port:
  description: "The TCP port of the controller's HTTP interface. Defaults to `80`."
{% endconfiguration_basic %}

## Climate

Each data controller can support up to 64 `climate` devices.

## Data updates

The integration {% term polling polls %} the CCM15 controller every 30 seconds.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
