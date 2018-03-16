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

<img src='/images/screenshots/logbook.png' style='margin-left:10px; float: right;' height="100" /> The logbook component provides a different perspective on the history of your house by showing all the changes that happened to your house in reverse chronological order. [See the demo for a live example](/demo/). It depends on the `recorder` component for storing the data. This means that if the [`recorder`](/components/recorder/) component is set up to use e.g., MySQL or PostgreSQL as data store, the `logbook` component does not use the default SQLite database to store data.

To enable the logbook in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
logbook:
```

Configuration variables:

- **exclude** (*Optional*): Configure which components should **not** create logbook entries. 
  - **entities** (*Optional*): The list of entity ids to be excluded from creating logbook entries.
  - **domains** (*Optional*): The list of domains to be excluded from creating logbook entries.
- **include** (*Optional*): Configure which components should create logbook entries. 
  - **entities** (*Optional*): The list of entity ids to be included in creating logbook entries.
  - **domains** (*Optional*): The list of domains to be included in creating logbook entries.

If you want to exclude messages of some entities or domains from the logbook just add the `exclude` parameter like: 

```yaml
# Example of excluding domains and entities from the logbook
logbook:
  exclude:
    entities:
      - sensor.last_boot
      - sensor.date
    domains:
      - sun
      - weblink
```

In case you just want to see messages from some specific entities or domains use the `include` configuration:

```yaml
# Example to show how to include only the listed domains and entities in the logbook
logbook:
  include:
    domains:
      - sensor
      - switch
      - media_player
```

You can also use the `include` list and filter out some entities or domains with an `exclude` list. Usually this makes sense if you define domains on the include side and filter out some specific entities.

```yaml
# Example of combining include and exclude configurations
logbook:
  include:
    domains:
      - sensor
      - switch
      - media_player
  exclude:
    entities:
      - sensor.last_boot
      - sensor.date
```

### {% linkable_title Exclude Events %}

Entities customized as hidden are excluded from the logbook by default, but sometimes you want to show the entity in the UI and not in the logbook. For instance you use the `sensor.date`to show the current date in the UI, but you do not want a logbook entry for that sensor every day.
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
      - service: logbook.log
        data_template:
          name: Kitchen
          message: is being used
          # Optional
          entity_id: light.kitchen
          domain: light
```
