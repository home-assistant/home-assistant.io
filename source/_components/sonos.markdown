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
ha_iot_class: Local Polling
redirect_from: /components/media_player.sonos/
---

The `sonos` component allows you to control your [Sonos](https://www.sonos.com) HiFi wireless speakers and audio components from Home Assistant. By default it supports auto-discovery provided by Home Assistant, and you don't need to add anything to your `configuration.yaml`.

If you don't have the discovery component enabled, you can configure the Sonos component by going to the integrations page inside the config panel.

## {% linkable_title Services %}

Sonos makes various services available to allow configuring groups. They are currently registered under the media player component.

### {% linkable_title Service `media_player.sonos_snapshot` %}

Take a snapshot of what is currently playing on one or more speakers. This service, and the following one, are useful if you want to play a doorbell or notification sound and resume playback afterwards. If no `entity_id` is provided, all speakers are snapshotted.

<p class='note'>
The queue is not snapshotted and must be left untouched until the restore. Using `media_player.play_media` is safe and can be used to play a notification sound, including [TTS](/components/tts/) announcements.
</p>

{% configuration %}
entity_id:
  description: The speakers to snapshot.
  required: false
  type: entity_id
with_group:
  description: Should we also snapshot the group layout and the state of other speakers in the group.
  required: false
  type: boolean
{% endconfiguration %}

### {% linkable_title Service `media_player.sonos_restore` %}

Restore a previously taken snapshot of one or more speakers. If no `entity_id` is provided, all speakers are restored.

<p class='note'>
The playing queue is not snapshotted. Using `media_player.sonos_restore` on a speaker that has replaced its queue will restore the playing position, but in the new queue!
</p>

<p class='note'>
A cloud queue cannot be restarted. This includes queues started from within Spotify and queues controlled by Amazon Alexa.
</p>

{% configuration %}
entity_id:
  description: The speakers that should have their snapshot restored.
  required: false
  type: entity_id
with_group:
  description: Should we also restore the group layout and the state of other speakers in the group.
  required: false
  type: boolean
{% endconfiguration %}

### {% linkable_title Service `media_player.sonos_join` %}

Group players together under a single coordinator. This will make a new group or join to an existing group.

{% configuration %}
master:
  description: A single `entity_id` that will become/stay the coordinator speaker.
  required: true
  type: entity_id
entity_id:
  description: The speakers to join to the master.
  required: false
  type: entity_id
{% endconfiguration %}

### {% linkable_title Service `media_player.sonos_unjoin` %}

Remove one or more speakers from their group of speakers. If no `entity_id` is provided, all speakers are unjoined.

{% configuration %}
entity_id:
  description: The speakers to separate from their coordinator speaker.
  required: false
  type: entity_id
{% endconfiguration %}

### {% linkable_title Service `media_player.sonos_set_sleep_timer` %}

Sets a timer that will turn off a speaker by tapering the volume down to 0 after a certain amount of time. Protip: If you set the sleep_time value to 0, then the speaker will immediately start tapering the volume down.

{% configuration %}
entity_id:
  description: The speakers that will have their timers set.
  required: true
  type: entity_id
sleep_time:
  description: Number of seconds that the speaker should wait until it starts tapering. Cannot exceed 86399 (one day).
  required: true
  type: integer
{% endconfiguration %}

### {% linkable_title Service `media_player.sonos_clear_sleep_timer` %}

Clear the sleep timer on a speaker, if one is set.

{% configuration %}
entity_id:
  description: The speakers that will have their timers cleared.
  required: true
  type: entity_id
{% endconfiguration %}

### {% linkable_title Service `media_player.sonos_update_alarm` %}

Update an existing Sonos alarm.

{% configuration %}
entity_id:
  description: The speaker that will have its alarm updated.
  required: true
  type: entity_id
alarm_id:
  description: Integer that is used in Sonos to refer to your alarm.
  required: true
  type: integer
time:
  description: Time to set the alarm.
  required: no
  type: time
volume:
  description: Float for volume level (0.0-1.0).
  required: no
  type: float
enabled:
  description: Boolean for whether or not to enable this alarm.
  required: no
  type: boolean
include_linked_zones:
  description: Boolean that defines if the alarm also plays on grouped players.
  required: no
  type: boolean
{% endconfiguration %}

### {% linkable_title Service `media_player.sonos_set_option` %}

Set Sonos speaker options.

Night Sound and Speech Enhancement modes are only supported when playing from the TV source of products like Sonos Playbar and Sonos Beam. Other speaker types will ignore these options.

{% configuration %}
entity_id:
  description: The speakers that will have their options set.
  required: true
  type: entity_id
night_sound:
  description: Boolean to control Night Sound mode.
  required: no
  type: boolean
speech_enhance:
  description: Boolean to control Speech Enhancement mode.
  required: no
  type: boolean
{% endconfiguration %}

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
