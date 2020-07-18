---
title: Zero-configuration networking (zeroconf)
description: Exposes Home Assistant using the Zeroconf protocol.
ha_category:
  - Network
ha_release: 0.18
ha_quality_scale: internal
ha_codeowners:
  - '@robbiet480'
  - '@Kane610'
ha_domain: zeroconf
---

The `zeroconf` integration will scan the network for supported devices and services. Discovered integrations will show up in the discovered section on the integrations page in the configuration panel. It will also make Home Assistant discoverable for other services in the network. Zeroconf is also sometimes known as Bonjour, Rendezvous, and Avahi.

Integrations can opt-in to be found by adding either [a Zeroconf section](https://developers.home-assistant.io/docs/en/next/creating_integration_manifest.html#zeroconf) or [a HomeKit section](https://developers.home-assistant.io/docs/en/next/creating_integration_manifest.html#homekit) to their `manifest.json`.

## Configuration

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](https://www.home-assistant.io/integrations/default_config/) line from your configuration. If that is the case, and you wish to have Home Assistant scan for integrations using zeroconf and HomeKit, the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry
zeroconf:
```

{% configuration %}
zeroconf:
  description: 
  type: map
  keys:
   default_interface:
     description: By default, `zeroconf` will attempt to bind to all interfaces. For systems running using network isolation or similar, this may result in `zeroconf` being unavailable. Change this option to `true` if `zeroconf` does not function.
     required: false
     type: boolean
     default: false
   ipv6:
     description: By default, `zeroconf` will enable IPv6 support. If your network has trouble with IPv6 being enabled, you can set this option to `false`.
     required: false
     type: boolean
     default: true
{% endconfiguration %}
