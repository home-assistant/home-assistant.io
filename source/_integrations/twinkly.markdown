---
title: Twinkly
description: Instructions on how to integrate Twinkly led string to Home Assistant.
ha_category:
  - Light
ha_release: '0.40'
ha_config_flow: true
ha_domain: twinkly
ha_iot_class: Local pull
---

The `twinkly` integration allows you to control [Twinkly](https://twinkly.com/) led string from Home Assistant.

The Twinkly devices does not store the effects locally, they are instead re-sent from the Twinkly application each time.
This means that this integration does not support to change the LED string effect.
It only supports to configure the brightness and to turn the device on and off.

## Setup

You can setup this integration from the Home Assistant user interface,
it only requires the host (or IP address) of your twinkly device.
If configured using an IP address, you should make sure to assign a static IP to your device.
