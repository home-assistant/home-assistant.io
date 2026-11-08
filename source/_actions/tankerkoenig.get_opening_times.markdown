---
title: "Get opening times"
action: tankerkoenig.get_opening_times
domain: tankerkoenig
description: "Retrieves the opening times of a gas station and their temporary changes."
---

The **Tankerkoenig: Get opening times** action retrieves the regular opening times of one or more gas stations from [tankerkoenig.de](https://www.tankerkoenig.de/), together with temporary changes such as a closure over the holidays.

This is useful when you want a dashboard, an automation, or a script to show when a gas station opens or closes, beyond whether it is open right now. That part is already covered by the `Status` binary sensor.

{% include actions/targets.md domain="binary_sensor" %}

{% include actions/ui_header.md %}

To get the opening times from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Tankerkoenig: Get opening times**.
6. Select the `Status` binary sensor of each gas station as the target.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tankerkoenig.get_opening_times`. Because this action returns data, use `response_variable` to capture the result. A basic example looks like this:

{% example %}
action: |
  action: tankerkoenig.get_opening_times
  target:
    entity_id: binary_sensor.my_favorite_gas_station_status
  response_variable: opening_times
{% endexample %}

This retrieves the opening times of the gas station and stores them in the `opening_times` variable.

### Options in YAML

This action has no additional YAML options beyond the target.

## Response data

The response is a mapping of the targeted `Status` binary sensors, each containing these fields:

- `opening_times`: The regular opening times. Each entry has `days`, `start_time`, and `end_time`. A gas station that is open 24 hours a day returns a single entry with `days` `Mo-So`, `start_time` `00:00:00`, and `end_time` `23:59:59`. A gas station without any known opening times returns an empty list.
- `overrides`: Temporary changes to the regular opening times, such as a closure over the holidays or different hours on a single day, as the text Tankerkönig provides. It is empty when there are none.

The response looks similar to this:

{% example %}
output: |
  binary_sensor.my_favorite_gas_station_status:
    opening_times:
      - days: Mo-Fr
        start_time: "06:00:00"
        end_time: "22:00:00"
      - days: Sa-So
        start_time: "08:00:00"
        end_time: "20:00:00"
    overrides:
      - "24.12.2026, 14:00:00 - 26.12.2026, 23:59:00: geschlossen"
{% endexample %}

## Good to know

- The opening times are read from Tankerkönig when the action is called. To stay within the API limits, they are reused for up to an hour.
- If Tankerkönig can't be reached, the action fails with an error instead of returning outdated data.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
