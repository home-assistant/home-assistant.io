---
title: "Get all repair issues: issues"
function_name: "issues"
description: "Returns all current repair issues in Home Assistant, including ignored ones."
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

The `issues` template function returns all current repair issues in Home Assistant. Repair issues are problems that Home Assistant has detected and flagged for your attention, such as deprecated integrations, configuration errors, or devices that need manual intervention. The result is a dictionary where each key is a `(domain, issue_id)` tuple and each value is a dictionary with the details of that issue.

This is useful for building dashboard cards or {% term automations %} that monitor the health of your Home Assistant installation. For example, you might want to display a count of repair issues on your dashboard, send a {% term notification %} when new issues appear, or create a template sensor that tracks whether any repairs are waiting for you.

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

This function takes no parameters. It returns all current repair issues.

## Understanding repair issues

Repair issues are created by {% term integrations %} when they detect a problem that needs your attention. This function returns the same issues you see in {% my repairs title="**Settings** > **System** > **Repairs**" %}, including the ones you ignored. Every issue contains these keys:

- `domain`: The integration that created the issue.
- `issue_id`: The unique identifier for the issue within the domain.
- `created`: When the issue was first raised, as an ISO 8601 timestamp string.
- `dismissed_version`: The Home Assistant version in which you ignored the issue, or `None` if you haven't ignored it.
- `config_entry_id`: The ID of the integration entry that raised the issue, or `None` if the issue isn't tied to an entry.
- `is_persistent`: Whether Home Assistant keeps the issue across restarts.

Most issues are not persistent. Only persistent issues (where `is_persistent` is `true`) also include details like `severity`, `translation_key`, `translation_placeholders`, `learn_more_url`, and `breaks_in_ha_version`. When `severity` is present, it is `critical`, `error`, or `warning`. The Repairs page shows a severity for every issue, but templates only get `severity` for persistent issues.

{% example %}
template: |
  {% for issue in issues().values() %}
    {{ issue.domain }}: {{ issue.issue_id }}
  {% endfor %}
title: List all issues
type: string
output: |
  backup: automatic_backup_failed
  zwave_js: invalid_server_version
{% endexample %}

## Good to know

- Returns a dictionary keyed by a `(domain, issue_id)` tuple, not a plain list.
- Issues you ignored are included. An ignored issue has a `dismissed_version`, so filter on that key if you only care about issues you haven't ignored.
- Issues from integration entries you disabled are not included.
- Details like `severity` are only available for persistent issues, so filtering on `severity` skips most issues.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Count all issues

Display the total number of repair issues on a dashboard, including the ones you ignored.

{% example %}
template: |
  {% set all_issues = issues() %}
  {{ all_issues | length }} repair issue{{ "s" if all_issues | length != 1 }}
type: string
output: "3 repair issues"
{% endexample %}

### Skip ignored issues

Count only the issues you haven't ignored.

{% example %}
template: |
  {% set open_issues = issues().values()
    | rejectattr("dismissed_version") | list %}
  {% if open_issues | length > 0 %}
    {{ open_issues | length }} open issue{{ "s" if open_issues | length != 1 }}
  {% else %}
    All clear
  {% endif %}
type: string
output: "2 open issues"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
