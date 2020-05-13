---
title: forked-daapd
description: Instructions on how to integrate a forked-daapd server into Home Assistant.
ha_category:
  - Media Player
ha_release: "0.110"
ha_iot_class: Local Push
ha_domain: forked_daapd
---

The `forked_daapd` integration allows you to control your [forked-daapd](http://ejurgensen.github.io/forked-daapd/) server from Home Assistant. This integration can control the forked-daapd outputs (zones) with limited playback control (play/pause, previous/next track) and media info support. Playlist manipulation is not supported.

## Configuration

To add `forked-daapd` to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **forked-daapd**.

## Outputs

Once the `forked-daapd` integration is set up, outputs will automatically be loaded from the server and added to HA in real time.

## Pipes

As forked-daapd supports playing audio input via a pipe, this integration supports the forwarding of basic player controls (play, pause, next track, previous track) directly to the pipe's source. Currently only the pipe source librespot-java is supported. To use this, configure your forked-daapd server to autostart pipes and name your librespot-java pipe "librespot-java" (accompanying metadata is also supported through forked-daapd via a metadata pipe named"librespot-java.metadata"). The `forked-daapd` integration will find the librespot-java pipe in the database and will set it up as a source.

## Playlists

The `forked-daapd` integration will treat playlists in the database as sources. The number of playlists shown as sources can be set in the integration's configuration options.
