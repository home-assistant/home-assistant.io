---
title: "Stop vacuum"
action: vacuum.stop
domain: romy
description: "Stops a ROMY vacuum."
---

Use this action to stop a ROMY vacuum.

{% include actions/ui_header.md %}

To stop cleaning from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the ROMY vacuum.
6. From the actions shown for that target, select **Stop vacuum**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `vacuum.stop`. A basic example looks like this:

{% example %}
action: |
  action: vacuum.stop
  target:
    entity_id: vacuum.romy
{% endexample %}

This stops `vacuum.romy`.

### Options in YAML

This action has no additional options.

{% include actions/targets.md domain="vacuum" %}

## Good to know

Use [Return to base](/actions/romy.return_to_base/) if you want the vacuum to return to its dock after stopping.

{% include actions/stuck.md %}

{% include actions/related.md %}
