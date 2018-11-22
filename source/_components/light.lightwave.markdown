---
layout: page
title: "Lightwave Light"
description: "Instructions on how to integrate Lightwave lights with Home Assistant."
date: 2018-11-22 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lightwave.png
ha_category: Light
ha_release: 0.1
ha_iot_class: "Local Polling"
---
The `lightwave` light platform integrates your Lightwave lights into Home Assistant.
To add your Lightwave devices into your Home Assistant installation, add the following to your `configuration.yaml` file:
```yaml
# Example configuration.yaml entry
light:
    - platform: lightwave
        devices:
        R1D1:
            name: Room one Device one
        R1D2:
            name: Room one Device two
        R8D3:
            name: Room eight Device three
   
```
Each **device** requires an **id** and a **name**. The **id** takes the form **R#D#** where **R#** is the room number and **D#** is the device number.

The first use of a switch or light will try to register with the WiFi Link hub. If the hub has not been registered a message on your WiFi Link asking you to pair the device. You have 12 seconds to push the button on the WiFi Link to accept this. Once done, you should be able to control your lights via Home Asssistant. This only needs to be done once only if the hub has not been registered.

<p class='note'>
Configuration details for the Lightwave platform can be found on the main [Lightwave component](/components/lightwave/) page.
</p>