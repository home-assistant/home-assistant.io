---
title: "Merge action responses: merge_response"
function_name: "merge_response"
description: "Merges action response dictionaries into a flat list."
available_as:
  - function
category: collection
return_type: list
limited: true
since: "2024.1"
related_functions:
  - combine
  - to_json
  - from_json
  - flatten
---

The `merge_response` template function takes the response dictionary from a multi-entity action call and merges it into a single flat list. When you call an action that targets multiple {% term entities %}, the response is a dictionary keyed by entity ID, where each value contains the entity's response data. `merge_response` flattens this structure into a single list, adding the `entity_id` to each item for reference.

This is useful when you call actions like `calendar.get_events` or `weather.get_forecasts` that target multiple entities at once. Without `merge_response`, you would need to manually loop through the response dictionary and extract items from each entity. This function handles that for you and produces a unified list that is straightforward to sort, filter, and display. Each item in the result includes an `entity_id` field so you can still tell which entity it came from.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: |
  {{ merge_response(response) }}
type: list
output: |
  [
    {"start": "2024-03-15", "summary": "Meeting", "entity_id": "calendar.work"},
    {"start": "2024-03-15", "summary": "Dentist", "entity_id": "calendar.personal"},
  ]
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
merge_response(
    value: dict,
) -> list
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The action response dictionary to merge. This must be a dictionary where each key is an entity ID and each value is a dictionary containing the entity's response data.
  required: true
  type: map
{% endfunction_parameters %}

## Good to know

- Adds an `entity_id` field to each item, so you can tell which entity each response came from after merging.
- Only works on responses shaped as `{entity_id: {key: [items]}}`. Responses with a different shape need manual handling.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Merge calendar events from multiple calendars

Call `calendar.get_events` targeting multiple calendars and merge all events into a single sorted list.

{% example %}
action: |
  action:
    - action: calendar.get_events
      target:
        entity_id:
          - calendar.work
          - calendar.personal
      data:
        duration:
          hours: 24
      response_variable: agenda
    - action: notify.mobile
      data:
        message: >
          Today's events:
          {% for event in merge_response(agenda) | sort(attribute="start") %}
          - {{ event.summary }} ({{ event.entity_id.split(".")[1] }})
          {% endfor %}
{% endexample %}

### Merge weather forecasts

Combine forecasts from multiple weather entities into one list for comparison.

{% example %}
action: |
  action:
    - action: weather.get_forecasts
      target:
        entity_id:
          - weather.home
          - weather.office
      data:
        type: daily
      response_variable: forecasts
    - action: notify.mobile
      data:
        message: >
          {% for item in merge_response(forecasts) %}
          {{ item.entity_id }}: {{ item.temperature }}C
          {% endfor %}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
