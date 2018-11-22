---
layout: page
title: "Lightwave"
description: "Instructions on how to integrate Lightwave devices with Home Assistant."
date: 2018-11-22 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lightwave.png
ha_category: Hub
ha_release: 0.1
ha_iot_class: "Local Polling"
---
The `lightwave` component is the main component to set up and supported Lightwave lights and switches. Lights and switches need to be added in their own sections
This component uses the official API published by Lightwave on their website [https://api.lightwaverf.com/](https://api.lightwaverf.com/).
To add your Lightwave devices into your Home Assistant installation, add the following to your `configuration.yaml` file:
```yaml
# Example configuration.yaml entry
lightwave:
    host: ip_address
```
Where *ip_address* is the ip address of your Lightwave hub.
The Lightwave Home Assistant platform currently supports the following Lightwave devices:
- Lightwave lights
- Lightwave switches