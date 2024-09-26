---
title: Image processing
description: Instructions on how to setup image processing with Home Assistant.
ha_category:
  - Image processing
ha_release: 0.36
ha_domain: image_processing
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

Image processing enables Home Assistant to process images from [cameras](/integrations/#camera). Only camera entities are supported as sources.

{% include integrations/building_block_integration.md %}

## The state of an image processing entity

For face recognition applications, the state of an image processing entity can be the name of the detected person or motion that was detected.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## ALPR

ALPR entities have a vehicle counter attribute `vehicles` and all found plates are stored in the `plates` attribute.

The `found_plate` event is triggered after OpenALPR has found a new license plate.

```yaml
# Example configuration.yaml automation entry
automation:
- alias: "Open garage door"
  triggers:
    - trigger: event
      event_type: image_processing.found_plate
      event_data:
        entity_id: openalpr.camera_garage_1
        plate: BE2183423
...
```

The following event attributes will be present (platform-dependent): `entity_id`, `plate`, `confidence`

## Face

Face entities have a face counter attribute `total_faces` and all face data is stored in the `faces` attribute.

The `detect_face` event is triggered after a Face entity has found a face.

```yaml
# Example configuration.yaml automation entry
automation:
- alias: "Known person in front of my door"
  triggers:
    - trigger: event
      event_type: image_processing.detect_face
      event_data:
        entity_id: image_processing.door
        name: "Hans Maier"
...
```

The following event attributes will be present (platform-dependent): `entity_id`, `name`, `confidence`, `age`, `gender`, `motion`, `glasses`

## scan_interval and optimizing Resources

Image processing integrations process the image from a camera at a fixed period given by the `scan_interval`. This leads to excessive processing if the image on the camera hasn't changed, as the default `scan_interval` is 10 seconds. You can override this by adding to your configuration `scan_interval: 10000` (setting the interval to 10,000 seconds), and then call the `image_processing.scan` action when you actually want to perform processing.

```yaml
# Example configuration.yaml
sensor:
- platform: _AN_IMAGE_PROCESSING_PLATFORM_
  scan_interval: 10000
...
automation:
- alias: "Scan for faces when motion detected"
  triggers:
    - trigger: state
      entity_id: sensor.door_motion_sensor
      to: "on"
  actions:
    - action: image_processing.scan
      target:
        entity_id: image_processing.door
...
```
