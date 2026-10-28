---
title: "Get translated state: state_translated"
function_name: "state_translated"
description: "Returns the translated state value of an entity in your configured language."
available_as:
  - function
  - filter
category: state
return_type: string
limited: false
since: "2023.9"
related_functions:
  - states
  - state_attr_translated
  - is_state
---

The `state_translated` template function returns the state of an {% term entity %} translated into the language configured in Home Assistant. While [`states`](/template-functions/states/) returns the raw state value, this function returns the localized version shown in the interface. Raw states are internal values, such as `on`, `off`, or `heat`.

This is useful when you want to include entity states in {% term notifications %} or dashboard text that should match your configured language. For example, if your Home Assistant is set to German, `state_translated("climate.living_room")` might return _"Heizen"_ instead of `heat`.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ state_translated("climate.living_room") }}'
type: string
output: Heat

---
filter: '{{ "climate.living_room" | state_translated }}'
type: string
output: Heat
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
state_translated(
    entity_id: str,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
entity_id:
  description: >
    The entity ID to get the translated state from. Returns the state in your configured language. Returns `unknown` if the entity does not exist.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- The returned text depends on the language configured in Home Assistant, so comparing the result against a fixed English word like `"Heat"` will fail once the language changes. Use [`states`](/template-functions/states/) for comparisons and reserve `state_translated` for display.
- The language comes from **Settings** > **System** > **General**. The language in your user profile has no effect.
- Home Assistant first looks for a translation from the entity's integration. Next, it tries the translation for the device class, and then the default translation for the domain.
- If your language has no translation, the English text is used. If no translation exists at all, you get the raw state value.
- The states `unknown` and `unavailable` are returned as they are. They are never translated.
- If the entity does not exist, the result is `unknown`. A badly formed entity ID causes an error.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Use in a notification

Send a notification with the climate state in your configured language.

{% example %}
action: |
  action:
    - action: notify.mobile
      data:
        message: >
          The living room climate is
          {{ state_translated("climate.living_room") }}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
