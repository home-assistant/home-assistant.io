---
title: NetWave
description: Instructions on how to integrate a NetWave camera into Home Assistant.
ha_release: 0.111
ha_category:
  - Camera
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@TheLogicMaster'
ha_domain: netwave
---

The `netwave` platform allows you to watch the live stream of and control your NetWave/Airsight IP camera in Home Assistant. 
This has been tested with an Airsight XC36A camera, but should work with other NetWave platform devices.


## Configuration via the frontend

In the settings go to **Integrations**, click on the **+** sign to add an integration and click on **NetWave**.
After completing the configuration flow, the NetWave integration will be available.

## Configuration via the configuration file

To enable your NetWave IP camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: netwave
    address: http://ADDRESS:PORT
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
address:
  description: The full address your camera.
  required: true
  type: string
username:
  description: The username for accessing your camera.
  required: false
  type: string
  default: admin
password:
  description: The password for accessing your camera.
  required: false
  type: string
  default: admin
timeout:
  description: The timeout for accessing your camera.
  required: false
  type: integer
  default: 5
name:
  description: This parameter allows you to override the name of your camera.
  required: false
  type: string
  default: NetWave Camera
framerate:
  description: The framerate to stream video at.
  required: false
  type: integer
  default: 2
move_duration:
  description: The default duration to move the camera for.
  required: false
  type: float
  default: 0
vertical_mirror:
  description: Vertically flip camera video.
  required: false
  type: boolean
  default: false
horizontal_mirror:
  description: Horizontally flip camera video.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

### Service `netwave.send_command`

Send a command to your camera.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of cameras. |
| `command` | 	Command to send. Allowed values: `stop_movement`, `move_up`, `move_down`, `move_left`, `move_right`, `move_up_left`, `move_up_right`, `move_down_left`, `move_down_right`, `move_center`, `patrol_vertical`, `stop_patrol_vertical`, `patrol_horizontal`, `stop_patrol_horizontal`, `turn_io_on`, `turn_io_off`, `set_preset`, `recall_preset`, `restart_camera`, `factory_reset_camera` |
| `parameter` | (Optional) Parameter for command (Only used for preset position commands) (1-15) Default: 1 |

### Service `netwave.send_parameter`

Send a parameter to your camera.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of cameras. |
| `command` | 	Parameter to send. Allowed values: `mode`, `brightness`, `contrast`, `resolution`, `orientation`, `mirror_vertical`, `mirror_horizontal` |
| `value` | Value to set. |

### Service `netwave.refresh_info`

Refresh camera info for your camera.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of cameras. |

### Service `netwave.refresh_complete`

Refresh info for all cameras

## Example card with controls

<p class='img'>
  <img src='/images/integrations/netwave/example-card.png' alt='Screenshot showing a NetWave camera using a picture-elements with PTZ controls.'>
  Example showing a NetWave camera with controls for movement.
</p>

Using the following card code you can achieve a card displaying the live video feed from a NetWave camera with controls for moving and otherwise controlling the camera.

