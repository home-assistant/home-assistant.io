---
title: SwitchBot
description: Instructions on how to set up Switchbot switches.
logo: switchbot.png
ha_category:
  - Switch
ha_release: 0.78
ha_iot_class: Local Polling
ha_codeowners:
  - '@danielhiversen'
---

The `switchbot` switch platform allows you to control Switchbot [devices](https://www.switch-bot.com/).

## Manual Configuration

To enable it, add the following lines to your `configuration.yaml`:

```yaml
switch:
  - platform: switchbot
    mac: 'MAC_ADDRESS'
```

{% configuration %}
mac:
  description: The device MAC address with lower-case letters.
  required: true
  type: string
name:
  description: The name used to display the switch in the frontend.
  required: false
  type: string
{% endconfiguration %}

## Switchbot Entity

There are two attributes available on the Switchbot entity to give you more information about your device.

- `last_run_success`: If `true` if the last action sent to the Switchbot succeeded. This attribute is useful for error trapping when Bluetooth connectivity is intermittent. If `false`, see home-assistant.log for specific error messgages.
- `assumed_state`: Always `true`. If the state of the Switchbot entity cannot be determined, it is assumed to be `on`.
