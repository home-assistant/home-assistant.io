---
title: WiZ
description: Instructions on setting up WiZ within Home Assistant.
ha_category:
  - Light
  - Switch
ha_iot_class: Local Push
ha_release: "2022.3"
ha_config_flow: true
ha_codeowners:
  - "@sbidy"
ha_domain: wiz
ha_platforms:
  - light
  - switch
---

The WiZ integration allows you to control your WiZ lights and smart sockets.
The devices are set up through your Wi-Fi network and don't need any additional bridge or gateway.

{% include integrations/config_flow.md %}

## Connect WiZ devices to your network

To connect a WiZ device to your Wi-Fi network, please follow the instructions in the [WiZ app](https://www.wizconnected.com/en/consumer/app/) (available for iOS and Android).
If you have further questions, please have a look into the [WiZ Support Page](https://www.wizconnected.com/en/consumer/support/).

### Enable local connectivity

The integration needs to communicated locally with the WiZ device. This setting **Allow local communication** can be disabled or enabled in WiZ app.
This setting should be enabled by default.

Steps to enable:

1. Open the WiZ app on your phone
2. Click on the settings menu in the upper-left corner
3. Scroll down to the security settings
4. Enable the switch **Allow local communication**
