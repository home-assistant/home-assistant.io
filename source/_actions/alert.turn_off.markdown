---
title: "Acknowledge alert"
action: alert.turn_off
domain: alert
description: "Acknowledges an alert, so it stops sending notifications."
related_actions:
  - alert.turn_on
  - alert.toggle
---

Use this action to acknowledge an [alert](/integrations/alert/). The alert stops sending repeating notifications, even though the problem it warns about is still there. For example, you know the garage door is open, and you don't need more reminders.

An acknowledged alert has the state `off`. Selecting the toggle of the alert entity on a dashboard does the same.

{% include actions/ui_header.md %}

To acknowledge an alert from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the alert.
6. From the actions shown for that target, select **Turn off**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `alert.turn_off`. A basic example looks like this:

{% example %}
action: |
  action: alert.turn_off
  target:
    entity_id: alert.garage_door
{% endexample %}

This acknowledges the `alert.garage_door` alert.

{% include actions/targets.md %}

## Good to know

- An acknowledgement only lasts while the alert is active. The next time the alert starts, it sends notifications again.
- When the problem is resolved, you still get the done message, if the alert has one.
- If the alert is set up with `can_acknowledge: false`, it can't be acknowledged, and this action fails with an error.
- To start the notifications again, use [Turn on alert](/actions/alert.turn_on/).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
