---
title: "Boost heating on"
action: hive.boost_heating_on
domain: hive
description: "Boosts a Hive heating zone or radiator valve to a target temperature for a set time."
related_actions:
  - hive.boost_heating_off
  - hive.boost_hot_water
---

The **Boost heating on** action sets a Hive heating zone to boost for a set time at a target temperature. You can boost a whole zone or an individual radiator valve (TRV) the same way. When the time runs out, the zone returns to its schedule.

{% include actions/ui_header.md %}

To boost heating from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the heating zone or radiator valve you want to boost.
6. From the actions shown for that target, select **Boost heating on**.
7. Enter the **Time period**, and optionally a **Temperature**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Time period:
  description: The length of time the boost should last, for example 01:30:00.
  required: true
Temperature:
  description: The target temperature to hold during the boost, in degrees. Defaults to 25.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hive.boost_heating_on`. A basic example looks like this:

{% example %}
action: |
  action: hive.boost_heating_on
  target:
    entity_id: climate.heating
  data:
    time_period: "01:30:00"
    temperature: 20.5
{% endexample %}

This boosts `climate.heating` to 20.5 degrees for one and a half hours.

### Options in YAML

{% options_yaml %}
time_period:
  description: >
    The length of time the boost should last, for example 01:30:00.
  required: true
  type: string
temperature:
  description: >
    The target temperature to hold during the boost, in degrees.
  required: false
  type: float
  default: 25
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
