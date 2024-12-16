---
title: Denon HEOS
description: Instructions on how to integrate Denon HEOS into Home Assistant.
ha_category:
  - Media player
ha_release: 0.92
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@andrewsayre'
ha_domain: heos
ha_ssdp: true
ha_platforms:
  - media_player
ha_integration_type: integration
---

The HEOS integration adds support for a [HEOS](https://www.denon.com/en-gb/category/heos/) System in Home Assistant.

## Supported functionality

- [Media Player](/integrations/media_player) {% term entities %} for each HEOS-capable product, including speakers, amps, and receivers (Denon and Marantz)
- Viewing the currently playing media
- Controlling play mode (i.e. play/pause), volume, mute, and shuffle
- Playing HEOS favorites, playlists, quick selects, URLs
- Setting the source to physical inputs (i.e. `AUX1`)
- Grouping and ungrouping HEOS devices
- Clearing playlists

{% include integrations/config_flow.md %}

{% note %}
This integration only connects to a single {% term host %} to access the entire HEOS System on the network. Select, or enter a host, that is connected to the LAN via wire or has the strongest wireless signal.
{% endnote %}

## Playing media

### Play a favorite

You can play a HEOS favorite by number or name with the `media_player.play_media` action. Example action data payload:

```yaml
action: media_player.play_media
data:
  entity_id: media_player.office
  media_content_type: "favorite"
  media_content_id: "1"
```

| Data attribute | Optional | Description                                                         |
| ---------------------- | -------- | ------------------------------------------------------------------- |
| `entity_id`            | yes      | `entity_id` of the player(s)                                        |
| `media_content_type`   | no       | Set to the value `favorite`                                         |
| `media_content_id`     | no       | (i.e., `1`) or name (i.e., `Thumbprint Radio`) of the HEOS favorite |

### Play a playlist

You can play a HEOS playlist with the `media_player.play_media` action. Example action data payload:

```yaml
action: media_player.play_media
data:
  entity_id: media_player.office
  media_content_type: "playlist"
  media_content_id: "Awesome Music"
```

| Data attribute | Optional | Description                   |
| ---------------------- | -------- | ----------------------------- |
| `entity_id`            | yes      | `entity_id` of the player(s)  |
| `media_content_type`   | no       | Set to the value `playlist`   |
| `media_content_id`     | no       | The name of the HEOS playlist |

### Play a Quick Select

You can play a HEOS Quick Select by number or name with the `media_player.play_media` action. Example action data payload:

```yaml
action: media_player.play_media
data:
  entity_id: media_player.office
  media_content_type: "quick_select"
  media_content_id": "1"
```

| Data attribute | Optional | Description                                                          |
| ---------------------- | -------- | -------------------------------------------------------------------- |
| `entity_id`            | yes      | `entity_id` of the player(s)                                         |
| `media_content_type`   | no       | Set to the value `quick_select`                                      |
| `media_content_id`     | no       | The quick select number (i.e., `1`) or name (i.e., `Quick Select 1`) |

### Play a URL

You can play a URL through a HEOS media player using the `media_player.play_media` action. The HEOS player must be able to reach the URL.

{% note %}
The URL (`media_content_type`) must be 255 characters or fewer due to a limitation in the HEOS firmware.
{% endnote %}

Example action data payload:

```yaml
action: media_player.play_media
data:
  entity_id: media_player.office
  media_content_type: "url"
  media_content_id: "http://path.to/stream.mp3"
```

| Data attribute | Optional | Description                                              |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | yes      | `entity_id` of the player(s) to play the URL     |
| `media_content_type`   | no       | Set to the value `url`                           |
| `media_content_id`     | no       | The full URL to the stream (max 255 characters)  |

## Grouping players

### Join

To group HEOS media players together for synchronous playback, use the `media_player.join` action.

{% note %}
All `group_members` need to be HEOS media players.
{% endnote %}

The example action data payload below will expand playback of `media_player.office` to the `media_player.kitchen` and `media_player.bathroom` players:

```yaml
action: media_player.join
data:
  entity_id: media_player.office
  group_members:
    - media_player.kitchen
    - media_player.bathroom
```

| Data attribute | Optional | Description                                                                                          |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `entity_id`            | yes      | The media player entity whose playback will be expanded to the players specified in `group_members`. |
| `group_members`        | no       | The player entities which will be synced with the playback from `entity_id`.                         |

### Unjoin

For removing a HEOS player from a group, use the `media_player.unjoin` action.

```yaml
action: media_player.unjoin
data:
  entity_id: media_player.office
```

| Data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | yes      | Remove this media player from any player groups. |

## Actions

The HEOS integration makes various custom {% term actions %} available in addition to the standard [Media Player actions](/integrations/media_player#actions).

### Action `heos.sign_in`

Use the sign-in action to sign the connected device into a HEOS account so that it can retrieve and play HEOS favorites and playlists. An error message is logged if sign-in is unsuccessful.

{% note %}
The device the integration connects to authenticates independently of other devices and the HEOS mobile app. When you first set up the integration, or after a device firmware update, the device will most likely not be logged in.
{% endnote %}

To run, go to **Developer Tools** > **Actions** and then type in `heos.sign_in`. Then enter your HEOS account username and password, and click the Perform Action button. An error message is only logged if sign-in is unsuccessful.

Example action data payload:

```yaml
action: heos.sign_in
data:
  username: "example@example.com"
  password: "password"
```

| Data attribute | Optional | Description                                |
| ---------------------- | -------- | ------------------------------------------ |
| `username`             | no       | The username or email of the HEOS account. |
| `password`             | no       | The password of the HEOS account.          |

### Action `heos.sign_out`

Use the sign-out action to sign the connected device out of a HEOS account. An error message is logged if sign-out is unsuccessful. There are no parameters to this action Example action data payload:

```yaml
action: heos.sign_out
data: {% raw %}{}{% endraw %}
```

## Known limitations

- AVR receiver features, such as zone selection/control and power on/off, cannot be controlled through this integration. Use the [Universal Media Player](/integrations/universal/#denon-avr--heos) to combine AVR receiver functionality with this integration.
- {% term TTS %} is not supported.
- The maximum length of a URL that can be used in the `play_media` action is 255 characters due to a limitation in the HEOS firmware.

## Troubleshooting

### Debugging

The HEOS integration will log additional information about commands, events, and other messages when the log level is set to `debug`. Add the relevant line below to the {% term "`configuration.yaml`" %} to enable debug logging:

```yaml
logger:
  default: info
  logs:
    homeassistant.components.heos: debug
    pyheos: debug
```

### Missing Favorites

If the HEOS controller is not signed in to a HEOS account, HEOS favorites will not be populated in the media player source selection and the `media_player.play_media` action for `favorite` and `playlist` will fail. Additionally, the following warning will be logged at startup:
> IP_ADDRESS is not logged in to a HEOS account and will be unable to retrieve HEOS favorites: Use the 'heos.sign_in' action to sign-in to a HEOS account

To resolve this issue, use the `heos.sign_in` action to sign the controller into an account as documented above. This only needs to be performed once, as the controller will remain signed in while the account credentials are valid.
