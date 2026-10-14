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

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select an automation. To edit a script, go to the **Scripts** tab and select the script.
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

#### Automation: Fire a custom event when a switch turns on

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

#### Automation: React to the custom event

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
- Set the response in the automation itself. If the automation runs a script, a response that the script sets doesn't reach Assist. To use data from a script, let the script [return a response](/building-blocks/stop/#examples) with **Stop**, and use that data in the automation's **Set conversation response**.

### Examples of Set conversation response

#### Automation: Answer whether the garage door is open

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

<a id="adding-choose-in-the-editor"></a>
<a id="choose-options-in-the-ui"></a>
<a id="choose-in-yaml"></a>
<a id="choose-options-in-yaml"></a>
<a id="good-to-know-about-choose"></a>
<a id="examples-of-choose"></a>
<a id="automation-run-a-different-script-depending-on-the-home-mode"></a>
<a id="automation-turn-on-lights-in-rooms-that-are-in-use"></a>

The **Choose** building block has several options, each with its own conditions and actions. For the steps, options, and examples, refer to [Choose](/building-blocks/choose/).


<a id="test-a-condition"></a>

## Condition

<a id="adding-condition-in-the-editor"></a>
<a id="condition-options-in-the-ui"></a>
<a id="condition-in-yaml"></a>
<a id="condition-options-in-yaml"></a>
<a id="good-to-know-about-condition"></a>

The **Condition** building block checks a condition in the middle of a sequence. For the steps, options, and examples, refer to [Condition](/building-blocks/condition/).


<a id="variables"></a>

## Define variables

<a id="adding-define-variables-in-the-editor"></a>
<a id="define-variables-options-in-the-ui"></a>
<a id="define-variables-in-yaml"></a>
<a id="define-variables-options-in-yaml"></a>
<a id="good-to-know-about-define-variables"></a>
<a id="scope-of-variables"></a>
<a id="examples-of-define-variables"></a>
<a id="script-count-the-people-who-are-home"></a>

The **Define variables** building block sets variables that templates in the next steps can use. For the steps, options, and examples, refer to [Define variables](/building-blocks/variables/).


## If-then

<a id="adding-if-then-in-the-editor"></a>
<a id="if-then-options-in-the-ui"></a>
<a id="if-then-in-yaml"></a>
<a id="if-then-options-in-yaml"></a>
<a id="good-to-know-about-if-then"></a>

The **If-then** building block runs actions only if its conditions are met. For the steps, options, and examples, refer to [If-then](/building-blocks/if/).


<a id="repeat-a-group-of-actions"></a>
<a id="for-each"></a>

## Repeat for each

<a id="adding-repeat-for-each-in-the-editor"></a>
<a id="repeat-for-each-options-in-the-ui"></a>
<a id="repeat-for-each-in-yaml"></a>
<a id="repeat-for-each-options-in-yaml"></a>
<a id="repeat-for-each-repeat-variable"></a>
<a id="good-to-know-about-repeat-for-each"></a>
<a id="examples-of-repeat-for-each"></a>
<a id="automation-send-a-notification-for-each-sensor-with-low-battery"></a>

The **Repeat for each** building block runs a group of actions once for each item in a list. For the steps, options, and examples, refer to [Repeat for each](/building-blocks/repeat_for_each/).


<a id="counted-repeat"></a>

## Repeat multiple times

<a id="adding-repeat-multiple-times-in-the-editor"></a>
<a id="repeat-multiple-times-options-in-the-ui"></a>
<a id="repeat-multiple-times-in-yaml"></a>
<a id="repeat-multiple-times-options-in-yaml"></a>
<a id="repeat-loop-variable"></a>
<a id="repeat-multiple-times-repeat-variable"></a>
<a id="good-to-know-about-repeat-multiple-times"></a>

The **Repeat multiple times** building block runs a group of actions a set number of times. For the steps, options, and examples, refer to [Repeat multiple times](/building-blocks/repeat_count/).


## Repeat until

<a id="adding-repeat-until-in-the-editor"></a>
<a id="repeat-until-options-in-the-ui"></a>
<a id="repeat-until-in-yaml"></a>
<a id="repeat-until-options-in-yaml"></a>
<a id="repeat-until-repeat-variable"></a>
<a id="good-to-know-about-repeat-until"></a>
<a id="examples-of-repeat-until"></a>
<a id="automation-repeat-a-command-until-it-works"></a>

The **Repeat until** building block runs a group of actions until its conditions are met. For the steps, options, and examples, refer to [Repeat until](/building-blocks/repeat_until/).


<a id="while-loop"></a>

## Repeat while

<a id="adding-repeat-while-in-the-editor"></a>
<a id="repeat-while-options-in-the-ui"></a>
<a id="repeat-while-in-yaml"></a>
<a id="repeat-while-options-in-yaml"></a>
<a id="repeat-while-repeat-variable"></a>
<a id="good-to-know-about-repeat-while"></a>

