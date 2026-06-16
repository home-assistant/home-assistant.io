---
title: "Generate image"
action: ai_task.generate_image
domain: ai_task
description: "Uses AI to generate an image from a set of instructions."
related_actions:
  - ai_task.generate_data
---

The **Generate image** action uses AI to generate an image from a set of instructions, and returns information about the result as response data. The generated image is also saved to your media directory, so you can browse it with the [Media source](/integrations/media_source/) integration.

This action does not target an entity. Instead, you describe the image and, optionally, choose which AI task entity to run it on. When you leave the entity out, the preferred AI task entity is used.

{% include actions/ui_header.md %}

To generate an image from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **AI Task: Generate image**.
6. Enter a **Task name** and the **Instructions**, and set any of the options you need.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Task name:
  description: A name that identifies the type of task, such as "floor map" or "weather visualization".
  required: true
Instructions:
  description: The specific instructions that explain the image to generate.
  required: true
Entity ID:
  description: The AI task entity to run the task on. When left empty, the preferred AI task entity is used.
  required: false
Attachments:
  description: A list of files to attach for the AI to use as references.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ai_task.generate_image`. A basic example looks like this:

{% example %}
action: |
  action: ai_task.generate_image
  data:
    task_name: "weather visualization"
    instructions: "New York when the weather is sunny"
  response_variable: generated_image
{% endexample %}

This generates the image and stores the result in the `generated_image` response variable.

### Options in YAML

{% options_yaml %}
task_name:
  description: A name that identifies the type of task, such as "floor map" or "weather visualization".
  required: true
  type: string
instructions:
  description: The specific instructions that explain the image to generate.
  required: true
  type: string
entity_id:
  description: >
    The AI task entity to run the task on. When not provided, the preferred AI
    task entity is used.
  required: false
  type: string
attachments:
  description: >
    A list of files to attach for the AI to use as references. Each attachment
    is the output of the [Media selector](/docs/blueprint/selectors/#media-selector).
  required: false
  type: list
{% endoptions_yaml %}

## Response data

The response data is a mapping with the following fields:

- `media_source_id`: The [Media source](/integrations/media_source/) content ID of the generated image.
- `url`: The URL of the generated image, without the host part. The URL is only valid for one hour.
- `revised_prompt`: The actual prompt used by the image model. Some models rewrite the instructions to add more detail or context.
- `model`: The image model that was used to generate the image.
- `mime_type`: The MIME type of the image.
- `width`: The image width.
- `height`: The image height.
- `conversation_id`: The ID of the conversation used for the task.

## Good to know

The image is saved in the first media directory and can be browsed with the [Media source](/integrations/media_source/) integration. Files are named using the format `{date}_{time}_{sanitized_task_name}.{ext}`, for example `2025-01-19_123456_home-security-camera.png`.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
