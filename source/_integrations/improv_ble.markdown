---
title: Improv via BLE
description: Send your Wi-Fi details over Bluetooth to Wi-Fi devices that support Improv, such as ESP32 devices running ESPHome, so they can join your Wi-Fi network.
ha_release: 2023.11
ha_bluetooth: true
ha_categories:
  - diy_makers.boards_hardware
ha_codeowners:
  - '@emontnemery'
ha_domain: improv_ble
ha_integration_type: device
ha_iot_class: Local Polling
ha_config_flow: true
---

The **Improv via BLE** {% term integration %} sends your Wi-Fi network name and password to a Wi-Fi device over Bluetooth, so the device can join your Wi-Fi network. It works with Wi-Fi devices that support the open [Improv via BLE](https://www.improv-wifi.com/ble/) standard, such as many devices with an ESP32 chip that run [ESPHome](/integrations/esphome/). After the device is on your Wi-Fi network, it communicates with Home Assistant over Wi-Fi.

## Difference between Improv via BLE devices and other Bluetooth devices

Improv via BLE devices and other Bluetooth devices both use Bluetooth, but in a different way:

- Improv via BLE devices are Wi-Fi devices. They use Bluetooth only once, to receive your Wi-Fi network name and password. After that, they communicate with Home Assistant over Wi-Fi, and you add them with their own integration, such as [ESPHome](/integrations/esphome/).
- Other Bluetooth devices, such as BLE thermometers or plant sensors, send their data over Bluetooth all the time. They don't join your Wi-Fi network and don't use Improv via BLE. You add them with their own integration, such as [Xiaomi BLE](/integrations/xiaomi_ble/).

If your device supports Improv via BLE, Home Assistant shows it under **Discovered** as **Improv via BLE** while it isn't connected to a Wi-Fi network yet.

## Prerequisites

- The [Bluetooth](/integrations/bluetooth) integration must be set up and working, unless you use the Companion app.
- The Wi-Fi device supports Improv via BLE and isn't connected to a Wi-Fi network yet.
- One of the following is within Bluetooth range of the Wi-Fi device. It sends your Wi-Fi details to the device:
  - The Bluetooth adapter of your Home Assistant server.
  - A [Bluetooth proxy](/integrations/bluetooth/#remote-adapters-bluetooth-proxies) that supports active connections.
    - Home Assistant needs a [connection](/integrations/bluetooth/#connection) to the Wi-Fi device to send it your Wi-Fi details. An ESPHome Bluetooth proxy supports this. On ESP32 devices, active connections are turned on by default. Shelly and SMLIGHT proxies only listen to Bluetooth devices, so they can't be used.
  - Your phone with the [Home Assistant Companion app](https://companion.home-assistant.io/), if the app has Bluetooth access.
    - In the app, go to {% my integrations title="**Settings** > **Devices & services**" %}. Wi-Fi devices that your phone finds show up under **Discovered** as **Improv via BLE**.
    - When you start the setup in the app, the app sends the Wi-Fi details itself, even if Home Assistant also found the device.
- Have the name (SSID) and password of your Wi-Fi network ready.
  - Most devices with an ESP32 chip only connect to 2.4 GHz Wi-Fi networks. Most routers provide a 2.4 GHz network by default. Often, it has the same name as the 5 GHz network. Usually, you don't need to change anything.

{% include integrations/config_flow.md discovery=true %}

If the device can identify itself, a menu opens first:

- To check which device you are setting up, select **Identify device**. The device blinks or beeps. Select **Submit** to return to the menu.
- To continue, select **Connect device to a Wi-Fi network**.

{% configuration_basic %}
SSID:
  description: The name of the Wi-Fi network the device should join.
Password:
  description: The password of that Wi-Fi network. Leave it empty if the network has no password.
{% endconfiguration_basic %}

If the device asks for authorization, press the authorization button on the device. For details, refer to the manual of the device.

After the device has joined your Wi-Fi network, add it to Home Assistant with the integration for that device. For example, for a device that runs ESPHome, **Discovered ESPHome device** opens right away. To add the device, select **Submit**. Other devices show up under **Discovered** with their own integration, or show a link to their setup instructions.

## Known limitations

- Improv via BLE only sends your Wi-Fi details to the Wi-Fi device.
  - It doesn't add the Wi-Fi device to Home Assistant, and it doesn't show up in your list of integrations.
  - You add the Wi-Fi device itself with its own integration, for example, [ESPHome](/integrations/esphome/).
- It only works for Wi-Fi devices that aren't connected to a Wi-Fi network yet.
- It can't use Bluetooth proxies that don't support active connections, such as Shelly or SMLIGHT proxies.

## Removing the integration

There's nothing to remove. Improv via BLE doesn't keep an entry in your list of integrations, because it only sends your Wi-Fi details to the Wi-Fi device.

To remove a Wi-Fi device that you set up with Improv via BLE, remove it from its own integration, for example, [ESPHome](/integrations/esphome/).
