---
title: "Get config entry ID: config_entry_id"
function_name: "config_entry_id"
description: "Gets the config entry ID from an entity ID."
available_as:
  - function
  - filter
category: entity
return_type: "string or None"
limited: false
since: "2023.3"
related_functions:
  - config_entry_attr
  - integration_entities
  - entity_name
---

The `config_entry_id` template function returns the config entry ID that an {% term entity %} belongs to. Every entity that is created by an {% term integration %} is tied to a config entry, and this function lets you look up that connection. It returns `None` if the entity does not exist in the registry.

This is useful when you need to look up details about the config entry behind an entity using [`config_entry_attr`](/template-functions/config_entry_attr/). For example, you might want to find out which integration domain an entity came from, check whether the config entry is still active, or group entities by their config entry. It is also helpful for debugging, letting you trace an entity back to the configuration that created it.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ config_entry_id("light.living_room") }}'
type: string
output: "01234567890abcdef01234567890abcd"

---
filter: '{{ "light.living_room" | config_entry_id }}'
type: string
output: "01234567890abcdef01234567890abcd"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
config_entry_id(
    entity_id: str,
) -> str | None
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
entity_id:
  description: >
    The entity ID to look up. Returns the config entry ID as a string, or `None` if the entity does not exist in the registry.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Returns `None` for helper entities and YAML-configured entities, which have no config entry.
- Returns `None` when the entity does not exist in the registry yet, which can happen right after creation.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Find the integration domain for an entity

Combine `config_entry_id` with [`config_entry_attr`](/template-functions/config_entry_attr/) to find out which integration domain an entity belongs to.

{% example %}
template: |
  {{ config_entry_attr(config_entry_id("light.living_room"), "domain") }}
type: string
output: "hue"
{% endexample %}

### Check if an entity's config entry is loaded

Verify that the config entry behind an entity is in the `loaded` state, which means the integration is running normally.

{% example %}
template: |
  {{
    config_entry_attr(
      config_entry_id("sensor.power_meter"), "state"
    )
  }}
type: string
output: "loaded"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
