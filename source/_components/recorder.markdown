---
layout: page
title: "Recorder"
description: "Instructions how to configure the data recorder for Home Assistant."
date: 2016-05-21 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: "History"
featured: false
ha_release: "0.20"
---

The `recorder` component is storing details in the local database which then are handled by the [`history` component](/components/history/).

To setup the `recorder` component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
recorder:
  purge_days: 14
```

Configuration variables:

- **purge_days** (*Optional*): Delete events and states older than x days.

