---
layout: page
title: "Yeelight Wifi Bulb"
description: "Instructions on how to setup Yeelight Wifi devices within Home Assistant."
date: 2016-10-29
sidebar: true
comments: false
sharing: true
footer: true
logo: yeelight.png
ha_category: Light
ha_release: 0.32
ha_iot_class: "Local Polling"
---

The `yeelight` light platform allows you to control your Yeelight Wifi bulbs with Home Assistant.

### {% linkable_title Example configuration %}

To enable those lights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: yeelight
    devices:
      192.168.1.25:
        name: Living Room
```

{% configuration %}
devices:
  required: true
  description: List of Yeelight devices.
  type: map
  keys:
    ip:
      description: IP address of the bulb.
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
          default: False
        save_on_change:
          description: Saves the bulb state in its nonvolatile memory when changed from Home Assistant.
          required: false
          type: boolean
          default: False
        model:
          description: "Yeelight model. Possible values are `mono1`, `color1`, `color2`, `strip1`, `bslamp1`, `ceiling1`, `ceiling2`, `ceiling3`, `ceiling4`. The setting is used to enable model specific features f.e. a particular color temperature range."
          required: false
          type: string
{% endconfiguration %}

#### {% linkable_title Music mode  %}
Per default the bulb limits the amount of requests per minute to 60, a limitation which can be bypassed by enabling the music mode. In music mode the bulb is commanded to connect back to a socket provided by the component and it tries to keep the connection open, which may not be wanted in all use-cases.
**Also note that bulbs in music mode will not update their state to "unavailable" if they are disconnected, which can cause delays in Home Assistant. Bulbs in music mode may also not react to commands from HASS the first time if the connection is dropped. If you experience this issue, turn the light off and back on again in the frontend and everything will return to normal.**

### {% linkable_title Initial setup %}
<p class='note'>
Before trying to control your light through Home Assistant, you have to setup your bulb using Yeelight app. ( [Android](https://play.google.com/store/apps/details?id=com.yeelight.cherry&hl=fr), [IOS](https://itunes.apple.com/us/app/yeelight/id977125608?mt=8) ).
In the bulb property, you have to enable "LAN Mode" (previously called "Developer mode"). LAN mode may only be available with the latest firmware installed on your bulb.  Firmware can be updated in the application after connecting the bulb.
Determine your bulb IP (using router, software, ping...).
Information on how to enable "LAN Mode" can be found [here](https://getyeti.co/posts/how-to-control-yeelight-and-your-smarthome-with-yeti).
</p>

### {% linkable_title Supported models %}

<p class='note warning'>
This component is tested to work with the following models. If you have a different model and it is working please let us know.
</p>

| Model ID   | Model number | Product name                                     |
|------------|--------------|--------------------------------------------------|
| `mono1`    | YLDP01YL     | LED Bulb (White)                                 |
| ?          | YLDP05YL     | LED Bulb (White) - 2nd generation                |
| `color1`   | YLDP02YL     | LED Bulb (Color)                                 |
| `color1`   | YLDP03YL     | LED Bulb (Color) - E26                           |
| `color2`   | YLDP06YL     | LED Bulb (Color) - 2nd generation                |
| `strip1`   | YLDD01YL     | Lightstrip (Color)                               |
| `strip1`   | YLDD02YL     | Lightstrip (Color)                               |
| ?          | YLDD04YL     | Lightstrip (Color)
| `bslamp1`  | MJCTD01YL    | Xiaomi Mijia Bedside Lamp - WIFI Version!        |
| `lamp1`    | MJTD01YL     | Xiaomi Mijia Smart LED Desk Lamp (autodiscovery isn't possible because the device doesn't support mDNS due to the small amount of RAM) |
| `ceiling1` | YLXD01YL     | Yeelight Ceiling Light                           |
| `ceiling2` | YLXD03YL     | Yeelight Ceiling Light - Youth Version           |
| ?, may be `ceiling3` | YLXD04YL     | Yeelight Ceiling Light (Jiaoyue 450)   |
| `ceiling3` | YLXD05YL     | Yeelight Ceiling Light (Jiaoyue 480)             |
| `ceiling4` | YLXD02YL     | Yeelight Ceiling Light (Jiaoyue 650)             |

## {% linkable_title Platform Services %}

### {% linkable_title Service `light.yeelight_set_mode` %}

Set an operation mode.

| Service data attribute    | Optional | Description                                                                                 |
|---------------------------|----------|---------------------------------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific yeelight. Else targets all.                                          |
| `mode`                    |       no | Operation mode. Valid values are 'last', 'normal', 'rgb', 'hsv', 'color_flow', 'moonlight'. |

## {% linkable_title Examples %}

In this section you find some real-life examples of how to use this light.

### {% linkable_title Full configuration %}

This example shows how you can use the optional configuration options.

```yaml
# Example configuration.yaml entry
light:
  - platform: yeelight
    devices:
      192.168.1.25:
        name: Living Room
        transition: 1000
        use_music_mode: True
        save_on_change: True
```

### {% linkable_title Multiple bulbs %}

This example shows how you can add multiple bulbs in your configuration.

```yaml
light:
  - platform: yeelight
    devices:
      192.168.1.25:
        name: Living Room
      192.168.1.13:
        name: Front Door
```
