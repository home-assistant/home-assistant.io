---
title: "Join loop iterations: joiner"
function_name: "joiner"
description: "Creates a helper that joins loop iterations with a separator, returning an empty string on the first call."
available_as:
  - function
category: functional
return_type: joiner
limited: true
since: "0.7"
related_functions:
  - cycler
  - range
---

The `joiner` template function creates a small helper object for joining items in a loop with a separator. When you call the joiner, it returns an empty string the first time and the separator string on every subsequent call. This avoids the common problem of getting a leading or trailing separator when building a delimited string in a loop.

This provides an alternative to the [`join`](/template-functions/join/) filter when you need more control over how items are separated. For example, if you are conditionally including items in a loop, the [`join`](/template-functions/join/) filter may not work cleanly because it operates on a full list. A `joiner` only emits the separator between items that are actually rendered.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: |
  {% set sep = joiner(", ") %}
  {% for item in ["apple", "banana", "cherry"] %}
    {{ sep() }}{{ item }}
  {% endfor %}
type: string
output: "apple, banana, cherry"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
joiner(
    separator: str = ", ",
) -> Joiner
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
separator:
  description: >
    The string to insert between items. Defaults to `", "`.
  required: false
  default: '", "'
  type: string
{% endfunction_parameters %}

## Good to know

- The first call returns an empty string, so you can place it before each item without worrying about a leading separator.
- The default separator is `", "` with a trailing space.
- A fresh `joiner()` must be created per loop. Reusing one across loops keeps counting from where it left off.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Conditionally join active sensors

Build a string of only the sensors that are on, properly separated.

{% example %}
template: |
  {% set sep = joiner(" | ") %}
  {% for entity in ["binary_sensor.front_door", "binary_sensor.back_door",
                    "binary_sensor.garage"] %}
    {% if is_state(entity, "on") %}
      {{ sep() }}{{ state_attr(entity, "friendly_name") }}
    {% endif %}
  {% endfor %}
type: string
output: "Front Door | Garage"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
