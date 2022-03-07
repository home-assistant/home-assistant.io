---
title: Kaleidescape
description: Instructions on how to integrate Kaleidescape into Home Assistant.
ha_category:
  - Media Player
ha_release: '2022.4'
ha_iot_class: Local Push
ha_config_flow: true
ha_ssdp: true
ha_codeowners:
  - '@SteveEasley'
ha_domain: kaleidescape
ha_platforms:
  - media_player
---

The Kaleidescape integration allows for the automation of Kaleidescape movie players.

![Screenshot](/images/integrations/kaleidescape/media_player.png)

Ideas for automation include:

- Playing and pausing a movie sets lighting scenes.
- The start of movie credits turns up the lights.
- A change in aspect ratio controls a projection masking system.
- A change in video resolution controls a lens system or video scaler.

## Supported Models

This integration is intended for the automation of Kaleidescape players with a movie zone. This includes all Strato and Premier players. Strato players support auto discovery in HomeAssistant. Premier players must be added manually by adding an instance of this integration, and specifying the IP address of the player.

{% include integrations/config_flow.md %}

## Media Player

The Kaleidescape media player platform will create a Media Player entity for each device discovered on your network. This entity will display the currently playing media and playback controls.

### Services

#### media_player.turn_on

You can turn on a player with the `media_player.turn_on` service. Example service payload:

```yaml
- service: media_player.turn_on
  data:
    entity_id: media_player.kaleidescape_theater
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            | no      |  `entity_id` of the player

#### media_player.turn_off

You can turn off a player with the `media_player.turn_off` service. Example service payload:

```yaml
- service: media_player.turn_off
  data:
    entity_id: media_player.kaleidescape_theater
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            | no       |  `entity_id` of the player

#### media_player.media_play

You can play the currently selected media with the `media_player.media_play` service. Example service payload:

```yaml
- service: media_player.media_play
  data:
    entity_id: media_player.kaleidescape_theater
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            | no       |  `entity_id` of the player

#### media_player.media_pause

You can pause the currently playing media with the `media_player.media_pause` service. Example service payload:

```yaml
- service: media_player.media_pause
  data:
    entity_id: media_player.kaleidescape_theater
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            | no       |  `entity_id` of the player

#### media_player.media_stop

You can stop the currently playing media with the `media_player.media_stop` service. Example service payload:

```yaml
- service: media_player.media_stop
  data:
    entity_id: media_player.kaleidescape_theater
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            | no       |  `entity_id` of the player

#### media_player.media_next_track

You can skip to the next track with `media_player.media_next_track` service. Example service payload:

```yaml
- service: media_player.media_next_track
  data:
    entity_id: media_player.kaleidescape_theater
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            | no       |  `entity_id` of the player

#### media_player.media_previous_track

You can skip to the previous track with `media_player.media_previous_track` service. Example service payload:

```yaml
- service: media_player.media_previous_track
  data:
    entity_id: media_player.kaleidescape_theater
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            | no       |  `entity_id` of the player
