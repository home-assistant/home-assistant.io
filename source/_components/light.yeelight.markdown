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
        transition: 1000
        use_music_mode: true
        save_on_change: false
      192.168.1.13:
        name: Front Door
```

Configuration variables:

- **ip** (*Required*): IP(s) of your Wifi bulbs
- **name** (*Optional*): A friendly name for the device.
- **transition** (*Optional*, default 350): Smooth transitions over time (in ms).
- **use_music_mode** (*Optional*, default `false`): Enable music mode.
- **save_on_change** (*Optional*, default `true`): Saves the bulb state when changed from Home Assistant.

#### {% linkable_title Music mode  %}
Per default the bulb limits the amount of requests per minute to 60, a limitation which can be bypassed by enabling the music mode. In music mode the bulb is commanded to connect back to a socket provided by the component and it tries to keep the connection open, which may not be wanted in all use-cases.

### {% linkable_title Initial setup %}
<p class='note'>
Before trying to control your light through Home Assistant, you have to setup your bulb using Yeelight app. ( [Android](https://play.google.com/store/apps/details?id=com.yeelight.cherry&hl=fr), [IOS](https://itunes.apple.com/us/app/yeelight/id977125608?mt=8) ).
In the bulb property, you have to enable "LAN Mode" (previously called "Developer mode"). LAN mode may only be available with the latest firmware installed on your bulb.  Firmware can be updated in the application after connecting the bulb.
Determine your bulb IP (using router, software, ping ...).
Information on how to enable "LAN Mode" can be found [here](https://getyeti.co/posts/how-to-control-yeelight-and-your-smarthome-with-yeti).
</p>

<p class='note warning'>
This component is tested to work with the following models. If you have a different model and it is working please let us know.
</p>

- **YLDP01YL**: LED Bulb (White)
- **YLDP02YL**: LED Bulb (Color)
- **YLDP03YL**: LED Bulb (Color) - E26
- **YLDP06YL**: LED Bulb (Color) II
- **YLDD01YL**: Lightstrip (Color)
- **YLDD02YL**: Lightstrip (Color)
- **MJCTD01YL**: Xiaomi Mijia Bedside Lamp - WIFI Version!
- **MJTD01YL**: Xiaomi Mijia Smart LED Desk Lamp (autodiscovery isn't possible because the device doesn't support mDNS due to the small amount of RAM)
- **YLXD02YL**: Yeelight Ceiling Light 4 (Jiaoyue 650)
- **YLXD01YL**: Yeelight Smart LED Ceiling Light - Youth Version


## {% linkable_title Platform Services %}

### {% linkable_title Service `light.yeelight_set_mode` %}

Set an operation mode.

| Service data attribute    | Optional | Description                                                                                 |
|---------------------------|----------|---------------------------------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific yeelight. Else targets all.                                          |
| `mode`                    |       no | Operation mode. Valid values are 'last', 'normal', 'rgb', 'hsv', 'color_flow', 'moonlight'. |
