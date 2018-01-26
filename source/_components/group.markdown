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

Groups allow the user to combine multiple entities into one. A group can be promoted to a **view** by setting `view: yes` under the group definition. This will make the group available as a new tab in the frontend.

Check the **Set State** <img src='/images/screenshots/developer-tool-states-icon.png' class='no-shadow' height='38' /> page from the **Developer Tools** and browse the **Current entities:** listing for all available entities.

By default, every group appears in the HOME tab. If you create a group `default_view` it will REPLACE the contents of the HOME tab so you can customize the HOME tab as you wish.

```yaml
# Example configuration.yaml entry
group:
  default_view:
    view: yes
    icon: mdi:home
    entities:
      - group.kitchen
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
  climate:
    name: Climate
    view: no
    entities:
      - sensor.bedroom_temp
      - sensor.porch_temp
  awesome_people:
    name: Awesome People
    view: no
    entities:
      - device_tracker.dad_smith
      - device_tracker.mom_smith
```

Configuration variables:

- **view** (*Optional*): If yes then the entry will be shown as a view (tab) at the top. Groups that are set to `view: yes` cannot be used as entities in other views.
- **name** (*Optional*): Name of the group.
- **icon** (*Optional*): If the group is a view, this icon will show at the top in the frontend instead of the name. If the group is a view and both name and icon have been specified, the icon will appear at the top of the frontend and the name will be displayed as the mouse-over text.  If it's not a view, then the icon shows when this group is used in another group.
- **control** (*Optional*): Set value to `hidden`. If hidden then the group switch will be hidden.
- **entities** (*Required*): array or comma delimited string, list of entities to group.

<p class='img'>
<img src='/images/blog/2016-01-release-12/views.png'>
Example of groups shown as views in the frontend.
</p>

If all entities in a group are switches or lights then Home Assistant adds a switch at the top of the card that turns them all on/off at once. If you want to hide this switch, set `control` to `hidden`.

You can create views (tabs) that contain other groups (but not other groups which are marked as `view: yes`).
Notice in the example below that in order to refer to the group "Living Room", you use `group.living_room` (lowercase and spaces replaced with underscores).

```yaml
# Example configuration.yaml entry that shows two groups, referred to in a view group (tab)
  Living Room:
    control: hidden
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

## {% linkable_title Default groups %}

Some components automatically create special groups containing component entities. These groups are named like `group.all_...`, for example:

- `group.all_switches`
- `group.all_lights`
- `group.all_devices`
- `group.all_scripts`
- `group.all_automations`

You can see list of these groups in  **State** <img src='/images/screenshots/developer-tool-states-icon.png' class='no-shadow' height='38' /> page of the **Developer Tools**.

Default groups appear in the HOME tab, if not overridden by user views and groups. Default groups are hidden by default, so you must [customize](/docs/configuration/customizing-devices/) them to be visible in your custom groups and views.

```yaml
# Example configuration.yaml to include default groups in custom view
customize:
  group.all_automations:
    hidden: false
  group.all_scripts:
    hidden: false
group:
  automation_view:
    name: Automation
    view: yes
    entities:
      - group.all_automations
      - group.all_scripts
```

## {% linkable_title Group features %}

The group exposes the `supported_features` attribute and supports all features that are supported by all grouped elements, e.g.

```yaml
group:
  # Group has features: Brightness, Light Temperature
  living_room_ceiling_light:
    entities:
       - light.light1 # Supports Brightness, Light Temperature, Colors
       - light.light2 # Supports Brightness, Light Temperature

# Set brightness for group through Google Home
group.living_room_ceiling_light:
  google_assistant: true
  google_assistant_type: light
```

## {% linkable_title Group behaviour %}

When any member of a group is `on` then the group will also be `on`. Similarly with a device tracker, when any member of the group is `home` then the group is `home`.

## {% linkable_title Customize group order %}
You can also order your groups using [customize](/docs/configuration/customizing-devices/) with `order: ` if they don't show up in the order you want them in.

```yaml
# Example configuration.yaml to order groups with order:
customize:
  group.all_automations:
    order: 1
  group.all_scripts:
    order: 2
group:
  automation_view:
    name: Automation
    view: yes
    entities:
      - group.all_automations
      - group.all_scripts
```
