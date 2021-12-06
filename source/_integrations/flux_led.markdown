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

### Set Zones - Service `flux_led.set_zones`

The Addressable v3 (0xA3) models allow setting a color effect per zone. The length of each zone is the number of pixels per segment divided by the number of colors. If the device is turned off, setting the zones will not turn it on. A separate call to `light.turn_on` is needed to turn on the device.

| Service data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | The entity_id of the LED light to set the effect on. |
| `colors` | List of colors for each zone (RGB). (Max 2048 Colors) |
| `speed_pct` | The speed of the effect in % (0-100. Default 50) |
| `effect` | The effect you would like. Valid options are `static`, `running_water`, `strobe`, `jump`, or `breathing`. (Default `static`) |

```yaml
#Example Service Call
service: flux_led.set_zones
target:
  entity_id:
    - light.addressable_v3_8e2f7f
    - light.addressable_v3_8ebdeb
data:
  colors:
    - - 255
      - 0
      - 0
    - - 0
      - 255
      - 0
    - - 0
      - 0
      - 255
    - - 255
      - 255
      - 255
  speed_pct: 80
```
