---
title: "Set Breeze"
action: renson.set_breeze
domain: renson
description: "Configures the Breeze function of the Renson ventilation unit."
related_actions:
  - renson.set_timer_level
  - renson.set_pollution_settings
---

The **Set Breeze** action configures the Breeze function of your Renson ventilation unit. Breeze increases ventilation when the outdoor temperature rises above a set value, which helps cool your home naturally.

You set the ventilation level to use, the temperature that activates Breeze, and whether the function is turned on.

{% include actions/targets.md domain="fan" %}

{% include actions/ui_header.md %}

To configure Breeze from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Renson ventilation unit.
6. From the actions shown for that target, select **Renson: Set Breeze**.
7. Select the **Level** and **Temperature**, then turn **Activate** on or off.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Level:
  description: "The ventilation level to use while Breeze is active. One of: Level 1, Level 2, Level 3, or Level 4."
  required: true
Temperature:
  description: The outdoor temperature, in degrees Celsius, that activates Breeze, between 15 and 35.
  required: true
Activate:
  description: Whether to turn the Breeze function on or off.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `renson.set_breeze`. A basic example looks like this:

{% example %}
action: |
  action: renson.set_breeze
  target:
    entity_id: fan.ventilation
  data:
    breeze_level: level3
    temperature: 22
    activate: true
{% endexample %}

This turns on Breeze at level 3 when the outdoor temperature rises above 22 °C.

### Options in YAML

{% options_yaml %}
breeze_level:
  description: >
    The ventilation level to use while Breeze is active. One of `level1`,
    `level2`, `level3`, or `level4`.
  required: true
  type: string
temperature:
  description: >
    The outdoor temperature, in degrees Celsius, that activates Breeze,
    between 15 and 35.
  required: true
  type: integer
activate:
  description: Whether to turn the Breeze function on or off.
  required: true
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Turn on Breeze in summer

This automation enables the Breeze function at the start of summer so the unit ventilates more whenever it gets warm outside.

- **Trigger**: an input boolean for summer mode turns on
- **Action**: Renson: Set Breeze
  - **Target**: the ventilation unit
  - **Level**: `level3`
  - **Temperature**: `24`
  - **Activate**: on

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Enable Breeze in summer"
  triggers:
    - trigger: state
      entity_id: input_boolean.summer_mode
      to: "on"
  actions:
    - action: renson.set_breeze
      target:
        entity_id: fan.ventilation
      data:
        breeze_level: level3
        temperature: 24
        activate: true
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
