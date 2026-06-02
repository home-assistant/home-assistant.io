---
title: Intertechno TriState
description: Instructions on how to integrate Intertechno TriState 433.92 MHz RF devices into Home Assistant.
ha_category:
  - Switch
ha_release: 2026.6
ha_iot_class: Assumed State
ha_config_flow: true
ha_codeowners:
  - '@Phunkafizer'
ha_domain: intertechno_tristate
ha_platforms:
  - switch
ha_integration_type: device
ha_quality_scale: bronze
---

The **Intertechno TriState** {% term integration %} lets you control compatible 433.92 MHz RF devices from Home Assistant.

The integration uses the [Radio Frequency](/integrations/radio_frequency/) {% term entity %} platform to send RF commands. That means you first need a compatible RF transmitter in Home Assistant, such as an ESPHome device with 433.92 MHz OOK transmit support.

## Use cases

You can use this integration to:

- Turn compatible Intertechno TriState switches on and off from Home Assistant
- Include those switches in automations, scripts, scenes, and dashboards
- Pair devices during setup by sending a learn command from Home Assistant

## Supported devices

The following devices are known to be compatible:

- Intertechno TriState configurable or self-learning 433.92 MHz switch devices that use house code, group, and channel addressing

## Prerequisites

Before adding the integration, make sure:

1. You have a working RF transmitter in Home Assistant.
2. The transmitter supports 433.92 MHz OOK.
3. You know the target values for your device:
   - House code (A-P)
   - Group (1-4)
   - Channel (1-4)

{% include integrations/config_flow.md %}

When you add a device, you will provide:

- **RF transmitter**
- **House code**: A letter from A to P
- **Group**: A value from 1 to 4
- **Channel**: A value from 1 to 4

During setup, Home Assistant asks you to put the device in pairing mode and then sends a learn command.

## Supported functionality

The **Intertechno TriState** integration provides the following entities.

### Switches

- **Output**
  - **Description**: Turns the device on or off.
  - **Available when**: The selected RF transmitter is available.

## Data updates

This integration does not poll the device state.

Because Intertechno TriState RF control is one-way, Home Assistant cannot confirm whether a device actually changed state. The integration uses assumed state and restores the last known state after restart.

## Known limitations

- The protocol is one-way, so state changes made outside Home Assistant are not reported back.
- Device availability depends on the availability of your selected RF transmitter.

## Troubleshooting

### No compatible transmitter is shown during setup

#### Symptom: You cannot select a transmitter in the setup dialog

When you try to add a device, no RF transmitter appears in the selection list.

#### Description

No compatible transmitter is currently available for 433.92 MHz OOK commands.

#### Resolution

Add or configure a transmitter that supports 433.92 MHz and OOK modulation.

### Device does not react

#### Symptom: The device does not react to on or off commands

#### Description

The device is not receiving the transmitted RF command.

#### Resolution

1. Reduce the distance between transmitter and device.
2. Check that your house code, group, and channel match the device.
3. Repeat setup, put the device back in pairing mode, and confirm that it responds.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}