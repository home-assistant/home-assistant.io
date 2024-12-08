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

This integration adds the Blebox device to Home Assistant as:

- multiple MONO lights entities,
- 1 or 2 lights CCT entities,
- 1 light RGB or RGBW or RGBCCT entity.

#### Key supported features

- On
- Off
- Effects
- Brightness
- Color (RGB, RGBW, RGBCCT mode only)
- White temperature control (RGBCCT & CCT mode only)
- Effects

#### Additional features

- Option to change control mode (linear / gamma correction) is available in wBox app.
- Option to change color mode (MONO/CCT) is available in wBox app.
- You can create your own effects. Creator of effects is available in wBox app.
- After a settings change, the device needs to be reloaded.

### wLightBox PRO

This integration adds the Blebox device to Home Assistant as:

- multiple MONO lights entities,
- 1 or 2 lights CCT entities,
- 1 light RGB or RGBW or RGBCCT entity.

#### Key supported features

- On
- Off
- Effects
- Brightness
- Color (RGB, RGBW, RGBCCT mode only)
- White temperature control (RGBCCT & CCT mode only)
- Effects

#### Additional features

- Option to change control mode (linear / gamma correction) is available in wBox app.
- Option to change color mode (MONO/CCT) is available in wBox app.
- You can create your own effects. Creator of effects is available in wBox app.
- After a settings change, the device needs to be reloaded.

### wLightBoxS

This integration adds the Blebox device as a light entity to Home Assistant.

#### Key supported features

- On
- Off
- Effects
- Brightness

### dacBoxD DC

This integration adds the Blebox device as 2 lights MONO or 1 light CCT entity to Home Assistant.

#### Key supported features

- On
- Off
- Brightness / linear percentage control (depends on device's settings)
- White temperature control (CCT mode only)
- Effects

#### Additional features

- Option to change control mode (linear / gamma correction) is available in wBox app.
- Option to change color mode (MONO/CCT) is available in wBox app.
- Own effects are possible to create. Creator of effects is available in wBox app.
- After settings change, device needs to be reloaded.

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

### floodSensor

This integration adds the Blebox device as a moisture binary sensor entity to Home Assistant.

#### Key supported features

- Periodic read of moisture as either "detected" or "cleared".

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

### actionBox, actionBoxS, and proxiBox

This integration does not add direct support for actionBox, actionBoxS, and proxiBox
devices. It is however possible to integrate these devices with Home Assistant using
automations via webhooks and wBox mobile app.

The configuration consists of two steps:

- [Generating the compatible webhook in Home Assistant](#generating-the-compatible-webhook-in-home-assistant)
- [Configuring the device in the wBox app](#configuring-the-device-in-the-wbox-app)


#### Generating the compatible webhook in Home Assistant

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and in the lower right corner, select the **Create Automation** button.
2. Choose the **Webhook** as the trigger type
3. Next to the webhook ID, select on the cog icon to allow the GET method.
4. Copy the webhook URL to the clipboard by clicking the "copy" icon next to the webhook ID.
5. Save the URL for later reference.
6. If applicable, add any desired conditions (the *And if* section) and actions.
   (the *Then do* section)

Note: The webhook ID will be later needed in phase two and will have to be entered
into the wBox mobile app. You may decide to use a more convenient text value. However, remember
that this is the only thing that authenticates webhooks within your network. Treat
this ID like a password.

#### Configuring the device in the wBox app

1. Configure the device by adding the action of
   type "send URL".
2. Enter the webhook URL that you copied when generating the webhook. It is the URL address for the action.

Note: in order for this integration flow to work, the webhook URL host must be
resolvable and accessible within the device network. If in doubt, please refer to the
general [documentation of automations with webhook triggers](https://www.home-assistant.io/docs/automation/trigger/#webhook-trigger).

### luxSensor

This integration adds the Blebox device as a sensor entity to Home Assistant.

#### Key supported features

- Periodic read of illuminance (unit: lx)

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

### Simon 54 GO Control and Simon 55 GO Control

This integration does not add direct support for Simon 54 GO Control and Simon 55 GO
Control devices. It is however possible to integrate these devices with Home Assistant
using automations via webhooks and wBox mobile app.

The configuration consists of two steps:

- [Generating the compatible webhook in Home Assistant](#generating-the-compatible-webhook-in-home-assistant)
- [Configuring the device in the wBox app](#configuring-the-device-in-the-wbox-app)

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
