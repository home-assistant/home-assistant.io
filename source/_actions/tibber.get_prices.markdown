---
title: "Get energy prices"
action: tibber.get_prices
domain: tibber
description: "Fetches hourly Tibber energy prices for a date range."
---

Use this action to fetch the hourly energy prices for your Tibber homes. You can fetch the prices for today, or set a date range to get prices for a specific period.

This action returns its result in a response variable, which you can use in later steps of the same automation or script, for example to find the cheapest time to run an appliance.

{% include actions/ui_header.md %}

To get energy prices from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Tibber: Get energy prices**.
6. Optionally, set a **Start** and **End** to fetch prices for a specific period.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Start:
  description: The date and time from which to retrieve prices. Defaults to today if omitted.
  required: false
End:
  description: The date and time until which to retrieve prices. Defaults to the end of today if omitted.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tibber.get_prices`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: tibber.get_prices
  data:
    start: "2024-01-01 00:00:00"
    end: "2024-01-01 23:00:00"
  response_variable: energy_prices
{% endexample %}

This fetches the energy prices for the first of January 2024.

### Options in YAML

{% options_yaml %}
start:
  description: >
    The date and time from which to retrieve prices, such as
    2024-01-01 00:00:00. Defaults to today if omitted.
  required: false
  type: string
end:
  description: >
    The date and time until which to retrieve prices, such as
    2024-01-01 23:00:00. Defaults to the end of today if omitted.
  required: false
  type: string
{% endoptions_yaml %}

## Response data

The response is a dictionary with a `prices` key, which holds an entry for each of your Tibber homes. Each home contains a list of price entries, and each entry includes the following fields:

- `start_time`: The start time of the price, returned in local time.
- `price`: The total energy price (energy and taxes) for that interval.
A shortened example of the response looks like this:

```yaml
prices:
  Nickname_Home:
    - start_time: "2023-12-09 03:00:00+02:00"
      price: 0.46914
    - start_time: "2023-12-09 03:15:00+02:00"
      price: 0.46914
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
