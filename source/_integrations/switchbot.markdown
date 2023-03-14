---
title: SwitchBot
description: Instructions on how to set up SwitchBot Devices.
ha_category:
  - Binary Sensor
  - Cover
  - Light
  - Lock
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
  - '@dsypniewski'
ha_domain: switchbot
ha_bluetooth: true
ha_platforms:
  - binary_sensor
  - cover
  - humidifier
  - light
  - lock
  - sensor
  - switch
ha_config_flow: true
ha_integration_type: integration
---

The SwitchBot integration allows you to control SwitchBot [devices](https://www.switch-bot.com/).

## Prerequisites

In order to use this integration, it is required to have working Bluetooth set up on the device running Home Assistant. A [SwitchBot Hub](https://switch-bot.com/pages/switchbot-hub-mini) is not required for this integration.

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
- Blind Tilt (WoBlindTilt)

## SwitchBot Entity

There are three attributes available on the SwitchBot entity to give you more information about your device.

- `last_run_success`: If `true` if the last action sent to the SwitchBot succeeded. This attribute is useful for error trapping when Bluetooth connectivity is intermittent. If `false`, see home-assistant.log for specific error messages.
- `Switch mode`: Specifies the mode of the SwitchBot. If `true` the the SwitchBot is in Pull/Retract mode for toggle switches otherwise the bot is in momentary switch mode.

## SwitchBot Options

- `Retry count`: How many times to retry sending commands to your SwitchBot devices.

## SwitchBot Lock

The integration currently only uses the primary lock state; in dual lock mode, not all things might work properly.

A SwitchBot lock can be set up in Home Assistant in two different ways. You can enter the key id and encryption key yourself, or Home Assistant can import them from your SwitchBot account.

### SwitchBot account (recommended)

Using this option you can provide your SwitchBot account login credentials and Home Assistant will import the appropriate encryption key from your account.

{% configuration_basic %}
Username:
  description: SwitchBot account username
Password:
  description: SwitchBot account password
{% endconfiguration_basic %}

<div class='note warning'>
This integration doesn't support SSO accounts (Login with Google, etc.) only username and password accounts.
</div>

### Enter the lock encryption key manually

This option is for those that would rather obtain the encryption key themselves, and/or want to know exactly where and how are their account credentials used.

{% configuration_basic %}
Key ID:
  description: Locks' encryption key ID
Encryption key:
  description: Locks' encryption key
{% endconfiguration_basic %}

For instructions on how to obtain the locks encryption key, see README in [PySwitchbot](https://github.com/Danielhiversen/pySwitchbot#obtaining-locks-encryption-key) project.

## SwitchBot Blind Tilt

The blind tilt is exposed as a cover entity with control of the tilt position only:

| Tilt Position | Blind State |
| ------------- | ----------- |
| 100%          | Closed Up   |
| 50%           | Fully Open  |
| 0%            | Closed Down |

The close button will close the blinds to the closest closed position (either 0% or 100%), and defaults to closing down if the blinds are fully open. Because Home Assistant believes 100% is open, the default cards will disable the open button when the tilt is at 100%, but the service call will still work and open the blind to 50%.

### Simple cover template entity

Some integrations may expose your SwitchBot Blind Tilt to other services which expect that 100% is open and 0% is fully closed. Using a [Cover Template](/integrations/cover.template), a proxy entity can be created which will be open at 100% and closed at 0%. This template entity is limited to closing in one direction.

{% raw %}

```yaml
# Example configuration.yaml entry
cover:
  - platform: template
    covers:
      example_blinds_simple:
        device_class: blind
        friendly_name: Example Blinds (Simple Down)
        open_cover:
          service: cover.set_cover_tilt_position
          data:
            tilt_position: 50
          target:
            entity_id: cover.example_blinds
        close_cover:
          service: cover.set_cover_tilt_position
          data:
            tilt_position: 0
          target:
            entity_id: cover.example_blinds
        position_template: >
          {{ int(states.cover.example_blinds.attributes.current_tilt_position)*2 }}
        set_cover_position:
          service: cover.set_cover_tilt_position
          data:
            tilt_position: "{{position/2}}"
          target:
            entity_id: cover.example_blinds
```

{% endraw %}

## Error codes and troubleshooting

The SwitchBot integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

{% configuration_basic %}
"Config flow could not be loaded":
  description: Possible custom integration conflict, using a different version of PySwitchbot; Try uninstalling the custom integration.
"No unconfigured devices found":
  description: Make sure your devices are powered on and are in range.
{% endconfiguration_basic %}
