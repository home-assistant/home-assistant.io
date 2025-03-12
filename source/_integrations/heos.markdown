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
  - diagnostics
  - media_player
ha_integration_type: hub
ha_quality_scale: platinum
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
    description: "The host name or IP address (e.g., \"192.168.1.2\") of your HEOS-capable product. If you have more than one device, select, or enter a host, that is connected to the LAN via wire or has the strongest wireless signal."
{% endconfiguration_basic %}

## Configuration options

The integration provides the following configuration options. By entering your HEOS Account login information, the integration will be able to access streaming services, playlists, favorites, and other features. The integration will validate and sign in to your HEOS Account when credentials are entered or updated, and will ensure the HEOS System remains logged in while the credentials remain valid. Clearing the credentials will sign the HEOS System out of your account.

1. Go to **{% my integrations icon title="Settings > Devices & Services" %}**.
2. Select **Denon HEOS**. Select **Configure**.
3. Enter or clear your HEOS Account credentials.
4. Select **Submit** to save the options.

{% configuration_basic %}
Username:
  description: "The username or e-mail address of your HEOS Account."
Password:
  description: "The password to your HEOS Account."
{% endconfiguration_basic %}

## Reconfiguration

Once setup, the host name or IP address used to access the HEOS System can be changed by reconfiguring the integration.

1. Go to **{% my integrations icon title="Settings > Devices & Services" %}**.
2. Select **Denon HEOS**. Click the three-dot {% icon "mdi:dots-vertical" %} menu and then select **Reconfigure**.
3. Enter a new [host name or IP address](/integrations/heos/#host).
4. Click Submit to complete the reconfiguration.

## Removal

This integration follows standard integration removal. No extra steps are required.

1. Go to **{% my integrations icon title="Settings > Devices & Services" %}**.
2. Select **Denon HEOS**. Click the three-dot {% icon "mdi:dots-vertical" %} menu and then select **Delete**.

## Actions

In addition to the standard [Media Player actions](/integrations/media_player#actions), the HEOS integration provides the following {% term actions %}:

Group volume actions: `media_player.group_volume_set`, `media_player.group_volume_down`, and `media_player.group_volume_up` for entities joined to a group.

### Action `media_player.group_volume_set`

Sets the group's volume while preserving member volume ratios. This action can be called on any entity in a group.

| Data attribute | Optional | Description                                      |
|------------------------|----------|------------------------------------------------------------------|
| `entity_id`            |      yes | A media player entity that is joined to a group.                  |
| `volume_level`         |       no | The volume level, where 0 is inaudible, 1 is the maximum volume. |

## Examples

### Playing media

#### Play a favorite

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

#### Play a playlist

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

#### Play a Quick Select

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

#### Play a URL

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

### Grouping players

#### Join

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

#### Unjoin

For removing a HEOS player from a group, use the `media_player.unjoin` action.

```yaml
action: media_player.unjoin
data:
  entity_id: media_player.office
```

| Data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | yes      | Remove this media player from any player groups. |


{% note %}

Actions may fail if they cannot be processed by the HEOS device. For example, attempting to call `media_player.clear_playlist` when the queue is empty will result in an error. To prevent this from halting a script or automation, set [`continue_on_error: true`](/docs/scripts/#continuing-on-error) in the action call.
{% endnote %}

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

## Logging and diagnostics

The HEOS integration supports [Home Assistant debug logs and diagnostics](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics). Diagnostics are available at both the integration entry and device level.

## Troubleshooting

### Missing favorites

#### Symptom: "The HEOS System is not logged in: Enter credentials in the integration options to access favorites and streaming services"

The message above is logged during integration startup and the `source_list` attribute of the integration's media_player entities are empty. Attempting call the `media_player.play_media` action
for `favorite` and `playlist` will fail. Other functionality of the integration is unaffected.

##### Description

To access features, such as favorites, playlists, and streaming services, the HEOS System must be logged in to your HEOS Account. This occurs when credentials are not entered in the configuration options and the HEOS System is in a logged out state.

##### Resolution

Enter the credentials to your HEOS Account in the [configuration options](#configuration-options) if you want to access playlists, favorites, and streaming services; otherwise, the logged warning can be ignored. If credentials are entered, the integration will ensure that the HEOS System remains logged in while the credentials remain valid.

### Error attempting to submit configuration options

#### Symptom: "Invalid authentication"

##### Description

The integration was unable to log the HEOS System in using the credentials provided. An informational log message contains the specific reason, such as: `User not found (10)` or `Invalid credentials (6)`.

##### Resolution

Validate your credentials by logging in to the HEOS Mobile App and then re-enter your credentials in the configuration options and try submitting again.

#### Symptom: "Unexpected error"

##### Description

An unexpected error occurred signing in or logging out of your HEOS Account. An error-level log message contains the error information.

##### Resolution

Power-cycle the host that the integration is connected to and try again. If the problem persists, open an issue and include the error information.
