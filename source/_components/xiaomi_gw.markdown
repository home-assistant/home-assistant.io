---
layout: page
title: "Xiaomi Gateway”
description: "Instructions how to integrate your Xiaomi Gateway within Home Assistant."
date: 2017-07-21 16:34
sidebar: true
comments: false
sharing: true
footer: true
logo: xiaomi.png
ha_category: Hub
ha_release: 0.50
---

The `xiaomi_gw` platform allows you to integrate the following devices into HA

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

{% linkable_title Getting started %}

Follow the setup process using your phone and Mi Home app. From here you will be able to retrieve the key from within the app following [this tutorial](https://community.home-assistant.io/t/beta-xiaomi-gateway-integration/8213/1832)

{% linkable_title Configuration %}

One Gateway
  ```yaml
 # You can leave mac empty if you only have one gateway
 xiaomi:
   gateways:
     - mac:
       key: xxxxxxxxxxxxxxxx
  ```

 Multiple Gateway
  ```yaml
 # 12 characters mac can be obtained from the gateway.
 xiaomi:
   gateways:
     - mac: xxxxxxxxxxxx
       key: xxxxxxxxxxxxxxxx
     - mac: xxxxxxxxxxxx
       key: xxxxxxxxxxxxxxxx
  ```

Configuration variables:
- **mac** (*Optional*): The MAC of your gateway. Required if you have more than one.
- **key** (*Optional*): The key of your gateway. Required if you also want to control lights and switches; sensors and binary sensors will still work.
- **discovery_retry** (*Optional*): Amount of times Home Assitant should try to reconnect to the Xiaomi Gateway. Default is 3.
- **interface** (*Optional*): Which network interface to use. Default to any.
