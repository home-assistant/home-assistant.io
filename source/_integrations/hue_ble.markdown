---
title: Philips Hue BLE
description: Instructions on how to setup Philips Hue Bluetooth lights within Home Assistant.
ha_category:
  - Light
ha_release: 2025.10
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@flip-dots'
ha_domain: hue_ble
ha_platforms:
  - light
ha_bluetooth: true
ha_integration_type: integration
---

The **Hue BLE** {% term integration %} allows you to control your Philips Hue Bluetooth lights with Home Assistant.

## Prerequisites

{% note %}

Before trying to connect your light(s) to Home Assistant, you must put the light(s) into pairing mode in the Philips Hue app ([Android](https://play.google.com/store/apps/details?id=com.philips.lighting.hue2), [iOS](https://apps.apple.com/us/app/philips-hue/id1055281310)).

**Settings** > **Voice Assistants** > **Amazon Alexa** or **Google Home** > **Make Discoverable**.

Once the light is in pairing mode, you can connect to it to Home Assistant. Discovered lights can be found in the discovery section or in the integration setup screen.

{% endnote %}

{% include integrations/config_flow.md %}

## Supported models

{% important %}
This {% term integration %} is tested to work with the following models:
{% endimportant %}

| Model number | Product name                                     |
|--------------|--------------------------------------------------|
| LCA006       | Hue White and Color 1100                         |

The **Philips Hue BLE** integration has been designed to work with other models as well. If you have a different model and it is working, please let us know.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
