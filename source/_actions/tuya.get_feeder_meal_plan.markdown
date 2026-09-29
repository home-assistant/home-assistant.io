---
title: "Get feeder meal plan data"
action: tuya.get_feeder_meal_plan
domain: tuya
description: "Retrieves the feeding schedule from a Tuya pet feeder."
related_actions:
  - tuya.set_feeder_meal_plan
---

Use this action to read the feeding schedule from a Tuya pet feeder. A common use is to check the current schedule before you change it, so you can build the new plan on top of what is already there.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get a feeder meal plan from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Get feeder meal plan data**.
6. Set **Device** to the Tuya feeder you want to read.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Tuya feeder to read the meal plan from.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tuya.get_feeder_meal_plan`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: tuya.get_feeder_meal_plan
  data:
    device_id: 1234567890abcdef1234567890abcdef
  response_variable: feeder_plan
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The Tuya feeder to read the meal plan from.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The action returns the feeder's meal plan in a `meal_plan` field. The meal plan is a list of scheduled feedings, each with the following:

- `days`: The days of the week the feeding runs on.
- `time`: The time of day the feeding runs, in `HH:MM` format.
- `portion`: The amount of food to dispense.
- `enabled`: Whether the scheduled feeding is active.

## Good to know

- Only Tuya feeders that support meal plans work with this action. For other devices, the action reports that the meal plan is not supported.

{% include actions/stuck.md %}

{% include actions/related.md %}
