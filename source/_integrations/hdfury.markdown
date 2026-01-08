---
title: HDFury
description: Instructions on how to integrate HDFury devices within Home Assistant.
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 2026.2
ha_category:
  - Select
ha_codeowners:
  - '@glenndehaan'
ha_domain: hdfury
ha_platforms:
  - select
ha_integration_type: integration
---

The **HDFury** {% term integration %} allows you to control and monitor your [HDFury](https://hdfury.com/) device.

## Use cases

- Monitor current device state.
- Control the HDMI port selectors and operation state.

## Supported devices

- [VRROOM](https://hdfury.com/product/8k-vrroom-40gbps/)
- [Diva](https://hdfury.com/product/4k-diva-18gbps/)

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of the HDFury Device."
{% endconfiguration_basic %}

## Supported functionality

The integration will fetch data from each device.
Below is a complete overview of the entities this integration provides.

### Select

- Operation Mode (Controls the device Operation Mode, Splitter/Matrix/etc.)
- Port Select TX0 (Controls the HDMI source selection for output TX0)
- Port Select TX1 (Controls the HDMI source selection for output TX1)

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
