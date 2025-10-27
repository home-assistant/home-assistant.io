---
title: Sighthound
description: Detect people with Sighthound Cloud.
ha_category:
  - Image processing
ha_release: 0.105
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@robmarkcole'
ha_domain: sighthound
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

Detect people in camera images using [Sighthound Cloud](https://www.sighthound.com/products/cloud). The Sighthound Developer tier (free for non-commercial use) allows 5000 images to be processed per month. If you need more processing per month you will need to sign up for a production account (i.e., a Basic or Pro account).

This {% term integration %} adds an image processing entity where the state of the entity is the number of people detected in an image. For each person detected, an `sighthound.person_detected` event is fired. The event data includes the entity_id of the image processing entity firing the event, and the bounding box around the detected person.

If `save_file_folder` is configured, on each new detection of a person, an annotated image with the name `sighthound_{camera_name}_latest.jpg` is saved in the configured folder if it doesn't already exist, and overwritten if it does exist. The saved image shows the bounding box around detected people and can be displayed on the Home Assistant front end using a [Local File](/integrations/local_file/) camera, and used in notifications. If `save_timestamped_file` is configured as `true`, then the annotated image is saved with a file name that includes the time of detection.

**Note** that by default the {% term integration %} will not automatically scan images, but requires you to call the `image_processing.scan` action, e.g., using an automation triggered by motion.

## Configuration

To enable this {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: sighthound
    api_key: "MY_API_KEY"
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
save_file_folder:
  description: The folder to save annotated images to.
  required: false
  type: string
save_timestamped_file:
  description: Save the processed image with the time of detection in the filename. Requires save_file_folder to be configured.
  required: false
  default: false
  type: boolean
source:
  description: The list of image sources.
  required: true
  type: map
  keys:
    entity_id:
      description: A camera entity id to get a picture from.
      required: true
      type: string
    name:
      description: This parameter allows you to override the name of your `image_processing` entity.
      required: false
      type: string
{% endconfiguration %}

To verify the integration, check if a new entity is appeared as `image_processing.sighthound_my_cam`

## Process an Image

When you want to process an image, you have to call `image_processing.scan` action and listen to the `sighthound.person_detected` and/or `sighthound.vehicle_detected` events.

An example using two automations:

- The first automation is triggered, when a motion is detected. It calls the `image_processing.scan` action to send the camera image to the sighthound server for processing.

- The second automation is triggered by a `sighthound.vehicle_detected` event. It sends a notification to a phone.

```yaml
# Example automations.yaml entry
- alias: "Entrance motion image processing"
  description: "Send a camera image to sighthound, when motion is detected at the entrance"
  triggers:
    - trigger: device
      type: motion
      device_id: YOUR_DEVICE_ID
      entity_id: binary_sensor.my_motion_sensor
      domain: binary_sensor
  actions:
    - action: image_processing.scan
      target:
        entity_id: image_processing.sighthound_my_cam

- alias: "Arriving vehicle notification"
  description: "Send a notification to a phone, when a vehicle is detected at the entrance"
  triggers:
    - trigger: event
      event_type: sighthound.vehicle_detected
  actions:
    - action: notify.mobile_app_my_iphone
      data:
        message: "Somebody has just arrived by car."
```
