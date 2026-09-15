---
title: "Get energy prices"
action: green_planet_energy.get_prices
domain: green_planet_energy
description: "Fetches upcoming 15-minute electricity price slots from Green Planet Energy."
related_actions:
  - green_planet_energy.get_cheapest_duration
---

Use this action to fetch the upcoming 15-minute electricity price slots. It hands the prices back in a response variable, so you can use them in later steps of the same automation or script.

{% include actions/ui_header.md %}

This action returns data instead of changing something in your home, so it needs somewhere to put its result. Pair it with a template sensor, like in the [Show upcoming prices as a chart](/integrations/green_planet_energy/#show-upcoming-prices-as-a-chart) example.

To get prices from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Green Planet Energy: Get energy prices**.
6. Under **Config entry**, select your Green Planet Energy integration.
7. Set **Hours** to the number of hours you want to fetch.
8. Select **Save**.

The prices then land in the template sensor you set up, ready to use on a dashboard.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The Green Planet Energy integration to fetch prices from.
  required: true
Hours:
  description: The number of hours to return, starting from the current 15-minute slot. Accepts 0.25 to 24, in steps of 0.25.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `green_planet_energy.get_prices`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: green_planet_energy.get_prices
  data:
    config_entry_id: 1234567890abcdef1234567890abcdef
    hours: 6
  response_variable: result
{% endexample %}

This fetches the next 6 hours of prices and stores the response in `result`.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the Green Planet Energy configuration entry to fetch prices from.
    Build the action in the UI once and switch to YAML to see the ID of your
    entry.
  required: true
  type: string
hours:
  description: >
    The number of hours to return, starting from the current 15-minute slot.
    Accepts 0.25 to 24, in steps of 0.25.
  required: true
  type: float
{% endoptions_yaml %}

## Response data

The response is a mapping with the number of hours requested and a list of price slots. Slots beyond the available data horizon (today and tomorrow) are omitted.

- `hours_requested`: The number of hours requested.
- `prices`: A list of the returned 15-minute price slots. Each slot includes:
  - `start`: The slot start timestamp in ISO 8601 format.
  - `end`: The slot end timestamp in ISO 8601 format.
  - `price`: The electricity price in EUR/kWh.

Example shortened response:

```yaml
hours_requested: 2.0
prices:
  - start: "2026-03-24T10:00:00+01:00"
    end: "2026-03-24T10:15:00+01:00"
    price: 0.284375
  - start: "2026-03-24T10:15:00+01:00"
    end: "2026-03-24T10:30:00+01:00"
    price: 0.28125
```

## Good to know

- Prices are published for today and tomorrow. If you ask for more hours than that, the slots without data are left out of the response instead of returned as zero.
- Tomorrow's prices are not available all day. Until they are published, a request that reaches into tomorrow returns fewer slots than you asked for.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
