---
layout: page
title: "OpenCV"
description: "Instructions how to integrate OpenCV image processing into Home Assistant."
date: 2017-01-25 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: OpenCV_Logo.png
ha_category: Image Processing
featured: false
ha_release: 0.38
---

The `opencv` image processing platform allows you to create a standalone image processor without the linked camera entity as mentioned in the [OpenCV page](https://home-assistant.io/components/opencv).

### {% linkable_title Configuration Home Assistant %}

```yaml
opencv:
  - name: Detect Face
    entity_id:
      - camera.front_door
      - camera.living_room
    classifier:
      - file_path: /path/to/classifier/face.xml
        name: face
      - file_path: /path/to/classifier/face_profile.xml
        name: face profile
        min_size: (20, 20)
        scale: 1.6
        neighbors: 5
```

Configuration variables:

- **name** (*Required*): The name of the OpenCV image processor.
- **entity_id** (*Required*): The camera entity or list of camera entities that this classification group will be applied to.
- **classifier** (*Optional*): The classification configuration for to be applied, if not specified, the following defaults will be applied:
  - **file_path** (*Optional*): The path to the HAARS or LBP classification file (xml), the default is `lbp_frontalface.xml`.
  - **name** (*Optional*): The classification name, the default is `Face`.
  - **min_size** (*Optional*): The minimum size for detection as a tuple `(width, height)`, the default is `(30, 30)`.
  - **scale** (*Optional*): The scale to perform when processing, this is a `float` value that must be greater than or equal to `1.0`, default is `1.1`.
  - **neighbors** (*Optional*): The minimum number of neighbors required for a match, default is `4`. The higher this number, the more picky the matching will be; lower the number, the more false positives you may experience.
