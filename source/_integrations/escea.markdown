---
title: Escea
description: Instructions on how to integrate Escea fireplaces with Home Assistant.
ha_category:
  - Climate
ha_release: 2022.9
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@lazdavila'
ha_domain: escea
ha_homekit: true
ha_platforms:
  - climate
ha_integration_type: integration
---

The Escea integration allows monitoring and control of local [Escea](https://escea.com/) fireplaces. These fireplaces are manufactured in New Zealand and sold throughout Australia and New Zealand.

## Supported hardware

Support all current Escea fireplaces with the Smart Heat feature, including the DF, DL, DS, and DX series.
Though these fireplaces are supported, they can only be integrated if they were connected via Ethernet when installed (i.e., these fireplaces do not support Wi-Fi).

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

This will help you to find network connection issues etc.
