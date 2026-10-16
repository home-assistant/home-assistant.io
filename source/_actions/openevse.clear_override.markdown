---
title: "Clear manual override"
action: openevse.clear_override
domain: openevse
description: "Clears any active manual override, restoring automatic control."
---

Use this action to clear any active manual override on your OpenEVSE charger and restore automatic control.

{% include actions/ui_header.md %}

To clear a manual override from an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the OpenEVSE device or entity you want to manage.
6. From the actions shown for that target, select **Clear manual override**.
7. Select **Save**.

This action has no additional options in the UI beyond choosing the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `openevse.clear_override`.

{% example %}
action: |
  action: openevse.clear_override
  target:
    entity_id: switch.openevse_manual_override
{% endexample %}

{% include actions/targets.md %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
