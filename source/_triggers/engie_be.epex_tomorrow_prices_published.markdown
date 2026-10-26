---
title: "Tomorrow's EPEX prices published"
trigger: engie_be.epex_tomorrow_prices_published
domain: engie_be
description: "Triggers when the EPEX day-ahead prices for tomorrow become available."
related_triggers:
  - engie_be.epex_low_today_hour_updated
  - engie_be.epex_high_today_hour_updated
  - engie_be.epex_low_today_quarter_hour_updated
  - engie_be.epex_high_today_quarter_hour_updated
---

The **Tomorrow's EPEX prices published** trigger fires when the hourly and the quarter-hourly EPEX prices both cover all of tomorrow, Brussels time.

Use it to plan the next day, for example to get a notification or to schedule appliances for the cheapest hours. To react when today's cheapest price changes, use [EPEX lowest hour price today updated](/triggers/engie_be.epex_low_today_hour_updated/).

Only contracts with a dynamic tariff have EPEX prices. The prices are raw wholesale prices in EUR/kWh, without VAT, taxes and levies, or network costs, and they can be negative.

{% include triggers/ui_header.md %}

To use **Tomorrow's EPEX prices published** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for **Tomorrow's EPEX prices published** and select it.
5. Under **Contracts**, select one or more of your contracts with a dynamic tariff.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Contracts:
  description: The ENGIE Belgium contracts with a dynamic tariff to watch.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `engie_be.epex_tomorrow_prices_published`. A basic example looks like this:

{% example %}
trigger: |
  trigger: engie_be.epex_tomorrow_prices_published
  options:
    device_id: 0123456789abcdef0123456789abcdef
{% endexample %}

This fires when tomorrow's prices for the contract with that device ID are published. When you create the automation in the automation editor, it fills in the device ID of your contract for you.

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
- Home Assistant checks whether tomorrow's prices are complete on every EPEX update and on every quarter-hour boundary (at 00, 15, 30 and 45 minutes past the hour).
- After the integration reloads, the check when it finishes loading sets a new baseline. After a failed update, the first check sets it. If tomorrow's prices are already complete at that check, the trigger does not fire that day.
- Each selected device fires on its own. If you select two contracts of the same account, the trigger fires twice.
- The prices for tomorrow are usually published in the early afternoon, Brussels time. The trigger fires when tomorrow's prices become complete, normally once per day for each contract.

### Available trigger data

In addition to the [standard automation trigger data](/docs/automation/templating/#all), this trigger exposes the following template variable:

- `trigger.device_id`: The device ID of the contract that fired the trigger.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: get a notification when tomorrow's prices are in

This automation sends a notification once tomorrow's EPEX prices are published, so you can plan the next day.

- **Trigger**: Tomorrow's EPEX prices published
  - **Contracts**: Main Street 1
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification when tomorrow's prices are in" %}

{% example %}
automation: |
  alias: "Notify when tomorrow's prices are published"
  triggers:
    - trigger: engie_be.epex_tomorrow_prices_published
      options:
        device_id: 0123456789abcdef0123456789abcdef
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Electricity prices"
        message: "Tomorrow's EPEX prices are available."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
