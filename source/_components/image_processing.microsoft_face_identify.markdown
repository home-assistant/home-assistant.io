---
layout: page
title: "Microsoft Face Identify"
description: "Instructions on how to integrate Microsoft Face Identify into Home Assistant."
date: 2017-01-25 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: microsoft.png
ha_category: Image Processing
featured: false
ha_release: 0.37
---

The `microsoft_face_identify` image processing platform lets you use
[Microsoft Face identify](https://www.microsoft.com/cognitive-services/en-us/)
API through Home Assistant. This platform allow you do identify persons on
camera and fire an event with attributes.

Please refer to the [component](/components/microsoft_face/) configuration on
how to setup the API key.

For using the result inside an automation rule,
take a look at the [component](/components/image_processing/) page.

### {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: microsoft_face_identify
    group: family
    source:
      - entity_id: camera.door
```

{% configuration %}
group:
  description: Micrsoft face group to detect person from it.
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
      description: This parameter allows you to override the name of your `image_processing` entity.
      required: false
      type: string
{% endconfiguration %}
