---
title: SwitchBot Bluetooth
description: Instructions on how to set up SwitchBot Devices.
ha_category:
  - Binary sensor
  - Cover
  - Fan
  - Humidifier
  - Light
  - Lock
  - Sensor
  - Switch
  - Vacuum
ha_release: 0.78
ha_iot_class: Local Push
ha_codeowners:
  - '@danielhiversen'
  - '@RenierM26'
  - '@murtas'
  - '@Eloston'
  - '@dsypniewski'
  - '@zerzhang'
ha_domain: switchbot
works_with:
  - bluetooth
ha_bluetooth: true
ha_platforms:
  - binary_sensor
  - cover
  - diagnostics
  - fan
  - humidifier
  - light
  - lock
  - sensor
  - switch
  - vacuum
ha_config_flow: true
ha_integration_type: integration
ha_quality_scale: gold
---

The SwitchBot integration allows you to control SwitchBot [devices](https://www.switch-bot.com/) such as sensors, locks, shades, lights, plugs, robot vacuums, hubs and etc.

## How you can use this integration

The SwitchBot integration lets you do many things, such as switching devices on and off, changing device modes, monitoring sensor data and energy usage in the Home Assistant dashboards, and controlling device configurations manually or via automations.

## Prerequisites

In order to use this integration, it is required to have working [Bluetooth](/integrations/bluetooth) set up on the device running Home Assistant. A [SwitchBot Hub](https://switch-bot.com/pages/switchbot-hub-mini) is not required for this integration.

If you have multiple devices of the same type, you need to get the BTLE MAC address of your device to tell your devices apart. You can find the address for your device using the following steps:

1. Open the SwitchBot app.
2. Open device settings.
3. Click on "Device Info".
4. Write down the BTLE MAC address of your device.

Please note, device names configured in the SwitchBot app are not transferred into Home Assistant.

Some SwitchBot devices need to be configured within the app before being controlled by Home Assistant, such as calibrating the cover open/close limits or pairing two covers to move together.



### Adding encrypted SwitchBot devices

Some types of the SwitchBot devices are encrypted for improved security. More types and models will be added as encrypted devices in the future.

An encrypted SwitchBot device can be set up in Home Assistant in two different ways.
You can enter the key ID and encryption key yourself, or Home Assistant can import them from your SwitchBot account.

#### SwitchBot account (recommended)

Using this option you can provide your SwitchBot account login credentials and Home Assistant will import the appropriate encryption key from your account.

{% configuration_basic %}
Username:
  description: SwitchBot account username
Password:
  description: SwitchBot account password
{% endconfiguration_basic %}

{% important %}
This integration doesn't support SSO accounts (Login with Google, etc.) only username and password accounts.
{% endimportant %}

#### Enter the lock encryption key manually

This option is for those that would rather obtain the encryption key themselves, and/or want to know exactly where and how are their account credentials used.

{% configuration_basic %}
Key ID:
  description: Locks' encryption key ID
Encryption key:
  description: Locks' encryption key
{% endconfiguration_basic %}

For instructions on how to obtain the encryption key, see README in [PySwitchbot](https://github.com/Danielhiversen/pySwitchbot#obtaining-locks-encryption-key) project.

{% include integrations/config_flow.md %}

## Supported devices

### Plugs and switches

- [Bot (WoHand)](https://switch-bot.com/pages/switchbot-bot)
- [Plug Mini (WoPlug)](https://www.switch-bot.com/products/switchbot-plug-mini)
- [Plug Mini (HomeKit Enabled)](https://www.switch-bot.com/products/switchbot-plug-mini-homekit-enabled)
- [Relay Switch 1](https://www.switch-bot.com/products/switchbot-relay-switch-1)
- [Relay Switch 1PM](https://www.switch-bot.com/products/switchbot-relay-switch-1pm)

### Cover

- [Curtain (WoCurtain)](https://switch-bot.com/pages/switchbot-curtain) (version 1 & 2)
- [Curtain 3 (WoCtn3)](https://switch-bot.com/pages/switchbot-curtain-3)
- [Blind Tilt (WoBlindTilt)](https://switch-bot.com/pages/switchbot-blind-tilt)
- [Roller Shade](https://www.switch-bot.com/products/switchbot-roller-shade)

### Lights

- [Color Bulb (WoBulb)](https://switch-bot.com/pages/switchbot-color-bulb)
- [Light Strip (WoStrip)](https://www.switchbot.jp/products/switchbot-strip-light)
- [Smart Ceiling Light (WoCeiling)](https://www.switchbot.jp/products/switchbot-ceiling-light)
- [Strip Light 3](https://www.switch-bot.com/products/switchbot-led-strip-light-3)
- [Floor Lamp](https://www.switch-bot.com/products/switchbot-floor-lamp)

### Locks

- [Lock (WoLock)](https://switch-bot.com/pages/switchbot-lock)
- [Lock Pro (WoLockPro)](https://www.switch-bot.com/pages/switchbot-lock-pro)
- [Lock Ultra (WoLockUltra)](https://www.switch-bot.com/products/switchbot-lock-ultra)
- [Lock Lite (WoLockLite)](https://www.switchbot.jp/products/switchbot-lock-lite)

### Humidifiers

- [Humidifier (WoHumi)](https://www.switchbot.jp/products/switchbot-smart-humidifier)
- [Evaporative Humidifier](https://www.switch-bot.com/products/switchbot-evaporative-humidifier-auto-refill)

### Sensors

- [Meter](https://switch-bot.com/pages/switchbot-meter)
- [Meter Plus (WoSensorTH)](https://switch-bot.com/pages/switchbot-meter-plus)
- [Indoor/Outdoor Meter (WoIOSensorTH)](https://switch-bot.com/pages/switchbot-indoor-outdoor-thermo-hygrometer) 
- [Meter Pro](https://www.switch-bot.com/products/switchbot-meter-pro)
- [Meter Pro CO2 Monitor](https://www.switch-bot.com/products/switchbot-meter-pro-co2-monitor)
- [Contact Sensor (WoContact)](https://switch-bot.com/pages/switchbot-contact-sensor)
- [Motion Sensor (WoPresence)](https://switch-bot.com/pages/switchbot-motion-sensor)
- [Water Leak Detector](https://www.switch-bot.com/products/switchbot-water-leak-detector)
- [Remote (WoRemote)](https://www.switch-bot.com/products/switchbot-remote) (currently only supports battery level monitoring)

### Hubs

- [Hub 2 (WoHub2)](https://switch-bot.com/pages/switchbot-hub-2) (currently only supports retrieving sensor data, does not yet support device control)
- [Hub Mini Matter Enabled](https://www.switch-bot.com/products/switchbot-hub-mini-matter-enabled)(currently only supports retrieving sensor data, does not yet support device control)
- [Hub 3 (WoHub3)](https://www.switch-bot.com/products/switchbot-hub-3)(currently only supports retrieving sensor data, does not yet support device control)

### Fans

- [Circulator Fan](https://www.switch-bot.com/products/switchbot-battery-circulator-fan)

### Vacuums
- [K10+](https://www.switch-bot.com/products/switchbot-mini-robot-vacuum-k10)
- [K10+ Pro](https://www.switch-bot.com/products/switchbot-mini-robot-vacuum-k10-pro)
- [K10+ Pro Combo](https://www.switch-bot.com/products/switchbot-k10-pro-combo)
- [K20](https://www.switchbot.jp/products/switchbot-robot-vacuum-cleaner-k20-pro)
- [S10](https://www.switch-bot.com/products/switchbot-floor-cleaning-robot-s10)

### Air purifiers

- [Air Purifier](https://www.switch-bot.com/products/switchbot-air-purifier)
- [Air Purifier Table](https://www.switch-bot.com/products/switchbot-air-purifier-table)

## Works with Home Assistant

SwitchBot is committed to making sure their products are up-to-date and ready to use in Home Assistant.
Devices are certified for both Bluetooth and Matter.

The following devices are certified for Bluetooth:
- [SwitchBot Lock Ultra](https://www.switch-bot.com/products/switchbot-lock-ultra)
- [SwitchBot Air Purifier](https://www.switch-bot.com/products/switchbot-air-purifier)
- [SwitchBot Air Purifier Table](https://www.switch-bot.com/products/switchbot-air-purifier-table)
- [SwitchBot Leak Detector](https://www.switch-bot.com/products/switchbot-water-leak-detector)
- [SwitchBot Meter](https://www.switch-bot.com/products/switchbot-meter)
- [SwitchBot Meter Pro](https://www.switch-bot.com/products/switchbot-meter-pro)
- [SwitchBot Meter Pro CO2](https://www.switch-bot.com/products/switchbot-meter-pro-co2-monitor)
- [SwitchBot Indoor/Outdoor Thermo-Hygrometer](https://www.switch-bot.com/products/switchbot-indoor-outdoor-thermo-hygrometer)
- [SwitchBot Curtain 3](https://www.switch-bot.com/products/switchbot-curtain-3)
- [SwitchBot Contact Sensor](https://www.switch-bot.com/products/contact-sensor)
- [SwitchBot Roller Shade](https://www.switch-bot.com/products/switchbot-roller-shade)
- [SwitchBot Lock Pro](https://www.switch-bot.com/products/switchbot-lock-pro)

To see the list of SwitchBot Matter-certified devices, visit the [SwitchBot Matter](/integrations/switchbot_matter/) page.

## Supported functionality

### Common

#### Options
- `Retry count`: How many times to retry sending commands to your SwitchBot devices.

#### Attributes
- `last_run_success`: Returns `true` if the last action sent to the SwitchBot succeeded. This attribute is useful for error trapping when Bluetooth connectivity is intermittent. If `false`, see home-assistant.log for specific error messages.

### Plugs and switches

Switch entities are added for Bot, Plug Mini, and Relay Switch.

#### Bot

Password protection: You can set a device password in the SwitchBot app to prevent people nearby take control of your device. When a password is set, you need to enter the correct password in order to add it to the integrations.

Features:

- turn on or off
- press
- get battery level

Attributes:
- `Switch mode`: Specifies the mode of the device. If `true`, the device is in Pull/Retract mode for toggle switches otherwise the device is in momentary switch mode.

#### Plug Mini

Features:

- turn on or off
- get power consumption readings

#### Relay Switch 1

This is an encrypted device.

Features:

- turn on or off

#### Relay Switch 1PM

This is an encrypted device.

Features:

- turn on or off
- get power
- get voltage
- get current

### Cover

Cover entities are added for Curtain, Curtain 3, Blind Tilt, and Roller Shade.

#### Curtain

Features:

- open/close/pause
- set position
- get position
- get light level
- get battery level
- get calibration state

#### Curtain 3

Features:

- open/close/pause
- set position
- get position
- get light level
- get battery level
- get calibration state

#### Blind Tilt

Features:

- close up/close down/pause
- set position
- get position
- get light level
- get battery level
- get calibration state

The blind tilt is exposed as a cover entity with control of the tilt position only:

| Tilt Position | Blind State |
| ------------- | ----------- |
| 100%          | Closed Up   |
| 50%           | Fully Open  |
| 0%            | Closed Down |

The close button will close the blinds to the closest closed position (either 0% or 100%), and defaults to closing down if the blinds are fully open. Because Home Assistant believes 100% is open, the default cards will disable the open button when the tilt is at 100%, but the action will still work and open the blind to 50%.

##### Simple cover template entity

Some integrations may expose your SwitchBot Blind Tilt to other actions which expect that 100% is open and 0% is fully closed. Using a [Cover Template](/integrations/template/#cover), a proxy entity can be created which will be open at 100% and closed at 0%. This template entity is limited to closing in one direction.

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
          action: cover.set_cover_tilt_position
          data:
            tilt_position: 50
          target:
            entity_id: cover.example_blinds
        close_cover:
          action: cover.set_cover_tilt_position
          data:
            tilt_position: 0
          target:
            entity_id: cover.example_blinds
        position_template: >
          {{ int(states.cover.example_blinds.attributes.current_tilt_position)*2 }}
        set_cover_position:
          action: cover.set_cover_tilt_position
          data:
            tilt_position: "{{position/2}}"
          target:
            entity_id: cover.example_blinds
```

{% endraw %}

#### Roller Shade
The Roller Shade is exposed as a cover entity with control of the position only:

| position | Roller Shade state |
| -------- | ------------------ |
| <=20%    | Open               |
| >20%     | Close              |

Features:

- open/close/pause
- set position
- get position
- get battery level

### Sensors

Sensor entiteis are added for thermometer and hygrometer devices, motion sensor, contact sensor, leak sensor, and remote button.

#### Meter

Features:

- get temperature
- get humidity
- get battery level

#### Meter Plus

Features:

- get temperature
- get humidity
- get battery level

#### Indoor/Outdoor Meter

Features:

- get temperature
- get humidity
- get battery level

#### Meter Pro

Features:

- get temperature
- get humidity
- get battery level

#### Meter Pro CO2 Monitor

Features:

- get temperature
- get humidity
- get carbon dioxide
- get battery level

#### Contact Sensor

Features:

- open or closed state
- motion detection state
- get battery level

#### Motion Sensor

Features:

- motion detection state
- get battery level

#### Water Leak Detector

This is an encrypted device.

Features:

- leak or dry state
- get battery level

#### Remote

Features:
- get battery level

### Lights

Light entities are added for Color Bulb, LED Strip Light, and Ceiling Light.

#### Ceiling Light

Features:

- turn on or off
- change brightness
- change color temperature

#### Color Bulb

Features:
- turn on or off
- change brightness
- change color temperature
- change color
- set effect

#### LED Strip Light

Features:

- turn on or off
- change brightness
- change color
- set effect

#### Strip Light 3

This is an encrypted device.

Features:

- turn on or off
- change brightness
- change color temperature
- change color
- set effect

#### Floor Lamp

This is an encrypted device.

Features:

- turn on or off
- change brightness
- change color temperature
- change color
- set effect

### Locks

Note: The integration currently only uses the primary lock state; in dual lock mode, not all things might work properly.

#### Lock

This is an encrypted device.

Features:

- Lock or unlock
- open or closed state
- auto-lock paused state
- calibration state
- get battery level

Options:

1. To enable nightlatch operation mode, go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Under **Integration entries**, find the lock and select **Configure**.
3. In the **Options** dialog, configure the nightlatch operation mode.

#### Lock Pro

This is an encrypted device.

Features:

- Lock or unlock
- open or closed state
- auto-lock paused state
- calibration state
- get battery level

Options:

1. To enable nightlatch operation mode, go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Under **Integration entries**, find the lock and select **Configure**.
3. In the **Options** dialog, configure the nightlatch operation mode.



#### Lock Ultra

This is an encrypted device.

Features:

- Lock or unlock
- open or closed state
- auto-lock paused state
- calibration state
- get battery level

Options:

1. To enable nightlatch operation mode, go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Under **Integration entries**, find the lock and select **Configure**.
3. In the **Options** dialog, configure the nightlatch operation mode.

#### Lock Lite

This is an encrypted device.

Features:

- Lock or unlock
- calibration state
- get battery level

### Hubs

Some of the hubs can be served as a bridge while the sensor data can be retrieved via Bluetooth connection. Hub 2 displays temperature and humidity through a sensor cable. Without a digital display, Hub Mini Matter Enabled can also read from a sensor cable.

#### Hub 2

Features:

- get temperature
- get humidity
- get light level

#### Hub Mini Matter Enabled

Features:

- get temperature
- get humidity

#### Hub3

Features:

- get temperature
- get humidity
- get light level
- motion detection state

### Fans

Fan entities are added for Battery Circulator Fan/Circulator Fan

#### Battery Circulator Fan/Circulator Fan

Features:
- turn on
- turn off
- set speed
- set mode
- oscillate left and right
- get battery level (Battery Circulator Fan only)

### Air Purifiers

Fan entities are added for Air Purifier, and Air Purifier Table.

Air purifier currently supports three speed levels, which you can adjust by setting the mode.

This is an encrypted device.

Features:

- turn on
- turn off
- set mode

#### Air Purifier Table

This is an encrypted device.

Features:

- turn on
- turn off
- set mode

### Vacuums

Vacuum entities are added for K10+, K10+ Pro, K10+ Pro Combo, K20, S10.

Features:
- get states, including `cleaning`, `docked`, `idle`, `paused`, `returning`, and `error`; refer to Known limitations for more details
- start
- return to base
- get battery

### Humidifiers

Humidifier entities are added for Humidifier and  Evaporative Humidifier.

#### Humidifier

Features:

- turn on
- turn off
- set mode
- set humidity

#### Evaporative Humidifier

This is an encrypted device.
Note: Not all modes support unless you bind the temperature and humidity sensor.

Features:

- turn on
- turn off
- set mode
- set humidity

## Data updates

SwitchBot devices utilize a [​​local push](/blog/2016/02/12/classifying-the-internet-of-things/#classifiers)​​ strategy to maintain real-time status updates. When devices detect state changes, they actively push updates to Home Assistant for immediate synchronization. For user-initiated actions through Home Assistant (for example, when turning a device on/off), the integration performs an additional proactive status fetch to ensure instant confirmation of the new state.
The integration connects locally to the devices without going via the SwitchBot Cloud.

## Known limitations

### Slow connection times

Move the device closer, or replace the Bluetooth adapter with a faster one. See [Improving connection times](/integrations/bluetooth/#improving-connection-times) for more information.

### Device names not synced

Device names configured in the SwitchBot app are not transferred into Home Assistant.

### Battery level

Due to firmware limitations, early models such as **Lock** and **Lock Lite** report the battery level in coarse ranges rather than an exact value:

- < 10 %  → 10  
- 10 % – 20 % → 20  
- 20 % – 60 % → 60  
- ≥ 60 % → 100

Refer to the latest version of the [OpenAPI doc](https://github.com/OpenWonderLabs/SwitchBotAPI) for precise definitions.

### Lock state

The integration currently only uses the primary lock state; in dual lock mode, not all things might work properly.

### Vacuum state

For robot vacuum K10+ and K10+ Pro, due to firmware implementation, it only returns these states, `cleaning` and `docked`

## Troubleshooting

The SwitchBot integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

{% details "Config flow could not be loaded" %}
Possible custom integration conflict, using a different version of PySwitchbot; Try uninstalling the custom integration.
{% enddetails %}

{% details "No unconfigured devices found" %}
Make sure your devices are powered on and are in range.
{% enddetails %}

## Examples

### Automation ideas

You can create all sort of automations using sensors as triggers and switches, shades, and lights as actions.

- Turn on or turn off lights and switches when motion is detected.
- Turn on or turn off the Bot to control a fan, AC remote, or circulator when temperature or humidity are too low.
- Close the curtain when the temperature is too high.
- Turn off Relay Switch when power consumption is too high.
- Change the color of LED Strip Lights or Color Bulb or turn on the circulator using Bot or Relay Switch if carbon dioxide is too high.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
