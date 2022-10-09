---
title: Device Tracker
description: Instructions on how to setup device tracking within Home Assistant.
ha_category:
  - Presence Detection
ha_release: 0.7
ha_quality_scale: internal
ha_domain: device_tracker
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The device tracker allows you to track devices in Home Assistant. This can happen by querying your wireless router or by having applications push location info.

## Configuring a `device_tracker` platform

To get started add the following lines to your `configuration.yaml` (example for Netgear):

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

<div class='note'>
  Device tracker will only look for the following global settings under the configuration of the first configured platform:
</div>

| Parameter           | Default | Description                                                                                                                                                                                                                                                                                                                                                                               |
|----------------------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `interval_seconds`   | 12      | Seconds between each scan for new devices. This only applies to local device trackers, not applications that push updates. |
| `consider_home`      | 180     | Seconds to wait till marking someone as not home after not being seen. This parameter is most useful for households with Apple iOS devices that go into sleep mode while still at home to conserve battery life. iPhones will occasionally drop off the network and then re-appear. `consider_home` helps prevent false alarms in presence detection when using IP scanners such as Nmap. `consider_home` accepts various time representations, (e.g., the following all represents 3 minutes: `180`, `0:03`, `0:03:00`)  |

<div class='note'>

  Note that setting `track_new_devices: false` will still result in new devices being recorded in `known_devices.yaml`, but they won't be tracked (`track: false`).

</div>

The extended example from above would look like the following sample:

```yaml
# Example configuration.yaml entry for Netgear device
device_tracker:
  - platform: netgear
    host: IP_ADDRESS
    username: YOUR_USERNAME
    interval_seconds: 10
    consider_home: 180
    new_device_defaults:
      track_new_devices: true
```

Multiple device trackers can be used in parallel, such as [Owntracks](/integrations/owntracks/) and [Nmap](/integrations/nmap_tracker/). The state of the device will be determined by the source that reported last.

## `known_devices.yaml`

<div class='note warning'>

As of 0.94 `known_devices.yaml` is being phased out and no longer used by all trackers. Depending on the integration you use this section may no longer apply. This includes OwnTracks, GeoFency, GPSLogger, Locative and Huawei LTE.

</div>

Once `device_tracker` is enabled, a file will be created in your configuration dir named `known_devices.yaml`. Edit this file to adjust which devices to be tracked.

Here's an example configuration for a single device:

```yaml
devicename:
  name: Friendly Name
  mac: EA:AA:55:E7:C6:94
  picture: https://www.home-assistant.io/images/favicon-192x192.png
  track: true
```

<div class='note warning'>

In the example above, `devicename` refers to the detected name of the device.  For example, with `nmap`, this will be the MAC address (with byte separators omitted).

</div>

| Parameter      | Default                       | Description                                                                                             |
|----------------|-------------------------------|---------------------------------------------------------------------------------------------------------|
| `name`         | Host name or "Unnamed Device" | The friendly name of the device.                                                                         |
| `mac`          | None                          | The MAC address of the device. Add this if you are using a network device tracker like Nmap or SNMP.     |
| `picture`      | None                          | A picture that you can use to easily identify the person or device. You can also save the image file in a folder "www" in the same location (can be obtained from developer tools) where you have your `configuration.yaml` file and just use `picture: /local/favicon-192x192.png`. The path 'local' is mapped to the 'www' folder you create.                                     |
| `icon`         | mdi:account                   | An icon for this device (use as an alternative to `picture`).                           |
| `gravatar`     | None                          | An email address for the device's owner. If provided, it will override `picture`.                        |
| `track`        | [uses platform setting]       | If  `yes`/`on`/`true` then the device will be tracked. Otherwise its location and state will not update. |
| `consider_home` | [uses platform setting]      | Seconds to wait till marking someone as not home after not being seen. Allows you to override the global `consider_home` setting from the platform configuration on a per device level.                                 |

## Device states

The state of your tracked device will be `'home'` if it is in the [home zone](/integrations/zone#home-zone), detected by your network or Bluetooth based presence detection. If you're using a presence detection method that includes coordinates then when it's in a zone the state will be the name of the zone (case sensitive). When a device isn't at home and isn't in any zone, the state will be `'not_home'`.

## `device_tracker.see` service

The `device_tracker.see` service can be used to manually update the state of a device tracker:

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `dev_id`               |       no | The `object_id`, for example `tardis` for `device_tracker.tardis` |
| `location_name`        |      yes | The location, `home`, `not_home`, or the name of the zone |
| `host_name`            |      yes | The hostname of the device tracker |
| `mac`                  |      yes | The MAC address of the entity (only specify if you're updating a network based tracker) |
| `gps`                  |      yes | If you're providing a location, for example `[51.513845, -0.100539]` |
| `gps_accuracy`         |      yes | The accuracy of the GPS fix |
| `battery`              |      yes | The battery level of the device |
