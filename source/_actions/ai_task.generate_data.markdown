---
title: "Generate data"
action: ai_task.generate_data
domain: ai_task
description: "Uses AI to run a task that generates data, such as text or structured output."
related_actions:
  - ai_task.generate_image
---

The **Generate data** action uses AI to run a task that generates data, and returns the result as response data. You give it a set of instructions, and the AI task entity generates either free text or structured data that you can use elsewhere, for example in a template sensor or a notification.

This action does not support targets. Instead, you describe the task and, optionally, choose which AI task entity to run it on. When you leave the entity out, the preferred AI task entity is used.

{% include actions/ui_header.md %}

To generate data from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **AI Task: Generate data**.
6. Enter a **Task name** and the **Instructions**, and set any of the options you need.
7. In the **Response variable** field, enter a name to store the result, for example, `generated_text`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Task name:
  description: A name that identifies the type of task, such as "home summary" or "alert notification".
  required: true
Instructions:
  description: The specific instructions for the AI to follow when generating the data.
  required: true
Entity ID:
  description: The AI task entity to run the task on. When left empty, the preferred AI task entity is used.
  required: false
Structured output:
  description: When set, the AI returns structured data with the fields you define. Each field can have a description, a selector, and an optional required property.
  required: false
Attachments:
  description: A list of files to attach for multi-modal AI analysis, such as a camera snapshot.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ai_task.generate_data`. A basic example looks like this:

{% example %}
action: |
  action: ai_task.generate_data
  data:
    task_name: "garage door left open comment"
    instructions: "Generate a funny notification that the garage door was left open"
  response_variable: generated_text
{% endexample %}

This generates the text and stores it in the `generated_text` response variable.

### Options in YAML

{% options_yaml %}
task_name:
  description: A name that identifies the type of task, such as "home summary" or "alert notification".
  required: true
  type: string
instructions:
  description: The specific instructions for the AI to follow when generating the data.
  required: true
  type: string
entity_id:
  description: >
    The AI task entity to run the task on. When not provided, the preferred AI
    task entity is used.
  required: false
  type: string
structure:
  description: >
    When set, the AI returns structured data with the fields you define. The
    structure is a mapping where the keys are the field names and the values
    contain a `description`, a `selector`, and an optional `required` property.
  required: false
  type: map
attachments:
  description: >
    A list of files to attach for multi-modal AI analysis. Each attachment is
    the output of the [Media selector](/docs/blueprint/selectors/#media-selector).
  required: false
  type: list
{% endoptions_yaml %}

## Response data

The response data is a mapping with the following fields:

- `data`: The generated data. This is free text, or structured data when you set the `structure` option.
- `conversation_id`: The ID of the conversation used for the task.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
