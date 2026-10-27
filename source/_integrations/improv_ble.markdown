---
description: Send your Wi-Fi details over Bluetooth to Wi-Fi devices that support Improv, such as ESP32 devices running ESPHome, so they can join your Wi-Fi network.
ha_release: 2023.11
ha_domain: improv_ble
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
- Improv via BLE only works for Wi-Fi devices that aren't connected to a Wi-Fi network yet.
- If Improv via BLE uses a Bluetooth proxy, the proxy must support [active connections](/integrations/bluetooth/#connection), such as an ESPHome proxy. Shelly and SMLIGHT proxies can't make connections.

## Troubleshooting

{% details "The Wi-Fi device can't join your Wi-Fi network" %}

### Symptom: "The device could not connect to the Wi-Fi network"

After you enter your Wi-Fi details, the form shows the message "The device could not connect to the Wi-Fi network. Check that the SSID and password are correct and try again."

#### Description

The Wi-Fi device received your Wi-Fi details, but it couldn't join your Wi-Fi network with them.

#### Resolution

1. Check that the **SSID** matches the name of your Wi-Fi network exactly, including uppercase and lowercase letters.
2. Check the **Password**.
3. Make sure your router provides a 2.4 GHz Wi-Fi network. Most devices with an ESP32 chip only connect to 2.4 GHz Wi-Fi networks.
4. Make sure the Wi-Fi device is within range of your Wi-Fi network.
5. Enter your Wi-Fi details again, and select **Submit**.

{% enddetails %}

{% details "The setup stops with a message that the Wi-Fi device is already connected" %}

### Symptom: "The device is either already connected to Wi-Fi, or no longer able to connect to Wi-Fi"

During the setup, it stops with the message "The device is either already connected to Wi-Fi, or no longer able to connect to Wi-Fi. If you want to connect it to another network, try factory resetting it first."

#### Description

The Wi-Fi device no longer accepts Wi-Fi details over Bluetooth. Usually, this is because it's already connected to a Wi-Fi network.

#### Resolution

- If the Wi-Fi device is already on your Wi-Fi network, you don't need Improv via BLE. Add the device with its own integration, for example, [ESPHome](/integrations/esphome/).
- To connect the Wi-Fi device to a different Wi-Fi network, reset it to its factory settings first. For the steps, refer to the manual of the device. Then, set it up again.

{% enddetails %}

{% details "The setup stops with the message Failed to connect" %}

### Symptom: "Failed to connect"

During the setup, it stops with the message "Failed to connect".

#### Description

Home Assistant couldn't make a Bluetooth connection to the Wi-Fi device. To send your Wi-Fi details, Home Assistant needs a connection to the device.

#### Resolution

- Move the Wi-Fi device closer to your Home Assistant server, or to an ESPHome Bluetooth proxy.
- If the only Bluetooth proxy within range is a Shelly or SMLIGHT proxy, use another way to send the Wi-Fi details. These proxies can't make connections. For the options, refer to [Prerequisites](#prerequisites).
- Then, start the setup again.

{% enddetails %}

{% details "A Wi-Fi device keeps showing up under Discovered" %}

### Symptom: The same Improv via BLE device keeps showing up under **Discovered**

A Wi-Fi device keeps showing up under **Discovered** as **Improv via BLE**, also after a restart of Home Assistant, and you don't want to set it up.

#### Description

The Wi-Fi device isn't connected to a Wi-Fi network, so it keeps announcing over Bluetooth that it supports Improv via BLE. For example, it's a spare device, a neighbor's device within Bluetooth range, or a device that lost its Wi-Fi network. As soon as a device is connected to Wi-Fi, it stops showing up under **Discovered** by itself.

#### Resolution

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Under **Discovered**, on the card of the Wi-Fi device, select **Ignore**.
   - Result: Home Assistant no longer shows the device under **Discovered**.

{% enddetails %}

## Removing the integration

There's nothing to remove. Improv via BLE doesn't keep an entry in your list of integrations, because it only sends your Wi-Fi details to the Wi-Fi device.

To remove a Wi-Fi device that you set up with Improv via BLE, remove it from its own integration, for example, [ESPHome](/integrations/esphome/).
