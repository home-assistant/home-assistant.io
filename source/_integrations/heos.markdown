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

The HEOS {% term integration %} is used to connect a [HEOS](https://www.denon.com/en-gb/category/heos/) System to Home Assistant. HEOS is a wireless audio ecosystem
that allows you to stream music to HEOS Built-in products from [Denon](https://www.denon.com/en-us/category/heos/) and [Marantz](https://www.marantz.com/en/world-of-marantz/heos-built-in.html).

Add this integration to automate playback and group configuration of HEOS-capable products. For example, when a scene is activated, set the volume and play a specific Playlist on your receiver.

## Supported functionality

- [Media Player](/integrations/media_player) {% term entities %} for each HEOS-capable product, including speakers, amps, and receivers (Denon and Marantz)
- Viewing the currently playing media
- Controlling play mode (e.g., play/pause), volume, mute, and shuffle
- Playing HEOS favorites, playlists, quick selects, URLs
- Setting the source to physical inputs (e.g., `AUX1`)
- Grouping and ungrouping HEOS devices
- Clearing playlists

## Prerequisites

1. One or more [HEOS-capable products](/integrations/heos#supported-devices).
2. Optionally, a [HEOS Account](https://support.denon.com/app/answers/detail/a_id/17041) to access music services, playlists, and favorites.

{% include integrations/config_flow.md %}

{% note %}
Only a single instance of the integration is needed to access the entire HEOS system on the network. It will only connect to a single {% term host %}.
{% endnote %}

{% configuration_basic %}
Host:
    description: "The hostname or IP address (e.g., \"192.168.1.2\") of your HEOS device. If you have more than one device, select, or enter a host, that is connected to the LAN via wire or has the strongest wireless signal."
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

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
| `media_content_id`     | no       | (e.g., `1`) or name (e.g., `Thumbprint Radio`) of the HEOS favorite |

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
| `media_content_id`     | no       | The quick select number (e.g., `1`) or name (e.g., `Quick Select 1`) |

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

## Supported devices

Denon and Marantz do not currently publish an inventory of HEOS-enabled devices, however, many receiver and hi-fi products began including HEOS since 2013. Consult your product model to confirm support:

- Denon [online manuals](https://www.denon.com/en-us/online-manuals.html) and [product archive](https://www.denon.com/en-us/support/product-archive/)
- Marantz [online manuals](https://www.marantz.com/en-us/support/online-manuals.html) and [product archive](https://www.marantz.com/en-us/category/archive/)

## Unsupported devices

Denon and Marantz products before 2013 and non-network connected products (e.g., turntables and some CD players) do not support HEOS.

## Data updates

HEOS pushes data to Home Assistant via the local network when data and entity states change in real-time.

## Known limitations

- AVR receiver features, such as zone selection/control and power on/off, cannot be controlled through this integration. Use the [Universal Media Player](/integrations/universal/#denon-avr--heos) to combine AVR receiver functionality with this integration.
- {% term TTS %} is not supported.
- The maximum length of a URL that can be used in the `play_media` action is 255 characters due to a limitation in the HEOS firmware.

## Troubleshooting

### Missing favorites

#### Symptom: "IP_ADDRESS is not logged in to a HEOS account and will be unable to retrieve HEOS favorites..."

The message above is logged and the `source_list` attribute of the integration's media_player entities are empty. Attempting call the `media_player.play_media` action
for `favorite` and `playlist` will fail.

##### Description

The HEOS system is not logged in to a HEOS account. This occurs when the integration is first added, the HEOS account has changed (e.g. password reset), and sometimes after a firmware update.

##### Resolution

Use the [heos.sign_in action](/integrations/heos#action-heossign_in) to sign the HEOS system into a HEOS account. This only needs to be performed once, as the system will remain signed in while the account credentials are valid.
