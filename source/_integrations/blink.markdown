---
title: Blink
description: Instructions for how to integrate Blink camera/security system within Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
  - Camera
  - Hub
  - Sensor
  - Switch
ha_release: '0.40'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fronzbot'
  - '@mkmer'
ha_domain: blink
ha_config_flow: true
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - camera
  - diagnostics
  - sensor
  - switch
ha_dhcp: true
ha_integration_type: integration
---

The **Blink** {% term integration %}  lets you view camera images and motion events from [Blink](https://blinkforhome.com/) camera and security systems.

{% important %}
This integration does NOT allow for live viewing of your Blink camera within Home Assistant.
{% endimportant %}

## Setup

You will need your Blink login information (username, which is usually your email address, and password) to use this module.

## Configuration

The preferred method for setting this up is by using the configuration flow. Go to the integrations page in your configuration and click on new integration -> Blink.  When you are prompted for your pin, there are (currently) two possibilities:

1. You are sent an email asking for you to allow Home Assistant to access Blink.  In this case, leave the pin field blank and hit `Submit`.

2. You are sent an email or SMS containing a 2FA pin.  In this case, please enter the pin and hit `Submit`.

Your integration will then set up.  Given that setup is asynchronous, you may see your sensors before they have finished extracting data from the Blink servers.  After a few minutes (at most) this information should populate.

Once Home Assistant starts and you authenticate access, the `blink` integration will create the following platforms (note: Blink Mini cameras do not currently support any of the sensors, nor the battery status binary sensor):

- An `alarm_control_panel` to arm/disarm the whole blink system (note, `alarm_arm_home` is not implemented and will not actually do anything, despite it being an option in the GUI).
- A `camera` for each camera linked to your Blink sync module.
- A `sensor` per camera for temperature and Wi-Fi strength.
- A `binary_sensor` motion detection, camera armed status, and battery status.
- A `switch` per camera to enable/disable motion detection

Since the cameras are battery operated, polling must be done with care so as to not drain the battery too quickly, or hammer Blink's servers with too many API requests.  If an alternate polling rate is desired, disable the "enable poll for updates" option in the Blink integration system options and poll with `homeassistant.update_entity` action. The cameras can be also manually updated via the `trigger_camera` action. As a note, all of the camera-specific sensors are only polled when a new image is requested from the camera. This means that relying on any of these sensors to provide timely and accurate data is not recommended.

Please note that each camera reports two different states: one as `sensor.blink_<camera_name>_status` and the other as `binary_sensor.blink_<camera_name>_motion_enabled`. The `motion_enabled` property reports if the `camera` is ready to detect motion **regardless if the system is actually armed**.

## Actions

Any sequential calls to {% term actions %} relating to blink should have a minimum of a 5 second delay in between them to prevent the calls from being throttled and ignored. The actions that act on a camera needs a target parameter.

### `blink.record`

Trigger a camera to record a new video clip.

### `blink.trigger_camera`

Trigger a camera to take a new still image.

### `blink.save_video`

Save the last recorded video of a camera to a local file. Note that in most cases, Home Assistant will need to know that the directory is writable via the `allowlist_external_dirs` in your {% term "`configuration.yaml`" %} file (see example below).

| Data attribute | Optional | Description            |
| ---------------------- | -------- | ---------------------- |
| `filename`             | no       | Location of save file. |

```yaml
homeassistant:
  allowlist_external_dirs:
    - '/tmp'
    - '/path/to/whitelist'
```
### `blink.save_recent_clips`

Save the recent video clips of a camera to a local file in the pattern `%Y%m%d_%H%M%S_{name}.mp4`. Note that in most cases, Home Assistant will need to know that the directory is writable via the `allowlist_external_dirs` in your {% term "`configuration.yaml`" %} file.

| Data attribute | Optional | Description             |
| ---------------------- | -------- | ----------------------- |
| `file_path`            | no       | Location of save files. |

### `blink.send_pin`

Send a new pin to blink.  Since Blink's 2FA implementation is new and changing, this is to allow the integration to continue to work with user intervention.  The intent is to handle all of this behind the scenes, but until the login implementation is settled this was added. To use it, perform the action with the pin you receive from Blink as the payload (for a simple "Allow this Device" email, you may keep the `pin` value empty).

| Data attribute | Optional | Description                  |
| ---------------------- | -------- | ---------------------------- |
| `config_entry_id`      | no       | Blink config to send pin to. |
| `pin`                  | no       | 2FA Pin received from blink. |

### Other actions

In addition to the actions mentioned above, there are generic `camera`, `alarm_control_panel`, and `homeassistant` actions available. The `camera.enable_motion_detection` and `camera.disable_motion_detection` actions allow for individual cameras to be enabled and disabled, respectively, within the Blink system. The `alarm_control_panel.alarm_arm_away` and `alarm_control_panel.alarm_disarm` actions allow for the whole system to be armed and disarmed, respectively. The `homeassistant.update_entity` action will force an update of the blink system. Blink Mini cameras linked to an existing sync module cannot be armed/disarmed individually via Home Assistant.

## Examples

The following are some examples showing how to correctly perform an action using Blink:

### Snap picture and save locally

This example script shows how to take a picture with your camera, named `My Camera` in your Blink app (this is **not necessarily** the friendly name in Home Assistant).  After snapping a picture, the image will then be saved to a local directory called `/tmp/my_image.jpg`.  Note that this example makes use of actions found in the [camera integration](/integrations/camera#action-snapshot)

```yaml
alias: "Blink Snap Picture"
sequence:
  - action: blink.trigger_camera
    target:
      entity_id: camera.blink_my_camera
  - action: camera.snapshot
    target:
      entity_id: camera.blink_my_camera
    data:
      filename: /tmp/my_image.jpg
```

### Arm Blink when away

This example automation will arm your blink sync module to detect motion on any of your blink cameras that have motion detection enabled.  By default, Blink enables motion detection on all cameras so, unless you've changed anything in your app, you're all set.  If you want to manually enable motion detection for individual cameras, you can utilize the [appropriate camera action](/integrations/camera#action-enable_motion_detection) but please note that motion will only be captured if the sync module is armed.

Here, this example assumes your blink module is named `My Sync Module` and that you have [device trackers](/integrations/device_tracker) set up for presence detection.

```yaml
- alias: "Arm Blink When Away"
  triggers:
    - trigger: state
      entity_id: all
      to: "not_home"
  actions:
    - action: alarm_control_panel.alarm_arm_away
      target:
        entity_id: alarm_control_panel.blink_my_sync_module
```

### Disarm Blink when home

Similar to the previous example, this automation will disarm blink when arriving home.

```yaml
- alias: "Disarm Blink When Home"
  triggers:
    - trigger: state
      entity_id: all
      to: "home"
  actions:
    - action: alarm_control_panel.alarm_disarm
      target:
        entity_id: alarm_control_panel.blink_my_sync_module
```

### Save most recent video locally when motion detected

When motion is detected, you can use the Blink Home Assistant integration to save the last recorded video locally, rather than relying on Blink's servers to save your data.

The following example assumes your camera's name (in the Blink app) is `My Camera` and your sync module name is `My Sync Module`.  The file will be saved to `/tmp/videos/blink_video_{YYYMMDD_HHmmSS}.mp4` where `{YYYYMMDD_HHmmSS}` will be a timestamp create via the use of [templating](/docs/configuration/templating/).

{% raw %}

```yaml
- alias: "Save Blink Video on Motion"
  triggers:
    - trigger: state
      entity_id: binary_sensor.blink_my_camera_motion_detected
      to: "on"
  actions:
    -  action: blink.save_video
       target:
         entity_id: camera.blink_my_camera
       data:
         filename: "/tmp/videos/blink_video_{{ now().strftime('%Y%m%d_%H%M%S') }}.mp4"
```

{% endraw %}

### Save all recent clips locally on a schedule

A list of all the recent video clips is updated at each refresh of the Blink system.
The video clips are available in a download list (per camera) for up to an hour,
and they can be downloaded at any time before the one-hour expiration time.
After a clip is downloaded it is removed from the list.

The following example demonstrates saving recent clips every three minutes.
It assumes your camera's name (in the Blink app) is `My Camera`.
The file will be saved to `/tmp/videos/YYYYMMDD_HHmmSS_MyCamera.mp4`.
The file name of the downloaded video file is not configurable.

```yaml
- alias: "Save Recent Clips from My Camera"
  triggers:
    - trigger: time_pattern
      minutes: /3
  actions:
    - action: blink.save_recent_clips
      target:
        entity_id: camera.my_camera
      data:
        file_path: /tmp/videos
```
