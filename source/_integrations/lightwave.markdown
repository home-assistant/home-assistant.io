---
title: Lightwave
description: Instructions on how to integrate Lightwave devices with Home Assistant.
ha_category:
  - Hub
  - Light
  - Switch
ha_release: 0.84
ha_iot_class: Assumed State
ha_domain: lightwave
ha_platforms:
  - climate
  - light
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `lightwave` {% term integration %} links Home Assistant with your Lightwave WiFi link for controlling Lightwave lights, switches and TRVs.

This integration uses the official API published by Lightwave on their website [https://api.lightwaverf.com/](https://api.lightwaverf.com/).
To add your Lightwave devices into your Home Assistant installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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

{% configuration %}
host:
  description: IP address of your Lightwave hub
  required: true
  type: string
lights:
  description: List of lights you wish to configure
  required: false
  type: map
  keys:
    name:
      description: Name of the Light
      required: true
      type: string
switches:
  description: List of switches you wish to configure
  required: false
  type: map
  keys:
    name:
      description: Name of the Switch
      required: true
      type: string
trv:
  description: TRV configuration
  required: false
  type: map
  keys:
    proxy_ip:
      description: IP address of a proxy for TRV integration. 
      required: false
      type: string
      default: "127.0.0.1"
    proxy_port:
      description: IP port address of a proxy for TRV integration.
      required: false
      type: integer
      default: 7878
    trvs:
      description: List of TRVs you wish to configure
      required: false
      type: map
      keys: 
        name: 
          description: Name of the TRV
          required: true
          type: string
        serial: 
          description: Serial Number of the TRV
          required: true
          type: string
{% endconfiguration %}


Where IP_ADDRESS is the IP address of your Lightwave hub.
Each `switch` or `light` requires an `id` and a `name`. The `id` takes the form `R#D#` where `R#` is the room number and `D#` is the device number.

`lights` and `switches` are optional but one of these must be present.

The first use of a light or switch will try to register with your Lightwave WiFi Link hub. If the hub has not been registered a message on your hub will be displayed asking you to pair the device. You have 12 seconds to push the button on your hub to accept this. Once done, you should be able to control your lights and switches via Home Assistant. This only needs to be done if the hub has not been registered.

# TRVs

Lightwave Thermostatic Radiator Values (TRV) are supported.

Earlier integrations required a proxy - See [LWProxy](https://github.com/ColinRobbins/Homeassistant-Lightwave-TRV).
This capabilty is still supported, but no longer required.

```yaml
# Example TRV configuration.yaml for TRVs
lightwave:
  host: IP_ADDRESS
  lights:
    R99D1:
      name: Bedroom Light
  trv:
      trvs:
        R1Dh:                       # The ID of the TRV.
          name: Bedroom TRV
          serial: E84902            # Serial number of the TRV - found in the Lightwave App, or web site
```
