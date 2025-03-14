---
title: Google Calendar
description: Instructions on how to use Google Calendar in Home Assistant.
ha_category:
  - Calendar
ha_iot_class: Cloud Polling
ha_release: 0.33
ha_config_flow: true
ha_domain: google
ha_platforms:
  - calendar
  - diagnostics
ha_codeowners:
  - '@allenporter'
ha_integration_type: integration
google_dev_console_link: https://console.developers.google.com/apis/credentials
api: Google Calendar API
api_link: https://console.cloud.google.com/apis/library/calendar-json.googleapis.com
---

The *Google Calendar* integration allows you to connect your [Google Calendar](https://calendar.google.com) to Home Assistant. The integration adds calendar entities that are shown on the *Calendar* dashboard, and can be used for automations based on any event, or limited to specific matching criteria.

## Prerequisites

You need to configure developer credentials to allow Home Assistant to access your Google Account. The current recommended approach is to create *Web Auth* credentials for Google Calendar since
the same credentials work for all Google integrations. Previously, this integration only supported
*Device Auth* and those credentials are no longer recommended. You can continue to use *Device Auth*
credentials but they will only work with Google Calendar.

{% include integrations/google_client_secret.md %}

{% include integrations/config_flow.md %}

{% include integrations/google_oauth.md %}

## Troubleshooting

If the setup process fails and you see an error message such as *Authentication code expired, please try again* you may want to try the flow again. You may also check the logs for additional error messages that may indicate a misconfiguration such as an invalid client id or secret.

If you have an error with your credentials, you can delete them in the [application credentials](/integrations/application_credentials/) user interface.

### Video tutorial
This video tutorial explains how to set up Google Calendar in Home Assistant and how you can trigger an automation based on a calendar event.

<lite-youtube videoid="r2WbpxKDOD4" videotitle="How To Use Calendar Events in Home Assistant - Tutorial" posterquality="maxresdefault"></lite-youtube>

## Calendar entities

Each Google Calendar from *My Calendars* ([more info](https://support.google.com/calendar/answer/37095)) is represented as a [calendar](/integrations/calendar) entity in Home Assistant.

For example, your calendar named *Personal* is created as entity `calendar.personal`. You may rename an entity, or disable any entities which you don't need.

## Calendar event automations

Individual Calendar *Events* are what is powering automations such as:

- Turn on a light at the *start* of the event named *Front Yard Light*
- Send a notification *5 minutes before the start of any event*
- Stop the media player *30 minutes after* the *end* of the event named *Exercise*.

See [calendar automations](/integrations/calendar#automation) for an overview, and read more about [calendar trigger variables](/docs/automation/templating/#calendar) for the available information you can use in a condition or action such as the event `summary`, `description`, `location` and more.

## Calendar entity attributes

The calendar entity has additional attributes related to a single next upcoming event.

{% tip %}
Using the entity state and attributes is more error prone and less flexible than using Calendar Automations. The calendar entity itself may only track a single upcoming active event and can't handle multiple events with the same start time, or overlapping events.
{% endtip %}


{% details "Attributes" %}

- **all_day**: `true`/`false` if this is an all day event. Will be `false` if there is no event found.
- **message**: The event summary.
- **description**: The event description.
- **location**: The event location.
- **start_time**: Start time of event.
- **end_time**: End time of event.

{% enddetails %}

### Action `google.create_event`

You can use the `google.create_event` action to create a new calendar event in a calendar.

{% details "Create event action details" %}

{% note %}
This will only be available if you have given Home Assistant `read-write` access in configuration options.
{% endnote %}

A calendar `target` is selected with a [Target Selector](/docs/blueprint/selectors/#target-selector) and the `data` payload supports the following fields:

| Data attribute | Optional | Description                                         | Example             |
| ---------------------- | -------- | --------------------------------------------------- | ------------------- |
| `summary`              | no       | Acts as the title of the event.                     | Bowling             |
| `description`          | yes      | The description of the event.                       | Birthday bowling    |
| `start_date_time`      | yes      | The date and time the event should start.           | 2019-03-10 20:00:00 |
| `end_date_time`        | yes      | The date and time the event should end.             | 2019-03-10 23:00:00 |
| `start_date`           | yes      | The date the whole day event should start.          | 2019-03-10          |
| `end_date`             | yes      | The date the whole day event should end.            | 2019-03-11          |
| `in`                   | yes      | Days or weeks that you want to create the event in. | "days": 2           |
| `location`             | yes      | The location of the event.                          | Bowling center      |

{% important %}
You either use `start_date_time` and `end_date_time`, or `start_date` and `end_date`, or `in`.
{% endimportant %}

This is a full example of an action in YAML:

```yaml
action: google.create_event
target:
  entity_id: calendar.device_automation_schedules
data:
  summary: "Example"
  start_date: "2022-10-1"
  end_date: "2022-10-2"
```

{% enddetails %}

## More configuration


{% details "More Configuration" %}

{% warning %}
It is not recommended to new users to use these settings as they are not
compatible with other Home Assistant features, but this documentation is available
for existing users.
{% endwarning %}

The integration supports additional configuration from a file `google_calendars.yaml` which is available for existing users before version `2022.06`. This file is no longer automatically populated.

{% configuration %}
cal_id:
  description: The Google *generated* unique id for this calendar.
  required: true
  type: string
  default: "**DO NOT CHANGE THE DEFAULT VALUE**"
entities:
  description: Yes, you can have multiple sensors for a calendar!
  required: true
  type: list
  keys:
    device_id:
      description: >
        The name that all your automations/scripts
        will use to reference this device.
      required: true
      type: string
    name:
      description: What is the name of your sensor that you'll see in the frontend.
      required: true
      type: string
    search:
      description: If set will only trigger for matched events.
      required: false
      type: string
    offset:
      description: >
        A set of characters that precede a number in the event title
        for designating a pre-trigger state change on the sensor.
        This should be in the format of HH:MM or MM.
      required: false
      type: string
      default: "!!"
    ignore_availability:
      description: "Should we respect `free`/`busy` flags?"
      required: false
      type: boolean
      default: true
{% endconfiguration %}

{% enddetails %}
