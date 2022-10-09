---
title: Google Calendar
description: Instructions on how to use Google Calendars in Home Assistant.
ha_category:
  - Calendar
ha_iot_class: Cloud Polling
ha_release: 0.33
ha_config_flow: true
ha_domain: google
ha_platforms:
  - calendar
ha_codeowners:
  - '@allenporter'
ha_integration_type: integration
---

The Google integration allows you to connect to your [Google Calendars](https://calendar.google.com) to Home Assistant. The integration adds calendar entities that are shown on the *Calendar* dashboard, and can be used for automations based on any event, or limited to specific matching criteria.

## Prerequisites

You need to configure developer credentials to allow Home Assistant to access your Google Account.

{% details "Generate Client ID and Client Secret" %}

This section explains how to generate a Client ID and Client Secret on
[Google Developers Console](https://console.developers.google.com/start/api?id=calendar).

1. First go to the [Google Developers Console](https://console.developers.google.com/start/api?id=calendar)
1. The wizard will ask you to choose a project to manage your application. Select a project and click continue.
1. Verify that your calendar API was enabled and click 'Go to credentials'
1. Navigate to APIs & Services (left sidebar) > [Credentials](https://console.cloud.google.com/apis/credentials)
1. Click on the field on the left of the screen, **OAuth Consent Screen**.
1. Select **External** and **Create**.
1. Set the *App Name* (the name of the application asking for consent) to anything you want e.g.  *Home Assistant*.
1. You then need to select a *Support email*. To do this, simply click the drop down box and select your email address.
1. You finally need to complete the section: *Developer contact information*. To do this, simply enter your email address (same as above is fine).
1.  Scroll to the bottom and click **Save and Continue**. Don't have to fill out anything else or it may enable additional review.
1.  You will then be automatically taken to the Scopes page. You do not need to add any scopes here so click Save and Continue to move to the Optional info page. You do not need to add anything to the Optional info page so click Save and Continue which will take you to the Summary page. Click Back to Dashboard.
1.  Click **OAuth consent screen** again and set *Publish Status* to **Production** otherwise your credentials will expire every 7 days.
1.  Click **Credentials** in the menu on the left hand side of the screen, then click **Create credentials** (at the top of the screen), then select *OAuth client ID*.
1.  Set the Application type to *TV and Limited Input* and give this credential set a name (like "Home Assistant Credentials") then click **Create**.
1. You will then be presented with a pop-up saying *OAuth client created* showing *Your Client ID* and *Your Client Secret*. Make a note of these (for example, copy and paste them into a text editor) as you will need these shortly. Once you have noted these strings, click **OK**. If you need to find these credentials again at any point then simply navigate to *APIs & Services > Credentials* and you will see *Home Assistant Credentials* (or whatever you named them in the previous step) under *OAuth 2.0 Client IDs*. To view both the *Client ID* and *Client secret*, click on the pencil icon, this will take you to the settings page for these credentials and the information will be on the right hand side of the page.
1. Double check that the *Google Calendar API* has been automatically enabled. To do this, select **Library** from the menu, then search for *Google Calendar API*. If it is enabled you will see *API Enabled* with a green tick next to it. If it is not enabled, then enable it.

{% enddetails %}

{% include integrations/config_flow.md %}

The integration setup will next give you instructions to enter the [Application Credentials](/integrations/application_credentials/) (OAuth Client ID and Client Secret) and authorize Home Assistant to access your account and Calendars.


{% details "OAuth and Device Authorization steps" %}

1. The first step shows a link and a code.

    ![Screenshot of Link Account](/images/integrations/google/link_account.png)

1. Click on the link [https://www.google.com/device](https://www.google.com/device) to open a Google website which should open a new window where you can enter the code.

1. Home Assistant will wait for a short time while you complete the authorization steps, checking in the background for the authorization to be completed.

    ![Screenshot of Enter Code](/images/integrations/google/enter_code.png)

1. Continue through the steps of selecting the account you used when creating the credentials in the Google Developer Console.

1. **NOTE**: You may get a message telling you that the app has not been verified and you will need to acknowledge that in
order to proceed.

1. Depending on your `configuration.yaml`, you will either be granting Home Assistant *read only* or *read write* access
to all the Google Calendars available to your linked account.

1. You should then see a *Success!* message from Google.

    ![Screenshot of Device Connected](/images/integrations/google/device_connected.png)

1. You may close the window, and return back to Home Assistant where you should see a *Success!* message from Home Assistant.

    ![Screenshot of Success](/images/integrations/google/success.png)

{% enddetails %}

## Troubleshooting

If the setup process fails and you see an error message such as *Authentication code expired, please try again* you may want to try the flow again. You may also check the logs for additional error messages that may indicate a misconfiguration such as an invalid client id or secret.

If you have an error with your credentials you can delete them in the [Application Credentials](/integrations/application_credentials/) user interface.

## Calendar Entities

Each Google Calendar from *My Calendars* ([more info](https://support.google.com/calendar/answer/37095)) is represented as a [calendar](/integrations/calendar) entity in Home Assistant.

For example, your calendar named *Personal* is created as entity `calendar.personal`. You may rename an entity, or disable any entities which you don't need.

## Calendar Event Automations

Individual Calendar *Events* are what powering automations such as:

* Turn on a light at the *start* of the event named *Front Yard Light*
* Send a notification *5 minutes before the start of any event*
* Stop the media player *30 minutes after* the *end* of the event named *Exercise*.

See [Calendar Automations](/integrations/calendar#automation) for an overview, and read more about [Calendar Trigger Variables](/docs/automation/templating/#calendar) for the available information you can use in a condition or action such as the event `summary`, `description`, `location` and more.

## Calendar Entity Attributes

The calendar entity has additional attributes related to a single next upcoming event.

<div class='note'>

Using the entity state and attributes is more error prone and less flexible than using Calendar Automations. The calendar entity itself may only track a single upcoming active event and can't handle multiple events with the same start time, or overlapping events.

</div>


{% details "Attributes" %}

- **all_day**: `true`/`false` if this is an all day event. Will be `false` if there is no event found.
- **message**: The event summary.
- **description**: The event description.
- **location**: The event location.
- **start_time**: Start time of event.
- **end_time**: End time of event.

{% enddetails %}

### Service `google.create_event`

You can use the service `google.create_event` to create a new calendar event in a calendar.

{% details "Create Event Service details" %}

<div class='note'>

This will only be available if you have given Home Assistant `read-write` access in configuration options.

</div>

A calendar `target` is selected with a [Target Selector](/docs/blueprint/selectors/#target-selector) and the `data` payload supports the following fields:

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
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

This is a full example of service call in YAML:

```yaml
service: google.create_event
target:
  entity_id: calendar.device_automation_schedules
data:
  summary: "Example"
  start_date: "2022-10-1"
  end_date: "2022-10-2"
```

{% enddetails %}

## More Configuration


{% details "More Configuration" %}

<div class='note warning'>
It is not recommended to new users to use these settings as they are not
compatible with other Home Assistant features, but this documentation is available
for existing users.
</div>

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
