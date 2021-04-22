---
title: Zero-configuration networking (zeroconf)
description: Exposes Home Assistant using the Zeroconf protocol.
ha_category:
  - Network
ha_release: 0.18
ha_quality_scale: internal
ha_codeowners:
  - '@bdraco'
ha_domain: zeroconf
ha_iot_class: Local Push
---

The `zeroconf` integration will scan the network for supported devices and services. Discovered integrations will show up in the discovered section on the integrations page in the configuration panel. It will also make Home Assistant discoverable for other services in the network. Zeroconf is also sometimes known as Bonjour, Rendezvous, and Avahi.

Integrations can opt-in to be found by adding either [a Zeroconf section](https://developers.home-assistant.io/docs/en/next/creating_integration_manifest.html#zeroconf) or [a HomeKit section](https://developers.home-assistant.io/docs/en/next/creating_integration_manifest.html#homekit) to their `manifest.json`.

## Configuration

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, and you wish to have Home Assistant scan for integrations using zeroconf and HomeKit, the following example shows you how to enable this integration manually:

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
     description: By default, `zeroconf` will attempt to detect the best value based on available routing information. For systems that require broadcasting mDNS on all interfaces, change this option to `false` if `zeroconf` does not function.
     required: false
     type: boolean
     default: true
   ipv6:
     description: By default, `zeroconf` will enable IPv6 support. If your network has trouble with IPv6 being enabled, you can set this option to `false`.
     required: false
     type: boolean
     default: true
{% endconfiguration %}

## `default_interface` auto detection

If the `default_interface` is unset, the value is auto-detected based on the system routing next hop for the mDNS broadcast address (`224.0.0.251`).

If the next-hop cannot be detected or is a loopback address, `zeroconf` will broadcast on all interfaces. If the next hop is a non-loopback address, `zeroconf` will only broadcast on the default interface.

Setting the `default_interface` to `true` or `false` will override the auto detection.

