---
title: "Reload input texts"
action: input_text.reload
domain: input_text
description: "Reloads the input text helpers from the YAML configuration."
related_actions:
  - input_text.set_value
---

Use this action to reload the input text helpers you configured in YAML, without restarting Home Assistant. Helpers you created through the UI are not affected.

{% include actions/ui_header.md %}

To reload the input text helpers from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Input text: Reload input texts**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Only users with administrator rights can run this action.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `input_text.reload`. A basic example looks like this:

{% example %}
action: |
  action: input_text.reload
{% endexample %}

This reloads the input text helpers from your YAML configuration.

## Good to know

- Run this action after you change the input text helpers in your YAML configuration so the changes take effect without a restart.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
