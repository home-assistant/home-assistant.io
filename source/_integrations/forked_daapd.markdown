---
title: OwnTone
description: Instructions on how to integrate an OwnTone server into Home Assistant.
ha_category:
  - Media player
ha_release: '0.110'
ha_iot_class: Local Push
ha_domain: forked_daapd
ha_codeowners:
  - '@uvjustin'
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - media_player
ha_integration_type: integration
---

The OwnTone integration allows you to control your [OwnTone (previously forked-daapd)](https://github.com/owntone/owntone-server) server from Home Assistant. This integration can control the OwnTone outputs (zones) with limited playback control (play/pause, previous/next track) and media info support. Playlist manipulation is not supported.

## Requirements

The OwnTone integration requires an OwnTone server built with libwebsockets enabled, version >= 27.0.

{% include integrations/config_flow.md %}

## Outputs

Once the OwnTone integration is set up, outputs will automatically be loaded from the server and added to HA in real-time.

## Pipes

As OwnTone supports playing audio input via a pipe, this integration supports the forwarding of basic player controls (play, pause, next track, previous track) directly to the pipe's source. Currently, only the pipe source librespot-java is supported. To use this, configure your OwnTone server to autostart pipes and name your librespot-java pipe "librespot-java" (accompanying metadata is also supported through OwnTone via a metadata pipe named "librespot-java.metadata"). The OwnTone integration will find the librespot-java pipe in the database and will set it up as a source.

## Playlists

The OwnTone integration will treat playlists in the database as sources. The number of playlists shown as sources can be set in the integration's configuration options.

## Spotify

The OwnTone integration supports media browsing via the [Spotify integration](/integrations/spotify). However, to play Spotify content, your OwnTone instance must be logged in with Spotify. This can be done through OwnTone's own web interface. For more details, see [OwnTone's notes on Spotify](https://owntone.github.io/owntone-server/integrations/spotify/#spotify). You should log in with the same Spotify account for both the OwnTone server and the Home Assistant [Spotify integration](/integrations/spotify).
