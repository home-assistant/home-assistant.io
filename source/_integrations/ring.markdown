---
title: Ring
description: Instructions on how to integrate your Ring.com devices within Home Assistant.
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
ha_config_flow: true
ha_codeowners:
  - '@balloob'
---

The `ring` implementation allows you to integrate your [Ring.com](https://ring.com/) devices in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Camera](#camera)
- [Sensor](#sensor)
- [Switch](#switch)

<p class='note'>
This component does NOT allow for live viewing of your Ring camera within Home Assistant.
</p>

## Configuration

Go to the integrations page in your config and click on new integration -> Ring.

## YAML configuration

YAML configuration is around for people that prefer YAML, but it's not preferred! The YAML method does not work with two-factor authentication and it requires you to store your username/password. The normal method only requires you to enter username/password once.

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
{% endconfiguration %}

## Binary Sensor

Once you have enabled the [Ring integration](/integrations/ring), you can start using a binary sensor. Currently, it supports doorbell, external chimes and stickup cameras.

## Camera

<div class='note'>
Please note that downloading and playing Ring video will require a Ring Protect plan.
</div>

Once you have enabled the [Ring integration](/integrations/ring), you can start using the camera platform. Currently, it supports doorbell and stickup cameras.

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
