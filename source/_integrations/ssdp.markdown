---
title: Simple Service Discovery Protocol (SSDP)
description: Discover integrations on the network using the SSDP protocol.
ha_category:
  - Network
ha_iot_class: Local Push
ha_release: 0.94
ha_domain: ssdp
ha_quality_scale: internal
ha_integration_type: system
---

The `ssdp` "Simple Service Discovery Protocol" (part of UPnP) integration will scan the network for supported devices and services. Discovered integrations will show up in the discovered section on the integrations page in the configuration panel.

Integrations can opt-in to be found by adding [an SSDP section](https://developers.home-assistant.io/docs/creating_integration_manifest/#ssdp) to their `manifest.json`.

## Configuration

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry
ssdp:
```

## Discovered integrations

The following integrations are automatically discovered by the SSDP integration:

 - [AVM FRITZ!SmartHome](/integrations/fritzbox/)
 - [Belkin WeMo](/integrations/wemo/)
 - [deCONZ](/integrations/deconz/)
 - [Denon AVR](/integrations/denonavr/)
 - [Denon HEOS](/integrations/heos/)
 - [DirecTV](/integrations/directv/)
 - [Frontier Silicon](/integrations/frontier_silicon/)
 - [Huawei LTE](/integrations/huawei_lte/)
 - [Hyperion](/integrations/hyperion/)
 - [Keenetic NDMS2 Router](/integrations/keenetic_ndms2/)
 - [Konnected.io](/integrations/konnected/)
 - [LG webOS TV](/integrations/webostv/)
 - [Logitech Harmony](/integrations/harmony/)
 - [Lutron Caséta](/integrations/lutron_caseta/)
 - [OctoPrint](/integrations/octoprint/)
 - [Onkyo](/integrations/onkyo/)
 - [Philips Hue](/integrations/hue/)
 - [Roku](/integrations/roku/)
 - [Samsung SyncThru Printer](/integrations/syncthru/)
 - [Samsung TV](/integrations/samsungtv/)
 - [Sonos](/integrations/sonos/)
 - [Sony Songpal](/integrations/songpal/)
 - [Synology DSM](/integrations/synology_dsm/)
 - [Ubiquiti UniFi](/integrations/unifi/)
 - [Universal Devices ISY/IoX](/integrations/isy994/)
 - [UPnP](/integrations/upnp/)
 - [WiLight](/integrations/wilight/)
