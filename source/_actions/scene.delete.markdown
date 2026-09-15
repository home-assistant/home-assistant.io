---
title: "Delete scene"
action: scene.delete
domain: scene
description: "Deletes a scene that was created on the fly."
related_actions:
  - scene.create
  - scene.turn_on
  - scene.reload
---

Use this action to remove a scene that was created with the [Create scene](/actions/scene.create/) action. This is useful when you no longer need a temporary scene and want to keep your list of scenes tidy.

{% include actions/ui_header.md %}

To delete a scene from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the scene you want to delete.
6. From the actions shown for that target, select **Delete scene**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `scene.delete`. A basic example looks like this:

{% example %}
action: |
  action: scene.delete
  target:
    entity_id: scene.my_scene
{% endexample %}

This removes the `scene.my_scene` scene.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works on scenes created with [Create scene](/actions/scene.create/). If you point it at a scene from your YAML configuration, the action fails and an error appears in your logs.
- To remove a scene defined in YAML, remove it from your configuration and run [Reload scenes](/actions/scene.reload/).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
