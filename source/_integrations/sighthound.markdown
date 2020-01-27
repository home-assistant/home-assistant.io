---
title: "Sighthound"
description: "Detect people with Sighthound Cloud."
logo: sighthound-logo.png
ha_category:
  - Image Processing
ha_release: 0.105
ha_iot_class: Cloud Polling
---

Adds integration for person detection with [Sighthound Cloud](https://www.sighthound.com/products/cloud). The Sighthound Developer tier (free for non-commercial use) allows 5000 requests per month. If you need more requests per month you will need to sign up for a production account (i.e., Basic or Pro account).

This integration adds an image processing entity where the state of the entity is the number of people detected in an image. For each person detected, an `sighthound.person_detected` event is fired. The event data includes the entity_id of the image processing entity firing the event, and the bounding box around the detected person. 

If `save_file_folder` is configured, on each new detection of a person an annotated image with the name `sighthound_{camera_name}_latest.jpg` is saved in the configured folder if it doesnt already exist, and over-written if it does exist. The saved image shows the bounding box around detected people and can be displayed on the Home Assistant front end using a [local_file](https://www.home-assistant.io/integrations/local_file/) camera, and used in notifications.

**Note** that in order to prevent accidentally using up your requets to Sighthound, by default the component will not automatically scan images, but requires you to call the `image_processing.scan` service e.g. using an automation triggered by motion.

## Configuration

To enable this platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: sighthound
    api_key: some_key
    save_file_folder: /my_dir/
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
