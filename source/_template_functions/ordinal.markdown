---
title: "Convert number to ordinal: ordinal"
function_name: "ordinal"
description: "Converts a number to its ordinal string representation (1st, 2nd, 3rd, and so on)."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.117"
related_functions:
  - slugify
  - urlencode
---

The `ordinal` template filter converts a number into its ordinal string representation. Give it `1` and it returns `1st`, give it `2` and it returns `2nd`, give it `3` and it returns `3rd`, and so on. It correctly handles the special cases for 11th, 12th, and 13th.

This is useful for creating human-readable messages that include rankings or positions. For example, you might want to display "This is the 3rd time the door opened today" in a {% term notification %}, or show "Floor 2nd" on a dashboard. Anywhere you want a number to read naturally in English text, this filter handles it.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ 1 | ordinal }}'
type: string
output: 1st
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
ordinal(
    value: int | str,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The number to convert to an ordinal string. Can be an integer or a string representation of a number.
  required: true
  type: [integer, string]
{% endfunction_parameters %}

## Good to know

- English suffixes only. Other languages are not supported.
- Numbers ending in 11, 12, and 13 get `th`, not `st`, `nd`, or `rd`.
- The result includes the number and the suffix together, like `"21st"`, not just the suffix.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Display a counter with ordinal suffix

Show how many times an event has occurred today using a counter helper, with a natural-sounding ordinal format.

{% example %}
template: |
  {{
    "This is the " ~ (states("counter.door_opens") | int | ordinal)
    ~ " time the door opened today."
  }}
type: string
output: "This is the 5th time the door opened today."
{% endexample %}

### Show the day of the month as an ordinal

Display the current date in a friendly format with an ordinal day number.

{% example %}
template: |
  {{
    "Today is the " ~ (now().day | ordinal)
    ~ " of " ~ now().strftime("%B") ~ "."
  }}
type: string
output: "Today is the 15th of March."
{% endexample %}

### Handle special cases

The filter correctly handles the special English ordinal cases for 11, 12, and 13.

{% example %}
template: |
  {{ 11 | ordinal }}, {{ 12 | ordinal }}, {{ 13 | ordinal }},
  {{ 21 | ordinal }}, {{ 22 | ordinal }}, {{ 23 | ordinal }}
type: string
output: "11th, 12th, 13th, 21st, 22nd, 23rd"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
