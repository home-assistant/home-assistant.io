---
title: OpenCV
description: Instructions on how to integrate OpenCV image processing into Home Assistant.
ha_category:
  - Image Processing
ha_iot_class: Local Push
ha_release: 0.47
ha_domain: opencv
ha_integration_type: integration
---

[OpenCV](https://www.opencv.org/) is an open source computer vision image and video processing library.

Some pre-defined classifiers can be found [here](https://github.com/opencv/opencv/tree/master/data).

## Configuration

To setup OpenCV with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: opencv
    source:
      - entity_id: camera.front_door
    classifier:
      mom: /path/to/classifier.xml
```

- **source** array (*Required*): List of image sources.
  - **entity_id** (*Required*): A camera entity id to get picture from.
    - **name** (*Optional*): This parameter allows you to override the name of your `image_processing` entity.
- **classifier** (*Optional*): Dictionary of name to path to the classifier XML file. If this field is not provided, a face classifier will be downloaded from OpenCV's GitHub repository.

**classifier** may also be defined as a dictionary of names to classifier configurations:

```yaml
    mom:
      file: /path/to/classifier/xml
      neighbors: 4
      min_size: (40, 40)
      scale: 1.1f
```

- **file** (*Required*): The path to the classifier XML file.
- **scale** (*Optional*): The scale to perform when processing, this is a `float` value that must be greater than or equal to `1.0`, default is `1.1`.
- **neighbors** (*Optional*): The minimum number of neighbors required for a match, default is `4`. The higher this number, the more picky the matching will be; lower the number, the more false positives you may experience.
