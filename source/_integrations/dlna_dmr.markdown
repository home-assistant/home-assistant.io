---
title: DLNA Digital Media Renderer
description: Instructions on how to integrate a DLNA DMR device into Home Assistant.
ha_category:
  - Media player
ha_release: 0.76
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@chishm'
ha_domain: dlna_dmr
ha_platforms:
  - media_player
ha_ssdp: true
ha_integration_type: device
---

The **DLNA Digital Media Renderer** {% term integration %} allows you to control a [DLNA Digital Media Renderer](https://www.dlna.org/), such as DLNA enabled TVs or radios.

Note that some devices, such as Samsung TVs, are rather picky about the source used to play from. The TTS action might not work in combination with these devices. If the play_media action does not work, please try playing from a DLNA/DMS (such as [MiniDLNA](https://sourceforge.net/projects/minidlna/)).

{% include integrations/config_flow.md %}

## Options

Options for DLNA DMR devices can be set by going to **Settings** > **Devices & services** > **DLNA Digital Media Renderer** > **Configuration**.

{% configuration_basic %}
Event listener port:
  description: "Local port to listen on for events sent by the DLNA device. If this is not set, a random port will be allocated. Use this if you need a specific incoming port for firewall or NAT reasons."
Event listener callback URL:
  description: "Local URL destination for events sent by the DLNA device. It should be of the form `http://{host}:{port}/notify`, where the keywords `{host}` and `{port}` are filled in automatically but can be set explicitly here, for example, `http://192.88.99.1:5555/notify`. Use this if the local IP address or port seen by Home Assistant is not what the device should connect to, because of Network Address Translation (NAT)."
Poll for device availability:
  description: "Periodically try to connect to the DLNA device, even if it is unavailable. Enable this if SSDP advertisements sent by the device are not received by Home Assistant, for example, when IP multicast is broken on your network."
Show incompatible media when browsing:
  description: "When browsing media, show all media files and links, even if the device reports that it is not compatible with the media type."
{% endconfiguration_basic %}

{% include integrations/actions.md %}

## Playing media

Most DLNA DMR devices can play media from local HTTP servers. For best results, use HTTP instead of HTTPS, and refer to the server using an IP address instead of a hostname, for example, `http://192.168.1.1:8080/song.mp3`.

### Media sources

The DLNA Digital Media Renderer integration can browse any configured [media source](/integrations/media_source/). Displayed media will be filtered based on the capabilities of the DLNA DMR device.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
