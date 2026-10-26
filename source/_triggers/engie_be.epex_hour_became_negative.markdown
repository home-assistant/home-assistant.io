---
title: "EPEX hour price became negative"
trigger: engie_be.epex_hour_became_negative
domain: engie_be
description: "Triggers when the current hourly EPEX price goes from zero or above to below zero."
related_triggers:
  - engie_be.epex_hour_no_longer_negative
  - engie_be.epex_quarter_hour_became_negative
  - engie_be.epex_quarter_hour_no_longer_negative
---

The **EPEX hour price became negative** trigger fires when the current hourly EPEX price goes from zero or above to below zero.

Use it to start loads such as an EV charger or a home battery when the hourly price turns negative. To stop them again, use [EPEX hour price no longer negative](/triggers/engie_be.epex_hour_no_longer_negative/). To check the price when an automation runs, use the [EPEX hour price is negative](/conditions/engie_be.epex_hour_price_is_negative/) condition.

Only contracts with a dynamic tariff have EPEX prices. The prices are raw wholesale prices in EUR/kWh, without VAT, taxes and levies, or network costs, and they can be negative.

{% include triggers/ui_header.md %}

To use **EPEX hour price became negative** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for **EPEX hour price became negative** and select it.
5. Under **Contracts**, select one or more of your contracts with a dynamic tariff.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Contracts:
  description: The ENGIE Belgium contracts with a dynamic tariff to watch.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `engie_be.epex_hour_became_negative`. A basic example looks like this:

{% example %}
trigger: |
  trigger: engie_be.epex_hour_became_negative
  options:
    device_id: 0123456789abcdef0123456789abcdef
{% endexample %}

This fires when the current hourly price of the contract with that device ID goes from zero or above to below zero. When you create the automation in the automation editor, it fills in the device ID of your contract for you.

### Options in YAML

The options go under `options`.

{% options_yaml %}
device_id:
  description: One or more device IDs of ENGIE Belgium contracts with a dynamic tariff.
  required: true
  type: [string, list]
{% endoptions_yaml %}

## Good to know

- Only contracts with a dynamic tariff have EPEX prices. A device of a contract with a fixed tariff never fires.
- Home Assistant checks the price on every EPEX update and on every quarter-hour boundary (at 00, 15, 30 and 45 minutes past the hour).
- After the integration reloads, or when the price is unknown because a slot is missing or an update failed, the first known price sets a new baseline. The trigger does not fire on that first price.
- Each selected device fires on its own. If you select two contracts of the same account, the trigger fires twice.
- A price of exactly zero counts as not negative.

### Available trigger data

In addition to the [standard automation trigger data](/docs/automation/templating/#all), this trigger exposes the following template variable:

- `trigger.device_id`: The device ID of the contract that fired the trigger.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: charge the EV when the price turns negative

When the price of the current hour turns negative, this automation starts the EV charger.

- **Trigger**: EPEX hour price became negative
  - **Contracts**: Main Street 1
- **Action**: Turn on switch
  - **Target**: EV charger (`switch.ev_charger`)

{% details "YAML example for this automation" %}

{% example %}
automation: |
  alias: "Charge the EV when the hourly price turns negative"
  triggers:
    - trigger: engie_be.epex_hour_became_negative
      options:
        device_id: 0123456789abcdef0123456789abcdef
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.ev_charger
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
