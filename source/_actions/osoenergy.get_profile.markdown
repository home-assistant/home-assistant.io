---
title: "Get heater profile"
action: osoenergy.get_profile
domain: osoenergy
description: "Gets the temperature profile of an OSO Energy water heater."
related_actions:
  - osoenergy.set_profile
---

Use this action to get the temperature profile of a water heater. The profile is a list of 24 temperatures, one for each hour of the current day in your local time. For example, the temperature at index 1 corresponds to 01:00 local time.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get the heater profile from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the water heater you want to read.
6. From the actions shown for that target, select **OSO Energy: Get heater profile**.
7. Select **Save**.

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `osoenergy.get_profile`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: osoenergy.get_profile
  target:
    entity_id: water_heater.heater
  response_variable: heater_profile
{% endexample %}

This fetches the temperature profile of `water_heater.heater`.

{% include actions/targets.md domain="water_heater" %}

## Response data

The response is keyed by the water heater entity ID. Each entity contains a `profile` list of 24 temperatures, one for each hour of the current day in your local time.

A shortened example of the response looks like this:

```yaml
water_heater.heater:
  profile:
    - 70
    - 70
    - 70
    # ... one value per hour, 24 in total
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
