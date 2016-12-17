---
layout: page
title: "Philips Hue"
description: "Instructions how to setup Philips Hue within Home Assistant."
date: 2015-03-23 20:09
sidebar: true
comments: false
sharing: true
footer: true
logo: philips_hue.png
ha_category: Light
ha_iot_class: "Local Polling"
featured: true
ha_release: pre 0.7
---

Philips Hue support is integrated into Home Assistant as a light platform. The preferred way to setup the Philips Hue platform is by enabling the [discovery component](/components/discovery/).

Once discovered, if you have a custom default view, locate `configurator.philips_hue` in the entities list ( < > ) and add it to a group in `configuration.yaml`. Restart Home Assistant so that the configurator is visible in the Home Assistant dashboard. Once Home Assistant is restarted, locate and click on `configurator.philips_hue` to bring up the initiation dialog. This will prompt you to press the Hue button to register the Hue hub in home assistant. Once complete, the configurator entity isn't needed anymore and can be removed from any visible group in `configuration.yaml`.

Restarting Home Assistant once more should result in the Hue lights listed as "light" entities. Add these light entities to configuration.yaml and restart home assistant once more to complete the installation.

If you want to enable the component without relying on the [discovery component](/components/discovery/), add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
light:
  platform: hue
  host: DEVICE_IP_ADDRESS
```

Configuration variables:

- **host** (*Required*): IP address of the device, eg. 192.168.1.10.
- **allow_unreachable** (*Optional*):  This will allow unreachable bulbs to report their state correctly. By default *name* from the device is used.
- **filename** (*Optional*): Make this unique if specifying multiple Hue hubs.

### {% linkable_title Using Hue Groups in Home Assistant %}

The Hue API allows you to group lights. Home Assistant also supports grouping of entities natively, but sometimes it can be usefull to use Hue Groups to group light bulbs. By doing so, Home Assistant only needs to send one API call to change the state of all the bulbs in those groups instead of one call for every light in the group. This causes all the bulbs to change state simultaniously.

These Hue Groups can be a `Luminaire`, `Lightsource`, `LightGroup` or `Room`. The `Luminaire` and `Lightsource` can't be created manually since the Hue bridge manages these automatically based on the discovered bulbs. The `Room` and `LightGroup` can be created manually trough the API, or the mobile app. A bulb can only exist in one `Room`, but can exist in multiple `LightGroup`. The `LightGroup` can be usefull to link certain bulbs together since.

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

The Hue platform has it's own concept of Scenes for setting the colors of a group of lights at once. Hue Scenes are very cheap, get created by all kinds of apps (as it is the only way to have 2 or more lights change at the same time), and are rarely deleted. A typical Hue hub might have hundreds of scenes stored in them, many that you've never used, almost all very poorly named.

To avoid user interface overload we don't expose Scenes directly. Instead there is a [light.hue_activate_scene](/components/light/#service-lighthue_activate_scene) service which can be used by `automation` or `script` components. For
instance:

```yaml
script:
  porch_on:
    sequence:
      - service: light.hue_activate_scene
        data:
          group_name: "Porch"
          scene_name: "Porch Orange"
```

*** Finding Group and Scene Names ***

How do you find these names?

The easiest way to do this is only use the scenes from the 2nd generation Hue app. That is organized by Room (Group) and Scene
Name. Use the values of Room name and Scene name that you see in the app. You can test these work on the `dev-service` console of your Home Assistant instance.

Alternatively, you can dump all rooms and scene names using this [gist](https://gist.github.com/sdague/5479b632e0fce931951c0636c39a9578). This does **not** tell you which groups and scenes work together but it's sufficient to get values that you can test in the `dev-service` console.

*** Caveats ***

The Hue API doesn't activate Scenes directly, only on a Hue Group (typically Rooms, especially if using the 2nd gen app). But Hue Scenes don't actually reference their group. So heuristic matching is used.

Neither Group names or Scene names are guaranteed unique in Hue. If you are getting non deterministic behavior, adjust your Hue scenes via the App to be more identifying.

The Hue hub has limitted spaces for Scenes, and will delete Scenes if new ones get created that would overflow that space. The API docs say this is based on Least Recently Used.
