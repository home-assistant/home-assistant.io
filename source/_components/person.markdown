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

1. If there are stationary sources (which type is not 'gps') presenting status 'home', than latest of this sources will be taken.
2. If there are sources of type 'gps', than latest of this sources will be taken.
3. Otherwise will be taken latest source with status 'not_home'.

Lets say for example, that you have 3 trackers: 'tracker_gps', 'tracker_router' and 'tracker_ble'.

1. You're at home, all 3 devices shows status 'home' - status of your Person entity will be 'home' with source 'tracker_router' or 'tracker_ble', whatever was latest.
2. You're going out. 'tracker_gps' shows status 'not_home', but other two trackers show status 'home' according to their setting 'consider_home'. You are still considered to be at home.
3. After some time both stationary trackers show status 'not_home'. Now your Person entity has status 'not_home' with source 'tracker_gps'.
4. While you are outside your home, your Home Assistant was suddenly restarted. Until 'tracker_gps' receives update, your status will be determined by stationary tracker, which gets latest update after restart. Obviously the status will be 'not_home'.
5. Than you're going into area marked as 'zone1', 'tracker_gps' is getting update, and now your status is 'zone1' with source 'tracker_gps'.
6. You've returned home, and your mobile device has connected to router, but GPS update yet didn't occur. Your status will be 'home' with source 'tracker_router'.
7. After GPS update occurs, your status still be 'home' with source 'tracker_router' or 'tracker_ble', whatever updates later.

TL;DR: When you're at home, your position is determined firstly by stationary trackers (if any) and then by GPS. When you're outside your home, your position is determined firstly by GPS and then by stationary trackers.

**Hint**: When you use multiple device trackers together, especially stationary and GPS trackers, it's advisable to set `consider_home`for stationary trackers as low as possible.


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
    description: The user id of the Home Assistant user account for the person. *`user_id` (aka `ID`) of users can be inspected in the "Users"/"Manage users" screen in the configuration panel.*
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
