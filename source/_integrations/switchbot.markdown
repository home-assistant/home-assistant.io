---
title: SwitchBot
description: Instructions on how to set up SwitchBot Devices.
ha_category:
  - Cover
  - Switch
ha_release: 0.78
ha_iot_class: Local Polling
ha_codeowners:
  - '@danielhiversen'
  - '@RenierM26'
ha_domain: switchbot
ha_platforms:
  - binary_sensor
  - cover
  - sensor
  - switch
ha_config_flow: true
ha_integration_type: integration
---

The SwitchBot integration allows you to control SwitchBot [devices](https://www.switch-bot.com/).

## Prerequisites

In order to use this integration, it is required to have working Bluetooth set up on the device running Home Assistant. A [SwitchBot Hub](https://www.switch-bot.com/search?type=product&q=hub) is not required for this integration.

In order to set up this integration, you need to get the BTLE MAC address of your device. You can find the address for your device using the following steps:

1. Open the SwitchBot app.
2. Open device settings.
3. Click on "Device Info".
4. Write down the BTLE MAC address of your device.

Please note, device names configured in the SwitchBot app are not transferred into Home Assistant.

{% include integrations/config_flow.md %}

## SwitchBot Entity

There are three attributes available on the SwitchBot entity to give you more information about your device.

- `last_run_success`: If `true` if the last action sent to the SwitchBot succeeded. This attribute is useful for error trapping when Bluetooth connectivity is intermittent. If `false`, see home-assistant.log for specific error messages.
- `Switch mode`: Specifies the mode of the SwitchBot. If `true` the the SwitchBot is in Pull/Retract mode for toggle switches otherwise the bot is in momentary switch mode.
- `MAC address`: The BTLE MAC for the device.

## SwitchBot Options

There are four options that can be configured for the SwitchBot entities. Setting any of these options will apply to all of your SwitchBot devices.

- `Time between updates (seconds)`: Increase/Decrease the update interval for the device. (Could impact battery life)
- `Retry count`: How many times to retry sending commands and retry polling your SwitchBot devices.
- `Timeout between retries`: How long to wait before retries.
- `How long to scan for advertisement data`: Bluetooth LE uses advertisement data for device statuses and/or attributes. This setting specifies how long the scan should run.

### Error codes and troubleshooting

{% configuration_basic %}
"Config flow could not be loaded":
  description: Possible custom integration conflict, using a different version of PySwitchbot; Try uninstalling the custom integration.
"No unconfigured devices found":
  description: Make sure your devices are powered on and are in range.
{% endconfiguration_basic %}
