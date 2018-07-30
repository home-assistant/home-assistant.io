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

[OpenALPR](http://www.openalpr.com/) integration for Home Assistant allows you
to process licences plates from a camera. You can use them to open a garage door
or trigger any other [automation](/components/automation/).

For using the result inside an automation rule,
take a look at the [component](/components/image_processing/) page.

### {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
image_processing:
 - platform: openalpr_cloud
   api_key: 'sk_abcxyz123456'
   region: eu
   source:
    - entity_id: camera.garage
```

{% configuration %}
region:
  description: >
    Country or region. List of supported
    [values](https://github.com/openalpr/openalpr/tree/master/runtime_data/config).
  required: true
  type: string
api_key:
  description: You need an API key from [OpenALPR Cloud](https://cloud.openalpr.com/).
  required: true
  type: string
confidence:
  description: The minimum of confidence in percent to process with Home Assistant.
  required: false
  type: int
  default: 80
source:
  description: List of image sources.
  required: true
  type: list
  keys:
    entity_id:
      description: A camera entity id to get picture from.
      required: true
      type: string
    name:
      description: This parameter allows you to override the name of your OpenALPR entity.
      required: false
      type: string
{% endconfiguration %}
