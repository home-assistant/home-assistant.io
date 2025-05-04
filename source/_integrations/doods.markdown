---
title: DOODS - Dedicated Open Object Detection Service
description: Detect and recognize objects with DOODS.
ha_category:
  - Image processing
ha_iot_class: Local Polling
ha_release: '0.100'
ha_domain: doods
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `doods` image processing {% term integration %} allows you to detect and recognize objects in a camera image using [DOODS](https://github.com/snowzach/doods/). The state of the entity is the number of objects detected and recognized objects are listed in the `summary` attribute along with quantity. The `matches` attribute provides the confidence `score` for recognition and the bounding `box` of the object for each detection category.

## Setup

The DOODS software needs to be running before this integration can be used. Options to run the DOODS software:

- Run as [Home Assistant add-on](https://github.com/snowzach/hassio-addons)
- Run as a [Docker container](https://hub.docker.com/r/snowzach/doods)

## Configuration

To enable this integration in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: doods
    url: "http://<my doods server>:8080"
    detector: default
    source:
      - entity_id: camera.front_yard
```

{% configuration %}
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
url:
    description: The URL of the DOODS server.
    required: true
    type: string
auth_key:
    description: The authentication key as set in the DOODS configuration file or as a Docker environment variable (DOODS_AUTH_KEY)
    required: false
    type: string
timeout:
    description: Timeout for requests (in seconds).
    required: false
    type: integer
    default: 90
detector:
    description: The DOODS detector to use.
    required: true
    type: string
confidence:
    description: The default confidence for any detected objects where not explicitly set.
    required: false
    type: float
area:
    description: Global detection area. Objects in this box will be reported. Top of image is 0, bottom is 1.  Same left to right.
    required: false
    type: map
    keys:
      top:
        description: Top line defined as % from top of image.
        required: false
        type: float
        default: 0
      left:
        description: Left line defined as % from left of image.
        required: false
        type: float
        default: 0
      bottom:
        description: Bottom line defined as % from top of image.
        required: false
        type: float
        default: 1
      right:
        description: Right line defined as % from left of image.
        required: false
        type: float
        default: 1
      covers:
        description: If true the detection must be fully in this box. If false any part of the detection in the box will trigger. 
        required: false
        type: boolean
        default: true
file_out:
    description: A [template](/docs/configuration/templating/#processing-incoming-data) for the integration to save processed images including bounding boxes. `camera_entity` is available as the `entity_id` string of the triggered source camera.
    required: false
    type: list
labels:
    description: Information about the selected labels model.
    required: false
    type: map
    keys:
      name:
        description: The label of the object to select for detection.
        required: true
        type: string
      confidence:
       description: The minimum confidence for the selected label.
       required: false
       type: float
      area:
        description: Custom detection area. Only objects fully in this box will be reported. Top of image is 0, bottom is 1.  Same left to right.
        required: false
        type: map
        keys:
          top:
            description: Top line defined as % from top of image.
            required: false
            type: float
            default: 0
          left:
            description: Left line defined as % from left of image.
            required: false
            type: float
            default: 0
          bottom:
            description: Bottom line defined as % from top of image.
            required: false
            type: float
            default: 1
          right:
            description: Right line defined as % from left of image.
            required: false
            type: float
            default: 1
          covers:
            description: If true the detection must be fully in this box. If false any part of the detection in the box will trigger. 
            required: false
            type: boolean
            default: true

{% endconfiguration %}

## Supported labels

Both detectors `default` and `tensorflow` use the labels in [this file](https://raw.githubusercontent.com/amikelive/coco-labels/master/coco-labels-2014_2017.txt).

## Sample configuration

{% raw %}

```yaml
# Example advanced configuration.yaml entry
image_processing:
  - platform: doods
    scan_interval: 1000
    url: "http://<my doods server>:8080"
    timeout: 60
    detector: default
    auth_key: 2up3rL0ng4uthK3y
    source:
      - entity_id: camera.front_yard
    file_out:
      - "/tmp/{{ camera_entity.split('.')[1] }}_latest.jpg"
      - "/tmp/{{ camera_entity.split('.')[1] }}_{{ now().strftime('%Y%m%d_%H%M%S') }}.jpg"
    confidence: 50
    # This global detection area is required for all labels
    area:
      # Exclude top 10% of image
      top: 0.1
      # Exclude right 5% of image
      right: 0.95
      # The entire detection must be inside this box
      covers: true
    labels:
      - name: person
        confidence: 40
        area:
          # Exclude top 10% of image
          top: 0.1
          # Exclude right 15% of image
          right: 0.85
          # Any part of the detection inside this area will trigger
          covers: false
      - car
      - truck
```

{% endraw %}

## Optimizing resources

The [Image processing integration](/components/image_processing/) processes the image from a camera at a fixed period given by the `scan_interval`. This leads to excessive processing if the image on the camera hasn't changed, as the default `scan_interval` is 10 seconds. You can override this by adding to your configuration `scan_interval: 10000` (setting the interval to 10,000 seconds) and then call the `image_processing.scan` action when you actually want to perform processing.

```yaml
# Example advanced configuration.yaml entry
image_processing:
  - platform: doods
    scan_interval: 10000
    source:
      - entity_id: camera.driveway
      - entity_id: camera.backyard
```

```yaml
# Example advanced automations.yaml entry
- alias: "Doods scanning"
  triggers:
     - trigger: state
       entity_id:
         - binary_sensor.driveway
  actions:
    - action: image_processing.scan
      target:
        entity_id: image_processing.doods_camera_driveway
```
