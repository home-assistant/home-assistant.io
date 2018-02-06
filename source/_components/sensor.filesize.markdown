---
layout: page
title: "file size sensor"
description: "Component for monitoring the size of a file."
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

Component for displaying the size of a file.
Add to your config:

```yaml
sensor:
  - platform: filesize
    file_paths:
      - /config/home-assistant_v2.db
  ```

Configuration variables:

- **file_paths** (*Required*): The absolute path to the file.
