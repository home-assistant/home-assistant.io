---
layout: page
title: "Outlook Calendar Event"
description: "Instructions how to use Outlook Calendars in Home Assistant."
date: 2017-09-25 21:25
---


This platform allows you to connect to your [Outlook Calendars](https://outlook.live.com/owa/?path=/calendar) and generate binary sensors. The sensors created can trigger based on any event on the calendar or only for matching events. When you first setup this component it will generate a new configuration file *google_calendars.yaml* that will contain information about all of the calendars you can see.

### {% linkable_title Prerequisites %}

Generate a Client ID and Client Secret on [Microsoft Application Registration Portal](https://apps.dev.microsoft.com/portal/register-app).

1. Follow the wizard
1. Click _Generate new password_ to generate the client_secret
1. Add a new _Web_ platform using the _New platform_ button
1. Set the _Redirect URL_ to 'http://localhost:8123/api/outlook/callback'
1. Add 'Calendars.Read' to the _Microsoft Graph Permissions_

### {% linkable_title Basic Setup %}

To integrate Google Calendar in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
calendar:
  platform: outlook
  client_id: *Value_created_from_steps_above*
  client_secret: *Value_created_from_steps_above*
```

Configuration variables:

- **client_id** (*Required*): Use the value you generated in the Prerequisites stage.
- **client_secret** (*Required*): Use the value you generated in the Prerequisites stage.

### {% linkable_title Calendar Configuration %}
Editing `outlook_calendars.yaml`

A basic entry for a single calendar looks like:

```yaml
- cal_id: "***************************"
  entities:
  - device_id: test
    name: Test
    track: true
```

Variables:

- **cal_id**: The Outlook generated unique id for this calendar. **DO NOT CHANGE**

- **entities**: Yes, you can have multiple sensors for a calendar!

  - **device_id**: (*Required*): The name that all your automations/scripts will use to reference this device.
  
  - **name**: (*Required*): What is the name of your sensor that you'll see in the frontend.
  
  - **track**: (*Required*): Should we create a sensor `True` or ignore it `False`?
  
From this we will end up with the binary sensor `calendar.test` which will toggle itself on/off based on events on the calendar.

### {% linkable_title Sensor attributes %}

 - **all_day**: `True`/`False` if this is an all day event. Will be `False` if there is no event found.

 - **message**: The event title with the `search` and `offset` values extracted. So in the above example for **offset_reached** the **message** would be set to `Very important meeting`

 - **description**: The event description.

 - **location**: The event Location.

 - **start_time**: Start time of event.

 - **end_time**: End time of event.
