---
title: "Reset"
action: utility_meter.reset
domain: utility_meter
description: "Resets all counters of a utility meter back to zero."
related_actions:
  - utility_meter.calibrate
---

The **Reset** action sets all of a utility meter's counters back to zero. Every tariff sensor that belongs to the meter starts counting again from nothing.

Use it to start a fresh measurement period on demand, for example resetting a meter at the start of a new billing cycle or after you swap a device you were tracking.

You target a utility meter through its tariff {% term entity %}, the select entity that tracks the current tariff.

{% include actions/ui_header.md %}

To reset a utility meter from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the utility meter you want to reset.
6. From the actions shown for that target, select **Reset**.
7. Select **Save**.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `utility_meter.reset`. A basic example looks like this:

{% example %}
action: |
  action: utility_meter.reset
  target:
    entity_id: select.daily_energy
{% endexample %}

This resets all counters of the `daily_energy` utility meter.

### Options in YAML

{% options_yaml %}
target:
  description: The utility meter to reset, selected through its tariff select entity.
  required: true
  type: map
{% endoptions_yaml %}

{% include actions/targets.md domain="select" %}

## Good to know

- A utility meter has a tariff select entity when you configure tariffs for it. This is the entity you target to reset the meter.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
