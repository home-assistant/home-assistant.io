---
title: "Get config entry attribute: config_entry_attr"
function_name: "config_entry_attr"
description: "Gets a specific attribute from a config entry."
available_as:
  - function
  - filter
category: entity
return_type: any
limited: false
since: "2023.3"
related_functions:
  - config_entry_id
  - integration_entities
  - state_attr
---

The `config_entry_attr` template function returns a specific attribute from a config entry, identified by its config entry ID. You can retrieve attributes like `domain`, `title`, `state`, `source`, `disabled_by`, and `pref_disable_polling`. It returns `None` if the config entry does not exist.

This is useful for inspecting the configuration behind your {% term entities %}. For example, you might want to check if a config entry is still loaded and working, find out which {% term integration %} domain it belongs to, or display the title of the config entry in a {% term notification %}. Combined with [`config_entry_id`](/template-functions/config_entry_id/), you can trace any entity back to its config entry and read details about it.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ config_entry_attr("01234567890abcdef01234567890abcd", "title") }}'
type: string
output: "Living Room Hue Bridge"

---
filter: '{{ "01234567890abcdef01234567890abcd" | config_entry_attr("title") }}'
type: string
output: "Living Room Hue Bridge"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
config_entry_attr(
    config_entry_id: str,
    attr_name: str,
) -> Any
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
config_entry_id:
  description: >
    The config entry ID to look up. You can get this from [`config_entry_id`](/template-functions/config_entry_id/).
  required: true
  type: string
attr_name:
  description: >
    The attribute to retrieve. Must be one of: `domain`, `title`, `state`, `source`, `disabled_by`, or `pref_disable_polling`.
  required: true
  type: string
{% endfunction_parameters %}

## Available attributes

The following attributes can be retrieved from a config entry:

- `domain`: The integration domain (for example, `hue`, `zwave_js`).
- `title`: The user-defined title of the config entry.
- `state`: The current state of the config entry (for example, `loaded`, `setup_error`, `not_loaded`).
- `source`: How the config entry was created (for example, `user`, `discovery`).
- `disabled_by`: Why the config entry is disabled, or `None` if it is not disabled.
- `pref_disable_polling`: Whether polling has been disabled for this config entry.

## Good to know

- Returns `None` when the config entry does not exist or when the attribute name is not one of the supported ones.
- Only the fixed attribute names listed above are allowed. Arbitrary field names are rejected.
- The input is the config entry ID, not an entity ID. Resolve from an entity with [`config_entry_id`](/template-functions/config_entry_id/) first.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check the state of a config entry from an entity

Look up the config entry behind an entity and check its state to see if the integration is running.

{% example %}
template: |
  {% set entry_id = config_entry_id("light.living_room") %}
  {{ config_entry_attr(entry_id, "state") }}
type: string
output: "loaded"
{% endexample %}

### Get the integration domain for an entity

Find out which integration is responsible for a specific entity.

{% example %}
template: |
  {% set entry_id = config_entry_id("sensor.power_meter") %}
  {{ config_entry_attr(entry_id, "domain") }}
type: string
output: "shelly"
{% endexample %}

### Check if a config entry was discovered automatically

Determine whether a config entry was set up manually or discovered automatically.

{% example %}
template: |
  {% set entry_id = config_entry_id("light.bedroom") %}
  {{ config_entry_attr(entry_id, "source") }}
type: string
output: "discovery"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
