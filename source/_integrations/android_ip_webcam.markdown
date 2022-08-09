---
title: Android IP Webcam
description: Connect Android devices as an IP webcam to Home Assistant
ha_category:
  - Binary Sensor
  - Camera
  - Hub
  - Sensor
  - Switch
ha_release: '0.40'
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: android_ip_webcam
ha_platforms:
  - binary_sensor
  - camera
  - sensor
  - switch
ha_integration_type: integration
ha_codeowners:
  - '@engrbm87'
---

The `android_ip_webcam` integration connects with Android IP Webcam to turn any Android phone or tablet into a network camera with multiple viewing options.

The integration is setup as an MJPEG camera with all settings as switches inside Home Assistant. You can also integrate the sensors exposed by the app. If you have multiple phones, you can use all options inside a list.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Camera
- Sensor
- Switch

## Setup

Download [Android IP Webcam app](https://play.google.com/store/apps/details?id=com.pas.webcam) and launch the app. When you press 'Start Server', it will start streaming video from your phone and the IP address of the device will be shown on screen.

{% include integrations/config_flow.md %}

<div class='note'>

You need to enable logging in the Android app (`Data logging` > `Enable data logging`) if you wish to see the sensor states in Home Assistant. The sensor states stay as `unknown`, until this is enabled.

</div>

## Alternate Configuration Method

The configuration described above will cause the `android_ip_webcam` binary sensor platform to automatically create and configure the devices. Alternatively you can omit the `android_ip_webcam` component from your `configuration.yaml` file and add individual devices instead.

### Binary Sensor

You can setup the binary motion sensor with the following in your `configuration.yaml` file:

{% raw %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: rest
    name: Kitchen Motion
    device_class: motion
    resource: http://IP_ADDRESS:PORT/sensors.json?sense=motion_active
    value_template: "{{ value_json.motion_active.data[0][1][0] | round(0) }}"
```

{% endraw %}

### Camera

To enable only the camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: mjpeg
    mjpeg_url: http://IP_ADDRESS:PORT/video
```

### Other Sensors

You can setup your own sensors by examining the JSON file from the webcam server: `http://IP:8080/sensors.json`
