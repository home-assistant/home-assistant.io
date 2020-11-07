---
title: Philips Hue
description: Instructions on setting up Philips Hue within Home Assistant.
ha_category:
  - Hub
  - Light
ha_iot_class: Local Polling
featured: true
ha_release: '0.60'
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - '@balloob'
  - '@frenck'
ha_domain: hue
---

The Philips Hue integration allows you to control and monitor the lights and motion sensors connected to your Hue bridge. The Hue integration is automatically discovered. If not, add it via the add integration menu.

There is currently support for the following device types within Home Assistant:

- Lights
- Motion sensors (including temperature and light level sensors)
- Hue switches (as device triggers for automations and also exposed as battery sensors when they are battery-powered)
  - Hue Dimmer Switch
  - Hue Tap Switch
  - Hue Smart Button
  - Friends of Hue Switch

To set up this integration, click Configuration in the sidebar and then click Integrations. You should see "Philips Hue" in the discovered section (if you do not, click the + icon in the lower right and find Philips Hue). Click configure and you will be presented with the initiation dialog. This will prompt you select the Hue hub to configure and next to press the button on your Hue bridge to register the hub with Home Assistant. After you click submit, you will have the opportunity to select the area that your bridge is located.

When you configure the Hue bridge from Home Assistant, it writes a token to a file in your Home Assistant [configuration directory](/docs/configuration/). That token authenticates the communication with the Hue bridge. This token uses the IP address of the bridge. If the IP address for the bridge changes, you will need to register it with Home Assistant again. To avoid this, you may set up a DHCP reservation on your router for your Hue bridge so that it always has the same IP address.

Once registration is complete you should see the Hue lights listed as `light` entities, the Hue motion sensors listed as `binary_sensor` entities, and the Hue temperature and light level sensors (which are built in to the motion sensors) listed as `sensor` entities. If you don't, you may have to restart Home Assistant once more.

## Using Hue Groups in Home Assistant

The Hue API allows you to group lights. Home Assistant also supports grouping of entities natively, but sometimes it can be useful to use Hue groups to group light bulbs. By doing so, Home Assistant only needs to send one API call to change the state of all the bulbs in those groups instead of one call for every light in the group. This causes all the bulbs to change state simultaneously.

These Hue groups can be a `Luminaire`, `Lightsource`, `LightGroup`, or `Room`. The `Luminaire` and `Lightsource` can't be created manually since the Hue bridge manages these automatically based on the discovered bulbs. The `Room` and `LightGroup` can be created manually through the API or the mobile app. A bulb can only exist in one `Room`, but can exist in more than one `LightGroup`. The `LightGroup` can be useful if you want to link certain bulbs together.

The 2nd generation Hue app only has the ability to create a `Room`. You need to use the first generation app or the API to create a `LightGroup`.

Example:

To create a `LightGroup` named `Ceiling lights` that contains the lights 1, 2, and 3, execute the following command:

```bash
curl -XPOST -d '{"name": "Ceiling lights", "lights": ["1", "2", "3"]}' http://<bridge>/api/<username>/groups
```

The `<username>` is the string that is used to register Home Assistant with the bridge. You can find it in the `core.config_entries` file in `/PATH-TO-YOUR-CONFIGURATION/.storage/`. `<bridge>` is the IP address or hostname of your Hue bridge.

You can find the IDs of your lights by executing the following command:

```bash
curl http://<bridge>/api/<username>/lights
```

Home Assistant will automatically detect your new `LightGroup` and add it to the interface.

<div class='note warning'>
  To support Hue light groups, your bridge needs to have at least firmware 1.13 (released on June 3, 2016).
</div>

More information can be found on the [Philips Hue API documentation](https://www.developers.meethue.com/documentation/groups-api#22_create_group) website.

## Using Hue Scenes in Home Assistant

The Hue platform has its own concept of scenes for setting the colors of a group of lights simultaneously. A Hue bridge could potentially have dozens of scenes stored on it, and many scenes across different rooms might share the same name (the default scenes, for example). To avoid user interface overload, we don't expose scenes directly. Instead there is a `hue.hue_activate_scene` service which can be used in an automation or script.
This will have all the bulbs transitioned at once, instead of one at a time like when using standard scenes in Home Assistant.

For instance:

```yaml
script:
  porch_on:
    sequence:
      - service: hue.hue_activate_scene
        data:
          group_name: "Porch"
          scene_name: "Porch Orange"
```

| Service data attribute | Optional | Description                                                           |
| ---------------------- | -------- | --------------------------------------------------------------------- |
| `group_name`           | no       | The group/room name of the lights. Find this in the official Hue app. |
| `scene_name`           | no       | The name of the scene. Find this in the official Hue app.             |

_Note_: `group_name` is not a reference to a Home Assistant group name. It can only be the name of a group/room in the Hue app.

### Finding Group and Scene Names

The easiest way to find Hue scene names is to only use the scenes from the 2nd generation Hue app, which are organized by room (group) and scene name. Use the room name and scene name that you see in the app. You can test that these work at Developer Tools > Services in your Home Assistant instance.

Alternatively, you can dump all rooms and scene names using this [gist](https://gist.github.com/sdague/5479b632e0fce931951c0636c39a9578). This does **not** tell you which groups and scenes work together, but it is sufficient to get values that you can test at Developer Tools > Services.

### Caveats

The Hue API doesn't activate scenes directly; rather, they must be associated with a Hue group (typically rooms, especially if using the 2nd generation Hue app). But Hue scenes don't actually reference their group, so heuristic matching is used.

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
