---
title: Device tracker
description: Instructions on how to setup device tracking within Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.7
ha_quality_scale: internal
ha_domain: device_tracker
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The device tracker allows you to track devices in Home Assistant. This can happen by querying your wireless router or by having applications push location info.

{% include integrations/building_block_integration.md %}

## Configuring a `device_tracker` platform

To get started add the following lines to your {% term "`configuration.yaml`" %} (example for Netgear):

```yaml
# Example configuration.yaml entry for Netgear device
device_tracker:
  - platform: netgear
    host: IP_ADDRESS
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    new_device_defaults:
      track_new_devices: true
```

The following optional parameters can be used with any platform:

{% note %}
Device tracker will only look for the following global settings under the configuration of the first configured platform:
{% endnote %}

| Parameter          | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `interval_seconds` | 12      | Seconds between each scan for new devices. This only applies to local device trackers, not applications that push updates.                                                                                                                                                                                                                                                                                                                                                                                               |
| `consider_home`    | 180     | Seconds to wait till marking someone as not home after not being seen. This parameter is most useful for households with Apple iOS devices that go into sleep mode while still at home to conserve battery life. iPhones will occasionally drop off the network and then re-appear. `consider_home` helps prevent false alarms in presence detection when using IP scanners such as Nmap. `consider_home` accepts various time representations, (e.g., the following all represents 3 minutes: `180`, `0:03`, `0:03:00`) |

{% note %}

Note that setting `track_new_devices: false` will still result in new devices being recorded in `known_devices.yaml`, but they won't be tracked (`track: false`).

{% endnote %}

In the {% term "`configuration.yaml`" %}, the extended example from above would look like the following sample:

```yaml
# Example configuration.yaml entry for Netgear device
device_tracker:
  - platform: netgear
    host: IP_ADDRESS
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    interval_seconds: 10
    consider_home: 180
    new_device_defaults:
      track_new_devices: true
```

Multiple device trackers can be used in parallel, such as [Owntracks](/integrations/owntracks/) and [Nmap](/integrations/nmap_tracker/). The state of the device will be determined by the source that reported last.

## `known_devices.yaml`

{% warning %}

As of 0.94 `known_devices.yaml` is being phased out and no longer used by all trackers. Depending on the integration you use this section may no longer apply. This includes OwnTracks, GeoFency, GPSLogger, Locative and Huawei LTE.

{% endwarning %}

Once `device_tracker` is enabled, a file will be created in your configuration dir named `known_devices.yaml`. Edit this file to adjust which devices to be tracked.

Here's an example configuration for a single device:

```yaml
devicename:
  name: Friendly Name
  mac: EA:AA:55:E7:C6:94
  picture: https://www.home-assistant.io/images/favicon-192x192.png
  track: true
```

{% important %}

In the example above, `devicename` refers to the detected name of the device.  For example, with `nmap`, this will be the MAC address (with byte separators omitted).

{% endimportant %}

| Parameter       | Default                       | Description                                                                                                                                                                                                                                                                                                                                     |
| --------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`          | Host name or "Unnamed Device" | The friendly name of the device.                                                                                                                                                                                                                                                                                                                |
| `mac`           | None                          | The MAC address of the device. Add this if you are using a network device tracker like Nmap or SNMP.                                                                                                                                                                                                                                            |
| `picture`       | None                          | A picture that you can use to easily identify the person or device. You can also save the image file in a folder "www" in the same location (can be obtained from developer tools) where you have your `configuration.yaml` file and just use `picture: /local/favicon-192x192.png`. The path 'local' is mapped to the 'www' folder you create. |
| `icon`          | mdi:account                   | An icon for this device (use as an alternative to `picture`).                                                                                                                                                                                                                                                                                   |
| `gravatar`      | None                          | An email address for the device's owner. If provided, it will override `picture`.                                                                                                                                                                                                                                                               |
| `track`         | [uses platform setting]       | If  `yes`/`on`/`true` then the device will be tracked. Otherwise its location and state will not update. The `track` setting only applies for devices that were configured directly in YAML.                                                                                                                                                    |
| `consider_home` | [uses platform setting]       | Seconds to wait till marking someone as not home after not being seen. Allows you to override the global `consider_home` setting from the platform configuration on a per device level. The `consider_home` setting only applies for devices that were configured directly in YAML.                                                             |

## The state of a tracked device

The type of state a device tracker can have depends on whether it uses GPS or a router as the data source.

A device tracker with **GPS** as a source can have any number of string states. The integration can return one of the following options:

- Report GPS coordinates. The coordinates are then matched to a zone (which is set as state). If the home zone is matched, the state will be **Home**. If no zone was matched the state will be **Not home**.
- Report a location. This could be any string which is set as state.

A device tracker with **router** as a source can have one of two states: **Home**, or **Not home**.

- **Home**: Your tracked device is in the [home zone](/integrations/zone#home-zone), detected by your network or Bluetooth-based presence detection. If you're using a presence detection method that includes coordinates: when it's in a zone, the state equals the name of the zone (case sensitive).
- **Not home**: When a device isn't at home and isn't in any zone.

<p class='img'>
<img src='/images/integrations/device_tracker/state_device_tracker.png' alt='Screenshot showing the state of a device tracker entity in the developer tools' />
Screenshot showing the state of a device tracker entity in the developer tools.
</p>

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## `device_tracker.see` action

The `device_tracker.see` action can be used to manually update the state of a device tracker:

| Data attribute  | Optional | Description                                                                             |
| --------------- | -------- | --------------------------------------------------------------------------------------- |
| `dev_id`        | no       | The `object_id`, for example `tardis` for `device_tracker.tardis`                       |
| `location_name` | yes      | The location, `home`, `not_home`, or the name of the zone                               |
| `host_name`     | yes      | The hostname of the device tracker                                                      |
| `mac`           | yes      | The MAC address of the entity (only specify if you're updating a network based tracker) |
| `gps`           | yes      | If you're providing a location, for example `[51.513845, -0.100539]`                    |
| `gps_accuracy`  | yes      | The accuracy of the GPS fix                                                             |
| `battery`       | yes      | The battery level of the device                                                         |
