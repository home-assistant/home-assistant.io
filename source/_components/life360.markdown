---
layout: page
title: "Life360"
description: "Instructions how to use Life360 to track devices in Home Assistant."
date: 2019-04-24 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: life360.png
ha_release: 0.93
ha_category: Presence Detection
ha_iot_class: Cloud Polling
---

The `life360` integration allows you to detect presence using the [unofficial API](#disclaimer) of [Life360](https://www.life360.com/). It can also automatically create Home Assistant zones based on Life360 Places.

## {% linkable_title Life360 Account %}

You must first [create a Life360 account](https://www.life360.com/websignup). Then add the following section to your `configuration.yaml` file:

{% raw %}
```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: life360
    username: LIFE360_USERNAME
    password: LIFE360_PASSWORD
    prefix: life360
```
{% endraw %}

{% configuration %}
username:
  description: Your Life360 username.
  required: true
  type: string
password:
  description: Your Life360 password.
  required: true
  type: string
add_zones:
  description: Create or update Home Assistant zones based on Life360 Places.
  required: false
  type: map
  default: Do not create or update zones.
  keys:
    type:
      description: What zone(s) to create or update. Options are `all`, `except_home` and `only_home`. Life360 Places whose names match **home_place** (case insensitive) will only be used when **type** is set to `all` or `only_home`. Other Places will only be used when **type** is set to `all` or `except_home`.
      required: true
      type: string
    scan_interval:
      description: How often to create or update zones.
      required: false
      type: time
      default: Create or update zones only at startup.
driving_speed:
  description: The minimum speed at which the device is considered to be "driving" (and which will also set the `driving` [attribute](#additional-attributes) to `true`. See also `Driving` state in [chart](#states) below.) MPH or KPH, depending on Home Assistant's unit system configuration.
  required: false
  type: float
  default: "\"Driving\" determined strictly by Life360."
error_threshold:
  description: See [Communication Errors](#communication-errors) for a detailed description.
  required: false
  type: integer
filename:
  description: An authorization token will be obtained from the Life360 server using your username and password and be saved in this file in the Home Assistant config directory (with limited permissions) so that it can reuse it after restarts (and not have to get a new token every time.) If the token eventually expires, a new one will be acquired as needed.
  required: false
  type: string
  default: life360.conf
home_place:
  description: Name of Life360 Place that coincides with home location as configured in Home Assistant.
  required: false
  type: string
  default: Home
interval_seconds:
  description: This defines how often the Life360 server will be queried (in seconds.) The resulting device_tracker entities will actually only be updated when the Life360 server provides new location information for each member.
  required: false
  type: integer
  default: 12
max_gps_accuracy:
  description: If specified, and reported GPS accuracy is larger (i.e., *less* accurate), then update is ignored.
  required: false
  type: float
max_update_wait:
  description: If specified, then if Life360 does not provide an update for a member within that maximum time window, an event named `life360_update_overdue` will be fired with the `entity_id` of the corresponding member's device_tracker entity. Once an update does come, an event named `life360_update_restored` will be fired with the `entity_id` of the corresponding member's device_tracker entity and another data item named `wait` that will indicate the amount of time spent waiting for the update. You can use these events in automations to be notified when they occur. See [example automations](#example-overdue-update-automations) below.
  required: false
  type: time
members:
  description: Life360 Members to create trackers for. Member names should be in the form of `first, last`. Or, if they only have one name in Life360, then simply `name`.
  required: false
  type: [string, list]
  default: Create trackers for all Members in all Circles.
prefix:
  description: Device ID prefix. Entity IDs will be in the form `device_tracker.PREFIX_FIRST_LAST`, or `device_tracker.PREFIX_NAME` if the Member has only one name.
  required: false
  type: string
  default: Entity IDs will be `device_tracker.FIRST_LAST` or `device_tracker.NAME`.
show_as_state:
  description: "One or more of: `driving`, `moving` and `places`. When specified these can cause the entity's state to show other statuses according to the [States](#states) chart below."
  required: false
  type: [string, list]
  default: Entity's state will be determined strictly by location of device and Home Assistant zones.
warning_threshold:
  description: See [Communication Errors](#communication-errors) for a detailed description.
  required: false
  type: integer
{% endconfiguration %}

## {% linkable_title States %}

Order of precedence is from higher to lower.

If show_as_state contains | The state will be | Under these conditions
-|-|-
`places` | `home` | Place or check-in name (see below) matches [**home_place**](#home_place) setting.
`places` | Place or check-in name | Member is in a Life360 defined "Place" or member has "checked in" via the Life360 app (and name does not match [**home_place**](#home_place) setting.)
N/A | `home` | Device GPS coordinates are located in `zone.home`.
N/A | HA zone name | Device GPS coordinates are located in a Home Assistant defined zone (other than `zone.home`.)
`driving` | `Driving` | The Life360 server indicates the device "isDriving", or if [**driving_speed**](#driving_speed) has been specified and the speed derived from the value provided by the Life360 server is at or above that value.
`moving` | `Moving` | The Life360 server indicates the device is "inTransit".
N/A | `not_home` | None of the above are true.

## {% linkable_title Additional attributes %}

Attribute | Description
-|-
address | Address of current location, or `none`.
at_loc_since | Date and time when first at current location (in UTC.)
battery_charging | Device is charging (`true`/`false`.)
driving | Device movement indicates driving (`true`/`false`.)
last_seen | Date and time when Life360 last updated device location (in UTC.)
moving | Device is moving (`true`/`false`.)
raw_speed | "Raw" speed value provided by Life360 server. (Units unknown.)
speed | Estimated speed of device (in MPH or KPH depending on Home Assistant's unit system configuration.)
wifi_on | Device WiFi is turned on (`true`/`false`.)

## {% linkable_title Services %}

Service | Description
-|-
`life360.zones_from_places` | Update Home Assistant zones from Life360 Places per [**add_zones**](#add_zones) configuration. Only available if **add_zones** is specified.

## {% linkable_title Home - Home Assistant vs Life360 %}

Normally Home Assistant device trackers are "Home" when they enter `zone.home`. (See [Zone documentation](https://www.home-assistant.io/components/zone/#home-zone) for details about how this zone is typically defined.) And Life360 normally considers your device "Home" when it enters the Place that coincides with your home (i.e., the Life360 "Home Place." See [**home_place**](#home_place) config variable.) Since the definitions of these areas can be different, this can lead to a disagreement between Home Assistant and Life360 as to whether or not you're "Home." There are three basic ways to avoid this situation.

The first is to manually make sure these two areas are defined the same -- i.e., same location and radius.

The second is to include `places` in the Home Assistant Life360 [**show_as_state**](#show_as_state) configuration variable. Whenever Life360 determines you are in its Home Place the corresponding Home Assistant device tracker's state will be set to `home`. But for this to solve the problem `zone.home` must be entirely contained within Life360's Home Place. If it isn't, and if you enter `zone.home` but not Life360's Home Place, then it is still possible for the two systems to disagree (i.e., Home Assistant indicating you're Home, but Life360 showing you're not.)

The third, and probably the easiest and most foolproof way, is to configure this platform to automatically update `zone.home` to be the exact same size, and at the exact same location, as Life360's Home Place. To enable this, set [**add_zones**](#add_zones)' **type** to `all` or `only_home`.

## {% linkable_title Communication Errors %}

It is not uncommon for communication errors to occur between Home Assistant and the Life360 server. This can happen for many reasons, including Internet connection issues, Life360 server load, etc. However, in most cases, they are temporary and do not significantly affect the ability to keep device_tracker entities up to date.

Therefore an optional filtering mechanism has been implemented to prevent inconsequential communication errors from filling the log, while still logging unusual error activity. Two thresholds are defined: [**warning_threshold**](#warning_threshold) and [**error_threshold**](#error_threshold). When a particular type of communication error happens on consecutive update cycles, it will not be logged until the number of occurences reaches these thresholds. When the number reaches **warning_threshold** (but does not exceed **error_threshold**, and only if **warning_threshold** is defined) it will be logged as a WARNING. Once the number reaches **error_threshold** it will be logged as an ERROR. Only two consecutive communication errors of a particular type will be logged as an ERROR, after which it will no longer be logged until it stops occuring and then happens again.

## {% linkable_title Examples %}

### {% linkable_title Example full configuration %}

{% raw %}
```yaml
device_tracker:
  - platform: life360
    username: LIFE360_USERNAME
    password: LIFE360_PASSWORD
    prefix: life360
    add_zones:
      type: all
      scan_interval:
        days: 1
    # MPH, assuming imperial units.
    # If using metric (KPH), equivalent would be 29.
    driving_speed: 18
    filename: life360.conf
    home_place: Home
    interval_seconds: 10
    max_gps_accuracy: 200
    max_update_wait:
      minutes: 45
    members:
      - mike, smith
      - Joe
      - Jones
    show_as_state: [driving, moving]
    # Set comm error thresholds so first is not logged,
    # second is logged as a WARNING, and third and fourth
    # are logged as ERRORs.
    warning_threshold: 2
    error_threshold: 3
```
{% endraw %}

### {% linkable_title Example overdue update automations %}

{% raw %}
```yaml
automation:
  - alias: Life360 Overdue Update
    trigger:
      platform: event
      event_type: life360_update_overdue
    action:
      service: notify.email_me
      data_template:
        title: Life360 update overdue
        message: >
          Update for {{
            state_attr(trigger.event.data.entity_id, 'friendly_name') or
            trigger.event.data.entity_id
          }} is overdue.

  - alias: Life360 Update Restored
    trigger:
      platform: event
      event_type: life360_update_restored
    action:
      service: notify.email_me
      data_template:
        title: Life360 update restored
        message: >
          Update for {{
            state_attr(trigger.event.data.entity_id, 'friendly_name') or
            trigger.event.data.entity_id
          }} restored after {{ trigger.event.data.wait }}.
```
{% endraw %}

## {% linkable_title Disclaimer %}

It does not appear that Life360 officially supports its REST API for use with other than its own apps. This integration is based on reverse engineering that has been done by the open source community, and an API token that was somehow discovered by the same community. At any time Life360 could disable that token or otherwise change its REST API such that this custom component would no longer work.
