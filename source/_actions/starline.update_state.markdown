---
title: "Update state"
action: starline.update_state
domain: starline
description: "Fetches the latest state of your StarLine devices from the StarLine server."
---

Use this action to fetch the latest state of your StarLine devices from the StarLine server, instead of waiting for the next scheduled update.

{% include actions/ui_header.md %}

To update the state from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **StarLine: Update state**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `starline.update_state`. A basic example looks like this:

{% example %}
action: |
  action: starline.update_state
{% endexample %}

This fetches the latest state of your StarLine devices.

### Options in YAML

This action has no additional options in YAML.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
