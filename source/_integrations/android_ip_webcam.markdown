---
title: Android IP Webcam
description: Connect Android devices as an IP webcam to Home Assistant
logo: android_ip_webcam.png
ha_category:
  - Hub
  - Binary Sensor
  - Camera
  - Sensor
  - Switch
ha_release: '0.40'
ha_iot_class: Local Polling
---

The `android_ip_webcam` integration turns any Android phone or tablet into a network camera with multiple viewing options.

It's setup as an MJPEG camera and all settings as switches inside of Home Assistant. You can also expose the sensors. If you have multiple phones, you can use all options inside a list.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Camera
- Sensor
- Switch

## Setup

Download [the IP Webcam app](https://play.google.com/store/apps/details?id=com.pas.webcam) and launch the app. When you press 'Start Server', it will start streaming video from your phone and the IP address of the device will be shown on screen.

## Configuration

To set up the component, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
android_ip_webcam:
  - host: 192.168.1.10
```

{% configuration %}
host:
  description: The IP address of the phone on the network.
  required: true
  type: string
port:
  description: The port the IP Webcam listens on.
  required: false
  default: 8080
  type: integer
name:
  description: Override the name of the phone.
  required: false
  default: IP Webcam
  type: string
username:
  description: The username to access the phone.
  required: inclusive
  type: string
password:
  description: The password to access the phone.
  required: inclusive
  type: string
scan_interval:
  description: Defines the update interval of the phone.
  required: false
  default: 10
  type: integer
sensors:
  description: Conditions to display sensor in the frontend. See the list of supported sensors.
  required: false
  type: list
  keys:
    audio_connections:
      description: The audio connections
    battery_level:
      description: The battery level
    battery_temp:
      description: The battery temperature
    battery_voltage:
      description: The battery voltage
    light:
      description: The light level
    motion:
      description: Motion detection
    pressure:
      description: The current pressure
    proximity:
      description: The proximity
    sound:
      description: The sound detection
    video_connections:
      description: The video connections
switches:
  description: Conditions to display settings in the frontend. See the list of supported switches.
  required: false
  type: list
  keys:
    exposure_lock:
      description: Control the exposure lock
    ffc:
      description: Control the front-facing camera.
    focus:
      description: Control the focus.
    gps_active:
      description: Control the GPS.
    night_vision:
      description: Control the night vision.
    overlay:
      description: Control the overlay.
    torch:
      description: Control the torch.
    whitebalance_lock:
      description: Control the white balance lock.
    video_recording:
      description: Control the video recording.
motion_sensor:
  description: Activate motion sensor if `auto_discovery` is disabled.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

<div class='note'>

You need to enable logging in the Android app (`Data logging` > `Enable data logging`), if you wish to see the sensor states in Home Assistant. The sensor states stays as `unknown`, until it's enabled.

</div>

## Full example

```yaml
# Example configuration.yaml entry
android_ip_webcam:
  - host: 192.168.1.202
    port: 8000
    sensors:
      - audio_connections
      - battery_level
      - battery_temp
      - battery_voltage
      - light
      - motion
      - pressure
      - proximity
      - sound
      - video_connections
    switches:
      - exposure_lock
      - ffc
      - focus
      - gps_active
      - night_vision
      - overlay
      - torch
      - whitebalance_lock
      - video_recording
  - host: 192.168.1.203
    port: 8000
    sensors:
      - light
    switches:
      - torch
```

## Binary Sensor

The `android_ip_webcam` binary sensor platform lets you observe the motion state of [Android IP webcam](https://play.google.com/store/apps/details?id=com.pas.webcam) sensors through Home Assistant. Devices will be configured automatically.

## Examples

You can also setup the binary motion sensor with the following script:

{% raw %}

```yaml
binary_sensor:
  - platform: rest
    name: Kitchen Motion
    sensor_class: motion
    resource: http://IP:8080/sensors.json?sense=motion_active
    value_template: '{{ value_json.motion_active.data[0][1][0] | round(0) }}'
```

{% endraw %}

## Camera

The `android_ip_webcam` integration adds a camera by default if you choose not to use the integration but still want to see the video feed then the [`mjpeg` camera](/integrations/mjpeg) platform can be used.

## Configuration

To enable only the camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: mjpeg
    mjpeg_url: http://IP_ADDRESS:8080/video
```

## Sensor

The `android_ip_webcam` sensor platform lets you observe states of [Android IP webcam](https://play.google.com/store/apps/details?id=com.pas.webcam) sensors through Home Assistant. Devices will be configured automatically.

You can setup your own sensors by examining the JSON file from the webcam server: `http://IP:8080/sensors.json`
