---
title: SwitchBot
description: Instructions on how to set up Switchbot switches.
ha_category:
  - Switch
ha_release: 0.78
ha_iot_class: Local Polling
ha_codeowners:
  - '@danielhiversen'
  - '@RenierM26'
ha_domain: switchbot
ha_platforms:
  - switch
---

The `switchbot` switch platform allows you to control SwitchBot [devices](https://www.switch-bot.com/).

{% include integrations/config_flow.md %}

## SwitchBot Entity

There are three attributes available on the SwitchBot entity to give you more information about your device.

- `last_run_success`: If `true` if the last action sent to the SwitchBot succeeded. This attribute is useful for error trapping when Bluetooth connectivity is intermittent. If `false`, see home-assistant.log for specific error messages.
- `Switch mode`: Specifies the mode of the switchbot. If `true` the the switchbot is in Pull/Retract mode for toggle switches otherwise the bot is in momentary switch mode.
- `MAC address`: The BTLE MAC for the device.
