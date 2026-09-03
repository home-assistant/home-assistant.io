---
title: "Clear fan sleep timer"
action: modern_forms.clear_fan_sleep_timer
domain: modern_forms
description: "Clears the sleep timer on a Modern Forms fan."
related_actions:
  - modern_forms.set_fan_sleep_timer
  - modern_forms.clear_light_sleep_timer
---

Use this action to clear the sleep timer on a Modern Forms fan. Clearing the timer does not turn the fan off. It only cancels the pending timer.

Sleep timers are not available on all fan models. On a fan without sleep timer support, this action fails with an error.

{% include actions/ui_header.md %}

To clear a fan sleep timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select your Modern Forms fan.
6. From the actions shown for that target, select **Modern Forms: Clear fan sleep timer**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `modern_forms.clear_fan_sleep_timer`. A basic example looks like this:

{% example %}
action: |
  action: modern_forms.clear_fan_sleep_timer
  target:
    entity_id: fan.bedroom
{% endexample %}

{% include actions/targets.md domain="fan" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
