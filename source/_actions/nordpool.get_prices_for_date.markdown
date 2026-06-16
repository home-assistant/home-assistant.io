---
title: "Get prices for date"
action: nordpool.get_prices_for_date
domain: nordpool
description: "Retrieves the prices for a specific date."
related_actions:
  - nordpool.get_price_indices_for_date
---

The integration entities provide price information only for the current date. The **Get prices for date** action retrieves prices for any date within the last two months or for tomorrow.

This action returns its result in a response variable, which you can use in later steps of the same automation or script, for example in a trigger-based template sensor.

{% include actions/ui_header.md %}

To get prices for a date from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Nord Pool: Get prices for date**.
6. Select the **Config entry** and the **Date**. Optionally, set the **Areas** and **Currency**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The Nord Pool configuration entry to use for this action.
  required: true
Date:
  description: The date to get prices for. Only dates from two months in the past to one day in the future are allowed.
  required: true
Areas:
  description: One or multiple market areas to get prices for. If left empty, the areas from the configuration entry are used.
  required: false
Currency:
  description: The currency to get prices in. If left empty, the currency from the configuration entry is used.
  required: false
{% endoptions_ui %}

{% note %}
The public API only provides past pricing information for up to two months. Although Nord Pool operates in the CET/CEST timezone, all data is returned in UTC. Tomorrow's prices are typically released around 13:00 CET/CEST. Requesting them earlier returns an error.
{% endnote %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `nordpool.get_prices_for_date`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: nordpool.get_prices_for_date
  data:
    config_entry: 1234567890a
    date: "2024-11-10"
    areas:
      - "SE3"
      - "SE4"
    currency: "SEK"
{% endexample %}

This fetches the prices for the given date in the SE3 and SE4 areas, in Swedish krona.

### Options in YAML

{% options_yaml %}
config_entry:
  description: >
    The Nord Pool configuration entry to use for this action.
  required: true
  type: string
date:
  description: >
    The date to get prices for. Only dates from two months in the past to one
    day in the future are allowed.
  required: true
  type: date
areas:
  description: >
    One or multiple market areas to get prices for. If left empty, the areas
    from the configuration entry are used.
  required: false
  type: list
currency:
  description: >
    The currency to get prices in. If left empty, the currency from the
    configuration entry is used.
  required: false
  type: string
{% endoptions_yaml %}

## Response data

The response contains one entry per requested area. Each area holds a list of price intervals with the following fields:

- `start`: The start date and time of the interval, in UTC.
- `end`: The end date and time of the interval, in UTC.
- `price`: The price for the interval, in the requested currency per MWh.

A shortened example of the response looks like this:

```yaml
SE3:
  - start: "2024-11-10T00:00:00+00:00"
    end: "2024-11-10T01:00:00+00:00"
    price: 320.5
  - start: "2024-11-10T01:00:00+00:00"
    end: "2024-11-10T02:00:00+00:00"
    price: 298.1
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
