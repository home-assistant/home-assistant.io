---
layout: page
title: "History support"
description: "Instructions how to enable history support for Home Assistant."
date: 2015-03-23 19:59
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/x-office-presentation.png' class='brand pull-right' />
This component will track everything that is going on within Home Assistant and allows the user to browse through it.

To enable the history option in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
history:
```

<p class='img'>
  <a href='{{site_root}}/images/screenshots/component_history_24h.png'>
    <img src='{{site_root}}/images/screenshots/component_history_24h.png' />
  </a>
</p>

<p class='note'>
Events are saved in a local database. Google Graphs is used to draw the graph. Drawing is happening 100% in your browser - no data is transferred to anyone at any time.
</p>

### Implementation details

The history is stored in a SQLite databse `home-assistant.db` within your config directory.

 - events table is all events except time_changed that happened while recorder component was running.
 - states table contains all the new_state values of state_changed events.
 - Inside the states table you have:
   - entity_id: the entity_id of the entity
   - state: the state of the entity
   - attributes: JSON of the state attributes
   - last_changed: timestamp last time the state has changed. A state_changed event can happen when just attributes change.
   - last_updated: timestamp anything has changed (state, attributes)
   - created: timestamp this entry was inserted into the database

When the history component queries the states table it only selects states where the state has changed: `WHERE last_changed=last_updated`

#### On dates

SQLite databases do not support native dates. That's why all the dates are saved in seconds since the UNIX epoch. Convert them manually using this site or in Python:

```python
from datetime import datetime
datetime.fromtimestamp(1422830502)
```
