---
title: "Get prices for date"
action: omie.get_prices_for_date
domain: omie
description: "Retrieves OMIE electricity spot prices for a specific date, for Spain, Portugal, or both."
---

Use this action to retrieve the day-ahead electricity spot prices for a specific date, for Spain, Portugal, or both countries.

The OMIE sensors always reflect the current price. This action lets you fetch the prices for any published date instead, which is useful when you want to look ahead. For example, you can compare tomorrow's prices or schedule an appliance to run during the cheapest hours.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

Prices for the next day are published daily at around 13:30 CET. If you request a date that has not been published yet, the action reports that the prices are not available.

{% include actions/ui_header.md %}

To get prices from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **OMIE - Spain and Portugal electricity prices: Get prices for date**.
6. Select the **Date** you want, and choose the **Country** to get prices for.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Date:
  description: The date to get the prices for.
  required: true
Country:
  description: The country to get the prices for. Choose Spain, Portugal, or Both. Defaults to Both.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `omie.get_prices_for_date`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: omie.get_prices_for_date
  data:
    date: "2026-07-08"
    country: both
  response_variable: prices
{% endexample %}

This fetches the prices for both Spain and Portugal on the given date.

### Options in YAML

{% options_yaml %}
date:
  description: >
    The date to get the prices for, in YYYY-MM-DD format.
  required: true
  type: string
country:
  description: >
    The country to get the prices for. One of es, pt, or both.
    Defaults to both.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response contains a key for each requested country: `es` for Spain and `pt` for Portugal. If you request **Both**, both keys are present.

Each key holds a list of quarter-hourly intervals. Each interval includes the following fields:

- `start`: The start time of the interval, in Central European Time.
- `end`: The end time of the interval, in Central European Time.
- `price`: The electricity spot price for the interval, in €/kWh.

A shortened example of the response looks like this:

```yaml
es:
  - start: "2026-07-08T00:00:00+02:00"
    end: "2026-07-08T00:15:00+02:00"
    price: 0.03415
  - start: "2026-07-08T00:15:00+02:00"
    end: "2026-07-08T00:30:00+02:00"
    price: 0.03521
pt:
  - start: "2026-07-08T00:00:00+02:00"
    end: "2026-07-08T00:15:00+02:00"
    price: 0.0361
  - start: "2026-07-08T00:15:00+02:00"
    end: "2026-07-08T00:30:00+02:00"
    price: 0.0372
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
