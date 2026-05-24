---
title: KlikAanKlikUit RC
description: Instructions on how to integrate KlikAanKlikUit RC and compatible devices into Home Assistant.
ha_category:
  - Button
  - Light
  - Switch
ha_release: 2026.5
ha_iot_class: Assumed State
ha_config_flow: true
ha_codeowners:
  - '@Phunkafizer'
ha_domain: klik_aan_klik_uit_rc
ha_platforms:
  - light
  - switch
ha_integration_type: device
ha_quality_scale: bronze
---

The **KlikAanKlikUit RC** {% term integration %} lets you control self-learning KlikAanKlikUit 433.92 MHz RF devices from Home Assistant.

The integration uses the [Radio Frequency](/integrations/radio_frequency/) {% term entity %} platform to send RF commands. That means you first need a compatible RF transmitter in Home Assistant, such as an ESPHome device with 433.92 MHz OOK transmit support.

## Use cases

You can use this integration to:

- Turn KlikAanKlikUit outlets on and off from Home Assistant
- Add brightness control for compatible dimmable devices
- Pair or unpair devices from Home Assistant by using built-in learn and unlearn buttons
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

## Configuration options

After setup, you can reconfigure the entry from {% my integrations title="**Settings** > **Devices & services**" %}.

The reconfigure flow lets you update:

- Radio frequency transmitter
- Device ID
- Channel
- Group
- Dimming

## Supported functionality

The **KlikAanKlikUit RC** integration provides the following entities.

### Switches

- **Power switch**
  - **Description**: Turns the device on or off.
  - **Available when**: Always.

### Lights

- **Brightness**
  - **Description**: Controls device's brightness.
  - **Available when**: You enabled **Dimming** during setup.

### Buttons

- **Learn**
  - **Description**: Sends a learning signal to pair a compatible device.
  - **Available when**: Group is disabled.
- **Unlearn**
  - **Description**: Sends an unlearning signal to unpair a compatible device.
  - **Available when**: Group is disabled.

## Data updates

This integration does not poll device's state from the device.

Because KlikAanKlikUit RF control is one-way, Home Assistant cannot confirm whether a device actually changed state. The integration uses assumed state and restores the last known state after restart.

## Known limitations

- The protocol is one-way, so state changes made outside Home Assistant are not reported back.
- Learn and unlearn buttons are not created for group entries.
- Dimming support depends on your device's model.

## Pairing devices
- how to pair a device depends on it's design. Most of them have a learn-button. Push it > 2s until it's LED is flashing, then within 30s issue the integration's learn function. Some devices go into learning-mode after repowering.

## Troubleshooting

### No compatible transmitter is shown

Make sure your RF transmitter integration is set up and supports 433.92 MHz OOK.

### Setup error for Device ID or Channel

Make sure the values are in range:

- Device ID: 0 to 67108863
- Channel: 1 to 16

### Devices does not react

Try these steps:

1. Verify that the selected RF transmitter can control the device from the same location.
2. Verify that the device is paired for the same Device ID, Channel, and Group values.
3. If needed, use the **Learn** button entity to pair again.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
