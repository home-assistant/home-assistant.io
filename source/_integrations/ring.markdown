---
title: Ring
description: Instructions on how to integrate your Ring.com devices within Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Camera
  - Doorbell
  - Light
  - Sensor
  - Switch
ha_release: 0.42
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: ring
ha_quality_scale: silver
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - button
  - camera
  - diagnostics
  - light
  - sensor
  - siren
  - switch
ha_integration_type: integration
ha_codeowners:
  - '@sdb9696'
---

The Ring integration allows you to integrate your [Ring.com](https://ring.com/) devices in Home Assistant. Due to recent authentication changes of Ring, you will need to run at least Home Assistant 0.104.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Button](#button)
- [Camera](#camera)
  - [Saving the videos captured by your Ring Door Bell](#saving-the-videos-captured-by-your-ring-door-bell)
- [Sensor](#sensor)
- [Switch](#switch)
- [Light](#light)

{% note %}
This integration does NOT allow for live viewing of your Ring camera within Home Assistant.
{% endnote %}

{% include integrations/config_flow.md %}

## Binary sensor

Once you have enabled the [Ring integration](/integrations/ring), you can start using a binary sensor. Currently, it supports doorbell, external chimes and stickup cameras.

## Button

Once you have enabled the [Ring integration](/integrations/ring), you can start using the button platform. Currently, it supports intercom to open the door.

## Camera

{% important %}
Please note that downloading and playing Ring video will require a Ring Protect plan.
{% endimportant %}

Once you have enabled the [Ring integration](/integrations/ring), you can start using the camera platform. Currently, it supports doorbell and stickup cameras.

### Saving the videos captured by your Ring Door Bell

You can save locally the latest video captured by your Ring Door Bell using the [downloader](/integrations/downloader) along with either an [automation](/integrations/automation) or [python_script](/integrations/python_script). First, enable the [downloader](/integrations/downloader) integration in your configuration by adding the following to your `configuration.yaml`.

```yaml
downloader:
  download_dir: downloads
```

Then you can use the following automation, with the entities from your system, which will save the video file under `<config>/downloads/<camera_name>/<camera_name>/`:

{% raw %}

```yaml
automation:
  alias: "Save the video when the doorbell is pushed"
  trigger:
  - platform: state
    entity_id: binary_sensor.front_doorbell_ding
    to: "on"
  action:
  - service: downloader.download_file
    data:
      url: "{{ state_attr('camera.front_door', 'video_url') }}"
      subdir: "{{state_attr('camera.front_door', 'friendly_name')}}"
      filename: "{{state_attr('camera.front_door', 'friendly_name')}}"
```

{% endraw %}

You may consider some modifications in the subdirectory and the filename to suit your needs. For example, you can add the date and the time and extension to the downloaded file: 

{% raw %}
```yaml
    data:
      url: "{{ state_attr('camera.front_door', 'video_url') }}"
      subdir: "{{ state_attr('camera.front_door', 'friendly_name') }}/{{ now().strftime('%Y.%m') }}"
      filename: "{{ now().strftime('%Y-%m-%d-at-%H-%M-%S') }}.mp4"
```
{% endraw %}

the above modification will save the video file under `<config>/downloads/<camera_name>/YYYY-MM/YYYY-MM-DD-at-HH-MM-SS.mp4`. You can change the date according to your localization format.

If you want to use `python_script`, enable it your {% term "`configuration.yaml`" %} file first:

```yaml
python_script:
```

You can then use the following `python_script` to save the video file:

```python
# obtain ring doorbell camera object
# replace the camera.front_door by your camera entity
ring_cam = hass.states.get("camera.front_door")

subdir_name = f"ring_{ring_cam.attributes.get('friendly_name')}"

# get video URL
data = {
    "url": ring_cam.attributes.get("video_url"),
    "subdir": subdir_name,
    "filename": ring_cam.attributes.get("friendly_name"),
}

# call downloader integration to save the video
hass.services.call("downloader", "download_file", data)
```

## Sensor

Once you have enabled the [Ring integration](/integrations/ring), you can start using the sensor platform. Currently, it supports doorbell, external chimes and stickup cameras.

## Switch

Once you have enabled the [Ring integration](/integrations/ring), you can start using the switch platform. This will add a switch for every camera that supports a siren. Note the siren will only turn on for 30 seconds before automatically turning off.

## Light

Once you have enabled the [Ring integration](/integrations/ring), you can start using the light platform. This will add a light for every camera that supports a light (such as a floodlight).
