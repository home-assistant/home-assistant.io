---
title: "Find all regex matches: regex_findall"
function_name: "regex_findall"
description: "Finds all occurrences of a regular expression pattern in a string and returns them as a list."
available_as:
  - filter
category: regex
return_type: list
limited: true
since: "0.7"
related_functions:
  - regex_findall_index
  - regex_match
  - regex_search
  - regex_replace
---

The `regex_findall` template filter finds all occurrences of a regular expression (regex) pattern in a string and returns them as a list. A regular expression is a special text pattern that lets you describe what you are looking for. While [`regex_search`](/template-functions/regex_search/) just tells you whether a pattern exists, `regex_findall` collects every match and gives them all back to you.

This is useful when you need to extract multiple pieces of data from a text value. For example, you might want to pull all numbers out of a sensor's state string, extract all IP addresses from a log message, or collect all entity IDs mentioned in a text attribute. The result is a list, so you can count the matches, loop through them, or pick a specific one by index.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "Living room 23.5C, Bedroom 19.8C" | regex_findall("\\d+\\.\\d+") }}'
type: list
output: "['23.5', '19.8']"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
regex_findall(
    value: str,
    find: str = "",
    ignorecase: bool = False,
) -> list[str]
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string to search within for all matches of the regex pattern.
  required: true
  type: string
find:
  description: >
    The regular expression pattern to search for. All non-overlapping matches are returned.
  required: true
  type: string
ignorecase:
  description: >
    Set to `true` to make the search case-insensitive.
  required: false
  default: "false"
  type: boolean
{% endfunction_parameters %}

## Counting matches

Since the result is a list, you can use the [`length`](/template-functions/length/) filter to count how many matches were found.

{% example %}
template: |
  {{
    "error at 10:15, error at 11:30, error at 12:45"
    | regex_findall("error") | length
  }}
title: Count the number of errors
type: integer
output: "3"
{% endexample %}

## Good to know

- Returns an empty list when nothing matches, not `None` or an error.
- Capturing groups change the output: with one group, you get strings; with multiple groups, you get tuples.
- A literal dot in the pattern must be escaped as `\.`, since `.` matches any character in regex.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Extract all numbers from a sensor state

Pull every number out of a text-based sensor value for processing.

{% example %}
template: |
  {% set values = "Power: 150W, Voltage: 230V, Current: 0.65A"
     | regex_findall("\\d+\\.?\\d*") %}
  {{ values }}
type: list
output: "['150', '230', '0.65']"
{% endexample %}

### List all matching words

Find all words in a string that start with a capital letter.

{% example %}
template: '{{ "The Living Room Light is On" | regex_findall("[A-Z][a-z]+") }}'
type: list
output: "['The', 'Living', 'Room', 'Light', 'On']"
{% endexample %}

### Loop through extracted values

Extract all temperature values from a multi-sensor string and display them.

{% example %}
template: |
  {% set temps = "Kitchen 21C, Hall 19C, Office 22C"
     | regex_findall("(\\w+) (\\d+)C") %}
  {% for room, temp in temps %}
    {{ room }}: {{ temp }}C
  {% endfor %}
type: string
output: |
  Kitchen: 21C
  Hall: 19C
  Office: 22C
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
