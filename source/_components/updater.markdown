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

The updater component will detect when the newest published version of Home
Assistant does not match the currently installed version. When running,
it will check for new releases at startup and everyday at noon and midnight.

For an added bonus, an automation component can be created to send a message
with a notifier when that state of this component's entity changes.

``` yaml
automation:
  alias: 'Update Available Notifications'
  trigger:
    platform: state
    entity_id: updater.updater
  action:
    service: notify.notify
    data:
      message: 'Home Assistant update is available.'
```
