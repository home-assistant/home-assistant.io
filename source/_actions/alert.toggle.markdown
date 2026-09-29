---
title: "Toggle alert"
action: alert.toggle
domain: alert
description: "Acknowledges an alert, or removes the acknowledgement if it's already acknowledged."
related_actions:
  - alert.turn_off
  - alert.turn_on
---

Use this action to switch an [alert](/integrations/alert/) between acknowledged and not acknowledged. If the alert is sending notifications, it's acknowledged and stops. If it's already acknowledged, it starts sending notifications again.

{% include actions/ui_header.md %}

To toggle an alert from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the alert.
6. From the actions shown for that target, select **Toggle**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `alert.toggle`. A basic example looks like this:

{% example %}
action: |
  action: alert.toggle
  target:
    entity_id: alert.garage_door
{% endexample %}

This toggles the `alert.garage_door` alert.

{% include actions/targets.md %}

## Good to know

- An acknowledgement only lasts while the alert is active. The next time the alert starts, it sends notifications again.
- If the alert is set up with `can_acknowledge: false`, toggling it to acknowledged fails with an error.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
