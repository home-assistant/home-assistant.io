---
title: eQ-3 Bluetooth Smart Thermostats
description: Instructions on how to integrate eQ-3 Bluetooth Smart Thermostats into Home Assistant.
ha_category:
  - Climate
ha_iot_class: Local Polling
ha_release: 2024.5
ha_config_flow: true
ha_codeowners:
  - '@eulemitkeule'
  - '@dbuezas'
ha_domain: eq3btsmart
ha_integration_type: device
ha_platforms:
  - binary_sensor
  - climate
  - number
  - sensor
  - switch
---

The `eq3btsmart` climate platform allows you to integrate eQ-3 Bluetooth Smart Thermostats.

The current functionality allows setting the temperature as well as controlling the supported modes with help of the [eq3btsmart](https://github.com/eulemitkeule/eq3btsmart) library.
As the device doesn't contain a temperature sensor ([read more](https://forum.fhem.de/index.php/topic,39308.15.html)), we report target temperature also as current one.

### Pairing

Pairing your eQ-3 Bluetooth Smart Thermostat device works differently based on your method of connection and the device's firmware version.

#### [ESPHome Bluetooth Proxies](https://esphome.io/components/bluetooth_proxy.html)

For firmware versions below 148, no additional configuration is required when using ESPHome Bluetooth Proxies.
Since version 148, a security flaw in the devices has been fixed that now requires entering a passkey.

To configure the passkey, add the following to your ESPHome Bluetooth Proxy's configuration:

```yaml
esp32_ble:
  io_capability: keyboard_only

ble_client:
  - mac_address: <MAC>
    id: my_eq3_thermostat
    auto_connect: true
    on_passkey_request:
      then:
        - ble_client.passkey_reply:
            id: my_eq3_thermostat
            passkey: <PIN code displayed on the thermostat. To display the PIN hold down the main button.>
```

For further information see the [ESPHome documentation](https://esphome.io/components/ble_client.html#on-passkey-request).

#### Other

Pairing is only required with firmware versions above 120.<br>
Before configuring Home Assistant you need to pair the thermostat to your Bluetooth adapter using `bluetoothctl`.

```bash
bluetoothctl
scan on
# Wait for the thermostat to show up and copy its MAC address
# Expected output: [NEW] Device 00:1A:23:27:F8:4E CC-RT-BLE
scan off
pair <MAC>
# Hold down the main button on the thermostat to display the PIN
# Enter the displayed PIN when prompted
trust <MAC>
disconnect <MAC>
exit
```

{% include integrations/config_flow.md %}
