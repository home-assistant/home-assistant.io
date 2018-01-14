---
layout: page
title: "CalDav"
description: "Instructions on how to integrate a WebDav calendar into Home Assistant."
date: 2017-11-27 23:14
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Calendar
ha_iot_class: "Cloud Polling"
ha_release: "0.60"
---


The `caldav` platform allows you to connect to your WebDav calendar and generate binary sensors. A different sensor will be created for each individual calendar, or you can specify custom calendars which match a criteria you define (more on that below). These sensors will be `on` if you have an on going event in that calendar or `off` if the event is later in time, or if there is no event at all. The WebDav calendar get updated roughly every 10 minutes.

### {% linkable_title Prerequisites %}

You need to have a CalDav server and eventually credentials for it. This component was tested against [Baikal](http://sabre.io/baikal/) but any component complying with the RFC4791 should work.

You might need some additional system packages to compile the Python caldav library. On a Debian based system, install them by:

```bash
$ sudo apt-get install libxml2-dev libxslt1-dev zlib1g-dev
```

### {% linkable_title Basic Setup %}

To integrate a WebDav calendar in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
calendar:
  - platform: caldav
    url: https://baikal.my-server.net/cal.php/calendars/john.doe@test.com/default
```

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
  description: List of the calendars to filter. Empty or absent means no filtering.
  type: list
custom_calendars:
  required: false
  description: Details on any custom binary sensor calendars you want to create.
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
      pending_charges: Regular expression for filtering the events
      type: string
{% endconfiguration %}


### {% linkable_title Sensor attributes %}

 - **offset_reached**: If set in the event title and parsed out will be on/off once the offset in the title in minutes is reached. So the title Very important meeting !!-10 would trigger this attribute to be on 10 minutes before the event starts.
 - **all_day**: `True/False` if this is an all day event. Will be `False` if there is no event found.
 - **message**: The event title with the `search` values extracted. So in the above example for `offset_reached` the message would be set to Very important meeting
 - **description**: The event description.
 - **location**: The event Location.
 - **start_time**: Start time of event.
 - **end_time**: End time of event.

### {% linkable_title Sensor attributes %}

```yaml
# Example configuration.yaml entry
calendar:
  - platform: caldav
    url: https://baikal.my-server.net/cal.php/calendars/john.doe@test.com/default
    username: john.doe@test.com
    password: !secret caldav
    custom_calendars:
      - name: 'HomeOffice'
        calendar: 'Agenda'
        search: 'HomeOffice'
```
