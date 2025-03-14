---
title: Group
description: Instructions on how to setup groups within Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Cover
  - Event
  - Fan
  - Helper
  - Light
  - Lock
  - Media player
  - Notifications
  - Organization
  - Sensor
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
  - button
  - cover
  - event
  - fan
  - light
  - lock
  - media_player
  - notify
  - sensor
  - switch
ha_integration_type: helper
---

The group integration lets you combine multiple entities into a single entity. Entities that are members of a group can be controlled and monitored as a whole.

This can be useful, for example, in cases where you want to control multiple bulbs in a light fixture as a single light in Home Assistant. You also have the option of hiding the individual member entities in a group.

The following entities can be grouped:

- [binary sensor (binary sensors)](/integrations/binary_sensor/)
- [button (buttons)](/integrations/button/)
- [cover (covers)](/integrations/cover/)
- [fan (fans)](/integrations/fan/)
- [switch (switches)](/integrations/switch/)
- [lock (locks)](/integrations/lock/)
- [light (lights)](/integrations/light/)
- [event (events)](/integrations/event/)
- [media player (media players)](/integrations/media_player/)
- [notify (notifications)](/integrations/notify/)
- [sensor (sensors)](/integrations/sensor/)
- [number (numbers)](/integrations/number/)
- [input_number (input_numbers)](/integrations/input_number/)

{% include integrations/config_flow.md %}

{% note %}
Notification entities can only be grouped via the UI.
The older notification actions can only be grouped via YAML configuration.
{% endnote %}

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

### Button groups

The group state is the last time the grouped button was pressed.

- The group state is `unavailable` if all group members are `unavailable`.
- Otherwise, the group state is the last time the grouped button was pressed.

### Cover groups
In short, when any group member entity is `open`, the group will also be `open`. A complete overview of how cover groups behave:

- The group state is `unavailable` if all group members are `unavailable`.
- Otherwise, the group state is `unknown` if all group members are `unknown` or `unavailable`.
- Otherwise, the group state is `opening` if at least one group member is `opening`.
- Otherwise, the group state is `closing` if at least one group member is `closing`.
- Otherwise, the group state is `open` if at least one group member is `open`.
- Otherwise, the group state is `closed`.

### Event groups

- The group state is `unavailable` if all group members are `unavailable`.
- Otherwise, the group state is the last event received from any group member.

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
- Otherwise, the group state is `opening` if at least one group member is `opening`.
- Otherwise, the group state is `locking` if at least one group member is `locking`.
- Otherwise, the group state is `open` if at least one group member is `open`.
- Otherwise, the group state is `unlocking` if at least one group member is `unlocking`.
- Otherwise, the group state is `locked` if all group members are `locked`.
- Otherwise, the group state is `unlocked`.

### Notify entity groups

- The group state is `unavailable` if all group members are `unavailable`.
- Otherwise, the group state is the last notification sent to the group.

### Media player groups

- The group state is `unavailable` if all group members are `unavailable`.
- Otherwise, the group state is `unknown` if all group members are `unknown` or `unavailable`.
- Otherwise, the group state is `buffering` if all group members are `buffering`.
- Otherwise, the group state is `idle` if all group members are `idle`.
- Otherwise, the group state is `paused` if all group members are `paused`.
- Otherwise, the group state is `playing` if all group members are `playing`.
- Otherwise, the group state is `on` if at least one group member is not `off`, `unavailable` or `unknown`.
- Otherwise, the group state is `off`.

### Sensor, number, and input_number groups

- The group state is combined / calculated based on `type` selected to determine the minimum, maximum, latest (last), mean, median, range, product, standard deviation, or sum of the collected states.
- Members can be any `sensor`, `number` or `input_number` holding numeric states.
- The group state is `unavailable` if all group members are `unavailable`.
- If `ignore_non_numeric` is `false` then group state will be `unavailable` if one member is `unavailable` or does not have a numeric state.

## Managing groups

To edit a group, **{% my helpers title="Settings -> Devices & services -> Helpers" %}**. Find and select the group from the list.

![Group members](/images/integrations/group/Group_settings.png)

### Group options

To add or remove entities from an existing group, click on `Group options`, all the existing entities are listed in the `members` section where you add and remove entities.

![Group members](/images/integrations/group/Group_members.png)

### Group attributes

These are the attributes available for a group.

| Attribute                            | Data                                                                                                                            |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`                          | List of all the `entity_id`'s in the group.                                                                                     |

## YAML configuration

Alternatively, this integration can be configured and set up manually via YAML
instead. Here are example of how to configure groups when using the {% term "`configuration.yaml`" %} file.

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

Example YAML configuration of a button group:

```yaml
# Example configuration.yaml entry
button:
  - platform: group
    name: "Restart all ESPHome devices"
    device_class: opening
    entities:
      - button.device_1_restart
      - button.device_2_restart
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

Example YAML configuration of an event group:

