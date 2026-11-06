---
title: "Get minute forecast"
action: foreca.get_minute_forecast
domain: foreca
description: "Retrieves the precipitation rate for each minute of the next hour from Foreca."
---

Use this action to get a minute-by-minute precipitation forecast for the next hour, for example to close a skylight or postpone watering the garden just before rain arrives. It returns the forecasted precipitation rate for each of the next 60 minutes as [response data](/docs/automation/action/#action-response-data).

{% include actions/ui_header.md %}

To get a minute forecast from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the Foreca weather entity of the location you want the forecast for. You can also select an area, a device, or a label.
6. From the actions shown for that target, select **Get minute forecast**.
7. In the **Response variable** field, enter a name to store the data in, such as `minute_forecast`.
8. Select **Save**.

### Options in the UI

This action has no options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `foreca.get_minute_forecast`. Because it returns data, you store the result in a response variable. A basic example looks like this:

{% example %}
action: |
  action: foreca.get_minute_forecast
  target:
    entity_id: weather.home
  response_variable: minute_forecast
{% endexample %}

### Options in YAML

This action has no options beyond the target.

{% include actions/targets.md domain="weather" entity_type="Foreca weather entity" example="weather.home" %}

## Response data

The action returns the forecast for each targeted weather entity, keyed by its entity ID. For each entity, the response contains a `resolution` field and a `forecast` field.

`resolution` is the forecast's time resolution in minutes. It is `1` where the forecast is a radar nowcast, which covers Europe and the continental USA, and `60` elsewhere.

`forecast` is a list of 60 entries, one for each minute of the next hour. Each entry has the following fields:

- `datetime`: the minute the forecast is for.
- `precipitation`: the forecasted precipitation rate, in the weather entity's precipitation unit per hour. It is `null` for a minute the forecast doesn't include a rate for.

A trimmed example response looks like this:

```yaml
weather.home:
  resolution: 1
  forecast:
    - datetime: "2026-11-06T11:20:00+02:00"
      precipitation: 0
    - datetime: "2026-11-06T11:21:00+02:00"
      precipitation: 0.4
    - datetime: "2026-11-06T11:22:00+02:00"
      precipitation: 1.27
```

## Good to know

- Each call requests fresh data from the Foreca Weather API and counts toward your plan's daily request limit. Calling the action every few minutes around the clock can use more requests than the regular updates do.
- A `precipitation` value of 0 means no rain or snow is expected for that minute.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
