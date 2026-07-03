---
title: "Get image URL"
action: volvo.get_image_url
domain: volvo
description: "Retrieves URLs for vehicle-specific Volvo images."
---

Use this action to retrieve URLs for one or more vehicle-specific Volvo images.

{% include actions/ui_header.md %}

To get Volvo image URLs from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select **Volvo: Get image URL**.
6. Select the vehicle entry.
7. Select one or more image angles, or leave the image list empty to retrieve all available image URLs.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Entry:
  description: The Volvo vehicle entry to retrieve image URLs for.
Images:
  description: The image angles to retrieve. Leave empty to get all available images.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `volvo.get_image_url`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: volvo.get_image_url
  data:
    entry: VOLVO_CONFIG_ENTRY_ID
    images:
      - exterior_front
      - exterior_side_left
  response_variable: volvo_images
{% endexample %}

This retrieves URLs for the selected vehicle image angles.

### Options in YAML

{% options_yaml %}
entry:
  description: The Volvo vehicle entry to retrieve image URLs for.
  required: true
  type: string
images:
  description: The image angles to retrieve. This option accepts a list of image angle values. Leave empty to get all available images.
  required: false
  type: [string, list]
{% endoptions_yaml %}

This action does not support targets.

## Available image angles

- `exterior_back`
- `exterior_back_left`
- `exterior_back_right`
- `exterior_front`
- `exterior_front_left`
- `exterior_front_right`
- `exterior_side_left`
- `exterior_side_right`
- `interior`

## Response data

The action response contains the requested image URLs.

## Good to know

If you leave `images` empty, the action retrieves all available image URLs for the selected vehicle.

{% include actions/stuck.md %}

{% include actions/related.md %}
