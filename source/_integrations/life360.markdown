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
---

The `life360` integration allows you to detect presence using the [unofficial API](#disclaimer) of [Life360](https://www.life360.com/).

## Prerequisites

You must first [create a Life360 account](https://www.life360.com/websignup).

{% include integrations/config_flow.md %}

## Advanced configuration

If you would like to set any advanced options, see the following section. You may want to do this before entering your Life360 account information in the UI, or you can change it at any time. Any of the advanced options you want to set from the section below will need to be set manually in your `configuration.yaml` file. They are not able to be set from the UI. You can also enter your account information in the configuration file (in addition to, or instead of, the UI) if you prefer.

After configuring, it is expected for the Life360 integration page to show "This integration has no devices". You should see a new Life360 device tracker entity showing up on the States page. If it does not:

- Check the [device tracker documentation](/integrations/device_tracker), especially the `new_device_defaults` setting.
- Check your `known_devices.yaml`; `tracking` should be `true` for your Life360 device.
- In the Life360 app, Location Sharing should be enabled.

{% configuration %}
accounts:
  description: Your Life360 account information.
  required: false
  type: [list, map]
  default: None
  keys:
    username:
      description: Your Life360 username.
      required: true
      type: string
    password:
      description: Your Life360 password.
      required: true
      type: string
circles:
  description: See [Filtering](#filtering) for a detailed description. Must specify **include** or **exclude**, but not both.
  required: false
  type: map
  default: Include all Circles.
  keys:
    include:
      description: Circles to include.
      required: false
      type: [string, list]
    exclude:
      description: Circles to exclude.
      required: false
      type: [string, list]
driving_speed:
  description: The minimum speed at which the device is considered to be "driving" (which can also set the `driving` [attribute](#additional-attributes) to `true`.) MPH or KPH, depending on Home Assistant's unit system configuration.
  required: false
  type: float
  default: "\"Driving\" determined strictly by Life360."
error_threshold:
  description: See [Communication Errors](#communication-errors) for a detailed description.
  required: false
  type: integer
interval_seconds:
  description: This defines how often the Life360 server will be queried (in seconds.) The resulting device_tracker entities will actually only be updated when the Life360 server provides new location information for each member.
  required: false
  type: integer
  default: 12
max_gps_accuracy:
  description: If specified, and the reported GPS accuracy is larger (i.e., *less* accurate), then update is ignored.
  required: false
  type: float
max_update_wait:
  description: If specified and Life360 does not provide an update for a member within that maximum time window, an event named `life360_update_overdue` will be fired with the `entity_id` of the corresponding member's device_tracker entity. Once an update does come, an event named `life360_update_restored` will be fired with the `entity_id` of the corresponding member's device_tracker entity and another data item named `wait` that will indicate the amount of time spent waiting for the update. You can use these events in automations to be notified when they occur. See [example automations](#example-overdue-update-automations) below.
  required: false
  type: time
members:
  description: See [Filtering](#filtering) for a detailed description. Must specify **include** or **exclude**, but not both.
  required: false
  type: map
  default: Include all Members from all included Circles.
  keys:
    include:
      description: Members to include.
      required: false
      type: [string, list]
    exclude:
      description: Members to exclude.
      required: false
      type: [string, list]
prefix:
  description: Device ID prefix. Entity IDs will be in the form of `device_tracker.PREFIX_FIRST_LAST`, or `device_tracker.PREFIX_NAME` if the Member has only one name. To use no prefix, specify `''`.
  required: false
  type: string
  default: life360
show_as_state:
  description: If device is not in a Home Assistant zone, it is determined to be driving (see attribute of same name) and `driving` is specified, the state of entity will be set to `driving`. If device is not in a zone, it is determined to be moving and `moving` is specified, then state of entity will be set to `moving`.
  required: false
  type: [string, list]
warning_threshold:
  description: See [Communication Errors](#communication-errors) for a detailed description.
  required: false
  type: integer
{% endconfiguration %}

## Additional attributes

| Attribute        | Description                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| address          | Address of the current location, or `none`.                                                        |
| at_loc_since     | Date and time when first at current location (in UTC.)                                             |
| battery_charging | Device is charging (`true`/`false`.)                                                               |
| driving          | Device movement indicates driving (`true`/`false`.)                                                |
| last_seen        | Date and time when Life360 last updated device location (in UTC.)                                  |
| moving           | Device is moving (`true`/`false`.)                                                                 |
| place            | Name of Life360 Place where the device is located, or `none` if not located within one.            |
| raw_speed        | "Raw" speed value provided by Life360 server. (Units unknown.)                                     |
| speed            | Estimated speed of device (in MPH or KPH depending on Home Assistant's unit system configuration.) |
| wifi_on          | Device Wi-Fi is turned on (`true`/`false`.)                                                        |

## Filtering

For most users, filtering is not needed, and in such cases, the corresponding configuration variables should not be used.

However, in some circumstances, it might be helpful to limit which Life360 Circles and/or Members are used. For these cases [**circles**](#circles) and/or [**members**](#members) can be used.

**circles** can limit which Life360 Circles are used.

**members** can limit which Life360 Members will be tracked.

For a particular Member to be tracked, they must be included (or at least not excluded), and must be in at least one of the included Circles. See [example configuration](#circle-and-member-filtering-example) below.

Note that Life360's app and website typically only show Members' first names. However, you must use their _full_ names here. If you're not sure what a Member's full name (i.e., first and last) is in Life360, ask them. Alternatively, you can set the  [`logger`](/integrations/logger/) to `debug` and look in `home-assistant.log`. The full names of all Life360 Circles & Members will be logged.

## Home - Home Assistant vs. Life360

Normally Home Assistant device trackers are "Home" when they enter `zone.home`. Also, Life360 normally considers your device "Home" when it enters the Place that coincides with your home. Since the definitions of these areas can be different, this can lead to a disagreement between Home Assistant and Life360 as to whether or not you're "Home." To avoid this, make sure these two areas are defined the same -- i.e., same location and radius. (See next section.)

## Home Assistant Zones & Life360 Places

See [Zone documentation](/integrations/zone/#home-zone) for details about how Home Assistant zones are defined. If you'd like to create Home Assistant zones from Life360 Places (e.g., to make Home Assistant's `zone.home` be identical to Life360's "Home Place"), make sure `logger` is set to `debug`. Then when Home Assistant starts the details of all the Places defined in the included Circles will be written to `home-assistant.log` in a format that can be copied into your configuration under `zone:`. E.g., you would see something like this:

```text
2019-05-31 12:16:58 DEBUG (SyncWorker_3) [homeassistant.components.life360.device_tracker] My Family Circle: will be included, id=xxxxx
2019-05-31 12:16:58 DEBUG (SyncWorker_3) [homeassistant.components.life360.device_tracker] Circle's Places:
- name: Home
  latitude: XX.XXX
  longitude: YY.YYY
  radius: ZZZ
```

## Communication Errors

It is not uncommon for communication errors to occur between Home Assistant and the Life360 server. This can happen for many reasons, including Internet connection issues, Life360 server load, etc. However, in most cases, they are temporary and do not significantly affect the ability to keep device_tracker entities up to date.

Therefore, an optional filtering mechanism has been implemented to prevent inconsequential communication errors from filling the log, while still logging unusual error activity. Two thresholds are defined: [**warning_threshold**](#warning_threshold) and [**error_threshold**](#error_threshold). When a particular type of communication error happens on consecutive update cycles, it will not be logged until the number of occurrences reaches these thresholds. When the number reaches **warning_threshold** (but does not exceed **error_threshold**, and only if **warning_threshold** is defined), it will be logged as a WARNING. Once the number reaches **error_threshold**, it will be logged as an ERROR. Only two consecutive communication errors of a particular type will be logged as an ERROR, after which it will no longer be logged until it stops occurring and then happens again.

## Examples

### Typical configuration

```yaml
life360:
  # MPH, assuming imperial units.
  # If using metric (KPH), the equivalent would be 29.
  driving_speed: 18
  interval_seconds: 10
  max_gps_accuracy: 200
  max_update_wait:
    minutes: 45
  show_as_state:
    - driving
    - moving
  # Set comm error thresholds so first is not logged,
  # second is logged as a WARNING, and third and fourth
  # are logged as ERRORs.
  warning_threshold: 2
  error_threshold: 3
```

### Circle and Member Filtering Example

```yaml
life360:
  # Only track Members that are in these Circles.
  circles:
    include: [My Family, Friends]
  # But do not track this Member.
  members:
    exclude: John Doe
```

### Entering accounts in configuration

```yaml
life360:
  accounts:
    - username: LIFE360_USERNAME
      password: LIFE360_PASSWORD
```

### Example overdue update automations

{% raw %}

```yaml
automation:
  - alias: "Life360 Overdue Update"
    trigger:
      platform: event
      event_type: life360_update_overdue
    action:
      service: notify.email_me
      data:
        title: Life360 update overdue
        message: >
          Update for {{
            state_attr(trigger.event.data.entity_id, 'friendly_name') or
            trigger.event.data.entity_id
          }} is overdue.

  - alias: "Life360 Update Restored"
    trigger:
      platform: event
      event_type: life360_update_restored
    action:
      service: notify.email_me
      data:
        title: Life360 update restored
        message: >
          Update for {{
            state_attr(trigger.event.data.entity_id, 'friendly_name') or
            trigger.event.data.entity_id
          }} restored after {{ trigger.event.data.wait }}.
```

{% endraw %}

## Disclaimer

It does not appear that Life360 officially supports its REST API for use with other than its own apps. This integration is based on reverse engineering that has been done by the open source community, and an API token that was somehow discovered by the same community. At any time Life360 could disable that token or otherwise change its REST API such that this integration would no longer work.
