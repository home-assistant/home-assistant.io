---
title: "Test if even: even"
function_name: "even"
description: "Tests whether a number is even."
available_as:
  - test
category: math
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - odd
  - divisibleby
  - int
---

The `even` test checks whether an integer is even (divisible by 2 with no remainder). It returns `true` for even numbers and `false` for odd numbers.

This is commonly used in loops to apply alternating styles or logic to every other item. For example, you might use it to alternate row colors in a Markdown table or to apply different formatting to even-numbered items in a list displayed on a dashboard.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if 4 is even %}
    It is even
  {% endif %}
type: string
output: "It is even"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
even(
    value: int,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The integer to test. Returns `true` if the value is divisible by 2.
  required: true
  type: integer
{% endfunction_parameters %}

## Good to know

- Zero is considered even.
- The input must be an integer. Passing a float or string raises an error.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check various numbers

{% example %}
template: |
  {{ 4 is even }}
  {{ 7 is even }}
  {{ 0 is even }}
type: boolean
output: |
  true
  false
  true
{% endexample %}

### Filter even numbers from a list

Use [`select`](/template-functions/select/) to extract only even numbers from a range.

{% example %}
template: '{{ range(1, 11) | select("even") | list }}'
type: list
output: "[2, 4, 6, 8, 10]"
{% endexample %}

### Alternating logic in a loop

Apply different formatting to even and odd iterations.

{% example %}
template: |
  {% for i in range(1, 5) %}
    {{ i }}: {{ "even" if i is even else "odd" }}
  {% endfor %}
type: string
output: |
    1: odd
    2: even
    3: odd
    4: even
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
