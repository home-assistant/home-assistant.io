---
title: Owntone
description: Instructions on how to integrate an Owntone server into Home Assistant.
ha_category:
  - Media Player
ha_release: "0.110"
ha_iot_class: Local Push
ha_domain: forked_daapd
ha_codeowners:
  - "@uvjustin"
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - media_player
ha_integration_type: integration
---

The `Owntone` integration allows you to control your [OwnTone (previously forked-daapd)](https://github.com/owntone/owntone-server) server from Home Assistant. This integration can control the Owntone outputs (zones) with limited playback control (play/pause, previous/next track) and media info support. Playlist manipulation is not supported.

## Requirements

The `Owntone` integration requires an OwnTone server built with libwebsockets enabled, version >= 27.0.

{% include integrations/config_flow.md %}

## Outputs

Once the `Owntone` integration is set up, outputs will automatically be loaded from the server and added to HA in real time.

## Pipes

As OwnTone supports playing audio input via a pipe, this integration supports the forwarding of basic player controls (play, pause, next track, previous track) directly to the pipe's source. Currently only the pipe source librespot-java is supported. To use this, configure your Owntone server to autostart pipes and name your librespot-java pipe "librespot-java" (accompanying metadata is also supported through Owntone via a metadata pipe named "librespot-java.metadata"). The `Owntone` integration will find the librespot-java pipe in the database and will set it up as a source.

## Playlists

The `Owntone` integration will treat playlists in the database as sources. The number of playlists shown as sources can be set in the integration's configuration options.

## Spotify

The `Owntone` integration supports media browsing via the `Spotify` integration. However, to play `Spotify` content, your Owntone instance must be logged in with Spotify. This can be done through Owntone's own web interface. For more details see [Owntone's notes on Spotify](https://owntone.github.io/owntone-server/integrations/spotify/#spotify). You should login with the same Spotify account for both the Owntone server and the Home Assistant `Spotify` integration.
