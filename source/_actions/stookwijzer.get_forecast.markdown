---
title: "Get forecast"
action: stookwijzer.get_forecast
domain: stookwijzer
description: "Retrieves the advice forecast from Stookwijzer."
---

The **Get forecast** action retrieves the Stookwijzer advice forecast and returns it as [response data](/docs/scripts/perform-actions#use-templates-to-handle-response-data).

This is useful when you want an automation or a template to read upcoming Stookwijzer advice, for example to decide whether to light a wood fire later in the day.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Instead, you select which Stookwijzer instance to query through the **Stookwijzer instance** option.

{% include actions/ui_header.md %}

To get the forecast from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Stookwijzer: Get forecast**.
6. Choose the **Stookwijzer instance** to get the forecast from.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Stookwijzer instance:
  description: The Stookwijzer instance to get the forecast from.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `stookwijzer.get_forecast`. Because this action returns a response, use `response_variable` to capture the result. A basic example looks like this:

{% example %}
action: |
  action: stookwijzer.get_forecast
  data:
    config_entry_id: 1b4a46c6d0f3406c80d275f5b0c6483b
  response_variable: stookwijzer_forecast
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the Stookwijzer config entry to get the forecast from.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response contains a `forecast` field. `forecast` is a list of advice entries, each with the following fields:

- `datetime`: The time of the forecasted advice, for example `2025-02-12T17:00:00+01:00`.
- `advice`: The forecasted advice code, for example `code_yellow`.
- `final`: Whether the advice is final or can still change, either `true` or `false`.

An example response looks like this:

```yaml
forecast:
  - datetime: "2025-02-12T17:00:00+01:00"
    advice: code_yellow
    final: true
  - datetime: "2025-02-12T23:00:00+01:00"
    advice: code_yellow
    final: true
  - datetime: "2025-02-13T05:00:00+01:00"
    advice: code_orange
    final: false
  - datetime: "2025-02-13T11:00:00+01:00"
    advice: code_red
    final: false
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
