---
title: "Get manual override"
action: openevse.get_override
domain: openevse
description: "Returns details of the current manual override status."
---

Use this action to retrieve details about the current manual override status from your OpenEVSE charger.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get manual override status from an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the OpenEVSE device or entity you want to manage.
6. From the actions shown for that target, select **Get manual override**.
7. Under **Response variable**, enter a variable name to store the returned data.
8. Select **Save**.

This action has no additional options in the UI beyond choosing the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `openevse.get_override`. Store the result in a response variable:

{% example %}
action: |
  action: openevse.get_override
  target:
    entity_id: switch.openevse_manual_override
  response_variable: override_status
{% endexample %}

## Response data

The response returns a dictionary containing the override parameters:

- `state`: Override charging state (`active` or `disabled`).
- `charge_current`: Configured charging current in amperes.
- `max_current`: Configured maximum charging current in amperes.
- `energy_limit`: Configured energy limit in watt-hours.
- `time_limit`: Configured duration limit in seconds.
- `auto_release`: Whether auto release is enabled.

Example response:

```yaml
state: active
charge_current: 32
max_current: 48
energy_limit: 10000
time_limit: 3600
auto_release: true
```

{% include actions/targets.md domain="openevse" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
