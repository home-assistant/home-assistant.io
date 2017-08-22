---
layout: page
title: "Xiaomi Gateway"
description: "Instructions how to integrate your Xiaomi Gateway within Home Assistant."
date: 2017-07-21 16:34
sidebar: true
comments: false
sharing: true
footer: true
logo: xiaomi.png
ha_category: Hub
ha_release: "0.50"
ha_iot_class: "Local Polling"
---

The `xiaomi_gw` platform allows you to integrate the following [Xiaomi](http://www.mi.com/en/) devices into Home Assistant.

- Temperature and Humidity Sensor (old and new version)
- Motion Sensor (old and new version)
- Door and Window Sensor (old and new version)
- Button (old and new version)
- Plug aka Socket (ZigBee version, reports power consumed, power load, state and if device in use)
- Wall Plug (reports power consumed, power load and state)
- Aqara Wall Switch (Single)
- Aqara Wall Switch (Double)
- Aqara Wall Switch LN (Single)
- Aqara Wall Switch LN (Double)
- Aqara Wireless Switch (Single)
- Aqara Wireless Switch (Double)
- Cube
- Gas Leak Detector (reports alarm and density)
- Smoke Detector (reports alarm and density)
- Gateway (Light, Illumination Sensor, Ringtone play)
- Intelligent Curtain
- Battery


What's not available?

- Gateway Radio
- Gateway Button
- Water Sensor
- Aqara Air Conditioning Companion
- Aqara Intelligent Air Conditioner Controller Hub
- Decoupled mode of the Aqara Wall Switches (Single & Double)
- Additional alarm events of the Gas and Smoke Detector: Analog alarm, battery fault alarm (smoke detector only), sensitivity fault alarm, I2C communication failure


Follow the setup process using your phone and Mi Home app. From here you will be able to retrieve the key from within the app following [this tutorial](https://community.home-assistant.io/t/beta-xiaomi-gateway-integration/8213/1832)

To enable Xioami gateway in your installation, add the following to your `configuration.yaml` file:

One Gateway

```yaml
# You can leave mac empty if you only have one gateway.
xiaomi:
  gateways:
   - mac:
     key: xxxxxxxxxxxxxxxx
```


Multiple Gateways

```yaml
# 12 characters mac can be obtained from the gateway.
xiaomi:
  gateways:
    - mac: xxxxxxxxxxxx
      key: xxxxxxxxxxxxxxxx
    - mac: xxxxxxxxxxxx
      key: xxxxxxxxxxxxxxxx
```



Search for gateways on specific interface

```yaml
# 12 characters mac can be obtained from the gateway.
xiaomi:
  interface: '192.168.0.1'
  gateways:
    - mac: xxxxxxxxxxxx
      key: xxxxxxxxxxxxxxxx
```


Configuration variables:

- **mac** (*Optional*): The MAC of your gateway. Required if you have more than one.
- **key** (*Optional*): The key of your gateway. Required if you also want to control lights and switches; sensors and binary sensors will still work.
- **discovery_retry** (*Optional*): Amount of times Home Assitant should try to reconnect to the Xiaomi Gateway. Default is 3.
- **interface** (*Optional*): Which network interface to use. Defaults to any.

## {% linkable_title Services %}

The gateway provides two services: `xiaomi.play_ringtone` and `xiaomi.stop_ringtone`. To play ringtones by Home Assistant the version of the gateway firmware must be `1.4.1_145` at least. A `ringtone_id` and `gw_mac` must be supplied. The parameter `ringtone_vol` (percent) is optional. Allowed values of the `ringtone_id` are:

- alarm ringtones [0-8]
- doorbell ring [10-13]
- alarm clock [20-29]
- custom ringtones (uploaded by mi home app) starting from 10001

Automation example

```yaml
- alias: Let a dog bark on long press
  trigger:
    platform: event
    event_type: click
    event_data:
      entity_id: binary_sensor.switch_158d000xxxxxc2
      click_type: long_click_press
  action:
    service: xiaomi.play_ringtone
    data:
      gw_mac: xxxxxxxxxxxx
      ringtone_id: 8
      ringtone_vol: 8

- alias: Stop barking immediately on single click
  trigger:
    platform: event
    event_type: click
    event_data:
      entity_id: binary_sensor.switch_158d000xxxxxc2
      click_type: single
  action:
    service: xiaomi.stop_ringtone
    data:
      gw_mac: xxxxxxxxxxxx
```
