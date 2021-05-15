---
title: CalDAV
description: Instructions on how to integrate a WebDav calendar into Home Assistant.
ha_category:
  - Calendar
ha_iot_class: Cloud Polling
ha_release: '0.60'
ha_domain: caldav
ha_platforms:
  - calendar
---

The `caldav` platform allows you to connect to your WebDAV calendar and generate binary sensors. A different sensor will be created for each individual calendar, or you can specify custom calendars which match a criteria you define (more on that below). These sensors will be `on` if you have an on going event in that calendar or `off` if the event is later in time, or if there is no event at all. The WebDAV calendar get updated roughly every 15 minutes.

## Prerequisites

You need to have a CalDAV server and credentials for it. This integration was tested against [Baikal](http://sabre.io/baikal/) but any integration complying with the RFC4791 should work. [Nextcloud](https://nextcloud.com/) and [Owncloud](https://owncloud.org/) work fine.

You might need some additional system packages to compile the Python CalDAV library. On a Debian based system, install them by:

```bash
sudo apt-get install libxml2-dev libxslt1-dev zlib1g-dev
```

## Basic Setup

To integrate a WebDAV calendar in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for baikal
calendar:
  - platform: caldav
    username: john.doe@test.com
    password: !secret caldav
    url: https://baikal.my-server.net/cal.php/calendars/john.doe@test.com/default
```

```yaml
# Example configuration.yaml entry for nextcloud, calendars will be found automatically
calendar:
  - platform: caldav
    username: john.doe
    password: !secret caldav
    url: https://nextcloud.example.com/remote.php/dav
```

This example will generate default binary sensors for each calendar you have in your account. Those calendars will be `on` when there is an ongoing event and `off` if not. Events that last a whole day are ignored in those calendars. You have to setup custom calendars in order to take them into account or for advanced event filtering.

## Custom calendars

You have the possibility to create multiple binary sensors for events that match certain conditions.

```yaml
# Example configuration.yaml entry
calendar:
  - platform: caldav
    username: john.doe@test.com
    password: !secret caldav
    url: https://baikal.my-server.net/cal.php/calendars/john.doe@test.com/default
    custom_calendars:
      - name: "HomeOffice"
        calendar: "Agenda"
        search: "HomeOffice"
      - name: "WarmupFlat"
        calendar: "Agenda"
        search: "Warmup"
```

This will create two binary sensors for the calendar name Agenda: "HomeOffice" and "WarmupFlat". Those sensors will be `on` if there is an ongoing event matching the regular expression specified in `search`. In custom calendars, events that last a whole day are taken into account.

Please note that if you use the `custom_calendars` option, only those calendars will be loaded. You cannot use `calendars` and `custom_calendars` in the same configuration.

{% configuration %}
url:
  required: true
  description: The full URL to your calendars.
  type: string
username:
  required: false
  description: Username for authentication.
  type: string
password:
  required: false
  description: Password for authentication.
  type: string
calendars:
  required: false
  description: List of the calendars to filter. Empty or absent means no filtering, i.e., all calendars will be added. It cannot be used if `custom_calender` option is used.
  type: list
custom_calendars:
  required: false
  description: Details on any custom binary sensor calendars you want to create. Using this will only load the custom calendars supplied. No other calendars will load.
  type: list
  keys:
    name:
      required: true
      description: The name of your custom calendar.
      type: string
    calendar:
      required: true
      description: The source calendar to search on.
      type: string
    search:
      required: true
      description: Regular expression for filtering the events based on the content of their summary, description or location.
      type: string
days:
  required: false
  description: Number of days for the search for upcoming appointments.
  default: 1
  type: integer
verify_ssl:
  description: Verify the SSL certificate or not. If using self-signed certificates, this usually needs to be set to "False".
  required: false
  type: boolean
  default: true
{% endconfiguration %}

## Sensor attributes

- **offset_reached**: If set in the event title and parsed out will be on/off once the offset in the title in minutes is reached. So the title Very important meeting !!-10 would trigger this attribute to be on 10 minutes before the event starts. This should be in the format of `HH:MM` or `MM`.
- **all_day**: `True/False` if this is an all day event. Will be `False` if there is no event found.
- **message**: The event title with the `search` values extracted. So in the above example for `offset_reached` the message would be set to Very important meeting
- **description**: The event description.
- **location**: The event Location.
- **start_time**: Start time of event.
- **end_time**: End time of event.

## Examples

All events of the calendars "private" and "holidays". Note that all day events are not included.

```yaml
# Example configuration.yaml entry for nextcloud
calendar:
  - platform: caldav
    url: https://nextcloud.example.com/remote.php/dav
    username: "me"
    password: !secret caldav
    calendars:
      - private
      - holidays
```

Full example with automation to wake up to music if not holiday. Prerequisite: you have a calendar named "work" where you create calendar entries containing "Holiday".

Custom calendar names are built from the main calendar + name of the custom calendar. Using the option of `'.*'` will load all calendar events.

```yaml
# configuration.yaml
calendar:
  - platform: caldav
    url: https://nextcloud.example.com/remote.php/dav
    username: "me"
    password: !secret caldav
    custom_calendars:
      - name: holiday
        calendar: work
        search: "Holiday"
      - name: vacation
        calendar: vacation
        search: ".*"

# automations.yaml
- id: wakeup
  alias: "worktime wakeup"
  trigger:
    platform: time
    at: "06:40:00"
  action:
  - service: media_player.media_play
    target:
      entity_id: media_player.bedroom
  condition:
  - condition: state
    entity_id: calendar.work_holiday
    state: "off"
```
