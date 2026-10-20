---
title: "EPEX lowest quarter-hourly price today updated"
trigger: engie_be.epex_low_today_quarter_hour_updated
domain: engie_be
description: "Triggers when the lowest quarter-hourly EPEX day-ahead price of today changes."
related_triggers:
  - engie_be.epex_high_today_quarter_hour_updated
  - engie_be.epex_low_today_hour_updated
---

The **EPEX lowest quarter-hourly price today updated** trigger fires when the cheapest quarter-hourly price of today changes. The **EPEX lowest quarter-hourly price today** sensor holds the bargain of the day, and this trigger passes every change of it on to your automations.

Use it to get today's cheapest quarter hour into an automation, for example a notification that tells you when to run the dishwasher or charge the car. For the most expensive quarter hour of the day, use [EPEX highest quarter-hourly price today updated](/triggers/engie_be.epex_high_today_quarter_hour_updated/). If your contract bills you per hour, use [EPEX lowest hour price today updated](/triggers/engie_be.epex_low_today_hour_updated/) instead.

Only addresses on a dynamic tariff have EPEX price sensors. The prices are raw wholesale prices in EUR/kWh, without VAT, taxes and levies, or network costs, and they can be negative.

{% include triggers/ui_header.md %}

To use **EPEX lowest quarter-hourly price today updated** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **EPEX lowest quarter-hourly price today updated**.
5. Select **Add target** (see [Targets](#targets)) and pick the **EPEX lowest quarter-hourly price today** sensor of your dynamic address.
6. Select **Save**.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `engie_be.epex_low_today_quarter_hour_updated`. A basic example looks like this:

{% example %}
trigger: |
  trigger: engie_be.epex_low_today_quarter_hour_updated
  target:
    entity_id: sensor.main_street_1_1000_brussels_epex_lowest_quarter_hourly_price_today
{% endexample %}

This fires whenever the cheapest quarter-hourly price of today changes.

{% include triggers/targets.md domain="sensor" %}

## Good to know

- Only addresses on a dynamic tariff have EPEX price sensors, so the trigger only offers targets when your integration has one.
- The prices are raw wholesale prices in EUR/kWh, without VAT, taxes and levies, or network costs. The price you actually pay is higher, and wholesale prices can be negative, so today's cheapest quarter hour can even pay you to consume.
- The prices of a whole day are published the day before, so today's cheapest price does not drop while the day progresses. The sensor changes when the new day starts.
- A new day starts at midnight Brussels time, so outside Belgium the switch can happen at a different local time for you.
- The trigger fires on actual changes only. A refresh that keeps the same price does not fire it.

{% include triggers/try_it.md %}

{% include triggers/stuck.md %}
{% include triggers/related.md %}
