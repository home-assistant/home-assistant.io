---
title: DLNA Digital Media Renderer
description: Instructions on how to integrate a DLNA DMR device into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.76
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@StevenLooman'
  - '@chishm'
ha_domain: dlna_dmr
ha_platforms:
  - media_player
ha_ssdp: true
---

The `dlna_dmr` platform allows you to control a [DLNA Digital Media Renderer](https://www.dlna.org/), such as DLNA enabled TVs or radios.

Please note that some devices, such as Samsung TVs, are rather picky about the source used to play from. The TTS service might not work in combination with these devices. If the play_media service does not work, please try playing from a DLNA/DMS (such as [MiniDLNA](https://sourceforge.net/projects/minidlna/)).

{% include integrations/config_flow.md %}

## Options

Options for DLNA DMR devices can be set going to **Configuration** -> **Integrations** -> **DLNA Digital Media Renderer** -> **Configuration**.

{% configuration_basic %}
Event listener port:
  description: "Local port to listen on for events sent by the DLNA device. If this is not set, a random port will be allocated. Use this if you need a specific incoming port for firewall or NAT reasons."
Event listener callback URL:
  description: "Local URL destination for events sent by the DLNA device. It should be of the form `http://{host}:{port}/notify`, where keywords `{host}` and `{port}` will be automatically filled-in but can be set explicitly here, e.g. `http://192.88.99.1:5555/notify`. Use this if the local IP address or port seen by Home Assistant is not what the device should connect to, because of Network Address Translation (NAT)."
Poll for device availability:
  description: "Periodically try to connect to the DLNA device, even if it is unavailable. Enable this if SSDP advertisements sent by the device are not received by Home Assistant, e.g. when IP multicast is broken on your network."
{% endconfiguration_basic %}
