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
