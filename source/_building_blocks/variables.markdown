---
title: "Define variables"
building_block: variables
category: variables
description: "Set variables that the next steps of the automation or script can use."
related_building_blocks:
  - if
  - choose
---

The **Define variables** building block sets variables that templates in the next steps can use. Use it when you want to give a value a clear name, or calculate a value once and use it in several steps. For variables that the whole script can use, refer to [script variables](/integrations/script/#variables).

## Using this building block from the user interface

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select an automation. To edit a script, go to the **Scripts** tab and select the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Define variables**.
   - Result: The building block opens in YAML.
4. Under `variables`, enter each variable as a name and a value, for example, `brightness: 100`.
5. Select **Save**.

### Options in the UI

This building block has no options in the UI. You enter the variables in YAML.

## Using this building block in YAML

In YAML, use `variables`. This example sets two variables, and uses them in the next step:

{% example %}
action: |
  - alias: "Set variables"
    variables:
      entities:
        - light.kitchen
        - light.living_room
      brightness: 100
  - alias: "Control lights"
    action: light.turn_on
    target:
      entity_id: "{{ entities }}"
    data:
      brightness: "{{ brightness }}"
{% endexample %}

The value of a variable can be a template:

{% example %}
action: |
  - alias: "Set a templated variable"
    variables:
      blind_state_message: "The blind is {{ states('cover.blind') }}."
  - alias: "Notify about the state of the blind"
    action: notify.send_message
    target:
      entity_id: notify.my_device
    data:
      message: "{{ blind_state_message }}"
{% endexample %}

### Options in YAML

{% options_yaml %}
variables:
  description: The variables to set, as names and values. Values can be templates.
  required: true
  type: map
{% endoptions_yaml %}

## Good to know

- If a variable with the same name was defined earlier, **Define variables** changes its value. This also works from inside another building block, such as **If-then**.
- If no variable with that name was defined earlier, the variable is available in the rest of the automation or script run.

## Examples

### Script: Count the people who are home

This script starts with `people` set to `0`. If Paulus is home, a **Define variables** step inside **If-then** adds 1. After the **If-then**, `people` still has the new value.

{% details "YAML example" %}

{% example %}
script: |
  sequence:
    # Set the people variable to a default value
    - variables:
        people: 0
    # Try to increment people if Paulus is home
    - if:
        - condition: state
          entity_id: device_tracker.paulus
          state: "home"
      then:
        - variables:
            people: "{{ people + 1 }}"
            paulus_home: true
        # "People at home: 1"
        - action: notify.notify
          data:
            message: "People at home: {{ people }}"
    # Variable value is now updated
    # "People at home: 1 (including Paulus)"
    - action: notify.notify
      data:
        message: >
          People at home: {{ people }}
          {% if paulus_home is defined %}(including Paulus){% endif %}
{% endexample %}

{% enddetails %}
