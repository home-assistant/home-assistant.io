---
title: VLC media player via Telnet
description: Instructions on how to integrate VLC media player into Home Assistant using the telnet interface.
ha_category:
  - Media player
ha_release: 0.95
ha_iot_class: Local Polling
ha_codeowners:
  - '@rodripf'
  - '@MartinHjelmare'
ha_config_flow: true
ha_domain: vlc_telnet
ha_platforms:
  - media_player
ha_integration_type: integration
---

The **VLC media player via Telnet** {% term integration %} allows you to control a [VLC media player](https://www.videolan.org/vlc/index.html) using the built in telnet interface.

This action will control any instance of VLC player on the network with the telnet interface activated.
To activate the telnet interface on your VLC Player please read the [official VLC documentation](https://wiki.videolan.org/Documentation:Modules/telnet/). Also remember to add a firewall rule allowing inbound connections for the port used in the device running VLC.

In case the VLC is running on a host with a locale other than English, you may get some errors during the volume change.
This is related to the different use of the decimal separator in other countries.
Consider to set the locale to `en_US` before starting VLC.

{% include integrations/config_flow.md %}

## Actions

When using the `media_player.play_media` action, only the "music" media type is supported for now.

## Home Assistant add-on

You can run a VLC Media Player on your Home Assistant installation using the official [VLC add-on](https://github.com/home-assistant/addons/blob/master/vlc/DOCS.md).
Using it you can play files on the local network, Internet or files and playlist locally saved to the `/share` and `/media` folder of your Home Assistant installation.
