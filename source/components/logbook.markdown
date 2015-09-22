---
layout: page
title: "Logbook support"
description: "Instructions how to enable the logbook component for Home Assistant."
date: 2015-04-25 9:23
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/screenshots/logbook.png' style='margin-left:10px; float: right;' height="100" />
The logbook component provides a different perspective on the history of your house by showing all
the changes that happened to your house in reverse chronological order.
[See the demo for a live example](/demo/).

To enable the logbook in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
logbook:
```

It is possible to add custom entries to the logbook by using the script component to fire an event.

```
# Example configuration.yaml entry
script:
  add_logbook_entry:
    alias: Add Logbook
    sequence:
      - event: LOGBOOK_ENTRY
        event_data:
          name: Kitchen
          message: is being used
          # Optional
          entity_id: light.kitchen
          domain: light
```
