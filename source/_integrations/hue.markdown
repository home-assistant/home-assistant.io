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

## Advanced use of custom Hue Groups

This is considered an advanced method, if you are in need for other grouping than the rooms feature provided by Hue, we recommend to use [Home Assistant Light Groups](/integrations/light.group/) instead.

The Hue API allows you to group lights. Home Assistant also supports grouping of entities by itself, but sometimes it can be useful to use Hue groups to group light bulbs. Using native Hue groups, Home Assistant only needs to send one API call to change the state of all the bulbs in those groups instead of one call for every light in the group. This causes all the bulbs to change state simultaneously.

One example of such Hue groups are rooms. These rooms can be managed via the Hue app and do not require anything described in this paragraph. A bulb can only exist in one room at the time, however
Hue has a notion of another light group, which does not have this limitation. These can only be created via manually via the Hue API.

The Hue `LightGroup` can be created manually through the API. A bulb can only exist in one `Room`, but can exist in more than one `LightGroup`.

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
