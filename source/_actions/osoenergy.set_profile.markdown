---
title: "Set heater profile"
action: osoenergy.set_profile
domain: osoenergy
description: "Sets the temperature profile of an OSO Energy water heater."
related_actions:
  - osoenergy.get_profile
---

Use this action to set the temperature profile of a water heater. You set a target temperature for each hour of the day, in your local time. Each temperature must be between 10 and 75 degrees Celsius.

You only need to provide the hours you want to change. Hours you leave out keep their current value.

{% include actions/ui_header.md %}

To set the heater profile from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the water heater you want to set.
6. From the actions shown for that target, select **OSO Energy: Set heater profile**.
7. Set the target temperature for each hour you want to change.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Hour 00:
  description: The target temperature at 00:00 local time, in degrees Celsius.
  required: false
Hour 01:
  description: The target temperature at 01:00 local time, in degrees Celsius.
  required: false
Hour 02:
  description: The target temperature at 02:00 local time, in degrees Celsius.
  required: false
Hour 03:
  description: The target temperature at 03:00 local time, in degrees Celsius.
  required: false
Hour 04:
  description: The target temperature at 04:00 local time, in degrees Celsius.
  required: false
Hour 05:
  description: The target temperature at 05:00 local time, in degrees Celsius.
  required: false
Hour 06:
  description: The target temperature at 06:00 local time, in degrees Celsius.
  required: false
Hour 07:
  description: The target temperature at 07:00 local time, in degrees Celsius.
  required: false
Hour 08:
  description: The target temperature at 08:00 local time, in degrees Celsius.
  required: false
Hour 09:
  description: The target temperature at 09:00 local time, in degrees Celsius.
  required: false
Hour 10:
  description: The target temperature at 10:00 local time, in degrees Celsius.
  required: false
Hour 11:
  description: The target temperature at 11:00 local time, in degrees Celsius.
  required: false
Hour 12:
  description: The target temperature at 12:00 local time, in degrees Celsius.
  required: false
Hour 13:
  description: The target temperature at 13:00 local time, in degrees Celsius.
  required: false
Hour 14:
  description: The target temperature at 14:00 local time, in degrees Celsius.
  required: false
Hour 15:
  description: The target temperature at 15:00 local time, in degrees Celsius.
  required: false
Hour 16:
  description: The target temperature at 16:00 local time, in degrees Celsius.
  required: false
Hour 17:
  description: The target temperature at 17:00 local time, in degrees Celsius.
  required: false
Hour 18:
  description: The target temperature at 18:00 local time, in degrees Celsius.
  required: false
Hour 19:
  description: The target temperature at 19:00 local time, in degrees Celsius.
  required: false
Hour 20:
  description: The target temperature at 20:00 local time, in degrees Celsius.
  required: false
Hour 21:
  description: The target temperature at 21:00 local time, in degrees Celsius.
  required: false
Hour 22:
  description: The target temperature at 22:00 local time, in degrees Celsius.
  required: false
Hour 23:
  description: The target temperature at 23:00 local time, in degrees Celsius.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `osoenergy.set_profile`. A basic example looks like this:

{% example %}
action: |
  action: osoenergy.set_profile
  target:
    entity_id: water_heater.heater
  data:
    hour_06: 75
    hour_07: 75
    hour_18: 60
{% endexample %}

This sets a higher target temperature in the morning and a lower one in the evening.

### Options in YAML

{% options_yaml %}
hour_00:
  description: >
    The target temperature at 00:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_01:
  description: >
    The target temperature at 01:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_02:
  description: >
    The target temperature at 02:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_03:
  description: >
    The target temperature at 03:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_04:
  description: >
    The target temperature at 04:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_05:
  description: >
    The target temperature at 05:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_06:
  description: >
    The target temperature at 06:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_07:
  description: >
    The target temperature at 07:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_08:
  description: >
    The target temperature at 08:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_09:
  description: >
    The target temperature at 09:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_10:
  description: >
    The target temperature at 10:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_11:
  description: >
    The target temperature at 11:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_12:
  description: >
    The target temperature at 12:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_13:
  description: >
    The target temperature at 13:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_14:
  description: >
    The target temperature at 14:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_15:
  description: >
    The target temperature at 15:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_16:
  description: >
    The target temperature at 16:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_17:
  description: >
    The target temperature at 17:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_18:
  description: >
    The target temperature at 18:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_19:
  description: >
    The target temperature at 19:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_20:
  description: >
    The target temperature at 20:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_21:
  description: >
    The target temperature at 21:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_22:
  description: >
    The target temperature at 22:00 local time, in degrees Celsius.
  required: false
  type: integer
hour_23:
  description: >
    The target temperature at 23:00 local time, in degrees Celsius.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="water_heater" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
