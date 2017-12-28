---
layout: page
title: "History"
description: "Instructions how to enable history support for Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: History
ha_release: pre 0.7
---


The `history` component will track everything that is going on within Home Assistant and allows the user to browse through it. It depends on the `recorder` component for storing the data and uses the same database setting. If any entities are excluded from being recorded, no history will be available for these entities as well.

To enable the history option in your installation, add the following to your `configuration.yaml` file:

```yaml
# Basic configuration.yaml entry
history:
```

<p class='img'>
  <a href='{{site_root}}/images/screenshots/component_history_24h.png'>
    <img src='{{site_root}}/images/screenshots/component_history_24h.png' />
  </a>
</p>

<p class='note'>
Events are saved in a local database. Google Graphs is used to draw the graph. Drawing is happening 100% in your browser. No data is transferred to anyone at any time.
</p>


Configuration variables:

- **exclude** (*Optional*): Configure which components should **not** be displayed. 
  - **entities** (*Optional*): The list of entity ids to be excluded from the history.
  - **domains** (*Optional*): The list of domains to be excluded from the history.
- **include** (*Optional*): Configure which components should be displayed. 
  - **entities** (*Optional*): The list of entity ids to be included to the history.
  - **domains** (*Optional*): The list of domains to be included to the history.

Without any `include` or `exclude` configuration the history displays graphs for every entity (well that's not exactly true - for instance `hidden` entities or `scenes` are never shown) on a given date. If you are only interested in some of the entities you several options:

Define domains and entities to `exclude` (aka. blacklist). This is convenient when you are basically happy with the information displayed, but just want to remove some entities or domains. Usually these are entities/domains which do not change (like `weblink`) or rarely change (`updater` or `automation`).

```yaml
# Example configuration.yaml entry with exclude
history:
  exclude:
    domains:
      - automation
      - weblink
      - updater
    entities:
      - sensor.last_boot
      - sensor.date
```

Define domains and entities to display by using the `include` configuration (aka. whitelist). If you have a lot of entities in your system and your `exclude` lists possibly get very large, it might be better just to define the entities or domains to display.

```yaml
# Example configuration.yaml entry with include
history:
  include:
    domains:
      - sensor
      - switch
      - media_player
```

Use the `include` list to define the domains/entities to display, and exclude some of them with in the `exclude` list. This makes sense if you for instance include the `sensor` domain, but want to exclude some specific sensors. Instead of adding every sensor entity to the `include` `entities` list just include the `sensor` domain and exclude the sensor entities you are not interested in.  Note that the order of any `include` `entities` will be displayed as listed in the configuration, otherwise, the display order is arbitrary.

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

#### {% linkable_title Implementation details %}

The history is stored in a SQLite database `home-assistant_v2.db` within your configuration directory if the `recorder` component is not set up differently.

 - events table is all events except `time_changed` that happened while recorder component was running.
 - states table contains all the `new_state` values of `state_changed` events.
 - Inside the states table you have:
   - `entity_id`: the entity_id of the entity
   - `state`: the state of the entity
   - `attributes`: JSON of the state attributes
   - `last_changed`: timestamp last time the state has changed. A state_changed event can happen when just attributes change.
   - `last_updated`: timestamp anything has changed (state, attributes)
   - `created`: timestamp this entry was inserted into the database

When the `history` component queries the states table it only selects states where the state has changed: `WHERE last_changed=last_updated`

#### {% linkable_title On dates %} 

SQLite databases do not support native dates. That's why all the dates are saved in seconds since the UNIX epoch. Convert them manually using this site or in Python:

```python
from datetime import datetime
datetime.fromtimestamp(1422830502)
```

#### {% linkable_title API %}

The history information are also available through the [RESTful API](/developers/rest_api/#get-apihistory).
