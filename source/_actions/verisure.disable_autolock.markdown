---
title: "Disable autolock"
action: verisure.disable_autolock
domain: verisure
description: "Disables autolock on a Verisure Lockguard Smartlock."
related_actions:
  - verisure.enable_autolock
  - verisure.capture_smartcam
---

Use this action to disable autolock on a Verisure Lockguard Smartlock. When autolock is off, the lock stays unlocked until it is locked manually or by another action.

{% include actions/ui_header.md %}

To disable autolock from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Verisure: Disable autolock**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), select the lock you want to update.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `verisure.disable_autolock`. A basic example looks like this:

{% example %}
action: |
  action: verisure.disable_autolock
  target:
    entity_id: lock.front_door
{% endexample %}

{% include actions/targets.md domain="lock" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
