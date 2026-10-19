---
title: "Choose a random value: random"
function_name: "random"
description: "Chooses a random value from a list. Returns a different value each time the template is evaluated."
available_as:
  - filter
category: functional
return_type: any
limited: true
since: "0.7"
related_functions:
  - shuffle
---

The `random` filter chooses a random item from a list. This is Home Assistant's override of the built-in `random` filter, with one important difference: it produces a new random value every time the template is evaluated, rather than caching the result.

This is useful when you want to add variety to your {% term automations %}. For example, you might want to pick a random color for a light, choose a random greeting message for a {% term notification %}, or select a random playlist to play on a media player. Because the value changes with each evaluation, you get a genuinely different result each time the template runs.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ ["red", "green", "blue"] | random }}'
type: string
output: green
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
random(
    values: list,
) -> Any
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
values:
  description: >
    The list of values to randomly choose from. Must contain at least one item.
  required: true
  type: list
{% endfunction_parameters %}

## Context-dependent evaluation

Unlike many other template functions, `random` is context-dependent. This means the result is not cached between evaluations. Each time the template is rendered, a new random choice is made.

{% example %}
template: '{{ ["morning", "afternoon", "evening"] | random }}'
title: Random greeting period
type: string
output: afternoon
{% endexample %}

## Good to know

- A new random value is picked every time the template is rendered, so template entities using `random` re-evaluate and change often.
- Calling `random` twice in a single template returns two independent picks, which can surprise you if you expect the same value.
- An empty list raises an error.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Random light color

Pick a random color for a light from a predefined list.

{% example %}
action: |
  action:
    - action: light.turn_on
      target:
        entity_id: light.living_room
      data:
        color_name: >
          {{ ["red", "blue", "green", "purple", "orange"] | random }}
{% endexample %}

### Random notification message

Send a different motivational message each time an automation triggers.

{% example %}
action: |
  action:
    - action: notify.mobile
      data:
        message: >
          {{
            [
              "Have a great day!",
              "Remember to stay hydrated!",
              "You're doing awesome!",
              "Time to stretch!"
            ] | random
          }}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
