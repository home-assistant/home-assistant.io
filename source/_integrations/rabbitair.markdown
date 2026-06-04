---
title: Rabbit Air
description: Instructions on how to integrate Rabbit Air air purifier within Home Assistant.
ha_category:
  - Fan
  - Sensor
ha_iot_class: Local Polling
ha_release: 2024.2
ha_codeowners:
  - '@rabbit-air'
ha_domain: rabbitair
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - fan
  - sensor
ha_integration_type: device
---

The **Rabbit Air** {% term integration %} lets you control your air purifier over the local network. The following device models are currently supported:

- MinusA2 (2-nd generation)
- A3

The fan platform of this integration allows you to turn the unit on/off, select the preset mode, or set the speed manually. The sensor platform provides the current air quality reported by the device.

## Prerequisites

To set up the integration, you need the **Thing ID** and **User key** from the **Rabbit Air 2** app. In Home Assistant, use the **Thing ID** as part of the `host` and the **User key** for `access_token`.

1. Open the **Rabbit Air 2** app. You will see a list of devices connected to your account.
2. Tap your Rabbit Air device to open the device control page.
3. In the top right corner, tap the three-dot menu and select **Rename**.
4. On the **Rename device** screen, tap your device name (for example, **MinusA2**) to expand the section and reveal the **Thing ID** and **User key**.

The **Thing ID** is the device's mDNS hostname. You can use the **Thing ID** for `host` by adding the suffix `.local` at the end. Use the **User key** for `access_token`.

For example, the app shows:

<p class='img'>
  <a href='/images/integrations/rabbitair/rename_device_menu.jpg' target='_blank'>
    <img height='460' src='/images/integrations/rabbitair/rename_device_menu.jpg' alt='Screenshot: Rabbit Air 2 device menu with Rename selected'>
  </a>
  <a href='/images/integrations/rabbitair/rename_device_keys.jpg' target='_blank'>
    <img height='460' src='/images/integrations/rabbitair/rename_device_keys.jpg' alt='Screenshot: Rabbit Air 2 Rename device screen showing Thing ID and User key'>
  </a>
</p>

Then use the **Thing ID** for `host` and the **User key** for `access_token`.

If the app says "your device is not supported", it probably means that you are trying to connect to a first-generation MinusA2 model (an older hardware revision). It is not yet supported by this integration.

{% include integrations/config_flow.md %}

{% configuration_basic %}
host:
  description: Hostname or IP address of the device.
access_token:
  description: Access Token that can be obtained in the Rabbit Air app.
{% endconfiguration_basic %}
