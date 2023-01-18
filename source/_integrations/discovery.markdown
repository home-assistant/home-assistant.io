---
title: Discovery
description: Instructions on how to setup Home Assistant to discover new devices with the Discovery integration.
ha_category:
  - Other
ha_release: 0.7
ha_quality_scale: internal
ha_domain: discovery
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
---

This is the legacy discovery integration for Home Assistant. It's use is no longer recommended. Use the [SSDP](/integrations/ssdp/), [Zeroconf](/integrations/zeroconf/) and [USB](/integrations/usb/) integrations instead.

This integration is limited to detect:

 * [Bluesound speakers](/integrations/bluesound)
 * [Bose Soundtouch speakers](/integrations/soundtouch)
 * [Enigma2 media player](/integrations/enigma2)
 * [Frontier Silicon internet radios](/integrations/frontier_silicon)
 * [Linn / Openhome](/integrations/openhome)
 * [SABnzbd downloader](/integrations/sabnzbd)
 * [Yamaha media player](/integrations/yamaha)

To load this integration, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
discovery:
  ignore:
    - yamaha
    - logitech_mediaserver
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

 * `bluesound`: Bluesound speakers
 * `bose_soundtouch`: Bose Soundtouch speakers
 * `enigma2`: Enigma2 media players
 * `frontier_silicon`: Frontier Silicon internet radios
 * `lg_smart_device`: LG Soundbars
 * `openhome`: Linn / Openhome
 * `sabnzbd`: SABnzbd downloader
 * `yamaha`: Yamaha media player

## Troubleshooting

### mDNS and UPnP

Home Assistant should be on the same network as the devices for mDNS and UPnP discovery to work.

When running Home Assistant Core in a [Docker container](/docs/installation/docker/) command line option `--net=host` or the compose file equivalent `network_mode: host` must be used to put it on the host's network, otherwise mDNS and UPnP will not work.

If mDNS is still not working:
- Make sure there are no firewall rules blocking mDNS traffic. mDNS relies on sending and receiving UDP multicast packets on port 5353.
- mDNS traffic may not be forwarded correctly between the wired and wireless interfaces of a Wi-Fi AP or router.

#### mDNS forwarding
If it's not possible to have Home Assistant and the devices on the same network, mDNS forwarding may allow mDNS discovery between networks.

mDNS forwarding is a configurable option in some routers. It can also be called mDNS reflector or mDNS repeater, depending on the manufacturer.

### Windows

#### 64-bit Python
There is currently a <a href='https://web.archive.org/web/20200623234241/https://bitbucket.org/al45tair/netifaces/issues/17/dll-fails-to-load-windows-81-64bit'>known issue</a> with running this integration on a 64-bit version of Python and Windows.

### Could not install dependency netdisco

If you see `Not initializing discovery because could not install dependency netdisco==0.6.1` in the logs, you will need to install the `python3-dev` or `python3-devel` package on your system manually (eg. `sudo apt-get install python3-dev` or `sudo dnf -y install python3-devel`). On the next restart of Home Assistant, the discovery should work. If you still get an error, check if you have a compiler (`gcc`) available on your system.
