---
title: "Turn on heating"
action: osoenergy.turn_on
domain: osoenergy
description: "Turns on heating for an OSO Energy water heater."
related_actions:
  - osoenergy.turn_off
---

Use this action to turn on the heating of a water heater. You can turn it on for one hour, or until the maximum temperature is reached.

{% include actions/ui_header.md %}

To turn on the heating from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the water heater you want to turn on.
6. From the actions shown for that target, select **OSO Energy: Turn on heating**.
7. Set **Until temp limit** to choose whether to turn on until the maximum temperature is reached, or for one hour.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Until temp limit:
  description: Turn the heating on until the maximum temperature is reached when enabled, or for one hour when disabled.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `osoenergy.turn_on`. A basic example looks like this:

{% example %}
action: |
  action: osoenergy.turn_on
  target:
    entity_id: water_heater.heater
  data:
    until_temp_limit: true
{% endexample %}

This turns on the heating until the maximum temperature is reached.

### Options in YAML

{% options_yaml %}
until_temp_limit:
  description: >
    Turn the heating on until the maximum temperature is reached when set
    to true, or for one hour when set to false.
  required: true
  type: boolean
{% endoptions_yaml %}

{% include actions/targets.md domain="water_heater" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
