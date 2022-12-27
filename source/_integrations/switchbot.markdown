---
title: SwitchBot
description: Instructions on how to set up SwitchBot Devices.
ha_category:
  - Binary Sensor
  - Cover
  - Light
  - Sensor
  - Switch
ha_release: 0.78
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
  - '@danielhiversen'
  - '@RenierM26'
  - '@murtas'
  - '@Eloston'
ha_domain: switchbot
ha_bluetooth: true
ha_platforms:
  - binary_sensor
  - cover
  - light
  - sensor
  - switch
ha_config_flow: true
ha_integration_type: integration
---

The SwitchBot integration allows you to control SwitchBot [devices](https://www.switch-bot.com/).

## Prerequisites

In order to use this integration, it is required to have working Bluetooth set up on the device running Home Assistant. A [SwitchBot Hub](https://www.switch-bot.com/search?type=product&q=hub) is not required for this integration.

If you have multiple devices of the same type, you need to get the BTLE MAC address of your device to tell your devices apart. You can find the address for your device using the following steps:

1. Open the SwitchBot app.
2. Open device settings.
3. Click on "Device Info".
4. Write down the BTLE MAC address of your device.

Please note, device names configured in the SwitchBot app are not transferred into Home Assistant.

{% include integrations/config_flow.md %}

## Supported Devices

- Color Bulb (WoBulb)
- Bot (WoHand)
- Contact Sensor (WoContact)
- Curtain (WoCurtain)
- Humidifier (WoHumi)
- Light Strip (WoStrip)
- Meter/Meter Plus 70BB (WoSensorTH)
- Motion Sensor (WoPresence)
- Plug Mini (WoPlug), both the original (model W1901400) and HomeKit-enabled (model W1901401)
- Lock (WoLock)

## SwitchBot Entity

There are three attributes available on the SwitchBot entity to give you more information about your device.

- `last_run_success`: If `true` if the last action sent to the SwitchBot succeeded. This attribute is useful for error trapping when Bluetooth connectivity is intermittent. If `false`, see home-assistant.log for specific error messages.
- `Switch mode`: Specifies the mode of the SwitchBot. If `true` the the SwitchBot is in Pull/Retract mode for toggle switches otherwise the bot is in momentary switch mode.

## SwitchBot Options

- `Retry count`: How many times to retry sending commands to your SwitchBot devices.

## SwitchBot Lock

Integration currently only uses the primary lock state, in dual lock mode not all things might work properly.

### Lock Encryption Key
To be able to use the lock it's encryption key needs to be retrieved from internal SwitchBot API.
In the `PySwitchbot` Python library there is a [script](https://github.com/Danielhiversen/pySwitchbot/blob/master/scripts/get_encryption_key.py) to make the appropriate calls to that API to retrieve your key.
<div class='note warning'>
This script currently doesn't support authentication providers like Google, only username and password accounts can be used.
</div>

You can download the current up-to date version of this script using the following command:
```shell
wget https://raw.githubusercontent.com/Danielhiversen/pySwitchbot/master/scripts/get_encryption_key.py
```
after downloading the script you can obtain your key details by running it with the following parameters:
```shell
python3 get_encryption_key.py MAC_ADDRESS USERNAME
```
where `MAC_ADDRESS` is the MAC address of the lock and `USERNAME` is your username used to log in into the SwitchBot app.
Next you'll be prompted to enter your password, and after that the script should output your `Key ID` and `Encryption key` values required for the lock setup.

## Error codes and troubleshooting

The SwitchBot integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

{% configuration_basic %}
"Config flow could not be loaded":
  description: Possible custom integration conflict, using a different version of PySwitchbot; Try uninstalling the custom integration.
"No unconfigured devices found":
  description: Make sure your devices are powered on and are in range.
{% endconfiguration_basic %}
