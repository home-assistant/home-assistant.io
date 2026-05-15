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
ha_domain: kaku_rc
ha_platforms:
  - button
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
- Add brightness control for compatible dimmable receivers
- Pair or unpair receivers from Home Assistant by using built-in learn and unlearn buttons
- Include KlikAanKlikUit devices in automations, scripts, scenes, and dashboards

## Supported devices

The integration is intended for KlikAanKlikUit self-learning RF devices that:

- Use 433.92 MHz OOK transmissions
- Are controlled by protocol-compatible KlikAanKlikUit remotes

### Compatible receivers

The following receivers are known to be compatible:

**KlikAanKlikUit** self-learning receivers, including but not limited to most plug-in and built-in KAK outlets and dimmers.

**Intertechno** self-learning receivers:
IT-1500, IT-2300, ITDL-1000, ITDM-250, ITL-1000, ITL-230, ITL-250, ITL-300, ITL-3500, ITL-500, ITLM-1000, ITLR-3500, ITR-1500, ITWR-3500, LBUR-100

**Nexa** self-learning plug-in outlets and dimmers.

**Telldus** self-learning plug-in outlets.

## Unsupported devices

The following are not supported:

- Devices that use Zigbee, Z-Wave, Wi-Fi, or Bluetooth instead of 433.92 MHz RF
- Devices that do not support the expected KlikAanKlikUit self-learning command format

## Prerequisites

Before adding the integration, make sure:

1. You have a working RF transmitter in Home Assistant.
2. The transmitter supports 433.92 MHz OOK.
3. You know the receiver values you want to use:
   - Device ID
   - Channel (unit number)
   - Whether you use a group command

### Compatible transmitter hardware

Any RF transmitter supported by the [Radio Frequency](/integrations/radio_frequency/) integration that can send 433.92 MHz OOK signals will work. Examples include:

- **ESPHome with CC1101**: A CC1101 transceiver module connected to an ESP32 or ESP8266 and configured in ESPHome using the [RF Bridge](https://esphome.io/) component.
- **[RFM-Gateway with 433 MHz RFM69](https://www.seegel-systeme.de/2023/09/15/rfm-wifi-gateway-a-radio-to-wifi-bridge/)**: An RFM69-based RF gateway integrated into Home Assistant, capable of sending 433.92 MHz OOK signals.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Radio frequency transmitter:
  description: "Select the RF transmitter Home Assistant should use to send commands. Only transmitters that support 433.92 MHz OOK are shown."
Device ID:
  description: "Device identifier used by the KlikAanKlikUit command. Valid range is 0 to 67108863."
Channel:
  description: "Receiver channel or unit number. Valid range is 1 to 16."
Group:
  description: "Enable this if the command should target a group command instead of an individual unit command."
Dimming:
  description: "Enable this if the receiver supports dimming, so Home Assistant creates a light entity with brightness control."
{% endconfiguration_basic %}

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
  - **Description**: Turns the receiver on or off.
  - **Available when**: Always.

### Lights

- **Brightness**
  - **Description**: Controls receiver brightness.
  - **Available when**: You enabled **Dimming** during setup.

### Buttons

- **Learn**
  - **Description**: Sends a learning signal to pair a compatible receiver.
  - **Available when**: Group is disabled.
- **Unlearn**
  - **Description**: Sends an unlearning signal to unpair a compatible receiver.
  - **Available when**: Group is disabled.

## Data updates

This integration does not poll receiver state from the device.

Because KlikAanKlikUit RF control is one-way, Home Assistant cannot confirm whether a receiver actually changed state. The integration uses assumed state and restores the last known state after restart.

## Known limitations

- The protocol is one-way, so state changes made outside Home Assistant are not reported back.
- Learn and unlearn buttons are not created for group entries.
- Dimming support depends on your receiver model.

## Troubleshooting

### No compatible transmitter is shown

Make sure your RF transmitter integration is set up and supports 433.92 MHz OOK.

### Setup error for Device ID or Channel

Make sure the values are in range:

- Device ID: 0 to 67108863
- Channel: 1 to 16

### Receiver does not react

Try these steps:

1. Verify that the selected RF transmitter can control the receiver from the same location.
2. Verify that the receiver is paired for the same Device ID, Channel, and Group values.
3. If needed, use the **Learn** button entity to pair again.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
