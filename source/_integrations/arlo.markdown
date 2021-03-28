---
title: Arlo
description: Instructions on how to integrate your Netgear Arlo cameras within Home Assistant.
ha_category:
  - Hub
  - Alarm
  - Camera
  - Sensor
ha_release: 0.46
ha_iot_class: Cloud Polling
ha_domain: arlo
ha_platforms:
  - alarm_control_panel
  - camera
  - sensor
---

The `arlo` implementation allows you to integrate your [Arlo](https://arlo.netgear.com/) devices in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Alarm](#alarm)
- [Camera](#camera)
- [Sensor](#sensor)

## Configuration

To enable device linked in your [Arlo](https://arlo.netgear.com/) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
arlo:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The username for accessing your Arlo account.
  required: true
  type: string
password:
  description: The password for accessing your Arlo account.
  required: true
  type: string
scan_interval:
  description: How frequently to query for new data. Defaults to 60 seconds.
  required: false
  type: integer
{% endconfiguration %}

It is recommended to create a dedicated user on Arlo website to be used within Home Assistant and then share your Arlo cameras.

Finish its configuration by visiting the [Arlo sensor page](/integrations/arlo#sensor) or [Arlo camera page](/integrations/arlo#camera) or [Arlo control panel page](/integrations/arlo). Arlo also has a service call `arlo.update` that can be manually called to force an update prior to the regular scheduled interval.

The Arlo integration also provides a camera service to enable/disable the motion detection sensor. The example below enables the motion detection every time the Home Assistant service starts.

```yaml
#automation.yaml
- alias: "Enable Arlo upon HA start'"
  initial_state: "on"
  trigger:
    platform: homeassistant
    event: start
  action:
    service: camera.enable_motion_detection
    target:
      entity_id: camera.arlo_frontdoor
```

## Alarm

### Configuration

Once you have enabled the [Arlo component](/integrations/arlo), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: arlo
```

{% configuration %}
home_mode_name:
  description: "Arlo base station does not have a built-in home mode. You can map one of your custom modes to Home Assistant's home mode by setting the name of the custom mode in this configuration variable. The name of the custom mode should match exactly as you set it up in the Arlo app."
  required: false
  type: string
away_mode_name:
  description: "Arlo base station does not have a built-in away mode. You can map one of your custom modes to Home Assistant's away mode by setting the name of the custom mode in this configuration variable. The name of the custom mode should match eactly as you set it up in the Arlo app."
  required: false
  type: string
  default: "`Armed` mode in Arlo"
night_mode_name:
  description: "Arlo base station does not have a built-in night mode. You can map one of your custom modes to Home Assistant's night mode by setting the name of the custom mode in this configuration variable. The name of the custom mode should match eactly as you set it up in the Arlo app."
  required: false
  type: string
  default: "`Armed` mode in Arlo"
{% endconfiguration %}

### Examples

These examples are based on an Arlo base station named `my_arlo_base_station`. Replace this with the name of your base station's `entity_id`.

Arming the Arlo Base Station when leaving.

```yaml
- id: arm_arlo_when_leaving
  alias: "Arm Arlo cameras when leaving"
  trigger:
    platform: state
    entity_id: group.family
    from: home
    to: not_home
  action:
    service: alarm_control_panel.alarm_arm_away
    target:
      entity_id: alarm_control_panel.my_arlo_base_station
```

Setting Arlo to a custom mode (mapped to `home_mode_name` in `configuration.yaml`) when arriving.

```yaml
- id: disarm_arlo_when_arriving
  alias: "Set Arlo cameras to Home mode when arriving"
  trigger:
    platform: state
    entity_id: group.family
    from: not_home
    to: home
  action:
    service: alarm_control_panel.alarm_arm_home
    target:
      entity_id: alarm_control_panel.my_arlo_base_station
```

You can also completely disarm the Arlo base station by calling the `alarm_control_panel.alarm_disarm` service, and trigger the alarm by calling the `alarm_control_panel.alarm_trigger` service.

More examples and configuration options can be found on the [Manual Alarm Control page](/integrations/manual#examples).

## Camera

This integration is not yet able to live stream from your Arlo camera, but it will be able to playback the last video capture.

### Configuration

Once you have enabled the [Arlo component](/integrations/arlo), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: arlo
    ffmpeg_arguments: "-pred 1 -q:v 2"
```

{% configuration %}
ffmpeg_arguments:
  description: Extra options to pass to ffmpeg, e.g., image quality or video filter options.
  required: false
  type: string
{% endconfiguration %}

**Note:** To be able to playback the last capture, it is required to install the `ffmpeg` component. Make sure to follow the steps mentioned at [FFmpeg](/integrations/ffmpeg/) documentation.

## Sensor

To get your [Arlo](https://arlo.netgear.com/) sensors working within Home Assistant, please follow the instructions for the general [Arlo component](/integrations/arlo).

This platform does not support Arlo Q.

### Configuration

Once you have enabled the [Arlo component](/integrations/arlo), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: arlo
    monitored_conditions:
      - captured_today
      - last_capture
      - total_cameras
      - battery_level
      - signal_strength
```

Additionally, for Arlo Baby cameras that have additional sensors, you can add them to the `monitored_conditions` collection:

```yaml
# Additional sensors available for Arlo Baby cameras
sensor:
  - platform: arlo
    monitored_conditions:
      # ...
      - temperature
      - humidity
      - air_quality
```

{% configuration %}
monitored_conditions:
  description: Conditions to display in the frontend. The following conditions can be monitored.
  required: false
  type: list
  keys:
    captured_today:
      description: Return the number of videos captured on the current day.
    last_capture:
      description: Return the timestamp from the last video captured by your Arlo camera.
    total_cameras:
      description: Return the number of recognized and active cameras linked on your Arlo account.
    battery_level:
      description: Return the battery level of your Arlo camera.
    signal_strength:
      description: Return the wireless signal strength of your Arlo camera.
    temperature:
      description: Return the ambient temperature detected by your Arlo Baby camera.
    humidity:
      description: Return the ambient relative humidity detected by your Arlo Baby camera.
    air_quality:
      description: Return the ambient air quality (a reading of volatile organic compounds (VOCs) in parts per million) detected by your Arlo Baby camera.
{% endconfiguration %}

If no **monitored_conditions** are specified, all of above will be enabled by default.
