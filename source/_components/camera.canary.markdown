---
layout: page
title: "Canary Camera"
description: "Instructions on how to integrate your Canary devices into Home Assistant."
date: 2017-12-07 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: canary.png
ha_category: Camera
ha_release: "0.60"
ha_iot_class: "Cloud Polling"
---

The `canary` camera platform allows you to watch the live stream of your [Canary](https://canary.is) camera in Home Assistant. This requires the [`ffmpeg` component](/components/ffmpeg/) to be already configured.

To add `canary` camera to your installation, follow instructions in [Canary component](/components/canary/). Once you have [Canary component](/components/canary/) setup, your [Canary](https://canary.is) camera(s) should show up automatically.

You can add the following to your `configuration.yaml` file to configure `canary` camera with optional settings:

```yaml
camera:
  - platform: canary
```

{% configuration %}
  ffmpeg_arguments:
    description: Extra options to pass to `ffmpeg`, e.g. image quality or video filter options. More details in [FFmpeg component](/components/ffmpeg).
    required: false
    type: string
