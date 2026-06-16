---
title: "Scene on"
action: insteon.scene_on
domain: insteon
description: "Triggers an Insteon scene to turn on."
related_actions:
  - insteon.scene_off
---

The **Scene on** action triggers an Insteon scene to turn on. An Insteon scene is a grouping of devices that respond together, identified by a group or scene number.

This is useful when you want an automation to activate a scene that is stored on your Insteon devices, so all the linked devices switch on at once without Home Assistant controlling each one individually.

{% include actions/ui_header.md %}

To turn on an Insteon scene from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Insteon: Scene on**.
6. Enter the **Group** number of the scene to turn on.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Group:
  description: The Insteon group or scene number to turn on.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `insteon.scene_on`. A basic example looks like this:

{% example %}
action: |
  action: insteon.scene_on
  data:
    group: 25
{% endexample %}

This turns on Insteon scene 25.

### Options in YAML

{% options_yaml %}
group:
  description: >
    The Insteon group or scene number to turn on.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
