---
title: "Get queue details"
action: music_assistant.get_queue
domain: music_assistant
description: "Retrieves the details of the active queue of a Music Assistant player."
related_actions:
  - music_assistant.transfer_queue
  - music_assistant.get_library
---

Use this action to retrieve the details of the currently active queue of a Music Assistant player. It returns information about the current and next items in the queue, which you can use to build a custom media dashboard. On request, it also returns the items in the queue.

This action returns its result in a response variable, which you can use in later steps of the same automation or script. It does not change anything on the player.

{% include actions/ui_header.md %}

To get queue details from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Music Assistant media player whose queue you want to retrieve.
6. From the actions shown for that target, select **Get queue details**.
7. Fill in the options you want to use.
8. In the **Response variable** field, enter a name to store the data in, such as `queue_info`.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Limit:
  description: The maximum number of queue items to return. Leave it at 0 to only return the queue details.
Offset:
  description: The point in the queue to start returning items from.
Username:
  description: Retrieve the queue items as this Music Assistant user. The action fails when this user may not access the player. When omitted, the items are retrieved as the Home Assistant user who started the action, if that user is linked to a Music Assistant user.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `music_assistant.get_queue`. A basic example looks like this:

{% example %}
action: |
  action: music_assistant.get_queue
  target:
    entity_id: media_player.kitchen_speaker
  response_variable: queue_info
{% endexample %}

### Options in YAML

{% options_yaml %}
limit:
  description: The maximum number of queue items to return. Leave it at `0` to only return the queue details.
  required: false
  type: integer
  default: 0
offset:
  description: The point in the queue to start returning items from.
  required: false
  type: integer
  default: 0
username:
  description: Retrieve the queue items as this Music Assistant user. The action fails when this user may not access the player. When omitted, the items are retrieved as the Home Assistant user who started the action, if that user is linked to a Music Assistant user.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Response data

The action returns the queue details for the targeted player, keyed by entity ID. Each entry includes the current and next items in the queue along with their metadata.

This example stores the name of the currently playing track in an [input text](/integrations/input_text/) helper, which you can then show on a dashboard:

{% example %}
script: |
  sequence:
    - action: music_assistant.get_queue
      target:
        entity_id: media_player.kitchen_speaker
      response_variable: queue_info
    - action: input_text.set_value
      target:
        entity_id: input_text.now_playing
      data:
        value: "{{ queue_info['media_player.kitchen_speaker'].current_item.name }}"
{% endexample %}

When you set a **Limit**, each entry also includes a `queue_items` list with the requested items, in the same format as the current and next item. Each item has a `queue_item_id` that identifies it in the queue.

This example sends a notification with the names of the first five items in the queue:

{% example %}
script: |
  sequence:
    - action: music_assistant.get_queue
      target:
        entity_id: media_player.kitchen_speaker
      data:
        limit: 5
      response_variable: queue_info
    - action: notify.notify
      data:
        message: >
          In the queue:
          {{ queue_info['media_player.kitchen_speaker'].queue_items | map(attribute='name') | join(', ') }}
{% endexample %}

## Good to know

- Some metadata, such as favorite status, explicit status, last played, played count, and disc art URL, is only available for items that are in the Music Assistant library.
- Without a **Limit**, the action only reads the queue details Home Assistant already has. With a limit, it also requests the items from the Music Assistant server.
- Retrieving the queue items as a specific user requires Music Assistant server version 2.11 or later.

{% include actions/stuck.md %}

{% include actions/related.md %}