The **Repeat while** building block runs a group of actions as long as its conditions are met. For the steps, options, and examples, refer to [Repeat while](/building-blocks/repeat_while/).


<a id="grouping-actions"></a>

## Run in sequence

<a id="adding-run-in-sequence-in-the-editor"></a>
<a id="run-in-sequence-options-in-the-ui"></a>
<a id="run-in-sequence-in-yaml"></a>
<a id="run-in-sequence-options-in-yaml"></a>
<a id="good-to-know-about-run-in-sequence"></a>
<a id="examples-of-run-in-sequence"></a>
<a id="automation-turn-on-devices-then-send-notifications"></a>

The **Run in sequence** building block groups actions that run one after the other. For the steps, options, and examples, refer to [Run in sequence](/building-blocks/sequence/).


<a id="parallelizing-actions"></a>

## Run in parallel

<a id="adding-run-in-parallel-in-the-editor"></a>
<a id="run-in-parallel-options-in-the-ui"></a>
<a id="run-in-parallel-in-yaml"></a>
<a id="run-in-parallel-options-in-yaml"></a>
<a id="good-to-know-about-run-in-parallel"></a>
<a id="examples-of-run-in-parallel"></a>
<a id="script-wait-for-motion-in-one-group-and-send-a-message-right-away-in-another"></a>

The **Run in parallel** building block starts several actions at the same time, instead of one after the other. For the steps, options, and examples, refer to [Run in parallel](/building-blocks/parallel/).

<a id="stopping-a-script-sequence"></a>

## Stop

<a id="adding-stop-in-the-editor"></a>
<a id="stop-options-in-the-ui"></a>
<a id="stop-in-yaml"></a>
<a id="stop-options-in-yaml"></a>
<a id="good-to-know-about-stop"></a>
<a id="examples-of-stop"></a>
<a id="script-and-automation-return-the-outdoor-temperature-from-a-script"></a>

The **Stop** building block stops the automation or script. For the steps, options, and examples, refer to [Stop](/building-blocks/stop/).


## Wait for time to pass (delay)

<a id="adding-wait-for-time-to-pass-delay-in-the-editor"></a>
<a id="wait-for-time-to-pass-delay-options-in-the-ui"></a>
<a id="wait-for-time-to-pass-delay-in-yaml"></a>
<a id="wait-for-time-to-pass-delay-options-in-yaml"></a>
<a id="good-to-know-about-wait-for-time-to-pass-delay"></a>
<a id="examples-of-wait-for-time-to-pass-delay"></a>
<a id="automation-turn-off-the-light-5-minutes-after-the-last-motion"></a>

The **Wait for time to pass (delay)** building block pauses the automation or script for a set time. For the steps, options, and examples, refer to [Wait for time to pass (delay)](/building-blocks/delay/).

<a id="wait"></a>

## Wait for a template

<a id="adding-wait-for-a-template-in-the-editor"></a>
<a id="wait-for-a-template-options-in-the-ui"></a>
<a id="wait-for-a-template-in-yaml"></a>
<a id="wait-timeout"></a>
<a id="wait-for-a-template-options-in-yaml"></a>
<a id="wait-variable"></a>
<a id="wait-for-a-template-wait-variable"></a>
<a id="good-to-know-about-wait-for-a-template"></a>
<a id="examples-of-wait-for-a-template"></a>
<a id="script-take-different-actions-depending-on-whether-the-door-opened"></a>

The **Wait for a template** building block pauses the automation or script until a template is true. For the steps, options, and examples, refer to [Wait for a template](/building-blocks/wait_template/).

## Wait for a trigger

<a id="adding-wait-for-a-trigger-in-the-editor"></a>
<a id="wait-for-a-trigger-options-in-the-ui"></a>
<a id="wait-for-a-trigger-in-yaml"></a>
<a id="wait-for-a-trigger-options-in-yaml"></a>
<a id="wait-for-a-trigger-wait-variable"></a>
<a id="good-to-know-about-wait-for-a-trigger"></a>
<a id="examples-of-wait-for-a-trigger"></a>
<a id="automation-turn-off-the-heating-when-a-window-stays-open"></a>
<a id="script-wait-a-total-of-10-seconds"></a>

The **Wait for a trigger** building block pauses the automation or script until one of its triggers reacts to a change. For the steps, options, and examples, refer to [Wait for a trigger](/building-blocks/wait_for_trigger/).

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

These options work on every step, both actions and building blocks. The only exception is **Continue on error**, which conditions don't have.

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

An action whose target is unavailable or doesn't exist doesn't fail. Home Assistant skips that target and logs a warning, so the next step runs even without **Continue on error**. The action does fail if an entity that you selected directly doesn't support it, or if the action should return response data and none of its targets match.

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
[shorthand-template]: /conditions/template/#shorthand-notation
[script variables]: /integrations/script/#variables
