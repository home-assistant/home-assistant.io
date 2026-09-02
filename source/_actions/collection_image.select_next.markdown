---
title: "Select next"
action: collection_image.select_next
domain: collection_image
description: "Update the image entity to the next image from the configured media."
---

Use this action to select the next image from the configured media for a collection image entity.

{% include actions/ui_header.md %}

To update the image from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select your collection_image entity.
6. From the actions shown for that target, select **Select next**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Wrap:
  description: When true, on reaching the end of the directory, the next `select_next` operation will advance to the first item. If false, the last image will remain selected.
  default: false
{% endoptions_ui %}


{% include actions/yaml_header.md %}

In YAML, refer to this action as `collection_image.select_next`. A basic example looks like this:

{% example %}
action: |
  action: collection_image.select_next
  target:
    entity_id: image.my_photos
{% endexample %}

{% include actions/targets.md domain="image" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}
