---
title: "Building blocks and actions in automations and scripts"
description: "Wait, repeat, choose, and perform steps at the same time in your automations and scripts, in the editor or in YAML."
toc: true
---

When an automation or script runs, it goes through a list of steps. Each step is an action or a building block:

- An **action** makes something happen, for example, turning on a light or sending a notification. Home Assistant performs the action on the targets you choose. For a list of all actions, refer to the [actions reference](/actions/).
- A **building block** controls whether, when, and in which order the other steps run. It can check a condition, wait, repeat steps, choose between steps, or perform steps at the same time.

Automations and scripts use the same actions and building blocks.

## How automations and scripts run their steps

When an automation starts, it first checks its conditions under **And if**. If they are met, it goes through the steps under **Then do**, from top to bottom. A script has no conditions section, so it goes through its steps under **Sequence** right away.

The difference is when they run: an automation runs by itself when one of its triggers reacts, and a script runs when you start it, for example, from a dashboard, from an automation, or with Assist. For more about the difference, refer to [Concepts and terminology](/getting-started/concepts-terminology/#scripts).

To add a step in the editor, select **Add action**. To add a building block, select **Blocks** in that dialog. In YAML, you write actions and building blocks in the same list. For details, refer to [Writing steps in YAML](#writing-steps-in-yaml).

For how to create scripts, pass them variables, and wait for them to finish, refer to the [Scripts integration](/integrations/script/).

<a id="perform-an-action"></a>

## Performing an action

To make something happen, such as turning on a light, add an action. Each action has its own page with its options, listed in the [actions reference](/actions/). For the options that most actions share, such as targets and data, refer to [Performing actions](/docs/scripts/perform-actions/).

### Adding an action in the editor

To add an action in the automation or script editor, follow the steps in [Adding an action in the editor](/docs/scripts/perform-actions/#adding-an-action-in-the-editor).

### Performing an action in YAML

In YAML, use `action` with the name of the action, and optionally `target` and `data`:

{% example %}
action: |
  alias: "Bedroom lights on"
  action: light.turn_on
  target:
    entity_id: light.bedroom
  data:
    brightness: 100
{% endexample %}

<a id="activate-a-scene"></a>

In older YAML, you may find a shortcut to activate a {% term scene %}. It does the same as the [**Activate scene**](/actions/scene.turn_on/) action. When you open the step in the editor, the editor changes it to `action: scene.turn_on`.

{% example %}
action: |
  scene: scene.morning_living_room
{% endexample %}

<a id="fire-an-event"></a>

## Fire manual event

The **Fire manual event** action fires an [event](/docs/configuration/events/). Other automations can react to it with a [**Manual event received** trigger](/triggers/event/). Use it to let one automation or script tell another that something happened, and to pass data along.

### Adding Fire manual event in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open an automation. To edit a script, open the **Scripts** tab and open the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Search for and select **Fire manual event**.
4. In **Event type**, enter the name of the event, for example, `event_light_state_changed`.
5. Optional: In **Event data**, enter the data to send with the event, in YAML.
6. Select **Save**.

<a id="fire-manual-event-options-in-the-ui"></a>

#### Options in the UI

{% options_ui %}
Event type:
  description: The name of the event to fire.
  required: true
Event data:
  description: The data to send with the event, as keys and values in YAML. The values can be templates.
  required: false
{% endoptions_ui %}

### Fire manual event in YAML

In YAML, use `event` with the event type, and optionally `event_data`. The event data accepts templates:

{% example %}
action: |
  event: MY_EVENT
  event_data:
    name: myEvent
    customData: "{{ myCustomVariable }}"
{% endexample %}

<a id="fire-manual-event-options-in-yaml"></a>

#### Options in YAML

{% options_yaml %}
event:
  description: The name of the event to fire.
  required: true
  type: string
event_data:
  description: The data to send with the event. The values can be templates.
  required: false
  type: map
{% endoptions_yaml %}

### Good to know about Fire manual event

- To add an entry to the **Activity** panel, use the [**Log activity**](/actions/logbook.log/) action.

<a id="raise-and-consume-custom-events"></a>

### Examples of Fire manual event

#### Automation: fire a custom event when a switch turns on

When the kitchen switch turns on, this automation fires the custom event `event_light_state_changed`, with the new state as event data. The actions could also be part of a script.

{% details "YAML example" %}

{% example %}
automation: |
  alias: "Fire event"
  triggers:
    - trigger: state
      entity_id: switch.kitchen
      to: "on"
  actions:
    - event: event_light_state_changed
      event_data:
        state: "on"
{% endexample %}

{% enddetails %}

#### Automation: react to the custom event

This automation reacts to `event_light_state_changed` with a [**Manual event received** trigger](/triggers/event/), and uses the `state` from the event data in a notification. For the data you can use, refer to [available trigger data](/docs/automation/templating/#available-trigger-data).

{% details "YAML example" %}

{% example %}
automation: |
  alias: "Capture event"
  triggers:
    - trigger: event
      event_type: event_light_state_changed
  actions:
    - action: notify.notify
      data:
        message: "The kitchen light is turned {{ trigger.event.data.state }}."
{% endexample %}

{% enddetails %}

<a id="respond-to-a-conversation"></a>

## Set conversation response

The **Set conversation response** action sets what Assist says, or shows, when a voice command or sentence starts the automation. Use it with a [sentence trigger](/docs/automation/trigger/#sentence-trigger) to answer a custom command.

### Adding Set conversation response in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation that has the sentence trigger.
2. In the **Then do** section, select **Add action**.
3. Search for and select **Set conversation response**.
4. In **Set conversation response**, enter the response. You can use a template, for example, to include the state of an entity.
5. Select **Save**.

<a id="set-conversation-response-options-in-the-ui"></a>

#### Options in the UI

{% options_ui %}
Set conversation response:
  description: What Assist says or shows. Can be a template.
  required: true
{% endoptions_ui %}

### Set conversation response in YAML

In YAML, use `set_conversation_response` with the response. The response can be a template:

{% example %}
action: |
  - variables:
      my_var: "123"
  - set_conversation_response: "{{ 'Testing ' ~ my_var }}"
{% endexample %}

This example responds with "Testing 123".

To clear a response that an earlier step set, set it to empty:

{% example %}
action: |
  set_conversation_response:
{% endexample %}

<a id="set-conversation-response-options-in-yaml"></a>

#### Options in YAML

{% options_yaml %}
set_conversation_response:
  description: What Assist says or shows. Can be a template. To clear a response that an earlier step set, leave it empty.
  required: true
  type: template
{% endoptions_yaml %}

### Good to know about Set conversation response

- Assist uses the response when the automation finishes. If the automation sets the response more than once, the last one is used.
- If the automation didn't start from a conversation, for example, from a time trigger, the response isn't used.
- Set the response in the automation itself. If the automation runs a script, a response that the script sets doesn't reach Assist. To use data from a script, let the script [return a response](#examples-of-stop) with **Stop**, and use that data in the automation's **Set conversation response**.

### Examples of Set conversation response

#### Automation: answer whether the garage door is open

When you ask Assist "Is the garage door open?", this automation answers with the current state of the garage door, for example, "The garage door is closed."

- **Trigger**: Sentence
  - **Sentence**: `Is the garage door open`
- **Action**: Set conversation response
  - **Set conversation response**: `The garage door is {{ states('cover.garage_door') }}.`

{% details "YAML example" %}

{% example %}
automation: |
  alias: "Answer whether the garage door is open"
  triggers:
    - trigger: conversation
      command: "Is the garage door open"
  actions:
    - set_conversation_response: >
        The garage door is {{ states('cover.garage_door') }}.
{% endexample %}

{% enddetails %}

<a id="choose-a-group-of-actions"></a>

## Choose

<!-- future frontmatter:
title: "Choose"
building_block: choose
description: "Run the first group of actions whose conditions are met."
related_building_blocks: [if, condition]
-->

The **Choose** building block has several options, each with its own conditions and actions. It runs the actions of the first option whose conditions are all met. If no option matches, it runs the default actions, if you added them. Use it when the automation or script should do one of several things, for example, something different in the morning, during the day, and at night.

### Adding Choose in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open an automation. To edit a script, open the **Scripts** tab and open the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Choose**.
4. Under **Option 1**, add the conditions under **Conditions**, and the actions under **Actions**.
5. Optional: To give the option a name, select **Menu** {% icon "mdi:dots-vertical" %} > **Rename option**.
6. Optional: To add another option, select **Add option**.
7. Optional: To add actions that run if no option matches, select **Add default actions**.
8. Select **Save**.

<a id="choose-options-in-the-ui"></a>

#### Options in the UI

{% options_ui %}
Conditions:
  description: The [conditions](/docs/scripts/conditions/) of the option. The option is used if all conditions are met.
  required: true
Actions:
  description: The actions to run if the option is used.
  required: true
Default actions:
  description: The actions to run if no option matches.
  required: false
{% endoptions_ui %}

### Choose in YAML

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

<a id="choose-options-in-yaml"></a>

#### Options in YAML

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

### Good to know about Choose

- Only the first option whose conditions are met runs, even if the conditions of later options are also met.
- To check several things that don't depend on each other, use a separate **Choose** for each, one after the other. For an example, refer to [Automation: turn on lights in rooms that are in use](#automation-turn-on-lights-in-rooms-that-are-in-use).

### Examples of Choose

#### Automation: run a different script depending on the home mode

When the home mode changes, this automation runs a different script depending on the new mode. The conditions use the [shorthand notation of a template condition][shorthand-template].

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

#### Automation: turn on lights in rooms that are in use

When the sun gets low, this automation turns on the porch and garden lights. If the TV in the living room is on, someone is probably in that room, so it also turns on the living room lights. The same goes for the computer in the studio. The two **Choose** building blocks don't depend on each other.

- **Trigger**: Numeric state crossed threshold
  - **Entity**: Sun (`sun.sun`), attribute **Elevation**
  - **Below**: 4
- **Action**: Turn on the porch and garden lights
- **Action**: Choose
  - **Conditions**: The living room TV is on
  - **Actions**: Turn on the living room lights
- **Action**: Choose
  - **Conditions**: The studio computer is on
  - **Actions**: Turn on the studio lights

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

<a id="test-a-condition"></a>

## Condition

<!-- future frontmatter:
title: "Condition"
building_block: condition
description: "Continue the automation or script only if a condition is met."
related_building_blocks: [if, choose, stop]
-->

The **Condition** building block checks a condition in the middle of a sequence. If the condition is met, the next steps run. If it is not met, the sequence stops. Use it when the next steps should only run in certain situations, for example, only when someone is home.

### Adding Condition in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open an automation. To edit a script, open the **Scripts** tab and open the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Condition**.
4. In **Condition type**, select the condition to check, for example, **State**, and fill in its options.
5. Select **Save**.

<a id="condition-options-in-the-ui"></a>

#### Options in the UI

{% options_ui %}
Condition type:
  description: The condition to check. Each condition type has its own options. For the available conditions, refer to [conditions](/docs/scripts/conditions/).
  required: true
{% endoptions_ui %}

### Condition in YAML

In YAML, use `condition` with the condition type and its options. For the available conditions, refer to the [conditions page]. This example only continues if Paulus is home:

{% example %}
action: |
  alias: "Check if Paulus is home"
  condition: state
  entity_id: device_tracker.paulus
  state: "home"
{% endexample %}

`condition` can also be a list of conditions. The sequence then only continues if all conditions are met:

{% example %}
action: |
  alias: "Check if Paulus is home and the temperature is below 20"
  condition:
    - condition: state
      entity_id: device_tracker.paulus
      state: "home"
    - condition: numeric_state
      entity_id: sensor.temperature
      below: 20
{% endexample %}

<a id="condition-options-in-yaml"></a>

#### Options in YAML

{% options_yaml %}
condition:
  description: The condition type, for example, `state`, followed by the options of that condition. Or a list of conditions, which must all be met, or a template.
  required: true
  type: [string, list, template]
{% endoptions_yaml %}

### Good to know about Condition

- **Condition** only stops the sequence it is in. Inside another building block, it only stops the actions of that building block. For example, inside a [**Repeat**](#repeat-multiple-times) building block, it only stops the current round of the repeat. Inside [**Choose**](#choose), it only stops the actions of that option. Inside [**Run in parallel**](#run-in-parallel), it only stops its own branch.
- To run different actions depending on whether the condition is met, use [**If-then**](#if-then) or [**Choose**](#choose) instead.
- The condition checks the state at the moment the step runs. It isn't checked again later, so the sequence doesn't continue when the condition is met later. For more, refer to [Conditions check the current state](/docs/automation/how-automations-react-to-changes/#conditions-check-the-current-state).

<a id="variables"></a>

## Define variables

<!-- future frontmatter:
title: "Define variables"
building_block: variables
description: "Set variables that the next steps of the automation or script can use."
related_building_blocks: [if, choose]
-->

The **Define variables** building block sets variables that templates in the next steps can use. Use it when you want to give a value a clear name, or calculate a value once and use it in several steps. For variables that the whole script can use, refer to [script variables].

### Adding Define variables in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open an automation. To edit a script, open the **Scripts** tab and open the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Define variables**.
   - The building block opens in YAML.
4. Under `variables`, enter each variable as a name and a value, for example, `brightness: 100`.
5. Select **Save**.

<a id="define-variables-options-in-the-ui"></a>

#### Options in the UI

This building block has no options in the UI. You enter the variables in YAML.

### Define variables in YAML

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

<a id="define-variables-options-in-yaml"></a>

#### Options in YAML

{% options_yaml %}
variables:
  description: The variables to set, as names and values. Values can be templates.
  required: true
  type: map
{% endoptions_yaml %}

<a id="scope-of-variables"></a>

### Good to know about Define variables

- If a variable with the same name was defined earlier, **Define variables** changes its value. This also works from inside another building block, such as **If-then**.
- If no variable with that name was defined earlier, the variable is available in the rest of the automation or script run.

### Examples of Define variables

#### Script: count the people who are home

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

## If-then

<!-- future frontmatter:
title: "If-then"
building_block: if
description: "Run actions only if conditions are met, and other actions if they are not."
related_building_blocks: [choose, condition]
-->

The **If-then** building block runs actions only if its conditions are met. Optionally, it runs other actions if they are not met. Use it when the automation or script should do something different depending on the situation, for example, start the vacuum only when no one is home.

### Adding If-then in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open an automation. To edit a script, open the **Scripts** tab and open the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **If-then**.
4. Under **If**, select **Add condition**, and add the conditions to check.
5. Under **Then**, select **Add action**, and add the actions to run if all conditions are met.
6. Optional: Under **Else**, select **Add action**, and add the actions to run if the conditions are not met.
7. Select **Save**.

<a id="if-then-options-in-the-ui"></a>

#### Options in the UI

{% options_ui %}
If:
  description: The [conditions](/docs/scripts/conditions/) to check. All conditions must be met.
  required: true
Then:
  description: The actions to run if all conditions are met.
  required: true
Else:
  description: The actions to run if the conditions are not met.
  required: false
{% endoptions_ui %}

### If-then in YAML

In YAML, use `if`, `then`, and optionally `else`:

{% example %}
action: |
  if:
    - alias: "If no one is home"
      condition: state
      entity_id: zone.home
      state: "0"
  then:
    - alias: "Then start cleaning already!"
      action: vacuum.start
      target:
        area_id: living_room
  else:
    - action: notify.notify
      data:
        message: "Skipped cleaning, someone is home!"
{% endexample %}

<a id="if-then-options-in-yaml"></a>

#### Options in YAML

{% options_yaml %}
if:
  description: The conditions to check. All conditions must be met. You can also use a template.
  required: true
  type: [list, template]
then:
  description: The actions to run if all conditions are met.
  required: true
  type: list
else:
  description: The actions to run if the conditions are not met.
  required: false
  type: list
{% endoptions_yaml %}

### Good to know about If-then

- All conditions under **If** must be met. To run the actions if any of them is met, put them in an **Or** condition.
- You can put an **If-then** inside another **If-then**. If you find yourself adding more **If-then** building blocks under **Else**, use [**Choose**](#choose) instead.

<a id="repeat-a-group-of-actions"></a>
<a id="for-each"></a>

## Repeat for each

<!-- future frontmatter:
title: "Repeat for each"
building_block: repeat_for_each
description: "Run a group of actions once for each item in a list."
related_building_blocks: [repeat_count, repeat_while, repeat_until]
-->

The **Repeat for each** building block runs a group of actions once for each item in a list. Use it when you want to do the same thing for several items, for example, to turn off a list of lights one by one.

### Adding Repeat for each in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open an automation. To edit a script, open the **Scripts** tab and open the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Repeat for each**.
4. In **For each item in list**, enter the list of items in YAML, for example:

   ```yaml
   - "living_room"
   - "kitchen"
   ```

5. Under **Actions**, select **Add action**, and add the actions to run for each item. To use the current item in a template, use `repeat.item`.
6. Select **Save**.

<a id="repeat-for-each-options-in-the-ui"></a>

#### Options in the UI

{% options_ui %}
For each item in list:
  description: The list of items. The actions run once for each item.
  required: true
Actions:
  description: The actions to run for each item.
  required: true
{% endoptions_ui %}

### Repeat for each in YAML

In YAML, use `repeat` with `for_each` and `sequence`. This example turns off three lights:

{% example %}
action: |
  repeat:
    for_each:
      - "living_room"
      - "kitchen"
      - "office"
    sequence:
      - action: light.turn_off
        target:
          entity_id: "light.{{ repeat.item }}"
{% endexample %}

The items can also be templates, or mappings of keys and values:

{% example %}
action: |
  repeat:
    for_each:
      - language: English
        message: Hello World
      - language: Dutch
        message: Hallo Wereld
    sequence:
      - action: notify.phone
        data:
          title: "Message in {{ repeat.item.language }}"
          message: "{{ repeat.item.message }}!"
{% endexample %}

<a id="repeat-for-each-options-in-yaml"></a>

#### Options in YAML

{% options_yaml %}
repeat:
  description: The repeat settings.
  required: true
  type: map
  keys:
    for_each:
      description: The list of items, or a template that returns a list.
      required: true
      type: [list, template]
    sequence:
      description: The actions to run for each item.
      required: true
      type: list
{% endoptions_yaml %}

<a id="repeat-for-each-repeat-variable"></a>

#### Repeat variable

While the actions repeat, the `repeat` variable shows which item is used:

- `repeat.item`: The current item of the list.
- `repeat.index`: The number of the round: `1`, `2`, `3`, and so on.
- `repeat.first`: `true` during the first round.
- `repeat.last`: `true` during the last round.

### Good to know about Repeat for each

- The list can be a fixed list, or a list created by a template. If the template doesn't return a list, the automation or script stops with an error.

### Examples of Repeat for each

#### Automation: send a notification for each sensor with low battery

Every evening, this automation goes through all entities with the {% term label %} "Battery check", and sends a separate notification for each one that is below 20%. The notification includes the name of the sensor. Create the label yourself, and add it to your battery sensors, in {% my labels title="**Settings** > **Areas, labels & zones** > **Labels**" %}.

The list comes from a template, so it changes when you add the label to more sensors. Inside the repeat, `repeat.item` is the entity ID of the current sensor.

- **Trigger**: Time, at 20:00
- **Action**: Repeat for each
  - **For each item in list**: `{{ label_entities('Battery check') }}`
  - **Actions**: If-then
    - **If**: A **Template** condition with `{{ states(repeat.item) | float(100) < 20 }}`
    - **Then**: Send a notification message, with the name and battery level of the sensor

{% details "YAML example" %}

{% example %}
automation: |
  alias: "Notify about low batteries"
  triggers:
    - trigger: time
      at: "20:00:00"
  actions:
    - repeat:
        for_each: "{{ label_entities('Battery check') }}"
        sequence:
          - if:
              - "{{ states(repeat.item) | float(100) < 20 }}"
            then:
              - action: notify.send_message
                target:
                  entity_id: notify.my_device
                data:
                  message: >
                    {{ state_attr(repeat.item, 'friendly_name') }} has
                    {{ states(repeat.item) }}% battery left.
{% endexample %}

{% enddetails %}

<a id="counted-repeat"></a>

## Repeat multiple times

<!-- future frontmatter:
title: "Repeat multiple times"
building_block: repeat_count
description: "Run a group of actions a set number of times."
related_building_blocks: [repeat_for_each, repeat_while, repeat_until]
-->

The **Repeat multiple times** building block runs a group of actions a set number of times. Use it when you know in advance how often the actions should run, for example, to flash a light 3 times.

### Adding Repeat multiple times in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open an automation. To edit a script, open the **Scripts** tab and open the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Repeat multiple times**.
4. In **Count**, enter how many times to run the actions.
5. Under **Actions**, select **Add action**, and add the actions to repeat.
6. Select **Save**.

<a id="repeat-multiple-times-options-in-the-ui"></a>

#### Options in the UI

{% options_ui %}
Count:
  description: How many times to run the actions.
  required: true
Actions:
  description: The actions to repeat.
  required: true
{% endoptions_ui %}

### Repeat multiple times in YAML

In YAML, use `repeat` with `count` and `sequence`. The count can be a template. The template is rendered when the repeat starts. This example has two scripts. The second script calls the first one to flash the hallway light 3 times:

{% example %}
script: |
  flash_light:
    mode: restart
    sequence:
      - action: light.turn_on
        target:
          entity_id: "light.{{ light }}"
      - alias: "Cycle light 'count' times"
        repeat:
          count: "{{ count | int * 2 - 1 }}"
          sequence:
            - delay: 2
            - action: light.toggle
              target:
                entity_id: "light.{{ light }}"
  flash_hallway_light:
    sequence:
      - alias: "Flash hallway light 3 times"
        action: script.flash_light
        data:
          light: hallway
          count: 3
{% endexample %}

<a id="repeat-multiple-times-options-in-yaml"></a>

#### Options in YAML

{% options_yaml %}
repeat:
  description: The repeat settings.
  required: true
  type: map
  keys:
    count:
      description: How many times to run the actions. Can be a template.
      required: true
      type: [integer, template]
    sequence:
      description: The actions to repeat.
      required: true
      type: list
{% endoptions_yaml %}

<a id="repeat-loop-variable"></a>
<a id="repeat-multiple-times-repeat-variable"></a>

#### Repeat variable

While the actions repeat, the `repeat` variable shows which round is running:

- `repeat.index`: The number of the round: `1`, `2`, `3`, and so on.
- `repeat.first`: `true` during the first round.
- `repeat.last`: `true` during the last round.

### Good to know about Repeat multiple times

- You can use any building block inside the repeat, including another repeat.

## Repeat until

<!-- future frontmatter:
title: "Repeat until"
building_block: repeat_until
description: "Run a group of actions until conditions are met."
related_building_blocks: [repeat_while, repeat_count, repeat_for_each]
-->

The **Repeat until** building block runs a group of actions until its conditions are met. The conditions are checked after each round, so the actions always run at least once. Use it when you want to try something again until it works, for example, until a device reports that it turned on.

### Adding Repeat until in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open an automation. To edit a script, open the **Scripts** tab and open the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Repeat until**.
4. Under **Until conditions**, select **Add condition**, and add the conditions that end the repeat.
5. Under **Actions**, select **Add action**, and add the actions to repeat.
6. Select **Save**.

<a id="repeat-until-options-in-the-ui"></a>

#### Options in the UI

{% options_ui %}
Until conditions:
  description: The [conditions](/docs/scripts/conditions/) that are checked after each round. The repeat ends when all conditions are met.
  required: true
Actions:
  description: The actions to repeat.
  required: true
{% endoptions_ui %}

### Repeat until in YAML

In YAML, use `repeat` with `sequence` and `until`. `until` also accepts a [shorthand notation of a template condition][shorthand-template]:

{% example %}
action: |
  repeat:
    until: "{{ is_state('device_tracker.iphone', 'home') }}"
    sequence:
      - action: script.something
{% endexample %}

<a id="repeat-until-options-in-yaml"></a>

#### Options in YAML

{% options_yaml %}
repeat:
  description: The repeat settings.
  required: true
  type: map
  keys:
    until:
      description: The conditions that are checked after each round. The repeat ends when all conditions are met. You can also use a template.
      required: true
      type: [list, template]
    sequence:
      description: The actions to repeat.
      required: true
      type: list
{% endoptions_yaml %}

<a id="repeat-until-repeat-variable"></a>

#### Repeat variable

While the actions repeat, the `repeat` variable shows which round is running. You can also use it in the conditions:

- `repeat.index`: The number of the round: `1`, `2`, `3`, and so on.
- `repeat.first`: `true` during the first round.

### Good to know about Repeat until

- The actions always run at least once, because the conditions are only checked after each round.
- The repeat ends when all **Until conditions** are met. To also end it after a number of rounds, put the conditions in an **Or** condition, together with a condition on `repeat.index`, for example, `{{ repeat.index >= 5 }}`. The repeat then ends when the actions work, or after 5 rounds.

### Examples of Repeat until

#### Automation: repeat a command until it works

When `binary_sensor.xyz` turns on, this automation runs a shell command, and repeats it until `binary_sensor.something` is on.

- **Trigger**: State changed
  - **Entity**: `binary_sensor.xyz`
  - **To**: On
- **Condition**: State
  - **Entity**: `binary_sensor.something`
  - **State**: Off
- **Action**: Repeat until
  - **Actions**: Run the shell command, then wait 200 milliseconds
  - **Until conditions**: `binary_sensor.something` is on

{% details "YAML example" %}

{% example %}
automation: |
  triggers:
    - trigger: state
      entity_id: binary_sensor.xyz
      to: "on"
  conditions:
    - condition: state
      entity_id: binary_sensor.something
      state: "off"
  actions:
    - alias: "Repeat the sequence UNTIL the conditions are true"
      repeat:
        sequence:
          # Run command that for some reason doesn't always work
          - action: shell_command.turn_something_on
          # Give it time to complete
          - delay:
              milliseconds: 200
        until:
          # Did it work?
          - condition: state
            entity_id: binary_sensor.something
            state: "on"
{% endexample %}

{% enddetails %}

<a id="while-loop"></a>

## Repeat while

<!-- future frontmatter:
title: "Repeat while"
building_block: repeat_while
description: "Run a group of actions as long as conditions are met."
related_building_blocks: [repeat_until, repeat_count, repeat_for_each]
-->

The **Repeat while** building block runs a group of actions as long as its conditions are met. The conditions are checked before each round. Use it when the actions should keep running while something is true, for example, while a mode is turned on.

### Adding Repeat while in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open an automation. To edit a script, open the **Scripts** tab and open the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Repeat while**.
4. Under **While conditions**, select **Add condition**, and add the conditions that must be met for the next round.
5. Under **Actions**, select **Add action**, and add the actions to repeat.
6. Select **Save**.

<a id="repeat-while-options-in-the-ui"></a>

#### Options in the UI

{% options_ui %}
While conditions:
  description: The [conditions](/docs/scripts/conditions/) that are checked before each round. The actions run as long as all conditions are met.
  required: true
Actions:
  description: The actions to repeat.
  required: true
{% endoptions_ui %}

### Repeat while in YAML

In YAML, use `repeat` with `while` and `sequence`. This example repeats a script as long as `input_boolean.do_something` is on, and at most 20 times:

{% example %}
script: |
  do_something:
    sequence:
      - action: script.get_ready_for_something
      - alias: "Repeat the sequence AS LONG AS the conditions are true"
        repeat:
          while:
            - condition: state
              entity_id: input_boolean.do_something
              state: "on"
            # Don't do it too many times
            - condition: template
              value_template: "{{ repeat.index <= 20 }}"
          sequence:
            - action: script.something
{% endexample %}

`while` also accepts a [shorthand notation of a template condition][shorthand-template]:

{% example %}
action: |
  repeat:
    while: "{{ is_state('sensor.mode', 'Home') and repeat.index < 10 }}"
    sequence:
      - action: script.something
{% endexample %}

<a id="repeat-while-options-in-yaml"></a>

#### Options in YAML

{% options_yaml %}
repeat:
  description: The repeat settings.
  required: true
  type: map
  keys:
    while:
      description: The conditions that are checked before each round. The actions run as long as all conditions are met. You can also use a template.
      required: true
      type: [list, template]
    sequence:
      description: The actions to repeat.
      required: true
      type: list
{% endoptions_yaml %}

<a id="repeat-while-repeat-variable"></a>

#### Repeat variable

While the actions repeat, the `repeat` variable shows which round is running. You can also use it in the conditions:

- `repeat.index`: The number of the round: `1`, `2`, `3`, and so on.
- `repeat.first`: `true` during the first round.

### Good to know about Repeat while

- The conditions are checked before each round. If they are not met at the start, the actions don't run at all.
- To make sure the repeat ends, add a condition on `repeat.index`, for example, `{{ repeat.index <= 20 }}`.

<a id="grouping-actions"></a>

## Run in sequence

<!-- future frontmatter:
title: "Run in sequence"
building_block: sequence
description: "Group actions that run one after the other."
related_building_blocks: [parallel]
-->

The **Run in sequence** building block groups actions that run one after the other. Each action starts after the previous one has finished. Use it to keep related actions together, so you can collapse them in the editor, or to run a group of actions in order inside [**Run in parallel**](#run-in-parallel).

### Adding Run in sequence in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open an automation. To edit a script, open the **Scripts** tab and open the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Run in sequence**.
4. Inside the building block, select **Add action**, and add the actions of the group.
5. Optional: To give the group a name, select **Menu** {% icon "mdi:dots-vertical" %} > **Rename**.
6. Select **Save**.

<a id="run-in-sequence-options-in-the-ui"></a>

#### Options in the UI

This building block has no options. You add the actions inside it.

### Run in sequence in YAML

In YAML, use `sequence` with a list of actions. To give the group a name, add an `alias`:

{% example %}
action: |
  alias: "Turn on devices"
  sequence:
    - action: light.turn_on
      target:
        entity_id: light.ceiling
    - action: siren.turn_on
      target:
        entity_id: siren.noise_maker
{% endexample %}

<a id="run-in-sequence-options-in-yaml"></a>

#### Options in YAML

{% options_yaml %}
sequence:
  description: The actions of the group. They run one after the other.
  required: true
  type: list
{% endoptions_yaml %}

### Good to know about Run in sequence

- The actions of an automation or script already run one after the other. **Run in sequence** doesn't change that. It helps you organize them.

### Examples of Run in sequence

#### Automation: turn on devices, then send notifications

When motion is detected, this automation runs two groups of actions: one that turns on devices, and one that sends notifications. The groups and their actions run one after the other, four actions in total.

- **Trigger**: State changed
  - **Entity**: `binary_sensor.motion`
  - **To**: On
- **Action**: Run in sequence, named **Turn on devices**
  - Turn on the ceiling light and the siren
- **Action**: Run in sequence, named **Send notifications**
  - Send a notification to two people

{% details "YAML example" %}

{% example %}
automation: |
  triggers:
    - trigger: state
      entity_id: binary_sensor.motion
      to: "on"
  actions:
    - alias: "Turn on devices"
      sequence:
        - action: light.turn_on
          target:
            entity_id: light.ceiling
        - action: siren.turn_on
          target:
            entity_id: siren.noise_maker
    - alias: "Send notifications"
      sequence:
        - action: notify.person1
          data:
            message: "The motion sensor was triggered!"
        - action: notify.person2
          data:
            message: "Oh oh, someone triggered the motion sensor..."
{% endexample %}

{% enddetails %}

<a id="parallelizing-actions"></a>

## Run in parallel

<!-- future frontmatter:
title: "Run in parallel"
building_block: parallel
description: "Start several actions at the same time."
related_building_blocks: [sequence]
-->

The **Run in parallel** building block starts several actions at the same time, instead of one after the other. Use it when the actions don't depend on each other and the order doesn't matter, for example, to send several notifications at once.

### Adding Run in parallel in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open an automation. To edit a script, open the **Scripts** tab and open the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Run in parallel**.
4. Inside the building block, select **Add action**, and add the actions to start at the same time.
   - To run some of them in order, add a [**Run in sequence**](#run-in-sequence) building block, and add those actions to it.
5. Select **Save**.

<a id="run-in-parallel-options-in-the-ui"></a>

#### Options in the UI

This building block has no options. You add the actions inside it.

### Run in parallel in YAML

In YAML, use `parallel` with a list of actions. This example sends two messages at the same time:

{% example %}
automation: |
  triggers:
    - trigger: state
      entity_id: binary_sensor.motion
      to: "on"
  actions:
    - parallel:
        - action: notify.person1
          data:
            message: "These messages are sent at the same time!"
        - action: notify.person2
          data:
            message: "These messages are sent at the same time!"
{% endexample %}

<a id="run-in-parallel-options-in-yaml"></a>

#### Options in YAML

{% options_yaml %}
parallel:
  description: The actions to start at the same time. To run some of them in order, put them in a `sequence`.
  required: true
  type: list
{% endoptions_yaml %}

### Good to know about Run in parallel

- Most automations and scripts work well with actions that run one after the other. Use **Run in parallel** only when the actions don't depend on each other.
- The actions start at the same time, but they don't always finish in the same order.
- If one action fails, the other actions keep running until they are finished or fail too.
- Variables that one action creates or changes can conflict with variables of another action. Give them different names.

### Examples of Run in parallel

#### Script: wait for motion in one group, and send a message right away in another

This script runs two things at the same time. The first is a group that waits for motion and then sends a message. The second sends a message right away, without waiting for the first group.

{% details "YAML example" %}

{% example %}
script: |
  example_script:
    sequence:
      - parallel:
          - sequence:
              - wait_for_trigger:
                  - trigger: state
                    entity_id: binary_sensor.motion
                    to: "on"
              - action: notify.person1
                data:
                  message: "This message awaited the motion trigger"
          - action: notify.person2
            data:
              message: "I am sent immediately and do not await the above action!"
{% endexample %}

{% enddetails %}

<a id="stopping-a-script-sequence"></a>

## Stop

<!-- future frontmatter:
title: "Stop"
building_block: stop
description: "Stop the automation or script, optionally with a response or as an error."
related_building_blocks: [condition, if]
-->

The **Stop** building block stops the automation or script. The next steps don't run. Use it to end a run early, for example, inside an **If-then** when something is not as expected. A script can also use it to return a response.

### Adding Stop in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open an automation. To edit a script, open the **Scripts** tab and open the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Stop**.
4. Optional: In **Reason for stopping**, enter why the run stops. The reason is shown in the logs and in the [trace](/docs/automation/testing/#traces).
5. Optional: To return a response from a script, in **The name of the variable to use as response**, enter the name of the variable that holds the response.
6. Optional: To mark the run as failed, turn on **Stop because of an unexpected error**.
7. Select **Save**.

<a id="stop-options-in-the-ui"></a>

#### Options in the UI

{% options_ui %}
Reason for stopping:
  description: Why the run stops. Shown in the logs and in the trace.
  required: false
The name of the variable to use as response:
  description: The variable that holds the response of the script. The variable must contain a mapping of keys and values. You can't use it together with **Stop because of an unexpected error**.
  required: false
Stop because of an unexpected error:
  description: If turned on, the run is marked as failed. Turned off by default.
  required: false
{% endoptions_ui %}

### Stop in YAML

In YAML, use `stop` with the reason:

{% example %}
action: |
  stop: "Stop running the rest of the sequence"
{% endexample %}

To return a response from a script, add `response_variable` with the name of the variable that holds the response:

{% example %}
action: |
  stop: "Stop running the rest of the sequence"
  response_variable: "my_response_variable"
{% endexample %}

To mark the run as failed, add `error: true`:

{% example %}
action: |
  stop: "Well, that was unexpected!"
  error: true
{% endexample %}

<a id="stop-options-in-yaml"></a>

#### Options in YAML

{% options_yaml %}
stop:
  description: >
    Why the run stops. Shown in the logs and in the trace. You must add `stop`, but you can leave the reason empty, for example, `stop: ""`.
  required: true
  type: string
response_variable:
  description: The name of the variable that holds the response of the script. The variable must contain a mapping of keys and values. You can't combine it with `error`.
  required: false
  type: string
error:
  description: If `true`, the run is marked as failed.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

### Good to know about Stop

- **Stop** ends the whole run, not only the current building block. Inside **Run in parallel**, the other actions that already started still finish.
- To only stop the steps that follow in the current sequence when something is not true, use a [**Condition**](#condition) building block instead.
- If the variable in **The name of the variable to use as response** doesn't exist, the run stops with an error.

### Examples of Stop

#### Script and automation: return the outdoor temperature from a script

The script `get_outdoor_temperature` puts the outdoor temperature in a variable, and returns it with **Stop**. The automation calls the script every morning, receives the response in its own variable, and sends it in a notification.

To receive a response, the automation must call the script directly, as `script.get_outdoor_temperature`. The `script.turn_on` action doesn't wait for the script and doesn't return a response. For details, refer to [Waiting for a script to complete](/docs/script/#waiting-for-a-script-to-complete).

- **Script**: Get outdoor temperature
  - **Action**: Define variables, with `result` set to the temperature
  - **Action**: Stop
    - **Reason for stopping**: Return the outdoor temperature
    - **The name of the variable to use as response**: `result`
- **Automation**: Morning temperature
  - **Trigger**: Time, at 07:00
  - **Action**: Get outdoor temperature (the script)
    - **Response variable**: `weather`
  - **Action**: Send a notification message
    - **Target**: My Device (`notify.my_device`)
    - **Message**: `It's {{ weather.temperature }} °C outside.`

{% details "YAML example" %}

{% example %}
script: |
  get_outdoor_temperature:
    alias: "Get outdoor temperature"
    sequence:
      - variables:
          result:
            temperature: "{{ states('sensor.outdoor_temperature') }}"
      - stop: "Return the outdoor temperature"
        response_variable: result
{% endexample %}

{% example %}
automation: |
  alias: "Morning temperature"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: script.get_outdoor_temperature
      response_variable: weather
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "It's {{ weather.temperature }} °C outside."
{% endexample %}

{% enddetails %}

## Wait for time to pass (delay)

<!-- future frontmatter:
title: "Wait for time to pass (delay)"
building_block: delay
description: "Pause the automation or script for a set time."
related_building_blocks: [wait_template, wait_for_trigger]
-->

The **Wait for time to pass (delay)** building block pauses the automation or script for a set time. Use it when the next steps should run a while later, for example, to turn off a light 5 minutes after it turned on.

### Adding Wait for time to pass (delay) in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open an automation. To edit a script, open the **Scripts** tab and open the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Wait for time to pass (delay)**.
4. In **Duration**, enter how long to wait.
5. Select **Save**.

<a id="wait-for-time-to-pass-delay-options-in-the-ui"></a>

#### Options in the UI

{% options_ui %}
Duration:
  description: How long to wait, in hours, minutes, seconds, and milliseconds.
  required: true
{% endoptions_ui %}

### Wait for time to pass (delay) in YAML

In YAML, use `delay`. You can enter the duration in several formats:

- A number of seconds, for example, `5` to wait 5 seconds, or `1.5` to wait 1.5 seconds.
- A time in `HH:MM` format, for example, `"01:00"` to wait 1 hour.
- A time in `HH:MM:SS` format, for example, `"00:01:30"` to wait 1 minute and 30 seconds.
- A mapping with `days`, `hours`, `minutes`, `seconds`, and `milliseconds`. You can combine them, and you need at least one.

{% example %}
action: |
  alias: "Wait 5 seconds"
  delay: 5
{% endexample %}

{% example %}
action: |
  delay:
    minutes: 1
{% endexample %}

All formats accept templates. This example waits as many minutes as `input_number.minute_delay` is set to:

{% example %}
action: |
  delay: "{{ states('input_number.minute_delay') | multiply(60) | int }}"
{% endexample %}

<a id="wait-for-time-to-pass-delay-options-in-yaml"></a>

#### Options in YAML

{% options_yaml %}
delay:
  description: How long to wait. Use a number of seconds, a time in `HH:MM` or `HH:MM:SS` format, or a mapping with `days`, `hours`, `minutes`, `seconds`, and `milliseconds`. All formats accept templates.
  required: true
  type: [integer, float, string, map, template]
{% endoptions_yaml %}

### Good to know about Wait for time to pass (delay)

- A delay in milliseconds is at least that long, but not exact.
- A delay with a template can only be edited in YAML.
- A restart of Home Assistant stops automations and scripts that are waiting. They don't continue after the restart.

### Examples of Wait for time to pass (delay)

#### Automation: turn off the light 5 minutes after the last motion

When the hallway motion sensor detects motion, this automation turns on the hallway light, waits 5 minutes, and turns the light off again. The automation uses the **Restart** [mode](/docs/automation/modes/): each time the sensor detects new motion, the automation starts over, and the 5 minutes start again. With the default **Single** mode, the light turns off 5 minutes after the first motion, even if the sensor detects new motion in the meantime.

- **Trigger**: State changed
  - **Entity**: Hallway motion (`binary_sensor.hallway_motion`)
  - **To**: Detected
- **Action**: Turn on light
  - **Target**: Hallway light (`light.hallway`)
- **Action**: Wait for time to pass (delay)
  - **Duration**: 5 minutes
- **Action**: Turn off light
  - **Target**: Hallway light (`light.hallway`)
- **Mode**: Restart. To change it, select **Menu** {% icon "mdi:dots-vertical" %} > **Change mode**.

{% details "YAML example" %}

{% example %}
automation: |
  alias: "Turn off the hallway light 5 minutes after the last motion"
  mode: restart
  triggers:
    - trigger: state
      entity_id: binary_sensor.hallway_motion
      to: "on"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
    - delay:
        minutes: 5
    - action: light.turn_off
      target:
        entity_id: light.hallway
{% endexample %}

{% enddetails %}

<a id="wait"></a>

## Wait for a template

<!-- future frontmatter:
title: "Wait for a template"
building_block: wait_template
description: "Pause the automation until a template is true, with an optional timeout."
related_building_blocks: [wait_for_trigger, delay]
-->

The **Wait for a template** building block pauses the automation or script until a template is true. If the template is already true when the wait starts, the next steps run right away. Use it when the next steps should only run once something is in a certain state, for example, when the media player has stopped.

### Adding Wait for a template in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open an automation. To edit a script, open the **Scripts** tab and open the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Wait for a template**.
4. In **Wait template**, enter the template to wait for, for example, `{{ is_state('media_player.living_room', 'idle') }}`.
5. Optional: In **Timeout**, enter how long to wait at most.
6. Optional: To stop the automation or script when the timeout ends, turn off **Continue on timeout**.
7. Select **Save**.

<a id="wait-for-a-template-options-in-the-ui"></a>

#### Options in the UI

{% options_ui %}
Wait template:
  description: The template to wait for. The wait ends as soon as the template is true.
  required: true
Timeout:
  description: The longest time to wait. If you leave it empty, the automation or script waits until the template is true.
  required: false
Continue on timeout:
  description: If turned on, the next steps run when the timeout ends, even though the template is not true. If turned off, the automation or script stops. Turned on by default.
  required: false
{% endoptions_ui %}

### Wait for a template in YAML

In YAML, use `wait_template`:

{% example %}
action: |
  alias: "Wait until media player is stopped"
  wait_template: "{{ is_state('media_player.living_room', 'idle') }}"
{% endexample %}

<a id="wait-timeout"></a>

To wait at most 1 minute, add a `timeout`:

{% example %}
action: |
  wait_template: "{{ is_state('binary_sensor.entrance', 'on') }}"
  timeout: "00:01:00"
{% endexample %}

<a id="wait-for-a-template-options-in-yaml"></a>

#### Options in YAML

{% options_yaml %}
wait_template:
  description: The template to wait for. The wait ends as soon as the template is true.
  required: true
  type: template
timeout:
  description: The longest time to wait. Uses the same formats as [Wait for time to pass (delay)](#wait-for-time-to-pass-delay), including templates.
  required: false
  type: [string, integer, float, map, template]
continue_on_timeout:
  description: If `true`, the next steps run when the timeout ends. If `false`, the automation or script stops.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

<a id="wait-variable"></a>
<a id="wait-for-a-template-wait-variable"></a>

#### Wait variable

After the wait ends, because the template is true or because the timeout ended, the `wait` variable shows the result:

- `wait.completed`: `true` if the template became true, `false` if the timeout ended first.
- `wait.remaining`: The time left of the timeout, in seconds, or `none` if no timeout is set.

### Good to know about Wait for a template

- If the template is already true when the wait starts, the next steps run right away. To wait for a change that happens after the wait starts, use [**Wait for a trigger**](#wait-for-a-trigger). For more about this difference, refer to [Conditions check the current state](/docs/automation/how-automations-react-to-changes/#conditions-check-the-current-state).
- The template is checked again whenever an entity that it references changes state. If the template uses [`now()`](/template-functions/now/), it is also checked at the start of every minute.
- **Continue on timeout** is turned on by default. To check whether the template became true, use `wait.completed`.
- A restart of Home Assistant stops automations and scripts that are waiting. They don't continue after the restart.

### Examples of Wait for a template

#### Script: take different actions depending on whether the door opened

This script waits up to 10 seconds for the door to open, and then uses `wait.completed` to decide what to do.

{% details "YAML example" %}

{% example %}
script: |
  sequence:
    - wait_template: "{{ is_state('binary_sensor.door', 'on') }}"
      timeout: 10
    - if:
        - "{{ not wait.completed }}"
      then:
        - action: script.door_did_not_open
      else:
        - action: script.turn_on
          target:
            entity_id:
              - script.door_did_open
              - script.play_fanfare
{% endexample %}

{% enddetails %}

For an example that combines **Wait for a template** and **Wait for a trigger** with one timeout for both, refer to [Script: wait a total of 10 seconds](#script-wait-a-total-of-10-seconds).

## Wait for a trigger

<!-- future frontmatter:
title: "Wait for a trigger"
building_block: wait_for_trigger
description: "Pause the automation until something happens, with an optional timeout."
related_building_blocks: [wait_template, delay]
-->

The **Wait for a trigger** building block pauses the automation or script until one of its triggers reacts to a change. Use it when the next steps should only run after something happens, for example, a door closing.

### Adding Wait for a trigger in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open an automation. To edit a script, open the **Scripts** tab and open the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Wait for a trigger**.
4. Select **Add trigger**, and add the trigger to wait for.
   - You can use the same [triggers](/docs/automation/trigger/) as in the **When** section of an automation.
   - You can add more than one trigger. The wait ends when any of them reacts.
5. Optional: In **Timeout**, enter how long to wait at most.
6. Optional: To stop the automation or script when the timeout ends, turn off **Continue on timeout**.
7. Select **Save**.

<a id="wait-for-a-trigger-options-in-the-ui"></a>

#### Options in the UI

{% options_ui %}
Timeout:
  description: The longest time to wait. If you leave it empty, the automation or script waits until one of the triggers reacts.
  required: false
Continue on timeout:
  description: If turned on, the next steps run when the timeout ends, even though no trigger reacted. If turned off, the automation or script stops. Turned on by default.
  required: false
{% endoptions_ui %}

### Wait for a trigger in YAML

In YAML, use `wait_for_trigger` with a list of triggers. This example waits for a custom event, or for a light to turn on and stay on for 10 seconds:

{% example %}
action: |
  alias: "Wait for MY_EVENT or light on"
  wait_for_trigger:
    - trigger: event
      event_type: MY_EVENT
      id: my_trigger
    - trigger: state
      entity_id: light.living_room
      to: "on"
      for: 10
{% endexample %}

To stop the script if the event doesn't happen in time, add a `timeout` and set `continue_on_timeout` to `false`:

{% example %}
action: |
  wait_for_trigger:
    - trigger: event
      event_type: ifttt_webhook_received
      event_data:
        action: connected_to_network
  timeout:
    minutes: "{{ timeout_minutes }}"
  continue_on_timeout: false
{% endexample %}

You can give each trigger an `id`, like in the `triggers` of an automation. To check which trigger ended the wait, use `wait.trigger.id` in a template:

{% example %}
action: |
  if:
    - "{{ wait.trigger.id == 'my_trigger' }}"
  then:
    - action: light.turn_on
      target:
        entity_id: light.living_room_table
{% endexample %}

<a id="wait-for-a-trigger-options-in-yaml"></a>

#### Options in YAML

{% options_yaml %}
wait_for_trigger:
  description: The triggers to wait for. Uses the same format as the `triggers` of an automation.
  required: true
  type: list
timeout:
  description: The longest time to wait. Uses the same formats as [Wait for time to pass (delay)](#wait-for-time-to-pass-delay), including templates.
  required: false
  type: [string, integer, float, map, template]
continue_on_timeout:
  description: If `true`, the next steps run when the timeout ends. If `false`, the automation or script stops.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

<a id="wait-for-a-trigger-wait-variable"></a>

#### Wait variable

After the wait ends, because a trigger reacted or because the timeout ended, the `wait` variable shows the result:

- `wait.completed`: `true` if a trigger reacted, `false` if the timeout ended first.
- `wait.remaining`: The time left of the timeout, in seconds, or `none` if no timeout is set.
- `wait.trigger`: Information about the trigger that reacted, in the same format as the [trigger data](/docs/automation/templating/#available-trigger-data) of an automation. `none` if the timeout ended first.

### Good to know about Wait for a trigger

- The wait only reacts to a change that happens after the wait starts. If the state is already there, the automation or script keeps waiting. To continue right away in that case, use [**Wait for a template**](#wait-for-a-template). For more about this difference, refer to [Triggers react to changes](/docs/automation/how-automations-react-to-changes/#triggers-react-to-changes).
- **Continue on timeout** is turned on by default. To check whether a trigger reacted, use `wait.completed`.
- A restart of Home Assistant stops automations and scripts that are waiting. They don't continue after the restart.
- The triggers can use the [trigger variables](/docs/automation/trigger/#trigger-variables), [variables](#define-variables), and [script variables] that are defined before the wait.
- The **Triggered by** condition only lists the triggers of the automation itself, not the triggers of the wait. To check which trigger ended the wait, use `wait.trigger.id`, as shown in [Wait for a trigger in YAML](#wait-for-a-trigger-in-yaml).

### Examples of Wait for a trigger

#### Automation: turn off the heating when a window stays open

When the window opens, this automation waits up to 5 minutes for it to close again. If the window is still open after 5 minutes, it turns off the heating.

- **Trigger**: State changed
  - **Entity**: Living room window (`binary_sensor.living_room_window`)
  - **To**: Open
- **Action**: Wait for a trigger
  - **Trigger**: State changed, for the living room window, **To**: Closed
  - **Timeout**: 5 minutes
- **Action**: If-then
  - **If**: A **Template** condition with `{{ not wait.completed }}`, which is met if the wait ended because of the timeout
  - **Then**: Turn off the living room thermostat (`climate.living_room`)

{% details "YAML example" %}

{% example %}
automation: |
  alias: "Turn off the heating when a window stays open"
  triggers:
    - trigger: state
      entity_id: binary_sensor.living_room_window
      to: "on"
  actions:
    - wait_for_trigger:
        - trigger: state
          entity_id: binary_sensor.living_room_window
          to: "off"
      timeout:
        minutes: 5
    - if:
        - "{{ not wait.completed }}"
      then:
        - action: climate.turn_off
          target:
            entity_id: climate.living_room
{% endexample %}

{% enddetails %}

#### Script: wait a total of 10 seconds

This script uses two waits, with one timeout of 10 seconds for both. The second wait uses `wait.remaining`, the time that is left after the first wait.

{% details "YAML example" %}

{% example %}
script: |
  sequence:
    - wait_template: "{{ is_state('binary_sensor.door_1', 'on') }}"
      timeout: 10
      continue_on_timeout: false
    - action: switch.turn_on
      target:
        entity_id: switch.some_light
    - wait_for_trigger:
        - trigger: state
          entity_id: binary_sensor.door_2
          to: "on"
          for: 2
      timeout: "{{ wait.remaining }}"
      continue_on_timeout: false
    - action: switch.turn_off
      target:
        entity_id: switch.some_light
{% endexample %}

{% enddetails %}

## Writing steps in YAML

In YAML, the steps are a list under `actions:` in an automation, or under `sequence:` in a script. If there is only one step, you can leave out the list.

Every step can have an `alias`. The alias is the name of the step that the editor and the trace show. In the editor, you set it with **Rename**.

In an automation, the steps go under `actions:`:

{% example %}
automation: |
  actions:
    - alias: "Turn on ceiling light"
      action: light.turn_on
      target:
        entity_id: light.ceiling
    - alias: "Notify that ceiling light is turned on"
      action: notify.notify
      data:
        message: "Turned on the ceiling light!"
{% endexample %}

In a script, the same steps go under `sequence:`:

{% example %}
script: |
  sequence:
    - alias: "Turn on ceiling light"
      action: light.turn_on
      target:
        entity_id: light.ceiling
    - alias: "Notify that ceiling light is turned on"
      action: notify.notify
      data:
        message: "Turned on the ceiling light!"
{% endexample %}

In an automation, templates in the steps can use the `trigger` variable, which describes what started the automation. For details, refer to [available trigger data](/docs/automation/templating/#available-trigger-data).

## Options for any step

These options work on every step, both actions and building blocks.

<a id="continuing-on-error"></a>

### Continuing when a step fails

By default, an automation or script stops when a step fails. The run is marked as failed, and the error is logged. If a step can fail without affecting the rest, for example, a notification to an unreliable service, you can continue with the next step instead.

In the editor, in the **Menu** {% icon "mdi:dots-vertical" %} of the step, select **Continue on error**. For details, refer to [Continuing after an action fails](/docs/automation/editor/#continuing-after-an-action-fails).

In YAML, add `continue_on_error: true` to the step:

{% example %}
action: |
  - alias: "If this one fails..."
    continue_on_error: true
    action: notify.super_unreliable_service_provider
    data:
      message: "I'm going to error out..."

  - alias: "This one still runs"
    action: persistent_notification.create
    data:
      title: "Hi there!"
      message: "I'm fine..."
{% endexample %}

**Continue on error** doesn't ignore errors in the configuration, such as a broken template. The error is still shown in the trace and in the logs.

An action whose target is unavailable or doesn't exist doesn't fail. Home Assistant skips that target, so the next step runs even without **Continue on error**. If the target doesn't exist, the log shows a warning.

<a id="disabling-an-action"></a>

### Turning off a step

To try an automation or script without one of its steps, turn the step off instead of deleting it. Home Assistant skips it until you turn it on again.

In the editor, in the **Menu** {% icon "mdi:dots-vertical" %} of the step, select **Disable**. For details, refer to [Turning off a trigger, condition, or action](/docs/automation/editor/#turning-off-a-trigger-condition-or-action).

In YAML, add `enabled: false` to the step:

{% example %}
automation: |
  actions:
    # This step is skipped.
    - enabled: false
      alias: "Notify that the ceiling light is being turned on"
      action: notify.notify
      data:
        message: "Turning on the ceiling light!"

    # This step runs.
    - alias: "Turn on the ceiling light"
      action: light.turn_on
      target:
        entity_id: light.ceiling
{% endexample %}

`enabled` can also be a limited template, which can't use the state of entities. In a {% term blueprint %}, it can be a blueprint input. Home Assistant checks the value each time the step is about to run.

```yaml
actions:
  - delay: "0:35"
    enabled: !input input_boolean
```

[conditions page]: /docs/scripts/conditions/
[shorthand-template]: /docs/scripts/conditions/#template-condition-shorthand-notation
[script variables]: /integrations/script/#variables
