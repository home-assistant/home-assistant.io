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

Starting with version 0.63, Home Assistant keeps a registry of known entities.
The entity registry makes sure that entities get unique identifiers and allow
customizing the identifiers and names of these entities.

Changes require that Home Assistant is shut down when you edit the file, otherwise
Home Assistant may over-write your changes, and a restart of Home Assistant is
required for your changes to take effect. Version 0.75 introduced a configuration
user interface.

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
 - Changing the _first line_ of each entry will change the `entity_id` of the entity throughout Home Assistant.

 - The value of `name` will override the _friendly name_ of the entity as given by the integration.

   _Added in Home Assistant 0.64._
 - The key `disabled_by` can either be `hass` or `user`. This functionality
   is even more experimental than the whole entity registry itself and might
   cause integrations to fail and might be removed in the future.

   _Added in Home Assistant 0.64._
   
{% linkable_title Supported Components %}
   
Only components that provide a unique ID for entities will are supported.

Note that for Weather Underground, second and subsequent Personal Weather Station ID (pws_id) will have their monitored conditions suffixed with an index number. 
