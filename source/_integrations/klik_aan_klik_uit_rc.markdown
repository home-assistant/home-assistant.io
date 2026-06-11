---
title: KlikAanKlikUit
description: Instructions on how to integrate KlikAanKlikUit and compatible devices into Home Assistant.
ha_category:
  - Switch
ha_release: 2026.6
ha_iot_class: Assumed State
ha_config_flow: true
ha_codeowners:
  - '@Phunkafizer'
ha_domain: klik_aan_klik_uit
ha_platforms:
  - switch
ha_integration_type: device
ha_quality_scale: bronze
---

The **KlikAanKlikUit** {% term integration %} lets you control self-learning KlikAanKlikUit 433.92 MHz RF devices from Home Assistant.

The integration uses the [Radio Frequency](/integrations/radio_frequency/) {% term entity %} platform to send RF commands. That means you first need a compatible RF transmitter in Home Assistant, such as an ESPHome device with 433.92 MHz OOK transmit support.

## Use cases

You can use this integration to:

- Turn KlikAanKlikUit outlets on and off from Home Assistant
- Include KlikAanKlikUit devices in automations, scripts, scenes, and dashboards

## Supported devices

The following devices are known to be compatible:

**KlikAanKlikUit** self-learning devices, including but not limited to most plug-in and built-in KlikAanKlikUit outlets and dimmers.

**Intertechno** self-learning devices:
IT-1500, IT-2300, ITDL-1000, ITDM-250, ITL-1000, ITL-230, ITL-250, ITL-300, ITL-3500, ITL-500, ITLM-1000, ITLR-3500, ITR-1500, ITWR-3500, LBUR-100

**Nexa** self-learning plug-in outlets and dimmers.

**Telldus** self-learning plug-in outlets.

## Prerequisites

Before adding the integration, make sure:

1. You have a working RF transmitter in Home Assistant.
2. The transmitter supports 433.92 MHz OOK.
3. You know the device's values you want to use:
   - Device ID
   - Channel (unit number)
   - Whether you use a group command


{% include integrations/config_flow.md %}

{% configuration_basic %}
Radio frequency transmitter:
    description: "The RF transmitter entity to use for sending commands. You need a compatible transmitter that supports 433.92 MHz OOK."
Device ID:
    description: "A unique address for the target device. You can freely choose any number between 0 and 67,108,863, but each device you add must use a different ID. For example, 123456."
Channel:
    description: "The channel (unit code) of the target device (1 to 16)."
Group:
    description: "When enabled, commands are sent to the group address, which controls all devices paired to the same transmitter ID. For example, enable this to turn off all outlets in a room at once."
{% endconfiguration_basic %}

## Supported functionality

The **KlikAanKlikUit** integration provides the following entities.

### Switches

- **Output**
  - **Description**: Turns the device on or off.
  - **Available when**: Always.

## Data updates

This integration does not poll device's state from the device.

Because KlikAanKlikUit RF control is one-way, Home Assistant cannot confirm whether a device actually changed state. The integration uses assumed state and restores the last known state after restart.

## Known limitations

- The protocol is one-way, so state changes made outside Home Assistant are not reported back.
- Dimming support depends on your device's model.

## Pairing devices
How to pair a device depends on its design. Most of them have a learn button. Push and hold it for > 2s until its LED starts flashing. Then, within 30 seconds, issue the integration's pairing function during configuration. Some devices go into learning mode after repowering.

## Troubleshooting

### Can't set up the device 

#### Symptom: No compatible transmitter to select is shown

When trying to add a device no transmitter can be selected in the configuration dialog.

#### Description

This means no compatible transmitter is present for the frequency and modulation type of this device.

#### Resolution

Add a transmitter which supports the frequency 433.92 MHz and modulation type OOK.

### Device does not react

#### Symptom: When sending on/off commands the device does not react

#### Description

This means the device does not receive the commands of the transmitter.

#### Resolution

Reduce distance between transmitter and device.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
