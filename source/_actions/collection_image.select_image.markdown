---
title: "Select image"
action: collection_image.select_image
domain: collection_image
description: "Update the image entity to the selected image."
---

Use this action to show a specific image in a collection image entity. The image can be any image from your media sources. It doesn't need to be in the folders configured for the entity.

{% include actions/ui_header.md %}

To update the image from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select your collection_image entity.
6. From the actions shown for that target, select **Select image**.
7. Under **Image**, choose the image to display from the media browser.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Image:
  description: The image to display.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `collection_image.select_image`. A basic example looks like this:

{% example %}
action: |
  action: collection_image.select_image
  target:
    entity_id: image.my_photos
  data:
    image:
      media_content_id: "media-source://media_source/local/photos/beach.jpg"
      media_content_type: "image/jpeg"
{% endexample %}

### Options in YAML

{% options_yaml %}
image:
  description: The image to display.
  required: true
  type: map
  keys:
    media_content_id:
      description: The media source URL of the image, for example `media-source://media_source/local/photos/beach.jpg`.
      type: string
    media_content_type:
      description: The MIME type of the image, for example `image/jpeg`.
      type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="image" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: show a holiday image on New Year's Eve

Show a festive picture on your dashboard on December 31. This example uses the **Date** sensor from the [Time & Date](/integrations/time_date/) integration, and a picture stored in a **holidays** folder in your [local media](/integrations/media_source/#local-media).

- **Trigger**: Template, {% raw %}`{{ states('sensor.date').endswith('-12-31') }}`{% endraw %}
- **Action**: Select image
  - **Target**: My photos (`image.my_photos`)
  - **Image**: `holidays/happy_new_year.jpg`

{% details "YAML example for showing a holiday image on New Year's Eve" %}

{% example %}
automation: |
  alias: "Show a New Year's image on December 31"
  triggers:
    - trigger: template
      value_template: "{{ states('sensor.date').endswith('-12-31') }}"
  actions:
    - action: collection_image.select_image
      target:
        entity_id: image.my_photos
      data:
        image:
          media_content_id: "media-source://media_source/local/holidays/happy_new_year.jpg"
          media_content_type: "image/jpeg"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}
