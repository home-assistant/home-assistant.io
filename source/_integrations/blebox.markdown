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
  - '@riokuu'
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


# BleBox controllers:
## <strong>rollerGate</strong><br/>
#### This integration adds the Blebox device as a cover entity to HomeAssistant.<br/>
#### Key supported features:<br/>
- Open
- Close
- Position
- Stop

## <strong>gateBox</strong><br/> 
#### This integrfation adds the Blebox device as a cover entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- Open (Trigger primary output)
- Close (Trigger primary output)
- Stop (Trigger secondary output)
- Gate state(open, close, unknown)
#### Additional features:
- "stop" requires setting your device's secondary trigger as stop(via website or phone app).

## <strong>gateBox Pro</strong><br/> 
#### This integration adds the Blebox device as a cover entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- Open (Trigger primary output)
- Close (Trigger primary output)
- Stop (Trigger secondary output)
- Gate state(open, close, unknown)
- 
#### Additional features:
- "stop" requires setting your device's secondary trigger as stop(via website or phone app).

## <strong>doorBox</strong><br/> 
#### This integration adds the Blebox device as a cover entity to HomeAssistant.<br/>
#### Key supported features:<br/>
- Open
- Door state (open, close, unknown)

## <strong>saunaBox</strong><br/> 
#### This integration adds the Blebox device as a climate entity to HomeAssistant.<br/>
#### Key supported features:<br/>
- On
- Off
- Setting target temperature
- Read current temperature 

## <strong>thermoBox</strong><br/> 
#### This integration adds the Blebox device as a climate entity to HomeAssistant.<br/>
#### Key supported features:<br/>
- On
- Off
- Set target temperature
- Read current temperature
#### Additional features:
- Changing operation mode(cooling/heating) requires direct access to device or from wBox app

## <strong>shutterBox</strong><br/> 
#### This integration adds the Blebox device as a cover entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- Open
- Close
- Position
- Tilt regulation

## <strong>shutterBoxDC</strong><br/> 
#### This integration adds the Blebox device as a cover entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- Open
- Close
- Position
- Tilt regulation

## <strong>shutterBox DIN</strong><br/> 
#### This integration adds the Blebox device as a cover entity to HomeAssistant.<br/>
#### Key supported features:<br/>
- Open
- Close
- Position
- Tilt regulation

## <strong>switchBox</strong><br/> 
#### This integration adds the Blebox device as a switch entity to HomeAssistant.<br/>
#### Key supported features:<br/>
- On
- Off
- Energy consumption measurement

## <strong>switchBox DIN</strong><br/> 
#### This integration adds the Blebox device as a switch entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off
- Energy consumption measurement

## <strong>switchBoxD</strong><br/> 
#### This integration adds the Blebox device as a switch entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off
- Energy consumption measurement

## <strong>switchBoxD DIN</strong><br/> 
#### This integration adds the Blebox device as a switch entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off
- Energy consumption measurement
- 
## <strong>switchBoxDC</strong><br/> 
#### This integration adds the Blebox device as a switch entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off

## <strong>switchBox LIGHT</strong><br/> 
#### This integration adds the Blebox device as a switch entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off

## <strong>switchBoxT PRO</strong><br/> 
#### This integration adds the Blebox device as a switch entity to HomeAssistant.<br/>
#### Key supported features:<br/>
- On
- Off

## <strong>dimmerBox</strong><br/> 
#### This integration adds the Blebox device as a light entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off
- Brightness

## <strong>wLightBox</strong><br/> 
#### This integration adds the Blebox device as a light entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off
- Effects 
- Brightness
- Color

#### Additional features:
- Changing color mode available from direct device access or wBox app. Device needs to be reladed from HomeAssistent. 

## <strong>wLightBox PRO</strong><br/> 
#### This integration adds the Blebox device as a light entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off
- Effects 
- Brightness
- Color 

#### Additional features:
- Changing color mode available from direct device access or wBox app. Device needs to be reladed from HomeAssistent.

## <strong>wLightBoxS</strong><br/> 
#### This integration adds the Blebox device as a light entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off
- Effects 
- Brightness
 
## <strong>wLightBoxS PRO</strong><br/> 
#### This integration adds the Blebox device as a light entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off
- Effects 
- Brightness
 
## <strong>pixelBox</strong><br/> 

#### This integration adds the Blebox device as a light entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off
- Effects 
- Brightness
- Color

## <strong>tempSensor</strong><br/> 
#### This integration adds the Blebox device as a sensor entity to HomeAssistant.<br/>

#### Key supported features:<br/> 
- Periodic read of temperature
- 
## <strong>tempSensorAC</strong><br/> 
#### This integration adds the Blebox device as a sensor entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- Periodic read of temperature for all probes 
- 
## <strong>tempSensor PRO</strong><br/> 
#### This integration adds the Blebox device as a sensor entity to HomeAssistant.<br/>
#### Key supported features:<br/>
- Periodic read of temperature for all probes 
- 
## <strong>humiditySensor</strong><br/>
#### This integration adds the Blebox device as a sensor entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- Periodic read of humidity 
- Periodic read of temperature

