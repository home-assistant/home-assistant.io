---
title: "Group"
description: "Instructions on how to setup groups within Home Assistant."
logo: home-assistant.png
ha_category:
  - Organization
ha_qa_scale: internal
ha_release: pre 0.7
---

Groups allow the user to combine multiple entities into one. 

Check the **States** <img src='/images/screenshots/developer-tool-states-icon.png' class='no-shadow' height='38' /> page from the **Developer Tools** and browse the **Current entities:** listing for all available entities.

```yaml
# Example configuration.yaml entry
group:
  name: Kitchen
  entities:
    - switch.kitchen_pin_3
  name: Climate
  entities:
    - sensor.bedroom_temp
    - sensor.porch_temp
  name: Awesome People
  entities:
    - device_tracker.dad_smith
    - device_tracker.mom_smith
```

{% configuration %}
name:
  description: Name of the group.
  required: false
  type: string
entities:
  description: Array or comma delimited string, list of entities to group.
  required: true
  type: list
all:
  description: Set this to `true` if the group state should only turn *on* if **all** grouped entities are *on*.
  required: false
  type: boolean
  default: false
icon:
  description: The icon that shows in the front end. **The rest of this only applies to the deprecated UI `/states`**. If the group is a view, this icon will show at the top in the frontend instead of the name. If the group is a view and both name and icon have been specified, the icon will appear at the top of the frontend and the name will be displayed as the mouse-over text. 
  required: false
  type: string
view:
  description: "**Only applies to the deprecated UI `/states`**. If yes then the entry will be shown as a view (tab) at the top. Groups that are set to `view: true` cannot be used as entities in other views. *Does not apply to Lovelace.*"
  required: false
  type: boolean
  default: false
control:
  description: "**This is only a feature in generated mode of Lovelace** If value set to `hidden` the group switch will be hidden."
  required: false
  type: string
{% endconfiguration %}

## Default groups

Some integrations automatically create special groups containing integration entities. These groups are named like `group.all_...`, for example:

- `group.all_switches`
- `group.all_lights`
- `group.all_devices`
- `group.all_scripts`
- `group.all_automations`

You can see list of these groups in  **States** <img src='/images/screenshots/developer-tool-states-icon.png' class='no-shadow' height='38' /> page of the **Developer Tools**.

## Group behavior

By default when any member of a group is `on` then the group will also be `on`. Similarly with a device tracker, when any member of the group is `home` then the group is `home`. If you set the `all` option to `true` though, this behavior is inverted and all members of the group have to be `on` for the group to turn on as well.

---

## Old user interface

This section only applies if you've not moved off the deprecated `/states` user interface.

A group can be promoted to a **view** by setting `view: true` under the group definition. This will make the group available as a new tab in the frontend.

By default, every group appears in the HOME tab. If you create a group `default_view` it will REPLACE the contents of the HOME tab so you can customize the HOME tab as you wish.

```yaml
# Example configuration.yaml entry
group:
  default_view:
    view: true
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
    view: true
    entities:
      - input_boolean.notify_home
      - camera.demo_camera
      - device_tracker.demo_paulus
      - group.garden
  climate:
    name: Climate
    view: false
    entities:
      - sensor.bedroom_temp
      - sensor.porch_temp
  awesome_people:
    name: Awesome People
    view: false
    entities:
      - device_tracker.dad_smith
      - device_tracker.mom_smith
```

<p class='img'>
<img src='/images/blog/2016-01-release-12/views.png'>
Example of groups shown as views in the frontend.
</p>

If all entities in a group are switches or lights then Home Assistant adds a switch at the top of the card that turns them all on/off at once. If you want to hide this switch, set `control` to `hidden`.

You can create views (tabs) that contain other groups (but not other groups which are marked as `view: true`).
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
    view: true
    name: Rooms
    entities:
      - group.living_room
      - group.bedroom
```

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
    view: true
    entities:
      - group.all_automations
      - group.all_scripts
```

## Customize group order
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
    view: true
    entities:
      - group.all_automations
      - group.all_scripts
```
