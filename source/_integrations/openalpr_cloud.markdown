---
title: OpenALPR Cloud
description: Instructions on how to integrate licences plates with OpenALPR cloud into Home Assistant.
ha_category:
  - Image Processing
ha_iot_class: Cloud Push
ha_release: 0.36
ha_domain: openalpr_cloud
---

[OpenALPR](https://www.openalpr.com/) integration for Home Assistant allows you
to process license plates from a camera. You can use them to open a garage door
or trigger any other [automation](/integrations/automation/).

For using the result inside an automation rule,
take a look at the [component](/integrations/image_processing/) page.

### Configuration

```yaml
# Example configuration.yaml entry
image_processing:
 - platform: openalpr_cloud
   api_key: YOUR_API_KEY
   region: eu
   source:
    - entity_id: CAMERA.GARAGE
```

{% configuration %}
region:
  description: Country or region. List of supported [values](https://github.com/openalpr/openalpr/tree/master/runtime_data/config).
  required: true
  type: string
api_key:
  description: You need an API key from [OpenALPR Cloud](https://cloud.openalpr.com/).
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
      description: This parameter allows you to override the name of your OpenALPR entity.
      required: false
      type: string
{% endconfiguration %}
