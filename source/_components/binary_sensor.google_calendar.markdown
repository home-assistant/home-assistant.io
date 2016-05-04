---
layout: page
title: "Google Calendar Binary Sensor"
description: "Instructions how to use Google Calendars in Home Assistant."
date: 2016-05-04 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: google_calendar.png
ha_category: Binary Sensor
featured: true
---


This platform allows you to connect to your [Google Calendars](https://calendar.google.com)  and generate binary sensors. The sensors created can trigger based on any event on the calendar or only for matching events.

This component requires that you access your Home-Assistant installation with a fully qualified domain name. This is a condition of the Google OAuth API that they check you have a full domain name. It does not require your installation to be publically accessible, just have a full domain.

To integrate Google Calendar in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
google_calendar:
  track_new_calendar: no 
  fqdn: homeassistant.mnestor.dynamicdns.org
  scan_interval: 0
```

Configuration variables:

- **track_new_calendar** (*Optional*): Will automatically generate a binary sensor when a new calendar is detected. The system scans for new calendars on startup and every **scan_interval** By default this is set to `True`.

- **fqdn** (*Sometimes Optional*): *Sometimes* this is not required. If you have DNS setup properly on your router or system and can resolve you local network IP address to your fully qualified domain then this will not be required. Give it a try without it and it will let you know if you need to put it in there.

- **scan_interval** (*Optional*): How often in minutes do we look for new calendars. By default the system won't look for new calendars, except at startup, if this isn't set or is `null` or `0`. Recommendation is to leave this unset or set it to a really high number. There really is no need to contiually look for new calendars.

### {% linkable_title Installation Process %}
Installation of this component requires a bit of prep work. In order to get the most API requests per day you'll want to create a Project at the Google Developers Console
Steps:

1. Visit the [Google Developers Project Page](https://console.developers.google.com/iam-admin/projects) and click `Create Project`

2. In the popup give your Project a name so you'll know what it is at some future date. Such as `Home Assistant Calendar` and click Create

3. On the next page you will be taken to search for `Google Calendar API` and select it when it shows up.

4. Next `Enable` the api.

5. After a few seconds Google will give you a message that you need to create credentials. Go ahead and click `Go to Credentials`

6. Leave the first dropdown set to `Google Calendar API` and set the second one to `Web server (e.g. node.js, Tomcat)` then click `What credentials do I need?`

7. On the next screen you can change the name if you wish, it doesn't matter, but you will need to set the `Authorized redirect URIs`

8. This is the fully qualified domain name of your setup with `/auth/google_calendar` appended. So if you had the fqdn set above you would put `https://homeassistant.mnestor.dnamicdns.org:10540/auth/google_calendar/callback`

9. Click `Create client ID` and enter a name on the next screen. This is what you will see when you actually authenticate your Home-Assistant setup to Google.

10. You should now be at a stop it's asking you to `Download` a JSON file for your setup. Click `Download` and save this file to your `<config_dir>` as `google_calendar.conf`

11. Then click `Done` you're all set for that part.

12. If you waited till now to start Home-Assistant then skip this step. You should have the *Configurator* as a card asking you to configure `Google Calendar` go ahead and click that and the button in the popup to register that you have the JSON file in place.

13. You now have a *Link* card with a link to Authenticate to Google. Go click on it and allow your setup to read your Google Calendar

14. Your new browser tab should come back with Success and tell you to restart Home Assistatant. 

15. You're all setup!

Once you're setup and running the system will automically generate the file `<config_dir>/google_calendar_devices.yaml` and update it every **scan_interval** or at restarts. There are many more things you can have this component do by editing this file as you will see in the next section.

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

### {% linkable_title Sensor attributes %}

 - **time_till**: Number of minutes until the event state switches to `on`. Will be 0 all the rest of the time.

 - **offset**: If set in the event title and parsed out will be `on`/`off` once **time_till** is <= the number parsed from the event title. So the title `Very important meeting #Important #-10` would trigger this attribute to be `on` when **time_till** hit 10 minutes.

 - **all_day**: `True`/`False` if this is an all day event. Will be `False` if there is no event found.

 - **message**: The event title with the `search` and `offset` values extracted. So in the above example for **offset** the **message** would be set to `Very important meeting`


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
  value_template: '{{ states.google_calendar.freelancer_alarm.attributes.offset }}'
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
  platform: numeric_state
  entity_id: google_calendar.freelancer_alarm
  value_template: '{{ states.google_calendar.freelancer_alarm.attributes.time_till }}'
  below: 10
  above: 9
action:
  service: script.alarm_routine
```


