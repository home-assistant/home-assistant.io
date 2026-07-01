---
title: "Return to base"
action: vacuum.return_to_base
domain: romy
description: "Sends a ROMY vacuum back to its base."
---

Use this action to send a ROMY vacuum back to its base.

{% include actions/ui_header.md %}

To send the vacuum back to its base from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the ROMY vacuum.
6. From the actions shown for that target, select **Return to base**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `vacuum.return_to_base`. A basic example looks like this:

{% example %}
action: |
  action: vacuum.return_to_base
  target:
    entity_id: vacuum.romy
{% endexample %}

This sends `vacuum.romy` back to its base.

### Options in YAML

This action has no additional options.

{% include actions/targets.md domain="vacuum" %}

## Good to know

The vacuum must be able to navigate back to its base.

{% include actions/stuck.md %}

{% include actions/related.md %}
