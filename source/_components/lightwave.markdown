---
layout: page
title: "Lightwave"
description: "Instructions on how to integrate Lightwave devices with Home Assistant."
date: 2018-12-03 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lightwave.png
ha_category:
  - Hub
  - Light
  - Switch
ha_release: 0.89
ha_iot_class: "Assumed State"
redirect_from:
  - /components/light.lightwave/
  - /components/switch.lightwave/
---

The `lightwave` component links Home Assistant with your Lightwave WiFi link.

The Lightwave Home Assistant component currently supports the following Lightwave devices:

- Light
- Switch

This component uses the official API published by Lightwave on their website [https://api.lightwaverf.com/](https://api.lightwaverf.com/).
To add your Lightwave devices into your Home Assistant installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
lightwave:
  host: IP_ADDRESS
```

{% configuration %}
host:
  description: The ip address of your Lightwave hub.
  required: true
  type: string
lights:
  description: (add info)
  required: false
  type: string
switches:
  description: (add info)
  required: false 
  type: string 
{% endconfiguration %}

A somewhat more extensive example of what you can use

```yaml
# Example configuration.yaml entry
lightwave:
  host: IP_ADDRESS
  lights:
    R1D3:
      name: Wall lights
    R1D4:
      name: Ceiling lights
  switches:
    R1D2:
      name: Tree socket
    R2D1:
      name: Radio socket
    R2D2:
      name: Light socket
    R2D3:
      name: Phone socket
    R2D4:
      name: Torch socket
```

### {% linkable_title Lights and Switches %}
Each `light` or `switch` requires an `id` and a `name`. The `id` takes the form `R#D#` where `R#` is the room number and `D#` is the device number.

`lights` and `switches` are optional but one of these must be present.

The first use of a light or switch will try to register with your Lightwave WiFi Link hub. If the hub has not been registered a message on your hub will be displayed asking you to pair the device. You have 12 seconds to push the button on your hub to accept this. Once done, you should be able to control your lights and switches via Home Assistant. This only needs to be done if the hub has not been registered.

### {% linkable_title Service `lightwave_registration` %}
You can use the service `lightwave.lightwave_registration` to register Home Assistant with your Lightwave WiFi Link hub is the automatic registration via a switch or light has failed. Once the service is called you have 12 seconds to push the button on your hub to accept this registration.

### {% linkable_title Service `lightwave_deregistration` %}
You can use the service `lightwave.lightwave_deregistration` to de-register all devices from your Lightwave WiFi Link hub. Once the service is called all devices are deregistered so use this wisely. The Lightwave WiFi Link hub can register a upto 12 devices. 
