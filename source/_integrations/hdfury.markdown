---
title: HDFury
description: Instructions on how to integrate HDFury devices within Home Assistant.
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 2026.2
ha_category:
  - Button
  - Select
  - Sensor
  - Switch
ha_codeowners:
  - '@glenndehaan'
ha_domain: hdfury
ha_platforms:
  - button
  - select
  - sensor
  - switch
ha_integration_type: integration
---

The **HDFury** {% term integration %} allows you to control and monitor your [HDFury](https://hdfury.com/) device.

## Use cases

- Monitor current device state.
- Control the HDMI port selectors and operation state.
- Control audio muting, and display/relay configuration.
- Monitor HDMI input, output, and audio signal status.

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

### Sensors

- Audio TX0 (Current audio format/status on HDMI output TX0)
- Audio TX1 (Current audio format/status on HDMI output TX1)
- Audio output (Current audio format/status on HDMI output AUD)
- eARC/ARC status (Current eARC or ARC connection state)
- EDID TXA0 (EDID received from TX0 audio channel)
- EDID TXA1 (EDID received from TX1 audio channel)
- EDID AUDA (EDID received from AUD audio output)
- Input RX0 (Status and signal information for HDMI input RX0)
- Input RX1 (Status and signal information for HDMI input RX1)
- EDID TX0 (EDID received from TX0 video channel)
- EDID TX1 (EDID received from TX1 video channel)
- EDID AUD (EDID received from AUD video channel)
- Output TX0 (Status and signal information for HDMI output TX0)
- Output TX1 (Status and signal information for HDMI output TX1)

### Switches

- Auto switch inputs (Automatically switches to the active HDMI input)
- CEC RX0 (Enables or disables HDMI-CEC on input RX0)
- CEC RX1 (Enables or disables HDMI-CEC on input RX1)
- CEC RX2 (Enables or disables HDMI-CEC on input RX2)
- CEC RX3 (Enables or disables HDMI-CEC on input RX3)
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
