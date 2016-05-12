---
layout: page
title: "Google Calendar Event Sensor"
description: "Instructions how to use Google Calendars in Home Assistant."
date: 2016-05-04 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: google_calendar.png
ha_category: Web Services
featured: true
---


This platform allows you to connect to your [Google Calendars](https://calendar.google.com)  and generate binary sensors. The sensors created can trigger based on any event on the calendar or only for matching events.

### {% linkable_title Prerequisites %}

This component requires that you can access your Home-Assistant installation with a fully qualified domain name. This is a condition of the Google OAuth API that they check you have a full domain name. It does not require your installation to be publically accessible, just have a full domain. The easy way to do this is:

1. Modify you local hosts file:
    Windows: C:\Windows\System32\Drivers\etc\hosts
    Linux: /etc/hosts
    OSX: /private/etc/hosts

2. Create an entry if one does not exist for your local system IP and a fake fully qualified domain name
    eg. `192.168.0.100 ha.localnetwork.com`

3. Modify your Home-Assistant config file

4. You will need the `http` section with the following

```yaml
http:
  server_host: ha.localnetwork.com
```

### {% linkable_title Basic Setup %}

To integrate Google Calendar in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
google_calendar:
  track_new_calendar: no 
```

Configuration variables:

- **track_new_calendar** (*Optional*): Will automatically generate a binary sensor when a new calendar is detected. The system scans for new calendars on startup. By default this is set to `True`.

### {% linkable_title Installation Process %}
Installation of this component requires a bit of prep work. In order to get the most API requests per day you'll want to create a Project at the Google Developers Console
Steps:

1. Complete [Step 1](https://developers.google.com/google-apps/calendar/quickstart/python#step_1_turn_on_the_api_name) to turn on Google Calendar API
    - _Where will you be calling the API from?_: 
      - Web server (e.g. node.js, Tomcat)

    - _What data will you be accessing?_: 
      - User data

    - _Authorized redirect URIs_: 
      - http`s`://`<domain from Prerequisites>`:`<port>`/auth/google_calendar/callback

    - For Step (g.) rename it to `google_calendar.conf` and put it in your `<config_dir>`

2. If you haven't started Home-Assistant skip this step
    Click `I have created the JSON file` in the Configurator for `Google Calendar OAuth Setup`

3. Now you will have a Configurator entry for `Google Calendar Authentication` go ahead and configure it and `Login to Google`

4. You're all setup!

Once you're setup and running the system will automically generate the file `<config_dir>/google_calendar_devices.yaml` and update it every **scan_interval** or at restarts. There are many more things you can have this component do by editing this file as you will see in the next section.

### {% linkable_title Sensor attributes %}

 - **offset_reached**: If set in the event title and parsed out will be `on`/`off` once the offset in the title in minutes is reached. So the title `Very important meeting #Important #-10` would trigger this attribute to be `on` 10 minutes before the event starts.

 - **all_day**: `True`/`False` if this is an all day event. Will be `False` if there is no event found.

 - **message**: The event title with the `search` and `offset` values extracted. So in the above example for **offset_reached** the **message** would be set to `Very important meeting`

 - **description**: The event description.

 - **location**: The event Location.

 - **start_time**: Start time of event.

 - **end_time**: End time of event.

### {% linkable_title Calendar Configuration %}
Editing `google_calendar_devices.yaml`

A basic entry for a single calendar looks like

```yaml
c379a36a72dc93de3bce26b627af0966ec88089abde13045b739613b:
  name: "Maggie"
  cal_id: "***************************@group.calendar.google.com"
  entities:
  - name: Maggie
    search:
    track: True
```

Variables:

- **name**: The name of your calendar from Google. Change this if you want, it's not used for anything except to help you know which calendar is which in this file.

- **cal_id**: The Google generated unique id for this calendar. **DO NOT CHANGE**

- **entities**: Yes, you can have multiple sensors for a calendar!

  - **name**: What is the name of your sensor
  
  - **search**: If set will only trigger for matched events
  
  - **track**: Should we create a sensor `True` or ignore it `False`?
  
  - **offset**: (*Optional*) A set of characters that preceed a number in the event title for desginating a pre-trigger state change on the sensor. (Default: `#-`)
  
From this we will end up with the binary sensor `google_calendar.maggie` which will toggle itself on/off based on events on the calendar.

But what if you only wanted it to toggle based on events that had the keyword `Vacation` or even better the tag `#Vacation`? Just set a value for `search`.
**Note**: If you use a `#` sign for search then wrap it up. It's better to be safe!

### {% linkable_title Examples %}

#### Basic alarm avoidance

Lets start with you use your Home-Assistant system for an alarm clock but don't want it to go off when you don't work that day or you want the alarm to go off a little later in the day.

What would this look like with only 1 calendar?

```yaml
c379a36a72dc93de3bce26b627af0966ec88089abde13045b739613b:
  name: "Alarm Avoidance"
  cal_id: "***************************@group.calendar.google.com"
  entities:
  - name: Day Off Work
    search: "#DayOff"
    track: True
  - name: Late Alarm
    search: "#LateAlarm"
    track: True
```

You'll notice that I avoided using spaces in the search terms. If you want to use spaces then you'll need to surround the search in quotes. Sorry but this author has no idea how to get quotes in there that aren't parsed in yaml yet.

What the above will create is 2 sensors

1. `google_calendar.day_off_work`

2. `google_calendar.late_alarm`

The sensors will only show the next event that matches their respective search term.

That you can easily put in your automation as a condition to fire only when off.

#### The Freelancer alarm clock

What is this alarm stuff? I'm a freelancer and can sleep all day if I want? Though I have had times where I forgot to set an alarm so I could wake up in time for a meeting...

```yaml
c379a36a72dc93de3bce26b627af0966ec88089abde13045b739613b:
  name: "Meetings"
  cal_id: "***************************@group.calendar.google.com"
  entities:
  - name: Freelancer Alarm
    search: "#Important"
    track: True
    offset: "#-"  # This is the default but here for the example
```
 
Okay... So how is it the alarm going to fire giving me enough time to wake up?

Automation:

```yaml
alias: Freelancer Alarm
trigger:
  platform: template
  value_template: '{{ states.google_calendar.freelancer_alarm.attributes.offset_reached }}'
action:
  service: script.alarm_routine
```

So how does it work?

You have a meeting at 08:00 so you create/accept the meeting invite. Just remember to edit the title of it to include `#Important` *and* `#-10` this will set the offset to 10 minutes. So 10 minutes before the event is going to be in the `on` state the `offset` attribute will go to the `on` state and trigger the above automation.

#### The Freelancer Alarm - Revisited
All that's too much! It should just know to fire `script.alarm_routine` 10 minute before any event on my calendar.

Oy! You certainly do have some requirements there! No problem we can handle it! You can go ahead and remove the `search` and `offset` settings for the calendar so the sensor captures every event.

Next the automation should change to

```yaml
alias: Freelancer Alarm
trigger:
  platform: calendar
  entity_id: google_calendar.freelancer_alarm
  offset: '-00:10'
action:
  service: script.alarm_routine
```

### {% linkable_title Scanning for new Calendars %}
This shouldn't really be needed but if you do. Just create an automation to periodically search for them:

```yaml
alias: "Search for new Calendars every 4 hours"
trigger:
  platform: time
  hours: /4
  minutes: 0
  seconds: 0
action:
  service: zwave.heal_network
``` 
