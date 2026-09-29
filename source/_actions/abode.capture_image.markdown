---
title: "Capture image"
action: abode.capture_image
domain: abode
description: "Requests a new still image from an Abode camera."
related_actions:
  - abode.change_setting
  - abode.trigger_automation
---

The **Capture image** action requests a new still image from an Abode camera.

This is handy when you want an up-to-date image from an automation or a script, for example when a door opens.

{% include actions/ui_header.md %}

To capture an image from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Abode: Capture image**.
6. Select the **Entity** to request an image from.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: The Abode camera, or cameras, to request an image from.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `abode.capture_image`. A basic example looks like this:

{% example %}
action: |
  action: abode.capture_image
  data:
    entity_id: camera.front_door
{% endexample %}

This requests a new still image from `camera.front_door`.

### Options in YAML

{% options_yaml %}
entity_id:
  description: >
    The entity ID, or list of entity IDs, of the Abode cameras to request an
    image from.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- When the image is captured, an `abode_capture` event is fired, which you can use as a trigger in other automations.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
