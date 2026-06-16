---
title: "Get energy return prices"
action: easyenergy.get_energy_return_prices
domain: easyenergy
description: "Requests return energy prices from easyEnergy."
related_actions:
  - easyenergy.get_gas_prices
  - easyenergy.get_energy_usage_prices
---

The **Get energy return prices** action fetches the prices for energy that you return (sell) from easyEnergy and returns them as response data.

This action does not target an entity. Instead, you select which easyEnergy configuration entry to use.

{% include actions/ui_header.md %}

To get energy return prices from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **easyEnergy: Get energy return prices**.
6. Select the **Config entry** to use, and set any of the options you need.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Config entry:
  description: The easyEnergy configuration entry to use for this action.
  required: true
Granularity:
  description: The interval size for the electricity prices, either hourly or quarter-hourly.
  required: false
Start:
  description: The date and time from which to retrieve prices. Defaults to today if omitted.
  required: false
End:
  description: The date and time until which to retrieve prices. Defaults to today if omitted.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `easyenergy.get_energy_return_prices`. A basic example looks like this:

{% example %}
action: |
  action: easyenergy.get_energy_return_prices
  data:
    config_entry: "013713c172577bada2874a32dbe44feb"
  response_variable: return_prices
{% endexample %}

This fetches the return prices and stores them in the `return_prices` response variable.

### Options in YAML

{% options_yaml %}
config_entry:
  description: The easyEnergy configuration entry to use for this action.
  required: true
  type: string
granularity:
  description: >
    The interval size for the electricity prices. Use `hour` for hourly
    prices or `quarter` for quarter-hour prices.
  required: false
  type: string
  default: hour
start:
  description: The date and time from which to retrieve prices. Defaults to today if omitted.
  required: false
  type: datetime
end:
  description: The date and time until which to retrieve prices. Defaults to today if omitted.
  required: false
  type: datetime
{% endoptions_yaml %}

## Response data

The response data is a mapping with a `prices` list. Each entry has a `timestamp` (string) and a `price` (number).

```yaml
prices:
  - timestamp: "2023-12-09 03:00:00+00:00"
    price: 0.06957
  - timestamp: "2023-12-09 04:00:00+00:00"
    price: 0.07238
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
