---
title: "Get gas prices"
action: zonneplan.get_gas_prices
domain: zonneplan
description: "Returns the gas prices of a Zonneplan account."
---

The **Zonneplan: Get gas prices** action returns all gas prices that the integration has retrieved from Zonneplan. The prices are the all-in prices in EUR/m³, the same prices the gas price sensor shows.

Each price applies to one gas day, which runs from 06:00 to 06:00 the next day (Dutch time). The action uses the prices from the last update, so it does not contact Zonneplan.

{% include actions/ui_header.md %}

To get the gas prices from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Zonneplan: Get gas prices**.
6. Select the **Config entry** of your Zonneplan account.
7. In the **Response variable** field, enter a name to store the data in, such as `gas_prices`.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The Zonneplan config entry to get the prices of.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zonneplan.get_gas_prices`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: zonneplan.get_gas_prices
  data:
    config_entry: YOUR_CONFIG_ENTRY_ID
  response_variable: gas_prices
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry:
  description: >
    The Zonneplan config entry to get the prices of.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response contains a `prices` list, ordered by time. Each entry has the following fields:

- `start`: The start of the gas day, in UTC.
- `end`: The end of the gas day, in UTC.
- `price`: The all-in gas price in EUR/m³.

An example of the response looks like this:

```yaml
prices:
  - start: "2026-11-03T05:00:00+00:00"
    end: "2026-11-04T05:00:00+00:00"
    price: 1.4129573
```

If the Zonneplan account has no gas contract, the action fails with an error.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
