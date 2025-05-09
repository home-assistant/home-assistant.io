---
title: motionEye
description: Instructions on how to integrate motionEye into Home Assistant.
ha_category:
  - Camera
  - Media source
ha_release: 2021.5
ha_iot_class: Local Polling
ha_domain: motioneye
ha_codeowners:
  - '@dermotduffy'
ha_config_flow: true
ha_platforms:
  - camera
  - sensor
  - switch
ha_integration_type: integration
---

The motionEye integration allows you to integrate your
[motionEye](https://github.com/motioneye-project/motioneye) server into Home Assistant. motionEye
is an open source web-frontend for the motion daemon, used to centralize the management
and visualization of multiple types of cameras.

{% include integrations/config_flow.md %}

{% configuration_basic %}
url:
  description: The URL of the motionEye server itself -- **not** the URL for the camera stream(s) that it makes available.
admin_username:
  description: The username of the motionEye administrative account, used for changing camera settings.
admin_password:
  description: The password of the motionEye administrative account.
surveillance_username:
  description: The username of the motionEye surveillance user, used to authenticate video streams.
surveillance_password:
  description: The password of the motionEye surveillance account.
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Configure motionEye webhooks to report events to Home Assistant:
  description: Whether or not motionEye webhooks should be configured to callback into Home Assistant. If this option is disabled, no motion detected or file stored events will be generated unless the webhooks are manually configured.
Overwrite unrecognized webhooks:
  description: Whether or not to overwrite webhooks that are already configured and are not recognized as belonging to this integration (webhooks are deemed to belong to this integration if they contain `src=hass-motioneye` in the query string).
Stream URL template:
  description: A [jinja2](https://jinja.palletsprojects.com/) template that is used to override the standard MJPEG stream URL (e.g. for use with reverse proxies). See [Camera MJPEG Streams](#streams) below. This option is only shown to users who have [advanced mode](https://www.home-assistant.io/blog/2019/07/17/release-96/#advanced-mode) enabled.
{% endconfiguration_basic %}

## Usage

### Entities

| Platform | Description                                                                                                                                                                                                                                   |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `camera` | An MJPEG camera that shows the motionEye video stream.                                                                                                                                                                                        |
| `switch` | Switch entities to enable/disable motion detection, text overlay, video streaming, still image capture, movie capture and upload enabled.                                                                                                     |
| `sensor` | An "action sensor" that shows the number of configured [actions](https://github.com/ccrisan/motioneye/wiki/Action-Buttons) for this device. The names of the available actions are viewable in the `actions`  attribute of the sensor entity. |

**Note**:
  - If the video streaming switch is turned off, the camera entity, and actions that operate on that camera, will become unavailable. The rest of the integration will continue to function.
  - As cameras are added or removed to motionEye, devices/entities are automatically added or removed from Home Assistant.


<a name="streams"></a>

#### Camera MJPEG Streams

In order for the MJPEG streams to function they need to be accessible at
`<motioneyehost>:<streaming port>`, i.e. Home Assistant will directly connect to the streaming port
that is configured in the `motionEye` UI (under `Video Streaming`) on the host that the
motionEye integration is configured to use.

Example:
- If this integration is configured to talk to motionEye at `http://motioneye:8765`, and
  a camera is configured to stream on port `8081` -- Home Assistant needs to
  be able to communicate to `motioneye` port `8081`.

##### Stream URL Template

For advanced usecases, this behavior can be changed with the [Stream URL
template](#options) option. When set, this string will override the default
stream address that is derived from the default behavior described above. This
option supports [jinja2 templates](https://jinja.palletsprojects.com/) and has
the `camera` dict variables from motionEye
([example](https://github.com/dermotduffy/hass-motioneye/blob/main/tests/__init__.py#L22))
available for the template. Note that no Home Assistant state is available to
the template, only the camera dict from motionEye.

This is very useful when motionEye is behind a custom configured reverse proxy,
and/or when the stream ports are otherwise not accessible to Home Assistant
(e.g. firewall rules).

###### Stream URL Template Examples

The below are useful examples of how this option may be set.

**Use the camera name in the stream URL**:

{% raw %}
http://motioneye/video/{{ name }}
{% endraw %}

**Use the camera name in the stream URL, converting it to lowercase first**:

{% raw %}
http://motioneye/video/{{ name|lower }}
{% endraw %}

**Use the camera id in the stream URL**:

{% raw %}
http://motioneye/video/{{ id }}
{% endraw %}

<a name="events"></a>

### Events

On receipt of a motion or file stored callbacks, events will be fired which can be used
in automations (etc).

#### Data in events

- The event data includes the Home Assistant `device_id` for this motionEye
  camera device and the Home Assistant device `name`.
- Event data also includes as many [Motion Conversion
  Specifiers](https://motion-project.github.io/motion_config.html#conversion_specifiers)
  as make sense for that event type.
- Any additional `&key=value` pairs added manually to the motionEye webhook
  (in the motionEye UI) will automatically propagate to the event data. If
  you manually tweak the webhook, remove the `src=hass-motioneye` parameter
  or the webhook will be overwritten.
- For file storage events, the integration will automatically add
  `media_content_id` (an identifier that can be used to play the media in a
  Home Assistant media player) and `file_url` (a raw URL to the media). See
  [example automation](#automation-movies) below for an illustration of how
  this can be used.
- `file_type` will be less than 8 if the media stored is an image, otherwise,
  it is a movie/video. See [the motion
  source](https://github.com/Motion-Project/motion/blob/master/src/motion.h#L177)
  for more details.


#### Example motion detected event

```json
{
    "event_type": "motioneye.motion_detected",
    "data": {
        "device_id": "662aa1c77657dbc4af836abcdf80000a",
        "name": "Office",
        "camera_id": "2",
        "changed_pixels": "99354",
        "despeckle_labels": "55",
        "event": "02",
        "fps": "24",
        "frame_number": "10",
        "height": "1080",
        "host": "6aa7a495490c",
        "motion_center_x": "314",
        "motion_center_y": "565",
        "motion_height": "730",
        "motion_version": "4.2.2",
        "motion_width": "252",
        "noise_level": "12",
        "threshold": "20736",
        "width": "1920"
    },
    "origin": "LOCAL",
    "time_fired": "2021-04-11T04:25:41.106964+00:00",
    "context": {
        "id": "0320bb897aa3656dbb02affddce322f2",
        "parent_id": null,
        "user_id": null
    }
}
```

#### Example file stored event

```json
{
    "event_type": "motioneye.file_stored",
    "data": {
        "device_id": "662aa1c77657dbc4af836abcdf80000a",
        "name": "Office",
        "camera_id": "2",
        "event": "03",
        "file_path": "/var/lib/motioneye/Camera2/2021-04-10/21-27-53.mp4",
        "file_type": "8",
        "media_content_id": "media-source://motioneye/74565ad414754616000674c87bdc876c#662aa1c77657dbc4af836abcdf80000a#movies#/2021-04-10/21-27-53.mp4",
        "file_url": "https://cctv/movie/2/playback/2021-04-10/21-27-53.mp4?_username=admin&_signature=bc4565fe414754616000674c87bdcacbd",
        "fps": "25",
        "frame_number": "21",
        "height": "1080",
        "host": "6aa7a495490c",
        "motion_version": "4.2.2",
        "noise_level": "12",
        "threshold": "20736",
        "width": "1920"
    },
    "origin": "LOCAL",
    "time_fired": "2021-04-11T04:27:54.528671+00:00",
    "context": {
        "id": "0358cac9457e3e3a2039da8c998e4c25",
        "parent_id": null,
        "user_id": null
    }
}
```

## Actions

All actions accept either an `entity_id` or `device_id`.

### motioneye.snapshot

Trigger a camera snapshot (e.g. saving an image to disk).

Parameters:

| Parameter               | Description                                           |
| ----------------------- | ----------------------------------------------------- |
| `entity_id` `device_id` | An entity id or device id to trigger the snapshot on. |

Note: This is a thin wrapper on the [`motioneye.action` call](#action).

<a name="action"></a>

### motioneye.action

Trigger a motionEye action (see [motionEye Action Buttons](https://github.com/ccrisan/motioneye/wiki/Action-Buttons)).

Parameters:

| Parameter               | Description                                                                                                                                                                                                                                              |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id` `device_id` | An entity id or device id to trigger the action on.                                                                                                                                                                                                      |
| `action`                | A string representing the motionEye action to trigger. One of `snapshot`, `lock`, `unlock`, `light_on`, `light_off`, `alarm_on`, `alarm_off`, `up`, `right`, `down`, `left`, `zoom_in`, `zoom_out`, `preset1`-`preset9`, `record_start` or `record_stop` |

**Note**: `record_start` and `record_stop` action are only partially implemented in motionEye itself and thus do not function as would be expected at this time ([relevant code](https://github.com/ccrisan/motioneye/blob/dev/motioneye/handlers.py#L1741)).

### motioneye.set_text_overlay

Set the text overlay for a camera.

Parameters:

| Parameter                              | Description                                                                                                                                                                 |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id` `device_id`                | An entity id or device id to set the text overlay on.                                                                                                                       |
| `left_text` `right_text`               | One of `timestamp`, `camera-name`, `custom-text` or `disabled` to show a timestamp, the  name of the camera, custom text or nothing at all, on the left or right-hand side. |
| `custom_left_text` `custom_right_text` | Custom text to show on the left or right, if the `custom-text` value is selected.                                                                                           |

**Note**:

- Calling this action triggers a reset of the motionEye cameras which will pause the
  stream / recordings / motion detection (etc).
- Ensure the `Text Overlay` switch is turned on to actually display the configured text overlays.

#### Example:

```yaml
action: motioneye.set_text_overlay
data:
  left_text: timestamp
  right_text: custom-text
  custom_right_text: "Alarm armed"
target:
  entity_id: camera.office
```

## Media Browsing

Saved motionEye media (movies and images) can be natively browsed from the Home Assistant "Media
Browser".

### Manually Configured Root Directories

Whilst this integration allows drilling down into the media for each camera separately,
underneath motionEye is using the directory structure to associate media items to each
individual camera. Thus if multiple cameras are manually configured to share the same
root directory, motionEye will return the _combination_ of the media items when any one
of the "overlapping" cameras are queried. Use different root directories (in motionEye:
`File Storage -> Root Directory`) to ensure motionEye (and thus this integration) will
correctly associate media with the camera from which that media was captured.

## Example Dashboard Card

A dashboard card with icons that will call the `action` action to send action commands to motionEye.

```yaml
- type: picture-glance
  title: "Living Room"
  camera_image: camera.living_room
  camera_view: live
  entities:
      - entity: camera.living_room
      - entity: camera.living_room
        icon: "mdi:arrow-left"
        tap_action:
          action: perform-action
          perform_action: motioneye.action
          data:
            action: left
            entity_id: camera.living_room
      - entity: camera.living_room
        icon: "mdi:arrow-right"
        tap_action:
          action: perform-action
          perform_action: motioneye.action
          data:
            action: right
            entity_id: camera.living_room
      - entity: camera.living_room
        icon: "mdi:arrow-up"
        tap_action:
          action: perform-action
          perform_action: motioneye.action
          data:
            action: up
            entity_id: camera.living_room
      - entity: camera.living_room
        icon: "mdi:arrow-down"
        tap_action:
          action: perform-action
          perform_action: motioneye.action
          data:
            action: down
            entity_id: camera.living_room
```

## Example Automations

### Set text overlay when alarm is armed

A simple automation to set text overlay indicating the alarm armed status. Text overlay
must be switched on for this automation to work (controllable via `switch.<name>_text_overlay`).

```yaml
- alias: "Set camera text overlay to armed"
  triggers:
    - trigger: state
      entity_id: alarm_control_panel.home_alarm
      to: "armed_away"
  actions:
    - action: motioneye.set_text_overlay
      target:
        entity_id: camera.living_room
      data:
        left_text: custom-text
        custom_left_text: "Alarm is ARMED"

- alias: "Set camera text overlay to disarmed"
  triggers:
    - trigger: state
      entity_id: alarm_control_panel.home_alarm
      to: "disarmed"
  actions:
    - action: motioneye.set_text_overlay
      target:
        entity_id: camera.living_room
      data:
        left_text: custom-text
        custom_left_text: "Alarm is disarmed"
```

<a name="automation-movies"></a>

### Automatically play stored movies

An automation to cast stored movie clips to a TV as they arrive.

```yaml
- alias: "Cast motionEye movie clips"
  triggers:
    - trigger: event
      event_type: motioneye.file_stored
      event_data:
        # Only cast video.
        file_type: "8"
  actions:
    - action: media_player.play_media
      target:
        entity_id: media_player.kitchen_tv
      data:
        media_content_id: "{{ trigger.event.data.media_content_id }}"
        media_content_type: video
```

## Debugging

### Debug Logging

To enable debug logging for both the integration and the underlying client library,
enable the following in your {% term "`configuration.yaml`" %} and then restart:

```yaml
logger:
  default: warning
  logs:
    motioneye_client: debug
    homeassistant.components.motioneye: debug
```
