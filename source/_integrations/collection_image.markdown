---
title: Collection image
description: Instructions on how to set up Collection image in Home Assistant.
ha_category:
  - Image
  - Utility
ha_release: 2026.9
ha_iot_class: Calculated
ha_codeowners:
  - '@karwosts'
ha_domain: collection_image
ha_config_flow: true
ha_platforms:
  - image
ha_integration_type: service
ha_quality_scale: bronze
---

The **Collection image** {% term integration %} creates an [image entity](/integrations/image/) based on a [media source directory](/integrations/media_source) selected during integration setup. From the selected directory, a single image will be randomly chosen and presented in the image entity.
This image entity can be used to display a dynamic picture in a frontend picture card, or as a dynamic view background.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Media:
  description: The media folder from which images will be chosen.
{% endconfiguration_basic %}

{% include integrations/actions.md %}

## Example usage

When running the configuration flow, you are prompted to choose a media directory. The integration assumes you have already setup either a local media source or another integration providing a media source. In the popup media browser, navigate to a desired folder containing your desired images and click the 'Pick' option at the top of the dialog to select the folder, and finally click 'Create' to finish the configuration flow. If for example you pick a folder called 'Family Pictures', this will create a new entity called `image.family_pictures_collection`. This entity can be used in one of two ways:

 - A card like a picture card can use the image entity directly. Create a new card on the frontend and in the entity browser, find your new `image` entity. Click it and select a picture card, and it will be placed on your dashboard, showing a random picture from the collection. Anytime you call the `shuffle` service targeting this entity, a new image will be chosen and automatically update the dashboard. You can even set the picture card with a tap action to shuffle on click, so a new image will be cycled anytime you click on the card (example):

```yaml
type: picture
image_entity: image.family_pictures_collection
tap_action:
  action: perform-action
  perform_action: collection_image.shuffle
  target:
    entity_id: image.family_pictures_collection
```  

 - Another option is using this image entity as a dashboard background. In this case you will not target the image entity directly, but pick its corresponding element in the media browser. In the view background options, click "Select from media" to launch the media browser again. In this case choose the top level "Image" folder, and inside this there will be an item called 'Family Pictures Collection'. This can also be dynamically shuffled based on any automation or UI button of your choice.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

