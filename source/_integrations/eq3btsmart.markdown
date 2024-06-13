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
ha_quality_scale: silver
ha_platforms:
  - climate
---

The `eq3btsmart` climate platform allows you to integrate eQ-3 Bluetooth Smart Thermostats.

The current functionality allows setting the temperature as well as controlling the supported modes with help of the [eq3btsmart](https://github.com/eulemitkeule/eq3btsmart) library.
As the device doesn't contain a temperature sensor ([read more](https://forum.fhem.de/index.php/topic,39308.15.html)), we report target temperature also as current one.

### Pairing

Pairing is only required with firmware versions above 120 and when not using ESPHome Bluetooth proxies.
Before configuring Home Assistant you need to pair the thermostat to your Bluetooth adapter using `bluetoothctl`.

```bash
bluetoothctl
scan on
<Wait for the thermostat to show up and copy the MAC address. It will look something like this: [NEW] Device 00:1A:23:27:F8:4E CC-RT-BLE>
scan off
pair <MAC>
<Input the PIN displayed on the thermostat. To display the PIN hold down the main button.>
trust <MAC>
disconnect <MAC>
exit
```

{% include integrations/config_flow.md %}
