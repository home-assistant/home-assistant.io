---
title: AI Task
description: Instructions on how to setup AI task entities with Home Assistant.
ha_category:
  - AI
ha_release: '2025.7'
ha_quality_scale: internal
ha_domain: ai_task
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

This integration allows Home Assistant to use AI to help you configure it.

{% include integrations/building_block_integration.md %}

Users are able to set preferred AI task entity for each task in the frontend. This allows users to have different AI models for different purposes, such as generating text, summarizing information, or even controlling devices. When the entity ID is omitted in the action, the preferred AI task entity will be used.

## The state of an AI task entity

The state of an AI task {% term entity %} is a timestamp showing the date and time when AI task was last used.

## Action `ai_task.generate_text`

Generates text using AI.

| Data attribute | Optional | Description                                                                                                     |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `task_name`            | no       | String that identifies the type of text generation task (e.g., "home summary", "alert notification").           |
| `instructions`         | no       | String containing the specific instructions for the AI to follow when generating the text.                      |
| `entity_id`            | yes      | String that points at an `entity_id` of an LLM task entity. If not specified, uses the default LLM task.       |

Response variable is a dictionary with the following keys:

- `text`: The generated text.
- `conversation_id`: The ID of the conversation used for the task.

{% raw %}
```yaml
# Example: Generate a notification when garage door is left open
automation:
- alias: "Garage door notification"
  triggers:
    - trigger: state
      entity_id: cover.garage_door
      to: 'on'
      for:
        minutes: 10
  actions:
    - action: ai_task.generate_text
      data:
        task_name: "garage door left open comment"
        instructions: "Generate a funny notification that garage door was left open"
      response_variable: generated_text
    - action: notify.mobile_app
      data:
        message: "{{ generated_text.result }}"
```
{% endraw %}
