---
title: Photo Frame
description: Instructions on how to setup Photo Frame in Home Assistant.
ha_category:
  - Image
  - Utility
ha_release: 2025.12
ha_iot_class: Calculated
ha_qa_scale: bronze
ha_codeowners:
  - '@karwosts'
ha_domain: photo_frame
ha_config_flow: true
ha_platforms:
  - image
ha_integration_type: service
ha_quality_scale: bronze
---

The **Photo Frame** {% term integration %} creates an [image entity](/integrations/image/) based on a [media source directory](/integrations/media_source) selected during integration setup. From the selected directory, a single image will be randomly chosen and presented in the image entity. A service is provided to shuffle the entity to a new random image at the user's request.

This image entity can be used to display a dynamic picture in a frontend picture card, or as a dynamic view background.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Name:
  description: The name of the config entry and created image entity.
Media:
  description: The media folder from which images will be chosen.
{% endconfiguration_basic %}

## Actions

### Action: Photo frame shuffle

The `photo_frame.shuffle` action accepts a target, but no other options. When executed, all photo frame image entities selected by the target will update with a new randomly chosen image from their configured directory.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `target` | no | Target of entities which should choose a new image.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

