---
layout: page
title: "Microsoft Face Detect"
description: "Instructions how to integrate Microsoft Face Detect into Home Assistant."
date: 2017-01-25 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: microsoft.png
ha_category: Image Processing
featured: false
ha_release: 0.38
---

The `microsoft_face_detect` image processing platform allows you to use the [Microsoft Face Identify](https://www.microsoft.com/cognitive-services/en-us/) API through Home Assistant. This platform enables you do detect face on camera and fire an event with attributes.

Please refer to the [component](/components/microsoft_face/) configuration on how to setup the API key.

For using the result inside an automation rule, take a look at the [component](/components/image_processing/) page.

### {% linkable_title Configuration Home Assistant %}

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: microsoft_face_detect
    source:
      - entity_id: camera.door
```

Configuration variables:

- **confidence** (*Optional*): The minimum of confidence in percent to process with Home Assistant. Defaults to 80.
- **source** array (*Required*): List of image sources.
  - **entity_id** (*Required*): A camera entity id to get picture from.
  - **name** (*Optional*): This parameter allows you to override the name of your `image_processing` entity.
- **attributes** array (*Optional*): The image search attributes. Supported: `age`, `gender`, `glasses`. Default `age`, `gender`.
