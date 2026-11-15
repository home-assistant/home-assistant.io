---
title: "Generate a number sequence: range"
function_name: "range"
description: "Generates a sequence of numbers, like Python's range(). Commonly used for looping a specific number of times."
available_as:
  - function
category: functional
return_type: list
limited: true
since: "0.7"
related_functions:
  - zip
  - random
---

The `range` template function generates a sequence of numbers. It works just like Python's built-in `range()` function. You can call it with only a stop value to get numbers from 0 up to (but not including) that value, or provide start, stop, and step values for full control over the sequence.

This is one of the most commonly used functions in Home Assistant templates, especially when you need to loop a specific number of times or generate a series of numbered values. For example, you might want to check a set of numbered entities, repeat an action a certain number of times, or build a list of values at regular intervals. Since `range` produces values lazily, you may need to pipe it through `| list` to see the full output.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ range(5) | list }}'
type: list
output: "[0, 1, 2, 3, 4]"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
range(
    stop: int,
) -> generator[int]

range(
    start: int,
    stop: int,
    step: int = 1,
) -> generator[int]
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
start:
  description: >
    The starting number of the sequence. Defaults to `0` when only a stop value is given.
  required: false
  default: "0"
  type: integer
stop:
  description: >
    The end of the sequence. The stop value is not included in the output.
  required: true
  type: integer
step:
  description: >
    The increment between each number in the sequence. Defaults to `1`. Can be negative to count downward.
  required: false
  default: "1"
  type: integer
{% endfunction_parameters %}

## Specifying start and stop

Generate numbers starting from a value other than 0.

{% example %}
template: '{{ range(1, 6) | list }}'
title: Numbers 1 through 5
type: list
output: "[1, 2, 3, 4, 5]"
{% endexample %}

## Using a step value

Generate every other number or count in custom increments.

{% example %}
template: '{{ range(0, 10, 2) | list }}'
title: Even numbers under 10
type: list
output: "[0, 2, 4, 6, 8]"
{% endexample %}

## Counting downward

Use a negative step to count backward.

{% example %}
template: '{{ range(5, 0, -1) | list }}'
title: Countdown
type: list
output: "[5, 4, 3, 2, 1]"
{% endexample %}

## Good to know

- The stop value is exclusive, so `range(1, 5)` produces `1, 2, 3, 4`.
- Add [`| list`](/template-functions/list/) to materialize the range for length checks or printing. A generator cannot be reused.
- A negative step is required to count down. `range(5, 0)` with the default step returns an empty sequence.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check a set of numbered entities

Loop through a series of numbered {% term sensors %} to find which are active.

{% example %}
template: |
  {% for i in range(1, 5) %}
    {% set entity = "binary_sensor.zone_" ~ i %}
    {% if is_state(entity, "on") %}
      Zone {{ i }} is active
    {% endif %}
  {% endfor %}
type: string
output: |
  Zone 2 is active
  Zone 4 is active
{% endexample %}

### Count open windows

Use `range` with a [`namespace`](/template-functions/namespace/) to count how many numbered window sensors are open.

{% example %}
template: |
  {% set ns = namespace(count=0) %}
  {% for i in range(1, 7) %}
    {% if is_state("binary_sensor.window_" ~ i, "on") %}
      {% set ns.count = ns.count + 1 %}
    {% endif %}
  {% endfor %}
  {{ ns.count }} windows open
type: string
output: "2 windows open"
{% endexample %}

### Build a percentage bar

Create a text-based progress indicator from a sensor value.

{% example %}
template: |
  {% set level = states("sensor.battery_level") | int(0) %}
  {% set filled = (level / 10) | round(0) | int %}
  [
  {%- for i in range(10) -%}
    {% if i < filled %}#{% else %}-{% endif %}
  {%- endfor -%}
  ] {{ level }}%
type: string
output: "[######----] 60%"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
