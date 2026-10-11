---
title: "Template"
condition: template
domain: homeassistant
description: "Tests if a template renders true."
related_conditions:
  - state
  - numeric_state
---

The **Template** condition checks whether a [template](/docs/templating/) renders `true` right now. Use it when no other condition can check what you need. For example, a template can compare two sensors with each other, or check the data of the trigger that started the automation.

If another condition can do the same check, such as [State](/conditions/state/) or [Numeric state](/docs/scripts/conditions/#numeric-state-condition), that condition is easier to set up and to read later.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Template**.
5. In **Value template**, enter a template that renders `true` when the automation should continue.
   - To try your template first, use the [template editor](/docs/tools/dev-tools/#template-editor-tab).
6. Select **Save**.

### Options in the UI

{% options_ui %}
Value template:
  description: The template to check. The condition passes if the template renders `true`.
  required: true
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, use `condition: template`. A basic example looks like this:

{% example %}
condition: |
  condition: template
  value_template: >
    {{ state_attr('climate.living_room', 'temperature') | float(0) > 20 }}
{% endexample %}

This passes when the target temperature of the living room thermostat is above 20.

### Options in YAML

The options in YAML are the same as in the UI.

{% options_yaml %}
condition:
  description: The condition type. For this condition, use `template`.
  required: true
  type: string
value_template:
  description: The template to check. The condition passes if the template renders `true`.
  required: true
  type: template
{% endoptions_yaml %}

### Shorthand notation

In YAML, you can also write a template condition as the template only, without `condition` and `value_template`. The following example does the same as the basic example:

{% example %}
automation: |
  conditions:
    - "{{ state_attr('climate.living_room', 'temperature') | float(0) > 20 }}"
{% endexample %}

You can use the shorthand everywhere Home Assistant accepts a condition. This includes:

- The `conditions` of an automation, alone or in a list with other conditions
- The `conditions` of the **And**, **Or**, and **Not** blocks
- The `conditions` of a **Choose** option, and the `while` and `until` of a **Repeat** block
- The `if` of an **If-then** block
- A **Condition** step between the actions, written as `condition: "{{ ... }}"`

The following example combines two shorthand templates with a **State** condition. All three must be met:

{% example %}
automation: |
  conditions:
    - "{{ is_state('person.sam', 'home') }}"
    - condition: state
      entity_id: alarm_control_panel.home
      state: "disarmed"
    - "{{ now().hour < 22 }}"
{% endexample %}

## Good to know

- The condition only passes if the template renders `true`. Upper and lower case don't matter, so `True` also passes. Other values, such as `1`, `yes`, or `on`, don't pass.
- Combining values with `and` or `or` doesn't always render `true` or `false`. For example, `{{ my_list is defined and my_list }}` renders the list itself. The condition then doesn't pass, even if the list isn't empty. To get `true` or `false`, use a comparison, such as `{{ my_list is defined and my_list | length > 0 }}`.
- If the template has an error, the condition fails with an error. The error is shown in the trace.
- If an entity in the template is unavailable or unknown, `float` and `int` can't convert its state, and the template fails with an error. Give them a default value, such as `float(0)`, or check the entity first with `has_value()`.
- In an automation, the template can use the `trigger` variable, which describes what started the automation. For details, refer to [Available trigger data](/docs/automation/templating/#available-trigger-data).
- This condition checks the template right now. To start an automation when a template becomes true, use the [Template trigger](/docs/automation/trigger/#template-trigger).
- For more about templates, refer to [Templates in automation conditions](/docs/templating/where-to-use/#automation-conditions).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: suggest opening the windows when it's cooler outside

At 18:00, this automation sends a notification, but only if it's cooler outside than inside.

- **Trigger**: Time
  - **At time**: 18:00:00
- **Condition**: Template
  - **Value template**: `{{ has_value('sensor.outdoor_temperature') and has_value('sensor.indoor_temperature') and states('sensor.outdoor_temperature') | float < states('sensor.indoor_temperature') | float }}`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for suggesting to open the windows" %}

{% example %}
automation: |
  alias: "Suggest opening the windows"
  triggers:
    - trigger: time
      at: "18:00:00"
  conditions:
    - condition: template
      value_template: >
        {{ has_value('sensor.outdoor_temperature')
           and has_value('sensor.indoor_temperature')
           and states('sensor.outdoor_temperature') | float
               < states('sensor.indoor_temperature') | float }}
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "It's cooler outside. Open the windows to cool down the house."
{% endexample %}

{% enddetails %}

### Automation: notify only about a big jump in power use

When the power use of the house changes, this automation sends a notification, but only if the power went up by more than 2000&nbsp;W at once. The template uses the `trigger` variable to compare the old and the new value.

- **Trigger**: State changed
  - **Entity**: House power (`sensor.house_power`)
- **Condition**: Template
  - **Value template**: `{{ trigger.from_state.state | is_number and trigger.to_state.state | float(0) - trigger.from_state.state | float > 2000 }}`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification about a jump in power use" %}

{% example %}
automation: |
  alias: "Notify about a big jump in power use"
  triggers:
    - trigger: state
      entity_id: sensor.house_power
  conditions:
    - condition: template
      value_template: >
        {{ trigger.from_state.state | is_number
           and trigger.to_state.state | float(0)
               - trigger.from_state.state | float > 2000 }}
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The power use of the house just went up by more than 2000 W."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
