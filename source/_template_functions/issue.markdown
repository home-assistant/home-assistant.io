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

The `issue` template function looks up a specific repair issue by its domain and issue ID. Repair issues are problems that Home Assistant has detected and flagged for your attention. This function returns the issue as a dictionary if it exists, or `None` if no such issue is found.

This is useful when you want to check whether a specific known issue is currently present. For example, you might want to monitor whether a particular integration has a configuration problem, display the status of a specific repair on your dashboard, or trigger an {% term automation %} only when a specific issue is present.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ issue("backup", "automatic_backup_failed") }}'
type: dict
output: "{'domain': 'backup', 'issue_id': 'automatic_backup_failed', 'dismissed_version': None, ...}"

---
filter: '{{ "backup" | issue("automatic_backup_failed") }}'
type: dict
output: "{'domain': 'backup', 'issue_id': 'automatic_backup_failed', 'dismissed_version': None, ...}"
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
    The integration domain that created the issue (for example, `hue`, `zwave_js`, or `mqtt`).
  required: true
  type: string
issue_id:
  description: >
    The unique identifier for the specific issue within the domain.
  required: true
  type: string
{% endfunction_parameters %}

## Issue details

Every returned issue contains these keys:

- `domain`: The integration that created the issue.
- `issue_id`: The unique identifier for the issue within the domain.
- `created`: When the issue was first raised, as an ISO 8601 timestamp string.
- `dismissed_version`: The Home Assistant version in which you ignored the issue, or `None` if you haven't ignored it.
- `config_entry_id`: The ID of the integration entry that raised the issue, or `None` if the issue isn't tied to an entry.
- `is_persistent`: Whether Home Assistant keeps the issue across restarts.

Most issues are not persistent. Only persistent issues (where `is_persistent` is `true`) also include details like `severity`, `translation_key`, `translation_placeholders`, `learn_more_url`, and `breaks_in_ha_version`. When `severity` is present, it is `critical`, `error`, or `warning`. {% my repairs title="**Settings** > **System** > **Repairs**" %} shows a severity for every issue, but templates only get `severity` for persistent issues.

## Checking if an issue exists

Since the function returns `None` when the issue is not found, you can use it directly in conditions.

{% example %}
template: |
  {% if issue("backup", "automatic_backup_failed") %}
    Backup issue found
  {% else %}
    No backup issue
  {% endif %}
title: Check for a specific issue
type: string
output: "Backup issue found"
{% endexample %}

## Good to know

- Returns `None` when the issue does not exist, so checks like `if issue(...)` work directly.
- Issues you ignored are returned too. An ignored issue has a `dismissed_version`, so check that key if you only care about issues you haven't ignored.
- Issues from integration entries you disabled are returned too, even though [`issues`](/template-functions/issues/) leaves them out.
- After a restart, this function can return an issue from before the restart that the integration hasn't reported again yet.
- Details like `severity` are only available for persistent issues. Check that a key exists before you use it.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Show whether an issue is ignored

Look up a specific issue and show whether you ignored it.

{% example %}
template: |
  {% set backup_issue = issue("backup", "automatic_backup_failed") %}
  {% if not backup_issue %}
    No issue found
  {% elif backup_issue.dismissed_version %}
    Backup issue ignored in {{ backup_issue.dismissed_version }}
  {% else %}
    Backup issue is open
  {% endif %}
type: string
output: "Backup issue is open"
{% endexample %}

### Conditional notification based on issue

Send a notification only when a specific repair issue exists and you haven't ignored it.

{% example %}
action: |
  actions:
    - condition: template
      value_template: >
        {% set zwave_issue = issue("zwave_js", "invalid_server_version") %}
        {{ zwave_issue is not none and not zwave_issue.dismissed_version }}
    - action: notify.mobile
      data:
        message: "Z-Wave server version isn't supported. Check repairs."
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
