---
layout: page
title: "DoorBird"
description: "Instructions on how to integrate your DoorBird video doorbell with Home Assistant."
date: 2017-08-06 11:30
sidebar: true
comments: false
sharing: true
footer: true
logo: doorbird.png
ha_category: Hub
ha_release: "0.54"
ha_iot_class: "Local Polling"
---

The `doorbird` implementation allows you to integrate your [DoorBird](http://www.doorbird.com/) device in Home Assistant.

To connect your device, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
doorbird:
  host: DOORBIRD_IP_OR_HOSTNAME
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  hass_url_override: HASS_IP
```

Configuration variables:

- **host** (*Required*): The LAN IP address or hostname of your device. You can find this by going to the [DoorBird Online check](http://www.doorbird.com/checkonline) and entering the information from the paper that was included in the box.
- **username** (*Required*): The username of a non-administrator user account on the device.
- **password** (*Required*): The password for the user specified.
- **doorbell_events** (*Optional*): Setting this to `true` this will register a callback URL with the device so that events can be published to the event bus when the doorbell rings.
- **hass_url_override** (*Optional*): If your DoorBird cannot connect to the machine running Home Assistant because you are using dynamic DNS or some other HTTP configuration (such as HTTPS), specify the LAN IP of the machine here to force a LAN connection.

<p class="note warning">
Enabling `doorbell_events` will delete all other registered push notification services with the device every time Home Assistant starts. This will not affect notifications delivered by the DoorBird mobile app.
</p>

### Doorbell Sound Examples

You can create an automation that triggers on event `doorbird_doorbell` to play a doorbell sound when the Doorbird button is pressed. This should work with any media player.

#### Example using SONOS

[`SONOS`](http://www.sonos.com) players have features allowing for "snapshotting" the current state of some or all players so those state(s) can be "restored" at a later time. This feature is perfect for implementing a doorbell sound (from Doorbird or any other Doorbell setup for that matter). The [`media_player.sonos`](/components/media_player.sonos/) platform includes the [`SONOS_SNAPSHOT`](/components/media_player.sonos/#service-sonos_snapshot) and [`SONOS_RESTORE`](/components/media_player.sonos/#service-sonos_restore) features. The result of not using these features is any currently playing songs or media will not continue playing after the doorbell sound has played and you will be left with the doorbell sound queued as the last played song. This setup allows for seamless ringing of the doorbell and all SONOS devices continuing nicely on as if nothing had happerned.

The example script below takes a snapshot of three SONOS players that are not currently grouped together, joins the three players in a group (so the sound plays at the same time on all players), plays the doorbell MP3 sound, unjoins the players from the group and finally restores the players to their original state. When the players are grouped they are controlled by refering to the `master`

Automation file:
```yaml
- alias: Doorbird ring
  trigger:
    platform: event
    event_type: doorbird_doorbell
  action:
    service: script.turn_on
      entity_id: script.doorbell
```

Script file:
```yaml
doorbell:
  alias: Ring Doorbell
  sequence:
    - service: media_player.sonos_snapshot
      data:
        entity_id:
          - media_player.kitchen
          - media_player.master_bedroom
          - media_player.study
    - service: media_player.sonos_join
      data:
        master: media_player.study
        entity_id:
          - media_player.kitchen
          - media_player.master_bedroom
          - media_player.study
    - service: media_player.play_media
      data:
        entity_id: media_player.study   # the group master
        media_content_id: http://10.1.1.10/sounds/doorbell.mp3   # this is on a NAS but could be HASS local
        media_content_type: music
    - service: media_player.volume_set
      data:
        entity_id:   # can still control the volume of grouped players indivdually
          - media_player.study
          - media_player.kitchen
          - media_player.master_bedrom
        volume_level: 0.50
    - delay:
        seconds: 4   # wait while the sound plays
    - service: media_player.sonos_unjoin
      data:
        entity_id:
          - media_player.kitchen
          - media_player.master_bedroom
          - media_player.study
    - service: media_player.sonos_restore
      data:
        entity_id:
          - media_player.kitchen
          - media_player.master_bedroom
          - media_player.study
```
