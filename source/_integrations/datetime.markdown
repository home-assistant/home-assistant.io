---
title: Date/Time
description: Instructions on how to set up date/time entities within Home Assistant.
ha_category:
  - Date/Time
ha_release: '2022.12'
ha_domain: datetime
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The Date/Time integration is built for the controlling and monitoring of timestamps on devices.

Date/Time entities cannot be implemented manually, but can be provided by other integrations. If you are looking for a way to create a Date/Time entity, please take a look at the [Date/Time helper](/integrations/input_datetime).

## Services

### datetime services

Available services: `datetime.set_value`

### Service `datetime.set_value`

Set a new value for the datetime entity.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`'s of datetimes to control.
| `datetime` | yes | New datetime value to set. Cannot be combined with `timestamp`, `date`, or `time`.
| `timestamp` | yes | New datetime value to set. Cannot be combined with `datetime`, `date`, or `time`.
| `date` | yes | New date value to set. Cannot be combined with `datetime` or `timestamp`. If `time` is not specified, the existing time of the entity will be used.
| `time` | yes | New date value to set. Cannot be combined with `datetime` or `timestamp`. If `date` is not specified, the existing date of the entity will be used.
| `time_zone` | yes | Time zone of the `datetime` to set. If not provided, the time zone will be set to the time zone of the Home Assistant instance.

