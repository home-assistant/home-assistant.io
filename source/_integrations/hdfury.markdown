---
title: HDFury
description: Instructions on how to integrate HDFury devices within Home Assistant.
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 2026.2
ha_category:
  - Button
  - Number
  - Select
  - Sensor
  - Switch
ha_codeowners:
  - '@glenndehaan'
ha_domain: hdfury
ha_platforms:
  - button
  - diagnostics
  - number
  - select
  - sensor
  - switch
ha_integration_type: device
ha_quality_scale: platinum
ha_zeroconf: true
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
- [Vertex 2](https://hdfury.com/product/4k-vertex2-18gbps/)

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

### Number

- OLED fade timer (Controls time before the front-panel OLED display fades out)
- Restart timer (Controls interval for automatic device restarts)

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
- CEC (Enables or disables HDMI-CEC on all inputs and outputs)
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
- TX0 force +5v (Forces the +5v line on the HDMI cable for TX0 to be active)
- TX1 force +5v (Forces the +5v line on the HDMI cable for TX1 to be active)

## Data updates

This integration uses local {% term polling %}, meaning it checks for changes to all entities by regularly communicating with the HDFury device.

The integration will retrieve data from the device every minute.

## Examples

The following examples show how to use the HDFury integration in Home Assistant automations.
These examples are just a starting point, and you can use them as inspiration to create your own automations.

### Switch HDMI input

The following example switches the HDFury input to the correct source when the media player powers on.

{% raw %}

```yaml
automation:
  - alias: "Switch HDFury input to Nvidia SHIELD when powered on"
    triggers:
      - trigger: state
        entity_id:
          - remote.nvidia_shield
        to:
          - "on"
        from:
          - "off"

    actions:
      - action: select.select_option
        target:
          entity_id: select.hdfury_port_selector_tx0
        data:
          option: 1
```

{% endraw %}

## Known limitations

The HDFury integration currently has no known limitations.

## Troubleshooting

If you're experiencing issues with your HDFury integration, try these general troubleshooting steps:

1. Make sure your HDFury device is powered on and properly connected to your home network.
2. Verify that the OLED screen on the HDFury device shows an IP address.
3. If the integration shows as unavailable, try restarting both your HDFury device and Home Assistant.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
