---
layout: page
title: "CSV History"
description: "Instructions on how to store events in CSV files."
date: 2018-10-09 21:13
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: History
ha_release: 0.80
---

The `csv` component lets you store all state changes inside CSV files. 

To use this component in your installation, add the following to your `configuration.yaml` file:

## {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
csv:
  data_dir: '/home/homeassistant/data_dir'
  separator: ','
  gzip: True
  purge_keep_days: 365
  include:
    entities:
      - entity_to_include
    domains:
      - domain_to_include
  exclude:
    entities:
      - entitiy_to_exclude
    domains:
      - domain_to_exclude
```

{% configuration %}
data_dir:
  description: An existing directory where the CSV files are stored.
  required: true
  type: string
separator:
  description: The separator between the values inside the CSV file. Default value is ','.
  required: false
  type: string
gzip:
  description: If set to `True`, old files are compressed using gzip. Default value is `True`.
  required: false
  type: boolean
purge_keep_days:
  description: Sets the number of old files to keep. Older files are removed. Default value is 10.
  required: false
  type: integer
include:
  description: Configure which components should be included in recordings. If set, all other entities will not be recorded. Values set by the **exclude** option will prevail.
  required: false
  type: map
  keys:
    entities:
      description: List of entities to include.
      required: false
      type: list
    domains:
      description: List of domains to include.
      required: false
      type: list
exclude:
  description: Configure which components should be excluded from recordings.
  required: false
  type: map
  keys:
    entities:
      description: List of entities to exclude.
      required: false
      type: list
    domains:
      description: List of domains to exclude.
      required: false
      type: list
{% endconfiguration %}

### {% linkable_title Usage %}

`csv` is a history platform and can be used to store events inside CSV files. The component creates one CSV file with the file name pattern `events_<%Y-%m-%d>.csv` for each day.

The component stores the following values inside the CSV file:

- `entity-id`: The ID of the entity which state did change.
- `timestamp`: The timestamp of the event (`time_fired`).
- `origin`: The origin of the event
- `new_state`: The new state of the event
