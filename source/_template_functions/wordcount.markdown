---
title: "Count words in text: wordcount"
function_name: "wordcount"
description: "Counts the number of words in a string."
available_as:
  - filter
category: strings
return_type: integer
limited: true
since: "0.7"
related_functions:
  - wordwrap
  - truncate
---

The `wordcount` filter counts the number of words in a string, splitting on whitespace.
This is useful when you need to measure the length of text content. For example, you might want to check if a sensor message is too long before sending a notification, or display a word count for text entered through an input helper.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "The quick brown fox jumps" | wordcount }}'
type: integer
output: "5"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
wordcount(
    value: str,
) -> int
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string in which to count the words. Words are split on whitespace.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Words are anything separated by whitespace. Punctuation stays attached to its neighboring word and does not add to the count.
- An empty string returns `0`.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check message length before sending

Only send a notification if the message is not too long.

{% example %}
template: |
  {% set msg = states("sensor.latest_message") %}
  {% if msg | wordcount <= 50 %}
    {{ msg }}
  {% else %}
    Message too long to display
  {% endif %}
type: string
output: "Front door was opened at 14:30"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
