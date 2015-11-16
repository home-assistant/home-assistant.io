---
layout: component
title: "Updater"
description: "Detecting when Home Assistant updates are available."
date: 2015-11-15 20:40
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Other
---

The updater component will check for new releases at startup and everyday at noon and midnight. It will show a badge in the frontend if a new version has been detected.

For an added bonus, an automation component can be created to send a message with a notifier when that state of this component's entity changes.

```yaml
# Example configuration.yaml entry
automation:
  alias: 'Update Available Notifications'
  trigger:
    platform: state
    entity_id: updater.updater
  action:
    service: notify.notify
    data:
      message: 'Update for Home Assistant is available.'
```
