---
layout: page
title: "File size sensor"
description: "Component for monitoring the size of a file."
date: 2018-02-06 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: file.png
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: 0.64
---

Component for displaying the size of a file. Note that paths must be added to [whitelist_external_dirs](https://home-assistant.io/docs/configuration/basic/).
Add to your config:

```yaml
sensor:
  - platform: filesize
    file_paths:
      - /config/home-assistant_v2.db
  ```

{% configuration %}
file_paths:
  description: The absolute path to the file.
  required: true
  type: list of strings
{% endconfiguration %}
