---
title: Husqvarna Automower BLE
description: Instructions on how to integrate Husqvarna Automower BLE lawn mowers into Home Assistant.
ha_category:
  - Lawn Mower
ha_release: 2024.11
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@alistair23'
ha_platforms:
  - lawn_mower
ha_integration_type: integration
ha_domain: husqvarna_automower_ble
---

The Husqvarna Automower BLE integration provides connectivity with Husqvarna Automowers lawn mowers via a local Bluetooth connection. This allows connecting and controlling an Automower without any accounts, cloud, or network connection.

The integration is based on [AutoMower-BLE](https://github.com/alistair23/AutoMower-BLE), an unofficial reverse engineered Husqvarna Automower Connect BLE library.

There is currently support for the following device types within Home Assistant:

- Lawn Mower

### Prerequisites

1. Setup a [Bluetooth controller](https://www.home-assistant.io/integrations/bluetooth/). An ESPHome Bluetooth proxy works well and allows locating a device close to the mower.
2. Enter the pairing mode on the mower. Different models will do this in different ways. For the 305, for example, the mower will enter pairing mode for the first 3 minutes after powering on. Ensure the mower is in pairing mode when adding the integration. This only needs to be done once per BLE controller (so changing the ESPHome device will require a repair).
3. When adding the integration to Home Assistant, you will need to enter the mower BLE Mac address. You can find this in the ESPHome logs, on an Android phone, or by some other means.

Pairing can take a few goes. Even when using the official Android application, it can be tricky to get the first pair to succeed. If you are having issues, reboot the mower and try again.

{% include integrations/config_flow.md %}
