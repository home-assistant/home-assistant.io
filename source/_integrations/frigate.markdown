---
title: Frigate - NVR With Realtime Object Detection for IP Cameras
description: Detect and recognize objects with Frigate in real time.
ha_category:
  - Camera
  - Image Processing
  - Binary Sensor
ha_iot_class: Local Polling
ha_release: '0.100'
ha_domain: frigate
---

[FRIGATE](https://github.com/blakeblackshear/frigate) uses OpenCV and Tensorflow to perform realtime object detection locally for IP cameras. It is designed for integration with HomeAssistant or others via MQTT camera and binary sensors. Use of a Google Coral Accelerator is optional, but highly recommended. By average, on a 64 bit high quality CPU you will be able to process only 2-3 FPS. With the Coral, you can process 100+ FPS with very low CPU load.

<p class='img'>
<img src='https://github.com/blakeblackshear/frigate/blob/master/diagram.png'/>
</p>

## Setup

You need to have FRIGATE running somewhere. It's easiest to run as a [Docker](https://hub.docker.com/r/blakeblackshear/frigate) container. Follow the instructions of the [projects page](https://github.com/blakeblackshear/frigate).

## Configuration

To enable this integration in your installation add the following to your `configuration.yaml` file in order to get a stream of best detection image of each detection event of frigate as a MQTT camera:

```yaml
# Example configuration.yaml entry for person detection MQTT camera
camera:
  - name: <CAMERA_NAME> Last Person
    platform: mqtt
    topic: frigate/<CAMERA_NAME>/person/snapshot
```

{% configuration %}
name:
    description: Replace the camera <camera_name> with the name you want to give to the entity.
    required: true
    type: string
topic:
    description: The topic of each camera on MQTT. Replace the <camera_name> with the camera name configured on the frigate config file.
    required: true
    type: string
{% endconfiguration %}

You can also add a binary sensor for each object type you configured on frigate that can be used as a trigger on your automations adding the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for person detection binary sensor
binary_sensor:
  - name: <CAMERA_NAME> Person
    platform: mqtt
    state_topic: "frigate/<CAMERA_NAME>/person"
    device_class: motion
    availability_topic: "frigate/available"
```

{% configuration %}
name:
    description: Replace the camera <camera_name> with the name you want to give to the entity.
    required: true
    type: string
state_topic:
    description: The topic of each camera and object type detection on MQTT. Replace the <camera_name> with the camera name configured on the frigate config file and do the same with the object type.
    required: true
    type: string
{% endconfiguration %}


## Sample configuration

{% raw %}
```yaml
# Example configuration.yaml entry for person detection MQTT kitchen camera and sensor
camera:
  - name: Kitchen Last Person
    platform: mqtt
    topic: frigate/kitchen/person/snapshot

binary_sensor:
  - name: Kitchen Person
    platform: mqtt
    state_topic: "frigate/kitchen/person"
    device_class: motion
    availability_topic: "frigate/available"
```
{% endraw %}

## Combining the RSTP stream and detection stream

You also can add the RSTP stream of the camera to HomeAssistant combined with the latest detection image of the camera, witch comes with the detected objects bounding boxes drawn. Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: generic
    name: <CAMERA_NAME>
    stream_source: rstp://<IP_CAMERAS_INTERNAL_RSTP_STREAM>
    still_image_url: http://<FRIGATE_SERVER_IP>:<FRIGATE_SERVER_PORT>/<CAMERA_NAME>/latest.jpg
```
Now you can add this camera to the lovelace for example as a picture-glance card to watch an almost real time stream of images with the detected objects drawn with the bounding boxes and navigate easily to the real time stream of the camera with one touch over the image. For more information about how to integrate a generic IP camera please refer to [its own integration page](https://www.home-assistant.io/integrations/generic_ip_camera/).

{% configuration %}
still_image_url:
  description: "The URL your camera serves the image on, e.g., `http://192.168.1.21:5000/`. Can be a [template](/topics/templating/)."
  required: true
  type: string
stream_source:
  description: "The URL your camera serves the live stream on, e.g., `rtsp://192.168.1.10:554/ch0_0.h264`. Can be a [template](/topics/templating/)."
  required: false
  type: string
name:
  description: This parameter allows you to override the name of your camera.
  required: false
  type: string
{% endconfiguration %}

## Debugging

Frigate also supports the integration of the debugging topics to HomeAssistant:

```yaml
# Example configuration.yaml entry
sensor:
- platform: rest
  name: Frigate Debug
  resource: http://<FRIGATE_SERVER_IP>:<FRIGATE_SERVER_PORT>/debug/stats
  scan_interval: 5
  json_attributes:
    - <CAMERA_NAME>
    - detection_fps
    - detectors
  value_template: 'OK'  
- platform: template
  sensors:
    <camera_name>_fps:
      value_template: '{{ states.sensor.frigate_debug.attributes["<CAMERA_NAME>"]["fps"] }}'
      unit_of_measurement: 'FPS'
    <camera_name>_skipped_fps:
      value_template: '{{ states.sensor.frigate_debug.attributes["<CAMERA_NAME>"]["skipped_fps"] }}'
      unit_of_measurement: 'FPS'
    <camera_name>_detection_fps:
      value_template: '{{ states.sensor.frigate_debug.attributes["<CAMERA_NAME>"]["detection_fps"] }}'
      unit_of_measurement: 'FPS'
    frigate_detection_fps:
      value_template: '{{ states.sensor.frigate_debug.attributes["detection_fps"] }}'
      unit_of_measurement: 'FPS'
    frigate_coral_inference:
      value_template: '{{ states.sensor.frigate_debug.attributes["detectors"]["coral"]["inference_speed"] }}'
      unit_of_measurement: 'ms'
```

## Automations

As described above, you can use the binary sensor created using the MQTT topic to trigger an alarm, a notifier...:

```yaml
# Example automations.yaml entry
automation:
  - alias: Alert me if a person is detected while armed away
    trigger:
      platform: state
      entity_id: binary_sensor.camera_person
      from: 'off'
      to: 'on'
    condition:
      - condition: state
        entity_id: alarm_control_panel.home_alarm
        state: armed_away
    action:
      - service: notify.user_telegram
        data:
          message: "A person was detected."
          data:
            photo:
              - url: http://<FRIGATE_SERVER_IP>:<FRIGATE_SERVER_PORT>/<CAMERA_NAME>/person/best.jpg
                caption: A person was detected.  
```
