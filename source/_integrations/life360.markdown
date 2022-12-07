---
title: Life360
description: Instructions how to use Life360 to track devices in Home Assistant.
ha_release: 0.95
ha_config_flow: true
ha_category:
  - Presence Detection
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@pnbruckner'
ha_domain: life360
ha_platforms:
  - device_tracker
ha_integration_type: integration
---

The `life360` integration allows you to detect presence using the [unofficial API](#disclaimer) of [Life360](https://www.life360.com/).

## Prerequisites

You must first [create a Life360 account](https://app.life360.com/sign-up).
Individual Members must enable Location Sharing in their Life360 app to show up as a tracked entity in Home Assistant.

{% include integrations/config_flow.md %}

### Account options

![Account Options](/images/integrations/life360/integration_options.png)

item | description
-|-
Limit GPS accuracy | Check this box to limit location updates based on location accuracy
Max GPS accuracy | If location's accuracy circle is larger than this value (i.e., _less_ accurate than this limit) the update will be ignored (always specified in meters)
Set driving speed threshold | Check this box to force `driving` attribute to be `True` if the `speed` attribute is at or above specified value
Driving Speed | Speed threshold (mph or kph, depending on Home Assistant Unit System selection)
Show driving as state | Check this box to change entity state to "Driving" when `driving` attribute is `True`

## Additional attributes

Life360 entities will have the following attributes in addition to the usual `device_tracker` ones:

| Attribute        | Description                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| address          | Address of the current location, or `none`.                                                        |
| at_loc_since     | Date and time when first at current location (in UTC.)                                             |
| battery_charging | Device is charging (`true`/`false`.)                                                               |
| driving          | Device movement indicates driving (`true`/`false`.)                                                |
| last_seen        | Date and time when Life360 last updated device location (in UTC.)                                  |
| place            | Name of Life360 Place where the device is located, or `none` if not located within one.            |
| speed            | Estimated speed of device (in MPH or KPH depending on Home Assistant's unit system configuration.) |
| wifi_on          | Device Wi-Fi is turned on (`true`/`false`.)                                                        |

## Home - Home Assistant vs. Life360

Normally Home Assistant device trackers are "Home" when they enter `zone.home`. Also, Life360 normally considers your device "Home" when it enters the Place that coincides with your home. Since the definitions of these areas can be different, this can lead to a disagreement between Home Assistant and Life360 as to whether or not you're "Home." To avoid this, make sure these two areas are defined the same -- i.e., same location and radius. (See next section.)

## Home Assistant Zones & Life360 Places

See [Zone documentation](/integrations/zone/#home-zone) for details about how Home Assistant zones are defined. If you'd like to create Home Assistant zones from Life360 Places (e.g., to make Home Assistant's `zone.home` be identical to Life360's "Home Place"), make sure `logger` is set to `debug`. Then when Home Assistant starts the details of all the Places defined in the Circles will be written to `home-assistant.log` in a format that can be copied into your configuration under `zone:`. E.g., you would see something like this:

```text
2022-05-24 13:07:54 DEBUG (MainThread) [homeassistant.components.life360] Circle: My Family
2022-05-24 13:07:54 DEBUG (MainThread) [homeassistant.components.life360] Places from My Family:
- name: Home
  latitude: XX.XXX
  longitude: YY.YYY
  radius: ZZZ
```

## Disclaimer

It does not appear that Life360 officially supports its REST API for use with other than its own apps. This integration is based on reverse engineering that has been done by the open source community, and an API token that was somehow discovered by the same community. At any time Life360 could disable that token or otherwise change its REST API such that this integration would no longer work.
