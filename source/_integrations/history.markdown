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

The `history` integration will track everything that is going on within Home
Assistant and allows the user to browse through it. It depends on the [`recorder`](/integrations/recorder/)
integration for storing the data and uses the same database setting.
If any entities are excluded from being recorded,
no history will be available for these entities.

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Basic configuration.yaml entry
history:
```

<p class='img'>
  <a href='/images/screenshots/component_history_24h.png'>
    <img src='/images/screenshots/component_history_24h.png' />
  </a>
</p>

#### API

The history information is also available through the
[RESTful API](/developers/rest_api/#get-apihistory).
