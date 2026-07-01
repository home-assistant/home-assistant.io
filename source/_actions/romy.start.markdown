---
title: "Start vacuum"
action: vacuum.start
domain: romy
description: "Starts cleaning with a ROMY vacuum."
---

Use this action to start cleaning with a ROMY vacuum.

{% include actions/ui_header.md %}

To start cleaning from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the ROMY vacuum.
6. From the actions shown for that target, select **Start vacuum**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `vacuum.start`. A basic example looks like this:

{% example %}
action: |
  action: vacuum.start
  target:
    entity_id: vacuum.romy
{% endexample %}

This starts cleaning with `vacuum.romy`.

### Options in YAML

This action has no additional options.

{% include actions/targets.md domain="vacuum" %}

## Good to know

The vacuum must be available and ready to start cleaning.

{% include actions/stuck.md %}

{% include actions/related.md %}
