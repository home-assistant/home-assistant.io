---
title: Kaleidescape
description: Control Kaleidescape movie players from Home Assistant, and use their playback and video sensors in automations.
ha_categories:
  - media_entertainment.tv_streaming
ha_release: '2022.4'
ha_iot_class: Local Push
ha_config_flow: true
ha_ssdp: true
ha_codeowners:
  - '@SteveEasley'
ha_domain: kaleidescape
ha_platforms:
  - media_player
  - remote
  - sensor
ha_integration_type: device
---

The **Kaleidescape** {% term integration %} lets you control and automate [Kaleidescape](https://www.kaleidescape.com/) movie players from Home Assistant. You can see what is playing, send remote commands to the player, and use the playback and video information of the current movie in automations.

Ideas for automation include:

- Playing and pausing a movie sets lighting scenes.
- The start of movie credits turns up the lights.
- A change in aspect ratio controls a projection masking system.
- A change in video resolution controls a lens system or video scaler.

## Supported devices

The integration supports Kaleidescape players with a movie zone, such as Strato, Alto, Cinema One, and Premiere movie players. Strato players support auto-discovery in Home Assistant.

## Unsupported devices

- Kaleidescape components without a movie zone, such as servers, Disc Vaults, and the Premiere Music Player.
- Premiere players used with Kaleidescape Co-Star. The connected Strato player controls them, so they cannot be controlled directly.

{% include integrations/config_flow.md %}

## Supported functionality

The **Kaleidescape** integration provides the following entities for each player.

### Media player

The integration creates a [media player](/integrations/media_player/) entity for the player. It shows the title, cover art, duration, and position of the movie that is playing. You can use it to turn the player on and off, and to play, pause, stop, and skip to the next or previous chapter.

### Remote

The integration creates a [remote](/integrations/remote/) entity for the player. Use it with the [**Send remote command**](/actions/remote.send_command/) action to send the following commands.

Navigation:

- `up`, `down`, `left`, `right`: Move the highlight on the onscreen display.
- `select`: Select the highlighted item.
- `cancel`: Go back by closing the current page, dialog, or text entry. During movie playback, this stops the movie.
- `menu_toggle`: Show or hide the Kaleidescape menu. A playing movie keeps playing behind the menu.

Playback:

- `replay`: Skip back 10 seconds.
- `scan_forward`, `scan_reverse`: Fast-forward or rewind. Each repeat cycles through 2×, 4×, and 8× speed. Resume playback to return to normal speed.

Movie views:

- `go_movie_covers`: Show the Movie Covers view.

Sending a movie view command during movie playback stops the movie. The player remembers your place so you can resume it later.

A typical action might look like the example below, which sends the `select` command to the device to select the currently highlighted item.

{% example %}
action: |
  action: remote.send_command
  target:
    entity_id: remote.kaleidescape_theater
  data:
    command: select
{% endexample %}

### Sensors

The integration creates the following [sensor](/integrations/sensor/) entities. All of them are enabled by default. All except **Media location**, **Play status**, and **Play speed** are diagnostic entities.

- **Media location**
  - **Description**: The location in the current movie.
  - **Values**: `none`, `content`, `intermission`, `credits`, `disc_menu`
- **Play status**
  - **Description**: The play status of the current movie.
  - **Values**: `none`, `paused`, `playing`, `forward`, `reverse`
- **Play speed**
  - **Description**: The scan speed of the current movie.
  - **Values**: `0` when not scanning, or an integer between `1` (slowest) and `3` (fastest) while scanning forward or in reverse
- **Video mode**
  - **Description**: The video mode of the player's HDMI output.
  - **Values**:
    - `none`: No output, or a video mode that is not in this list.
    - `480i60_4:3`
    - `480i60_16:9`
    - `480p60_4:3`
    - `480p60_16:9`
    - `576i50_4:3`
    - `576i50_16:9`
    - `576p50_4:3`
    - `576p50_16:9`
    - `720p60_ntsc_hd`
    - `720p50_pal_hd`
    - `1080i60_16:9`
    - `1080i50_16:9`
    - `1080p60_16:9`
    - `1080p50_16:9`
    - `1080p24_16:9`
    - `480i60_64:27`
    - `576i50_64:27`
    - `1080i60_64:27`
    - `1080i50_64:27`
    - `1080p60_64:27`
    - `1080p50_64:27`
    - `1080p23976_64:27`
    - `1080p24_64:27`
    - `3840x2160p23976_16:9`
    - `3840x2160p23976_64:27`
    - `3840x2160p30_16:9`
    - `3840x2160p30_64:27`
    - `3840x2160p60_16:9`
    - `3840x2160p60_64:27`
    - `3840x2160p25_16:9`
    - `3840x2160p25_64:27`
    - `3840x2160p50_16:9`
    - `3840x2160p50_64:27`
    - `3840x2160p24_16:9`
    - `3840x2160p24_64:27`
- **Video color EOTF**
  - **Description**: The electro-optical transfer function (EOTF) of the current movie.
  - **Values**: `unknown`, `sdr`, `hdr`, `smtpest2084` (HDR10)
  - **Available for players**: Strato, Alto
- **Video color space**
  - **Description**: The color space of the current movie.
  - **Values**: `default`, `rgb`, `bt601`, `bt709`, `bt2020`
  - **Available for players**: Strato, Alto
- **Video color depth**
  - **Description**: The color depth of the current movie.
  - **Values**: `unknown`, `24bit`, `30bit`, `36bit`
  - **Available for players**: Strato, Alto
- **Video color sampling**
  - **Description**: The chroma sampling of the current movie.
  - **Values**: `none`, `rgb`, `ycbcr422`, `ycbcr444`, `ycbcr420`
  - **Available for players**: Strato, Alto
- **Screen mask ratio**
  - **Description**: The aspect ratio of the current movie's image.
  - **Values**: `none`, `1.33`, `1.66`, `1.78`, `1.85`, `2.35`
- **Screen mask top trim relative**
  - **Description**: The top trim value, relative to the aspect ratio reported by the **Screen mask ratio** sensor. Positive values move the mask toward the center of the screen.
  - **Values**: A percentage of the screen height between -99.9% and +99.9%
- **Screen mask bottom trim relative**
  - **Description**: The bottom trim value, relative to the aspect ratio reported by the **Screen mask ratio** sensor. Positive values move the mask toward the center of the screen.
  - **Values**: A percentage of the screen height between -99.9% and +99.9%
- **Screen mask conservative ratio**
  - **Description**: A more conservative estimate of the image aspect ratio than the **Screen mask ratio** sensor.
  - **Values**: The same as **Screen mask ratio**
- **Screen mask top mask absolute**
  - **Description**: The position of the top mask, measured from the top of the screen.
  - **Values**: A percentage of the screen height between 0% and 100%
- **Screen mask bottom mask absolute**
  - **Description**: The position of the bottom mask, measured from the bottom of the screen.
  - **Values**: A percentage of the screen height between 0% and 100%
- **Cinemascape mask**
  - **Description**: The CinemaScape frame aspect ratio, in hundredths. For example, `133` for 4:3 and `178` for 16:9.
  - **Values**: An integer between `0` and `999`
  - **Remarks**: Only updated while a CinemaScape mode is active.
- **Cinemascape mode**
  - **Description**: The CinemaScape mode the player is set to.
  - **Values**: `none`, `anamorphic`, `letterbox`, `native`

For more details about the sensor values, see Kaleidescape's [Control Protocol Reference Manual](https://www.kaleidescape.com/go/control-protocol).

## Kaleidescape automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: Turn up the lights when the movie content ends

This automation activates a lighting scene when the **Media location** sensor changes from `content` to another value, such as `credits` or `intermission`.

- **Trigger**: Entity: State
  - **Target**: Kaleidescape Theater Media location (`sensor.kaleidescape_theater_media_location`)
  - **From**: content
- **Action**: Activate scene
  - **Target**: Theater lights (`scene.theater_lights`)

{% details "YAML example for turning up the lights when the movie content ends" %}

{% example %}
automation: |
  alias: "Turn up the lights when the movie content ends"
  triggers:
    - trigger: state
      entity_id: sensor.kaleidescape_theater_media_location
      from: content
  actions:
    - action: scene.turn_on
      target:
        entity_id: scene.theater_lights
{% endexample %}

{% enddetails %}

## Data updates

The player pushes changes to Home Assistant as soon as they happen, so the integration does not need to {% term polling poll %} the player. If the connection to the player drops, the integration tries to reconnect every 5 seconds. While it is disconnected, the media player entity is unavailable.

## Known limitations

- The video color sensors are only reported by Strato and Alto players. On other players, they keep their default values.

## Troubleshooting

{% details "The player is not discovered" %}

### Symptom: The player is not discovered

The player does not appear as a discovered device in **Settings** > **Devices & services**.

#### Description

Home Assistant discovers players on your local network, and then connects to the player to check that it has a movie zone. A player that cannot be reached, or a component without a movie zone, is not shown.

#### Resolution

1. Make sure the player is turned on and connected to the same network as Home Assistant. Discovery does not work across different networks or VLANs.
2. Make sure Home Assistant can reach the player on TCP port 10000, for example through a firewall.
3. Check that the player is a [supported device](#supported-devices).

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
