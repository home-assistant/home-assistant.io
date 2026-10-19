---
title: "Reload schedules"
action: schedule.reload
domain: schedule
description: "Reloads schedules from your YAML configuration."
related_actions:
  - schedule.get_schedule
---

Use this action to reload your schedules from your YAML configuration without restarting Home Assistant. This is handy after you edit a schedule in {% term "`configuration.yaml`" %} and want to apply the change right away.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To reload your schedules from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Schedule: Reload schedules**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `schedule.reload`. A basic example looks like this:

{% example %}
action: |
  action: schedule.reload
{% endexample %}

### Options in YAML

This action has no options.

## Good to know

- This action only reloads schedules defined in YAML. Schedules you created in the user interface are not affected.

{% include actions/stuck.md %}

{% include actions/related.md %}
