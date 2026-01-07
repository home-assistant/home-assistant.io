---
title: Fluss+
description: Instructions on how to integrate Fluss+ devices within Home Assistant.
ha_category:
  - Button
ha_release: 2026.1
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fluss'
ha_domain: fluss
ha_config_flow: true
ha_platforms:
  - button
ha_integration_type: integration
---

The **Fluss+** {% term integration %} allows you to control [Fluss+](https://fluss.io/) devices through Home Assistant. Fluss turns your phone into a remote key that can open your garage, your gate, your door or even the parking at your office - giving you complete control. The Home Assistant integration allows you to trigger Fluss+ devices via Wi-Fi to open or close a connected motor device.

## Prerequisites

- A Fluss+ device (Can order here: https://fluss.io/flussplus).
- A Fluss+ account.
- The Fluss+ app installed on your smart phone.
- A Fluss+ device physcially connected to your device (for example, a garage door opener).
- Fluss+ device connected to your Wi-Fi network and has internet access.
- During setup of the integration in Home Assistant, you will be prompted to input your API key.
  - You can request an API key in the Fluss+ app under your profile settings.
  - The API key will allow you to access your Fluss+ devices and trigger them through Home Assistant.

{% include integrations/config_flow.md %}

### Button

A button in Home Assistant represents a Fluss device you have access to. You can press the button for a certain device via Wi-Fi, and it will then send a command to the connected device (like a garage door opener).

#### Example

If you have access to three devices in the Fluss+ app, named "Home Garage Door," "Front Gate," and "Office Park," Home Assistant will display three buttons, each labeled with the corresponding device name. Pressing the "Home Garage Door" button sends a command to the Fluss+ device connected to your garage door opener, which will then trigger the motor to open / close. The same applies to the other devices.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
