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

The **Adax** {% term integration %} integrates Adax heaters into Home Assistant and can be configured to use a local or cloud interface.

## Local integration

The local integration only works with newer Adax heaters with both Bluetooth and Wi-Fi. Home Assistant uses Bluetooth LE to configure the heaters, this means the machine _running_ Home Assistant needs to have a Bluetooth adapter and the heater needs to be in range during setup. Using local control will disable cloud communication and the Adax app will not work.

1. Reset the heater by pressing **+** and **OK** until the display shows **Reset**.
2. Press and hold the **OK** button on the heater until the blue LED starts blinking.
3. Press **Submit**.

This process may take several minutes.

## Cloud integration

For the cloud integration, you'll need your Account ID. This can be found in the Adax WiFi app by pressing **Account**. The ID will be shown as a number between the **log out** and **close account** buttons.

You will also need a credential, which you can create in the Adax app:

1. Navigate to the Account tab.
2. Go to **Third party integrations**.
3. Select **Remote API**.
4. Select **Add Credential**.
5. Give some name to the created credential (e.g. 'Home Assistant') and copy the generated password.

In the configuration popup you will need the Account ID, and the generated API password (not the account password)

{% include integrations/config_flow.md %}
