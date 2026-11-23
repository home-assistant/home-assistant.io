---
title: "Choose"
building_block: choose
category: decisions
description: "Run the first group of actions whose conditions are met."
related_building_blocks:
  - if
  - condition
---

The **Choose** building block has several options, each with its own conditions and actions. It runs the actions of the first option whose conditions are all met. If no option matches, it runs the default actions, if you added them. Use it when the automation or script should do one of several things, for example, something different in the morning, during the day, and at night.

## Using this building block from the user interface

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select an automation. To edit a script, go to the **Scripts** tab and select the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Choose**.
4. Under **Option 1**, add the conditions under **Conditions**, and the actions under **Actions**.
5. Optional: To give the option a name, select **Menu** {% icon "mdi:dots-vertical" %} > **Rename**.
6. Optional: To add another option, select **Add option**.
7. Optional: To add actions that run if no option matches, select **Add default actions**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Conditions:
  description: The [conditions](/conditions/) of the option. The option is used if all conditions are met.
  required: true
Actions:
  description: The actions to run if the option is used.
  required: true
Default actions:
  description: The actions to run if no option matches.
  required: false
{% endoptions_ui %}

## Using this building block in YAML

In YAML, use `choose` with a list of options, each with `conditions` and a `sequence`. Optionally, add a `default` sequence. This works like "if, else if, else". This example runs a different script in the morning, during the day, and at night:

{% example %}
automation: |
  triggers:
    - trigger: state
      entity_id: input_boolean.simulate
      to: "on"
  mode: restart
  actions:
    - choose:
        # IF morning
        - conditions:
            - condition: template
              value_template: "{{ now().hour < 9 }}"
          sequence:
            - action: script.sim_morning
        # ELIF day
        - conditions:
            - condition: template
              value_template: "{{ now().hour < 18 }}"
          sequence:
            - action: light.turn_off
              target:
                entity_id: light.living_room
            - action: script.sim_day
      # ELSE night
      default:
        - action: light.turn_off
          target:
            entity_id: light.kitchen
        - delay:
            minutes: "{{ range(1, 11) | random }}"
        - action: light.turn_off
          target:
            entity_id: all
{% endexample %}

### Options in YAML

{% options_yaml %}
choose:
  description: The list of options.
  required: true
  type: list
  keys:
    alias:
      description: The name of the option.
      required: false
      type: string
    conditions:
      description: The conditions of the option. The option is used if all conditions are met. You can also use a template.
      required: true
      type: [list, template]
    sequence:
      description: The actions to run if the option is used.
      required: true
      type: list
default:
  description: The actions to run if no option matches.
  required: false
  type: list
{% endoptions_yaml %}

## Good to know

- Only the first option whose conditions are met runs, even if the conditions of later options are also met.
- To check several things that don't depend on each other, use a separate **Choose** for each, one after the other. For an example, refer to [Automation: turn on lights in rooms that are in use](#automation-turn-on-lights-in-rooms-that-are-in-use).

## Examples

### Automation: Run a different script depending on the home mode

When the home mode changes, this automation runs a different script depending on the new mode. The conditions use the [shorthand notation of a template condition](/conditions/template/#shorthand-notation).

{% details "YAML example" %}

{% example %}
automation: |
  triggers:
    - trigger: state
      entity_id: input_select.home_mode
  actions:
    - choose:
        - conditions: >
            {{ trigger.to_state.state == 'Home' and
               is_state('binary_sensor.all_clear', 'on') }}
          sequence:
            - action: script.arrive_home
              data:
                ok: true
        - conditions: >
            {{ trigger.to_state.state == 'Home' and
               is_state('binary_sensor.all_clear', 'off') }}
          sequence:
            - action: script.turn_on
              target:
                entity_id: script.flash_lights
            - action: script.arrive_home
              data:
                ok: false
        - conditions: "{{ trigger.to_state.state == 'Away' }}"
          sequence:
            - action: script.left_home
{% endexample %}

{% enddetails %}

### Automation: Turn on lights in rooms that are in use

When the sun gets low, this automation turns on the porch and garden lights. If the TV in the living room is on, someone is probably in that room, so it also turns on the living room lights. The same goes for the computer in the studio. The two **Choose** building blocks don't depend on each other.

- **Trigger**: Numeric state crossed threshold
  - **Entity**: Sun (`sun.sun`)
  - **Attribute**: Elevation
  - **Below**: `4`
- **Action**: Turn on light
  - **Target**: Porch light (`light.porch`) and Garden light (`light.garden`)
- **Action**: Choose
  - **Option 1**:
    - **Conditions**:
      - **Condition**: State
        - **Entity**: Living room TV (`binary_sensor.livingroom_tv`)
        - **State**: On
    - **Actions**:
      - **Action**: Turn on light
        - **Target**: Living room light (`light.livingroom`)
- **Action**: Choose
  - **Option 1**:
    - **Conditions**:
      - **Condition**: State
        - **Entity**: Studio computer (`binary_sensor.studio_pc`)
        - **State**: On
    - **Actions**:
      - **Action**: Turn on light
        - **Target**: Studio light (`light.studio`)

{% details "YAML example" %}

{% example %}
automation: |
  alias: "Turn lights on when the sun gets dim and if some room is occupied"
  triggers:
    - trigger: numeric_state
      entity_id: sun.sun
      attribute: elevation
      below: 4
  actions:
    # This must always apply
    - action: light.turn_on
      data:
        brightness: 255
        color_temp_kelvin: 2732
      target:
        entity_id:
          - light.porch
          - light.garden
    # IF an entity is ON
    - choose:
        - conditions:
            - condition: state
              entity_id: binary_sensor.livingroom_tv
              state: "on"
          sequence:
            - action: light.turn_on
              data:
                brightness: 255
                color_temp_kelvin: 2732
              target:
                entity_id: light.livingroom
    # IF another entity not related to the previous, is ON
    - choose:
        - conditions:
            - condition: state
              entity_id: binary_sensor.studio_pc
              state: "on"
          sequence:
            - action: light.turn_on
              data:
                brightness: 255
                color_temp_kelvin: 2732
              target:
                entity_id: light.studio
{% endexample %}

{% enddetails %}
