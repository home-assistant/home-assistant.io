---
layout: page
title: "Ring Binary Camera"
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

To get your [Ring.com](https://ring.com/) cameras working within Home Assistant, please follow the instructions for the general [Ring component](/components/ring).

Once you have enabled the [Ring component](/components/ring), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: ring
```

Configuration variables:

- **ffmpeg_arguments**: (*Optional*): Extra options to pass to ffmpeg, e.g., image quality or video filter options.
- **scan_interval**: (*Optional*): How frequently to query for new video. Defaults to 90 seconds.

**Note:** To be able to playback the last capture, it is required to install the `ffmpeg` component. Make sure to follow the steps mentioned at [FFMPEG](https://home-assistant.io/components/ffmpeg/) documentation.

Currently it supports doorbell and stickup cameras.


## {% linkable_title Saving locally the videos captured by your Ring Door Bell %}

You can save locally the latest video captured by your Ring Door Bell by enabling the [downloader](/components/downloader) and the [python_scripts](/components/python_script) components.

  - Add to the `configuration.yaml` the `downloader` and `python_scripts`. Visit the component page for further details.

```json
python_script:
downloader:
  download_dir: downloads
```
  - Create a file `ring_downloader.py` in the folder `<config>/python_scripts` and give it this content:

```python
# obtain ring doorbell camera object
# replace the camera.front_door by your camera entity
ring_cam = hass.states.get('camera.front_door')

subdir_name = 'ring_{}'.format(ring_cam.attributes.get('friendly_name'))

# get video URL
data = {
    'url': ring_cam.attributes.get('video_url'),
    'subdir': subdir_name,
}

# call downloader component to save the video
hass.services.call('downloader', 'download_file', data)
```

  - Start Home Assistant
  - Call the server `python_script/ring_downloader`

You should be able to see a video file saved under `<config>/<downloader_dir>/ring_<camera_name>/`.

You can also automate the process by integrating it with the (automation)[/components/automation) component.
