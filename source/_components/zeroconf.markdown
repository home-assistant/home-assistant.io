---
title: "Zeroconf/Avahi/Bonjour"
description: "Exposes Home Assistant using the Zeroconf protocol."
ha_category:
  - Network
ha_qa_scale: internal
ha_release: 0.18
---

The `zeroconf` integration will scan the network for supported devices and services. Discovered integrations will show up in the discovered section on the integrations page in the config panel. It will also make Home Assistant discoverable for other services in the network. Zeroconf is also sometimes known as Bonjour, Rendezvous, and Avahi.

Integrations can opt-in to be found by adding either [a Zeroconf section](https://developers.home-assistant.io/docs/en/next/creating_integration_manifest.html#zeroconf) or [a HomeKit section](https://developers.home-assistant.io/docs/en/next/creating_integration_manifest.html#homekit) to their manifest.json.

## Configuration

To have Home Assistant scan for integrations using zeroconf and HomeKit, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
zeroconf:
```
