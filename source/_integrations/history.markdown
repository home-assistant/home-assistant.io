---
title: History
description: Instructions on how to enable history support for Home Assistant.
ha_category:
  - History
ha_release: pre 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: history
ha_integration_type: system
related:
  - docs: /integrations/recorder/
    title: Recorder integration
  - url: https://data.home-assistant.io
    title: Home Assistant Data Science Portal
---

The **History** {% term integration %} shows how the states of your entities changed over time, so you can browse through what happened in your home. It depends on the [Recorder](/integrations/recorder/) integration for storing the data and uses the same database. If an entity is excluded from the Recorder, no history is available for that entity.

## Viewing history in the History panel

The **History** panel shows how the states of your entities changed over time. The panel stays empty until you select what you want to see.

1. In the sidebar, select **History**.
   - On a wide screen, the **Sources** pane opens on the left.
   - On a narrow screen, such as a phone, select **Sources** {% icon "mdi:tune-variant" %} in the toolbar to open it.
2. In the **Sources** pane, select **Add target**, then select the floors, areas, devices, entities, or labels you want to see.
3. Optional: To narrow down your selection, use the filters below the targets:
   - **Type**: shows only entities of the selected types. For example, select an area, then select the **Temperature** type under **Sensor** to see only the temperature sensors in that area.
   - **Integrations**: shows only entities that are provided by the selected integrations.
   - Home Assistant remembers your targets and filters the next time you open the panel. To remove all of them, select **Clear filter** {% icon "mdi:filter-variant-remove" %} at the top of the pane.
4. To change the time period, select the date range in the toolbar.
   - To move to the previous or next period, select the arrows next to the date range.

## Exporting data from the History panel

1. Select the sources and the time period, as described in [Viewing history in the History panel](#viewing-history-in-the-history-panel).
2. In the top right corner, select **Menu** {% icon "mdi:dots-vertical" %}, then select **Download data**.
   - **Result**: Your data is exported in CSV format.

## Adding the current view to a dashboard

To keep the graph you are looking at on a dashboard, add it as a [History graph card](/dashboards/history-graph/).

1. Select the sources and the time period, as described in [Viewing history in the History panel](#viewing-history-in-the-history-panel).
2. In the top right corner, select **Menu** {% icon "mdi:dots-vertical" %}, then select **Add current view as card**.
3. Select the dashboard and view to add the card to.
   - **Result**: The card shows the selected entities and covers the same number of hours as your selected time period.

## About the data sources

By default, the Recorder stores your data for 10 days. Older data is purged automatically. The data for the last 10 days is taken from the recorder.

If you select a time period that goes back further than 10 days, the older data is taken from the {% term "long-term statistics" %}. Long-term statistics are saved for sensors with a state class of `measurement`, `total`, or `total_increasing`. To save storage, long-term statistics are averaged once per hour. Therefore, the values might look different from what you see from the recorder data, which shows the measured values at the sample rate defined for that sensor. The detailed data will be shown with a darker line on graphs.

<img class="no-shadow" src='/images/integrations/history/history-panel_including-long-term-storage.png' alt='If the chosen time frame exceeds the retention period defined in the recorder, the long term statistics table is used as a data source.'>

If you want to see the data in full resolution for a longer period of time, increase the [`purge_keep_days`](/integrations/recorder/#purge_keep_days) option of the Recorder. This option applies to all data that the Recorder stores, not to a single sensor. If you increase it, you may need to increase the storage capacity of your device.

## Configuration

This integration is enabled by default, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your {% term "`configuration.yaml`" %} file. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Basic configuration.yaml entry
history:
```

## API

The history information is also available through the
[RESTful API](/developers/rest_api/#get-apihistory).
