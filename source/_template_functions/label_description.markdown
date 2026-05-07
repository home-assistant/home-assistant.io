---
title: "Get label description: label_description"
function_name: "label_description"
description: "Returns the description of a label from its ID."
available_as:
  - function
  - filter
category: label
return_type: string
limited: true
since: "2024.4"
related_functions:
  - label_id
  - label_name
  - labels
  - label_areas
  - label_devices
  - label_entities
---

The `label_description` template function returns the description text of a {% term label %} from its internal ID. When you create a label in Home Assistant, you can optionally give it a description that explains its purpose, and this function lets you retrieve that description.

This is useful when you want to display additional context about a label beyond its name. For example, if you have a label called _"Critical"_ with a description like _"Sensors that trigger emergency alerts"_, you could display that description in a dashboard or use it in {% term notifications %} to provide more context. If the label has no description set, the function returns `None`.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ label_description("critical") }}'
type: string
output: "Sensors that trigger emergency alerts"

---
filter: '{{ "critical" | label_description }}'
type: string
output: "Sensors that trigger emergency alerts"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
label_description(
    lookup_value: str,
) -> str | None
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
lookup_value:
  description: >
    The label ID to look up. Returns the description of the label, or `None` if no label with that ID exists or the label has no description.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Returns `None` when the label does not exist or has no description.
- Only accepts a label ID, not a label name. Resolve a name with [`label_id`](/template-functions/label_id/) first.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Display a label's description

Retrieve the description text for a specific label.

{% example %}
template: '{{ label_description("energy_monitoring") }}'
type: string
output: "Devices and sensors used for tracking energy usage"
{% endexample %}

### List labels with their descriptions

Loop through all labels and display their names along with descriptions, using [`labels`](/template-functions/labels/) and [`label_name`](/template-functions/label_name/).

{% example %}
template: |
  {% for lbl_id in labels() %}
    {{ label_name(lbl_id) }}: {{ label_description(lbl_id) }}
  {% endfor %}
type: string
output: |
  Outdoor: Items located outside the house
  Critical: Sensors that trigger emergency alerts
  Energy Monitoring: Devices and sensors used for tracking energy usage
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
