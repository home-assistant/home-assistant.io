---
layout: page
title: "Blink"
description: "Instructions for how to integrate Blink camera/security system within Home Assistant."
date: 2017-03-05 22:13
sidebar: true
comments: false
sharing: true
footer: true
logo: blink.png
ha_category: Hub
ha_release: "0.40"
ha_iot_class: "Cloud Polling"
---

The `blink` component lets you view camera images and motion events from [Blink](http://blinkforhome.com) camera and security systems.

## {% linkable_title Setup %}

You will need your Blink login information (username, which is usually your email address, and password) to use this module.

## {% linkable_title Configuration %}

To enable devices linked in your [Blink](https://blinkforhome.com) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
blink:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The username for accessing your Blink account.
  required: true
  type: string
password:
  description: The password for accessing your Blink account.
  required: true
  type: string
scan_interval:
  description: How frequently to query for new data. Defaults to 60 seconds.
  required: false
  type: integer
binary_sensors:
  description: Binary sensor configuration options.
  required: false
  type: map
  keys:
   monitored_conditions:
     description: The conditions to create sensors from.
     required: false
     type: list
     default: all (`motion_enabled`, `motion_detected`)
sensors:
  description: Sensor configuration options.
  required: false
  type: map
  keys:
    monitored_conditions:
      description: The conditions to create sensors from.
      required: false
      type: list
      default: all (`battery`, `temperature`, `wifi_strength`)
{% endconfiguration %}

Once Home Assistant starts, the `blink` component will create the following platforms:

- An `alarm_control_panel` to arm/disarm the whole blink system (note, `alarm_arm_home` is not implemented and will not actually do anything, despite it being an option in the GUI).
- A `camera` for each camera linked to your Blink sync module.
- A `sensor` per camera for every item listed in `monitored_conditions` (if no items specified in your `configuration.yaml`, all of them will be added by default).
- A `binary_sensor` for each item listed in `monitored_conditions` (if no items specified in your `configuration.yaml`, all of them will be added by default).

Since the cameras are battery operated, setting the `scan_interval` must be done with care so as to not drain the battery too quickly, or hammer Blink's servers with too many API requests.  The cameras can be manually updated via the `trigger_camera` service which will ignore the throttling caused by `scan_interval`.  As a note, all of the camera-specific sensors are only polled when a new image is requested from the camera. This means that relying on any of these sensors to provide timely and accurate data is not recommended.

Please note that each camera reports two different states: one as `sensor.blink_<camera_name>_status` and the other as `binary_sensor.blink_<camera_name>_motion_enabled`. The `motion_enabled` property reports if the `camera` is ready to detect motion *regardless if the system is actually armed**.

Below is an example showing every possible entry:

```yaml
# Example configuration.yaml entry
blink:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  scan_interval: 60
  binary_sensors:
    monitored_conditions:
      - motion_enabled
      - motion_detected
  sensors:
    monitored_conditions:
      - battery
      - temperature
      - wifi_strength
```

## {% linkable_title Services %}

### {% linkable_title `blink.blink_update` %}

Force a refresh of the Blink system.

### {% linkable_title `blink.trigger_camera` %}

Trigger a camera to take a new still image.

| Service Data Attribute | Optional | Description                            |
|------------------------|----------|----------------------------------------|
| `name`                 |     no   | Name of camera to take new image with. |

### {% linkable_title `blink.save_video` %}

Save the last recorded video of a camera to a local file. Note that in most cases, Home Assistant will need to know that the directory is writable via the `whitelist_external_dirs` in your `configuration.yaml` file (see example below).

| Service Data Attribute | Optional | Description                              |
|------------------------|----------|------------------------------------------|
| `name`                 |    no    | Name of camera containing video to save. |
| `filename`             |    no    | Location of save file.                   |


```yaml
homeassistant:
    ...
    whitelist_external_dirs:
        - '/tmp'
        - '/path/to/whitelist'
```

### {% linkable_title Other Services %}

In addition to the services mentioned above, there are generic `camera` and `alarm_control_panel` services available for use as well. The `camera.enable_motion_detection` and `camera.disable_motion_detection` services allow for individual cameras to be enabled and disabled, respectively, within the Blink system. The `alarm_control_panel.alarm_arm_away` and `alarm_control_panel.alarm_disarm` services allow for the whole system to be armed and disarmed, respectively.
