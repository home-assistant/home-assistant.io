---
title: "Set price cap"
action: ohme.set_price_cap
domain: ohme
description: "Prevents charging when the electricity price exceeds a defined threshold."
related_actions:
  - ohme.list_charge_slots
---

The **Set price cap** action sets the price threshold above which your Ohme charger stops charging. You can switch the price cap on or off with the **Price cap** switch entity.

{% include actions/ui_header.md %}

To set the price cap from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Ohme: Set price cap**.
6. Select the **Ohme account** and enter the **Price cap**.
7. Select **Save**.

This action does not support targets. Instead, you select the account through the **Ohme account** field.

### Options in the UI

{% options_ui %}
Ohme account:
  description: The Ohme account to apply the price cap to.
  required: true
Price cap:
  description: The threshold in 1/100ths of your local currency. For example, 5 means 0.05 in your local currency.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ohme.set_price_cap`. A basic example looks like this:

{% example %}
action: |
  action: ohme.set_price_cap
  data:
    config_entry: 1b4a46c6cba0677bbfb5a8c53e8618b0
    price_cap: 15
{% endexample %}

This sets the price cap to 0.15 in your local currency.

### Options in YAML

{% options_yaml %}
config_entry:
  description: >
    The Ohme account to apply the price cap to.
  required: true
  type: string
price_cap:
  description: >
    The threshold in 1/100ths of your local currency. For example, 5 means 0.05
    in your local currency.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: set the price cap every morning

This automation sets the price cap to 20 p/kWh (2000 in 1/100ths) every morning so the charger never draws grid electricity above that threshold during the day.

- **Trigger**: Time: 07:00
- **Action**: Ohme: Set price cap (at 2000: 20 p/kWh)

{% details "YAML example for setting daily price cap at 07:00" %}

{% example %}
automation: |
  alias: "Set daily price cap at 07:00"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: ohme.set_price_cap
      data:
        config_entry: your_config_entry_id
        price_cap: 2000
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
