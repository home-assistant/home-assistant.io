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
ha_iot_class:
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

<div class='note'>
Events are saved in a local database. Google Graphs is used to draw the graph.
Drawing is happening 100% in your browser. No data is transferred to anyone at any time.
</div>

{% configuration %}
exclude:
  description: Configure which integrations should **not** be displayed.
  required: false
  type: map
  keys:
    entities:
      description: The list of entity ids to be excluded from the history.
      required: false
      type: list
    entity_globs:
      description: Include all entities matching a listed pattern when creating logbook entries (e.g., `sensor.weather_*`).
      required: false
      type: list
    domains:
      description: The list of domains to be excluded from the history.
      required: false
      type: list
include:
  description: Configure which integrations should be displayed.
  required: false
  type: map
  keys:
    entities:
      description: The list of entity ids to be included in the history.
      required: false
      type: list
    entity_globs:
      description: Include all entities matching a listed pattern when creating logbook entries (e.g., `sensor.weather_*`).
      required: false
      type: list
    domains:
      description: The list of domains to be included in the history.
      required: false
      type: list
{% endconfiguration %}

Without any `include` or `exclude` configuration the history displays graphs for
 every entity (well that's not exactly true -
 `scenes` are never shown) on a given date. If you are only interested in some
 of the entities you have several options:

Define domains and entities to `exclude` (aka. blocklist). This is convenient
when you are basically happy with the information displayed, but just want to
remove some entities or domains. Usually these are entities/domains which do not
change or rarely change (like `updater` or `automation`).

```yaml
# Example configuration.yaml entry with exclude
history:
  exclude:
    domains:
      - automation
      - updater
    entities:
      - sensor.last_boot
      - sensor.date
    entity_globs:
      - binary_sensor.*_occupancy
```

Define domains and entities to display by using the `include` configuration
(aka. allowlist). If you have a lot of entities in your system and your
`exclude` list is getting too large, it might be better just to define the
entities or domains to `include`.

```yaml
# Example configuration.yaml entry with include
history:
  include:
    domains:
      - sensor
      - switch
      - media_player
```

Use the `include` list to define the domains/entities to display, and exclude
some of them within the `exclude` list. This makes sense if you, for instance,
include the `sensor` domain, but want to exclude some specific sensors. Instead
of adding every sensor entity to the `include` `entities` list just include the
`sensor` domain and exclude the sensor entities you are not interested in.
Note that the order of any `include` `entities` will be displayed as listed in
the configuration, otherwise, the display order is arbitrary.

```yaml
# Example configuration.yaml entry with include and exclude
history:
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

If you'd like the order of display of the sensors to follow the way they are
listed in the included entity list,
you can set the flag `use_include_order` to true.

```yaml
# Example configuration.yaml entry using specified entity display order
history:
  use_include_order: true
  include:
    entities:
      - sun.sun
      - light.front_porch
```

Filters are applied as follows:

1. No includes or excludes - pass all entities
2. Includes, no excludes - only include specified entities
3. Excludes, no includes - only exclude specified entities
4. Both includes and excludes - include specified entities and exclude specified entities from the remaining.

The following characters can be used in entity globs:

`*` - The asterisk represents zero, one, or multiple characters
`.` - The period represents a single character

#### Implementation details

The history is stored in a SQLite database `home-assistant_v2.db` within your
configuration directory unless the `recorder` integration is set up differently.

 - events table is all events except `time_changed` that happened while recorder integration was running.
 - states table contains all the `new_state` values of `state_changed` events.
 - Inside the states table you have:
   - `entity_id`: the entity_id of the entity
   - `state`: the state of the entity
   - `attributes`: JSON of the state attributes
   - `last_changed`: timestamp last time the state has changed. A state_changed event can happen when just attributes change.
   - `last_updated`: timestamp anything has changed (state, attributes)
   - `created`: timestamp this entry was inserted into the database

When the `history` integration queries the states table it only selects states
where the state has changed: `WHERE last_changed=last_updated`

#### On dates

SQLite databases do not support native dates. That's why all the dates are saved
in seconds since the UNIX epoch. Convert them manually using
[this site](https://www.epochconverter.com/) or in Python:

```python
from datetime import datetime

datetime.fromtimestamp(1422830502)
```

#### API

The history information is also available through the
[RESTful API](/developers/rest_api/#get-apihistory).