```yaml
camera_image: camera.netwave_camera
camera_view: live
elements:
  - icon: 'mdi:arrow-up'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      bottom: 50px
      right: 25px
    tap_action:
      action: call-service
      service: netwave.send_command
      service_data:
        command: move_up
        entity_id: camera.netwave_camera
    title: Tilt camera up
    type: icon
  - icon: 'mdi:stop'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      bottom: 25px
      right: 25px
    tap_action:
      action: call-service
      service: netwave.send_command
      service_data:
        command: stop_movement
        entity_id: camera.netwave_camera
    title: Stop movement
    type: icon
  - icon: 'mdi:arrow-down'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      bottom: 0px
      right: 25px
    tap_action:
      action: call-service
      service: netwave.send_command
      service_data:
        command: move_down
        entity_id: camera.netwave_camera
    title: Tilt camera down
    type: icon
  - icon: 'mdi:arrow-left'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      bottom: 25px
      right: 50px
    tap_action:
      action: call-service
      service: netwave.send_command
      service_data:
        command: move_left
        entity_id: camera.netwave_camera
    title: Pan camera left
    type: icon
  - icon: 'mdi:arrow-right'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      bottom: 25px
      right: 0px
    tap_action:
      action: call-service
      service: netwave.send_command
      service_data:
        command: move_right
        entity_id: camera.netwave_camera
    title: Pan camera right
    type: icon
  - icon: 'mdi:arrow-top-left'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      bottom: 50px
      right: 50px
    tap_action:
      action: call-service
      service: netwave.send_command
      service_data:
        command: move_up_left
        entity_id: camera.netwave_camera
    title: Move camera up-left
    type: icon
  - icon: 'mdi:arrow-top-right'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      bottom: 50px
      right: 0px
    tap_action:
      action: call-service
      service: netwave.send_command
      service_data:
        command: move_up_right
        entity_id: camera.netwave_camera
    title: Move camera up-right
    type: icon
  - icon: 'mdi:arrow-bottom-left'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      bottom: 0px
      right: 50px
    tap_action:
      action: call-service
      service: netwave.send_command
      service_data:
        command: move_down_left
        entity_id: camera.netwave_camera
    title: Move camera down-left
    type: icon
  - icon: 'mdi:arrow-bottom-right'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      bottom: 0px
      right: 0px
    tap_action:
      action: call-service
      service: netwave.send_command
      service_data:
        command: move_down_right
        entity_id: camera.netwave_camera
    title: Move camera down-right
    type: icon
  - icon: 'mdi:restart'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      right: 0px
      top: 25px
    tap_action:
      action: call-service
      service: netwave.send_command
      service_data:
        command: restart_camera
        entity_id: camera.netwave_camera
    title: Restart camera
    type: icon
  - icon: 'mdi:refresh'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      bottom: 25px
      right: 80px
    tap_action:
      action: call-service
      service: netwave.send_command
      service_data:
        command: move_center
        entity_id: camera.netwave_camera
    title: Auto-center camera
    type: icon
  - icon: 'mdi:content-save'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      left: 25px
      top: 25px
    tap_action:
      action: call-service
      service: netwave.send_command
      service_data:
        command: set_preset
        entity_id: camera.netwave_camera
        parameter: 1
    title: Set preset position 1
    type: icon
  - icon: 'mdi:download'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      left: 50px
      top: 25px
    tap_action:
      action: call-service
      service: netwave.send_command
      service_data:
        command: recall_preset
        entity_id: camera.netwave_camera
        parameter: 1
    title: Recall preset position 1
    type: icon
  - icon: 'mdi:power-on'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      bottom: 0px
      left: 25px
    tap_action:
      action: call-service
      service: netwave.send_command
      service_data:
        command: turn_io_on
        entity_id: camera.netwave_camera
    title: Turn IO on
    type: icon
  - icon: 'mdi:power-off'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      bottom: 0px
      left: 50px
    tap_action:
      action: call-service
      service: netwave.send_command
      service_data:
        command: turn_io_off
        entity_id: camera.netwave_camera
    title: Turn IO off
    type: icon
  - icon: 'mdi:pan-horizontal'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      bottom: 30px
      left: 25px
    tap_action:
      action: call-service
      service: netwave.send_command
      service_data:
        command: patrol_horizontal
        entity_id: camera.netwave_camera
    title: Horizontal patrol
    type: icon
  - icon: 'mdi:dots-horizontal'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      bottom: 30px
      left: 50px
    tap_action:
      action: call-service
      service: netwave.send_command
      service_data:
        command: stop_patrol_horizontal
        entity_id: camera.netwave_camera
    title: Stop horizontal patrol
    type: icon
  - icon: 'mdi:pan-vertical'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      bottom: 55px
      left: 25px
    tap_action:
      action: call-service
      service: netwave.send_command
      service_data:
        command: patrol_vertical
        entity_id: camera.netwave_camera
    title: Vertical patrol
    type: icon
  - icon: 'mdi:dots-vertical'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      bottom: 55px
      left: 50px
    tap_action:
      action: call-service
      service: netwave.send_command
      service_data:
        command: stop_patrol_vertical
        entity_id: camera.netwave_camera
    title: Stop vertical patrol
    type: icon
entity: camera.netwave_camera
type: picture-elements
```

## Camera exposed attributes

NetWave cameras will expose the following details.

| Attribute     | Description                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------- |
| `brightness`  | The brightness integer (0-15).                                                              |
| `contrast`    | The contrast integer (0-6).                                                                 |
| `resolution`  | The resolution integer: 160x120(2), 320x240(8), or 640x480(32)                              |
| `mode`        | The camera video mode integer: 0(50Hz), 1(60Hz), or 2(Outdoor)                              |
| `orientation` | The two bit integer video orientation value: 0(normal), 1(vertical), 2(horizontal), 3(both) |

## Extracting camera attributes

In order to get the video settings from a camera, you'll have to create a [template sensor](/integrations/template/).
In the example below, change all of the `my_camera`'s to match your device's entity ID.

{% raw %}
```yaml
sensor:
  - platform: template
    sensors:
      my_camera_brightness:
        friendly_name_template: "{{ states.camera.my_camera.name}} Brightness"
        value_template: '{{ states.camera.my_camera.attributes["brightness"] | integer }}'
      my_camera_contrast:
        friendly_name_template: "{{ states.camera.my_camera.name}} Contrast"
        value_template: '{{ states.camera.my_camera.attributes["contrast"] | integer }}'
      my_camera_resolution:
        friendly_name_template: "{{ states.camera.my_camera.name}} Resolution"
        value_template: '{{ states.camera.my_camera.attributes["resolution"] | integer }}'
      my_camera_video_mode:
        friendly_name_template: "{{ states.camera.my_camera.name}} Video Mode"
        value_template: '{{ states.camera.my_camera.attributes["mode"] | integer }}'
      my_camera_orientation:
        friendly_name_template: "{{ states.camera.my_camera.name}} Orientation"
        value_template: '{{ states.camera.my_camera.attributes["orientation"] | integer }}'
```
{% endraw %}
