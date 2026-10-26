---
title: "EPEX current hour price crossed threshold"
trigger: engie_be.epex_current_hour_crossed_threshold
domain: engie_be
description: "Triggers when the current hourly EPEX price enters a price range."
related_triggers:
  - engie_be.epex_next_hour_crossed_threshold
  - engie_be.epex_next_quarter_hour_crossed_threshold
  - engie_be.epex_current_quarter_hour_crossed_threshold
  - engie_be.epex_hour_became_negative
  - engie_be.epex_hour_no_longer_negative
---

The **EPEX current hour price crossed threshold** trigger fires when the current hourly EPEX price enters a price range you set, so when it goes from outside the range to inside it. On a dynamic tariff, the EPEX day-ahead auction sets a price for every hour of the day.

Use it to start a dishwasher, a tumble dryer, or an EV charger when electricity gets cheap, or to get a warning when the price climbs above a ceiling. To act on the price of the next hour before it starts, use [EPEX next hour price crossed threshold](/triggers/engie_be.epex_next_hour_crossed_threshold/). If your contract bills you per quarter hour, use [EPEX current quarter-hourly price crossed threshold](/triggers/engie_be.epex_current_quarter_hour_crossed_threshold/) instead. To check the price when an automation runs, use the [EPEX hour price is in range](/conditions/engie_be.epex_hour_price_meets_threshold/) condition.

Only contracts with a dynamic tariff have EPEX prices. The prices are raw wholesale prices in EUR/kWh, without VAT, taxes and levies, or network costs, and they can be negative.

{% include triggers/ui_header.md %}

To use **EPEX current hour price crossed threshold** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for **EPEX current hour price crossed threshold** and select it.
5. Under **Contracts**, select one or more of your contracts with a dynamic tariff.
6. Enter a price in EUR/kWh under **Above**, **Below**, or both.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Contracts:
  description: The ENGIE Belgium contracts with a dynamic tariff to watch.
  required: true
Above:
  description: The price in EUR/kWh that the current hourly EPEX price must be above. Enter a number from -1 to 5.
  required: false
Below:
  description: The price in EUR/kWh that the current hourly EPEX price must be below. Enter a number from -1 to 5.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `engie_be.epex_current_hour_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: engie_be.epex_current_hour_crossed_threshold
  options:
    device_id: 0123456789abcdef0123456789abcdef
    below: 0.10
{% endexample %}

This fires when the current hourly EPEX price goes from 0.10 EUR/kWh or more to below 0.10 EUR/kWh. It does not fire again while the price stays below 0.10. The price has to leave the range first. When you create the automation in the automation editor, it fills in the device ID of your contract for you.

To fire when the price enters a range, for example between -0.05 and 0.10 EUR/kWh, set both options:

{% example %}
trigger: |
  trigger: engie_be.epex_current_hour_crossed_threshold
  options:
    device_id: 0123456789abcdef0123456789abcdef
    above: -0.05
    below: 0.10
{% endexample %}

### Options in YAML

The options go under `options`.

{% options_yaml %}
device_id:
  description: One or more device IDs of ENGIE Belgium contracts with a dynamic tariff.
  required: true
  type: [string, list]
above:
  description: The price in EUR/kWh that the current hourly EPEX price must be above. Set at least one of `above` and `below`. When you set both, `above` must be lower than `below`.
  required: false
  type: float
below:
  description: The price in EUR/kWh that the current hourly EPEX price must be below. Set at least one of `above` and `below`. When you set both, `above` must be lower than `below`.
  required: false
  type: float
{% endoptions_yaml %}

## Good to know

- Above and Below must be between -1 and 5 EUR/kWh.
- Only contracts with a dynamic tariff have EPEX prices. A device of a contract with a fixed tariff never fires.
- Home Assistant checks the price on every EPEX update and on every quarter-hour boundary (at 00, 15, 30 and 45 minutes past the hour).
- After the integration reloads, or when the price is unknown because a slot is missing or an update failed, the first known price sets a new baseline. The trigger does not fire on that first price.
- Each selected device fires on its own. If you select two contracts of the same account, the trigger fires twice.
- Both comparisons are strict. With **Above** set to 0.10, a price of exactly 0.10 EUR/kWh is not in the range.
- The trigger fires when the price enters the range. While the price stays in the range, it does not fire again.

### Available trigger data

In addition to the [standard automation trigger data](/docs/automation/templating/#all), this trigger exposes the following template variable:

- `trigger.device_id`: The device ID of the contract that fired the trigger.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: get a notification when electricity gets expensive

When the price of the current hour goes above 0.25 EUR/kWh, this automation sends a notification so you can postpone heavy appliances until a cheaper hour.

- **Trigger**: EPEX current hour price crossed threshold
  - **Contracts**: Main Street 1
  - **Above**: 0.25
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for this automation" %}

{% example %}
automation: |
  alias: "Notify when the current hour is expensive"
  triggers:
    - trigger: engie_be.epex_current_hour_crossed_threshold
      options:
        device_id: 0123456789abcdef0123456789abcdef
        above: 0.25
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Expensive electricity"
        message: "The price of this hour is above 0.25 EUR/kWh."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
