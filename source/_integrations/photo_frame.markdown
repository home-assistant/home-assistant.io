---
title: Photo Frame
description: Instructions on how to set up Photo Frame in Home Assistant.
ha_category:
  - Image
  - Utility
ha_release: 2026.3
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

The **Photo Frame** {% term integration %} creates an [image entity](/integrations/image/) based on a [media source directory](/integrations/media_source) selected during integration setup. From the selected directory, a single image will be randomly chosen and presented in the image entity.
This image entity can be used to display a dynamic picture in a frontend picture card, or as a dynamic view background.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Name:
  description: The name of the config entry and created image entity.
Media:
  description: The media folder from which images will be chosen.
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

