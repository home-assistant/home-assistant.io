---
title: Dlib Face Detect
description: Instructions on how to integrate Dlib Face Detect into Home Assistant.
ha_category:
  - Image processing
ha_iot_class: Local Push
ha_release: 0.44
ha_domain: dlib_face_detect
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `dlib_face_detect` image processing {% term integration %} allows you to use the [Dlib](http://www.dlib.net/) through Home Assistant. This platform enables face detection from cameras, and can fire events with attributes.

This can be used to trigger an automation rule. Further info is on the [integration](/integrations/image_processing/) page.

{% note %}
This integration is only available on Home Assistant Core installation types. Unfortunately, it cannot be used with Home Assistant OS, Supervised or Container.
{% endnote %}

## Configuration

To enable Dlib Face Detect, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
