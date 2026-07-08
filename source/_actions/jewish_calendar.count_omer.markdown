---
title: "Count the Omer"
action: jewish_calendar.count_omer
domain: jewish_calendar
description: "Returns the phrase for counting the Omer on a given date."
---

Use this action to get the phrase for counting the Omer on a given date.

{% include actions/ui_header.md %}

To count the Omer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select **Jewish Calendar: Count the Omer**.
6. Set the nusach and other options.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Date:
  description: The date for which to get the Omer count. If unset, the action uses today.
  required: false
After sunset:
  description: If enabled and a date is provided, the action calculates the Omer count based on the Hebrew date, which starts after sunset. Ignored if no date is specified.
  required: false
  default: true
Nusach:
  description: The nusach, or tradition, of the Omer blessing.
  default: sfarad
Language:
  description: The language to return. Supported languages are English, Hebrew, and French.
  required: false
  default: he
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `jewish_calendar.count_omer`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: jewish_calendar.count_omer
  data:
    nusach: sfarad
    date: "2025-05-20"
    language: en
  response_variable: omer_count
{% endexample %}

This returns the Omer count for May 20, 2025, in English.

### Options in YAML

{% options_yaml %}
date:
  description: The date for which to get the Omer count. If unset, the action uses today.
  required: false
  type: string
after_sunset:
  description: If true and a date is provided, the action calculates the Omer count based on the Hebrew date, which starts after sunset. Ignored if no date is specified.
  required: false
  type: boolean
  default: true
nusach:
  description: The nusach, or tradition, of the Omer blessing. Supported values are `sfarad`, `ashkenaz`, `adot_mizrah`, and `italian`.
  required: true
  type: string
  default: sfarad
language:
  description: The language to return. Supported values are `en`, `he`, and `fr`.
  required: false
  type: string
  default: he
{% endoptions_yaml %}

This action does not support targets.

## Response data

The action response includes the following fields:

- `message`: The phrase for counting the Omer. If there is no Omer count on the given day, this value is empty.
- `weeks`: The number of complete weeks.
- `days`: The number of days after the complete weeks.
- `total_days`: The total number of Omer days.

## Good to know

- If there is no Omer count on the given day, the message is empty.
- The Hebrew date starts after sunset.

{% include actions/more_examples.md %}

### Minimal count in Hebrew

{% example %}
action: |
  action: jewish_calendar.count_omer
  data:
    nusach: sfarad
  response_variable: omer_count
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
