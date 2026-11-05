---
title: "Actions in automations and scripts"
description: "Actions are what an automation or script does. Learn how to add an action, choose its targets, set its options, and use response data and templates."
toc: true
related:
  - docs: /actions/
    title: List of available actions
  - docs: /docs/automation/building-blocks/
    title: Building blocks
  - docs: /docs/automation/targets/
    title: Automation targets
  - docs: /docs/templating/
    title: Templating
  - docs: /docs/tools/dev-tools/#actions-tab
    title: Actions tab in Tools
  - docs: /docs/automation/testing/
    title: Testing automations
  - docs: /integrations/script/
    title: Scripts
---

An {% term action %} is the part of an automation or script that makes something happen, for example, turning on a light, sending a notification, or activating a [scene](/docs/scene/). When a [trigger](/docs/automation/trigger/) starts an automation and its [conditions](/docs/automation/condition/) are met, the automation runs its actions. A script runs its actions when you start it. Automations and scripts use the same actions.

Each action does one thing. For example, **Turn on light** turns on lights. For a description of all actions, refer to the [list of available actions](/actions/).

Some actions control automations themselves, for example, to turn off another automation. For these actions, refer to [Actions for automations](/docs/automation/basics/#actions-for-automations).

## Parts of an action

Many actions have some of the following parts:

- Targets: what the action controls, for example, the lights in the living room.
  - For details, refer to [Action targets](#action-targets).
- Options: details of what the action does, for example, the brightness of the lights.
  - For details, refer to [Action options](#action-options).
- Response data: what the action returns, for example, the calendar events of the next week.
  - For details, refer to [Action response data](#action-response-data).

## Actions run in order

An automation or script runs its actions one after the other, from top to bottom.

As a result:

- If a condition between the actions isn't met, the actions after the condition don't run. For details, refer to [Condition](/building-blocks/condition/).
- If an action fails, the actions after the failed action don't run. To continue anyway, refer to [Continuing when a step fails](/docs/automation/building-blocks/#continuing-when-a-step-fails).
- Actions don't run at the same time. To run actions at the same time, use [Run in parallel](/building-blocks/parallel/).

## Actions and building blocks

Building blocks control whether, when, and in which order the actions run. For example, a building block can check a condition, wait a few seconds, repeat steps, or choose between steps. To add a building block in the editor, select **Add action**, and then select **Blocks**. For how steps run, refer to [Building blocks](/docs/automation/building-blocks/). For all building blocks, refer to the [list of building blocks](/building-blocks/).

## Built-in actions

Most actions come from integrations. Two actions are [built into automations and scripts](/actions/#built_in):

- [**Fire manual event**](/actions/event/): Lets one automation tell another that something happened.
- [**Set conversation response**](/actions/set_conversation_response/): Sets what Assist says after a sentence trigger.

Built-in actions only work as steps in an automation or script. You can't run them directly from {% my tools_actions title="**Settings** > **Tools** > **Actions**" %} or from a dashboard button, and they don't have targets.

## Adding an action in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select an automation. To edit a script, go to the **Scripts** tab and select the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Search for and select the action, for example, **Turn on light**.
   - You can also first select what you want to control under **By target**, and then select the action.
4. If the action has targets, select what it should control under **Targets**.
   - For details, refer to [Action targets](#action-targets).
5. Fill in the other options of the action.
   - For details, refer to [Action options](#action-options).
6. Select **Save**.

## Adding an action in YAML

In YAML, use `action` with the name of the action, and optionally `target` and `data`. To give the action a name, use `alias`. In the editor, you set the same name with **Menu** {% icon "mdi:dots-vertical" %} > **Rename**. For details, refer to [Renaming a trigger, condition, or action](/docs/automation/editor/#renaming-a-trigger-condition-or-action).

{% example %}
action: |
  alias: "Bedroom lights on"
  action: light.turn_on
  target:
    entity_id: light.bedroom
  data:
    brightness: 100
{% endexample %}

For details on `target` and `data`, refer to [Action targets](#action-targets) and [Action options](#action-options). For how actions fit in the list of steps of an automation or script, refer to [Writing steps in YAML](/docs/automation/building-blocks/#writing-steps-in-yaml).

In older YAML, you may find a shortcut to activate a {% term scene %}. It does the same as the [**Activate scene**](/actions/scene.turn_on/) action. When you open the step in the editor, the editor changes it to `action: scene.turn_on`.

{% example %}
action: |
  scene: scene.morning_living_room
{% endexample %}

## Action targets

The target is what an action controls. Under **Targets**, you can select entities, devices, areas, floors, and labels, or a combination of these. When you select an area, a floor, or a label, the action controls the matching entities that support it. For example, if **Turn on light** targets an area, all lights in that area turn on. To learn which entities are part of a target, refer to [Automation targets](/docs/automation/targets/). To leave out some of them, for example, all lights in an area except one, refer to [Excluding targets](/docs/automation/targets/#excluding-targets).

In YAML, enter what the action controls under `target`. The `target` contains at least one of the following: `entity_id`, `device_id`, `area_id`, `floor_id`, or `label_id`. Each of these can be a list. Use the IDs in lowercase, not the names. To leave out some entities, add an exclude block. For details and an example, refer to [Targets in YAML](/docs/automation/targets/#targets-in-yaml).


The following example uses one action to turn on the lights in the living room area, two light devices, and two light entities:

{% example %}
action: |
  action: light.turn_on
  target:
    area_id: living_room
    device_id:
      - ff22a1889a6149c5ab6327a8236ae704
      - 52c050ca1a744e238ad94d170651f96b
    entity_id:
      - light.hallway
      - light.landing
{% endexample %}

## Action options

Most actions have options besides the target. For example, **Turn on light** has options for the brightness and the color. The options are shown below **Targets**.

- Required options don't have a checkbox. You always fill them in.
- The other options have a checkbox. To use one of these options, select its checkbox.
- Some options only show up when the selected targets support them.

Each action has its own page with all its options, for example, [Turn on light](/actions/light.turn_on/).

In YAML, the options go under `data`:

{% example %}
action: |
  action: light.turn_on
  target:
    entity_id: light.living_room
  data:
    brightness: 120
    rgb_color:
      - 255
      - 0
      - 0
{% endexample %}

<a id="use-templates-to-handle-response-data"></a>

## Action response data

Some actions return data that you can use in later steps of your automation or script. This data is called _action response data_. Actions return response data for information that is dynamic or large, and that doesn't fit well in an entity state. For example, response data can be the upcoming calendar events for the next week, or detailed driving directions.

To use the response data, store it in a [variable](/building-blocks/variables/). You can choose any name for the variable.

- In the editor, actions that return data show a **Response variable** field. If the field has a checkbox next to it, select the checkbox first. Then enter the name of the variable.
- In YAML, use `response_variable`.

The following example stores the calendar events of the next 24 hours in the variable `agenda`.

{% example %}
action: |
  action: calendar.get_events
  target:
    entity_id: calendar.school
  data:
    duration:
      hours: 24
  response_variable: agenda
{% endexample %}

In a later step of the same automation or script, you can use the variable `agenda` in a template. The following example sends the events in a notification.

{% example %}
action: |
  action: notify.send_message
  target:
    entity_id: notify.email
  data:
    title: "Daily agenda for {{ now().date() }}"
    message: >-
      Your agenda for today:
      {% for event in agenda['calendar.school'].events %}
      {{ event.start }}: {{ event.summary }}
      {% endfor %}
{% endexample %}

### Required and optional response data

Actions handle response data in one of the following ways:

- Some actions always return data. For example, `calendar.get_events` returns the events of a calendar. For these actions, the response variable is required. If you leave it out, the action fails when it runs, and the automation or script stops.
- Some actions can return data. For example, `conversation.process` can return the reply of the conversation agent. For these actions, the response variable is optional. If you set it, the data is stored in the variable. If you leave it out, the action still runs, but its data isn't stored.
- Most actions don't return data. In the editor, they don't show a **Response variable** field. If you add `response_variable` to one of these actions in YAML, the action fails when it runs, and the automation or script stops.

To find out whether an action returns data, add the action to an automation or script in its editor. If the action returns data, it shows a **Response variable** field. If the field has a checkbox next to it, the response variable is optional. If it has no checkbox, the response variable is required.

To see the data that an action returns, perform the action in {% my tools_actions title="**Settings** > **Tools** > **Actions**" %}. The data is shown under **Response**. For the steps, refer to [Performing an action](/docs/tools/dev-tools/#performing-an-action).

### What the response data looks like

Response data is a set of keys, each with a value. Which keys it contains depends on the action:

- An action that targets entities, such as `calendar.get_events` or `weather.get_forecasts`, returns one entry for each entity. The key of each entry is the entity ID. This is why the earlier example uses `agenda['calendar.school']`. Use the entity ID even if the action targets only one entity.
- Other actions return their own keys. To see them, perform the action in {% my tools_actions title="**Settings** > **Tools** > **Actions**" %}. For the steps, refer to [Performing an action](/docs/tools/dev-tools/#performing-an-action).

### Response data from scripts

A script can also return response data. To return data, the script uses the [Stop](/building-blocks/stop/) building block with a response variable.

To use the data, run the script as an action, for example, `script.morning_report`. For scripts, the response variable is optional. If you start the script with `script.turn_on`, you don't get its data. This action starts the script and continues right away, without waiting for it to finish.

Some integrations that run your own commands can also return data, such as [RESTful Command](/integrations/rest_command/), [Shell Command](/integrations/shell_command/), and [Python Scripts](/integrations/python_script/). For these actions, the response variable is optional, too.

## Templates in actions

With [templating], an action can decide what to do when it runs. In text fields, such as the message of a notification, you can enter a template directly. For other templates, such as for the action itself, its targets, or all its options at once, select **Menu** {% icon "mdi:dots-vertical" %} > **Edit in YAML** on the action.

### Choosing the action with a template

A template can choose which action to perform. For example, the following action turns a switch on or off based on the temperature.

{% example %}
action: |
  action: >
    {% if states('sensor.temperature') | float(15) > 15 %}
      switch.turn_on
    {% else %}
      switch.turn_off
    {% endif %}
  target:
    entity_id: switch.ac
{% endexample %}

### Setting targets and options with a template

Templates can also set the target and the options that you pass to the action.

{% example %}
action: |
  action: climate.set_temperature
  target:
    entity_id: >
      {% if now().hour >= 22 %}
        climate.bedroom
      {% else %}
        climate.living_room
      {% endif %}
  data:
    temperature: "{{ 18 if now().hour >= 22 else 21 }}"
{% endexample %}

A template can also return all options at once, as a dictionary. Use this when different situations need different options, not just different values.

{% example %}
action: |
  action: climate.set_temperature
  target:
    entity_id: climate.living_room
  data: >
    {% if states('sensor.temperature_living') | float(19) < 19 %}
      {"hvac_mode": "heat", "temperature": 21}
    {% else %}
      {
        "hvac_mode": "heat_cool",
        "target_temp_low": 19,
        "target_temp_high": 24
      }
    {% endif %}
{% endexample %}

<a id="running-the-actions-directly"></a>

## Testing an action

To check what an action does, run it on its own, without waiting for a trigger and without running the entire automation or script. The action is performed right away. For example, a light turns on, or a notification is sent.

- To run an action that you already added, select **Menu** {% icon "mdi:dots-vertical" %} > **Run action** on the action. For the steps and results, refer to [Testing an action](/docs/automation/testing/#testing-an-action).
- To run all the actions of an automation at once, refer to [Testing all the actions](/docs/automation/testing/#testing-all-the-actions).
- To try an action before you add it, go to {% my tools_actions title="**Settings** > **Tools** > **Actions**" %}. For the steps, refer to [Actions tab](/docs/tools/dev-tools/#actions-tab).

[templating]: /docs/templating/
