---
layout: page
title: "Arlo Camera"
description: "Instructions how to integrate your Netgear Arlo cameras within Home Assistant."
date: 2016-05-30 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: arlo.png
ha_category: Camera
ha_release: 0.46
ha_iot_class: "Cloud Polling"
---

To get your [Arlo](https://arlo.netgear.com/) cameras working within Home Assistant, please follow the instructions for the general [Arlo component](/components/arlo).

This component is not yet able to live stream from your Arlo camera, but it will be able to playback the last video capture.

Once you have enabled the [Arlo component](/components/arlo), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: arlo
    ffmpeg_arguments: '-pred 1 -q:v 2'
```

Configuration variables:

- **ffmpeg_arguments**: (*Optional*): Extra options to pass to ffmpeg, e.g., image quality or video filter options.

**Note:** To be able to playback the last capture, it is required to install the `ffmpeg` component. Make sure to follow the steps mentioned at [FFMPEG](https://home-assistant.io/components/ffmpeg/) documentation.
