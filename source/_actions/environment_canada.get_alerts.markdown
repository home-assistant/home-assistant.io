---
title: "Get alerts"
action: environment_canada.get_alerts
domain: environment_canada
description: "Retrieves the active weather alerts for an Environment Canada location."
related_actions:
  - environment_canada.get_forecasts
  - environment_canada.set_radar_type
---

Use this action to retrieve the active weather alerts for one of your Environment Canada locations, such as warnings, watches, advisories, statements, and endings.

This action returns its result in a response variable, which you can use in later steps of the same automation or script, for example to send a notification with the details of a current warning.

{% include actions/ui_header.md %}

To get alerts from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Environment Canada: Get alerts**.
6. Select the **Environment Canada service** to get the alerts for.
7. In the **Response variable** field, enter a name to store the data in, such as `alerts`.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Environment Canada service:
  description: The Environment Canada location to get the alerts for.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `environment_canada.get_alerts`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: environment_canada.get_alerts
  data:
    config_entry_id: 1b4ba1c4d8f5e3a29c6e7d2f0a3b8c91
  response_variable: alerts
{% endexample %}

This stores the active alerts for the selected location in `alerts`.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The Environment Canada location to get the alerts for.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response is a mapping keyed by alert category. Each category holds a list of the alerts that are currently active for that category:

- `warnings`: Active warnings.
- `watches`: Active watches.
- `advisories`: Active advisories.
- `statements`: Active statements.
- `endings`: Alerts that have recently ended.

A category with no active alerts contains an empty list. Each alert item describes the alert with fields such as `title`, `date`, `alert_colour_level`, and `expiry_time`.

```yaml
warnings:
  - title: Snowfall warning in effect
    date: "2024-01-01T12:00:00+00:00"
    alert_colour_level: red
    expiry_time: "2024-01-02T00:00:00+00:00"
watches: []
advisories: []
statements: []
endings: []
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
