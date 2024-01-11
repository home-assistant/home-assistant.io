---
title: Ecovacs MQTT
description: Instructions on how to integrate Ecovacs mqtt devices within Home Assistant.
ha_category:
  - Vacuum
ha_release: 2024.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@edenhaus'
ha_domain: ecovacs_mqtt
ha_platforms:
  - vacuum
ha_integration_type: hub
---

The Ecovacs MQTT integration integrates newer [Ecovacs](https://www.ecovacs.com) devices. For legacy devices, please see [Ecovacs Legacy](./ecovacs.markdown)

## Prerequisites

To use your Ecovacs device with Home Assistant, you need to have your Ecovacs
device setup, connected to your network, and configured in the Ecovacs app.

You will need the following ecovacs account information:

- Username/ShortID
- Password
- Country, which was selected during account creation

{% include integrations/config_flow.md %}


