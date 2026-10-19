---
title: "Reload input buttons"
action: input_button.reload
domain: input_button
description: "Reloads the input button helpers from the YAML configuration."
related_actions:
  - input_button.press
---

Use this action to reload the input button helpers you configured in YAML, without restarting Home Assistant. Helpers you created through the UI are not affected.

{% include actions/ui_header.md %}

To reload the input button helpers from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Input button: Reload input buttons**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `input_button.reload`. A basic example looks like this:

{% example %}
action: |
  action: input_button.reload
{% endexample %}

This reloads the input button helpers from your YAML configuration.

### Options in YAML

This action has no additional options in YAML.

## Good to know

- Run this action after you change the input button helpers in your YAML configuration so the changes take effect without a restart.
- Only administrators can run this action.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
