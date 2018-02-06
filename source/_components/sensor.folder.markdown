---
layout: page
title: "folder sensor"
description: "Component for monitoring the contents of a folder."
date: 2018-02-06 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: file.png
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: 0.63
---

Home-assistant component for monitoring the contents of a folder.
The state of the sensor is the time that the most recently modified file in a folder was modified. The use case is detecting when a file in a folder is created or updated. The number of files in the folder and the names of those files are exposed as attributes. Optionally a filter can be applied to the files considered.

```yaml
sensor:
  - platform: folder
    folder: /share/motion
    filter: '*capture.jpg'
  - platform: folder
    folder: /config
```

Configuration variables:

- **folder** (*Required*): The folder path
- **filter** (*Optional*): Optional filter
