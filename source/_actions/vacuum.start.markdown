---
title: Start cleaning
action: vacuum.start
domain: vacuum
description: "Starts or resumes a cleaning task on a vacuum."
---

The **Start cleaning** action sends a start or resume command to a vacuum, beginning or continuing a cleaning job.

{% include integrations/labs_entity_actions_note.md %}

## Usage in the UI

To use this action in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an automation, or select **Create automation**.
3. In the **Add action** section, search for and select **Vacuum: Start cleaning**.
4. Choose one or more vacuum entities or an area.
5. Configure as needed and select **Save**.

## Usage in YAML

{% example %}
action: |
  - action: vacuum.start
    target:
      entity_id:
        - vacuum.downstairs
        - vacuum.upstairs
{% endexample %}

The `entity_id` is optional; omit it to target all vacuums.

## Options

### Options in YAML

{% options_yaml %}
target:
  description: The vacuum, area, or device to start cleaning.
  required: false
  type: target
{% endoptions_yaml %}

## Good to know

- This action only works if your vacuum supports the start function.

