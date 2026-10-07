---
title: Adax
description: Instructions on how to integrate Adax heater into Home Assistant.
ha_category:
  - Climate
  - Sensor
ha_release: 2021.8
ha_iot_class: Local Polling
ha_codeowners:
  - '@danielhiversen'
  - '@lazytarget'
ha_domain: adax
ha_config_flow: true
ha_platforms:
  - climate
  - sensor
ha_integration_type: integration
---

The **Adax** {% term integration %} integrates Adax heaters into Home Assistant and can be configured to use a local or cloud interface.

## Local integration

The local integration only works with newer Adax heaters with both Bluetooth and Wi-Fi. Home Assistant uses Bluetooth LE to configure the heaters, this means the machine _running_ Home Assistant needs to have a Bluetooth adapter and the heater needs to be in range during setup. Using local control will disable cloud communication and the Adax app will not work.

1. Reset the heater by pressing **+** and **OK** until the display shows **Reset**.
2. Press and hold the **OK** button on the heater until the blue LED starts blinking.
3. Press **Submit**.

This process may take several minutes.

### Local (manual)

If your Adax heater is already connected to your local network (Wi-Fi) or was provisioned outside Home Assistant, you can configure it directly using the manual local option without re-provisioning.

This is particularly useful when running Home Assistant in a Docker container, virtual machine, or on a remote server that lacks Bluetooth hardware or access required for the initial BLE provisioning flow, while still having network access to the heater.

To configure an existing heater manually, select **Local (manual)** in the setup flow and provide:

- **IP address**: The local IP address assigned to the heater on your network.
- **MAC address**: The MAC address of the heater (e.g., `AA:BB:CC:DD:EE:FF`).
- **Token**: The local authentication/access token for the heater.

{% note %}
The access token and MAC address can be obtained via Bluetooth Low Energy (BLE). For instructions on configuring device credentials via BLE, refer to the [official Adax API documentation](https://adax.no/wi-fi/api-development/#local).
{% endnote %}

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

## Energy monitoring

When using the cloud integration, the Adax integration provides energy monitoring sensors that track the power consumption of your heaters. These sensors are only available when using the cloud connection, as the local integration does not support energy data.

The integration creates the following energy sensors:

- **Individual energy sensors** - One sensor for each Adax heater showing its energy consumption in Wh

The energy sensors use the `total_increasing` state class, making them suitable for use with Home Assistant's energy dashboard to track your heating costs and consumption over time.
