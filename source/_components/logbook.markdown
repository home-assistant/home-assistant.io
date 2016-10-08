---
layout: page
title: "Logbook"
description: "Instructions how to enable the logbook component for Home Assistant."
date: 2015-04-25 9:23
sidebar: true
comments: false
sharing: true
footer: true
logo: logbook.png
ha_category: "History"
---

<img src='/images/screenshots/logbook.png' style='margin-left:10px; float: right;' height="100" /> The logbook component provides a different perspective on the history of your house by showing all the changes that happened to your house in reverse chronological order. [See the demo for a live example](/demo/).

To enable the logbook in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
logbook:
```

Configuration variables:

- **exclude** (*Optional*): Configure which components should **not** create logbook enties. 
- **entities** (*Optional*): The list of entity ids to be excluded from creating logbook entries.
- **domains** (*Optional*): The list of domains to be excluded from creating logbook entries.

If you want to exclude messages of some entities or domains from the logbook just add the `exclude` parameter like: 

```yaml
logbook:
  exclude:
    entities:
      - sensor.last_boot
      - sensor.date
    domains:
      - sun
      - weblink
```

### {% linkable_title Exclude Events %}

Entities customized as hidden are excluded from the logbook by default, but sometimes you want to show the entity in the UI and not in the logbook. For instance you use the `sensor.date`to show the current date in the UI, but you do not want an logbook entry for that sensor every day.
To exclude these entities just add them to the `exclude` > `entities` list in the configuration of the logbook.

To exclude all events from a whole domain add it to the `exclude` > `domain` list. For instance you use the `sun` domain only to trigger automations on the `azimuth attribute, then you possible are not interested in the logbook entries for sun rise and sun set. 

### {% linkable_title Custom Entries %}

It is possible to add custom entries to the logbook by using the script component to fire an event.

```yaml
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
