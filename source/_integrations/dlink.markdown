---
title: D-Link Wi-Fi Smart Plugs
description: Instructions on how to integrate D-Link switches into Home Assistant.
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: 0.14
ha_config_flow: true
ha_dhcp: true
ha_domain: dlink
ha_platforms:
  - switch
ha_codeowners:
  - '@tkdrob'
ha_integration_type: device
---

The **D-Link Wi-Fi Smart Plugs** {% term integration %} allows you to control the state of your [D-Link Wi-Fi Smart Plugs](https://us.dlink.com/en/consumer/smart-home).

{% include integrations/config_flow.md %}

Supported devices (tested):

- DSP-W215
- DSP-W110

Password: The default password is the PIN included on the configuration card or on the back of the unit.

Use the legacy protocol in case the D-Link Wi-Fi Smart Plugs does not work. This enables limited support for legacy firmware protocols (Tested with v1.24, v1.26). Data such as power consumption will not be available. The temperature will also show a freezing level.
