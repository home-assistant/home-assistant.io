---
title: "Reset a utility meter"
action: utility_meter.reset
domain: utility_meter
description: "Resets all counters of a utility meter back to zero."
related_actions:
  - utility_meter.calibrate
---

Use this action to reset a utility meter. All sensors tracking tariffs for that meter are set back to zero, and the previous value is stored so you can still compare against it. This is handy when you want to start a fresh billing period on demand, for example at the start of a new contract.

{% note %}
This action targets the meter's tariff select entity, which only exists when you have configured tariffs for the meter.
{% endnote %}

{% include actions/ui_header.md %}

To reset a utility meter from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the utility meter you want to reset.
6. From the actions shown for that target, select **Reset**.
7. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `utility_meter.reset`. A basic example looks like this:

{% example %}
action: |
  action: utility_meter.reset
  target:
    entity_id: select.energy
{% endexample %}

{% include actions/targets.md domain="select" %}

## Good to know

- Resetting stores the previous meter value in an attribute, so you can still compare the last period against the new one.

{% include actions/stuck.md %}

{% include actions/related.md %}
