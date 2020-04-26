---
title: Simple Service Discovery Protocol (SSDP)
description: Discover integrations on the network using the SSDP protocol.
ha_category:
  - Network
ha_release: 0.94
ha_domain: ssdp
---

The `ssdp` "Simple Service Discovery Protocol" (part of UPnP) integration will scan the network for supported devices and services. Discovered integrations will show up in the discovered section on the integrations page in the configuration panel.

Integrations can opt-in to be found by adding [an SSDP section](https://developers.home-assistant.io/docs/en/next/creating_integration_manifest.html#ssdp) to their `manifest.json`.

## Configuration

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](https://www.home-assistant.io/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry
ssdp:
```

## Discovered Integrations

The following integrations are automatically discovered by the SSDP integration:

 - [deCONZ](../deconz/)
 - [DirecTV](/integrations/directv/)
 - [Huawei LTE](../huawei_lte/)
 - [Philips Hue](../hue/)
 - [Roku](/integrations/roku/)
 - [Samsung TV](../samsungtv/)
 - [UPnP](../upnp/)
