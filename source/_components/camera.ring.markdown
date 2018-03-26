---
layout: page
title: "Ring Camera"
description: "Instructions on how to integrate your Ring.com devices within Home Assistant."
date: 2017-10-20 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ring.png
ha_category: Camera
ha_release: 0.57
ha_iot_class: "Cloud Polling"
---

To get your [Ring.com](https://ring.com/) cameras working within Home Assistant, please follow the instructions for the general [Ring component](/components/ring). Please note that downloading and playing Ring video will require a Ring Protect plan.

Once you have enabled the [Ring component](/components/ring), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: ring
```

Configuration variables:

- **ffmpeg_arguments**: (*Optional*): Extra options to pass to ffmpeg, e.g., image quality or video filter options.
- **scan_interval**: (*Optional*): How frequently to query for new video. Defaults to 90 seconds.

**Note:** To be able to playback the last capture, it is required to install the `ffmpeg` component. Make sure to follow the steps mentioned at [FFMPEG](/components/ffmpeg/) documentation.

Currently it supports doorbell and stickup cameras.

## {% linkable_title Saving the videos captured by your Ring Door Bell %}

You can save locally the latest video captured by your Ring Door Bell using the [downloader](/components/downloader) along with either an [automation](/components/automation) or [python_script](/components/python_script). First, enable the [downloader](/components/downloader) component in your configuration by adding the following to your `configuration.yaml`.

```yaml
downloader:
  download_dir: downloads
```
Then you can use the following `action` in your automation (this will save the video file under `<config>/downloads/ring_<camera_name>/`):

```yaml
action:
  - service: downloader.download_file
    data_template:
      url: "{{ states.camera.front_door.attributes.video_url }}"
      subdir: "{{states.camera.front_door.attributes.friendly_name}}"
      filename: "{{states.camera.front_door.attributes.friendly_name}}"
```

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

# call downloader component to save the video
hass.services.call('downloader', 'download_file', data)
```
