---
title: BleBox devices
description: Instructions on how to integrate BleBox devices with Home Assistant.
ha_category:
  - Cover
ha_release: '0.110'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@bbx-a'
  - '@swistakm'
ha_domain: blebox
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - light
  - sensor
  - switch
ha_integration_type: integration
ha_zeroconf: true
---

[BleBox](https://blebox.eu/?lang=en) produces small, low-power, surprisingly affordable, feature-rich WiFi devices for serverless home automation.

{% include integrations/config_flow.md %}

For the best experience, make sure your BleBox devices have the most recent available firmware installed.


## BleBox controllers

### rollerGate

This integration adds the Blebox device as a cover entity to Home Assistant.

#### Key supported features

- Open
- Close
- Position
- Stop

### gateBox

This integration adds the Blebox device as a cover entity to Home Assistant.

#### Key supported features

- Open (trigger primary output)
- Close (trigger primary output)
- Stop (trigger secondary output)
- Gate state (open, close, unknown)

#### Additional features

- "stop" requires setting your device's secondary trigger as stop (via website or phone app).

### gateBox Pro

This integration adds the Blebox device as a cover entity to Home Assistant.

#### Key supported features

- Open (trigger primary output)
- Close (trigger primary output)
- Stop (trigger secondary output)
- Gate state (open, close, unknown)

#### Additional features

- "stop" requires setting your device's secondary trigger as stop (via website or phone app).

### doorBox

This integration adds the Blebox device as a cover entity to Home Assistant.

#### Key supported features

- Open
- Door state (open, close, unknown)

### saunaBox

This integration adds the Blebox device as a climate entity to Home Assistant.

#### Key supported features

- On
- Off
- Setting target temperature
- Read current temperature

### thermoBox

This integration adds the Blebox device as a climate entity to Home Assistant.

#### Key supported features

- On
- Off
- Set target temperature
- Read current temperature

#### Additional features

- Changing operation mode (cooling/heating) requires direct access to device or from wBox app

### shutterBox

This integration adds the Blebox device as a cover entity to Home Assistant.

#### Key supported features

- Open
- Close
- Position
- Tilt regulation

### shutterBoxDC

This integration adds the Blebox device as a cover entity to Home Assistant.

#### Key supported features

- Open
- Close
- Position
- Tilt regulation

### shutterBox DIN

This integration adds the Blebox device as a cover entity to Home Assistant.

#### Key supported features

- Open
- Close
- Position
- Tilt regulation

### switchBox

This integration adds the Blebox device as a switch entity to Home Assistant.

#### Key supported features

- On
- Off
- Energy consumption measurement

### switchBox DIN

This integration adds the Blebox device as a switch entity to Home Assistant.

#### Key supported features

- On
- Off
- Energy consumption measurement

### switchBoxD

This integration adds the Blebox device as a switch entity to Home Assistant.

#### Key supported features

- On
- Off
- Energy consumption measurement

### switchBoxD DIN

This integration adds the Blebox device as a switch entity to Home Assistant.

#### Key supported features

- On
- Off
- Energy consumption measurement

### switchBoxDC

This integration adds the Blebox device as a switch entity to Home Assistant.

#### Key supported features

- On
- Off

### switchBox LIGHT

This integration adds the Blebox device as a switch entity to Home Assistant.

#### Key supported features

- On
- Off

### switchBoxT PRO

This integration adds the Blebox device as a switch entity to Home Assistant.

#### Key supported features

- On
- Off

### dimmerBox

This integration adds the Blebox device as a light entity to Home Assistant.

#### Key supported features

- On
- Off
- Brightness

### wLightBox

This integration adds the Blebox device as a light entity to Home Assistant.

#### Key supported features

- On
- Off
- Effects
- Brightness
- Color

#### Additional features

- Changing color mode available from direct device access or wBox app. Device needs to be reloaded from Home Assistant.

### wLightBox PRO

This integration adds the Blebox device as a light entity to Home Assistant.

#### Key supported features

- On
- Off
- Effects
- Brightness
- Color

#### Additional features

- Changing color mode available from direct device access or wBox app. Device needs to be reloaded from Home Assistant.

### wLightBoxS

This integration adds the Blebox device as a light entity to Home Assistant.

#### Key supported features

- On
- Off
- Effects
- Brightness

### wLightBoxS PRO

This integration adds the Blebox device as a light entity to Home Assistant.

#### Key supported features

- On
- Off
- Effects
- Brightness

### pixelBox

This integration adds the Blebox device as a light entity to Home Assistant.

#### Key supported features

- On
- Off
- Effects
- Brightness
- Color

### tempSensor

This integration adds the Blebox device as a sensor entity to Home Assistant.

#### Key supported features

- Periodic read of temperature

### tempSensorAC

This integration adds the Blebox device as a sensor entity to Home Assistant.

#### Key supported features

- Periodic read of temperature for all probes

### tempSensor PRO

This integration adds the Blebox device as a sensor entity to Home Assistant.

#### Key supported features

- Periodic read of temperature for all probes

### humiditySensor

This integration adds the Blebox device as a sensor entity to Home Assistant.

#### Key supported features

- Periodic read of humidity
- Periodic read of temperature

### wind&RainSensor

This integration adds the Blebox device as a sensor & binary sensor entity to Home Assistant.

#### Key supported features

- Periodic read of current wind speed
- Periodic read of state of rain detection

### rainSensor

This integration adds the Blebox device as a binary sensor entity to Home Assistant.

#### Key supported features

- Periodic read of state of rain detection

### airSensor

This integration adds the Blebox device as a sensor entity to Home Assistant.

#### Key supported features

- Periodic read of:
  - pm1
  - pm2.5
  - pm10

### windSensor PRO

This integration adds the Blebox device as a sensor entity to Home Assistant.

#### Key supported features

- Periodic read of current wind speed

------

## "BleBox inside" controllers

### Simon 54 GO SHUTTER

This integration adds the Simon 54 GO device ("blebox inside")  as a cover entity to Home Assistant.

#### Key supported features

- Open
- Close
- Position
- Tilt regulation

### Simon 54 GO SWITCH

This integration adds the Simon 54 GO device ("blebox inside") as a switch entity to Home Assistant.

#### Key supported features

- On
- Off

### Simon 54 GO SWITCH D

This integration adds the Simon 54 GO device ("blebox inside") as a switch entity to Home Assistant.

#### Key supported features

- On
- Off

### Simon 54 GO LED 230V (dimmer)

This integration adds the Simon 54 GO device ("blebox inside") as a switch entity to Home Assistant.

#### Key supported features

- On
- Off
- Brightness

### Simon 54 GO LED MONO

This integration adds the Simon 54 GO device ("blebox inside") as a switch entity to Home Assistant.

#### Key supported features

- On
- Off
- Effects
- Brightness
- Color

### Simon 54 GO RGBW

This integration adds the Simon 54 GO device ("blebox inside") as a switch entity to Home Assistant.

#### Key supported features

- On
- Off
- Effects
- Brightness
- Color

### Simon 55 GO SHUTTER

This integration adds the Simon 55 GO device ("blebox inside") as a cover entity to Home Assistant.

#### Key supported features

- Open
- Close
- Position
- Tilt regulation

### Simon 55 GO SWITCH

This integration adds the Simon 55 GO device ("blebox inside") as a switch entity to Home Assistant.

#### Key supported features

- On
- Off

### Simon 55 GO SWITCH D

This integration adds the Simon 55 GO device ("blebox inside") as a switch entity to Home Assistant.

#### Key supported features

- On
- Off
- Brightness

### Simon 55 GO LED 230V (dimmer)

This integration adds the Simon 55 GO device ("blebox inside") as a switch entity to Home Assistant.

#### Key supported features

- On
- Off
- Brightness

### Simon 55 GO LED MONO

This integration adds the Simon 55 GO device ("blebox inside") as a switch entity to Home Assistant.

#### Key supported features

- On
- Off
- Effects
- Brightness
- Color

### Simon 55 GO RGBW

This integration adds the Simon 55 GO device ("blebox inside") as a switch entity to Home Assistant.

#### Key supported features

- On
- Off
- Effects
- Brightness
- Color

### FAKRO FTP-V/FTU-V WiFi

This integration adds the Fakro device ("blebox inside") as a cover entity to Home Assistant.

#### Key supported features

- Open
- Close
- Position

### FAKRO ARF/ARP WiFi

This integration adds the Fakro device ("blebox inside") as a cover entity to Home Assistant.

#### Key supported features

- Open
- Close
- Position

### FAKRO ARZ/AMZ/VMZ WiFi

This integration adds the Fakro device ("blebox inside") as a cover entity to Home Assistant.

#### Key supported features

- Open
- Close
- Position

### SABAJ TV K-SMRT-4 - WIFI RJ-45

This integration adds the SABAJ device ("blebox inside") as a button entity to Home Assistant.

#### Key supported features

- Open
- Close
- Up
- Down
- Fav

### Wiśniowski RiCo

This integration adds the Wiśniowski device ("blebox inside") as a cover entity to Home Assistant.

- Open (trigger primary output)
- Close (trigger primary output)
- Stop (trigger secondary output)
- Gate state (open, close, unknown) - only Pro version

#### Additional features

- "stop" requires setting your device's secondary trigger as stop (via website or phone app)

### Polfendo smartGateControl

This integration adds the Polfendo device ("blebox inside") as a cover entity to Home Assistant.

#### Key supported features

- Open
- Close
- Position
- Stop

### Plast-met SMART LIGHT BOSSPIO

This integration adds the Plast-met device ("blebox inside") as a light entity to Home Assistant.

#### Key supported features

- On
- Off
- Effects
- Brightness

### Plast-met SMART LIGHT SIMPIO

This integration adds the Plast-met device ("blebox inside") as a light entity to Home Assistant.

#### Key supported features

- On
- Off
- Effects
- Brightness

### Tedee relay module

This integration adds the Tedee device ("blebox inside") as a cover entity to Home Assistant.

#### Key supported features

- Open
- Door state (open, close, unknown)
