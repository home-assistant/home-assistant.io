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

## Troubleshooting

### SSDP/UPnP Browser

The **SSDP/UPnP Browser** displays devices discovered by Home Assistant using SSDP (Simple Service Discovery Protocol), a core part of the UPnP (Universal Plug and Play) standard. Devices like smart TVs, media servers, and printers often use SSDP to announce themselves on the network. Home Assistant listens for these broadcasts to automatically detect compatible devices.

To open the SSDP/UPnP Browser, go to:
{% my config_ssdp title="**Settings** > **System** > **Network** > **SSDP Browser**" %}

## Discovered integrations

The following integrations are automatically discovered by the SSDP integration:

 - [Arcam FMJ Receivers](/integrations/arcam_fmj/)
 - [AVM FRITZ!Box Tools](/integrations/fritz/)
 - [AVM FRITZ!SmartHome](/integrations/fritzbox/)
 - [Axis](/integrations/axis/)
 - [Belkin WeMo](/integrations/wemo/)
 - [Control4](/integrations/control4/)
 - [deCONZ](/integrations/deconz/)
 - [Denon AVR Network Receivers](/integrations/denonavr/)
 - [Denon HEOS](/integrations/heos/)
 - [DirecTV](/integrations/directv/)
 - [DLNA Digital Media Renderer](/integrations/dlna_dmr/)
 - [DLNA Digital Media Server](/integrations/dlna_dms/)
 - [Frontier Silicon](/integrations/frontier_silicon/)
 - [Huawei LTE](/integrations/huawei_lte/)
 - [Hyperion](/integrations/hyperion/)
 - [Imeon Inverter](/integrations/imeon_inverter/)
 - [Kaleidescape](/integrations/kaleidescape/)
 - [Keenetic NDMS2 Router](/integrations/keenetic_ndms2/)
 - [Konnected.io](/integrations/konnected/)
 - [LaMetric](/integrations/lametric/)
 - [LG webOS TV](/integrations/webostv/)
 - [Linn / OpenHome](/integrations/openhome/)
 - [Logitech Harmony Hub](/integrations/harmony/)
 - [MusicCast](/integrations/yamaha_musiccast/)
 - [Nanoleaf](/integrations/nanoleaf/)
 - [NETGEAR](/integrations/netgear/)
 - [OctoPrint](/integrations/octoprint/)
 - [Onkyo](/integrations/onkyo/)
 - [Roku](/integrations/roku/)
 - [Samsung Smart TV](/integrations/samsungtv/)
 - [Samsung SyncThru Printer](/integrations/syncthru/)
 - [Sonos](/integrations/sonos/)
 - [Sony Bravia TV](/integrations/braviatv/)
 - [Sony Songpal](/integrations/songpal/)
 - [Synology DSM](/integrations/synology_dsm/)
 - [UniFi Network](/integrations/unifi/)
 - [UniFi Protect](/integrations/unifiprotect/)
 - [Universal Devices ISY/IoX](/integrations/isy994/)
 - [UPnP/IGD](/integrations/upnp/)
 - [WiLight](/integrations/wilight/)
