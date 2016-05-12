---
layout: page
title: "Group"
description: "Instructions how to setup groups within Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Organization
---

Groups allow the user to combine multiple entities into one. A group can be promoted to a **view** by setting the `view` option to `yes`. This will make the group available as a new tab in the frontend.

Check the **Set State** page from the **Developer Tools** and browse the **Current entities:** listing for all available entities.

By default, every group appears in the HOME tab. If you name a group `default_view` it will REPLACE the contents of the HOME tab so you can customize it as you wish.

```yaml
# Example configuration.yaml entry
group:
  default_view:
    view: yes
    entities:
      - group.awesome_people
      - group.climate

  kitchen:
    name: Kitchen
    entities:
      - switch.kitchen_pin_3
  upstairs:
    name: Kids
    icon: mdi:account-multiple
    view: yes
    entities:
      - input_boolean.notify_home
      - camera.demo_camera
      - device_tracker.demo_paulus
      - group.garden
```

Configuration variables:

- **view** (*Optional*): If yes then the entry will be shown as a view (tab).
- **name** (*Optional*): Name of the group.
- **icon** (*Optional*): If the group is a view, this icon will show at the top in the frontend instead of the name. If it's not a view, then the icon shows when this group is used in another group.
- **entities** (*Required*): array or comma delimited string, list of entities to group.

<p class='img'>
<img src='/images/blog/2016-01-release-12/views.png'>
Example of groups shown as views in the frontend.
</p>

If all entities in a group are switches or lights then Home Assistant adds a switch at the top of the card that turns them all on/off at once.

You can create views (tabs) that contain other groups.  
Notice in the example below that in order to refer to the group "Living Room", you use `group.living_room` (lowercase and spaces replaced with underscores).

```yaml
# Example configuration.yaml entry that shows two groups, referred to in a view group (tab)
  Living Room:
    entities:
      - light.light_family_1
      - binary_sensor.motion_living
  Bedroom: light.light_bedroom, switch.sleeping
  Rooms:                                                                                                                                                       
    view: yes                                                                                                                                                  
    name: Rooms
    entities:                                                                                                                                                  
      - group.living_room                                                                                                                                      
      - group.bedroom                                                                                                                                          
``` 