---
title: Leviton Decora Wi-Fi
description: Instructions on how to setup Leviton Decora Smart Wi-Fi switches/dimmers within Home Assistant.
ha_category:
  - Light
ha_iot_class: Cloud Polling
ha_release: 0.51
ha_domain: decora_wifi
ha_platforms:
  - light
ha_integration_type: hub
ha_config_flow: true
ha_quality_scale: legacy
ha_config_flow: true
---

The **Leviton Decora Wi-Fi** {% term integration %} connects your [Leviton Decora Smart Wi-Fi](https://leviton.com/products/residential/smart-home/smart-switches) dimmers and switches to Home Assistant via the MyLeviton API.

## Supported devices

The following devices are known to work with this integration:

- [DW6HD1-BZ](https://leviton.com/products/dw6hd-1bz) (Decora Smart Wi-Fi 600W Dimmer)
- [DW15P-1BW](https://leviton.com/products/dw15p-1bw) (Decora Smart Wi-Fi Plug-in Outlet)
- [DW15S-1BZ](https://leviton.com/products/dw15s-1bz) (Decora Smart Wi-Fi 15A Switch)
- [D215S-2RW](https://store.leviton.com/products/decora-smart-wi-fi-switch-2nd-gen-d215s-2rw) (Decora Smart Wi-Fi 15A Switch - 2nd Gen)
- [DN15S-1BW](https://leviton.com/products/dn15s-1bw) (Decora Smart No-Neutral Switch) via [MLWSB-1BW](https://leviton.com/products/mlwsb-1bw) (Decora Smart Wi-Fi Bridge for No-Neutral Switch and Dimmer)
- [D2MSD-1BW](https://leviton.com/products/d2msd-1bw) (Decora Smart Motion Sensing Dimmer Switch, Wi-Fi 2nd Gen)

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: "Your My Leviton app email address."
Password:
  description: "Your My Leviton app password."
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
