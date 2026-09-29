---
title: "Turn on alert"
action: alert.turn_on
domain: alert
description: "Removes the acknowledgement of an alert, so it sends notifications again."
related_actions:
  - alert.turn_off
  - alert.toggle
---

Use this action to undo the acknowledgement of an [alert](/integrations/alert/). If the problem the alert warns about is still there, the alert sends notifications again.

The alert changes back to the state `on`.

{% include actions/ui_header.md %}

To turn an alert back on from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the alert.
6. From the actions shown for that target, select **Turn on**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `alert.turn_on`. A basic example looks like this:

{% example %}
action: |
  action: alert.turn_on
  target:
    entity_id: alert.garage_door
{% endexample %}

This turns the `alert.garage_door` alert back on.

{% include actions/targets.md %}

## Good to know

- The notifications resume at the next scheduled reminder, not right away.
- If the alert isn't active, this action has no effect.
- To silence an alert, use [Acknowledge alert](/actions/alert.turn_off/).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
