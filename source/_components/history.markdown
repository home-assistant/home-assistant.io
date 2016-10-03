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
ha_category: "History"
ha_release: pre 0.7
---


The `history` component will track everything that is going on within Home Assistant and allows the user to browse through it.

To enable the history option in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry without any filters
history:

# Example configuration.yaml entry with exclude
history:
  exclude:
    domains:
      - automation
      - sun
      - weblink
      - group
      - updater
    entities:
      - sensor.last_boot
      - sensor.date

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
- **include** (*Optional*): Configure which components should be displayed. 
- **entities** (*Optional*): The list of entity ids to be included/excluded from the history.
- **domains** (*Optional*): The list of domains to be included/excluded from the history.

Without any `include` or `exclude` configuration the history displays graphs for every entity (well that's not exactly true - for instance `hidden` entities or `scenes` are never shown) on a given date. If you are only interested in some of the entities you several options:

- define domains and entities to `exclude` (aka. blacklist) 
- define domains and entities to display by using the `include` configuration (aka. whitelist).
- use the `include` list to define the domains/entities to display, and exclude some of them with in the `exclude` list. This makes sense if you for instance include the sensor domain, but want to exclude some specific sensor like in the example above. 


#### {% linkable_title Implementation details %}

The history is stored in a SQLite database `home-assistant.db` within your config directory.

 - events table is all events except `time_changed` that happened while recorder component was running.
 - states table contains all the `new_state` values of `state_changed` events.
 - Inside the states table you have:
   - `entity_id`: the entity_id of the entity
   - `state`: the state of the entity
   - `attributes`: JSON of the state attributes
   - `last_changed`: timestamp last time the state has changed. A state_changed event can happen when just attributes change.
   - `last_updated`: timestamp anything has changed (state, attributes)
   - `created`: timestamp this entry was inserted into the database

When the history component queries the states table it only selects states where the state has changed: `WHERE last_changed=last_updated`

#### {% linkable_title On dates %} 

SQLite databases do not support native dates. That's why all the dates are saved in seconds since the UNIX epoch. Convert them manually using this site or in Python:

```python
from datetime import datetime
datetime.fromtimestamp(1422830502)
```

#### {% linkable_title API %}

The history information are also available through the [RESTful API](/developers/rest_api/#get-apihistory).
