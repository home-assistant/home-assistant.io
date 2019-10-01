---
title: "Ring"
description: "Instructions on how to integrate your Ring.com devices within Home Assistant."
logo: ring.png
ha_category:
  - Doorbell
  - Binary Sensor
  - Camera
  - Sensor
  - Switch
  - Light
ha_release: 0.42
ha_iot_class: Cloud Polling
---

The `ring` implementation allows you to integrate your [Ring.com](https://ring.com/) devices in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Camera](#camera)
- [Sensor](#sensor)
- [Switch](#switch)

Currently only doorbells are supported by this sensor.

<p class='note'>
This component does NOT allow for live viewing of your Ring camera within Home Assistant.
</p>

## Configuration

To enable device linked in your [Ring.com](https://ring.com/) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ring:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The username for accessing your Ring account.
  required: true
  type: string
password:
  description: The password for accessing your Ring account.
  required: true
  type: string
scan_interval:
  description: How frequently to query for new video, or current sensor values in seconds
  required: false
  type: integer
  default: 10
{% endconfiguration %}

## Binary Sensor

Once you have enabled the [Ring integration](/integrations/ring), you can start using a binary sensor. Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: ring
```

{% configuration %}
monitored_conditions:
  description: Conditions to display in the frontend. The following conditions can be monitored. If not specified, all conditions below will be enabled.
  required: false
  type: list
  keys:
    ding:
      description: Return a boolean value when the doorbell button was pressed.
    motion:
      description: Return a boolean value when a movement was detected by the Ring doorbell.
{% endconfiguration %}

Currently it supports doorbell, external chimes and stickup cameras.

## Camera

<div class='note'>
Please note that downloading and playing Ring video will require a Ring Protect plan.
</div>

Once you have enabled the [Ring integration](/integrations/ring), you can start using the camera platform. Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: ring
```

{% configuration %}
ffmpeg_arguments:
  description: Extra options to pass to ffmpeg, e.g., image quality or video filter options.
  required: false
  type: string
{% endconfiguration %}

**Note:** To be able to playback the last capture, it is required to install the `ffmpeg` component. Make sure to follow the steps mentioned at [FFMPEG](/integrations/ffmpeg/) documentation.

Currently it supports doorbell and stickup cameras.

## Saving the videos captured by your Ring Door Bell

You can save locally the latest video captured by your Ring Door Bell using the [downloader](/integrations/downloader) along with either an [automation](/integrations/automation) or [python_script](/integrations/python_script). First, enable the [downloader](/integrations/downloader) integration in your configuration by adding the following to your `configuration.yaml`.

```yaml
downloader:
  download_dir: downloads
```

Then you can use the following `action` in your automation (this will save the video file under `<config>/downloads/ring_<camera_name>/`):

{% raw %}
```yaml
action:
  - service: downloader.download_file
    data_template:
      url: "{{ state_attr('camera.front_door', 'video_url') }}"
      subdir: "{{state_attr('camera.front_door', 'friendly_name')}}"
      filename: "{{state_attr('camera.front_door', 'friendly_name')}}"
```
{% endraw %}

If you want to use `python_script`, enable it your `configuration.yaml` file first:

```yaml
python_script:
```

You can then use the following `python_script` to save the video file:

```python
# obtain ring doorbell camera object
# replace the camera.front_door by your camera entity
ring_cam = hass.states.get('camera.front_door')

subdir_name = 'ring_{}'.format(ring_cam.attributes.get('friendly_name'))

# get video URL
data = {
    'url': ring_cam.attributes.get('video_url'),
    'subdir': subdir_name,
    'filename': ring_cam.attributes.get('friendly_name')
}

# call downloader integration to save the video
hass.services.call('downloader', 'download_file', data)
```

## Sensor

Once you have enabled the [Ring integration](/integrations/ring), you can start using the sensor platform. Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ring
```

{% configuration %}
monitored_conditions:
  type: list
  required: false
  description: Conditions to display in the frontend. The following conditions can be monitored. If not specified, all conditions below will be enabled.
  keys:
    battery:
       description: Return the battery level from device.
    last_activity:
       description: Return the timestamp from the last event captured (ding/motion/on demand) by the Ring doorbell camera.
    last_ding:
       description: Return the timestamp from the last time the Ring doorbell button was pressed.
    last_motion:
       description: Return the timestamp from the last motion event captured by the Ring doorbell camera.
    volume:
       description: Return the volume level from the device.
    wifi_signal_category:
       description: Return the WiFi signal level from the device.
    wifi_signal_strength:
       description: Return the WiFi signal strength (dBm) from the device.
{% endconfiguration %}

Currently it supports doorbell, external chimes and stickup cameras.

## Switch

Once you have enabled the [Ring integration](/integrations/ring), you can start using the switch platform. Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: ring
```

This will add a switch for every camera that supports a siren. Note the siren will only turn on for 30 seconds before automatically turning off.

## Light

Once you have enabled the [Ring integration](/integrations/ring), you can start using the light platform. Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: ring
```

This will add a light for every camera that supports a light (such as a flood light).
