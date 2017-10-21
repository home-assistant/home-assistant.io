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
