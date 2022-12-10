---
title: Group
description: Instructions on how to setup groups within Home Assistant.
ha_category:
  - Binary Sensor
  - Cover
  - Fan
  - Helper
  - Light
  - Lock
  - Media Player
  - Notifications
  - Organization
  - Switch
ha_release: pre 0.7
ha_iot_class: Calculated
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: group
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - cover
  - fan
  - light
  - lock
  - media_player
  - notify
  - switch
ha_integration_type: helper
---

The group integration lets you combine multiple entities into a single entity. Entities that are members of a group can be controlled and monitored as a whole.

This can be useful for cases where you want to control, for example, the
multiple bulbs in a light fixture as a single light in Home Assistant.

Home Assistant can group multiple binary sensors, covers, fans, lights, locks, media players, switches as a single entity, with the option of hiding the individual member entities.

{% include integrations/config_flow.md %}

## Group behavior

### Binary sensor, light, and switch groups

In short, when any group member entity is `on`, the group will also be `on`. A complete overview of how groups behave:

- The group state is `unavailable` if all group members are `unavailable`.
- Otherwise, the group state is `unknown` if all group members are `unknown` or `unavailable`.
- Otherwise, the group state is `on` if at least one group member is `on`.
- Otherwise, the group state is `off`.

Binary sensor, light, and switch groups allow you set the "All entities" option. When enabled, the group behavior is inverted, and all members of the group have to be `on` for the group to turn `on` as well. A complete overview of how groups behave when the "All entities" option is enabled:

- The group state is `unavailable` if all group members are `unavailable`.
- Otherwise, the group state is `unknown` if at least one group member is `unknown` or `unavailable`.
- Otherwise, the group state is `off` if at least one group member is `off`.
- Otherwise, the group state is `on`.

### Cover groups
In short, when any group member entity is `open`, the group will also be `open`. A complete overview of how cover groups behave:

- The group state is `unavailable` if all group members are `unavailable`.
- Otherwise, the group state is `unknown` if all group members are `unknown` or `unavailable`.
- Otherwise, the group state is `opening` if at least one group member is `opening`.
- Otherwise, the group state is `closing` if at least one group member is `closing`.
- Otherwise, the group state is `open` if at least one group member is `open`.
- Otherwise, the group state is `closed`.

### Fan groups
In short, when any group member entity is `on`, the group will also be `on`. A complete overview of how fan groups behave:

- The group state is `unavailable` if all group members are `unavailable`.
- Otherwise, the group state is `unknown` if all group members are `unknown` or `unavailable`.
- Otherwise, The group state is `on` if at least one group member is `on`.
- Otherwise, the group state is `off`.

### Lock groups
In short, when any group member entity is `unlocked`, the group will also be `unlocked`. A complete overview of how lock groups behave:

- The group state is `unavailable` if all group members are `unavailable`.
- Otherwise, the group state is `unknown` if all group members are `unknown` or `unavailable`.
- Otherwise, the group state is `jammed` if at least one group member is `jammed`.
- Otherwise, the group state is `locking` if at least one group member is `locking`.
- Otherwise, the group state is `unlocking` if at least one group member is `unlocking`.
- Otherwise, the group state is `unlocked` if at least one group member is `unlocked`.
- Otherwise, the group state is `locked`.

### Media player groups

- The group state is `unavailable` if all group members are `unavailable`.
- Otherwise, the group state is `unknown` if all group members are `unknown` or `unavailable`.
- Otherwise, the group state is `buffering` if all group members are `buffering`.
- Otherwise, the group state is `idle` if all group members are `idle`.
- Otherwise, the group state is `paused` if all group members are `paused`.
- Otherwise, the group state is `playing` if all group members are `playing`.
- Otherwise, the group state is `on` if at least one group member is not `off`, `unavailable` or `unknown`.
- Otherwise, the group state is `off`.

## Managing groups

To edit a group, **{% my helpers title="Settings -> Devices & Services -> Helpers" %}**. Find and select the group from the list.

![Group members](/images/integrations/group/Group_settings.png)

### Group options

To add or remove entities from an existing group, click on `Group options`, all the existing entities are listed in the `members` section where you add and remove entities.

![Group members](/images/integrations/group/Group_members.png)

## YAML Configuration

Alternatively, this integration can be configured and set up manually via YAML
instead. Here are example of how to configure groups when using the `configuration.yaml` file.

Example YAML configuration of a binary sensor group:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: group
    name: "Patio Doors"
    device_class: opening
    entities:
      - binary_sensor.door_left_contact
      - binary_sensor.door_right_contact
```

Example YAML configuration of a cover group:

```yaml
# Example configuration.yaml entry
cover:
  - platform: group
    name: "Window Covers"
    entities:
      - cover.hall_window
      - cover.living_room_window
```

Example YAML configuration of a fan group:

```yaml
# Example configuration.yaml entry
fan:
  - platform: group
    name: "Downstairs Fans"
    entities:
      - fan.lanai_west
      - fan.lanai_south
      - fan.lanai_east
```

Example YAML configuration of a light group:

```yaml
# Example configuration.yaml entry
light:
  - platform: group
    name: "Kitchen Lights"
    entities:
      - light.kitchen_ceiling_lights
      - light.kitchen_under_cabinet_lights
      - light.kitchen_spot_lights
      - light.pendant_lights
