---
title: "Set fan timer"
action: nest.set_fan_timer
domain: nest
description: "Sets the Nest thermostat fan to run for a specific duration."
---

The **Set fan timer** action sets the fan to run for a specific duration. The SDM API supports a maximum duration of 12 hours.

{% include actions/ui_header.md %}

To set the fan timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Nest: Set fan timer**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in. You can also select a device or a specific entity.
7. Set the duration for the fan to run.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: "The duration the fan should run for. The maximum supported duration is 12 hours."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `nest.set_fan_timer`. A basic example looks like this:

{% example %}
action: |
  action: nest.set_fan_timer
  target:
    entity_id: climate.upstairs
  data:
    duration:
      minutes: 15
{% endexample %}

This sets the upstairs thermostat fan to run for 15 minutes.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
duration:
  description: "The duration the fan should run for, for example, `minutes: 15`. The SDM API supports a maximum duration of 12 hours."
  required: true
  type: time
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The SDM API supports a maximum duration of 12 hours.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
