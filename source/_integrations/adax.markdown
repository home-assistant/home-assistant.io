---
title: Adax
description: Instructions on how to integrate Adax heater into Home Assistant.
ha_category:
  - Climate
ha_release: 2021.8
ha_iot_class: Local Polling
ha_codeowners:
  - '@danielhiversen'
ha_domain: adax
ha_config_flow: true
ha_platforms:
  - climate
ha_integration_type: integration
---

Integrates Adax heater into Home Assistant.

You can configure the heaters to use a local or cloud interface.

The local integrations only works with newer Adax heaters with both Bluetooth and wifi. Home Assistant uses Bluetooth to configure the heaters. For the local integration, you have to reset the heater by pressing + and OK until the display shows 'Reset'. Then press and hold the OK button on the heater until the blue LED starts blinking before pressing Submit. Configuring the heater might take some minutes. Using the local integration will disable cloud communication and the Adax app will not work.

For the cloud integration, you'll need the Account ID (which can be found in the Adax Wifi app, pressing 'Account'). You will also need a credential, which you can create in the Adax app:

1. Navigate to Account Tab,
2. Select “Remote user client API”
3. Select “Add Credential”
4. Give some name to the created credential and copy the generated password.

{% include integrations/config_flow.md %}
