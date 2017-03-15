---
layout: page
title: "OpenCV"
description: "Instructions how to setup OpenCV within Home Assistant."
date: 2017-04-01 22:36
sidebar: true
comments: false
sharing: true
footer: true
logo: OpenCV_Logo.png
ha_category: Hub
ha_release: 0.40
ha_iot_class: "Local Push"
---

[OpenCV](https://www.opencv.org) is an open source computer vision image and video processing library.

Some pre-defined classifiers can be found here: http://alereimondo.no-ip.org/OpenCV/34

### {% linkable_title Configuration %}

To setup OpenCV with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
opencv:
  classifier_group:
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
          color: (255, 0, 0)
          scale: 1.6
          neighbors: 5
```

Configuration variables:

- **name** (*Required*): The name of the OpenCV image processor.
- **entity_id** (*Required*): The camera entity or list of camera entities that this classification group will be applied to.
- **classifier** (*Required*): The classification configuration for to be applied:
  - **file_path** (*Required*): The path to the HAARS or LBP classification file (xml).
  - **name** (*Optional*): The classification name, the default is `Face`.
  - **min_size** (*Optional*): The minimum size for detection as a tuple `(width, height)`, the default is `(30, 30)`.
  - **color** (*Optional*): The color, as a tuple `(Blue, Green, Red)` to draw the rectangle when linked to a dispatcher camera, the default is `(255, 255, 0)`.
  - **scale** (*Optional*): The scale to perform when processing, this is a `float` value that must be greater than or equal to `1.0`, default is `1.1`.
  - **neighbors** (*Optional*): The minimum number of neighbors required for a match, default is `4`. The higher this number, the more picky the matching will be; lower the number, the more false positives you may experience.

Once OpenCV is configured, it will create an `image_processing` entity for each classification group/camera entity combination as well as a camera so you can see what Home Assistant sees.
