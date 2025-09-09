---
title: Husqvarna Automower BLE
description: Instructions on how to integrate Husqvarna Automower BLE lawn mowers into Home Assistant.
ha_category:
  - Lawn Mower
  - Sensor
ha_release: 2024.11
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@alistair23'
ha_platforms:
  - lawn_mower
  - sensor
ha_integration_type: integration
ha_domain: husqvarna_automower_ble
---

The Husqvarna Automower BLE integration provides connectivity with Husqvarna Automowers lawn mowers via a local Bluetooth connection. This allows connecting and controlling an Automower without any accounts, cloud, or network connection.

The integration is based on [AutoMower-BLE](https://github.com/alistair23/AutoMower-BLE), an unofficial reverse engineered Husqvarna Automower Connect BLE library.

### Prerequisites

1. Setup a [Bluetooth controller](https://www.home-assistant.io/integrations/bluetooth/). An ESPHome Bluetooth proxy works well and allows locating a device close to the mower.
2. Enter the pairing mode on the mower. Different models will do this in different ways. For the 305, for example, the mower will enter pairing mode for the first 3 minutes after powering on. Ensure the mower is in pairing mode when adding the integration. This only needs to be done once per BLE controller (so changing the ESPHome device will require a repair).
3. When manually adding the integration to Home Assistant, you will need to enter the mower BLE Mac address. You can find this in the ESPHome logs, on an Android phone, or by some other means.

Pairing can take a few goes. Even when using the official Android application, it can be tricky to get the first pair to succeed. If you are having issues, reboot the mower and try again. The Mower must be paired, not just connected, to work.

### PIN code

Some mowers (Such as the Flymo Easilife that are based on the Husqvarna boards/platform) require a PIN for authentication on the app and the mower. If yours requires this you need to map the PIN to numbers and add them when you add the integration into Home Assistant.
The PIN sequence is translated to digits like this:

On/OFF Power button = 1

Go/Schedule button = 2

Go button = 3

Park button = 4

See below image from operators manual. Which indicates the default pin would be 1234

![image](https://github.com/user-attachments/assets/10c75863-a634-4686-bc4c-15bb128dcad9)

{% include integrations/config_flow.md %}
