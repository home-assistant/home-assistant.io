---
layout: page
title: "Sonos"
description: "Instructions on how to integrate Sonos devices into Home Assistant."
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
redirect_from: /components/media_player.sonos/
---

The `sonos` component allows you to control your [Sonos](https://www.sonos.com) HiFi wireless speakers and audio components from Home Assistant. By default it supports auto-discovery provided by Home Assistant, and you don't need to add anything to your `configuration.yaml`.

If you don't have the discovery component enabled, you can configure the Sonos component by going to the integrations page inside the config panel.

## {% linkable_title Services %}

Sonos makes various services available to allow configuring groups. They are currently registered under the media player component.

### {% linkable_title Service `sonos_snapshot` %}

Take a snapshot of what is currently playing on one or more speakers. This service, and the following one, are useful if you want to play a doorbell or notification sound and resume playback afterwards. If no `entity_id` is provided, all speakers are snapshotted.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`s of coordinator speakers.
| `with_group` | yes | Should be also snapshot the group state of the speaker.

### {% linkable_title Service `sonos_restore` %}

Restore a previously taken snapshot of one or more speakers. If no `entity_id` is provided, all speakers are restored.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`s of coordinator speakers.
| `with_group` | yes | Should be also restore the group state of the speaker. Only if was snapshot with group.

### {% linkable_title Service `sonos_join` %}

Do group players together under a single coordinator. That will make a new group or join to exists group.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `master` | no | A single `entity_id` that will become/hold the coordinator speaker.
| `entity_id` | no | String or list of a single `entity_id` that will group to master speaker.

### {% linkable_title Service `sonos_unjoin` %}

Remove one or more speakers from a group of speakers. If no `entity_id` is provided, all speakers are unjoined.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of `entity_id`s that will be separated from their coordinator speaker.

### {% linkable_title Service `sonos_set_sleep_timer` %}

Sets a timer that will turn off a speaker by tapering the volume down to 0 after a certain amount of time. Protip: If you set the sleep_time value to 0, then the speaker will immediately start tapering the volume down.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of `entity_id`s that will have their timers set. Must be a coordinator speaker.
| `sleep_time` | no | Integer number of seconds that the speaker should wait until it starts tapering. Cannot exceed 86399 (one day).

### {% linkable_title Service `sonos_clear_sleep_timer` %}

Clear the sleep timer on a speaker, if one is set.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of `entity_id`s that will have their timers cleared. Must be a coordinator speaker.

### {% linkable_title Service `sonos_update_alarm` %}

Update an existing Sonos alarm.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of `entity_id`s that will have their timers cleared. Must be a coordinator speaker.
| `alarm_id` | no | Integer that is used in Sonos to refer to your alarm.
| `time` | yes | Time to set the alarm.
| `volume` | yes | Float for volume level.
| `enabled` | yes | Boolean for whether or not to enable this alarm.
| `include_linked_zones` | yes | Boolean that defines if the alarm also plays on grouped players.

### {% linkable_title Service `sonos_set_option` %}

Set Sonos speaker options.

Night Sound and Speech Enhancement modes are only supported on Sonos PLAYBAR and PLAYBASE speakers when playing from the TV source. Other speaker types will ignore these options.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of `entity_id`s that will have their options set.
| `night_sound` | yes | Boolean to control Night Sound mode.
| `speech_enhance` | yes | Boolean to control Speech Enhancement mode.


## {% linkable_title Advanced use %}

For advanced uses, there are some manual configuration options available.

If you have multiple network devices, you can provide the IP address of the device that should be used for Sonos auto-discovery.

```yaml
# Example configuration.yaml entry using Sonos discovery on a specific interface
sonos:
  media_player:
    interface_addr: 192.0.2.1
```

You can also specify one or more hosts to connect to if they cannot be found with Sonos auto-discovery.

```yaml
# Example configuration.yaml entry with manually specified addresses
sonos:
  media_player:
    hosts: 192.0.2.25
```

or, for multiple hosts:

```yaml
# Example configuration.yaml entry with manually specified addresses
sonos:
  media_player:
    hosts:
      - 192.0.2.25
      - 192.0.2.26
      - 192.0.2.27
```

## {% linkable_title Additional information %}

This component is using the [SoCo](https://github.com/SoCo/SoCo) project.  

To be able to support the Sonos components and features it is mandatory to have TCP port 1400 opened. This port is used to receive events about changes on the Sonos network. For more details please see the [SoCo documentation](https://github.com/SoCo/SoCo)  and source code of the SoCo project.

