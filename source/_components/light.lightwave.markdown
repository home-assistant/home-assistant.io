---
layout: page
title: "Lightwave Light"
description: "Instructions on how to integrate Lightwave lights with Home Assistant."
date: 2018-12-02 18:00
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

The first use of a light will try to register with the WiFi Link hub. If the hub has not been registered a message on your WiFi Link asking you to pair the device. You have 12 seconds to push the button on the WiFi Link to accept this. Once done, you should be able to control your lights via Home Asssistant. This only needs to be done if the hub has not been registered.

<p class='note'>
Configuration details for the Lightwave platform can be found on the main [Lightwave component](/components/lightwave/) page.
</p>