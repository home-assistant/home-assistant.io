---
layout: page
title: "Entity Registry"
description: "The entity registry contains."
date: 2016-04-20 06:00
sidebar: true
comments: false
sharing: true
footer: true
---

<p class='note'>
This is a new and experimental feature of Home Assistant.
</p>

Starting with version 0.63, Home Assistant keeps a registry of known entities.
The entity registry makes sure that entities get unique identifiers and allow
customizing the identifiers and names of these entities.

As this is still a very new part of Home Assistant, changes will require a
restart of Home Assistant to take effect. A config user interface will be added
in a future version.

<p class='note'>
An entity needs to have a unique ID to be registered in the entity registry.
Not all integrations currently provide a unique id for their entities.
</p>

The entity registry is stored in `<config>/entity_registry.yaml`. As a user,
you are unable to add entries, only update them. Here is an example file:

```
climate.downstairs_virtual:
  platform: nest
  unique_id: EPoMyWkpNyoYu3pGlmGxabcdefghijkl
  name: Downstairs thermostat
light.study_ceiling:
  platform: hue
  unique_id: f0:fe:6b:00:14:00:00:00-00
  disabled_by: user
```

As a user, you can change the `entity_id` and add the `name` and `disabled_by`
value to each entry.

 - The value of `name` will override the name of the entity as given by the
   integration.

   _Added in Home Assistant 0.64._
 - The key `disabled_by` can either be `hass` or `user`. This functionality
   is even more experimental than the whole entity registry itself and might
   cause integrations to fail and might be removed in the future.

   _Added in Home Assistant 0.64._
