---
title: "Convert to set: set"
function_name: "set"
description: "Converts an iterable to a set, removing duplicate values."
available_as:
  - function
category: collection
return_type: set
limited: true
since: "2023.1"
related_functions:
  - tuple
  - intersect
  - union
  - difference
---

The `set` template function converts a collection (like a list) into a set. A set is an unordered collection of unique values, so any duplicate items in the input are automatically removed. This gives you a quick way to deduplicate a list.

This is useful when you need to work with unique values only. For example, if you collect entity states from multiple sources and some appear more than once, converting to a set removes the duplicates. You can also use it to count the number of distinct values, or to prepare data for set operations like [`intersect`](/template-functions/intersect/), [`union`](/template-functions/union/), and [`difference`](/template-functions/difference/). Note that sets are unordered, so the items may not be in the same order as the original list.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ set([1, 2, 2, 3, 3, 3]) }}'
type: set
output: "{1, 2, 3}"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
set(
    value: list,
) -> set
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The collection to convert to a set. Duplicate values are removed.
  required: true
  type: list
{% endfunction_parameters %}

## Good to know

- Sets are unordered, so add [`| list | sort`](/template-functions/sort/) when you need a stable ordering.
- All items must be hashable. Lists and dicts inside the input raise an error.
- A quick way to count distinct values is `| set | list | count`.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Count unique values

Find out how many distinct states exist among a group of {% term entities %}.

{% example %}
template: |
  {{
    expand("group.home_lights")
    | map(attribute="state")
    | set
    | list
    | count
  }}
type: integer
output: "2"
{% endexample %}

### Deduplicate a list

Remove duplicates from a list of detected objects.

{% example %}
template: '{{ set(["person", "car", "person", "dog", "car"]) | list }}'
type: list
output: '["person", "car", "dog"]'
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
