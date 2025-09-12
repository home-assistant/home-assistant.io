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

### Zeroconf Browser

The **Zeroconf Browser** shows devices discovered by Home Assistant using Zeroconf (also known as mDNS or Bonjour). This method allows devices to advertise their services on the local network without needing a central directory. Home Assistant actively searches for specific services using Zeroconf, and any matching devices will appear in this browser.

To open the Zeroconf Browser, go to:
{% my config_zeroconf title="**Settings** > **System** > **Network** > **Zeroconf Browser**" %}

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

## Discovered integrations

The following integrations are automatically discovered by the `zeroconf` integration:

 - [1-Wire](/integrations/onewire/)
 - [AirGradient](/integrations/airgradient/)
 - [Altruist](/integrations/altruist/)
 - [Android TV Remote](/integrations/androidtv_remote/)
 - [Apple TV](/integrations/apple_tv/)
 - [Awair](/integrations/awair/)
 - [Axis](/integrations/axis/)
 - [Bang & Olufsen](/integrations/bang_olufsen/)
 - [Big Ass Fans](/integrations/baf/)
 - [BleBox devices](/integrations/blebox/)
 - [Bluesound](/integrations/bluesound/)
 - [Bond](/integrations/bond/)
 - [Bosch SHC](/integrations/bosch_shc/)
 - [Bose SoundTouch](/integrations/soundtouch/)
 - [Brother Printer](/integrations/brother/)
 - [BSB-Lan](/integrations/bsblan/)
 - [Cambridge Audio](/integrations/cambridge_audio/)
 - [Daikin AC](/integrations/daikin/)
 - [Deako](/integrations/deako/)
 - [Denon HEOS](/integrations/heos/)
 - [Devialet](/integrations/devialet/)
 - [devolo Home Control](/integrations/devolo_home_control/)
 - [devolo Home Network](/integrations/devolo_home_network/)
 - [DoorBird](/integrations/doorbird/)
 - [ecobee](/integrations/ecobee/)
 - [EHEIM Digital](/integrations/eheimdigital/)
 - [Elexa Guardian](/integrations/guardian/)
 - [Elgato Light](/integrations/elgato/)
 - [Elmax](/integrations/elmax/)
 - [Enphase Envoy](/integrations/enphase_envoy/)
 - [ESPHome](/integrations/esphome/)
 - [Freebox](/integrations/freebox/)
 - [Google Cast](/integrations/cast/)
 - [Home Connect](/integrations/home_connect/)
 - [HomeKit Bridge](/integrations/homekit/)
 - [HomeKit Device](/integrations/homekit_controller/)
 - [HomeWizard Energy](/integrations/homewizard/)
 - [Hunter Douglas PowerView](/integrations/hunterdouglas_powerview/)
 - [Internet Printing Protocol (IPP)](/integrations/ipp/)
 - [IOmeter](/integrations/iometer/)
 - [iRobot Roomba and Braava](/integrations/roomba/)
 - [Kodi](/integrations/kodi/)
 - [Lektrico Charging Station](/integrations/lektrico/)
 - [LinkPlay](/integrations/linkplay/)
 - [LOOKin](/integrations/lookin/)
 - [LOQED Touch Smart Lock](/integrations/loqed/)
 - [Lutron Caséta](/integrations/lutron_caseta/)
 - [Matter](/integrations/matter/)
 - [Miele](/integrations/miele/)
 - [Modern Forms](/integrations/modern_forms/)
 - [Music Assistant](/integrations/music_assistant/)
 - [Nanoleaf](/integrations/nanoleaf/)
 - [Nettigo Air Monitor](/integrations/nam/)
 - [Network UPS Tools (NUT)](/integrations/nut/)
 - [OctoPrint](/integrations/octoprint/)
 - [Overkiz](/integrations/overkiz/)
 - [OwnTone](/integrations/forked_daapd/)
 - [Peblar](/integrations/peblar/)
 - [Philips Hue](/integrations/hue/)
 - [Philips TV](/integrations/philips_js/)
 - [Plex Media Server](/integrations/plex/)
 - [Plugwise](/integrations/plugwise/)
 - [Powerfox](/integrations/powerfox/)
 - [Pure Energie](/integrations/pure_energie/)
 - [Rabbit Air](/integrations/rabbitair/)
 - [Rachio](/integrations/rachio/)
 - [RainMachine](/integrations/rainmachine/)
 - [ROMY Vacuum Cleaner](/integrations/romy/)
 - [Russound RIO](/integrations/russound_rio/)
 - [Samsung Smart TV](/integrations/samsungtv/)
 - [Shelly](/integrations/shelly/)
 - [Slide Local](/integrations/slide_local/)
 - [Smappee](/integrations/smappee/)
 - [SMLIGHT SLZB](/integrations/smlight/)
 - [Sonos](/integrations/sonos/)
 - [Synology DSM](/integrations/synology_dsm/)
 - [System Bridge](/integrations/system_bridge/)
 - [Tailwind](/integrations/tailwind/)
 - [TechnoVE](/integrations/technove/)
 - [Thread](/integrations/thread/)
 - [Vegetronix VegeHub](/integrations/vegehub/)
 - [VIZIO SmartCast](/integrations/vizio/)
 - [Vogel's MotionMount](/integrations/motionmount/)
 - [Volumio](/integrations/volumio/)
 - [WLED](/integrations/wled/)
 - [Wyoming Protocol](/integrations/wyoming/)
 - [Xiaomi Gateway (Aqara)](/integrations/xiaomi_aqara/)
 - [Xiaomi Home](/integrations/xiaomi_miio/)
 - [Yeelight](/integrations/yeelight/)
 - [Zigbee Home Automation](/integrations/zha/)
 - [Z-Wave](/integrations/zwave_js/)
 - [Z-Wave.Me](/integrations/zwave_me/)