## <strong>wind&RainSensor</strong><br/> 
#### This integration adds the Blebox device as a sensor & binary sensor entity to HomeAssistant.<br/>

#### Key supported features:<br/> 
- Periodic read of current wind speed 
- Periodic read of state of rain detection   

## <strong>rainSensor</strong><br/> 
#### This integration adds the Blebox device as a binary sensor entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- Periodic read of state of rain detection

## <strong>airSensor</strong><br/> 
#### This integration adds the Blebox device as a sensor entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- Periodic read of:
    - pm1
    - pm2.5
    - pm10
  
## <strong>windSensor PRO</strong><br/> 
#### This integration adds the Blebox device as a sensor entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- Periodic read of current wind speed
------
#  "BleBox inside" controllers:
## <strong>Simon 54 GO SHUTTER</strong><br/> 
#### This integration adds the Simon 54 GO device ("blebox inside")  as a cover entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- Open
- Close
- Position
- Tilt regulation

## <strong>Simon 54 GO SWITCH</strong><br/> 
#### This integration adds the Simon 54 GO device ("blebox inside") as a switch entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off

## <strong>Simon 54 GO SWITCH D</strong><br/> 
#### This integration adds the Simon 54 GO device ("blebox inside") as a switch entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off

## <strong>Simon 54 GO LED 230V (dimmer)</strong><br/> 
#### This integration adds the Simon 54 GO device ("blebox inside") as a switch entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off
- Brightness

## <strong>Simon 54 GO LED MONO</strong><br/> 
#### This integration adds the Simon 54 GO device ("blebox inside") as a switch entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off
- Effects 
- Brightness
- Color

## <strong>Simon 54 GO RGBW</strong><br/> 
#### This integration adds the Simon 54 GO device ("blebox inside") as a switch entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off
- Effects 
- Brightness
- Color

## <strong>Simon 55 GO SHUTTER</strong><br/> 
#### This integration adds the Simon 55 GO device ("blebox inside") as a cover entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- Open
- Close
- Position
- Tilt regulation

## <strong>Simon 55 GO SWITCH</strong><br/> 
#### This integration adds the Simon 55 GO device ("blebox inside") as a switch entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off

## <strong>Simon 55 GO SWITCH D</strong><br/> 
#### This integration adds the Simon 55 GO device ("blebox inside") as a switch entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off
- Brightness

## <strong>Simon 55 GO LED 230V (dimmer)</strong><br/> 
#### This integration adds the Simon 55 GO device ("blebox inside") as a switch entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off
- Brightness

## <strong>Simon 55 GO LED MONO</strong><br/> 
#### This integration adds the Simon 55 GO device ("blebox inside") as a switch entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off
- Effects 
- Brightness
- Color

## <strong>Simon 55 GO RGBW</strong><br/> 
#### This integration adds the Simon 55 GO device ("blebox inside") as a switch entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off
- Effects 
- Brightness
- Color


## <strong>FAKRO FTP-V/FTU-V WiFi</strong><br/> 
#### This integration adds the Fakro device ("blebox inside") as a cover entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- Open
- Close
- Position

## <strong>FAKRO ARF/ARP WiFi</strong><br/> 
#### This integration adds the Fakro device ("blebox inside") as a cover entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- Open
- Close
- Position


## <strong>FAKRO ARZ/AMZ/VMZ WiFi</strong><br/> 
#### This integration adds the Fakro device ("blebox inside") as a cover entity to HomeAssistant.<br/>
#### Key supported features:<br/>
- Open
- Close
- Position

## <strong>SABAJ TV K-SMRT-4 - WIFI RJ-45</strong><br/> 
#### This integration adds the SABAJ device ("blebox inside") as a button entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- Open
- Close
- Up
- Down
- Fav

## <strong>Wiśniowski RiCo</strong><br/> 
#### This integration adds the Wiśniowski device ("blebox inside") as a cover entity to HomeAssistant.<br/>
- Open (Trigger primary output)
- Close (Trigger primary output)
- Stop (Trigger secondary output)
- Gate state(open, close, unknown) - only Pro version
#### Additional features:
- "stop" requires setting your device's secondary trigger as stop(via website or phone app)

## <strong>Polfendo smartGateControl</strong><br/> 
#### This integration adds the Polfendo device ("blebox inside") as a cover entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- Open
- Close
- Position
- Stop

## <strong>Plast-met SMART LIGHT BOSSPIO</strong><br/> 
#### This integration adds the Plast-met device ("blebox inside") as a light entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off
- Effects 
- Brightness

## <strong>Plast-met SMART LIGHT SIMPIO</strong><br/> 
#### This integration adds the Plast-met device ("blebox inside") as a light entity to HomeAssistant.<br/>
#### Key supported features:<br/> 
- On
- Off
- Effects 
- Brightness

## <strong>Tedee relay module</strong><br/> 
#### This integration adds the Tedee device ("blebox inside") as a cover entity to HomeAssistant.<br/>
#### Key supported features:<br/>
- Open
- Door state(open, close, unknown)
