---
title: "Count the Omer"
action: jewish_calendar.count_omer
domain: jewish_calendar
description: "Returns the phrase for counting the Omer on a given date."
---

The **Count the Omer** action returns the phrase for counting the Omer on a given date.

This is useful when you want an automation or script to announce or display the daily Omer count, for example as part of an evening routine during the Omer period.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Instead, you provide the date and tradition to count for.

{% include actions/ui_header.md %}

To count the Omer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Jewish Calendar: Count the Omer**.
6. Select the **Nusach**, and optionally set the **Date**, **After sunset**, and **Language**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Date:
  description: The date to count the Omer for. Defaults to today.
  required: false
After sunset:
  description: Uses the next Hebrew day, which starts at sunset, for the given date. This option is ignored if the date is empty. Defaults to on.
  required: false
Nusach:
  description: The nusach (tradition) to count the Omer in. One of Sfarad, Ashkenaz, Adot Mizrah, or Italian.
  required: true
Language:
  description: The language to count the Omer in. Supported languages are English, Hebrew, and French. Defaults to Hebrew.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `jewish_calendar.count_omer`. Because this action returns data, use `response_variable` to capture the result. A basic example looks like this:

{% example %}
action: |
  action: jewish_calendar.count_omer
  data:
    nusach: sfarad
    date: "2025-05-20"
    language: en
  response_variable: omer
{% endexample %}

This counts the Omer for the given date and stores the result in the `omer` variable.

### Options in YAML

{% options_yaml %}
date:
  description: >
    The date to count the Omer for. Defaults to today.
  required: false
  type: date
after_sunset:
  description: >
    Uses the next Hebrew day, which starts at sunset, for the given date.
    This option is ignored if the date is empty.
  required: false
  type: boolean
  default: true
nusach:
  description: >
    The nusach (tradition) to count the Omer in. One of `sfarad`,
    `ashkenaz`, `adot_mizrah`, or `italian`.
  required: true
  type: string
  default: sfarad
language:
  description: >
    The language to count the Omer in. Supported values are `en`, `he`,
    and `fr`. Defaults to Hebrew.
  required: false
  type: string
  default: he
{% endoptions_yaml %}

## Response data

The action returns the following data:

- `message`: The phrase for counting the Omer. Empty when there is no Omer count on the given day.
- `weeks`: The number of complete weeks counted.
- `days`: The number of days counted beyond the complete weeks.
- `total_days`: The total number of days counted.

For the example above, the response looks similar to this:

{% example %}
output: |
  message: >-
    Today is the thirty-seventh day, which are five weeks and two days of the
    Omer
  weeks: 5
  days: 2
  total_days: 37
{% endexample %}

{% include actions/more_examples.md %}

### Count today's Omer in Hebrew

For a minimal call, provide only the required nusach. With no date, the action counts the current Hebrew day, taking the current time relative to sunset into account, and returns the text in Hebrew by default.

{% example %}
action: |
  action: jewish_calendar.count_omer
  data:
    nusach: sfarad
  response_variable: omer
{% endexample %}

This returns a response similar to:

{% example %}
output: |
  message: היום ארבעה עשר יום שהם שני שבועות לעומר
  weeks: 2
  days: 0
  total_days: 14
{% endexample %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
