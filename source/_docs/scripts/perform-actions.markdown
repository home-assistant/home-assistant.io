---
title: "Performing actions"
description: "Learn how to set up an action in the editor or in YAML: choose what it controls with targets, set its options, use response data, and use templates."
related:
  - docs: /docs/automation/action/
    title: Automation actions
  - docs: /actions/
    title: List of available actions
  - docs: /docs/scripts/
    title: Building blocks and actions
  - docs: /docs/templating/
    title: Templating
  - docs: /docs/tools/dev-tools/#actions-tab
    title: Actions tab in Tools
---

An {% term action %} makes something happen, such as turning on a light or sending a notification. For what actions are and how they run in an automation, refer to [Automation actions](/docs/automation/action/).

You add an action in the automation or script editor. There, you choose what the action controls, and set its options. Some actions also return data that later steps can use.

## Adding an action in the editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open an automation. To edit a script, open the **Scripts** tab and open the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Search for and select the action, for example, **Turn on light**.
   - You can also first select what you want to control under **By target**, and then select the action.
4. If the action has targets, select what it should control under **Targets**.
   - For details, refer to [Action targets](#action-targets).
5. Fill in the other options of the action.
   - For details, refer to [Action options](#action-options).
6. Select **Save**.

## Testing an action

To check what an action does, run it on its own, without running the whole automation or script. The action is performed right away, so your devices change.

- In the editor, on the action, select **Menu** {% icon "mdi:dots-vertical" %} > **Run action**.
- To try an action before you add it, go to {% my tools_actions title="**Settings** > **Tools** > **Actions**" %}. For the steps, refer to [Actions tab](/docs/tools/dev-tools/#actions-tab).

## Action targets

The target is what an action controls. Under **Targets**, you can select entities, devices, areas, floors, and labels, or a combination of these. When you select an area, a floor, or a label, the action controls the matching entities that support it. For example, if **Turn on light** targets an area, all lights in that area turn on.

In YAML, enter the action under `action`, for example, `light.turn_on`. Enter what it controls under `target`. The `target` contains at least one of the following: `entity_id`, `device_id`, `area_id`, `floor_id`, or `label_id`. Each of these can be a list. Use the IDs in lowercase, not the names.

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

Each action has its own page with all its options, for example, [Turn on light](/actions/light.turn_on/). For all actions, refer to the [list of available actions](/actions/).

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

Some actions return data that you can use in the next steps of your automation or script. This data is called _action response data_. Actions return response data for information that is dynamic or large, and that doesn't fit well in an entity state. For example, response data can be the upcoming calendar events for the next week, or detailed driving directions.

To use the response data, store it in a [variable](/docs/scripts/#variables). You can choose any name for the variable.

- In the editor, actions that return data show a **Response variable** field. If the response is optional for the action, first select the checkbox next to the field. Then enter the name of the variable.
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

In a later step of the same automation or script, you can use the variable `agenda` in a template. The following example sends a notification with the response data. Which options a notification action accepts depends on the notification integration.

```yaml
action: notify.gmail_com
data:
  target: "gduser1@workspacesamples.dev"
  title: "Daily agenda for {{ now().date() }}"
  message: >-
    Your agenda for today:
    <p>
    {% for event in agenda['calendar.school'].events %}
    {{ event.start }}: {{ event.summary }}<br>
    {% endfor %}
    </p>
```

## Templates in actions

With [templating], an action can decide what to do when it runs. In text fields, such as the message of a notification, you can enter a template directly. To use a template for the action itself, its targets, or all its options at once, select **Menu** {% icon "mdi:dots-vertical" %} > **Edit in YAML** on the action.

### Choosing the action with a template

A template can choose which action to perform. For example, the following action turns a switch on or off based on the temperature.

```yaml
action: >
  {% if states('sensor.temperature') | float(15) > 15 %}
    switch.turn_on
  {% else %}
    switch.turn_off
  {% endif %}
target:
  entity_id: switch.ac
```

### Setting targets and options with a template

Templates can also set the target and the options that you pass to the action.

```yaml
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
```

A template can also return all options at once, as a dictionary. Use this when different situations need different options, not just different values.

```yaml
action: climate.set_temperature
target:
  entity_id: climate.living_room
data: >
  {% if states('sensor.temperature_living') | float(19) < 19 %}
    {"hvac_mode": "heat", "temperature": 21}
  {% else %}
    {"hvac_mode": "heat_cool", "target_temp_low": 19, "target_temp_high": 24}
  {% endif %}
```

[templating]: /docs/templating/
