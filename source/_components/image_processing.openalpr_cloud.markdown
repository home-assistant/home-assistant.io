---
layout: page
title: "OpenAlpr Cloud"
description: "Instructions how to integrate licences plates with OpenAlpr cloud into Home Assistant."
date: 2017-01-09 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: openalpr.png
ha_category: Image_Processing
featured: false
ha_release: 0.36
---

[OpenAlpr](http://www.openalpr.com/) integration for Home Assistant allows you to process licences plates from a camera. You can use them to open a garage door or trigger any other [automation](https://home-assistant.io/components/automation/).

### {% linkable_title Configuration Home Assistant %}

```yaml
# Example configuration.yaml entry
image_processing:
 - platform: openalpr_cloud
   region: eu
   source:
    - entity_id: camera.garage
```
Configuration variables:

- **region** (*Required*): Country or region. List of Supported [value](https://github.com/openalpr/openalpr/tree/master/runtime_data/config).
- **alpr_bin** (*Optional*): Default `alpr`. The command line tool alpr from OpenAlpr software for local processing.
- **confidence** (*Optional*): Default 80. The minimum of confidence in percent to process with Home-Assistant.
- **source** (*Required*):
  - **entities** (*Required*): A list of device to add in Home-Assistant.
  - **name** (*Optional*): This parameter allows you to override the name of your openalpr entity.
