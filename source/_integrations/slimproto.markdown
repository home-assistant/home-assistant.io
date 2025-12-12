---
title: SlimProto (Squeezebox players)
description: Instructions on how to integrate a SlimProto-based player (e.g., Squeezebox) into Home Assistant without the need for a media server.
ha_category:
  - Media player
ha_release: 2022.5
ha_iot_class: Local Push
ha_domain: slimproto
ha_codeowners:
  - '@marcelveldt'
ha_config_flow: true
ha_platforms:
  - media_player
ha_integration_type: integration
---

The SlimProto integration allows you to control a [Squeezebox](https://en.wikipedia.org/wiki/Squeezebox_%28network_music_player%29) music player directly from Home Assistant, without the need for an external Media Server such as Logitech Media Server. This lets you control Squeezebox hardware like the Classic, Transporter, Duet, Boom, Radio, and Touch and software players like [Squeezelite](https://github.com/ralph-irving/squeezelite), [PiCorePlayer](https://www.picoreplayer.org/) or [Max2Play](https://www.max2play.com/en/). For the real DIY enthusiast, [there even is a player for the ESP32](https://github.com/sle118/squeezelite-esp32).

{% include integrations/config_flow.md %}

{% note %}
This integration talks directly to the player running the "SLIM" protocol, effectively turning Home Assistant into the Media Server so you will not need an external Media Server like Logitech Media Server or Roon. This means that the media you want to play is available in/from Home Assistant itself, for example by using the [Radio Browser](/integrations/radio_browser) integration or the custom [Music Assistant](https://github.com/music-assistant/hass-music-assistant) integration.
{% endnote %}

## Basic support only

This integration is aimed to be as simple as possible, allowing the basic controls of the player from Home Assistant and the possibility to send a URL to stream to the player.

At the time of writing the following is not yet supported:

- Player groups (synced multi-room audio) - will be added in a later release.
- Display support (for official Squeezebox hardware) - might be added in a later release if enough interest.

## Advanced: Player events

Events emitted by players that are not handled by the integration itself, for example pressing the "next track" button on a player, will be forwarded to the Home Assistant event bus for you to act on, for example, using an automation.

The event that is submitted is `slimproto_event`.
