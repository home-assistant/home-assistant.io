---
title: Denon HEOS
description: Instructions on how to integrate Denon HEOS into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.92
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@andrewsayre'
ha_domain: heos
---

The HEOS integration adds support for [HEOS](http://heosbydenon.denon.com) capable products, such as speakers, amps, and receivers (Denon and Marantz) into Home Assistant. Features currently include:

- Each device is represented as a media player entity
- View the currently playing media
- Control play mode (play, pause, stop, next and previous), volume, mute and shuffle
- Clear playlist
- Select source from device physical inputs and HEOS favorites
- Joining and unjoining of HEOS groups

## Configuration

HEOS devices are discovered and setup automatically when the [discovery](/integrations/discovery) integration is enabled. Alternatively, the integration can be setup through the frontend control panel integrations page or manually by adding the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
heos:
  host: IP_ADDRESS
```

{% configuration %}
host:
  description: "Address of the device. Example: 192.168.1.32."
  required: true
  type: string
{% endconfiguration %}

<div class='note info'>
A connection to a single device enables control for all devices on the network. If you have multiple HEOS devices, enter the host of one that is connected to the LAN via wire or has the strongest wireless signal.
</div>

## Services

### Service `heos.sign_in`

Use the sign-in service to sign the connected controller into a HEOS account so that it can retrieve and play HEOS favorites and playlists. An error message is logged if sign-in is unsuccessful. Example service data payload:

```yaml
username: "example@example.com"
password: "password"
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `username`             | no       | The username or email of the HEOS account.
| `password`             | no       | The password of the HEOS account.

### Service `heos.sign_out`

Use the sign-out service to sign the connected controller out of a HEOS account. An error message is logged if sign-out is unsuccessful. There are no parameters to this service.

### Service `heos.join`

This service can be used for joining or creating a HEOS group. A HEOS group always contains exactly one leader player and at least another player which acts as a group member. All member players will synchronously play the same audio as the group leader. The group can be controlled by any player of the group. For creating a new HEOS group or joining more members to an existing group the service call looks as follows:

```yaml
master: media_player.heos_player1
entity_id:
  - media_player.heos_player2
}
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `leader`               | no       | A single `entity_id` that will become/stay the leader speaker of the HEOS group.
| `entity_id`            | no       | String or list of `entity_id`s to join to the leader.

### Service `heos.unjoin`

Use the unjoin service to remove a single media player from an existing HEOS group. When the leader player is unjoined from a HEOS group the group will be destroyed. Example service data payload:

```yaml
entity_id: media_player.heos_player1
```

| Attribute              | Optional  | Description |
| ---------------------- | --------- |-------------|
| `entity_id`            | no        | Removes all grouping from this media player. [Required]

### Service `media_player.play_media`

#### Play Favorite

You can play a HEOS favorite by number or name with the `media_player.play_media` service. Example service data payload:

```yaml
entity_id: media_player.office
media_content_type: "favorite"
media_content_id: "1"
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            | yes      |  `entity_id` of the player(s)
| `media_content_type`   | no       | Set to the value `favorite`
| `media_content_id`     | no       | (i.e., `1`) or name (i.e., `Thumbprint Radio`) of the HEOS favorite

#### Play Playlist

You can play a HEOS playlist with the `media_player.play_media` service. Example service data payload:

```yaml
entity_id: media_player.office
media_content_type: "playlist"
media_content_id: "Awesome Music"
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            | yes      | `entity_id` of the player(s)
| `media_content_type`   | no       | Set to the value `playlist`
| `media_content_id`     | no       | The name of the HEOS playlist

#### Play Quick Select

You can play a HEOS Quick Select by nubmer or name with the `media_player.play_media` service. Example service data payload:

```yaml
entity_id: media_player.office
media_content_type: "quick_select"
media_content_id": "1"
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            | yes      | `entity_id` of the player(s)
| `media_content_type`   | no       | Set to the value `quick_select`
| `media_content_id`     | no       | The quick select number (i.e., `1`) or name (i.e., `Quick Select 1`)

#### Play URL

You can play a URL through a HEOS media player using the `media_player.play_media` service. The HEOS player must be able to reach the URL. Example service data payload:

```yaml
entity_id: media_player.office
media_content_type: "url"
media_content_id: "http://path.to/stream.mp3"
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            | yes      | `entity_id` of the player(s) to play the URL
| `media_content_type`   | no       | Set to the value `url`
| `media_content_id`     | no       | The full URL to the stream

## Notes

- Receivers with multiple zones are represented as a single media player. They will be turned on when playback is started, but cannot be turned off by the integration at this time.

## Troubleshooing

### Debugging

The HEOS integration will log additional information about commands, events, and other messages when the log level is set to `debug`. Add the the relevant line below to the `configuration.yaml` to enable debug logging:

```yaml
logger:
  default: info
  logs:
    homeassistant.components.heos: debug
    pyheos: debug
```

### Missing Favorites

If the HEOS controller is not signed in to a HEOS account, HEOS favorites will not be populated in the media player source selection and the service `media_player.play_media` for `favorite` and `playlist` will fail. Additionally, the following warning will be logged at startup:
> IP_ADDRESS is not logged in to a HEOS account and will be unable to retrieve HEOS favorites: Use the 'heos.sign_in' service to sign-in to a HEOS account

To resolve this issue, use the `heos.sign_in` service to sign the controller into an account as documented above. This only needs to be performed once, as the controller will remain signed in while the account credentials are valid.
