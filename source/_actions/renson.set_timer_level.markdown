---
title: "Set timer"
action: renson.set_timer_level
domain: renson
description: "Runs the Renson ventilation unit at a chosen level for a set time."
related_actions:
  - renson.set_breeze
  - renson.set_pollution_settings
---

The **Set timer** action runs your Renson ventilation unit at a chosen ventilation level for a set number of minutes. When the timer ends, the unit returns to its normal program.

This is useful when you want an automation to boost ventilation for a while, for example after a shower or while cooking.

{% include actions/targets.md domain="fan" %}

{% include actions/ui_header.md %}

To set a timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Renson ventilation unit.
6. From the actions shown for that target, select **Renson: Set timer**.
7. Select the **Level** and enter the **Time** in minutes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Level:
  description: "The ventilation level to run while the timer is active. One of: Level 1, Level 2, Level 3, Level 4, Holiday, or Breeze."
  required: true
Time:
  description: The number of minutes to run at the chosen level, between 0 and 1440. Set to 0 to disable the timer.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `renson.set_timer_level`. A basic example looks like this:

{% example %}
action: |
  action: renson.set_timer_level
  target:
    entity_id: fan.ventilation
  data:
    timer_level: level3
    minutes: 30
{% endexample %}

This runs the ventilation unit at level 3 for 30 minutes.

### Options in YAML

{% options_yaml %}
timer_level:
  description: >
    The ventilation level to run while the timer is active. One of `level1`,
    `level2`, `level3`, `level4`, `holiday`, or `breeze`.
  required: true
  type: string
minutes:
  description: >
    The number of minutes to run at the chosen level, between 0 and 1440.
    Set to 0 to disable the timer.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Boost ventilation after a shower

This automation runs your ventilation unit at its highest level for 30 minutes whenever the bathroom humidity rises above 70%.

- Trigger: the bathroom humidity goes above 70%
- Action: set a ventilation timer
  - Target: the ventilation unit
  - Level: `level4`
  - Time: `30`

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Boost ventilation after a shower"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.bathroom_humidity
      above: 70
  actions:
    - action: renson.set_timer_level
      target:
        entity_id: fan.ventilation
      data:
        timer_level: level4
        minutes: 30
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
