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

Component for monitoring the contents of a folder.
The state of the sensor is the time that the most recently modified file in a folder was modified. The use case is detecting when a file in a folder is created or updated. The number of files in the folder and the names of those files are exposed as attributes. Optionally a [wildcard filter]((http://tldp.org/LDP/GNU-Linux-Tools-Summary/html/x11655.htm) ) can be applied to the files considered.

```yaml
sensor:
  - platform: folder
    folder: /config
```

Configuration variables:

{% configuration %}
folder:
  description: The folder path
  required: true
  type: string
filter:
  description: Filter to apply
  required: false
  default: `*`
  type: string
{% endconfiguration %}
