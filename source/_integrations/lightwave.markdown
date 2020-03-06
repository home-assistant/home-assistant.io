---
title: Lightwave
description: Instructions on how to integrate Lightwave devices with Home Assistant.
logo: lightwave.png
ha_category:
  - Hub
  - Light
  - Switch
ha_release: 0.84
ha_iot_class: Assumed State
---

The `lightwave` integration links Home Assistant with your Lightwave WiFi link for controlling Lightwave lights and switches.

This integration uses the official API published by Lightwave on their website [https://api.lightwaverf.com/](https://api.lightwaverf.com/).
To add your Lightwave devices into your Home Assistant installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
lightwave:
  host: 192.168.1.2
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

Where `192.168.1.2` is the IP address of your Lightwave hub.
Each `switch` or `light` requires an `id` and a `name`. The `id` takes the form `R#D#` where `R#` is the room number and `D#` is the device number.

`lights` and `switches` are optional but one of these must be present.

The first use of a light or switch will try to register with your Lightwave WiFi Link hub. If the hub has not been registered a message on your hub will be displayed asking you to pair the device. You have 12 seconds to push the button on your hub to accept this. Once done, you should be able to control your lights and switches via Home Assistant. This only needs to be done if the hub has not been registered.

The Lightwave Home Assistant integration currently supports the following Lightwave devices:

- Lightwave lights
- Lightwave switches
