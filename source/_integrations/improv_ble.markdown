---
title: Improv via BLE
description: The Improv via BLE integration allows connecting devices implementing Improv via BLE to Wi-Fi.
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

The **Improv via BLE** {% term integration %} sends your Wi-Fi network name and password to a Wi-Fi device over Bluetooth, so the device can join your Wi-Fi network. It works with Wi-Fi devices that support the open [Improv via BLE](https://www.improv-wifi.com/ble/) standard, such as many devices with an ESP32 chip that run [ESPHome](/integrations/esphome/). After the device is on your Wi-Fi network, it talks to Home Assistant over Wi-Fi.

## Difference between Improv via BLE devices and other Bluetooth devices

Improv via BLE devices and other Bluetooth devices both use Bluetooth, but in a different way:

- Improv via BLE devices are Wi-Fi devices. They use Bluetooth only once, to receive your Wi-Fi network name and password. After that, they talk to Home Assistant over Wi-Fi, and you add them with their own integration, such as [ESPHome](/integrations/esphome/).
- Other Bluetooth devices, such as BLE thermometers or plant sensors, send their data over Bluetooth all the time. They don't join your Wi-Fi network and don't use Improv via BLE. You add them with their own integration, such as [Xiaomi BLE](/integrations/xiaomi_ble/).

If your device supports Improv via BLE, Home Assistant shows it under **Discovered** as **Improv via BLE** while it isn't connected to a Wi-Fi network yet.

## Prerequisites

- The [Bluetooth](/integrations/bluetooth) integration must be set up and working.
- The Wi-Fi device supports Improv via BLE and isn't connected to a Wi-Fi network yet.
- The Wi-Fi device is within Bluetooth range of Home Assistant or of a [Bluetooth proxy](/integrations/bluetooth/#remote-adapters-bluetooth-proxies).
- Have the name (SSID) and password of your Wi-Fi network ready.
  - Most devices with an ESP32 chip only connect to 2.4 GHz Wi-Fi networks. Most routers provide a 2.4 GHz network by default. Often, it has the same name as the 5 GHz network. Usually, you don't need to change anything.

{% include integrations/config_flow.md discovery=true %}

{% configuration_basic %}
Identify device:
  description: Only shown if the device supports it. The device identifies itself, for example, by blinking or beeping, so you know which device you are setting up.
SSID:
  description: The name of the Wi-Fi network the device should join.
Password:
  description: The password of that Wi-Fi network. Leave it empty if the network has no password.
{% endconfiguration_basic %}

If the device asks for authorization, press the authorization button on the device. For details, refer to the manual of the device.

After the device has joined your Wi-Fi network, add it to Home Assistant with the integration for that device. For example, for a device that runs ESPHome, **Discovered ESPHome device** opens right away. To add the device, select **Submit**. Other devices show up under **Discovered** with their own integration, or show a link to their setup instructions.
