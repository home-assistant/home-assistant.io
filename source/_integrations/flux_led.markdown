---
title: Magic Home
description: Instructions on how to setup Magic Home within Home Assistant.
ha_category:
  - Button
  - Light
  - Number
  - Select
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_release: 0.25
ha_domain: flux_led
ha_platforms:
  - button
  - diagnostics
  - light
  - number
  - select
  - sensor
  - switch
ha_codeowners:
  - '@icemanch'
ha_config_flow: true
ha_dhcp: true
ha_integration_type: integration
---

The Magic Home integration supports several brands of switches, bulbs, and controllers that use the same protocol. Chances are high that your bulb or controller (eg. WiFi LED CONTROLLER) will work with this integration if you can control the device with the Magic Home app or the Surp Life app.

This integration will provide local control over your LED lights/strips and can be configured to auto-scan your network for controllers or for you to manually configure individual lights by their IP address.

Example of bulbs:

- [MagicLight Smart Bulbs](https://www.magiclightbulbs.com/lightbulbs) or [Amazon](https://www.amazon.com/gp/product/B081YJHHB1/)
- [RGBCW Downlights](https://www.amazon.com/gp/product/B093Q83G7S/)
- [RGBCW Floodlights](https://www.amazon.com/dp/product/B08CDS3N6H)

Examples of controllers with strips:

- [MagicLight Strip Lights](https://www.magiclightbulbs.com/strip-lights) or [Amazon](https://www.amazon.com/gp/product/B08LPSS4J3/)

Examples of controllers:

- [Single color](https://www.amazon.com/gp/product/B07J5B3R5L/)
- [RGB](https://www.amazon.com/gp/product/B07C1LN7FZ/)
- [RGBW](https://www.amazon.com/gp/product/B07J9QCQNN/)
- [RGBCW](https://www.amazon.co.uk/gp/product/B09BMC4JNJ/)
- [RGB/W/CW](https://www.amazon.com/gp/product/B01DY56N8U/)

Examples of addressable controllers:

- [Addressable v3](https://www.amazon.com/gp/product/B09BMBSCRF/)

Examples of addressable controllers with strip:
- [Addressable v1](https://www.amazon.com/gp/product/B07RLF7C86/)
- [Addressable v2](https://www.amazon.com/gp/product/B07B7CQ2ZB/)

Examples of sockets:
- [MagicLight Smart Plugs](https://www.magiclightbulbs.com/smart-plugs) or [Amazon](https://www.amazon.com/gp/product/B07XNBVVXV/)

These devices have been sold under at least the following brands:

- Aislan
- [Allkeys](http://allkeystech.com/)
- Apobob
- [Arilux](https://www.ariluxworldwide.com/)
- Aubric
- BERENNIS
- BHGY
- [Brizled](https://www.brizled.com/)
- Bunpeon
- [Chichin](https://chichinlighting.com/)
- Comoyda
- dalattin
- [DALS RGBW / Armacost Lighting / MyLED](https://www.armacostlighting.com/)
- DARKPROOF
- [Daybetter](https://www.daybetter.com/)
- deerdance
- DIAMOND
- [Diode Dynamics](https://www.diodedynamics.com/)
- [Flux LED](https://www.fluxsmartlighting.com/)
- [FVTLED](https://fvtled.com/)
- GEV LIG
- GEYUEYA Home
- GIDEALED
- [GIDERWEL](https://giderwel.com/)
- GMK
- Goldwin
- Hakkatronics
- [HaoDeng](http://www.zengge.com/appkzd)
- [Heissner](https://www.heissner.de/)
- HDDFL
- [illume RGBW](https://dals.com/illume/)
- [Illumination FX](https://www.illumination-fx.com/)
- INDARUN
- iNextStation
- [Koopower](https://www.koopower.com/)
- Lallumer
- LEDENET
- [LiteWRX](https://litewrx.com/)
- Lytworx
- Magic Ambient
- [Magic Home](http://www.zengge.com/appkzd)
- [Magic Hue](http://www.magichue.com/)
- [Magic Light](https://www.magiclightbulbs.com/)
- Miheal
- Mowelai
- Nexlux
- OBSESS
- Offdarks
- PH LED
- PHOPOLLO
- [Pin Stadium Pinball Lights](https://pinstadium.com/)
- POV Lamp
- [PROTEAM Europe Pool Lights](https://proteam-me.com/)
- [Rimikon](https://www.rimikon.com/)
- SMFX
- [Sumaote](https://fvtled.com/)
- [Superhome](https://superhome.com.cy/)
- [SurpLife](http://www.zengge.com/newbrand)
- [SuperlightingLED](https://www.superlightingled.com/)
- Svipear
- Tommox
- Vanance
- Yetaida
- YHW
- [Zengge](http://www.zengge.com/sy)
- Zombber

{% include integrations/config_flow.md %}

After the devices have been added they can be configured with different effects listed below. These settings can be accessed by navigating to the integration settings in Settings -> Integrations and selecting the "Magic Home" configuration for the bulb or controller. 

**Custom Effect**\
A list of RGB colors can be entered to create an effect. The effect speed can be adjusted using the slider underneath.

**Custom Effect Type**\
This determines the transition between each color.

### Supported models

The following models have been tested.

| Model | Description                 | Microphone | Notes                           |
| ----- | --------------------------- | ---------- | ------------------------------- |
| 0x01  | Legacy RGB Controller       | no         | Original protocol               |
| 0x03  | Legacy CCT Controller       | no         | Original protocol               |
| 0x04  | UFO Controller RGBW         | no         |                                 |
| 0x06  | Controller RGBW             | no         |                                 |
| 0x07  | Controller RGBCW            | no         |                                 |
| 0x08  | Controller RGB with MIC     | yes        |                                 |
| 0x09  | Ceiling Light CCT           | no         |                                 |
| 0x0E  | Floor Lamp RGBCW            | no         |                                 |
| 0x10  | Christmas Light             | no         |                                 |
| 0x16  | Magnetic Light CCT          | no         |                                 |
| 0x17  | Magnetic Light Dimmable     | no         |                                 |
| 0x1A  | Christmas Light             | no         |                                 |
| 0x1C  | Table Light CCT             | no         |                                 |
| 0x1E  | Ceiling Light RGBCW         | no         |                                 |
| 0x21  | Bulb Dimmable               | no         |                                 |
| 0x25  | Controller RGB/WW/CW        | no         | Supports RGB, RGBW, RGBWW, CW, DIM |
| 0x33  | Controller RGB              | no         |                                 |
| 0x35  | Bulb RGBCW                  | no         |                                 |
| 0x41  | Controller Dimmable         | no         |                                 |
| 0x44  | Bulb RGBW                   | no         |                                 |
| 0x52  | Bulb CCT                    | no         |                                 |
| 0x54  | Downlight RGBW              | no         |                                 |
| 0x62  | Controller CCT              | no         |                                 |
| 0x93  | Switch 1 Channel            | no         |                                 |
| 0x97  | Socket                      | no         |                                 |
| 0xA1  | Addressable v1              | no         | Supports UCS1903, SM16703, WS2811, WS2812B, SK6812, INK1003, WS2801, LB1914 |
| 0xA2  | Addressable v2              | yes        | Supports UCS1903, SM16703, WS2811, WS2811B, SK6812, INK1003, WS2801, WS2815, APA102, TM1914, UCS2904B |
| 0xA3  | Addressable v3              | yes        | Supports WS2812B, SM16703, SM16704, WS2811, UCS1903, SK6812, SK6812RGBW (WS2814), INK1003, UCS2904B |
| 0xA4  | Addressable v4              | no         | Supports WS2812B, SM16703, SM16704, WS2811, UCS1903, SK6812, SK6812RGBW (WS2814), INK1003, UCS2904B |
| 0xA6  | Addressable v6              | yes        | Supports WS2812B, SM16703, SM16704, WS2811, UCS1903, SK6812, SK6812RGBW (WS2814), INK1003, UCS2904B |
| 0xA7  | Addressable v7              | yes        | Supports WS2812B, SM16703, SM16704, WS2811, UCS1903, SK6812, SK6812RGBW (WS2814), INK1003, UCS2904B |
| 0xE1  | Ceiling Light CCT           | no         |                                 |
| 0xE2  | Ceiling Light Assist        | no         | Auxiliary Switch not supported  |

### Untested models

The following models have not been tested but may work.

| Model | Description                 | Microphone | Notes                           |
| ----- | --------------------------- | ---------- | ------------------------------- |
| 0x02  | Legacy Dimmable Controller  | no         | Original protocol, discontinued |

### Unsupported Models

The following models are confirmed to be unsupported.

| Model | Description                 | Microphone | Notes                           |
| ----- | --------------------------- | ---------- | ------------------------------- |
| 0x18  | Plant Grow Light            | no         |                                 |
| 0x19  | Socket with 2 USB           | no         |                                 |
| 0x1B  | Aroma Fragrance Lamp        | no         |                                 |
| 0x1D  | Fill Light                  | no         |                                 |
| 0x94  | Switch 1c Watt              | no         |                                 |
| 0x95  | Switch 2 Channel            | no         |                                 |
| 0x96  | Switch 4 Channel            | no         |                                 |
| 0xD1  | Digital Time Lamp           | no         |                                 |

### Troubleshooting

If a strip controller device will not stay on wifi or goes offline during adjusting colors and effects, upgrading to a power supply with a higher amperage usually resolves any stability issues.

### Effects

The Magic Home light offers a number of effects which are not included in other lighting packages. These can be selected from the front-end, or sent in the effect field of the `light.turn_on` command.

| Effect Name                                                                                                  | Description                                                        |
|--------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| `colorloop`                                                                                                  | Smoothly transitions through the rainbow.                          |
| `colorjump`                                                                                                  | Jumps through seven different rainbow colors.                      |
| `colorstrobe`                                                                                                | Strobes each rainbow color in a loop.                              |
| `red_fade`, `green_fade`, `blue_fade`, `yellow_fade`, `cyan_fade`, `purple_fade`, `white_fade`               | Fades between the color as indicated in the effect name and black. |
| `rg_cross_fade`                                                                                              | Fades between red and green.                                       |
| `rb_cross_fade`                                                                                              | Fades between red and blue.                                        |
| `gb_cross_fade`                                                                                              | Fades between green and blue.                                      |
| `red_strobe`, `green_strobe`, `blue_strobe`, `yellow_strobe`, `cyan_strobe`, `purple_strobe`, `white_strobe` | Strobes the color indicated by the effect name.                    |
| `random`                                                                                                     | Chooses a random color by selecting random values for R, G, and B. |


### Custom effects - action `flux_led.set_custom_effect`

The integration offers a custom action to enable you to set the lights to a custom light effect. 

| Data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | The entity_id of the LED light to set the effect on. |
| `colors` | List of RGB colors to transition between in your effect. (Max 16, Required) |
| `speed_pct` | The speed of the effect in % (0-100. Default 50) |
| `transition` | The transition effect you would like. Valid options are `gradual`, `jump`, or `strobe`. (Default `gradual`) |

```yaml
#Example action
entity_id: light.led_strip
colors:
  - [255,0,0]
  - [0,255,0]
  - [0,0,255]
speed_pct: 80
transition: "jump"
```

### Set zones - action `flux_led.set_zones`

The Addressable v3 (0xA3) models allow setting a color effect per zone. The length of each zone is the number of pixels per segment divided by the number of colors. If the device is turned off, setting the zones will not turn it on. A separate call to `light.turn_on` is needed to turn on the device.

| Data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | The entity_id of the LED light to set the effect on. |
| `colors` | List of colors for each zone (RGB). (Max 2048 Colors) |
| `speed_pct` | The speed of the effect in % (0-100. Default 50) |
| `effect` | The effect you would like. Valid options are `static`, `running_water`, `strobe`, `jump`, or `breathing`. (Default `static`) |

```yaml
#Example action
action: flux_led.set_zones
target:
  entity_id:
    - light.addressable_v3_8e2f7f
    - light.addressable_v3_8ebdeb
data:
  colors:
    - [255, 0, 0]
    - [0, 255, 0]
    - [0, 0, 255]
    - [255, 255, 255]
  speed_pct: 80
```

### Set Music Mode - Action `flux_led.set_music_mode`

The RGB with MIC (0x08), Addressable v2 (0xA2), and Addressable v3 (0xA3) models have a built-in microphone that have multiple music mode settings.

| Data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | The entity_id of the LED light to set the effect on. |
| `sensitivity` | Microphone sensitivity (0-100) |
| `brightness` | Light brightness (0-100) |
| `light_screen` | Light screen mode for 2 dimensional pixels (Addressable models only) |
| `effect` | Effect (1-16 on Addressable models, 0-3 on RGB with MIC models)|
| `foreground_color` | The foreground RGB color |
| `background_color` | The background RGB color (Addressable models only) |

```yaml
#Example action
action: flux_led.set_music_mode
target:
  entity_id:
    - light.addressable_v3_8e2f7f
    - light.addressable_v3_8ebdeb
data:
  sensitivity: 100
  brightness: 100
  effect: 2
  light_screen: false
  background_color: [0, 255, 0]
  foreground_color: [255, 0, 0]
```
