---
title: SwitchBot
description: Instructions on how to set up Switchbot switches.
ha_category:
  - Switch
ha_release: 0.78
ha_iot_class: Local Polling
ha_codeowners:
  - '@danielhiversen'
ha_domain: switchbot
ha_platforms:
  - switch
---

The `switchbot` switch platform allows you to control SwitchBot [devices](https://www.switch-bot.com/).


<div class="note">

SwitchBot devices operate over Bluetooth Low Energy (BLE) and require some sort of hub to connect to Home Assistant.  That can either be the [official SwitchBot hub](https://www.switch-bot.com/products/switchbot-hub-mini) or something like [SwitchBot-MQTT-BLE-ESP32](https://github.com/devWaves/SwitchBot-MQTT-BLE-ESP32) running on an ESP32 board.

</div>

## Manual Configuration

To enable it, add the following lines to your `configuration.yaml`:

```yaml
switch:
  - platform: switchbot
    mac: "MAC_ADDRESS"
```

{% configuration %}
mac:
  description: The device MAC address with upper-case letters.
  required: true
  type: string
name:
  description: The name used to display the switch in the frontend.
  required: false
  type: string
password:
  description: The password of the switch if set
  required: false
  type: string
{% endconfiguration %}

## SwitchBot Entity

There are two attributes available on the SwitchBot entity to give you more information about your device.

- `last_run_success`: If `true` if the last action sent to the SwitchBot succeeded. This attribute is useful for error trapping when Bluetooth connectivity is intermittent. If `false`, see home-assistant.log for specific error messages.
- `assumed_state`: Always `true`. If the state of the SwitchBot entity cannot be determined, it is assumed to be `on`.
