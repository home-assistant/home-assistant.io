---
layout: page
title: gc100 Switch
description: "Instructions on how to set up a gc100 switch within Home Assistant."
date: 2017-10-27 17:26
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Switch
ha_release: 0.57
ha_iot_class: "Local Polling"
---

This allows you to control and monitor the relay state on your GC100.

To enable this switch, you first have to set up [gc100](/components/gc100/), and add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: gc100
    ports:
      - '4:1': Siren
      - '4:2': Sprinkler
```

Configuration variables:

- **ports** (*Required*): A list of module-address to name mappings in the format 'x:y': name, where x is module #, y is address.

