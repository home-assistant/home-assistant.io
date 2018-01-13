---
layout: page
title: "ONVIF Camera"
description: "Instructions on how to integrate a ONVIF camera within Home Assistant."
date: 2017-06-09 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: onvif.png
ha_category: Camera
ha_release: 0.47
---


The `onvif` camera platform allows you to use an ONVIF camera in Home Assistant. This requires the [`ffmpeg` component](/components/ffmpeg/) to be already configured.

To enable your ONVIF camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: onvif
    host: 192.168.1.111
```

Configuration variables:

- **host** (*Required*): An IP or hostname of the camera.
- **name** (*Optional*): Override the name of your camera.
- **username** (*Optional*): The username for the camera.
- **password** (*Optional*): The password for the camera.
- **port** (*Optional*): The port for the camera. This defaults to 5000

### {% linkable_title Service `camera.ptz` %}

If your ONVIF camera supports PTZ, you will be able to pan, tilt or zoom your camera.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of cameras. Else targets all.
| `tilt` | Tilt direction. Allowed values: `UP`, `DOWN`
| `pan` | Pan direction. Allowed values: `RIGHT`, `LEFT`
| `zoom` | Zoom. Allowed values: `ZOOM_IN`, `ZOOM_OUT`

If you are running into trouble with this sensor, please refer to the [Troubleshooting section](/components/ffmpeg/#troubleshooting).
