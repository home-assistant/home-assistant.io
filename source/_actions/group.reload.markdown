---
title: "Reload groups"
action: group.reload
domain: group
description: "Reloads the groups from the YAML configuration."
related_actions:
  - group.set
  - group.remove
---

Use this action to reload the groups, entities, and notify services you configured in YAML, without restarting Home Assistant.

{% include actions/ui_header.md %}

To reload the groups from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Group: Reload groups**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `group.reload`. A basic example looks like this:

{% example %}
action: |
  action: group.reload
{% endexample %}

This reloads the groups from your YAML configuration.

## Good to know

- Run this action after you change the groups in your YAML configuration so the changes take effect without a restart.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
