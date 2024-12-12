---
title: Logbook
description: Instructions on how to enable the logbook integration for Home Assistant.
ha_category:
  - History
ha_release: 0.7
ha_domain: logbook
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
related:
  - docs: /docs/configuration/
    title: Configuration file
---

<img src='/images/screenshots/logbook.png' style='margin-left:10px; float: right;' height="100" />

The logbook {% term integration %} provides a different perspective on the history of your
house by showing all the changes that happened to your house in reverse
chronological order. It depends on
the [`recorder`](/integrations/recorder/) integration for storing the data. This means that if the
[`recorder`](/integrations/recorder/) integration is set up to use e.g., MySQL or
PostgreSQL as data store, the `logbook` integration does not use the default
SQLite database to store data.

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your {% term "`configuration.yaml`" %} file. If that is the case, the following example shows you how to enable this integration manually, by adding it to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
logbook:
```

{% configuration %}
exclude:
  description: "Configure which integrations should **not** create logbook entries. ([Configure Filter](#configure-filter))"
  required: false
  type: map
  keys:
    entities:
      description: The list of entity ids to be excluded from creating logbook entries.
      required: false
      type: list
    entity_globs:
      description: Exclude all entities matching a listed pattern from creating logbook entries (e.g., `sensor.weather_*`).
      required: false
      type: list
    domains:
      description: The list of domains to be excluded from creating logbook entries.
      required: false
      type: list
include:
  description: Configure which integrations should create logbook entries. ([Configure Filter](#configure-filter))
  required: false
  type: map
  keys:
    entities:
      description: The list of entity ids to be included in creating logbook entries.
      required: false
      type: list
    entity_globs:
      description: Include all entities matching a listed pattern when creating logbook entries (e.g., `sensor.weather_*`).
      required: false
      type: list
    domains:
      description: The list of domains to be included in creating logbook entries.
      required: false
      type: list
{% endconfiguration %}

## Configure filter

By default, the logbook will use the same filter as the recorder. To limit which entities are being exposed to `Logbook`, you can use the `include` and `exclude` parameters.

```yaml
# Example filter to include specified domains and exclude specified entities
logbook:
  include:
    domains:
      - alarm_control_panel
      - light
    entity_globs:
      - binary_sensor.*_occupancy
  exclude:
    entities:
      - light.kitchen_light
```

{% include common-tasks/filters.md %}

### Common filtering examples

If you want to exclude messages of some entities or domains from the logbook
just add the `exclude` parameter like:

```yaml
# Example of excluding domains and entities from the logbook
logbook:
  exclude:
    entities:
      - sensor.last_boot
      - sensor.date
    entity_globs:
      - sensor.weather_*
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
    entity_globs:
      - sensor.weather_*
```

### Exclude events

If you have `sensor.date` to show the current date in the UI,
but you do not want a logbook entry for that sensor every day it can be excluded.
To exclude these entities just add them to the `exclude` > `entities` list in
the configuration of the logbook.

To exclude all events from a whole domain add it to the `exclude` > `domain`
list. For instance you use the `sun` domain only to trigger automations on the
`azimuth` attribute, then you possible are not interested in the logbook entries
for sun rise and sun set.

Excluded entities still take up space in the database. It may be advisable to
exclude them in `recorder` instead.

### Custom entries

It is possible to add custom entries to the logbook by using the script
integration to fire an event.

```yaml
# Example configuration.yaml entry
script:
  add_logbook_entry:
    alias: "Add Logbook"
    sequence:
      - action: logbook.log
        data:
          name: Kitchen
          message: is being used
          # Optional
          entity_id: light.kitchen
          domain: light
```


{% important %}
When calling the `logbook.log` action without a `domain` or `entity_id`, entries will be added with the `logbook` domain. Ensure that the `logbook` domain is not filtered away if you want these entries to appear in your logbook.
{% endimportant %}

{% note %}
Sensor entities that have been assigned units (i.e., have a `unit_of_measurement` attribute) are assumed to change frequently and those sensors are automatically excluded from the logbook.
{% endnote %}
