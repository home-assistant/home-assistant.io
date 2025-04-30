---
title: Yeelight
description: Instructions on how to setup Yeelight Wifi devices within Home Assistant.
ha_category:
  - Light
ha_release: 0.32
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@zewelor'
  - '@shenxn'
  - '@starkillerOG'
  - '@alexyao2015'
ha_domain: yeelight
ha_platforms:
  - binary_sensor
  - light
ha_homekit: true
ha_dhcp: true
ha_zeroconf: true
ha_integration_type: integration
---

The **Yeelight** {% term integration %} allows you to control your Yeelight Wi-Fi bulbs with Home Assistant.

There is support for the following device types within Home Assistant:

- **Light** - The Yeelight platform for supporting lights.
- **Binary sensor** - The Yeelight platform for supporting binary sensors. Currently, only nightlight mode sensor for ceiling lights.

{% include integrations/config_flow.md %}

### Custom effects

Custom effects can only be set up through YAML configuration. To turn on the effect you can use [light.turn_on](/integrations/light/#action-lightturn_on) action.

Possible transitions are `RGBTransition`, `HSVTransition`, `TemperatureTransition`, `SleepTransition`.

Where the array values are as per the following:

- RGBTransition: [red, green, blue, duration, brightness] with red/green/blue being a number between 0 and 255, the duration being in milliseconds (with a minimum of 50) and the final brightness to transition to 1-100 (%).
- HSVTransition: [hue, saturation, duration, brightness] with hue being a number between 0 and 359, saturation 0 -100, the duration in milliseconds (with a minimum of 50) and the final brightness 1-100 (%).
- TemperatureTransition: [temp, duration, brightness] with temp being the final color temperature between 1700 and 6500, the duration in milliseconds (with a minimum of 50) and the final brightness to transition to 1-100 (%).
- SleepTransition: [duration] with duration being a number for the effect time in milliseconds (with a minimum of 50).

More info about transitions and their expected parameters can be found in [python-yeelight documentation](https://yeelight.readthedocs.io/en/stable/flow.html).

```yaml
yeelight:
  custom_effects:
    - name: 'Fire Flicker'
      flow_params:
        count: 0
        transitions:
          - TemperatureTransition: [1900, 1000, 80]
          - TemperatureTransition: [1900, 2000, 60]
          - SleepTransition:       [1000]
```

### Full configuration

This example shows how you can use the optional configuration options.

```yaml
# Example configuration.yaml entry
yeelight:
  devices:
    192.168.1.25:
      name: Living Room
      transition: 1000
      use_music_mode: true
      save_on_change: true
  custom_effects:
    - name: 'Fire Flicker'
      flow_params:
        count: 0
        transitions:
          - TemperatureTransition: [1900, 1000, 80]
          - TemperatureTransition: [1900, 2000, 60]
          - SleepTransition:       [1000]
```

{% configuration %}
devices:
  required: false
  description: List of Yeelight devices.
  type: map
  keys:
    host:
      description: Hostname or IP address of the bulb.
      required: true
      type: map
      keys:
        name:
          description: A friendly name for the device.
          required: false
          type: string
        transition:
          description: Smooth transitions over time (in ms).
          required: false
          type: integer
          default: 350
        use_music_mode:
          description: Enable music mode.
          required: false
          type: boolean
          default: false
        save_on_change:
          description: Saves the bulb state in its nonvolatile memory when changed from Home Assistant.
          required: false
          type: boolean
          default: false
        nightlight_switch_type:
          description: Adds another entity, to control nightlight mode (for models that supports it). Currently, only `light` is supported. It will create 2 light entities, one for normal light mode and second for nightlight mode. They are mutually exclusive.
          required: false
          type: string
        model:
          description: "Yeelight model. Possible values are `mono1`, `color1`, `color2`, `strip1`, `bslamp1`, `ceiling1`, `ceiling2`, `ceiling3`, `ceiling4`, `ceiling10`, `ceiling13`. The setting is used to enable model specific features f.e. a particular color temperature range."
          required: false
          type: string
custom_effects:
  description: List of custom effects to add. Check examples below.
  required: false
  type: map
  keys:
    name:
      description: Name of effect.
      required: true
      type: string
    flow_params:
       description: Flow params for effect.
       required: true
       type: map
       keys:
         count:
           description: The number of times to run this flow (0 to run forever).
           required: false
           type: integer
           default: 0
         action:
            description: The action to take after the flow stops. Can be 'recover', 'stay', 'off'.
            required: false
            type: string
            default: recover
         transitions:
           description: List of transitions, for that effect, check [example](#custom-effects).
           required: true
           type: list
{% endconfiguration %}

### Music mode

Per default, the bulb limits the number of requests per minute to 60, a limitation that can be bypassed by enabling the music mode. In music mode, the bulb is commanded to connect back to a socket provided by the {% term integration %} and it tries to keep the connection open, which may not be wanted in all use-cases.
**Also note that bulbs in music mode will not update their state to "unavailable" if they are disconnected, which can cause delays in Home Assistant. Bulbs in music mode may also not react to commands from Home Assistant the first time if the connection is dropped. If you experience this issue, turn the light off and back on again in the frontend and everything will return to normal.**

### Initial setup

{% important %}

Before trying to control your light through Home Assistant, you have to set up your bulb using the Yeelight app. ( [Android](https://play.google.com/store/apps/details?id=com.yeelight.cherry&hl=fr), [IOS](https://itunes.apple.com/us/app/yeelight/id977125608?mt=8) ).
In the bulb property, you have to enable "LAN Control" (previously called "Developer mode"). LAN Control may only be available with the latest firmware installed on your bulb.  Firmware can be updated in the application after connecting the bulb.
Determine your bulb IP (using router, software, ping...).
Currently, there is no official way to change LAN mode. However, some methods might be found here:
- [Desktop app](https://community.home-assistant.io/t/the-easiest-method-to-enable-lan-developer-mode-on-xiaomi-bulb/727360)
- CLI using the python-miio library: [1](https://community.home-assistant.io/t/integrate-mi-smart-led-bulb-easy-steps/312174), [2](https://community.home-assistant.io/t/integrate-mi-smart-led-bulb-warm-white-xmbgdp01ylk/290404)

{% endimportant %}

### Supported models

{% note %}
This {% term integration %} is tested to work with the following models. If you have a different model and it is working, please let us know.
{% endnote %}

| Model ID   | Model number | Product name                                     |
|------------|--------------|--------------------------------------------------|
| `mono`     | YLTD03YL     | Yeelight Serene Eye-Friendly Desk Lamp           |
| `mono1`    | YLDP01YL     | LED Bulb (White)                                 |
| ?          | YLDP05YL     | LED Bulb (White) - 2nd generation                |
| `color1`   | YLDP02YL     | LED Bulb (Color)                                 |
| `color1`   | YLDP03YL     | LED Bulb (Color) - E26                           |
| `color2`   | YLDP06YL     | LED Bulb (Color) - 2nd generation                |
| `color4`   | YLDP13YL     | LED Bulb 1S (Color)                              |
| `color4`   | YLDP04YL     | LED Bulb 1S (Color)                              |
| `color6`   | YLDP13AYL    | LED Bulb 1S (Color)                              |
| `colorb`   | YLDP005      | LED Bulb (Color)                                 |
| `colorc`   | YLDP004-A    | GU10 W1 (Color)                                  |
| `strip1`   | YLDD01YL     | Lightstrip (Color)                               |
| `strip1`   | YLDD02YL     | Lightstrip (Color)                               |
| ?          | YLDD04YL     | Lightstrip (Color)                               |
| `strip6`   | YLDD05YL     | Lightstrip (Color)                               |
| `bslamp1`  | MJCTD01YL    | Xiaomi Mijia Bedside Lamp - Wi-Fi Version!       |
| `bslamp1`  | MJCTD02YL    | Xiaomi Mijia Bedside Lamp II                     |
| `RGBW`     | MJDP02YL     | Mi LED smart Lamp - white and color Wi-Fi Version|
| `lamp`     | MJTD02YL     | Xiaomi Mijia Desk Lamp Pro                       |
| `lamp1`    | MJTD01YL     | Xiaomi Mijia Smart LED Desk Lamp (autodiscovery isn't possible because the device doesn't support mDNS due to the small amount of RAM) |
| `lamp9`    | YLCT03YL     | Yeelight Staria Bedside Lamp Pro                 |
| `lamp15`   | YLTD003      | Yeelight LED Screen Light Bar Pro                |
| `ceiling1` | YLXD01YL     | Yeelight Ceiling Light                           |
| `ceiling2` | YLXD03YL     | Yeelight Ceiling Light - Youth Version           |
| ?          | YLXD62YI     | Yeelight Ceiling Light (Jiaoyue 260)             |
| ?, may be `ceiling3` | YLXD04YL     | Yeelight Ceiling Light (Jiaoyue 450)   |
| `ceiling3` | YLXD05YL     | Yeelight Ceiling Light (Jiaoyue 480)             |
| `ceiling4` | YLXD02YL     | Yeelight Ceiling Light (Jiaoyue 650)             |
| `ceiling10`| YLDL01YL     | Yeelight Meteorite Pendant Light                 |
| `ceiling13`| YLXD01YL     | Yeelight LED Ceiling Light                       |
| `ceil26`   | YLXD76YL     | Yeelight Ceiling Light - Updated HomeKit 23w     |
| ?, may be `ceilb` | YLXD013-B    | Yeelight Arwen Ceiling Light 450C         |
| ?, may be `ceilb` | YLXD013-C    | Yeelight Arwen Ceiling Light 550C         |
| `ceilb`    | YLXD013      | Yeelight Arwen Ceiling Light 450S                |

## Actions

### Action `yeelight.set_mode`

Set an operation mode.

| Data attribute    | Optional | Description                                                                                 |
|---------------------------|----------|---------------------------------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific lights.                                                                |
| `mode`                    |       no | Operation mode. Valid values are 'last', 'normal', 'rgb', 'hsv', 'color_flow', 'moonlight'. |

### Action `yeelight.start_flow`

Start flow with specified transitions

| Data attribute    | Optional | Description                                                                                 |
|---------------------------|----------|---------------------------------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific lights.                                                                |
| `count`                   |      yes | The number of times to run this flow (0 to run forever).                                    |
| `action`                  |      yes | The action to take after the flow stops. Can be 'recover', 'stay', 'off'. Default 'recover' |
| `transitions`             |       no | Array of transitions. See [custom effects](#custom-effects).                                |

### Action `yeelight.set_color_scene`

Changes the light to the specified RGB color and brightness. If the light is off, it will be turned on.

| Data attribute    | Optional | Description                                                                                 |
|---------------------------|----------|---------------------------------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific lights.                                                                |
| `rgb_color`               |       no | A list containing three integers between 0 and 255 representing the RGB color you want the light to be. Three comma-separated integers that represent the color in RGB, within square brackets.|
| `brightness`              |       no | The brightness value to set (1-100).                                                        |

### Action `yeelight.set_hsv_scene`

Changes the light to the specified HSV color and brightness. If the light is off, it will be turned on.

| Data attribute    | Optional | Description                                                                                 |
|---------------------------|----------|---------------------------------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific lights.                                                                |
| `hs_color`                |       no | A list containing two floats representing the hue and saturation of the color you want the light to be. Hue is scaled 0-360, and saturation is scaled 0-100.    |
| `brightness`              |       no | The brightness value to set (1-100).                                                        |

### Action `yeelight.set_color_temp_scene`

Changes the light to the specified color temperature. If the light is off, it will be turned on.

| Data attribute    | Optional | Description                                                                                 |
|---------------------------|----------|---------------------------------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific lights.                                                                |
| `kelvin`                  |       no | Color temperature in Kelvin.                                                                |
| `brightness`              |       no | The brightness value to set (1-100).                                                        |

### Action `yeelight.set_color_flow_scene`

Starts a color flow. Difference between this and [yeelight.start_flow](#action-yeelightstart_flow), this action uses different a Yeelight API call. If the light was off, it will be turned on. There might be some firmware differences in handling complex flows, etc.

| Data attribute    | Optional | Description                                                                                 |
|---------------------------|----------|---------------------------------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific lights.                                                                |
| `count`                   |      yes | The number of times to run this flow (0 to run forever).                                    |
| `action`                  |      yes | The action to take after the flow stops. Can be 'recover', 'stay', 'off'. Default 'recover' |
| `transitions`             |       no | Array of transitions. See [custom effects](#custom-effects).                                |

### Action `yeelight.set_auto_delay_off_scene`

Turns the light on to the specified brightness and sets a timer to turn it back off after the given number of minutes. If the light is off, it will be turned on.

| Data attribute    | Optional | Description                                                                                 |
|---------------------------|----------|---------------------------------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific lights.                                                                |
| `minutes`                 |       no | The minutes to wait before automatically turning the light off.                             |
| `brightness`              |       no | The brightness value to set (1-100).                                                        |

### Action `yeelight.set_music_mode`

Enable or disable music_mode.

| Data attribute    | Optional | Description                                                                                 |
|---------------------------|----------|---------------------------------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific lights.                                                                |
| `music_mode`              |       no | Use 'true' or 'false' to enable / disable music_mode.                                       |
