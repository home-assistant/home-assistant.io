---
title: "Reload scenes"
action: scene.reload
domain: scene
description: "Reloads the scenes from the YAML configuration."
related_actions:
  - scene.turn_on
  - scene.create
---

Use this action to load the scenes from your YAML configuration again, without restarting Home Assistant. Run it after you change your scene configuration so the changes take effect right away.

{% include actions/ui_header.md %}

To reload the scenes from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Scene: Reload scenes**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Only users with administrator rights can run this action.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `scene.reload`. A basic example looks like this:

{% example %}
action: |
  action: scene.reload
{% endexample %}

This reloads the scenes from your YAML configuration.

## Good to know

- Reloading also removes the scenes you created with [Create scene](/actions/scene.create/), because those only live until the scenes are loaded again.
- Scenes you create in the UI are stored separately and are not affected by this action.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
