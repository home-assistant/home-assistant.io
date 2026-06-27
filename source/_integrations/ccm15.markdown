---
title: Midea ccm15 AC Controller
description: Instructions on how to integrate a Midea CCM15 module into Home Assistant.
ha_category:
  - Climate
ha_iot_class: Local Polling
ha_release: 2024.1
ha_config_flow: true
ha_codeowners:
  - '@ocalvo'
ha_domain: ccm15
ha_platforms:
  - climate
  - diagnostics
ha_integration_type: hub
---

The **CCM15** {% term integration %} allows you to integrate [Midea CCM15](https://mbt.midea.com/hvac-goods/midea-products-category/vrfs/vrf-controller/central-controller-ccm-15) devices in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Configuration](#configuration)
- [Climate](#climate)

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The hostname or IP address of your CCM15 controller.
Port:
  description: The TCP port of the CCM15 controller's HTTP interface.
{% endconfiguration_basic %}

## Climate

Each data controller can support up to 64 `climate` devices.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
