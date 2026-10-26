---
title: "EPEX next hourly price crossed threshold"
trigger: engie_be.epex_next_hour_crossed_threshold
domain: engie_be
description: "Triggers when the next hourly EPEX price enters the configured range."
related_triggers:
  - engie_be.epex_current_hour_crossed_threshold
  - engie_be.epex_current_quarter_hour_crossed_threshold
  - engie_be.epex_next_quarter_hour_crossed_threshold
  - engie_be.epex_hour_became_negative
  - engie_be.epex_hour_no_longer_negative
---

The **EPEX next hourly price crossed threshold** trigger fires when the EPEX price of the next hour enters a price range you set, so when it goes from outside the range to inside it. On a dynamic tariff, the EPEX day-ahead auction sets a price for every hour of the day.

Use it to prepare before a cheap hour starts, for example to get a notification that the next hour is cheap so you can load the washing machine. To act on the hour you are in, use [EPEX current hourly price crossed threshold](/triggers/engie_be.epex_current_hour_crossed_threshold/). If your contract bills you per quarter hour, use [EPEX next quarter-hourly price crossed threshold](/triggers/engie_be.epex_next_quarter_hour_crossed_threshold/) instead.

Only contracts with a dynamic tariff have EPEX prices. The prices are raw wholesale prices in EUR/kWh, without VAT, taxes and levies, or network costs, and they can be negative.

{% include triggers/ui_header.md %}

To use **EPEX next hourly price crossed threshold** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for **EPEX next hourly price crossed threshold** and select it.
5. Under **Contracts**, select one or more of your contracts with a dynamic tariff.
6. Enter a price in EUR/kWh under **Above**, **Below**, or both.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Contracts:
  description: The ENGIE Belgium contracts with a dynamic tariff to watch.
  required: true
Above:
  description: The price in EUR/kWh that the EPEX price of the next hour must be above. Enter a number from -1 to 5.
  required: false
Below:
  description: The price in EUR/kWh that the EPEX price of the next hour must be below. Enter a number from -1 to 5.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `engie_be.epex_next_hour_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: engie_be.epex_next_hour_crossed_threshold
  options:
    device_id: 0123456789abcdef0123456789abcdef
    below: 0.10
{% endexample %}

This fires when the EPEX price of the next hour goes from 0.10 EUR/kWh or more to below 0.10 EUR/kWh. It does not fire again while the price stays below 0.10. The price has to leave the range first. When you create the automation in the automation editor, it fills in the device ID of your contract for you.

To fire when the price enters a range, for example between -0.05 and 0.10 EUR/kWh, set both options:

{% example %}
trigger: |
  trigger: engie_be.epex_next_hour_crossed_threshold
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
  description: The price in EUR/kWh that the EPEX price of the next hour must be above. Set at least one of `above` and `below`. When you set both, `above` must be lower than `below`.
  required: false
  type: float
below:
  description: The price in EUR/kWh that the EPEX price of the next hour must be below. Set at least one of `above` and `below`. When you set both, `above` must be lower than `below`.
  required: false
  type: float
{% endoptions_yaml %}

## Good to know

- In the UI, Above and Below accept a number from -1 to 5 EUR/kWh.
- Only contracts with a dynamic tariff have EPEX prices. A device of a contract with a fixed tariff never fires.
- Home Assistant checks the price on every EPEX update and on every quarter-hour boundary (at 00, 15, 30 and 45 minutes past the hour).
- After the integration reloads, the price when it finishes loading sets a new baseline. When the price is unknown because a slot is missing or an update failed, the first known price sets it. The trigger does not fire on a baseline price.
- Each selected device fires on its own. If you select two contracts of the same account, the trigger fires twice.
- Both comparisons are strict. With **Above** set to 0.10, a price of exactly 0.10 EUR/kWh is not in the range.
- The trigger fires when the price enters the range. While the price stays in the range, it does not fire again.

### Available trigger data

In addition to the [standard automation trigger data](/docs/automation/templating/#all), this trigger exposes the following template variable:

- `trigger.device_id`: The device ID of the contract that fired the trigger.

## Try it yourself

Go to {% my automations title="**Settings** > **Automations & scenes**" %}, create a new automation, add this trigger, and save it. The trigger fires on the next price change it watches, so you may have to wait for the next hour, quarter hour or publication. To test the actions right away, open the automation and select **Run actions**.

{% include triggers/more_examples.md %}

### Automation: get a heads-up before a cheap hour

When the price of the next hour goes below 0.05 EUR/kWh, this automation sends a notification so you can get appliances ready.

- **Trigger**: EPEX next hourly price crossed threshold
  - **Contracts**: Main Street 1
  - **Below**: 0.05
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for this automation" %}

{% example %}
automation: |
  alias: "Notify before a cheap hour"
  triggers:
    - trigger: engie_be.epex_next_hour_crossed_threshold
      options:
        device_id: 0123456789abcdef0123456789abcdef
        below: 0.05
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Cheap hour ahead"
        message: "The next hour costs less than 0.05 EUR/kWh."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
