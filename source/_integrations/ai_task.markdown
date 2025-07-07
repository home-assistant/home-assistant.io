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

The **AI Task** {% term integration %} allows you to use AI to help you configure Home Assistant.

{% include integrations/building_block_integration.md %}

For each task, you can set a preferred AI task entity. This allows you to use different AI models for different purposes, such as generating text, summarizing information, or even controlling devices. When the entity ID is omitted in the action, the preferred AI task entity will be used.

## The state of an AI task entity

The {% term state %} of an AI task {% term entity %} is a timestamp showing the date and time when the AI task was last used.

## Action `ai_task.generate_data`

Generates data using AI.

| Data attribute | Optional | Description                                                                                                     |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `task_name`            | no       | String that identifies the type of text generation task (for example, "home summary", "alert notification").           |
| `instructions`         | no       | String containing the specific instructions for the AI to follow when generating the text.                      |
| `entity_id`            | yes      | String that points at an `entity_id` of an LLM task entity. If not specified, uses the default LLM task.       |
| `structure`            | yes      | Dictionary defining the structure of the output data. When set, the AI will return structured data with the specified fields. Each field can have a `description`, `selector`, and optional `required` property. |
| `attachments`          | yes      | List of attachments to include in the task. Each attachment is the output of the [Media Selector](https://www.home-assistant.io/docs/blueprint/selectors/#media-selector).

The response variable is a dictionary with the following keys:

- `data`: The generated text or structured data (depending on whether `structure` is specified).
- `conversation_id`: The ID of the conversation used for the task.

## Examples

### Structured output example

{% raw %}

```yaml
# Example: Generate structured user profile data
script:
- alias: "Create fake user profile"
  sequence:
    - action: ai_task.generate_data
      data:
        task_name: "user profile generation"
        instructions: "Generate a profile for a new user"
        structure:
          name:
            description: "First and last name of the user"
            required: true
            selector:
              text:
          age:
            description: "Age of the user"
            required: true
            selector:
              number:
                min: 0
                max: 120
          interests:
            description: "List of user interests"
            required: true
            selector:
              select:
                options:
                  - "Technology"
                  - "Sports"
                  - "Music"
                  - "Travel"
                multiple: true
      attachments:
        - media_content_id: "media-source://user_profile_image.jpg"
          media_content_type: "image/jpeg"
      response_variable: user_profile
    - action: notify.persistent_notification
      data:
        title: "New User Profile"
        message: "Name: {{ user_profile.data.name }}, Age: {{ user_profile.data.age }}, Interests: {{ user_profile.data.interests | join(', ') }}"
```

{% endraw %}

### Simple text generation example

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
    - action: ai_task.generate_data
      data:
        task_name: "garage door left open comment"
        instructions: "Generate a funny notification that garage door was left open"
      response_variable: generated_text
    - action: notify.persistent_notification
      data:
        message: "{{ generated_text.data }}"
```

{% endraw %}
