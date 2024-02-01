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

## History panel in side bar

By default, you can access the **History** panel from the side bar. To export the data, follow these steps:

1. Select the areas, devices, or entities of interest.
2. Set the timeframe.
3. In the top right corner, select the **Download data** button.
   **Result**: Your data is exported in CSV format.

<img class="no-shadow" src='/images/integrations/history/history-panel_export-data.png' alt='History panel can be accessed via sidebar.'>

## API

The history information is also available through the
[RESTful API](/developers/rest_api/#get-apihistory).
