---
title: Dlib Face Detect
description: Instructions on how to integrate Dlib Face Detect into Home Assistant.
ha_category:
  - Image Processing
ha_iot_class: Local Push
ha_release: 0.44
ha_domain: dlib_face_detect
ha_integration_type: integration
---

The `dlib_face_detect` image processing platform allows you to use the [Dlib](http://www.dlib.net/) through Home Assistant. This platform enables face detection from cameras, and can fire events with attributes.

This can be used to trigger an automation rule. Further info is on the [integration](/integrations/image_processing/) page.

<div class='note'>
This integration is only available on Home Assistant Core installation types. Unfortunately, it cannot be used with Home Assistant OS, Supervised or Container.
</div>

## Configuration

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: dlib_face_detect
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
