---
title: "Google Calendar Event"
description: "Instructions on how to use Google Calendars in Home Assistant."
ha_category:
  - Calendar
ha_iot_class: Cloud Polling
ha_release: 0.33
ha_domain: google
---

The `google` calendar platform allows you to connect to your
[Google Calendars](https://calendar.google.com) and generate binary sensors.
The sensors created can trigger based on any event on the calendar or only for
matching events. When you first setup this integration it will generate a new
configuration file `google_calendars.yaml` in your configuration directory that will contain information about
all of the calendars you can see.
It also exposes a service to add an event to one of your Google Calendars.

## Prerequisites

Generate a Client ID and Client Secret on
[Google Developers Console](https://console.developers.google.com/start/api?id=calendar).

1. First go to the [Google Developers Console](https://console.developers.google.com/start/api?id=calendar)
1. The wizard will ask you to choose a project to manage your application. Select a project and click continue.
1. Verify that your calendar API was enabled and click 'Go to credentials'
1. When it gets to the Page titled _Add credentials to your project_ just click cancel.
1. Navigate to APIs & Services (left sidebar) > Credentials
1. Click on the field on the right of the screen, 'CONFIGURE CONSENT SCREEN', select "External" and create.
1. Set the 'Application Name' (the name of the application asking for consent) to anything you want. We suggest "Home-Assistant".
1. You then need to select a `Support email`. To do this, simply click the drop down box and select your email address.
1. You finally need to complete the section: `Developer contact information`. To do this, simply enter your email address (same as above is fine).
1. Scroll to the bottom and click `save`. (You don't have to fill out anything else)
1. You will then be automatically taken to the OAuth consent screen, you do not need to add any scopes here so click `SAVE AND CONTINUE` to move to the `Test users` page. You will need to add the Gmail address you will be using with this integration as a test user before you will be allowed to use the API. Once you have added your email address under `Test users` click `SAVE AND CONTINUE` which will take to to the 'Summary' page (you do not need to do anything here).
1. Click Credentials in the menu on the left hand side of the screen, then click `+ Create credentials` (at the top of the screen), then select `OAuth client ID`.
1. Set the Application type to `TV and Limited Input` and give this credential set a name (like "Home Assistant Credentials") then click 'Create'.
1. You will then be presented with a pop-up saying 'OAuth client created' showing `Your Client ID` and `Your Client Secret`. Make a note of these (for example, copy and paste them into a text editor) as you will need to put these in your `configuration.yaml` file shortly. Once you have noted these strings, click `OK`. If you need to find these credentials again at any point then simply nagivate to `APIs & Services` > `Credentials` and you will see `Home Assistant Credentials` (or whatever you named them in the previous step) under `OAuth 2.0 Clident IDs`. To view both the `Client ID` and `Client secret`, click on the pencil icon, this will take you to the settings page for these credentials and the information will be on the right hand side of the page.
1. We need to double check that the "Google Calendar API" has been automatically enabled. To do this, select `Library` from the menu, then search for "Google Calendar API". If it is enabled you will see `API Enabled` with a green tick next to it. If it is not enabled, then enable it.


If you will later be adding more scopes than just the "Google Calendar API" to the OAuth for this application, you will need to delete your token file under your Home Assistant Profile. You will lose your refresh token due to the re-authenticating to add more API access. It's recommended to use different authorizations for different pieces of Google.

## Troubleshooting

If you are trying to switch to a new Google account then you would run into the following error message. Make sure to delete the existing **.google.token** file from your `config` folder and restart Home Assistant to try again.

'oauth2client.client.HttpAccessTokenRefreshError: deleted_client: The OAuth client was deleted'

## Configuration

To integrate Google Calendar in Home Assistant,
add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
google:
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
```

{% configuration %}
client_id:
  description: Use the client ID you generated in the Prerequisites stage.
  required: true
  type: string
client_secret:
  description: Use the client secret you generated in the Prerequisites stage.
  required: true
  type: string
track_new_calendar:
  description: >
    Will automatically generate a binary sensor when a new calendar
    is detected. The system scans for new calendars only on startup.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

The next time you run or restart Home Assistant, you should find a new notification (the little bell icon in the lower-left corner). Click on that notification it will give you a link and an authentication code. Click on that link to open a Google website where you should enter the code found in the notification (**NOTE**: You may get a message telling you that the API has not been verified and you will need to acknowledge that in order to proceed). This will grant your Home Assistant service read-only access to all the Google Calendars that the account you authenticate with can read.

## Calendar Configuration

With every restart all calendars of the configured Google account will get pulled and added to the `google_calendars.yaml` and preconfigured as a single entity. By setting the 'track' variable to `true` the calendar will get monitored for new events which can be used for automations and it's content is shown on the 'Calendar' dashboard (mind 'max_results' is set to 5 by default).

A basic entry for a single calendar looks like:

```yaml
- cal_id: "*****@group.calendar.google.com"
  entities:
  - device_id: test_everything
    name: Give me everything
    track: true
    max_results: 10
```

From this we will get a binary sensor `calendar.test_everything` triggered by any event on the calendar and will show the next 10 events on the 'Calendar' dashboard.

A bit more elaborate configuration:

```yaml
- cal_id: "*****@group.calendar.google.com"
  entities:
  - device_id: test_unimportant
    name: UnImportant Stuff
    track: true
    search: "#UnImportant"
  - device_id: test_important
    name: Important Stuff
    track: true
    search: "#Important"
    offset: "!!"
```

From this we will end up with the binary sensors `calendar.test_unimportant` and `calendar.test_important` which will toggle themselves on/off based on events on the same calendar that match the search value set for each.
`calendar.test_unimportant` will toggle for events whose title contain '#UnImportant'
`calendar.test_important` will toggle for events whose title contain '#Important'. By using the offset variable an event title containing "#Important !!-10" will toggle the sensor 10 minutes before the event starts.

<div class='note warning'>

If you use a `#` sign for `search` then wrap the whole search term in quotes.
Otherwise everything following the hash sign would be considered a YAML comment.

</div>

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
    track:
      description: "Should we create a sensor `true` or ignore it `false`?"
      required: true
      type: boolean
      default: true
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
    max_results:
      description: "Max number of entries to retrieve"
      required: false
      type: integer
      default: 5
{% endconfiguration %}



### Sensor attributes

 - **offset_reached**: If set in the event title and parsed out will be `on`/`off` once the offset in the title in minutes is reached. So the title `Very important meeting #Important !!-10` would trigger this attribute to be `on` 10 minutes before the event starts.
 - **all_day**: `true`/`false` if this is an all day event. Will be `false` if there is no event found.
 - **message**: The event title with the `search` and `offset` values extracted. So in the above example for **offset_reached** the **message** would be set to `Very important meeting`
 - **description**: The event description.
 - **location**: The event Location.
 - **start_time**: Start time of event.
 - **end_time**: End time of event.

### Service `google.add_event`

You can use the service `google.add_event` to create a new calendar event in a calendar. Calendar id's can be found in the file `google_calendars.yaml`. All dates and times are in your local time, the integration gets your time zone from your `configuration.yaml` file.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `calendar_id` | no | The id of the calendar you want. | *****@group.calendar.google.com
| `summary` | no | Acts as the title of the event. | Bowling
| `description` | yes | The description of the event. | Birthday bowling
| `start_date_time` | yes | The date and time the event should start. | 2019-03-10 20:00:00
| `end_date_time` | yes | The date and time the event should end. | 2019-03-10 23:00:00
| `start_date` | yes | The date the whole day event should start. | 2019-03-10
| `end_date` | yes | The date the whole day event should end. | 2019-03-11
| `in` | yes | Days or weeks that you want to create the event in. | "days": 2

<div class='note'>

You either use `start_date_time` and `end_date_time`, or `start_date` and `end_date`, or `in`.

</div>

## Using calendar in automations

A calendar can be used as an external scheduler for special events or reoccurring events instead of hardcoding them in automations.

Trigger as soon as an event starts:

```yaml
    trigger:
      platform: state
      entity_id: calendar.calendar_name
      to: "on"
```

By using specific text in the event title, you can set conditions to initiate particular automation flows on designated events while other events will be ignored.

For example, the actions following this condition will only be executed for events named 'vacation':

{% raw %}

```yaml
    condition:
      - condition: state
        entity_id: calendar.calendar_name
        state: vacation
        attribute: message
```

{% endraw %}
