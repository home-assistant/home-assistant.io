---
layout: page
title: "OpenALPR Cloud"
description: "Instructions on how to integrate licences plates with OpenALPR cloud into Home Assistant."
date: 2017-01-09 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: openalpr.png
ha_category: Image Processing
featured: false
ha_release: 0.36
---

[OpenALPR](http://www.openalpr.com/) integration for Home Assistant allows you to process licences plates from a camera. You can use them to open a garage door or trigger any other [automation](/components/automation/).

For using the result inside an automation rule, take a look at the [component](/components/image_processing/) page.

### {% linkable_title Configuration Home Assistant %}

```yaml
# Example configuration.yaml entry
image_processing:
 - platform: openalpr_cloud
   api_key: 'sk_abcxyz123456'
   region: eu
   source:
    - entity_id: camera.garage
```

Configuration variables:

- **region** (*Required*): Country or region. List of supported [values](https://github.com/openalpr/openalpr/tree/master/runtime_data/config).
- **api_key** (*Required*): You need an API key from [OpenALPR Cloud](https://cloud.openalpr.com/).
- **confidence** (*Optional*): The minimum of confidence in percent to process with Home Assistant. Defaults to 80.
- **source** array (*Required*): List of image sources.
  - **entity_id** (*Required*): A list of devices to add in Home Assistant.
  - **name** (*Optional*): This parameter allows you to override the name of your OpenALPR entity.
