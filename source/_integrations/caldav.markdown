---
title: CalDAV
description: Instructions on how to integrate a WebDav calendar into Home Assistant.
ha_category:
  - Calendar
  - To-do List
ha_iot_class: Cloud Polling
ha_release: '0.60'
ha_domain: caldav
ha_platforms:
  - calendar
  - todo
ha_integration_type: integration
ha_config_flow: true
related:
  - docs: /integrations/todo
    title: To-do list integration documentation
  - docs: /integrations/#to-do-list
    title: List of to-do list integrations
  - docs: /dashboards/todo-list/
    title: To-do list card
  - docs: /integrations/calendar
    title: Calendar
  - docs: /docs/configuration/
    title: Configuration file
---

The **CalDAV** integration allows you to connect your WebDAV calendar to Home Assistant
as one of these entity types:

- A [calendar](/integrations/calendar) entity which can be used to trigger automations based on the start or end of an event using criteria such as the event name or description.
- A [todo](/integrations/todo) entity which tracks the number of active items
on the to-do list.

The WebDAV entities are updated roughly every 15 minutes.

{% include integrations/config_flow.md %}

During the configuration flow you will be asked for the CalDAV server and credentials
for it. An example CalDAV URL is `https://caldav.icloud.com/`.

This integration was tested against the following systems, but any other complying with the RFC4791 should work:

- [Baikal](https://sabre.io/baikal/)
- [iCloud Calendar](https://www.icloud.com/calendar/)
- [Nextcloud](https://nextcloud.com/)
- [Owncloud](https://owncloud.org/)
- [Synology Calendar](https://www.synology.com/en-us/dsm/feature/calendar)

## Manual configuration

You may also manually add a WebDAV calendar in Home Assistant by adding the following section to your {% term "`configuration.yaml`" %} file. This method does not support to-do lists. 
{% include integrations/restart_ha_after_config_inclusion.md %}

{% details "Manual configuration examples" %}

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

```yaml
# Example configuration.yaml entry for Radicale, calendars will be found automatically
calendar:
  - platform: caldav
    username: john.doe
    password: !secret caldav
    url: https://radicale.example.com/
```

```yaml
# Example configuration.yaml entry for iCloud, calendars will be found automatically
calendar:
  - platform: caldav
    username: !secret userIcloud
    password: !secret passIcloud
    url: https://caldav.icloud.com
```

All day events are not supported by default when configured using yaml.

The examples below create calendar entities that match specific search criteria.

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

This will create two entities for the calendar name Agenda: "HomeOffice" and "WarmupFlat" with events matching the regular expression specified in `search`. In custom calendars, events that last a whole day are taken into account.

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
  description: Details on any custom calendars you want to create. Using this will only load the custom calendars supplied. No other calendars will load.
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

{% enddetails %}

## Calendar Event Automations

Individual Calendar *Events* can power automations such as:

- Turn on a light at the *start* of the event named *Front Yard Light*
- Send a notification *5 minutes before the start of any event*
- Stop the media player *30 minutes after* the *end* of the event named *Exercise*.

See [Calendar Automations](/integrations/calendar#automation) for an overview, and read more about [Calendar Trigger Variables](/docs/automation/templating/#calendar) for the available information you can use in a condition or action such as the event `summary`, `description`, `location` and more.

## Calendar Entity Attributes

The calendar entity has additional attributes related to a single next upcoming event.

{% tip %}
Using the entity state and attributes is more error prone and less flexible than using Calendar Automations. The calendar entity itself may only track a single upcoming active event and can't handle multiple events with the same start time, or overlapping events.
{% endtip %}

- **offset_reached**: If set in the event title and parsed out will be on/off once the offset in the title in minutes is reached. So the title Very important meeting `!! -10` would trigger this attribute to be on 10 minutes before the event starts. This should be in the format of `HH:MM` or `MM`. This attribute is not available when configured from the UI.
- **all_day**: `True/False` if this is an all day event. Will be `False` if there is no event found.
- **message**: The event title with the `search` values extracted. So in the above example for `offset_reached` the message would be set to Very important meeting
- **description**: The event description.
- **location**: The event Location.
- **start_time**: Start time of event.
- **end_time**: End time of event.

## To-do Entity

The todo entity is the number of incomplete items on the to-do list. See the
[todo integration](/integrations/todo) documentation for details and available
actions that can be used in automations.

## Troubleshooting

{% details "Home Assistant Core Installations" %}

You might need some additional system packages to compile the Python CalDAV library. On a Debian based system, install them by:

```bash
sudo apt-get install libxml2-dev libxslt1-dev zlib1g-dev
```

{% enddetails %}

{% details "iCloud" %}

You may be required to use [app specific passwords](https://support.apple.com/en-us/102654)
to generate a new password for use by Home Assistant to avoid sharing your iCloud account
password.

{% enddetails %}
