---
layout: page
title: "Lightwave Light"
description: "Instructions on how to integrate Lightwave lights with Home Assistant."
date: 2018-12-03 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lightwave.png
ha_category: Light
ha_release: 0.84
ha_iot_class: "Assumed State"
---
The `lightwave` light platform integrates your Lightwave lights into Home Assistant.

The first use of a light will try to register with your Lightwave WiFi Link hub. If the hub has not been registered a message on your hub will be displayed asking you to pair the device. You have 12 seconds to push the button on your hub to accept this. Once done, you should be able to control your lights via Home Assistant. This only needs to be done if the hub has not been registered.
<p class='note'>
Configuration details for the Lightwave platform can be found on the main [Lightwave component](/components/lightwave/) page.
</p>