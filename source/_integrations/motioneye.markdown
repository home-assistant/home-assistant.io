---
title: motionEye
description: Instructions on how to integrate MotionEye into Home Assistant.
ha_category:
  - Camera
ha_release: 2021.5
ha_iot_class: Local Polling
ha_domain: motioneye
ha_codeowners:
  - '@dermotduffy'
ha_config_flow: true
ha_platforms:
  - camera
---

The motionEye integration allows you to integrate your
[motionEye](https://github.com/ccrisan/motioneye) server into Home Assistant. motionEye
is an open source web-frontend for the motion daemon, used to centralize the management
and visualization of multiple types of cameras.

{% include integrations/config_flow.md %}

Note that the URL required is the URL for the motionEye server itself -- **not** the URL for the camera stream(s) that it makes available.

## MotionEye Cameras

As cameras are added or removed to motionEye, they are automatically added or removed
from Home Assistant.
