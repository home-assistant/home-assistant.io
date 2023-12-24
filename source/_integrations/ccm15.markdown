---
title: Midea CCM15 Data Converter
description: Instructions on how to integrate a Midea CCM15 module into Home Assistant.
ha_category:
  - Climate
ha_iot_class: Local Polling
ha_release: 2023.07.0
ha_config_flow: true
ha_codeowners:
  - '@ocalvo'
ha_domain: ccm15
ha_quality_scale: platinum
ha_dhcp: true
ha_platforms:
  - climate
ha_integration_type: integration
---

The CCM15 integration allows you to integrate [Midea CCM15](https://mbt.midea.com/hvac-goods/midea-products-category/vrfs/vrf-controller/central-controller-ccm-15) devices in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Configuration](#configuration)
- [Climate](#climate)

## Configuration

Adding a CCM15 data converter to your Home Assistant instance can be done via the user interface, by using this My Button:
{% my config_flow_start badge domain=page.ha_domain %}

{% details "Manual configuration steps" %}

1. Browse to your Home Assistant instance.
2. Go to **{% my integrations title="Settings > Devices & Services" %}**.
3. In the bottom right corner, select the
  **{% my config_flow_start icon domain=page.ha_domain %}** button.
4. From the list, select **CCM15** and follow the instructions on screen.

{% enddetails %}

## Climate

Each data controller can support up to 64 `climate` devices.
