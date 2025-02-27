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

The **History** integration tracks everything that is going on within Home
Assistant and allows the user to browse through it. It depends on the [`recorder`](/integrations/recorder/)
integration for storing the data and uses the same database setting.
If any entities are excluded from being recorded,
no history will be available for these entities.

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Basic configuration.yaml entry
history:
```

## Exporting data from the History panel

You can access the **History** panel from the side bar. To export the data, follow these steps:

1. Select the areas, devices, or entities of interest.
2. Set the time frame.
3. In the top right corner, select the **Download data** button.
   **Result**: Your data is exported in CSV format.

<img class="no-shadow" src='/images/integrations/history/history-panel_export-data.png' alt='History panel can be accessed via sidebar.'>

## About the data sources

By default, the recorder stores the sensor data for 10 days. Older data is purged automatically. The data for the last 10 days is taken from the recorder.

If you select a time frame that exceeds 10 days, the data is taken from the long term statistics table. The long term statistics data is sampled and averaged once per hour, to save storage. Therefore, the values might look different from what you see from the recorder data, which shows the measured values at the sample rate defined for that sensor. The detailed data will be shown with a darker line on graphs.

<img class="no-shadow" src='/images/integrations/history/history-panel_including-long-term-storage.png' alt='If the chosen time frame exceeds the retention period defined in the recorder, the long term statistics table is used as a data source.'>

 If you want to see the data in full resolution for a longer period of time, you could change the retention period for that sensor in the recorder. If you do this, you may need to increase the storage capacity of your device.

## API

The history information is also available through the
[RESTful API](/developers/rest_api/#get-apihistory).
