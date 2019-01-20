---
layout: page
title: "QR Code Recognition"
description: "Instructions on how to integrate QR Code Recognition into Home Assistant."
date: 2019-01-18 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Image Processing
featured: false
ha_release: 0.87
---

The `qrcode` image processing platform enables QR code recognition from cameras.

## {% linkable_title Configuration %}

To enable this, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: qrcode
    source:
      - entity_id: camera.door
```

{% configuration %}
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
