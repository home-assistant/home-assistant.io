---
title: "Set pollution settings"
action: renson.set_pollution_settings
domain: renson
description: "Configures the pollution settings of the Renson ventilation unit."
related_actions:
  - renson.set_timer_level
  - renson.set_breeze
---

The **Set pollution settings** action configures how your Renson ventilation unit responds to pollution. You set the ventilation levels used during the day and night, choose which sensors trigger extra ventilation, and tune the CO2 thresholds.

This is useful when you want an automation to change how aggressively the unit ventilates, for example a quieter program at night.

{% include actions/targets.md domain="fan" %}

{% include actions/ui_header.md %}

To configure the pollution settings from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Renson ventilation unit.
6. From the actions shown for that target, select **Renson: Set pollution settings**.
7. Set the **Day pollution level** and **Night pollution level**, then adjust the control and CO2 options as needed.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Day pollution level:
  description: "The ventilation level used when pollution is detected during the day. One of: Level 1, Level 2, Level 3, or Level 4."
  required: true
Night pollution level:
  description: "The ventilation level used when pollution is detected during the night. One of: Level 1, Level 2, Level 3, or Level 4."
  required: true
Enable humidity control:
  description: Whether the unit increases ventilation when it detects high humidity.
  required: false
Enable air quality control:
  description: Whether the unit increases ventilation when it detects poor air quality.
  required: false
Enable CO2 control:
  description: Whether the unit increases ventilation when it detects high CO2 levels.
  required: false
CO2 threshold:
  description: The CO2 level, in parts per million, above which the unit increases ventilation, between 400 and 2000.
  required: false
CO2 hysteresis:
  description: How far the CO2 level, in parts per million, must drop below the threshold before ventilation returns to normal, between 50 and 400.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `renson.set_pollution_settings`. A basic example looks like this:

{% example %}
action: |
  action: renson.set_pollution_settings
  target:
    entity_id: fan.ventilation
  data:
    day_pollution_level: level3
    night_pollution_level: level2
{% endexample %}

This sets the day ventilation level to level 3 and the night ventilation level to level 2.

### Options in YAML

{% options_yaml %}
day_pollution_level:
  description: >
    The ventilation level used when pollution is detected during the day.
    One of `level1`, `level2`, `level3`, or `level4`.
  required: true
  type: string
night_pollution_level:
  description: >
    The ventilation level used when pollution is detected during the night.
    One of `level1`, `level2`, `level3`, or `level4`.
  required: true
  type: string
humidity_control:
  description: >
    Whether the unit increases ventilation when it detects high humidity.
  required: false
  type: boolean
  default: true
airquality_control:
  description: >
    Whether the unit increases ventilation when it detects poor air quality.
  required: false
  type: boolean
  default: true
co2_control:
  description: >
    Whether the unit increases ventilation when it detects high CO2 levels.
  required: false
  type: boolean
  default: true
co2_threshold:
  description: >
    The CO2 level, in parts per million, above which the unit increases
    ventilation, between 400 and 2000.
  required: false
  type: integer
  default: 600
co2_hysteresis:
  description: >
    How far the CO2 level, in parts per million, must drop below the threshold
    before ventilation returns to normal, between 50 and 400.
  required: false
  type: integer
  default: 100
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Use a quieter program at night

This automation lowers the night pollution ventilation level every evening so the unit runs more quietly while you sleep.

- Trigger: the time is 10:00 PM
- Action: set the pollution settings
  - Target: the ventilation unit
  - Day pollution level: `level3`
  - Night pollution level: `level1`

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Quieter ventilation at night"
  triggers:
    - trigger: time
      at: "22:00:00"
  actions:
    - action: renson.set_pollution_settings
      target:
        entity_id: fan.ventilation
      data:
        day_pollution_level: level3
        night_pollution_level: level1
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
