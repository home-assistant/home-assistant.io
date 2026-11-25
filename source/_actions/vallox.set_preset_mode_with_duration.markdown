---
title: "Set preset mode with duration"
action: vallox.set_preset_mode_with_duration
domain: vallox
description: "Activates a preset of a Vallox fan for a set time, or without a time limit."
since: "2027.1"
related_actions:
  - fan.set_preset_mode
---

The **Vallox: Set preset mode with duration** action activates the **Boost**, **Fireplace / Custom**, or **Extra** preset of your Vallox ventilation unit for the duration stored on the unit, for a set time, or without a time limit. When the time is up, the unit goes back to the **Home**, **Away**, or **Auto** preset it was in before.

Use it when you need more ventilation for a limited time, for example after a shower or while cooking.

{% include actions/ui_header.md %}

To activate a preset from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick your Vallox fan.
6. From the actions shown for that target, select **Set preset mode with duration**.
7. Choose the **Preset mode**. Then either set a **Duration**, or select **No time limit**. If you set neither, the unit uses the duration it has stored for the preset.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Preset mode:
  description: "The preset to activate: **Boost**, **Fireplace / Custom**, or **Extra**."
  required: true
Duration:
  description: "How long the preset stays active, in hours and minutes, from 1 minute up to 1092 hours and 14 minutes. It also switches on the timer of the preset on the unit. Leave it empty to use the duration stored on the unit."
  required: false
No time limit:
  description: "Keeps the preset active without a time limit. Defaults to off. You can't combine it with **Duration**."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `vallox.set_preset_mode_with_duration`. A basic example looks like this:

{% example %}
action: |
  action: vallox.set_preset_mode_with_duration
  target:
    entity_id: fan.vallox
  data:
    preset_mode: boost
    duration:
      minutes: 30
{% endexample %}

This activates the **Boost** preset of `fan.vallox` for 30 minutes.

### Options in YAML

{% options_yaml %}
preset_mode:
  description: "The preset to activate: `boost`, `fireplace`, or `extra`."
  required: true
  type: string
duration:
  description: >
    How long the preset stays active, as `hours` and `minutes`. Only whole
    minutes are accepted, from 1 up to 65534 minutes. It also switches on the
    timer of the preset on the unit. Leave it out to use the duration stored on
    the unit. You can't combine it with `no_time_limit`.
  required: false
  type: map
no_time_limit:
  description: >
    Set to `true` to keep the preset active without a time limit. You can't
    combine it with `duration`.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/targets.md entity_type="Vallox fan" example="fan.vallox" %}

## Good to know

- **Home**, **Away**, and **Auto** have no time limit on the unit. To switch to one of them, use the [Set fan preset mode](/actions/fan.set_preset_mode/) action.
- While a preset is active without a time limit, the **Profile duration** sensor shows **Unknown**.
- The action doesn't turn the unit on. If the unit is off, turn it on as well, for example with the **Turn on fan** action.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Boost the ventilation after a shower

When the humidity in the bathroom rises above 70%, boost the ventilation for 30 minutes.

- **Trigger**: Numeric state: Bathroom humidity above 70
- **Action**: Set preset mode with duration
  - **Target**: Vallox fan
  - **Preset mode**: Boost
  - **Duration**: 30 minutes

{% details "YAML example for boosting the ventilation after a shower" %}

{% example %}
automation: |
  alias: "Boost the ventilation after a shower"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.bathroom_humidity
      above: 70
  actions:
    - action: vallox.set_preset_mode_with_duration
      target:
        entity_id: fan.vallox
      data:
        preset_mode: boost
        duration:
          minutes: 30
{% endexample %}

{% enddetails %}

### Automation: Air out the house every morning

Every weekday morning, boost the ventilation for one hour.

- **Trigger**: Time: 07:00 on weekdays
- **Action**: Set preset mode with duration
  - **Target**: Vallox fan
  - **Preset mode**: Boost
  - **Duration**: 1 hour

{% details "YAML example for airing out the house every morning" %}

{% example %}
automation: |
  alias: "Air out the house every morning"
  triggers:
    - trigger: time
      at: "07:00:00"
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
  actions:
    - action: vallox.set_preset_mode_with_duration
      target:
        entity_id: fan.vallox
      data:
        preset_mode: boost
        duration:
          hours: 1
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
