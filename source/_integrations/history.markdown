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

The **History** {% term integration %} tracks everything that is going on within Home
Assistant and allows you to browse through it. It depends on the [`recorder`](/integrations/recorder/)
integration for storing the data and uses the same database setting.
If any entities are excluded from being recorded,
no history will be available for these entities.

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Basic configuration.yaml entry
history:
```

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

## About the data sources

By default, the recorder stores the sensor data for 10 days. Older data is purged automatically. The data for the last 10 days is taken from the recorder.

If you select a time frame that exceeds 10 days, the data is taken from the long term statistics table. Long term statistics are saved for sensors with a state_class of measurement, total or total_increasing. The long term statistics data is sampled and averaged once per hour, to save storage. Therefore, the values might look different from what you see from the recorder data, which shows the measured values at the sample rate defined for that sensor. The detailed data will be shown with a darker line on graphs.

<img class="no-shadow" src='/images/integrations/history/history-panel_including-long-term-storage.png' alt='If the chosen time frame exceeds the retention period defined in the recorder, the long term statistics table is used as a data source.'>

 If you want to see the data in full resolution for a longer period of time, you could change the retention period for that sensor in the recorder. If you do this, you may need to increase the storage capacity of your device.

## API

The history information is also available through the
[RESTful API](/developers/rest_api/#get-apihistory).
