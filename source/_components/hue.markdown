---
layout: page
title: "Philips Hue"
description: "Instructions on setting up Philips Hue within Home Assistant."
date: 2017-11-29 23:51
sidebar: true
comments: false
sharing: true
footer: true
logo: philips_hue.png
ha_category: Hub
ha_iot_class: "Local Polling"
ha_qa_scale: platinum
featured: true
ha_release: "0.60"
ha_qa_scale: platinum
---

Philips Hue support is integrated into Home Assistant as a Hub that can drive the light platform. The preferred way to setup the Philips Hue platform is by enabling the [discovery component](/components/discovery/).

Once discovered, if you have a custom default view, locate `configurator.philips_hue` in the entities list ( < > ) and add it to a group in `configuration.yaml`. Restart Home Assistant so that the configurator is visible in the Home Assistant dashboard. Once Home Assistant is restarted, locate and click on `configurator.philips_hue` to bring up the initiation dialog. This will prompt you to press the Hue button to register the Hue hub in Home Assistant. Once complete, the configurator entity isn't needed anymore and can be removed from any visible group in `configuration.yaml`.

When you configure the Hue bridge from Home Assistant, it writes a token to a file in your Home Assistant [configuration directory](/docs/configuration/). That token authenticates the communication with the Hue bridge. This token uses the Address of the Hue Bridge. If the IP address for the Hue Bridge changes, you will need to register the Hue Bridge with Home Assistant again. To avoid this you may set up DHCP registration for your Hue Bridge, so that it always has the same IP address.

Once registration is complete you should see the Hue lights listed as `light` entities. If you don't you may have to restart Home Assistant once more. Add these light entities to `configuration.yaml` file and restart Home Assistant once more to complete the installation.

If you want to enable the component without relying on the [discovery component](/components/discovery/), add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
hue:
  bridges:
    - host: DEVICE_IP_ADDRESS
```

Configuration variables:

- **host** (*Required*): The IP address of the device, eg. 192.168.1.10. Required if not using the `discovery` component to discover Hue bridges.
- **allow_unreachable** (*Optional*): (true/false)  This will allow unreachable bulbs to report their state correctly.
- **filename** (*Optional*): Make this unique if specifying multiple Hue hubs.
- **allow_hue_groups** (*Optional*): (true/false) Enable this to stop Home Assistant from importing the groups defined on the Hue bridge.

## {% linkable_title Examples %}

```yaml
# Example configuration.yaml entry specifying optional parameters
hue:
  bridges:
    - host: DEVICE_IP_ADDRESS
      allow_unreachable: true
      allow_hue_groups: true
```

### {% linkable_title Migrating from older configuration %}

In previous versions of the `hue` component the configuration looked different:

```yaml
# Example configuration.yaml entry
light:
  - platform: hue
    host: DEVICE_IP_ADDRESS
```

You will need to convert each bridge into an entry in the new configuration style. See above for an example.

### {% linkable_title Multiple Hue bridges %}

Multiple Hue bridges work transparently with discovery, you don't have to do anything. If you prefer to configure them manually and use multiple Hue bridges then it's needed that you provide a configuration file for every bridge. The bridges can't share a single configuration file.

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

### {% linkable_title Using Hue Groups in Home Assistant %}

The Hue API allows you to group lights. Home Assistant also supports grouping of entities natively, but sometimes it can be useful to use Hue Groups to group light bulbs. By doing so, Home Assistant only needs to send one API call to change the state of all the bulbs in those groups instead of one call for every light in the group. This causes all the bulbs to change state simultaneously.

These Hue Groups can be a `Luminaire`, `Lightsource`, `LightGroup` or `Room`. The `Luminaire` and `Lightsource` can't be created manually since the Hue bridge manages these automatically based on the discovered bulbs. The `Room` and `LightGroup` can be created manually through the API, or the mobile app. A bulb can only exist in one `Room`, but can exist in multiple `LightGroup`. The `LightGroup` can be useful to link certain bulbs together since.

The 2nd generation Hue app only allows to create a `Room`. You need to use the first generation app or the API to create a `LightGroup`.

Example:

To create a `LightGroup` named `Ceiling lights` that contains the lights 1, 2 and 3, execute the following command:

```bash
$ curl -XPOST -d '{"name": "Ceiling lights", "lights": ["1", "2", "3"]}' http://<bridge>/api/<username>/groups
```

The `<username>` is the string that is used to register Home Assistant on the bridge, you can find it in the `phue.conf` file in your configuration path. `<bridge>` is the IP address or hostname of your Hue bridge.

You can find out the ids of your lights by executing the following command:

```bash
$ curl http://<bridge>/api/<username>/lights
```

Home Assistant will automatically detect your new `LightGroup` and add it to the interface.

<p class='note warning'>
  To support Hue Light Groups, your bridge needs to have at least firmware 1.13 (released on June 3, 2016).
</p>

More information can be found on the [Philips Hue API documentation](https://www.developers.meethue.com/documentation/groups-api#22_create_group) website.


### {% linkable_title Using Hue Scenes in Home Assistant %}

The Hue platform has its own concept of scenes for setting the colors of a group of lights at once. Hue Scenes are very cheap, get created by all kinds of apps (as it is the only way to have 2 or more lights change at the same time), and are rarely deleted. A typical Hue hub might have hundreds of scenes stored in them, many that you've never used, almost all very poorly named.

To avoid user interface overload we don't expose scenes directly. Instead there is a hue.hue_activate_scene service which can be used by `automation` or `script` components.
This will have all the bulbs transitioned at once, instead of one at a time using standard scenes in Home Assistant.

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
| `group_name` | no | The group/room name of the lights. Find this in the Hue official app.
| `scene_name` | no | The name of the scene. Find this in the Hue official app.

*Note*: `group_name` is not linked to Home Assistant group name.

### {% linkable_title Finding Group and Scene Names %}

How do you find these names?

The easiest way to do this is only use the scenes from the 2nd generation Hue app. That is organized by room (group) and scene Name. Use the values of room name and scene name that you see in the app. You can test these work on the `dev-service` console of your Home Assistant instance.

Alternatively, you can dump all rooms and scene names using this [gist](https://gist.github.com/sdague/5479b632e0fce931951c0636c39a9578). This does **not** tell you which groups and scenes work together but it's sufficient to get values that you can test in the `dev-service` console.

### {% linkable_title Caveats %}

The Hue API doesn't activate scenes directly, only on a Hue Group (typically rooms, especially if using the 2nd gen app). But Hue Scenes don't actually reference their group. So heuristic matching is used.

Neither group names or scene names are guaranteed unique in Hue. If you are getting non deterministic behavior, adjust your Hue scenes via the App to be more identifying.

The Hue hub has limited spaces for scenes, and will delete scenes if new ones get created that would overflow that space. The API docs say this is based on "Least Recently Used".
