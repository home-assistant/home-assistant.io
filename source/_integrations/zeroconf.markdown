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
ha_integration_type: system
---

The `zeroconf` integration will scan the network for supported devices and services. Discovered integrations will show up in the discovered section on the integrations page in the configuration panel. It will also make Home Assistant discoverable for other services in the network. Zeroconf is also sometimes known as Bonjour, Rendezvous, and Avahi.

Integrations can opt-in to be found by adding either [a Zeroconf section](https://developers.home-assistant.io/docs/creating_integration_manifest/#zeroconf) or [a HomeKit section](https://developers.home-assistant.io/docs/creating_integration_manifest/#homekit) to their `manifest.json`.

## Configuration

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, and you wish to have Home Assistant scan for integrations using zeroconf and HomeKit, the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry
zeroconf:
```

## Network interfaces and auto detection

Zeroconf chooses which interfaces to broadcast on based on the [Network](/integrations/network/) integration.

IPv6 will automatically be enabled if one of the selected interfaces has an IPv6 address that is enabled via the Network integration.

## Troubleshooting

### Integrations relying on Zeroconf traffic are unresponsive

Some integrations rely on Zeroconf traffic to work, for example, the [HomeKit](/integrations/homekit/) integration.
These integrations will not respond to traffic from other devices if the host device is not configured correctly.

#### Libvirt virtual machine with macvtap adapter

By default, the macvtap adapter created by libvirt does not allow the guest to receive Zeroconf or multicast traffic.

Configure the virtual machine to accept this traffic by adding the `trustGuestRxFilters="yes"` setting in the adapter's XML. For example:

```xml
<interface type="direct" trustGuestRxFilters="yes">
  <mac address="xx:xx:xx:xx:xx:xx"/>
  <source dev="eno1" mode="bridge"/>
  <model type="virtio"/>
  <link state="up"/>
  <address type="pci" domain="0x0000" bus="0x01" slot="0x00" function="0x0"/>
</interface>
```

This only works with the `virtio` network adapter type and it is disabled by default for security reasons. See [the libvirt documentation](https://libvirt.org/formatdomain.html#elementsNICS) for more details.
