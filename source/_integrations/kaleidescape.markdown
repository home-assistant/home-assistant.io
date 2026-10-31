---
description: Instructions on how to integrate Kaleidescape into Home Assistant.
ha_release: '2022.4'
ha_domain: kaleidescape
---

The **Kaleidescape** {% term integration %} allows for the automation of [Kaleidescape](https://www.kaleidescape.com/) movie players.

Ideas for automation include:

- Playing and pausing a movie sets lighting scenes.
- The start of movie credits turns up the lights.
- A change in aspect ratio controls a projection masking system.
- A change in video resolution controls a lens system or video scaler.

## Supported Models

This integration is intended for the automation of Kaleidescape players with a movie zone. This includes all Strato and Premier players. Strato players support auto-discovery in Home Assistant. Premier players must be added manually by adding an instance of this integration and specifying the IP address of the player.

{% include integrations/config_flow.md %}

## Media player

The Kaleidescape media player platform will create a [media player](/integrations/media_player/) entity for the device. This entity will display the currently playing media and playback controls.

## Remote

The Kaleidescape remote platform creates a [remote](/integrations/remote/) entity for the device. Use it with the [**Send remote command**](/actions/remote.send_command/) action to send the following commands.

Navigation:

- `up`, `down`, `left`, `right`: Move the highlight on the onscreen display.
- `select`: Select the highlighted item.
- `cancel`: Go back by closing the current page, dialog, or text entry. During movie playback, this stops the movie.
- `menu_toggle`: Show or hide the Kaleidescape menu. A playing movie keeps playing behind the menu.

Playback:

- `play`: Start playback. After scanning, this returns to normal speed.
- `pause`: Pause playback, or resume it if it is already paused.
- `stop`: Stop the movie. The player remembers your place so you can resume it later.
- `next`: Skip to the next chapter.
- `previous`: Go back to the start of the current chapter. Send it twice to go to the previous chapter.
- `replay`: Skip back 10 seconds.
- `scan_forward`, `scan_reverse`: Fast-forward or rewind. Each repeat cycles through 2×, 4×, and 8× speed. Send `play` to return to normal speed.
- `intermission_toggle`: Show or hide the intermission screen. Showing it pauses the movie, and the **Media location** sensor changes to `intermission`.
- `status_and_settings`: Show or hide the movie overlay during playback. Use `left` and `right` to move between its pages, such as audio and subtitles. When no movie is playing, this opens the System Status view.

Movie views:

- `go_movies`: Show a movie view. If a movie view is already showing, switch to the next one.
- `go_movie_list`: Show the Movie List view.
- `go_movie_covers`: Show the Movie Covers view.
- `go_movie_collections`: Show the Movie Collections view.

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

## Sensor

The Kaleidescape sensor platform will create multiple [Sensor](/integrations/sensor/) entities for the device. The follow sensors are provided:

### Media Location

The location in the current movie.

- none
- content
- intermission
- credits
- disc_menu

### Play Status

The play status of the current movie.

- none
- paused
- playing
- forward
- reverse

### Play Speed

The playback speed of the current movie. An integer between 1 (normal) and 3 (fast).

### Video Mode

The video mode of the current movie.

- none
- 480i60_4:3
- 480i60_16:9
- 480p60_4:3
- 480p60_16:9
- 576i50_4:3
- 576i50_16:9
- 576p50_4:3
- 576p50_16:9
- 720p60_ntsc_hd
- 720p50_pal_hd
- 1080i60_16:9
- 1080i50_16:9
- 1080p60_16:9
- 1080p50_16:9
- 1080p24_16:9
- 480i60_64:27
- 576i50_64:27
- 1080i60_64:27
- 1080i50_64:27
- 1080p60_64:27
- 1080p50_64:27
- 1080p23976_64:27
- 1080p24_64:27
- 3840x2160p23976_16:9
- 3840x2160p23976_64:27
- 3840x2160p30_16:9
- 3840x2160p30_64:27
- 3840x2160p60_16:9
- 3840x2160p60_64:27
- 3840x2160p25_16:9
- 3840x2160p25_64:27
- 3840x2160p50_16:9
- 3840x2160p50_64:27
- 3840x2160p24_16:9
- 3840x2160p24_64:27

### Video Color EOTF

The Electro-Optical Transfer Function standard of the current movie.

- unknown
- sdr
- hdr
- smtpest2084

### Video Color Space

The color space standard of the current movie.

- default
- rgb
- bt601
- bt709
- bt2020

### Video Color Depth

The color depth standard of the current movie.

- unknown
- 24bit
- 30bit
- 36bit

### Video Color Sampling

The chroma color sampling standard of the current movie.

- none
- rgb
- ycbcr422
- ycbcr444
- ycbcr420

### Screen Mask Ratio

The actual aspect ratio of the current movie.

- none
- 1.33
- 1.66
- 1.78
- 1.85
- 2.35

### Screen Mask Top Trim Rel

The top trim value, relative to the current Screen Mask Ratio. A percentage between -100% and +100%.

### Screen Mask Bottom Trim Rel

The bottom trim value, relative to the current Screen Mask Ratio. A percentage between -100% and +100%.

### Screen Mask Conservative Ratio

Has the same possible values as the Screen Mask Ratio, but represents a more conservative estimate of the image aspect ratio.

### Screen Mask Top Mask Abs

The position for the top mask in absolute terms, measured from the top of the screen. A percentage between -100% and +100%.

### Screen Mask Bottom Mask Abs

The position for the bottom mask in absolute terms, measured from the bottom of the screen. A percentage between -100% and +100%.

### Cinemascape Mask

The Cinemascape frame aspect ratio of the current movie.

- 0
- 133
- 166
- 178
- 237
- 240

### Cinemascape Mode

The Cinemascape mode of the current movie.

- none
- anamorphic
- letterbox
- native

Additional details about the values provided by the sensors can be found in Kaleidescape's [Control Protocol Reference Manual](https://www.kaleidescape.com/wp-content/uploads/Kaleidescape-System-Control-Protocol-Reference-Manual.pdf).

A typical automation might look like the example below, which turns up the lights when the _media_location_ sensor leaves the _content_ state.

```yaml
- alias: "Kaleidescape theater lights up"
  triggers:
    - trigger: state
      entity_id: sensor.kaleidescape_theater_media_location
      from: content
  actions:
    - action: scene.turn_on
      target:
        entity_id: scene.theater_lights
```
