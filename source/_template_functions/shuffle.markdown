---
title: "Randomly shuffle a list: shuffle"
function_name: "shuffle"
description: "Randomly shuffles the items in a list."
available_as:
  - function
  - filter
category: collection
return_type: list
limited: true
since: "2023.1"
related_functions:
  - flatten
  - set
---

The `shuffle` template function takes a list and returns a new list with the items in a random order. Every time it is evaluated, the order can be different, giving you a way to introduce randomness into your {% term templates %}.

This is useful when you want to pick a random item from a collection or display things in a random order. For example, you might shuffle a list of greetings to get a different welcome message each time, randomize the order of {% term automations %} to stagger their execution, or select a random playlist. You can also pass a `seed` value to get a reproducible shuffle, which can be helpful for testing or when you want the same random order for a given input.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ shuffle(["a", "b", "c", "d"]) }}'
type: list
output: '["c", "a", "d", "b"]'

---
filter: '{{ ["a", "b", "c", "d"] | shuffle }}'
type: list
output: '["c", "a", "d", "b"]'
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
shuffle(
    *args: list | Any,
    seed: Any = None,
) -> list
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The list of items to shuffle. Can be provided as a list or as multiple separate arguments.
  required: true
  type: list
seed:
  description: >
    An optional seed value for reproducible shuffling. When the same seed is used, the same order is produced every time.
  required: false
  type: any
{% endfunction_parameters %}

## Reproducible shuffle with a seed

Pass a seed to get the same shuffled order each time. This is useful for testing or when you want consistent randomization based on a known value.

{% example %}
template: '{{ shuffle(["a", "b", "c", "d"], seed="fixed") }}'
type: list
output: '["b", "d", "a", "c"]'
{% endexample %}

## Good to know

- A new random order is returned each time the template renders. Template entities using `shuffle` re-evaluate and change often.
- Pass a `seed` to get a reproducible order, which is useful for testing or stable randomness tied to a date.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Pick a random greeting

Shuffle a list and take the first item to select a random value.

{% example %}
template: |
  {{ shuffle(["Hello!", "Hi there!", "Welcome!", "Good day!"]) | first }}
type: string
output: "Welcome!"
{% endexample %}

### Shuffle individual arguments

You can also pass items as separate arguments instead of a list.

{% example %}
template: '{{ shuffle("red", "green", "blue") }}'
type: list
output: '["green", "red", "blue"]'
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
