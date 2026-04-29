---
title: "Get a specific repair issue: issue"
function_name: "issue"
description: "Returns a specific repair issue by domain and issue ID, or None if it does not exist."
available_as:
  - function
  - filter
category: repairs
return_type: dict | None
limited: true
requires_hass: true
since: "2024.6"
related_functions:
  - issues
---

The `issue` template function looks up a specific repair issue by its domain and issue ID. Repair issues are problems that Home Assistant has detected and flagged for your attention. This function returns the issue as a dictionary if it exists and is active, or `None` if no such issue is found.

This is useful when you want to check whether a specific known issue is currently active. For example, you might want to monitor whether a particular integration has a configuration problem, display the status of a specific repair on your dashboard, or trigger an {% term automation %} only when a specific issue is present.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ issue("hue", "deprecated_bridge") }}'
type: dict
output: "{'domain': 'hue', 'issue_id': 'deprecated_bridge', 'severity': 'warning', ...}"

---
filter: '{{ "deprecated_bridge" | issue("hue") }}'
type: dict
output: "{'domain': 'hue', 'issue_id': 'deprecated_bridge', 'severity': 'warning', ...}"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
issue(
    domain: str,
    issue_id: str,
) -> dict[str, Any] | None
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
domain:
  description: >
    The integration domain that created the issue (for example, `hue`, `zwave`, or `mqtt`).
  required: true
  type: string
issue_id:
  description: >
    The unique identifier for the specific issue within the domain.
  required: true
  type: string
{% endfunction_parameters %}

## Checking if an issue exists

Since the function returns `None` when the issue is not found, you can use it directly in conditions.

{% example %}
template: |
  {% if issue("hue", "deprecated_bridge") %}
    Hue bridge issue is active
  {% else %}
    No Hue bridge issue
  {% endif %}
title: Check for a specific issue
type: string
output: "Hue bridge issue is active"
{% endexample %}

## Good to know

- Returns `None` when the issue does not exist or has been dismissed, so checks like `if issue(...)` work directly.
- Only active (non-ignored) issues are returned.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Display issue severity

Look up a specific issue and show its severity level.

{% example %}
template: |
  {% set hue_issue = issue("hue", "deprecated_bridge") %}
  {% if hue_issue %}
    Hue issue severity: {{ hue_issue.severity }}
  {% else %}
    No issue found
  {% endif %}
type: string
output: "Hue issue severity: warning"
{% endexample %}

### Conditional notification based on issue

Send a notification only when a specific repair issue is active.

{% example %}
action: |
  action:
    - condition: template
      value_template: '{{ issue("zwave", "config_error") is not none }}'
    - action: notify.mobile
      data:
        message: "Z-Wave configuration error detected. Check repairs."
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
