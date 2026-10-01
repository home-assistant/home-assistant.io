---
title: "Long-term statistics"
description: "Home Assistant keeps long-term statistics for many sensors, such as energy use or temperature, so you can see trends over months and years. Learn which sensors have statistics, how long they're kept, and where you use them."
related:
  - docs: /integrations/recorder/
    title: Recorder
  - docs: /docs/tools/dev-tools/#statistics-tab
    title: Statistics tab
  - docs: /docs/energy/
    title: Energy dashboard
  - docs: /dashboards/statistics-graph/
    title: Statistics graph card
---

Home Assistant saves every state change of your entities in its database, but only for a limited time, by default 10 days. For many sensors, it also saves statistics, of two kinds: short-term statistics every 5 minutes, and long-term statistics every hour. Short-term statistics are deleted together with the state history. Long-term statistics are never deleted automatically. With them, you can look back at your energy use or the temperature in your home over months and years.

You don't have to set anything up. Home Assistant creates both kinds automatically for the sensors that support them. On this page, "statistics" means both kinds. Where only one kind applies, the page says which.

Both kinds are different from the [**Statistics**](/integrations/statistics/) integration. That integration is a helper that creates a new sensor, for example, the average of another sensor over the last hour.

## Which sensors have statistics

Home Assistant keeps statistics for a sensor when all of the following are true:

- The sensor has a state class. The integration that provides the sensor sets it. The state class tells Home Assistant what kind of value the sensor has:
  - **Measurement**: A value right now, for example, a temperature or the current power use.
  - **Measurement angle**: An angle right now, for example, the wind direction.
  - **Total**: An amount that can go up and down, for example, the energy you put into and take out of a home battery.
  - **Total increasing**: An amount that only goes up, until it starts again from zero, for example, an energy meter.
- The state of the sensor is a number.
- The sensor is recorded. If you [exclude an entity from the recorder](/integrations/recorder/#configure-filter), Home Assistant doesn't keep statistics for it.

Only sensor entities get statistics this way. Other entities, such as lights or switches, don't.

To find out whether a sensor has a state class, go to {% my developer_states title="**Settings** > **Tools** > **States**" %}, and look for the `state_class` attribute of the sensor. If a sensor that you create yourself, such as a [template sensor](/integrations/template/), has no state class, you can set one in its options. For a sensor that an integration provides, the integration has to set it.

## About short-term and long-term statistics

The two kinds differ in how often Home Assistant saves them, and how long it keeps them:

- Short-term statistics
  - Saved every 5 minutes.
  - Kept as long as the state history, by default 10 days. You can change this with the `purge_keep_days` option of the [recorder](/integrations/recorder/).
- Long-term statistics
  - Saved every hour, calculated from the short-term statistics.
  - Never deleted automatically. You can delete them yourself in the [**Statistics** tab](/docs/tools/dev-tools/#deleting-statistics).

## What the statistics contain

Short-term and long-term statistics contain the same values, for a period of 5 minutes or of 1 hour. Which values Home Assistant saves depends on the state class:

- **Measurement**
  - The average, the lowest, and the highest value in each period.
  - The average is weighted by time: a value that stays the same for 4 minutes counts four times as much as a value that lasts 1 minute. So a sensor that updates unevenly still gets a correct average.
- **Measurement angle**
  - The average angle in each period, also weighted by time. Home Assistant calculates the average so that, for example, 350° and 10° give 0°, not 180°.
- **Total** and **Total increasing**
  - The sum: how much the value has changed since Home Assistant started keeping statistics for the sensor. The first value it sees is the starting point.
  - The last value in each period.

For **Total increasing**, what happens when the value drops depends on how much it drops:

- A drop of more than 10% counts as a reset, for example, when a meter starts again from zero.
  - The sum continues from where it was, so the reset doesn't count as a negative amount.
- A smaller drop doesn't count as a reset.
  - The sum goes down by that amount.
  - Home Assistant can log a warning that the state of the sensor isn't strictly increasing.
- A negative value is skipped, and Home Assistant logs a warning.

For **Total**, the sum can go up and down. A reset works differently:

- The integration signals a reset with the `last_reset` attribute of the sensor, which holds the time of the last reset.
  - When `last_reset` changes, Home Assistant starts a new cycle. The sum keeps what was counted so far, and the new value counts from zero.
- If the sensor has no `last_reset` attribute, Home Assistant doesn't detect resets. The sum follows the value up and down.

## Where statistics are used

Home Assistant uses statistics in these places:

- The [Energy dashboard](/docs/energy/) uses the long-term statistics of your energy, gas, and water sensors. For power graphs of short periods, about a week or less, it uses the short-term statistics.
- The [Statistics graph card](/dashboards/statistics-graph/) shows statistics for the period that you choose. With **5 minutes**, it shows the short-term statistics. With **Hour** or longer, it shows the long-term statistics.
- The [Statistic card](/dashboards/statistic/) shows one value, such as the average temperature today. It combines both kinds, so the value is exact for the period you choose.
- The [History graph card](/dashboards/history-graph/) and the **History** panel show the state history. For older periods, when the state history has already been deleted, they show the long-term statistics instead.

## About long-term statistics from integrations

Some {% term integrations %} add long-term statistics directly, without a sensor, for example, the hourly energy use that they get from your energy provider. These statistics have an ID with a colon instead of a dot. The part before the colon is the integration, for example, `opower:` for the Opower integration. You can use them in the Energy dashboard and in statistics cards, like the statistics of a sensor. To find them, go to {% my developer_statistics title="**Settings** > **Tools** > **Statistics**" %}.

## When the unit or the state class changes

Both kinds of statistics only work if the values stay comparable over time. Home Assistant checks this every 5 minutes, when it saves the short-term statistics. The long-term statistics are calculated from them, so if the short-term statistics stop, the long-term statistics stop too:

- If the unit of a sensor changes to another unit of the same kind, for example, from W to kW, the statistics continue.
  - Home Assistant keeps saving the statistics in the original unit, W in this example, and converts the new values to it.
  - The [Statistics graph card](/dashboards/statistics-graph/) shows the statistics in the current unit of the sensor, kW in this example.
- If the unit changes to a unit that can't be converted, for example, from kWh to m³, Home Assistant stops the statistics for the sensor until you fix it.
- If the sensor no longer has a state class, Home Assistant stops the statistics for it.
- If the state class changes between **Measurement** and **Measurement angle**, Home Assistant stops the statistics for the sensor, because it calculates the average differently. The statistics continue when the state class changes back, or after you delete the old statistics.

In these cases, an issue appears in {% my developer_statistics title="**Settings** > **Tools** > **Statistics**" %}, and often also under {% my repairs title="**Settings** > **System** > **Repairs**" %}. For how to fix it, refer to [Fixing a statistics issue](/docs/tools/dev-tools/#fixing-a-statistics-issue).

## Good to know

- If you delete a sensor, its long-term statistics stay. The **Statistics** tab shows the issue "There is no state available for this entity.", and you can delete the statistics there.
- If you change the entity ID of a sensor, its statistics move to the new entity ID. Changing the name of a sensor doesn't affect its statistics.
- If you exclude an entity from the recorder later, its existing long-term statistics stay. You can delete them in the [**Statistics** tab](/docs/tools/dev-tools/#deleting-statistics).
- To correct a wrong value, for example, a spike in your energy use, refer to [Adjusting a statistic](/docs/tools/dev-tools/#adjusting-a-statistic).
