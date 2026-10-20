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

The **Tomorrow's EPEX prices published** trigger fires when the EPEX day-ahead prices for tomorrow become available. The **EPEX tomorrow prices available** binary sensor turns on the moment both the hourly and the quarter-hourly prices for tomorrow are in, and this trigger passes that moment on to your automations.

Use it to get a heads-up when tomorrow's prices are in, so you can plan the next day: shift flexible appliances to tomorrow's cheap hours, or check the [Energy dashboard](/energy) after the new data arrives. The prices are typically published in the early afternoon, Brussels time.

Only addresses on a dynamic tariff have EPEX price sensors. The prices are raw wholesale prices in EUR/kWh, without VAT, taxes and levies, or network costs, and they can be negative.

{% include triggers/ui_header.md %}

To use **Tomorrow's EPEX prices published** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Tomorrow's EPEX prices published**.
5. Select **Add target** (see [Targets](#targets)) and pick the **EPEX tomorrow prices available** binary sensor of your dynamic address.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick how the trigger fires when you target more than one entity.
7. Under **For at least**, set how long the binary sensor must stay on before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When more than one entity is targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted entity turns on.
    - **First**: fires only on the first entity to turn on.
    - **All**: fires only after every targeted entity has turned on.
For at least:
  description: How long tomorrow's prices must be available before the trigger fires. The default is `0` hours, `00` minutes and `00` seconds (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `engie_be.epex_tomorrow_prices_published`. A basic example looks like this:

{% example %}
trigger: |
  trigger: engie_be.epex_tomorrow_prices_published
  target:
    entity_id: binary_sensor.main_street_1_1000_brussels_epex_tomorrow_prices_available
{% endexample %}

This fires the moment tomorrow's EPEX day-ahead prices become available.

### Options in YAML

The options go under `options`.

{% options_yaml %}
behavior:
  description: |
    When more than one entity is targeted, controls when the trigger fires:

    - `each` (default): fires every time any targeted entity turns on.
    - `first`: fires only on the first entity to turn on.
    - `all`: fires only after every targeted entity has turned on.
  required: false
  type: string
  default: each
for:
  description: How long tomorrow's prices must be available before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md domain="binary_sensor" %}

{% include triggers/behavior.md %}

## Good to know

- Only addresses on a dynamic tariff have EPEX price sensors, so the trigger only offers targets when your integration has one.
- The trigger fires once per day, when the hourly and the quarter-hourly prices for tomorrow are both published. This is typically in the early afternoon, Brussels time.
- At midnight, Brussels time, the binary sensor turns off again, because the prices of the following day are not published yet. The trigger fires again after the next publication.
- Until the prices are published, the next price sensors have no value for hours that fall on tomorrow.
- The lowest and highest price today sensors switch to the new day at the same moment, and the updated triggers fire when the new extreme price differs from yesterday's.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: get a notification when tomorrow's prices are in

This automation sends a notification once tomorrow's EPEX prices are published, so you can plan the next day while the evening is still ahead.

- **Trigger**: Tomorrow's EPEX prices published
  - **Target**: EPEX tomorrow prices available
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification when tomorrow's prices are in" %}

{% example %}
automation: |
  alias: "Notify when tomorrow's prices are published"
  triggers:
    - trigger: engie_be.epex_tomorrow_prices_published
      target:
        entity_id: binary_sensor.main_street_1_1000_brussels_epex_tomorrow_prices_available
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
