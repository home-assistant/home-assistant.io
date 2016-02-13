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

```yaml
# Example configuration.yaml entry
group:
  # If you name an entry default_view it will REPLACE the contents of the "Home" tab
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

- **name** (*Optional*): Name of the group.
- **icon** (*Optional*): An optional icon to show in the Frontend.
- **view** (*Optional*): If yes then the entry will be shown as a view.
- **entities** array or comma delimited string (*Required*): List of entites to group.

<p class='img'>
<img src='/images/blog/2016-01-release-12/views.png'>
Example of groups shown as views in the frontend.
</p>

If all entities are switches or lights they can be controlled as one with a switch at the top of the card. Grouped states should share the same type of states (ON/OFF or HOME/NOT_HOME).

```yaml
# Example configuration.yaml entry
group:
  living_room:
    - light.bowl
    - light.ceiling
    - light.tv_back_light
  children: device_tracker.child_1, device_tracker.child_2
```
