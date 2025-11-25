---
title: Microsoft Face Identify
description: Instructions on how to integrate Microsoft Face Identify into Home Assistant.
ha_category:
  - Image processing
ha_iot_class: Cloud Push
ha_release: 0.37
ha_domain: microsoft_face_identify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `microsoft_face_identify` image processing {% term integration %} lets you use
[Microsoft Face identify](https://azure.microsoft.com/products/cognitive-services/)
API through Home Assistant. This platform allow you do identify persons on
camera and fire an event with attributes.

Please refer to the [Microsoft Face integration](/integrations/microsoft_face/) configuration on
how to setup the API key.

For using the result inside an automation rule,
take a look at the [Image Processing integration](/integrations/image_processing/) page.

{% important %}
The free version of the Microsoft Face identify API limits the number of requests possible per month. Therefore, it is strongly recommended that you limit the `scan_interval` when setting up an instance of this entity as detailed on the main [Image Processing integration](/integrations/image_processing/) page.
{% endimportant %}

### Configuration

To enable this integration, add it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
  description: Microsoft face group to detect person from it.
  required: true
  type: string
confidence:
  description: The minimum of confidence in percent to process with Home Assistant.
  required: false
  type: integer
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
