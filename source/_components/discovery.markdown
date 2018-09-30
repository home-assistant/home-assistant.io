---
layout: page
title: "Discovery"
description: "Instructions on how to setup Home Assistant to discover new devices."
date: 2015-01-24 14:39
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Other
---

Home Assistant can discover and automatically configure [zeroconf](https://en.wikipedia.org/wiki/Zero-configuration_networking)/[mDNS](https://en.wikipedia.org/wiki/Multicast_DNS) and [uPnP](https://en.wikipedia.org/wiki/Universal_Plug_and_Play) devices on your network. Currently the `discovery` component can detect:

 * [Apple TV](/components/apple_tv/)
 * [Axis Communications security devices](/components/axis/)
 * [Belkin WeMo switches](/components/wemo/)
 * [Bluesound speakers](/components/media_player.bluesound/)
 * [Bose Soundtouch speakers](/components/media_player.soundtouch/)
 * [Denon network receivers](/components/media_player.denonavr/)
 * [DirecTV receivers](/components/media_player.directv/)
 * [DLNA DMR enabled devices](/components/media_player.dlna_dmr/)
 * [Frontier Silicon internet radios](/components/media_player.frontier_silicon/)
 * [Google Cast](/components/media_player.cast/)
 * [HomeKit](/components/homekit_controller/)
 * [IKEA Trådfri (Tradfri)](/components/tradfri/)
 * [Linn / Openhome](/components/media_player.openhome/)
 * [Logitech Harmony Hub](/components/remote.harmony/)
 * [Logitech media server (Squeezebox)](/components/media_player.squeezebox/)
 * [Netgear routers](/components/device_tracker.netgear/)
 * [Panasonic Viera](/components/media_player.panasonic_viera/)
 * [Philips Hue](/components/light.hue/)
 * [Plex media server](/components/media_player.plex/)
 * [Roku media player](/components/media_player.roku/)
 * [SABnzbd downloader](/components/sensor.sabnzbd/)
 * [Samsung SyncThru Printer](/components/sensor.syncthru/)
 * [Samsung TVs](/components/media_player.samsungtv/)
 * [Sonos speakers](/components/media_player.sonos/)
 * [Telldus Live](/components/tellduslive/)
 * [Wink](/components/wink/)
 * [Yamaha media player](/components/media_player.yamaha/)
 * [Yeelight Sunflower bulb](/components/light.yeelightsunflower/)
 * [Xiaomi Gateway (Aqara)](/components/xiaomi_aqara/)

It will be able to add Google Chromecasts and Belkin WeMo switches automatically,
for Philips Hue it will require some configuration from the user.

To load this component, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
discovery:
  ignore:
    - sonos
    - samsung_tv
  enable:
    - homekit
```

{% linkable_title Configuration variables: %}

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
 * `axis`: Axis Communications security devices
 * `belkin_wemo`: Belkin WeMo switches
 * `bluesound`: Bluesound speakers
 * `bose_soundtouch`: Bose Soundtouch speakers
 * `denonavr`: Denon network receivers
 * `directv`: DirecTV receivers
 * `frontier_silicon`: Frontier Silicon internet radios
 * `google_cast`: Google Cast
 * `harmony`: Logitech Harmony Hub
 * `ikea_tradfri`: IKEA Trådfri (Tradfri)
 * `logitech_mediaserver`: Logitech media server (Squeezebox)
 * `netgear_router`: Netgear routers
 * `openhome`: Linn / Openhome
 * `panasonic_viera`: Panasonic Viera
 * `philips_hue`: Philips Hue
 * `plex_mediaserver`: Plex media server
 * `roku`: Roku media player
 * `sabnzbd`: SABnzbd downloader
 * `samsung_printer`: Samsung SyncThru Printer
 * `samsung_tv`: Samsung TVs
 * `sonos`: Sonos speakers
 * `songpal` : Songpal
 * `tellstick`: Telldus Live
 * `wink`: Wink Hub
 * `yamaha`: Yamaha media player
 * `yeelight`: Yeelight lamps and bulbs (not only Yeelight Sunflower bulb)
 * `xiaomi_gw`: Xiaomi Aqara gateway

Valid values for enable are:

 * `dlna_dmr`: DLNA DMR enabled devices
 * `homekit`: HomeKit accessories

## {% linkable_title Troubleshooting %}

### {% linkable_title UPnP %}

Home Assistant must be on the same network as the devices for uPnP discovery to work.
If running Home Assistant in a [Docker container](/docs/installation/docker/) use switch `--net=host` to put it on the host's network.

### {% linkable_title Windows %}

#### {% linkable_title 64-bit Python %}
There is currently a <a href='https://bitbucket.org/al45tair/netifaces/issues/17/dll-fails-to-load-windows-81-64bit'>known issue</a> with running this component on a 64-bit version of Python and Windows.

#### {% linkable_title Python 3.5 %}

If you are on Windows and you're using Python 3.5, download the [Netifaces](http://www.lfd.uci.edu/~gohlke/pythonlibs/#netifaces) dependency.

### {% linkable_title could not install dependency netdisco %}

If you see `Not initializing discovery because could not install dependency netdisco==0.6.1` in the logs, you will need to install the `python3-dev` or `python3-devel` package on your system manually (eg. `sudo apt-get install python3-dev` or `sudo dnf -y install python3-devel`). On the next restart of Home Assistant, the discovery should work. If you still get an error, check if you have a compiler (`gcc`) available on your system.

### {% linkable_title DSM and Synology %}

For DSM/Synology, install via debian-chroot [see this forum post](https://community.home-assistant.io/t/error-starting-home-assistant-on-synology-for-first-time/917/15).

## {% linkable_title New platforms %}

If you are developing a new platform, please read [how to make your platform discoverable](/developers/component_discovery/) for further details.
