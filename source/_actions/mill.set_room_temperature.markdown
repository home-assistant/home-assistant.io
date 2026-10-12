---
title: "Set room temperature"
action: mill.set_room_temperature
domain: mill
description: "Sets the away, comfort, and sleep temperatures for a Mill room."
---

Use this action to set the temperatures for a room in the Mill app. You identify the room by its name and set any of the away, comfort, and sleep temperatures for it.

This is handy in automations, for example, to lower the comfort temperature of a room while you are away and raise it again before you get home.

{% include actions/ui_header.md %}

To set a room temperature from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Mill: Set room temperature**.
6. Enter the **Room name** and set the temperatures you want to change.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Room name:
  description: The name of the room to change.
  required: true
Away temperature:
  description: The room temperature in away mode.
  required: false
Comfort temperature:
  description: The room temperature in comfort mode.
  required: false
Sleep temperature:
  description: The room temperature in sleep mode.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mill.set_room_temperature`. A basic example looks like this:

{% example %}
action: |
  action: mill.set_room_temperature
  data:
    room_name: "Kitchen"
    comfort_temp: 21
{% endexample %}

This sets the comfort temperature of the Kitchen room to 21 degrees.

### Options in YAML

{% options_yaml %}
room_name:
  description: >
    The name of the room to change.
  required: true
  type: string
away_temp:
  description: >
    The room temperature in away mode.
  required: false
  type: integer
comfort_temp:
  description: >
    The room temperature in comfort mode.
  required: false
  type: integer
sleep_temp:
  description: >
    The room temperature in sleep mode.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- The room name must match a room configured in the Mill app.
- You only need to set the temperatures you want to change. Any temperature you leave empty stays as it is.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: lower the comfort temperature while away

When everyone leaves home, lower the comfort temperature of the living room to save energy.

- **Trigger**: Everyone leaves home
- **Action**: Mill: Set room temperature

{% details "YAML example for lowering the temperature while away" %}

{% example %}
automation: |
  alias: "Lower Mill living room temperature when away"
  triggers:
    - trigger: state
      entity_id: zone.home
      to: "0"
  actions:
    - action: mill.set_room_temperature
      data:
        room_name: "Living room"
        comfort_temp: 17
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
