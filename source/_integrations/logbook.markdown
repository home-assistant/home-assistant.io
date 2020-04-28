---
title: Logbook
description: Instructions on how to enable the logbook integration for Home Assistant.
ha_category:
  - History
ha_release: 0.7
ha_domain: logbook
---

<img src='/images/screenshots/logbook.png' style='margin-left:10px; float: right;' height="100" />

The logbook integration provides a different perspective on the history of your
house by showing all the changes that happened to your house in reverse
chronological order. It depends on
the `recorder` integration for storing the data. This means that if the
[`recorder`](/integrations/recorder/) integration is set up to use e.g., MySQL or
PostgreSQL as data store, the `logbook` integration does not use the default
SQLite database to store data.

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](https://www.home-assistant.io/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry
logbook:
```

{% configuration %}
exclude:
  description: "Configure which integrations should **not** create logbook entries."
  required: false
  type: map
  keys:
    entities:
      description: The list of entity ids to be excluded from creating logbook entries.
      required: false
      type: list
    domains:
      description: The list of domains to be excluded from creating logbook entries.
      required: false
      type: list
include:
  description: Configure which integrations should create logbook entries.
  required: false
  type: map
  keys:
    entities:
      description: The list of entity ids to be included in creating logbook entries.
      required: false
      type: list
    domains:
      description: The list of domains to be included in creating logbook entries.
      required: false
      type: list
require_admin:
  description: If admin access is required to see this iframe.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

If you want to exclude messages of some entities or domains from the logbook
just add the `exclude` parameter like:

```yaml
# Example of excluding domains and entities from the logbook
logbook:
  exclude:
    entities:
      - sensor.last_boot
      - sensor.date
    domains:
      - sun
```

In case you just want to see messages from some specific entities or domains use
the `include` configuration:

```yaml
# Example to show how to include only the listed domains and entities in the logbook
logbook:
  include:
    domains:
      - sensor
      - switch
      - media_player
```

You can also use the `include` list and filter out some entities or domains with
an `exclude` list. Usually this makes sense if you define domains on the include
side and filter out some specific entities.

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

### Exclude Events

Entities customized as hidden are excluded from the logbook by default,
but sometimes you want to show the entity in the UI and not in the logbook.
For instance you use the `sensor.date`to show the current date in the UI,
but you do not want a logbook entry for that sensor every day.
To exclude these entities just add them to the `exclude` > `entities` list in
the configuration of the logbook.

To exclude all events from a whole domain add it to the `exclude` > `domain`
list. For instance you use the `sun` domain only to trigger automations on the
`azimuth` attribute, then you possible are not interested in the logbook entries
for sun rise and sun set.

### Custom Entries

It is possible to add custom entries to the logbook by using the script
component to fire an event.

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
