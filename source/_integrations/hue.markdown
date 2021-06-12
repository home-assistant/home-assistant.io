---
title: Philips Hue
description: Instructions on setting up Philips Hue within Home Assistant.
ha_category:
  - Hub
  - Light
ha_iot_class: Local Push
featured: true
ha_release: '0.60'
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - '@balloob'
  - '@frenck'
ha_domain: hue
ha_ssdp: true
ha_homekit: true
ha_platforms:
  - binary_sensor
  - light
  - sensor
---

The Philips Hue integration allows you to control and monitor the lights and motion sensors connected to your Hue bridge.

There is currently support for the following device types within Home Assistant:

- Lights
- Motion sensors (including temperature and light level sensors)
- Hue switches (as device triggers for automations and also exposed as battery sensors when they are battery-powered)
  - Hue Dimmer Switch
  - Hue Tap Switch
  - Hue Smart Button
  - Friends of Hue Switch

{% include integrations/config_flow.md %}

## Options

Options for the Hue integration can be set going to **Configuration** -> **Integrations** -> **Hue** -> **Options**.

{% configuration_basic %}
Allow Hue groups:
  description: "Enabling this option, will create entities for each Hue group, so you can control your Hue light groups from Home Assistant."
Allow unreachable bulbs to report their state correctly:
  description: "If a light is unavailable, it will show up as unavailable in Home Assistant as well. Enabling this option, will not mark the light unavailable, but instead show the last state known to the Hue bridge."
{% endconfiguration_basic %}

## Using Hue Scenes

The Hue platform has its own concept of scenes for setting the colors of a group of lights simultaneously. A Hue bridge could potentially have dozens of scenes stored on it, and many scenes across different rooms might share the same name (the default scenes, for example). To avoid user interface overload, we don't expose scenes directly. Instead there is a `hue.hue_activate_scene` service which can be used in an automation or script. This will have all the bulbs transitioned at once, instead of one at a time like when using standard scenes in Home Assistant.

For instance:

```yaml
service: hue.hue_activate_scene
data:
  group_name: "Porch"
  scene_name: "Porch Orange"
```

| Service data attribute | Optional | Description                                                           |
| ---------------------- | -------- | --------------------------------------------------------------------- |
| `group_name`           | no       | The group/room name of the lights. Find this in the official Hue app. |
| `scene_name`           | no       | The name of the scene. Find this in the official Hue app.             |
| 'transition'           | yes      | The time in 100s of milliseconds to transition to the scene. For example, a value of 4 means 400 milliseconds.          |

_Note_: `group_name` is not a reference to a Home Assistant group name. It can only be the name of a group/room in the Hue app.

### Finding Group and Scene Names

The easiest way to find Hue scene names is to only use the scenes from the 2nd generation Hue app, which are organized by room (group) and scene name. Use the room name and scene name that you see in the app. You can test that these work at Developer Tools > Services in your Home Assistant instance.

Alternatively, a more advanced method can be used to dump all rooms and scene names using this [gist](https://gist.github.com/sdague/5479b632e0fce931951c0636c39a9578). This does **not** tell you which groups and scenes work together, but it is sufficient to get values that you can test at Developer Tools > Services.

### Caveats

The Hue API doesn't activate scenes directly; rather, they must be associated with a Hue group (typically rooms). But Hue scenes don't actually reference their group, so heuristic matching is used.

Neither group names nor scene names are guaranteed unique in Hue. If you are observing unexpected behavior from calling Hue scenes in Home Assistant, make the names of your Hue scenes more specific in the Hue app.

The Hue hub has limited space for scenes and will delete scenes if new ones get created that would overflow that space. The API documentation says this is based on the scenes that are "least recently used."

## Using Switches in Automations

This integration will detect button presses from the various switch accessories in Hue for use in automations. In the example below, when the off button on the `living_room_switch` dimmer is pressed briefly, the `living_room_tv` media player will also be switched off.

```yaml
alias: TV - Turn off when light switch "off" is pressed
trigger:
  - platform: event
    event_type: hue_event
    event_data:
      id: living_room_switch
      event: 4002 # switch off, short press
condition:
  condition: state
  entity_id: media_player.living_room_tv
  state: 'on'
action:
  - service: media_player.turn_off
    data:
      entity_id: media_player.living_room_tv
```

<div class="note">
Holding the button produces a different event code so will not trigger the above automation.
</div>

The simplest way to determine the correct event data for a trigger is to use the "Events" developer tool. In the "Listen to events" section, enter `hue_event` and click "Start Listening" then perform the action you want to use as the trigger. The event may take a few seconds to appear in the interface. In particular, you will need to `id` and `event`.

To help in determining the triggers available for your device, see the table below. All events listed are triggered when a button is released. Other events may also be available.

| Device Type           | Action            | Short Press Event | Long Press Event |
| --------------------- | ----------------- | ----------------- | ---------------- |
| Hue Dimmer Switch     | On                | `1002`            | `1003`           |
|                       | Up                | `2002`            | `2003`           |
|                       | Down              | `3002`            | `3003`           |
|                       | Off               | `4002`            | `4003`           |
| Hue Smart Button      | On                | `1002`            | `1003`           |
| Hue Tap Switch        | Button 1          | `34`              |                  |
|                       | Button 2          | `16`              |                  |
|                       | Button 3          | `17`              |                  |
|                       | Button 4          | `18`              |                  |
| Friends of Hue Switch | Button 1          | `20`              | `16`             |
|                       | Button 1 (Double) | `101`             | `100`            |
|                       | Button 2          | `21`              | `17`             |
|                       | Button 2 (Double) | `99`              | `98`             |
|                       | Button 3          | `23`              | `19`             |
|                       | Button 4          | `22`              | `18`             |
