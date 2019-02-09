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

The person component allows to connect device tracker entities to one or more person entities. The last state update of a connected device tracker will set the state of the person. Eg if you connect your router and your owntracks device as trackers to your person, the last state update from either the router or your owntracks device will set the state of your person.

## {% linkable_title Configuring the `person` component %}

To get started add the following lines to your `configuration.yaml`:

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
