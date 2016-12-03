---
layout: page
title: "Notifications Introduction"
description: "Getting started with iOS notifications"
date: 2016-10-25 15:00:00 -0700
sidebar: true
comments: false
sharing: true
footer: true
---

The `ios` notify platform enables sending push notifications to the Home Assistant iOS app.

## {% linkable_title Setup %}

```yaml
# Example configuration.yaml entry
notify:
  - platform: ios
```

Configuration variables:

- **name** (*Optional*): The name of the service.
