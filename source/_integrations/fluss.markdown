---
title: Fluss+
description: Instructions on how to integrate Fluss+ devices within Home Assistant.
ha_category:
  - Button
ha_release: "2025.6"
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fluss'
ha_domain: fluss
ha_config_flow: true
ha_platforms:
  - button
ha_integration_type: integration
---

The **Fluss+** {% term integration %} allows you to control [Fluss+](https://fluss.io/) devices through Home Assistant. Fluss turns your phone into a remote key that can open your garage, your gate, your door or even the parking at your office - giving you complete control.

## Prerequisites

- A Fluss+ account.
- The Fluss+ app installed on your smart phone.
- Fluss+ device connected to your Wi-Fi network and has internet access.
- During setup of the integration in Home Assistant, you will be prompted to input your API key.
   - You can request an API key in the Fluss+ app under your profile settings.

{% include integrations/config_flow.md %}


### Button

A button in Home Assistant represents a Fluss device you can trigger via Wi-Fi. For example, if you have 3 devices, you will see 3 buttons. 

Each button can be triggered via Wi-Fi as long it's connected to the internet. The button will be triggered when you press it in Home Assistant.

## Services

### Service `fluss.press`

Trigger a Fluss device by simulating a button press.

| Service data attribute | Optional | Description |
|-----------------------|----------|-------------|
| `entity_id`           | No       | The entity ID of the Fluss button to press (e.g., `button.fluss_12345`). |

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
