---
title: "Sighthound"
description: "Detect people with Sighthound Cloud."
logo: sighthound-logo.png
ha_category:
  - Image Processing
ha_release: 0.103
---

Adds integration for person detection with [Sighthound Cloud](https://www.sighthound.com/products/cloud). The Sighthound Developer tier (free for non-commercial use) allows 5000 requests per month. If you need more requests per month you will need to sign up for a production account (i.e. Basic or Pro account).

This integration adds an image processing entity where the state of the entity is the number of people detected in an image. For each person detected, an `image_processing.person_detected` event is fired. The event data includes the entity_id of the image processing entity firing the event, and the bounding box around the detected person. **Note** that in order to prevent accidentally using up your requets to Sighthound, by default the component will not automatically scan images, but requires you to call the image_processing.scan service e.g. using an automation triggered by motion. Alternativley, periodic scanning can be enabled by configuring a `scan_interval`.

## Configuration

To enable this platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: sighthound
    api_key: some_key
    source:
      - entity_id: camera.my_cam
```

{% configuration %}
api_key:
  description: Your Sighthound Cloud API key.
  required: true
  type: string
account_type:
  description: If you have a paid account, used `prod`.
  required: false
  type: string
source:
  description: The list of image sources.
  required: true
  type: map
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
