---
title: "Check if value contains another: contains"
function_name: "contains"
description: "Tests if a value contains another value. Works with strings, lists, and dictionaries."
available_as:
  - filter
  - test
category: functional
return_type: boolean
limited: true
since: "2024.3"
related_functions:
  - has_value
  - iif
---

The `contains` template function checks whether one value is found inside another. It works with strings (substring search), lists (membership check), and dictionaries (key lookup). It uses Python's `in` operator under the hood.

This is useful when you need to check if a {% term sensor %} value includes a specific word, if a list of items includes a particular entry, or if a dictionary has a certain key. For example, you might want to check if a weather condition string contains "rain", if a list of active {% term devices %} includes a specific one, or filter {% term entities %} whose states contain a particular substring.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "hello world" | contains("world") }}'
type: boolean
output: "true"

---
test: |
  {% if "hello world" is contains("world") %}
    Found it
  {% endif %}
type: string
output: "Found it"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
contains(
    value: str | list | dict,
    item: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The value to search in. Can be a string (checks for substring), a list (checks for membership), or a dictionary (checks for key).
  required: true
  type: any
item:
  description: >
    The value to search for within the first value.
  required: true
  type: any
{% endfunction_parameters %}

## Different container types

The `contains` function adapts to the type of value being searched.

{% example %}
template: |
  String: {{ "automation running" | contains("running") }}
  List: {{ [1, 2, 3] | contains(2) }}
  Dict: {{ {"name": "test"} | contains("name") }}
title: Works with strings, lists, and dicts
type: string
output: |
  String: true
  List: true
  Dict: true
{% endexample %}

## Using as a test with select

Use `contains` as a test to filter lists of values.

{% example %}
template: |
  {{
    ["sunny", "rainy day", "cloudy", "light rain"]
    | select("contains", "rain") | list
  }}
title: Filter strings containing "rain"
type: list
output: "['rainy day', 'light rain']"
{% endexample %}

## Good to know

- On dictionaries, this checks keys, not values. Use `value in my_dict.values()` when you need to match a value.
- String matching is case-sensitive. Pipe through [`| lower`](/template-functions/lower/) first to make it case-insensitive.
- Unlike [`in`](/template-functions/in_test/) as a test, the argument order here is container first, item second.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check if a weather condition includes rain

Test the weather state to decide whether to send a reminder to bring an umbrella.

{% example %}
template: |
  {% if states("weather.home") | contains("rain") %}
    Don't forget your umbrella!
  {% else %}
    No rain expected
  {% endif %}
type: string
output: "Don't forget your umbrella!"
{% endexample %}

### Filter entities by state content

Find all sensors whose state contains a specific keyword.

{% example %}
template: |
  {{
    ["online", "offline", "online - active", "standby"]
    | select("contains", "online") | list
  }}
title: Find online items
type: list
output: "['online', 'online - active']"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
