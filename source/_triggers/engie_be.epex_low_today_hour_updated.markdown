---
title: "EPEX lowest hour price today updated"
trigger: engie_be.epex_low_today_hour_updated
domain: engie_be
description: "Triggers when today's lowest hourly EPEX price changes."
related_triggers:
  - engie_be.epex_high_today_hour_updated
  - engie_be.epex_high_today_quarter_hour_updated
  - engie_be.epex_low_today_quarter_hour_updated
---

The **EPEX lowest hour price today updated** trigger fires when today's lowest hourly EPEX price changes from one known value to another. In practice, this happens at midnight, Brussels time, when a new day starts, or when prices are corrected.

Use it to start the day knowing the cheapest hour, for example with a notification that tells you when to run the dishwasher. For the most expensive hour, use [EPEX highest hour price today updated](/triggers/engie_be.epex_high_today_hour_updated/). If your contract bills you per quarter hour, use [EPEX lowest quarter-hourly price today updated](/triggers/engie_be.epex_low_today_quarter_hour_updated/) instead.

Only contracts with a dynamic tariff have EPEX prices. The prices are raw wholesale prices in EUR/kWh, without VAT, taxes and levies, or network costs, and they can be negative.

{% include triggers/ui_header.md %}

To use **EPEX lowest hour price today updated** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for **EPEX lowest hour price today updated** and select it.
5. Under **Contracts**, select one or more of your contracts with a dynamic tariff.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Contracts:
  description: The ENGIE Belgium contracts with a dynamic tariff to watch.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `engie_be.epex_low_today_hour_updated`. A basic example looks like this:

{% example %}
trigger: |
  trigger: engie_be.epex_low_today_hour_updated
  options:
    device_id: 0123456789abcdef0123456789abcdef
{% endexample %}

This fires when today's lowest hourly price of the contract with that device ID changes. When you create the automation in the automation editor, it fills in the device ID of your contract for you.

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
- The trigger does not fire when today's lowest price becomes unknown, or when it becomes known for the first time.

### Available trigger data

In addition to the [standard automation trigger data](/docs/automation/templating/#all), this trigger exposes the following template variable:

- `trigger.device_id`: The device ID of the contract that fired the trigger.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: get today's cheapest hour

When a new day starts, this automation sends a notification with the price of today's cheapest hour.

- **Trigger**: EPEX lowest hour price today updated
  - **Contracts**: Main Street 1
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for this automation" %}

{% example %}
automation: |
  alias: "Notify about today's cheapest hour"
  triggers:
    - trigger: engie_be.epex_low_today_hour_updated
      options:
        device_id: 0123456789abcdef0123456789abcdef
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Cheapest hour today"
        message: "Today's cheapest hour price has changed. Check the EPEX lowest hour price today sensor."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
