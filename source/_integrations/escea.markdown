---
description: Instructions on how to integrate Escea fireplaces with Home Assistant.
ha_release: 2022.9
ha_domain: escea
---

The **Escea** {% term integration %} allows monitoring and control of local [Escea](https://escea.com/) fireplaces. These fireplaces are manufactured in New Zealand and sold throughout Australia and New Zealand.

## Supported hardware

The integration supports Escea fireplaces with Ethernet-connected Smart Heat controllers that use the local UDP protocol, including compatible models in the DF, DL, DS, and DX series. Your fireplace must be connected via Ethernet.

Generation 3 (G3) controllers that use Wi-Fi and the newer HTTP API are not supported. Compatibility depends on the controller generation, not only the fireplace series.

{% include integrations/config_flow.md %}

## Network settings

The Escea system uses UDP over the local network to find and communicate with Escea devices. For this to work properly, UDP port 3300 must be available for broadcasting and messaging fireplaces, and similarly, UDP port 3300 must be available to listen for responses. The integration currently listens on `0.0.0.0` and broadcasts to all broadcast IPv4 local addresses, which is not configurable.

## Master controller

Fireplace on / off, fan settings, and desired temperature settings are supported. The current room temperature, as measured by the fireplace, is also supported.

## Debugging

If you're trying to track down issues with this integration, set up logging for it:

```yaml
# Example configuration.yaml with logging for Escea
logger:
  default: warning
  logs:
    homeassistant.components.escea: debug
    pescea: debug
```

This will help you to find network connection issues.
