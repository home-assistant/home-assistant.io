---
layout: page
title: "Person"
description: "Instructions on how to setup people tracking within Home Assistant."
date: 2019-02-05 22:36
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Presence Detection
ha_qa_scale: internal
ha_release: 0.88
---

The person component allows to connect device tracker entities to one or more person entities. The state updates of a connected device trackers will set the state of the person. When multiple device tracers used, the state of berson will be determined next way:

1. If there are sources presenting status 'home', than latest of this sources will be taken.
2. If there are sources of type 'gps', than latest of this sources will be taken.
3. Otherwise will be taken latest source with status 'not_home'.

You can manage persons via the UI from the person page inside the configuration panel or via `YAML`.

## {% linkable_title Configuring the `person` component via the Home Assistant configuration panel %}

If you prefer to use the configuration panel to configure the `person` component simply add one line to your `configuration.yaml` file and restart Home Assistant.

```yaml
person:
```

## {% linkable_title Configuring the `person` component via YAML %}

If you prefer YAML, you can also configure your persons via `configuration.yaml`:

```yaml
# Example configuration.yaml entry
person:
  - name: Ada
    id: ada6789
    device_trackers:
      - device_tracker.ada
```

{% configuration %}
  id:
    description: A unique id of the person.
    required: true
    type: string
  name:
    description: The name of the person.
    required: true
    type: string
  user_id:
    description: The user id of the Home Assistant user account for the person.
    required: false
    type: string
  device_trackers:
    description: A list of device tracker entity ids to track. These will represent the state of the person.
    required: false
    type: list, string
{% endconfiguration %}


An extended example would look like the following sample:

```yaml
# Example configuration.yaml entry
person:
  - name: Ada
    id: ada6789
    device_trackers:
      - device_tracker.ada
  - name: Stacey
    id: stacey12345
    user_id: 12345678912345678912345678912345
    device_trackers:
      - device_tracker.stacey
      - device_tracker.beacon
```
