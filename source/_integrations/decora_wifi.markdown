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
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

Support for [Leviton Decora Wi-Fi](https://leviton.com/products/residential/smart-home/smart-switches) dimmers/switches via the MyLeviton API.

Supported devices (tested):

- [DW6HD1-BZ](https://leviton.com/products/dw6hd-1bz) (Decora Smart Wi-Fi 600W Dimmer)
- [DW15P-1BW](https://leviton.com/products/dw15p-1bw) (Decora Smart Wi-Fi Plug-in Outlet)
- [DW15S-1BZ](https://leviton.com/products/dw15s-1bz) (Decora Smart Wi-Fi 15A Switch)
- [D215S-2RW](https://store.leviton.com/products/decora-smart-wi-fi-switch-2nd-gen-d215s-2rw) (Decora Smart Wi-Fi 15A Switch - 2nd Gen)
- [DN15S-1BW](https://leviton.com/products/dn15s-1bw) (Decora Smart No-Neutral Switch) via [MLWSB-1BW](https://leviton.com/products/mlwsb-1bw) (Decora Smart Wi-Fi Bridge for No-Neutral Switch and Dimmer)
- [D2MSD-1BW](https://leviton.com/products/d2msd-1bw) (Decora Smart Motion Sensing Dimmer Switch, Wi-Fi 2nd Gen)

To enable these lights, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
light:
  - platform: decora_wifi
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: Your "My Leviton" app email address/username.
  required: true
  type: string
password:
  description: Your "My Leviton" app password.
  required: true
  type: string
{% endconfiguration %}
