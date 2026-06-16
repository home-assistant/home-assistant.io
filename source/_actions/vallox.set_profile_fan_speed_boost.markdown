---
title: "Set profile fan speed boost"
action: vallox.set_profile_fan_speed_boost
domain: vallox
description: "Sets the fan speed of the Boost profile on a Vallox ventilation unit."
related_actions:
  - vallox.set_profile_fan_speed_home
  - vallox.set_profile_fan_speed_away
  - vallox.set_profile
---

Use this action to set the fan speed of the `Boost` profile on your Vallox ventilation unit.

{% include actions/ui_header.md %}

To set the Boost profile fan speed from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Vallox: Set profile fan speed boost**.
6. Set the **Fan speed**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Fan speed:
  description: The fan speed as a percentage, between 0 and 100.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `vallox.set_profile_fan_speed_boost`. A basic example looks like this:

{% example %}
action: |
  action: vallox.set_profile_fan_speed_boost
  data:
    fan_speed: 80
{% endexample %}

This sets the Boost profile fan speed to 80%.

### Options in YAML

{% options_yaml %}
fan_speed:
  description: The fan speed as a percentage, between 0 and 100.
  required: true
  type: integer
{% endoptions_yaml %}

This action does not support targets.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
