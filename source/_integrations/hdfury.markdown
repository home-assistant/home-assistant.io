---
title: HDFury
description: Instructions on how to integrate HDFury devices within Home Assistant.
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 2026.1
ha_category:
  - Select
ha_codeowners:
  - '@glenndehaan'
ha_domain: hdfury
ha_platforms:
  - diagnostics
  - select
ha_integration_type: integration
---

The [HDFury](https://hdfury.com/) {% term integration %} allows you to control and monitor your HDFury device.

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

- Operation Mode
- Port Select TX0
- Port Select TX1

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
