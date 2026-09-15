---
title: "Set feeder meal plan data"
action: tuya.set_feeder_meal_plan
domain: tuya
description: "Sets the feeding schedule on a Tuya pet feeder."
related_actions:
  - tuya.get_feeder_meal_plan
---

Use this action to set the feeding schedule on a Tuya pet feeder. You provide one or more scheduled feedings, each with the days, time, portion, and whether it is active. A common use is to adjust feeding times and portions from an automation, for example to feed a little earlier on weekends.

The meal plan you provide replaces the feeder's current schedule, so include every feeding you want to keep.

{% include actions/ui_header.md %}

To set a feeder meal plan from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Set feeder meal plan data**.
6. Set **Device** to the Tuya feeder you want to manage.
7. Under **Meal plan**, add one or more feedings, each with its days, time, portion, and whether it is enabled.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Tuya feeder to set the meal plan on.
Meal plan:
  description: One or more scheduled feedings. For each feeding, set the days of the week, the time, the portion, and whether it is enabled.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tuya.set_feeder_meal_plan`. A basic example looks like this:

{% example %}
action: |
  action: tuya.set_feeder_meal_plan
  data:
    device_id: 1234567890abcdef1234567890abcdef
    meal_plan:
      - days:
          - monday
          - tuesday
          - wednesday
          - thursday
          - friday
        time: "08:00"
        portion: 2
        enabled: true
      - days:
          - saturday
          - sunday
        time: "09:30"
        portion: 3
        enabled: true
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The Tuya feeder to set the meal plan on.
  required: true
  type: string
meal_plan:
  description: A list of scheduled feedings to apply to the feeder.
  required: true
  type: list
{% endoptions_yaml %}

Each feeding in the `meal_plan` list accepts the following:

- `days` (optional, list): The days of the week the feeding runs on, in lowercase, such as `monday`. Omit to run every day.
- `time` (required, string): The time of day the feeding runs, in `HH:MM` format. Always quote this value so it is read as text.
- `portion` (required, integer): The amount of food to dispense.
- `enabled` (required, boolean): Whether the scheduled feeding is active.

## Good to know

- The meal plan you set replaces the feeder's current schedule. Include every feeding you want to keep, not just the ones you are changing.
- To read the current schedule first, use the [Get feeder meal plan data](/actions/tuya.get_feeder_meal_plan/) action.

{% include actions/stuck.md %}

{% include actions/related.md %}