```yaml
# Example configuration.yaml entry
event:
  - platform: group
    name: "Remote events"
    entities:
      - event.remote_button_1
      - event.remote_button_2
      - event.remote_button_3
      - event.remote_button_4
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

Example YAML configuration of a sensor group:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: group
    type: mean
    entities:
      - sensor.temperature_kitchen
      - sensor.temperature_hallway
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
  description: An ID that uniquely identifies this group. If two groups have the same unique ID, Home Assistant will raise an error. Giving the group a unique ID allows the group name, icon and area to be customized via the UI.
  required: false
  type: string
all:
  description: Only available for `binary_sensor`, `light` and `switch` groups. Set this to `true` if the group state should only turn *on* if **all** grouped entities are *on*.
  required: false
  type: boolean
  default: false
type:
  description: "Only available for `sensor` group. The type of sensor: `min`, `max`, `last`, `mean`, `median`, `range`, `product`, `stdev`, or `sum`."
  type: string
  required: true
ignore_non_numeric:
  description: Only available for `sensor` group. Set this to `true` if the group state should ignore sensors with non numeric values.
  type: boolean
  required: false
  default: false
unit_of_measurement:
  description: Only available for `sensor` group. Set the unit of measurement for the sensor.
  type: string
  required: false
device_class:
  description: Only available for `sensor` group. Set the device class for the sensor according to [available options](/integrations/sensor/#device-class).
  type: string
  required: false
state_class:
  description: Only available for `sensor` group. Set the state class for the sensor according to [available options](https://developers.home-assistant.io/docs/core/entity/sensor/#available-state-classes).
  type: string
  required: false
{% endconfiguration %}

## Notify groups

This group is a special case of groups currently only available via YAML configuration.

Notify groups are used to combine multiple notification actions into a single action. This allows you to send notification to multiple devices by performing a single action.

```yaml
# Example configuration.yaml entry
notify:
  - platform: group
    name: "My notification group"
    services:
      - action: html5
        data:
          target: "macbook"
      - action: html5_nexus
```

{% configuration %}
name:
  description: Setting the parameter `name` sets the name of the group.
  required: true
  type: string
services:
  description: A list of all the actions to be included in the group.
  required: true
  type: list
  keys:
    action:
      description: The name part of an entity ID, e.g.,  if you use `notify.html5` normally, just put `html5`. Note that you must put everything in lower case here. Although you might have capitals written in the actual notification actions!
      required: true
      type: string
    data:
      description: A dictionary containing parameters to add to all notify payloads. This can be anything that is valid to use in a payload, such as `data`, `message`, `target` or `title`. Parameters specified by the action will override the values configured here.
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

- `alert`
- `alarm_control_panel`
- `automation`
- `binary_sensor`
- `calendar`
- `climate`
- `cover`
- `device_tracker`
- `fan`
- `humidifier`
- `input_boolean`
- `light`
- `lock`
- `media_player`
- `person`
- `plant`
- `remote`
- `script`
- `switch`
- `vacuum`
- `water_heater`

{% note %}
Platform domains other than these are not supported to be used with old style groups, nor will other domains be supported in the future.
{% endnote %}

When member entities all have a single `on` and `off` state, the group state will be calculated as follows:

| Domain         | on       | off      |
| -------------- | -------- | -------- |
| device_tracker | home     | not_home |
| cover          | open     | closed   |
| lock           | unlocked | locked   |
| person         | home     | not_home |
| media_player   | ok       | problem  |

When a group contains entities from domains that have multiple `on` states or only use `on` and `off`, the group state will be `on` or `off`.

It is possible to create a group that the system cannot calculate a group state. Groups with entities from unsupported domains will always have an unknown state.

These groups can still be in templates with the `expand()` directive, called using the `homeassistant.turn_on` and `homeassistant.turn_off` actions, etc.

### Attributes

These are the attributes available for an old-style group.

| Attribute                            | Data                                                                                                         |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `entity_id`                          | List of all the `entity_id`'s in the group.                                                                  |
| `order`                              | Integer representing the order in which the entity was created, starting with `0`.                           |
| `auto`                               | Boolean that will always be set to `true`. Only appears in groups that were created with the `set` action.   |

### Actions

This integration provides the following actions to modify groups and a action to reload the configuration without restarting Home Assistant itself.

| Action   | Data              | Description                                                                   |
| -------- | ----------------- | ----------------------------------------------------------------------------- |
| `set`    | `Object ID`       | Group id and part of entity id.                                               |
|          | `Name`            | Name of the group.                                                            |
|          | `Icon`            | Name of the icon for the group.                                               |
|          | `Entities`        | List of all members in the group. Not compatible with **delta**.              |
|          | `Add Entities`    | List of members that will change on group listening.                          |
|          | `Remove Entities` | List of members that will be removed from group listening.                    |
|          | `All`             | Enable this option if the group should only turn on when all entities are on. |
| `remove` | `Object ID`       | Group id and part of entity id.                                               |
| `reload` | `Object ID`       | Group id and part of entity id.                                               |
