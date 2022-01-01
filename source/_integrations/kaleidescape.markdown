---
title: Kaleidescape
description: Instructions on how to integrate Kaleidescape into Home Assistant.
ha_category:
  - Media Player
ha_release: '2021.10.7'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@SteveEasley'
ha_domain: kaleidescape
ha_platforms:
  - media_player
---

The Kaleidescape integration allows for the automation of Kaleidescape movie players in Home Assistant. Services and attributes are exposed for building simple to advanced automations. Ideas include:

- Playing and pausing a movie sets lighting scenes.
- The start of movie credits turns up the lights.
- A change in aspect ratio controls a projection masking system.
- A change in video resolution controls a lens system or video scaler.

## Supported Models

This integration is intended for the automation of Kaleidescape players with a movie zone. These players will automatically have a respective Home Assistant media player added. Any music zone in a player is ignored at this time.

Testing was done on a Strato S with kOS `10.11.0-22557`.

{% include integrations/config_flow.md %}

<br/>

<div class='note info'>

A connection to a single Kaleidescape player enables control of all players in the system. The default hostname to connect to is: _my-kaleidescape.local_. If that fails try the hostname: _my-kaleidescape_. If that fails see the [Accessing the Browser Interface](https://support.kaleidescape.com/article/Accessing-the-Browser-Interface) support document from Kaleidescape, which will help you determine the correct hostname.

</div>

## Services

### media_player.turn_on

You can turn on a player with the `media_player.turn_on` service. Example service payload:

```yaml
- service: media_player.turn_on
  data:
    entity_id: media_player.theater_kaleidescape
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            | yes      |  `entity_id` of the player

### media_player.turn_off

You can turn off a player with the `media_player.turn_off` service. Example service payload:

```yaml
- service: media_player.turn_off
  data:
    entity_id: media_player.theater_kaleidescape
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            | no       |  `entity_id` of the player

### media_player.media_play

You can play the currently selected media with the `media_player.media_play` service. Example service payload:

```yaml
- service: media_player.media_play
  data:
    entity_id: media_player.theater_kaleidescape
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            | no       |  `entity_id` of the player

### media_player.media_pause

You can pause the currently playing media with the `media_player.media_pause` service. Example service payload:

```yaml
- service: media_player.media_pause
  data:
    entity_id: media_player.theater_kaleidescape
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            | no       |  `entity_id` of the player

### media_player.media_stop

You can stop the currently playing media with the `media_player.media_stop` service. Example service payload:

```yaml
- service: media_player.media_stop
  data:
    entity_id: media_player.theater_kaleidescape
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            | no       |  `entity_id` of the player

## Attributes

The kaleidescape media player entity exposes a number of attributes to represent the state of the player.

### media

#### Attribute: media_content_id

Identifier for currently playing media.

```yaml
attribute: media_content_id
```

| Value | Description |
| ----- | ----------- |
| `<string>` | Identifier for currently playing media.  |

#### Attribute: media_content_type

Provides the media type of the currently playing media.

```yaml
attribute: media_content_type
```

| Value | Description |
| ----- | ----------- |
| `none` | None |
| `dvd` | DVD |
| `stream` | Video stream |
| `bluray` | Blu-ray Disc |

#### Attribute: media_title

Provides the title of the currently playing media.

```yaml
attribute: media_title
```

| Value | Description |
| ----- | ----------- |
| `<string>` | Media title |

#### Attribute: media_duration

Provides the total length of the currently playing media.

```yaml
attribute: media_duration
```

| Value | Description |
| ----- | ----------- |
| `<int>` | Media duration in seconds |

#### Attribute: media_location

Provides the location in the currently playing media.

This value is useful for triggering lighting systems and other events based on the current location within the media. For example, during intermission, the controller could raise the lights and activate a popcorn machine.

```yaml
attribute: media_location
```

| Value | Description |
| ----- | ----------- |
| `none` | In the interface or location unknown |
| `content` | Main content (feature, episode, bonus material) |
| `intermission` | Intermission |
| `credits` | End credits |
| `disc_menu` | DVD/Blu-ray Disc Menu |

### video

You can use this information to trigger external scalers, video processors, display devices, and screen masks.

#### Attribute: video_mode

Provides information about the video output mode of the HDMI port. Changes whenever the video mode of the output changes.

```yaml
attribute: video_mode
```

| Value | Description |
| ----- | ----------- |
| `none` | none |
| `480i60_4:3` | 480i60 4:3 |
| `480i60_16:9` | 480i60 16:9 |
| `480p60_4:3` | 480p60 4:3 |
| `480p60_16:9` | 480p60 16:9 |
| `576i50_4:3` | 576i50 4:3 |
| `576i50_16:9` | 576i50 16:9 |
| `576p50_4:3` | 576p50 4:3 |
| `576p50_16:9` | 576p50 16:9 |
| `720p60_ntsc_hd` | 720p60 NTSC hd |
| `720p50_pal_hd` | 720p50 PAL hd |
| `1080i60_16:9` | 1080i60 16:9 |
| `1080i50_16:9` | 1080i50 16:9 |
| `1080p60_16:9` | 1080p60 16:9 |
| `1080p50_16:9` | 1080p50 16:9 |
| `1080p24_16:9` | 1080p24 16:9 |
| `480i60_64:27` | 480i60 64:27 |
| `576i50_64:27` | 576i50 64:27 |
| `1080i60_64:27` | 1080i60 64:27 |
| `1080i50_64:27` | 1080i50 64:27 |
| `1080p60_64:27` | 1080p60 64:27 |
| `1080p50_64:27` | 1080p50 64:27 |
| `1080p23976_64:27` | 1080p23976 64:27 |
| `1080p24_64:27` | 1080p24 64:27 |
| `3840x2160p23976_16:9` | 3840x2160p23976 16:9 |
| `3840x2160p23976_64:27` | 3840x2160p23976 64:27 |
| `3840x2160p30_16:9` | 3840x2160p30 16:9 |
| `3840x2160p30_64:27` | 3840x2160p30 64:27 |
| `3840x2160p60_16:9` | 3840x2160p60 16:9 |
| `3840x2160p60_64:27` | 3840x2160p60 64:27 |
| `3840x2160p25_16:9` | 3840x2160p25 16:9 |
| `3840x2160p25_64:27` | 3840x2160p25 64:27 |
| `3840x2160p50_16:9` | 3840x2160p50 16:9 |
| `3840x2160p50_64:27` | 3840x2160p50 64:27 |
| `3840x2160p24_16:9` | 3840x2160p24 16:9 |
| `3840x2160p24_64:27` | 3840x2160p24 64:27 |

#### Attribute: video_color_eotf

Provides the Electro-Optical Transfer Function standard of the currently playing media. Changes whenever the video mode of the output changes.

```yaml
attribute: video_color_eotf
```

| Value | Description |
| ----- | ----------- |
| `unknown` | unknown |
| `sdr` | SDR |
| `hdr` | HDR |
| `smtpest2084` | SMTPE ST 2084 |

#### Attribute: video_color_space

Provides the color space standard of the currently playing media. Changes whenever the video mode of the output changes.

```yaml
attribute: video_color_space
```

| Value | Description |
| ----- | ----------- |
| `default` | default |
| `rgb` | RGB |
| `bt601` | BT.601 |
| `bt709` | BT.709 |
| `bt2020` | BT.2020 |

#### Attribute: video_color_depth

Provides the number of bits used to define the color of each image pixel of the currently playing media. Changes whenever the video mode of the output changes.

```yaml
attribute: video_color_depth
```

| Value | Description |
| ----- | ----------- |
| `unknown` | unknown |
| `24bit` | 24 bits |
| `30bit` | 30 bits |
| `36bit` | 36 bits |

#### Attribute: video_color_sampling

Provides the chroma color sampling standard of the currently playing media. Changes whenever the video mode of the output changes.

```yaml
attribute: video_color_sampling
```

| Value | Description |
| ----- | ----------- |
| `none` | none |
| `rgb` | RGB  |
| `ycbcr422` | YCbCr 4:2:2 |
| `ycbcr444` | YCbCr 4:4:4 |
| `ycbcr420` | YCbCr 4:2:0 |

### screen_mask

Provides information about the aspect ratio and masking for the currently playing media. This message provides all information needed by masking controllers of varying
capabilities, some of which can be redundant depending on the masking controller. See the `GET_SCREEN_MASK` section of [Kaleidescape System Control Protocol Reference Manual](https://www.kaleidescape.com/wp-content/uploads/Kaleidescape-System-Control-Protocol-Reference-Manual.pdf) for more detail.

#### Attribute: screen_mask_ratio

Provides the current aspect ratio of the video content.

```yaml
attribute: screen_mask_ratio
```

| Value | Description |
| ----- | ----------- |
| `none` | none |
| `1.33` | 1.33 (4:3) aspect ratio  |
| `1.66` | 1.66 aspect ratio |
| `1.78` | 1.78 (16:9) aspect ratio |
| `1.85` | 1.85 aspect ratio |
| `2.35` | 2.35 aspect ratio |

#### Attribute: screen_mask_conservative_ratio

Provides the same values as the `screen_mask_ratio` field, but represents a more conservative estimate of the image aspect ratio.

```yaml
attribute: screen_mask_conservative_ratio
```

| Value | Description |
| ----- | ----------- |
| `none` | none |
| `1.33` | 1.33 (4:3) aspect ratio  |
| `1.66` | 1.66 aspect ratio |
| `1.78` | 1.78 (16:9) aspect ratio |
| `1.85` | 1.85 aspect ratio |
| `2.35` | 2.35 aspect ratio |

#### Attribute: screen_mask_top_trim_rel

#### Attribute: screen_mask_bottom_trim_rel

Provides the top and bottom trim values, relative to the aspect ratio specified by `screen_mask_ratio`.

The value of each is a signed number between -999 and +999, in tenths of a percent of the screen height. Positive values indicate adjustment towards the center of the screen, negative toward the edge. For example, +10 means adjust a mask inward by 1% of the screen height, and -5 means adjust the mask outward by 0.5% of the screen height.

```yaml
attribute: screen_mask_top_trim_rel
attribute: screen_mask_bottom_trim_rel
```

| Value | Description |
| ----- | ----------- |
| `<int between -999 and +999>` | Trim value in tenths of a percent |

#### Attribute: screen_mask_top_mask_abs

#### Attribute: screen_mask_bottom_mask_abs

Provides the position for the top and bottom masks in absolute terms, measured from the top and bottom of the screen, respectively.

Each is a number between 0 and 1000, in tenths of a percent of the screen height. For example, a top_mask_abs value of 200, means that the corresponding mask should be located 20% from the top of the screen.

```yaml
attribute: screen_mask_top_mask_abs
attribute: screen_mask_bottom_mask_abs
```

| Value | Description |
| ----- | ----------- |
| `<int between 0 and 1000>` | Position value in tenths of a percent |

### cinemascape

CinemaScape video processing improves the 2.35 home theater experience by eliminating the need for anamorphic lens movement or changing projector modes when viewing content with different aspect ratios. CinemaScape makes transitions between different types of content, as well as between content and the onscreen display, fast and seamless.

#### Attribute: cinemascape_mode

Provides information about the CinemaScape mode of the player. This information is useful for installations that can switch player video output from a 2:35 theater to another room with a non-CinemaScape friendly display.

```yaml
attribute: cinemascape_mode
```

| Value | Description |
| ----- | ----------- |
| `none` | Not in CinemaScape mode |
| `anamorphic` | CinemaScape 2.35 Anamorphic |
| `letterbox` | CinemaScape 2.35 Letterbox |
| `native` | CinemaScape Native 2.35 Display |

#### Attribute: cinemascape_mask

When in CinemaScape mode, provides information about the frame aspect ratio. Changes when the player aspect ratio changes, e.g., starting/ending movie playback and displaying the Kaleidescape user interface.

```yaml
attribute: cinemascape_mask
```

| Value | Description |
| ----- | ----------- |
| `133` | 1.33 (4:3) aspect ratio |
| `166` | 1.66 aspect ratio |
| `178` | 1.78 (16:9) aspect ratio |
| `185` | 1.85 aspect ratio |
| `237` | 2.37 aspect ratio |
| `240` | 2.40 aspect ratio |
