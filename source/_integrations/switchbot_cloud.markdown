---
title: SwitchBot Cloud
description: Instructions on how to set up SwitchBot Devices.
ha_category:
  - Binary Sensor
  - Button
  - Cover
  - Fan
  - Hub
  - Humidifier
  - Light
  - Lock
  - Plug
  - Remote
  - Sensor
  - Switch
  - Vacuum
ha_release: '2023.10'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@SeraphicRav'
  - '@laurence-presland'
  - '@Gigatrappeur'
  - '@XiaoLing-git'
ha_domain: switchbot_cloud
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - fan
  - humidifier
  - light
  - lock
  - sensor
  - switch
  - vacuum
ha_config_flow: true
ha_integration_type: hub
---

The **SwitchBot Cloud** {% term integration %} allows you to control SwitchBot [devices](https://www.switch-bot.com/) connected through the SwitchBot hub.

## Prerequisites

In order to use this integration, you will need at least a SwitchBot Hub and a SwitchBot account to get a token and secret key from the SwitchBot mobile app in **Profiles** > **Preferences** > **Developer Options**. If **Developer Options** is not present in preferences, tap the App Version (e.g. 6.24) several times (5~15 times) in succession to open the **Developer Options**. See also [SwitchBot's blog](https://blog.switch-bot.com/switchbot-x-home-assistant-the-official-setup-tips-guide-you-asked-for-3/#cloud-integration) for more information specific to the app.

Please note, device names configured in the SwitchBot app are transferred into Home Assistant.

{% include integrations/config_flow.md %}


## Supported devices

### Plugs and switches

- [Bot (WoHand)](https://switch-bot.com/pages/switchbot-bot)
- [Relay Switch 2PM](https://www.switch-bot.com/products/switchbot-relay-switch-2pm)
- [Relay Switch 1](https://www.switch-bot.com/products/switchbot-relay-switch-1)
- [Relay Switch 1PM](https://www.switch-bot.com/products/switchbot-relay-switch-1pm)
- [Plug Mini (WoPlug)](https://www.switch-bot.com/products/switchbot-plug-mini)
- [Plug Mini (HomeKit Enabled)](https://www.switch-bot.com/products/switchbot-plug-mini-homekit-enabled)
- [Plug Mini (EU)](https://www.switch-bot.com/products/switchbot-plug-mini-eu)
- Plug (Wi-Fi only, only available in Japan)

### Cover

- [Curtain (WoCurtain)](https://switch-bot.com/pages/switchbot-curtain) (version 1 & 2)
- [Curtain 3 (WoCtn3)](https://switch-bot.com/pages/switchbot-curtain-3)
- [Blind Tilt (WoBlindTilt)](https://switch-bot.com/pages/switchbot-blind-tilt)
- [Roller Shade](https://www.switch-bot.com/products/switchbot-roller-shade)
- [Garage Door Opener](https://www.switch-bot.com/products/switchbot-garage-door-opener)

### Lights

- [LED Strip Light 3](https://www.switch-bot.com/products/switchbot-led-strip-light-3)
- [Floor Lamp](https://www.switch-bot.com/products/switchbot-floor-lamp)
- [Color Bulb (WoBulb)](https://switch-bot.com/pages/switchbot-color-bulb)
- [Light Strip (WoStrip)](https://www.switchbot.jp/products/switchbot-strip-light)
- RGBICWW Floor Lamp
- RGBICWW Strip Light
- [Ceiling Light / Ceiling Light Pro](https://www.switchbot.jp/pages/switchbot-ceiling-light) (Japan only)

### Locks

- [Lock (WoLock)](https://switch-bot.com/pages/switchbot-lock)
- [Lock Pro (WoLockPro)](https://www.switch-bot.com/pages/switchbot-lock-pro)

### Sensors

- [Meter](https://switch-bot.com/pages/switchbot-meter)
- [Meter Plus](https://switch-bot.com/pages/switchbot-meter-plus)
- [Indoor/Outdoor Meter (WoIOSensorTH)](https://switch-bot.com/pages/switchbot-indoor-outdoor-thermo-hygrometer) 
- [Meter Pro](https://www.switch-bot.com/products/switchbot-meter-pro)
- [Meter Pro CO2 Monitor](https://www.switch-bot.com/products/switchbot-meter-pro-co2-monitor)
- [Contact Sensor](https://www.switch-bot.com/products/contact-sensor)
- [Motion Sensor](https://www.switch-bot.com/products/motion-sensor)
- [Water Leak Detector](https://www.switch-bot.com/products/switchbot-water-leak-detector)
- [Climate Panel](https://www.switch-bot.com/products/switchbot-home-climate-panel)
- [Presence Sensor](https://www.switch-bot.com/products/switchbot-presence-sensor)

### Hubs

- [Hub 2 (WoHub2)](https://switch-bot.com/pages/switchbot-hub-2) (currently only supports retrieving sensor data, does not yet support device control)
- [Hub 3](https://www.switch-bot.com/products/switchbot-hub-3) (currently only supports retrieving sensor data, does not yet support device control)
- IR appliances exposed through the different hubs:
  - ON/OFF for all appliance types except for *Others*
  - Change temperature and mode for *Air Conditioner*
  
### Humidifiers

- [Humidifier (WoHumi)](https://www.switchbot.jp/products/switchbot-smart-humidifier)
- [Evaporative Humidifier](https://www.switch-bot.com/products/switchbot-evaporative-humidifier-auto-refill)

### Vacuums

- [K10+](https://www.switch-bot.com/products/switchbot-mini-robot-vacuum-k10)
- [K10+ Pro](https://www.switch-bot.com/products/switchbot-mini-robot-vacuum-k10-pro)
- [K10+ Pro Combo](https://www.switch-bot.com/products/switchbot-k10-pro-combo)
- [K11+](https://www.switch-bot.com/products/switchbot-robot-vacuum-k11)
- [K20+ Pro](https://www.switchbot.jp/products/switchbot-robot-vacuum-cleaner-k20-pro)
- [S20](https://www.switch-bot.com/products/switchbot-floor-cleaning-robot-s20)
- [S10](https://www.switch-bot.com/products/switchbot-floor-cleaning-robot-s10)
- [S1](https://www.switchbot.jp/products/switchbot-robot-vacuum-cleaner?&variant=41850919420079)
- [S1 Plus](https://www.switchbot.jp/products/switchbot-robot-vacuum-cleaner)

### Fans

- [Circulator Fan](https://www.switch-bot.com/products/switchbot-battery-circulator-fan)
- [Air Purifier](https://www.switch-bot.com/products/switchbot-air-purifier)
- [Air Purifier Table](https://www.switch-bot.com/products/switchbot-air-purifier-table)

### Water heater

- [Smart Radiator Thermostat](https://www.switch-bot.com/products/switchbot-smart-radiator-thermostat)

## Supported functionality

### Plugs and switches

#### Bot

Features:
- acted as a Switch in `switchMode` and `customizeMode`, as a Button in `pressMode`
- turn on or off
- press
- get battery level

#### Plug Mini

Features:
- turn on or off
- get power consumption readings

#### Relay Switch 2PM

Features:
displayed as two switches with the following properties or actions individually,
- turn on or off
- get power
- get voltage
- get current
- get daily used electricity or power consumption

#### Relay Switch 1

Features:
- turn on or off

#### Relay Switch 1PM

Features:
- turn on or off
- get power
- get voltage
- get current

#### Plug

Features:
- turn on or off

### Cover

#### Curtain

Features:
- open/close/pause
- set position
- get position
- get battery level
- get calibration state

#### Curtain 3

Features:
- open/close/pause
- set position
- get position
- get battery level
- get calibration state

#### Blind Tilt

Features:
- close up/close down
- set position
- get position
- get battery level
- get calibration state

#### Roller Shade

Features:
- open/close
- set position
- get position
- get battery level
- get calibration state

#### Garage Door Opener

Features:
- open/close
- set position
- get position
- get calibration state

### Sensors

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
- get motion detection state
- get light state
- get open state
- get battery level

#### Motion Sensor

Features:
- get motion detection state
- get battery level

#### Presence Sensor

Features:
- get motion detection state
- get light level
- get battery level

#### Water Leak Detector

Features:
- get leak state
- get battery level

#### Climate Panel

Features:
- get temperature
- get humidity
- get battery level
- light detect
- motion detect

### Lights

#### LED Strip Light 3

Features:
- turn on or off
- change brightness
- change color temperature
- change color


#### Floor Lamp

Features:
- turn on or off
- change brightness
- change color temperature
- change color

#### Color Bulb

Features:
- turn on or off
- change brightness
- change color temperature
- change color

#### LED Strip Light

Features:
- turn on or off
- change brightness
- change color

#### Ceiling Light / Ceiling Light Pro

Features:
- turn on or off
- change brightness
- change color temperature

### Locks

#### Lock

Features:
- Lock or unlock
- open or closed state
- calibration state
- get battery level

#### Lock Pro

Features:
- Lock or unlock
- open or closed state
- calibration state
- get battery level

### Hubs

Some of the hubs can be served as a bridge while the sensor data can be retrieved. Hub 2 displays temperature and humidity through a sensor cable. Without a digital display, Hub Mini Matter Enabled can also read from a sensor cable.

#### Hub 2

Features:
- get temperature
- get humidity

#### Hub 3

Features:
- get motion detection state
- get temperature
- get humidity
- get light level

### Humidifiers

Humidifier entities are added for Humidifier and  Evaporative Humidifier.

#### Humidifier

Features:

- turn on
- turn off
- set mode
- set humidity

#### Evaporative Humidifier

Note: Not all modes support unless you bind the temperature and humidity sensor.

Features:

- turn on
- turn off
- set mode
- set humidity

### Fans

#### Battery Circulator Fan/Circulator Fan

Features:
- turn on
- turn off
- set speed, only applicable for [direct mode]
- set mode
- get battery, only applicable for [Battery Circulator Fan]


#### Air Purifier

Features:
- get states
- turn on
- turn off
- set mode

#### Air Purifier Table

Features:
- get states
- turn on
- turn off
- set mode


### Vacuums

Vacuum entities are added for K10+, K10+ Pro, K10+ Pro Combo, K11+, K20+ Pro, S10, S20.

Features:
- get states
- start/clean
- pause
- set cleaning mode
- return to base
- get battery


### Water Heater

#### Smart Radiator Thermostat

Features:
- turn on
- turn off
- set temperature
- get temperature
- set mode
- get battery

## Important considerations

{% note %}
Each sensor will request a status update from the SwitchBot Cloud API once every 10 minutes (600 seconds). The SwitchBot Cloud API limits users to 10,000 requests per day.
{% endnote %}

{% warning %}
For IR Appliances, the state is inferred from previous commands in Home Assistant and might not reflect reality if you use other ways to control the device.
{% endwarning %}

## Webhook support

For vacuums, the states are updated from SwitchBot's cloud.

{% warning %}
Only ONE webhook URL seems to be accepted by the SwitchBot's cloud. So, if you want several applications notified,  you need to use a “proxy” to re-dispatch the message to the other applications.
{% endwarning %}
