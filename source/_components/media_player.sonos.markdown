---
layout: page
title: "Sonos"
description: "Instructions how to integrate Sonos devices into Home Assistant."
date: 2015-09-12 13:00
sidebar: true
comments: false
sharing: true
footer: true
logo: sonos.png
ha_category: Media Player
featured: true
ha_release: 0.7.3
ha_iot_class: "Local Polling"
---

The `sonos` platform allows you to control your [Sonos](http://www.sonos.com) HiFi wireless speakers and audio components from Home Assistant. By default it supports auto-discovery provided by Home Assistant, and you don't need to add anything to your `configuration.yaml`. Alternatively, there are some manual configuration options, listed as follows:

To add your Sonos components to your installation, add the following to your `configuration.yaml` file.  It will perform Sonos auto-discovery of your connected speakers.

```yaml
# Example configuration.yaml entry using Sonos discovery
media_player:
  - platform: sonos
```

If you have multiple network devices, you can provide the IP address of the device that should be used for Sonos auto-discovery.

```yaml
# Example configuration.yaml entry using Sonos discovery on a specific interface
media_player:
  - platform: sonos
    interface_addr: 192.0.2.1
```

You can also specify one or more hosts to connect to if they cannot be found with Sonos auto-discovery.

```yaml
# Example configuration.yaml entry with manually specified addresses
media_player:
  - platform: sonos
    hosts: 192.0.2.25
```

or, for multiple hosts:

```yaml
# Example configuration.yaml entry with manually specified addresses
media_player:
  - platform: sonos
    hosts:
      - 192.0.2.25
      - 192.0.2.26
      - 192.0.2.27
```

### {% linkable_title Service `sonos_snapshot` %}

Take a snapshot of what is currently playing on one or more speakers. This service, and the following one, are useful if you want to play a doorbell or notification sound and resume playback afterwards. If no `entity_id` is provided, all speakers are snapshotted.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of coordinator speakers.

### {% linkable_title Service `sonos_restore` %}

Restore a previosly taken snapshot of one or more speakers. If no `entity_id` is provided, all speakers are restored.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of coordinator speakers.

### {% linkable_title Service `sonos_group_players` %}

Group all players together under a single coordinator.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of a single `entity_id` that will become the coordinator speaker.

### {% linkable_title Service `sonos_unjoin` %}

Remove one or more speakers from a group of speakers. If no `entity_id` is provided, all speakers are unjoined.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of `entity_id`s that will be separated from their coordinator speaker.

