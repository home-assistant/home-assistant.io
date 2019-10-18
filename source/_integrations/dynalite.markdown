---
title: "Philips Dynalite"
description: "Instructions on setting up Philips Dynalite within Home Assistant."
logo: dynalite.png
ha_category:
  - Hub
  - Light
ha_iot_class: Local Push
ha_qa_scale: No Score
featured: true
ha_release: "0.60"
---

Philips Dynalite support is integrated into Home Assistant as a hub that can drive the light platforms. 

There is currently support for the following device types within Home Assistant:

- Lights

A Philips Dynalite hub connects to the Dynet network, which is composed of areas, channels, and preset. 

A Dynalite area typically (although not necessarily) defines some physical area, such as a room. 

Each area can have one or more channels that correspond to the different devices they control. A channel can relate to a dimmable light, or other devices, such as a cover.

Additionally each area can have one or more presets that determine the behavior of all the channels, and sometimes trigger additional actions. Typically, preset 1 in an area means 'on', and preset '4' means off. Additional presets could be used for scenes and dimming.

Since Philips Dynalite has virtually no autodiscover capabilities, it needs to be configured via the `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
hue:
  bridges:
    - host: DEVICE_IP_ADDRESS
```

{% configuration %}
host:
  description: The IP address of the bridge (e.g., 192.168.1.10).
  required: true
  type: string
port:
  description: Port number of the bridge
  required: false
  type: integer
  default: 12345
name:
  description: Name for the bridge
  required: false
  type: string
  default: dynalite
log_level:
  description: Log level for the libraries
  required: false
  type: string
  default: info
autodiscover:
  description: Enable autodiscover. As Dynalite does not support autodiscovery, this tracks event on your network, so if you turn on a light, it will be added to Home Assistant
  required: false
  type: boolean
  default: true
polltimer:
  description: Polling interval for devices in transition. Value in seconds. When devices are in transition (e.g. a light fading), it will ask for a new state every X seconds until it is at the target level.
  required: false
  type: float
  default: 1.0

{% endconfiguration %}

## Examples

```yaml
# Example configuration.yaml entry specifying optional parameters
hue:
  bridges:
    - host: DEVICE_IP_ADDRESS
      allow_unreachable: true
      allow_hue_groups: true
```

### Multiple Hue bridges

Multiple Hue bridges work transparently with discovery, so you don't have to do anything special to set them up. If you prefer to configure them manually and use multiple Hue bridges, then you need to provide a configuration file for every bridge. The bridges can't share a single configuration file.

Add `filename` to your Hue configuration entry in your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
hue:
  bridges:
    - host: BRIDGE1_IP_ADDRESS
      filename: phue.conf
    - host: BRIDGE2_IP_ADDRESS
      filename: phue2.conf
```

### Using Hue Groups in Home Assistant

The Hue API allows you to group lights. Home Assistant also supports grouping of entities natively, but sometimes it can be useful to use Hue groups to group light bulbs. By doing so, Home Assistant only needs to send one API call to change the state of all the bulbs in those groups instead of one call for every light in the group. This causes all the bulbs to change state simultaneously.

These Hue groups can be a `Luminaire`, `Lightsource`, `LightGroup`, or `Room`. The `Luminaire` and `Lightsource` can't be created manually since the Hue bridge manages these automatically based on the discovered bulbs. The `Room` and `LightGroup` can be created manually through the API or the mobile app. A bulb can only exist in one `Room`, but can exist in more than one `LightGroup`. The `LightGroup` can be useful if you want to link certain bulbs together.

The 2nd generation Hue app only has the ability to create a `Room`. You need to use the first generation app or the API to create a `LightGroup`.

Example:

To create a `LightGroup` named `Ceiling lights` that contains the lights 1, 2, and 3, execute the following command:

```bash
$ curl -XPOST -d '{"name": "Ceiling lights", "lights": ["1", "2", "3"]}' http://<bridge>/api/<username>/groups
```

The `<username>` is the string that is used to register Home Assistant on the bridge. You can find it in the `core.config_entries` file in your configuration\.storage path. `<bridge>` is the IP address or hostname of your Hue bridge.

You can find the IDs of your lights by executing the following command:

```bash
$ curl http://<bridge>/api/<username>/lights
```

Home Assistant will automatically detect your new `LightGroup` and add it to the interface.

<div class='note warning'>
  To support Hue light groups, your bridge needs to have at least firmware 1.13 (released on June 3, 2016).
</div>

More information can be found on the [Philips Hue API documentation](https://www.developers.meethue.com/documentation/groups-api#22_create_group) website.

### Using Hue Scenes in Home Assistant

The Hue platform has its own concept of scenes for setting the colors of a group of lights at once. Hue Scenes are very cheap, get created by all kinds of apps (as it is the only way to have 2 or more lights change at the same time), and are rarely deleted. A typical Hue hub might have hundreds of scenes stored in them—many that you've never used, and almost all very poorly named.

To avoid user interface overload, we don't expose scenes directly. Instead there is a hue.hue_activate_scene service which can be used by `automation` or `script` components.
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

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `group_name` | no | The group/room name of the lights. Find this in the official Hue app.
| `scene_name` | no | The name of the scene. Find this in the official Hue app.

*Note*: `group_name` is not a reference to a Home Assistant group name. It can only be the name of a group/room in the Hue app.

### Finding Group and Scene Names

How do you find these names?

The easiest way to do this is to only use the scenes from the 2nd generation Hue app, which is organized by room (group) and scene name. Use the values of room name and scene name that you see in the app. You can test that these work by using the `dev-service` console of your Home Assistant instance.

Alternatively, you can dump all rooms and scene names using this [gist](https://gist.github.com/sdague/5479b632e0fce931951c0636c39a9578). This does **not** tell you which groups and scenes work together, but it is sufficient to get values that you can test in the `dev-service` console.

### Caveats

The Hue API doesn't activate scenes directly; rather, they must be associated with a Hue group (typically rooms, especially if using the 2nd gen app). But Hue scenes don't actually reference their group. So heuristic matching is used.

Neither group names nor scene names are guaranteed unique in Hue. If you are observing unexpected behavior from calling Hue scenes in Home Assistant, make the names of your Hue scenes more specific in the Hue app.

The Hue hub has limited space for scenes and will delete scenes if new ones get created that would overflow that space. The API docs say this is based on the scenes that are "least recently used."
