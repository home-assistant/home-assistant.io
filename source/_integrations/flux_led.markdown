---
title: Flux LED/MagicHome
description: Instructions on how to setup Flux led/MagicHome/MagicLight within Home Assistant.
ha_category:
  - Light
  - Switch
ha_iot_class: Local Push
ha_release: 0.25
ha_domain: flux_led
ha_platforms:
  - light
  - number
  - switch
ha_codeowners:
  - '@icemanch'
ha_quality_scale: platinum
ha_config_flow: true
ha_dhcp: true
---

The Flux LED integration supports several brands of switches, bulbs, and controllers that use the same protocol and have the HF-LPB100 chipset in common. Chances are high that your bulb or controller (eg. WiFi LED CONTROLLER) will work with this integration if you can control the device with the MagicHome app.

This integration will provide local control over your LED lights/strips and can be configured to auto-scan your network for controllers or for you to manually configure individual lights by their IP address.

Example of bulbs:

- [Flux Smart Lighting](https://www.fluxsmartlighting.com/)
- [Flux WiFi Smart LED Light Bulb4](https://amzn.to/2X0dVwu)
- [WIFI smart LED light Bulb1](https://amzn.to/2J2fksr)

Examples of controllers:

- [Ledenet WiFi RGBW Controller](https://amzn.to/2WZKXNa)
- [SUPERNIGHT WiFi Wireless LED Smart Controller](https://amzn.to/2WURx7w)



{% include integrations/config_flow.md %}

After the devices have been added they can be configured with different effects listed below. These settings can be accessed by navigating to the integration settings in Configuration -> Integrations and selecting the "Flux Led/Magic Home" configuration for the bulb or controller. 


**Custom Effect**\
A list of RGB colors can be entered to create an effect. The effect speed can be adjusted using the slider underneath.

**Custom Effect Type**\
This determines the transition between each color. 

### Supported Models

The following models have been tested with integration.

| Model | Description                 | Notes                           |
| ----- | --------------------------- | ------------------------------- |
| 0x01  | Legacy RGB Controller       | Original protocol               |
| 0x03  | Legacy CCT Controller       | Original protocol               |
| 0x04  | UFO Controller RGBW         |                                 |
| 0x06  | Controller RGBW             |                                 |
| 0x07  | Controller RGBCW            |                                 |
| 0x08  | Controller RGB with MIC     |                                 |
| 0x0E  | Floor Lamp RGBCW            |                                 |
| 0x10  | Christmas Light             |                                 |
| 0x1A  | Christmas Light             |                                 |
| 0x1C  | Table Light CCT             |                                 |
| 0x21  | Bulb Dimmable               |                                 |
| 0x25  | Controller RGB/WW/CW        | Supports RGB, RGBW, RGBWW, CW, DIM |
| 0x33  | Controller RGB              |                                 |
| 0x35  | Bulb RGBCW                  |                                 |
| 0x41  | Controller Dimmable         |                                 |
| 0x44  | Bulb RGBW                   |                                 |
| 0x52  | Bulb CCT                    |                                 |
| 0x54  | Downlight RGBW              |                                 |
| 0x93  | Switch 1c                   |                                 |
| 0x94  | Switch 1c Watt              |                                 |
| 0x97  | Socket 1c                   |                                 |
| 0xA1  | Addressable v1              | Supports UCS1903, SM16703, WS2811, WS2812B, SK6812, INK1003, WS2801, LB1914 |
| 0xA2  | Addressable v2              | Supports UCS1903, SM16703, WS2811, WS2811B, SK6812, INK1003, WS2801, WS2815, APA102, TM1914, UCS2904B |
| 0xA3  | Addressable v3              | Supports WS2812B, SM16703, SM16704, WS2811, UCS1903, SK6812, SK6812RGBW, INK1003, UCS2904B |

### Unsupported Models

The following models have not been tested with integration but may work.

| Model | Description                 | Notes                           |
| ----- | --------------------------- | ------------------------------- |
| 0x02  | Legacy Dimmable Controller  | Original protocol               |
| 0x09  | Ceiling Light CCT           |                                 |
| 0x16  | Magnetic Light CCT          |                                 |
| 0x17  | Magnetic Light Dimmable     |                                 |
| 0x19  | Socket 2 USB                |                                 |
| 0x18  | Plant Light                 |                                 |
| 0x1B  | Spray Light                 |                                 |
| 0x1E  | Ceiling Light RGBCW         | Probably works & same as 0x35   |
| 0x62  | Controller CCT              | May be discontinued             |
| 0x95  | Switch 2c                   |                                 |
| 0x96  | Switch 4c                   |                                 |
| 0xD1  | Digital Light               |                                 |
| 0xE1  | Ceiling Light               |                                 |
| 0xE2  | Ceiling Light Assist        |                                 |
| 0xA4  | Addressable v4              | Probably works & same as 0xA3   |
| 0xA6  | Addressable v6              | Probably works & same as 0xA3   |

### Effects

The Flux LED light offers a number of effects which are not included in other lighting packages. These can be selected from the front-end, or sent in the effect field of the `light.turn_on` command.

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


### Custom Effects - Service `flux_led.set_custom_effect`

The integration offers a custom service to enable you to set the lights to a custom light effect. 

| Service data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | The entity_id of the LED light to set the effect on. |
| `colors` | List of RGB colors to transition between in your effect. (Max 16, Required) |
| `speed_pct` | The speed of the effect in % (0-100. Default 50) |
| `transition` | The transition effect you would like. Valid options are `gradual`, `jump`, or `strobe`. (Default `gradual`) |

```yaml
#Example Service Call
entity_id: light.led_strip
colors:
  - [255,0,0]
  - [0,255,0]
  - [0,0,255]
speed_pct: 80
transition: "jump"
```
