---
title: Rabbit Air
description: Instructions on how to integrate Rabbit Air air purifier within Home Assistant.
ha_category:
  - Fan
ha_iot_class: Local Polling
ha_release: 2024.2
ha_codeowners:
  - '@rabbit-air'
ha_domain: rabbitair
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - fan
ha_integration_type: integration
---

The Rabbit Air integration lets you control your air purifier over the local network. The following device models are currently supported:

- MinusA2 (2-nd generation)
- A3

The fan platform of this integration allows you to turn the unit on/off, select the preset mode, or set the speed manually.

## Prerequisites

To set up the integration, you will need to know a device address and an access token.

1. Open the Rabbit Air mobile app. You will see a list of devices connected to your account.
2. Tap the list item, and the device control page will open.
3. On the device page, select the **Edit** button. You will see a page with the device location and name settings.
4. On this page, quickly tap **Serial Number** several times until you see two more previously hidden lines. The first is the device ID, and the second is the access token.

Note that the device ID is used as an mDNS name of the device. So you can specify it as the "Host" value by adding the suffix ".local" at the end.

For example, you got:

<p class='img'>
  <a href='/images/integrations/rabbitair/access_token.png' target='_blank'>
    <img height='460' src='/images/integrations/rabbitair/access_token.png' alt='Screenshot: Access token on the &quot;Edit device&quot; screen'>
  </a>
</p>

Then you can use `abcdef1234_123456789012345678.local` as the **Host** and `0123456789ABCDEF0123456789ABCDEF` as the **Access Token**.

In some cases the access token may not be available right away, then you will see a "Tap for setup user key" message instead. To generate the access token, tap on this message and follow the instructions. If the app says "your device is not supported", it probably means that you are trying to connect to a first-generation MinusA2 model (an older hardware revision). It is not yet supported by this integration.

{% include integrations/config_flow.md %}

{% configuration_basic %}
host:
  description: Hostname or IP address of the device.
access_token:
  description: Access Token that can be obtained in the Rabbit Air app.
{% endconfiguration_basic %}
