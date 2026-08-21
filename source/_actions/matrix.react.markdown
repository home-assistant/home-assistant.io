---
title: "React"
action: matrix.react
domain: matrix
description: "Sends a reaction to a message in a Matrix room."
related_actions:
  - matrix.send_message
---

Use this action to send a reaction to a message in a Matrix room, for example to acknowledge a message with a 👍.

{% include actions/ui_header.md %}

To react to a Matrix message from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Matrix: React**.
6. If more than one UI-managed Matrix account is configured, select the **Matrix account** to use.
7. Enter the **Reaction**, the **Room**, and the **Message ID** to react to.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Matrix account:
  description: UI-managed Matrix account to use. If no YAML bot is configured and only one UI-managed account is loaded, Home Assistant selects it automatically.
  required: false
Reaction:
  description: The reaction to send.
  required: true
Room:
  description: The room to send the reaction to.
  required: true
Message ID:
  description: The ID of the message to react to.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `matrix.react`:

{% example %}
action: |
  action: matrix.react
  data:
    config_entry_id: MATRIX_CONFIG_ENTRY_ID
    reaction: "✅"
    room: "#hasstest:matrix.org"
    message_id: "$-abcdeghij_klmnopqrstuvwxyz123"
{% endexample %}

This adds a ✅ reaction to the given message.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: Config entry ID of the UI-managed Matrix account to use. If no YAML bot is configured and only one UI-managed account is loaded, this can be omitted.
  required: false
  type: string
reaction:
  description: The reaction to send.
  required: true
  type: string
room:
  description: The room to send the reaction to.
  required: true
  type: string
message_id:
  description: The ID of the message to react to.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- A reaction does not have to be an emoji. It can be any valid string, but emoji are the typical use.
- The account must already be a member of the room. A UI-managed account does not join or sync rooms.
- When a YAML bot is configured and **Matrix account** is empty, the action uses the YAML bot.
- The YAML bot's `matrix_command` event provides the `room` and `event_id` values needed to react to a command message.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: acknowledge a Matrix command

Add a check mark to a Matrix message after the YAML bot receives the configured `!status` word command.

- **Trigger**: `matrix_command` event for the `status` command
- **Action**: React
  - **Reaction**: ✅
  - **Room**: Room from the event
  - **Message ID**: Event ID from the event

{% details "YAML example for acknowledging a Matrix command" %}

{% example %}
automation: |
  alias: "Acknowledge the Matrix status command"
  triggers:
    - trigger: event
      event_type: matrix_command
      event_data:
        command: status
  actions:
    - action: matrix.react
      data:
        reaction: "✅"
        room: "{{ trigger.event.data.room }}"
        message_id: "{{ trigger.event.data.event_id }}"
{% endexample %}

{% enddetails %}

### Automation: mark a request for follow-up

Add an eyes reaction after the YAML bot receives the configured `!review` word command.

- **Trigger**: `matrix_command` event for the `review` command
- **Action**: React
  - **Matrix account**: Home account
  - **Reaction**: 👀
  - **Room**: Room from the event
  - **Message ID**: Event ID from the event

{% details "YAML example for marking a request for follow-up" %}

{% example %}
automation: |
  alias: "Mark a Matrix request for follow-up"
  triggers:
    - trigger: event
      event_type: matrix_command
      event_data:
        command: review
  actions:
    - action: matrix.react
      data:
        config_entry_id: MATRIX_CONFIG_ENTRY_ID
        reaction: "👀"
        room: "{{ trigger.event.data.room }}"
        message_id: "{{ trigger.event.data.event_id }}"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
