---
title: Discovery
description: Instructions on how to setup Home Assistant to discover new devices.
ha_category:
  - Other
ha_release: 0.7
ha_quality_scale: internal
ha_domain: discovery
---

Home Assistant can discover and automatically configure [zeroconf](https://en.wikipedia.org/wiki/Zero-configuration_networking)/[mDNS](https://en.wikipedia.org/wiki/Multicast_DNS) and [UPnP](https://en.wikipedia.org/wiki/Universal_Plug_and_Play) devices on your network. Currently the `discovery` integration can detect:

 * [Apple TV](/integrations/apple_tv/)
 * [Belkin WeMo switches](/integrations/wemo/)
 * [Bluesound speakers](/integrations/bluesound)
 * [Bose Soundtouch speakers](/integrations/soundtouch)
 * [Denon network receivers](/integrations/denonavr/)
 * [DLNA DMR enabled devices](/integrations/dlna_dmr)
 * [Enigma2 media player](/integrations/enigma2)
 * [Frontier Silicon internet radios](/integrations/frontier_silicon)
 * [Linn / Openhome](/integrations/openhome)
 * [Logitech Harmony Hub](/integrations/harmony)
 * [Logitech Media Server (Squeezebox)](/integrations/squeezebox)
 * [NETGEAR routers](/integrations/netgear)
 * [Panasonic Viera](/integrations/panasonic_viera)
 * [Philips Hue](/integrations/hue)
 * [SABnzbd downloader](/integrations/sabnzbd)
 * [Samsung SyncThru Printer](/integrations/syncthru)
 * [Sonos speakers](/integrations/sonos)
 * [Telldus Live](/integrations/tellduslive/)
 * [Wink](/integrations/wink/)
 * [Yamaha media player](/integrations/yamaha)
 * [Yeelight Sunflower bulb](/integrations/yeelightsunflower/)
 * [Xiaomi Gateway (Aqara)](/integrations/xiaomi_aqara/)

It will be able to add Belkin WeMo switches automatically,
for Philips Hue it will require some configuration from the user.

<div class='note'>

Zeroconf discoverable integrations [Axis](/integrations/axis/)/[ESPHome](/integrations/esphome/)/[HomeKit](/integrations/homekit_controller/)/[Tradfri](/integrations/tradfri/)/[Google Cast](/integrations/cast/) have been migrated to use [zeroconf](/integrations/zeroconf) integration to initiate discovery.

</div>

To load this integration, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
discovery:
  ignore:
    - sonos
    - samsung_printer
  enable:
    - homekit
```

{% configuration discovery %}
ignore:
  description: A list of platforms that never will be automatically configured by `discovery`.
  required: false
  type: list
enable:
  description: A list of platforms not enabled by default that `discovery` should discover.
  required: false
  type: list
{% endconfiguration %}

Valid values for ignore are:

 * `apple_tv`: Apple TV
 * `belkin_wemo`: Belkin WeMo switches
 * `bluesound`: Bluesound speakers
 * `bose_soundtouch`: Bose Soundtouch speakers
 * `denonavr`: Denon network receivers
 * `enigma2`: Enigma2 media players
 * `frontier_silicon`: Frontier Silicon internet radios
 * `harmony`: Logitech Harmony Hub
 * `igd`: Internet Gateway Device
 * `logitech_mediaserver`: Logitech Media Server (Squeezebox)
 * `netgear_router`: NETGEAR routers
 * `octoprint`: Octoprint
 * `openhome`: Linn / Openhome
 * `panasonic_viera`: Panasonic Viera
 * `philips_hue`: Philips Hue
 * `sabnzbd`: SABnzbd downloader
 * `samsung_printer`: Samsung SyncThru Printer
 * `sonos`: Sonos speakers
 * `songpal` : Songpal
 * `tellstick`: Telldus Live
 * `wink`: Wink Hub
 * `yamaha`: Yamaha media player
 * `yeelight`: Yeelight lamps and bulbs (not only Yeelight Sunflower bulb)
 * `xiaomi_gw`: Xiaomi Aqara gateway

Valid values for enable are:

 * `dlna_dmr`: DLNA DMR enabled devices

## Troubleshooting

### mDNS and UPnP

Home Assistant must be on the same network as the devices for UPnP discovery to work.
When running Home Assistant in a [Docker container](/docs/installation/docker/) switch `--net=host` must be used to put it on the host's network, otherwise mDNS and UPnP will not work.

### Windows

#### 64-bit Python
There is currently a <a href='https://bitbucket.org/al45tair/netifaces/issues/17/dll-fails-to-load-windows-81-64bit'>known issue</a> with running this integration on a 64-bit version of Python and Windows.

### Could not install dependency netdisco

If you see `Not initializing discovery because could not install dependency netdisco==0.6.1` in the logs, you will need to install the `python3-dev` or `python3-devel` package on your system manually (eg. `sudo apt-get install python3-dev` or `sudo dnf -y install python3-devel`). On the next restart of Home Assistant, the discovery should work. If you still get an error, check if you have a compiler (`gcc`) available on your system.

### DSM and Synology

For DSM/Synology, install via debian-chroot [see this forum post](https://community.home-assistant.io/t/error-starting-home-assistant-on-synology-for-first-time/917/15).
