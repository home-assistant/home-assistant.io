---
title: "Reload timers"
action: timer.reload
domain: timer
description: "Reloads timers from the YAML configuration."
related_actions:
  - timer.start
  - timer.pause
  - timer.cancel
  - timer.finish
  - timer.change
---

Use this action to reload your timers from the YAML configuration. This is handy when you have changed your YAML-defined timers and want Home Assistant to apply those changes without restarting.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To reload timers from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Reload timers**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `timer.reload`. A basic example looks like this:

{% example %}
action: |
  action: timer.reload
{% endexample %}

### Options in YAML

This action has no options.

## Good to know

- The **Reload timers** action applies only to timers configured in YAML. Timers created from the UI are stored in Home Assistant, so reloading does not add, update, or remove them.

{% include actions/stuck.md %}

{% include actions/related.md %}
