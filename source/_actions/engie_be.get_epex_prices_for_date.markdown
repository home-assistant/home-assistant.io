---
title: "Get EPEX prices for date"
action: engie_be.get_epex_prices_for_date
domain: engie_be
description: "Retrieves the Belgian EPEX day-ahead prices for today or tomorrow."
related_actions:
  - nordpool.get_prices_for_date
---

The **Get EPEX prices for date** action retrieves the Belgian EPEX day-ahead prices for today or tomorrow. The EPEX sensors only show the current, the next, and the day's extreme prices, so use this action when you need every hourly or quarter-hourly price of a day.

This action returns its result in a response variable, which you can use in later steps of the same automation or script, for example in a trigger-based template sensor.

{% include actions/ui_header.md %}

To get the EPEX prices for a date from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **ENGIE Belgium: Get EPEX prices for date**.
6. Select the **Config entry** and the **Date**. Optionally, set the **Granularity** to **Quarter-hourly** to get quarter-hourly prices instead of hourly ones.
7. In the **Response variable** field, enter a name to store the data in, such as `epex_prices`.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, or entity.

### Options in the UI

{% options_ui %}
Config entry:
  description: The ENGIE Belgium configuration entry to use for this action.
  required: true
Date:
  description: The day to get the prices for. Only today and tomorrow are allowed.
  required: true
Granularity:
  description: The price intervals to get. **Hourly** returns one price per hour, **Quarter-hourly** returns one price per quarter hour. Hourly prices are used when left empty.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `engie_be.get_epex_prices_for_date`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: engie_be.get_epex_prices_for_date
  data:
    config_entry: YOUR_CONFIG_ENTRY_ID
    date: "{{ now().date() + timedelta(days=1) }}"
  response_variable: epex_prices
{% endexample %}

This fetches the hourly prices for tomorrow. Add `granularity: quarter_hourly` to the data to get the quarter-hourly prices instead.

### Options in YAML

{% options_yaml %}
config_entry:
  description: >
    The ENGIE Belgium configuration entry to use for this action.
  required: true
  type: string
date:
  description: >
    The day to get the prices for. Only today and tomorrow are allowed, in the
    Brussels time zone.
  required: true
  type: date
granularity:
  description: >
    The price intervals to get. Accepts `hourly` for one price per hour, or
    `quarter_hourly` for one price per quarter hour.
  required: false
  type: string
  default: hourly
{% endoptions_yaml %}

## Response data

The response contains a `slots` list with one entry per price interval. Each entry has the following fields:

- `start`: the start of the price interval, in UTC.
- `end`: the end of the price interval, in UTC.
- `value`: the EPEX day-ahead price of the interval, in EUR/kWh.

The slots cover the requested Brussels day, so in summer the first slot starts at 22:00 UTC on the day before. In winter, it starts at 23:00 UTC.

A shortened example of the response looks like this:

```yaml
slots:
  - start: "2026-10-03T22:00:00+00:00"
    end: "2026-10-03T23:00:00+00:00"
    value: 0.11042
  - start: "2026-10-03T23:00:00+00:00"
    end: "2026-10-04T00:00:00+00:00"
    value: 0.10628
```

## Good to know

- Tomorrow's prices are published in the early afternoon, Brussels time. Requesting them earlier fails with an error, but the **EPEX tomorrow prices available** binary sensor tells you when they are in.
- The prices are the raw wholesale market prices. They do not include VAT, energy taxes and levies, or network and distribution costs.
- Requesting any other day fails with an error. Older prices are not kept.
- You can copy the value for **Config entry** from the YAML view of this action in {% my developer_services title="**Settings** > **Tools** > **Actions**" %}.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: get notified when tomorrow's prices are published

This automation sends you tomorrow's cheapest hourly price as soon as tomorrow's EPEX prices are published.

- **Trigger**: State: the **EPEX tomorrow prices available** binary sensor turned on
- **Action**: ENGIE Belgium: Get EPEX prices for date, with tomorrow's date, stored in the response variable `epex_tomorrow`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification when tomorrow's prices are published" %}

The entity IDs in these examples are shortened. Yours also contain the address of your household.

{% example %}
automation: |
  alias: "Notify when tomorrow's EPEX prices are published"
  triggers:
    - trigger: state
      entity_id: binary_sensor.main_street_1_epex_tomorrow_prices_available
      from: "off"
      to: "on"
  actions:
    - action: engie_be.get_epex_prices_for_date
      data:
        config_entry: YOUR_CONFIG_ENTRY_ID
        date: "{{ now().date() + timedelta(days=1) }}"
      response_variable: epex_tomorrow
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Tomorrow's cheapest hour costs
          {{ epex_tomorrow.slots | map(attribute='value') | min }} EUR/kWh.
{% endexample %}

{% enddetails %}

### Automation: show tomorrow's lowest hour price

The EPEX sensors show today's lowest hour, but not tomorrow's. This template sensor fetches tomorrow's prices once they are published and holds the cheapest hourly price on a sensor for your dashboards.

{% details "YAML example for a sensor with tomorrow's lowest hour price" %}

{% example %}
template: |
  - triggers:
      - trigger: state
        entity_id: binary_sensor.main_street_1_epex_tomorrow_prices_available
        to: "on"
      - trigger: homeassistant
        event: start
    conditions:
      - condition: state
        entity_id: binary_sensor.main_street_1_epex_tomorrow_prices_available
        state: "on"
    actions:
      - action: engie_be.get_epex_prices_for_date
        data:
          config_entry: YOUR_CONFIG_ENTRY_ID
          date: "{{ now().date() + timedelta(days=1) }}"
        response_variable: epex_tomorrow
    sensor:
      - name: "Tomorrow's lowest hour price"
        unique_id: engie_be_epex_tomorrow_lowest_hour_price
        unit_of_measurement: "EUR/kWh"
        state: "{{ epex_tomorrow.slots | map(attribute='value') | min }}"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
