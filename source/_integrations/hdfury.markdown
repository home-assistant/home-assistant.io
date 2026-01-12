---
title: HDFury
description: Instructions on how to integrate HDFury devices within Home Assistant.
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 2026.2
ha_category:
  - Button
  - Select
  - Switch
ha_codeowners:
  - '@glenndehaan'
ha_domain: hdfury
ha_platforms:
  - button
  - select
  - switch
ha_integration_type: integration
---

The **HDFury** {% term integration %} allows you to control and monitor your [HDFury](https://hdfury.com/) device.

## Use cases

- Monitor current device state.
- Control the HDMI port selectors and operation state.
- Control audio muting, and display/relay configuration.

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

### Button

- Issue hotplug (Sends a command to hotplug TX & RX connected devices)
- Restart (Reboot the device remotely)

### Select

- Operation Mode (Controls the device Operation Mode, Splitter/Matrix/etc.)
- Port Select TX0 (Controls the HDMI source selection for output TX0)
- Port Select TX1 (Controls the HDMI source selection for output TX1)

### Switch

- Auto switch inputs (Automatically switches to the active HDMI input)
- HTPC mode RX0 (Enables HTPC-optimized mode for HDMI input RX0)
- HTPC mode RX1 (Enables HTPC-optimized mode for HDMI input RX1)
- HTPC mode RX2 (Enables HTPC-optimized mode for HDMI input RX2)
- HTPC mode RX3 (Enables HTPC-optimized mode for HDMI input RX3)
- Infrared (Enables or disables the IR receiver)
- Mute audio TX0 (Mutes audio output on HDMI output TX0)
- Mute audio TX1 (Mutes audio output on HDMI output TX1)
- OLED display (Turns the front-panel OLED display on or off)
- Relay (Controls the onboard relay output)

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
