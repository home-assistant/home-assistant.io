---
layout: page
title: "Dlib Face Detect"
description: "Instructions how to integrate Dlib Face Detect into Home Assistant."
date: 2017-05-05 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: dlib.png
ha_category: Image Processing
featured: false
ha_release: 0.44
---

The `dlib_face_detect` image processing platform allows you to use the [Dlib](http://www.dlib.net/) through Home Assistant. This platform enables you do detect face on camera and fire a event with attributes.

For using the result inside an automation rule, take a look at the [component](/components/image_processing/) page.

### {% linkable_title Configuration Home Assistant %}

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: dlib_face_detect
    source:
      - entity_id: camera.door
```

Configuration variables:

- **source** array (*Required*): List of image sources.
  - **entity_id** (*Required*): A camera entity id to get picture from.
  - **name** (*Optional*): This parameter allows you to override the name of your `image_processing` entity.