```

Example YAML configuration of a lock group:

```yaml
# Example configuration.yaml entry
lock:
  - platform: group
    name: "House Locks"
    entities:
      - lock.front_door
      - lock.back_door
```

Example YAML configuration of a media_player group:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: group
    entities:
      - media_player.kitchen_tv
      - media_player.living_room_tv
```

Example YAML configuration of a switch group:

```yaml
# Example configuration.yaml entry
switch:
  - platform: group
    entities:
      - switch.tv
      - switch.soundbar
```

{% configuration %}
entities:
  description: A list of entities to be included in the group.
  required: true
  type: [string, list]
name:
  description: The name of the group.
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this group. If two groups have the same unique ID, Home Assistant will raise an error. Giving an group a unique ID allow the group name, icon and area to be customized via the UI.
  required: false
  type: string
all:
  description: Only available for `binary_sensor`, `light` and `switch` groups. Set this to `true` if the group state should only turn *on* if **all** grouped entities are *on*.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

## Notify Groups

This group is a special case of groups currently only available via YAML configuration.

Notify groups are used to combine multiple notification services into a single service. This allows you to send notification to multiple devices with a single call.

```yaml
# Example configuration.yaml entry
notify:
  - platform: group
    name: "My notification group"
    services:
      - service: html5
        data:
          target: "macbook"
      - service: html5_nexus
```

{% configuration %}
name:
  description: Setting the parameter `name` sets the name of the group.
  required: true
  type: string
services:
  description: A list of all the services to be included in the group.
  required: true
  type: list
  keys:
    service:
      description: The service part of an entity ID, e.g.,  if you use `notify.html5` normally, just put `html5`. Note that you must put everything in lower case here. Although you might have capitals written in the actual notification services!
      required: true
      type: string
    data:
      description: A dictionary containing parameters to add to all notify payloads. This can be anything that is valid to use in a payload, such as `data`, `message`, `target` or `title`.
      required: false
      type: string
{% endconfiguration %}

## Old style groups

This group is a special case of groups only available via YAML configuration.

**We don't recommend using these old-style groups anymore.** They are still supported, but we recommend using the groups as described above.

Back in the day, Home Assistant used groups to visually groups entities in the Home Assistant UI; it was the only way to tell which entities would show up in a single card on your Dashboard. This is no longer the case, as we now have fantastic UI editors and Dashboarding.

However, the old-style groups are still there in the roots of Home Assistant.
On the one hand, they are more versatile (they can use more entity types right now); but on the other hand, they are also more limited and complicated to use.

The limited use is that these old-style groups are written to be universal, while the new style groups described above are designed to be a full replacement of their members (e.g., a light group, as described above, has all light features). Besides being only available via manual YAML configuration, they also have limited UI support in terms of customizing.

Example old-style groups YAML configuration:

```yaml
# Example configuration.yaml entry
group:
  kitchen:
    name: "Kitchen Group"
    entities:
      - switch.kitchen_pin_3
  climate:
    name: "Climate Group"
    entities:
      - sensor.bedroom_temp
      - sensor.porch_temp
  awesome_people:
    name: "Awesome People"
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
  description: A list of entities to group.
  required: true
  type: list
all:
  description: Set this to `true` if the group state should only turn *on* if **all** grouped entities are *on*.
  required: false
  type: boolean
  default: false
icon:
  description: The icon that shows in the front end.
  required: false
  type: string
{% endconfiguration %}

Old style groups can calculate group state with entities from the following domains:

- `alarm_control_panel`
- `binary_sensor`
- `climate`
- `cover`
- `device_tracker`
- `fan`
- `humidifier`
- `light`
- `lock`
- `media_player`
- `person`
- `plant`
- `remote`
- `switch`
- `vacuum`
- `water_heater`

When member entities all have a single `on` and `off` state, the group state will be calculated as follows:

| Domain            | on       | off      |
|-------------------|----------|----------|
| device_tracker    | home     | not_home |
| cover             | open     | closed   |
| lock              | unlocked | locked   |
| person            | home     | not_home |
| media_player      | ok       | problem  |

When a group contains entities from domains that have multiple `on` states or only use `on` and `off`, the group state will be `on` or `off`.

It is possible to create a group that the system cannot calculate a group state. Groups with entities from unsupported domains will always have an unknown state.

These groups can still be in templates with the `expand()` directive, called using the `homeassistant.turn_on` and `homeassistant.turn_off` services, etc.

### Services

This integration provides the following services to modify groups and a service to reload the configuration without restarting Home Assistant itself.

| Service | Data | Description |
| ------- | ---- | ----------- |
| `set` | `Object ID` | Group id and part of entity id. 
| | `Name` | Name of the group.
| | `Icon` | Name of the icon for the group.
| | `Entities` | List of all members in the group. Not compatible with **delta**.
| | `Add Entities` | List of members that will change on group listening.
| | `All` | Enable this option if the group should only turn on when all entities are on.
| `remove` | `Object ID` | Group id and part of entity id.
| `reload` | `Object ID` | Group id and part of entity id.
