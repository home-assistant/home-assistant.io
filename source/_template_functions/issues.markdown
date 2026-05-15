---
title: "Get all repair issues: issues"
function_name: "issues"
description: "Returns all active repair issues currently open in Home Assistant."
available_as:
  - function
category: repairs
return_type: dict
limited: true
requires_hass: true
since: "2024.6"
related_functions:
  - issue
---

The `issues` template function returns all currently active repair issues in Home Assistant. Repair issues are problems that Home Assistant has detected and flagged for your attention, such as deprecated integrations, configuration errors, or devices that need manual intervention. Each issue is returned as a dictionary keyed by a tuple of `(domain, issue_id)`.

This is useful for building dashboard cards or {% term automations %} that monitor the health of your Home Assistant installation. For example, you might want to display a count of open issues on your dashboard, send a {% term notification %} when new issues appear, or create a template sensor that tracks whether any critical repairs are pending.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ issues() | length }}'
type: integer
output: "3"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
issues() -> dict[tuple[str, str], dict[str, Any]]
```

### Function parameters

This function takes no parameters. It returns all currently active repair issues.

## Understanding repair issues

Repair issues are created by {% term integrations %} when they detect a problem that requires user attention. Each issue contains information such as:

- `domain` - The integration that created the issue
- `issue_id` - A unique identifier for this specific issue
- `severity` - How critical the issue is (`error`, `warning`, or `other`)
- `translation_key` - A key used to look up the translated issue description

{% example %}
template: |
  {% for key, issue in issues().items() %}
    {{ key }}: {{ issue.severity }}
  {% endfor %}
title: List all issues with severity
type: string
output: |
  ('hue', 'deprecated_bridge'): warning
  ('zwave', 'config_error'): error
{% endexample %}

## Good to know

- Returns a dictionary keyed by a `(domain, issue_id)` tuple, not a plain list.
- Severity values are `error`, `warning`, or `other`. Filter by severity when you only care about a subset.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Count open issues

Display the total number of active repair issues on a dashboard.

{% example %}
template: |
  {% set all_issues = issues() %}
  {{ all_issues | length }} repair issue{{ "s" if all_issues | length != 1 }}
type: string
output: "3 repair issues"
{% endexample %}

### Check for critical issues

Look for any issues with error severity and notify if found.

{% example %}
template: |
  {% set errors = issues().values()
    | selectattr("severity", "eq", "error") | list %}
  {% if errors | length > 0 %}
    {{ errors | length }} critical issue{{ "s" if errors | length != 1 }} found
  {% else %}
    All clear
  {% endif %}
type: string
output: "1 critical issue found"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
