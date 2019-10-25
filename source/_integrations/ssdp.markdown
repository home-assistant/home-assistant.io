---
title: "SSDP - Simple Service Discovery Protocol"
description: "Discover integrations on the network using the SSDP protocol."
ha_category:
  - Network
ha_release: 0.94
---

The `ssdp` "Simple Service Discovery Protocol" integration will scan the network for supported devices and services. Discovered integrations will show up in the discovered section on the integrations page in the config panel.

Integrations can opt-in to be found by adding [an SSDP section](https://developers.home-assistant.io/docs/en/next/creating_integration_manifest.html#ssdp) to their manifest.json.

## Configuration

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ssdp:
```

## Discovered Integrations

The following integrations are automatically discovered by the SSDP integration:

 - Deconz
 - Huawei LTE
 - Philips Hue
