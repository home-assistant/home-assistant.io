---
title: "Template"
trigger: template
domain: homeassistant
description: "Triggers when a template changes from false to true."
related_triggers:
  - state
  - numeric_state
  - time_pattern
---

The **Template** trigger is useful when no single entity tells you what you want to react to. You write a {% term template %} that combines several entities or calculates a value, and the trigger reacts when the template changes from false to true. For example, it can react when your solar panels produce more power than your home uses, or when the power use of a washing machine drops to almost zero.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for and select the **Template** trigger.
5. In **Value template**, enter a template that renders `true` when the trigger should react.
   - For example: {% raw %}`{{ is_state('device_tracker.paulus', 'home') }}`{% endraw %}
6. Optional: In **For at least**, enter how long the template must stay true before the trigger reacts. Instead of a **Duration**, you can enter a **Template**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Value template:
  description: The template to check. The trigger reacts when the template changes from false to true.
  required: true
For at least:
  description: How long the template must stay true before the trigger reacts. Default is `0` hours, `00` minutes, and `00` seconds (reacts immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, use `trigger: template`. A basic example looks like this:

{% example %}
trigger: |
  trigger: template
  value_template: "{{ is_state('device_tracker.paulus', 'home') }}"
  for: "00:01:00"
{% endexample %}

This runs when Paulus has been home for 1 minute.

### Options in YAML

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `template`.
  required: true
  type: string
value_template:
  description: The template to check. The trigger reacts when the template changes from false to true.
  required: true
  type: template
for:
  description: How long the template must stay true before the trigger reacts. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes, and seconds. You can also use a template, which Home Assistant renders when `value_template` becomes true. For a list of all accepted formats and templates, refer to [Durations in automations and scripts](/docs/automation/durations/).
  required: false
  type: [string, integer, map, template]
  default: "00:00:00"
{% endoptions_yaml %}

This example uses a template for `for`. The trigger reacts when Paulus has been home for as many minutes as `input_number.minutes` is set to:

{% example %}
trigger: |
  trigger: template
  value_template: "{{ is_state('device_tracker.paulus', 'home') }}"
  for:
    minutes: "{{ states('input_number.minutes') | int(0) }}"
{% endexample %}

## Good to know

- The trigger only reacts when the template changes from false to true. If the template is already true when Home Assistant sets up the trigger, the trigger only reacts after the template has been false first.
- These results count as true: `true`, a number other than `0`, and the strings `yes`, `on`, and `enable`. Any other result counts as false.
- Home Assistant renders the template again when one of the entities in the template changes. You can also check an attribute, for example, with {% raw %}`{{ is_state_attr('climate.living_room', 'preset_mode', 'away') }}`{% endraw %}.
- A template that uses the current time, with `now()`, `utcnow()`, `today_at`, `relative_time`, `time_since`, or `time_until`, is rendered again at the start of every minute. For details, refer to [Getting the current time](/docs/templating/dates-and-times/#getting-the-current-time). A template without entities that doesn't use any of these is only rendered once, when Home Assistant sets up the trigger.
- If you use **For at least** (`for`), the template must stay true for the entire time. If it becomes false before the time is up, the trigger doesn't react. Use a template that renders `true` or `false`: if the result changes while it stays true, for example from `5` to `6`, the timer stops, and the trigger only reacts after the template has been false first.
- If you use **For at least** (`for`), the timer resets when Home Assistant restarts or automations reload. If that's a problem for your automation, you can have the automation set a [date and time helper](/integrations/input_datetime/) instead, and use that helper in a [Time trigger](/triggers/time/).
- If the template can't be rendered, for example, because of an error in the template, the trigger doesn't react, and Home Assistant logs a warning.
- For the data that this trigger passes to your conditions and actions, such as `trigger.entity_id`, refer to [Template triggers](/docs/automation/trigger-data/#template-triggers).

{% include triggers/try_it.md %}

For this trigger, change one of the entities that the template uses, so that the template becomes true.

{% include triggers/more_examples.md %}

### Automation: run the dishwasher on surplus solar power

When the solar panels produce more than 1.5 kW above what your home uses, for 10 minutes, turn on the dishwasher. In this example, both sensors report power in kW. The template only becomes true when both sensors have a value, so the dishwasher doesn't start when one of the sensors is unavailable.

- **Trigger**: Template
  - **Value template**: The template from the YAML example below
  - **For at least**: 10 minutes
- **Action**: Turn on switch
  - **Target**: Dishwasher (`switch.dishwasher`)

{% details "YAML example for running the dishwasher on surplus solar power" %}

{% example %}
automation: |
  alias: "Dishwasher on surplus solar"
  triggers:
    - trigger: template
      value_template: >
        {{
          has_value('sensor.solar_power')
          and has_value('sensor.home_power_use')
          and states('sensor.solar_power') | float
            - states('sensor.home_power_use') | float > 1.5
        }}
      for:
        minutes: 10
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.dishwasher
{% endexample %}

{% enddetails %}

### Automation: send a notification when the washing machine is done

When the power use of the washing machine stays below 5 W, but not at 0 W, for 3 minutes, send a notification to your phone. Waiting 3 minutes prevents a notification during short low-power moments in the middle of a cycle, such as when the machine starts or pauses to soak.

- **Trigger**: Template
  - **Value template**: The template from the YAML example below
  - **For at least**: 3 minutes
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: The washing machine is done.

{% details "YAML example for sending a notification when the washing machine is done" %}

{% example %}
automation: |
  alias: "Washing machine done"
  triggers:
    - trigger: template
      value_template: >
        {{
          states('sensor.washing_machine_power') | float(0) < 5
          and states('sensor.washing_machine_power') | float(0) > 0
        }}
      for:
        minutes: 3
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The washing machine is done."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
