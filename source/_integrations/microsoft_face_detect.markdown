---
title: Microsoft Face Detect
description: Instructions on how to integrate Microsoft Face Detect into Home Assistant.
ha_category:
  - Image processing
ha_iot_class: Cloud Push
ha_release: 0.38
ha_domain: microsoft_face_detect
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `microsoft_face_detect` image processing {% term integration %} allows you to use the
[Microsoft Face Identify](https://azure.microsoft.com/products/cognitive-services/)
API through Home Assistant. This platform enables you to detect face on camera
and fire an event with attributes.

Please refer to the [Microsoft Face integration](/integrations/microsoft_face/) configuration on
how to setup the API key.

For using the result inside an automation rule,
take a look at the [Image Processing integration](/integrations/image_processing/) page.

{% important %}
The free version of the Microsoft Face identify API limits the number of requests possible per month. Therefore, it is strongly recommended that you limit the `scan_interval` when setting up an instance of this entity as detailed on the main [Image Processing integration](/integrations/image_processing/) page.
{% endimportant %}

### Configuration

To enable the integration, add it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: microsoft_face_detect
    source:
      - entity_id: camera.door
```

{% configuration %}
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
attributes:
  description: "The image search attributes. Supported: `age`, `gender`, `glasses`."
  required: false
  type: list
  default: "[age, gender]"
{% endconfiguration %}
