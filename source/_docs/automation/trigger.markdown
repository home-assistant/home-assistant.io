---
title: "Automation Trigger"
description: "All the different ways how automations can be triggered."
---

## What are triggers

Triggers are what starts the processing of an automation rule. When _any_ of the automation's triggers becomes true (trigger _fires_), Home Assistant will validate the [conditions](/docs/automation/condition/), if any, and call the [action](/docs/automation/action/).

An automation can be triggered by an event, with a certain entity state, at a given time, and more. These can be specified directly or more flexible via templates. It is also possible to specify multiple triggers for one automation.

The following sections introduce all trigger types and further details to get started.

## Trigger variables

Similar to [script level variables](/integrations/script/#variables), `trigger_variables` will be available in trigger templates with the difference that only [limited templates](/docs/configuration/templating/#limited-templates) can  be used to pass a value to the trigger variable.

## Event trigger

Fires when an event is being received. Events are the raw building blocks of Home Assistant. You can match events on just the event name or also require specific event data or context to be present.

Events can be fired by integrations or via the API. There is no limitation to the types. A list of built-in events can be found [here](/docs/configuration/events/).

```yaml
automation:
  trigger:
    - platform: event
      event_type: "MY_CUSTOM_EVENT"
      # optional
      event_data:
        mood: happy
      context:
        user_id:
        # any of these will match
          - "MY_USER_ID"
          - "ANOTHER_USER_ID"
```

It is also possible to listen for multiple events at once. This is useful for
event that contain no, or similar, data and contexts.

```yaml
automation:
  trigger:
    - platform: event
      event_type:
        - automation_reloaded
        - scene_reloaded
```

It's also possible to use [limited templates](/docs/configuration/templating/#limited-templates) in the `event_type`, `event_data` and `context` options.

<div class='note'>

The `event_type`, `event_data` and `context` templates are only evaluated when setting up the trigger, they will not be reevaluated for every event.

</div>

{% raw %}

```yaml
automation:
  trigger_variables:
    sub_event: ABC
    node: ac
    value: on
  trigger:
    - platform: event
      event_type: "{{ 'MY_CUSTOM_EVENT_' ~ sub_event }}"
```

{% endraw %}

## Home Assistant trigger

Fires when Home Assistant starts up or shuts down.

```yaml
automation:
  trigger:
    - platform: homeassistant
      # Event can also be 'shutdown'
      event: start
```

## MQTT trigger

Fires when a specific message is received on given MQTT topic. Optionally can match on the payload being sent over the topic. The default payload encoding is 'utf-8'. For images and other byte payloads use `encoding: ''` to disable payload decoding completely.

```yaml
automation:
  trigger:
    - platform: mqtt
      topic: "living_room/switch/ac"
      # Optional
      payload: "on"
      encoding: "utf-8"
```

The `payload` option can be combined with a `value_template` to process the message received on the given MQTT topic before matching it with the payload.
The trigger in the example below will trigger only when the message received on `living_room/switch/ac` is valid JSON, with a key `state` which has the value `"on"`.

{% raw %}

```yaml
automation:
  trigger:
    - platform: mqtt
      topic: "living_room/switch/ac"
      payload: "on"
      value_template: "{{ value_json.state }}"
```

{% endraw %}

It's also possible to use [limited templates](/docs/configuration/templating/#limited-templates) in the `topic` and `payload` options.

<div class='note'>

The `topic` and `payload` templates are only evaluated when setting up the trigger, they will not be re-evaluated for every incoming MQTT message.

</div>

{% raw %}

```yaml
automation:
  trigger_variables:
    room: "living_room"
    node: "ac"
    value: "on"
  trigger:
    - platform: mqtt
      topic: "{{ room ~ '/switch/' ~ node}}"
      # Optional
      payload: "{{ 'state:' ~ value }}"
      encoding: "utf-8"
```

{% endraw %}

## Numeric state trigger

Fires when the numeric value of an entity's state (or attribute's value if using the `attribute` property) crosses a given threshold. On state change of a specified entity, attempts to parse the state as a number and fires if the value is changing from above to below or from below to above the given threshold.

{% raw %}

```yaml
automation:
  trigger:
    - platform: numeric_state
      entity_id: sensor.temperature
      # Optional
      value_template: "{{ state.attributes.battery }}"
      # At least one of the following required
      above: 17
      below: 25
      # If given, will trigger when the value of the given attribute for the given entity changes
      attribute: attribute_name
      # If given, will trigger when the condition has been true for X time; you can also use days and milliseconds.
      for:
        hours: 1
        minutes: 10
        seconds: 5
```

{% endraw %}

<div class='note'>
Listing above and below together means the numeric_state has to be between the two values.
In the example above, the trigger would fire a single time if a numeric_state goes into the 17.1-24.9 range (from 17 and below or 25 and above). It will only fire again, once it has left the defined range and enters it again.
</div>

Number helpers (`input_number` entities) can be used in the `above` and `below` thresholds, making
the trigger more dynamic, like:

```yaml
automation:
  trigger:
    - platform: numeric_state
      entity_id: sensor.temperature
      # input_number entity id can be specified for above and/or below thresholds
      above: input_number.temperature_threshold_high
      below: input_number.temperature_threshold_low
```

The `for:` can also be specified as `HH:MM:SS` like this:

{% raw %}

```yaml
automation:
  trigger:
    - platform: numeric_state
      entity_id: sensor.temperature
      # Optional
      value_template: "{{ state.attributes.battery }}"
      # At least one of the following required
      above: 17
      below: 25

      # If given, will trigger when condition has been for X time.
      for: "01:10:05"
```

{% endraw %}

You can also use templates in the `for` option.

{% raw %}

```yaml
automation:
  trigger:
    - platform: numeric_state
      entity_id:
        - sensor.temperature_1
        - sensor.temperature_2
      above: 80
      for:
        minutes: "{{ states('input_number.high_temp_min')|int }}"
        seconds: "{{ states('input_number.high_temp_sec')|int }}"
  action:
    - service: persistent_notification.create
      data:
        message: >
          {{ trigger.to_state.name }} too high for {{ trigger.for }}!
```

{% endraw %}

The `for` template(s) will be evaluated when an entity changes as specified.

## State trigger

Fires when the state of any of given entities changes. If only `entity_id` is given, the trigger will fire for all state changes, even if only state attributes change.
If only one of `from_state` or `to_state` are given, the trigger will fire on any matching state change, but not if only attributes change.

<div class='note'>

The values you see in your overview will often not be the same as the actual state of the entity. For instance, the overview may show `Connected` when the underlying entity is actually `on`. You should check the state of the entity by looking in the _States_ menu under _Developer tools_.

</div>

```yaml
automation:
  trigger:
    - platform: state
      entity_id:
        - device_tracker.paulus
        - device_tracker.anne_therese
      # Optional
      from: "not_home"
      # Optional
      to: "home"
```

It's possible to give a list of from_states or to_states:

```yaml
automation:
  trigger:
    - platform: state
      entity_id: vacuum.test
      from:
        - "cleaning"
        - "returning"
      to: "error"
```

### Holding a state

You can use `for` to have the state trigger only fire if the state holds for some time.

This example fires, when the entity state changed to `"on"` and holds that
state for 30 seconds:

```yaml
automation:
  trigger:
    - platform: state
      entity_id: light.office
      # Must stay "on" for 30 seconds
      to: "on"
      for: "00:00:30"
```

Please note, that when holding a state, changes to attributes are ignored and
do not cancel the hold time.

You can also fire the trigger when the state value changed from a specific
state, but hasn't returned to that state value for the specified time.

This can be useful, e.g., checking if a media player hasn't turned "off" for
the time specified, but doesn't care about "playing" or "paused".

```yaml
automation:
  trigger:
    - platform: state
      entity_id: media_player.kitchen
      # Not "off" for 30 minutes
      from: "off"
      for: "00:30:00"
```

Please note, that when using `from`, `to` and `for`, only the value of the
`to` option is considered for the time specified.

In this example, the trigger fires if the state value of the entity remains the
same for `for` the time specified, regardless of the current state value.

```yaml
automation:
  trigger:
    - platform: state
      entity_id: media_player.kitchen
      # The media player remained in its current state for 1 hour
      for: "01:00:00"
```

When the `attribute` option is specified, all of the above works, but only
applies to the specific state value of that attribute. In this case the
normal state value of the entity is ignored.

For example, this trigger only fires if the boiler was heating for 10 minutes:

```yaml
automation:
  trigger:
    - platform: state
      entity_id: climate.living_room
      attribute: hvac_action
      to: "heating"
      for: "00:10:00"
```

You can also use templates in the `for` option.

{% raw %}

```yaml
automation:
  trigger:
    - platform: state
      entity_id:
        - device_tracker.paulus
        - device_tracker.anne_therese
      to: "home"
      for:
        minutes: "{{ states('input_number.lock_min')|int }}"
        seconds: "{{ states('input_number.lock_sec')|int }}"
  action:
    - service: lock.lock
      target:
        entity_id: lock.my_place
```

{% endraw %}

The `for` template(s) will be evaluated when an entity changes as specified.

<div class='note warning'>

Use quotes around your values for `from` and `to` to avoid the YAML parser from interpreting values as booleans.

</div>

## Sun trigger

### Sunset / Sunrise trigger

Fires when the sun is setting or rising, i.e., when the sun elevation reaches 0°.

An optional time offset can be given to have it fire a set time before or after the sun event (e.g.,  45 minutes before sunset).

<div class='note'>

Since the duration of twilight is different throughout the year, it is recommended to use [sun elevation triggers][sun_elevation_trigger] instead of `sunset` or `sunrise` with a time offset to trigger automations during dusk or dawn.

</div>

[sun_elevation_trigger]: /docs/automation/trigger/#sun-elevation-trigger

```yaml
automation:
  trigger:
    - platform: sun
      # Possible values: sunset, sunrise
      event: sunset
      # Optional time offset. This example will trigger 45 minutes before sunset.
      offset: "-00:45:00"
```

### Sun elevation trigger

Sometimes you may want more granular control over an automation than simply sunset or sunrise and specify an exact elevation of the sun. This can be used to layer automations to occur as the sun lowers on the horizon or even after it is below the horizon. This is also useful when the "sunset" event is not dark enough outside and you would like the automation to run later at a precise solar angle instead of the time offset such as turning on exterior lighting. For most automations intended to run during dusk or dawn, a number between 0° and -6° is suitable; -4° is used in this example:

{% raw %}

```yaml
automation:
  - alias: "Exterior Lighting on when dark outside"
    trigger:
      - platform: numeric_state
        entity_id: sun.sun
        attribute: elevation
        # Can be a positive or negative number
        below: -4.0
    action:
      - service: switch.turn_on
        target:
          entity_id: switch.exterior_lighting
```

{% endraw %}

If you want to get more precise, you can use this [solar calculator](https://www.esrl.noaa.gov/gmd/grad/solcalc/), which will help you estimate what the solar elevation will be at any specific time. Then from this, you can select from the defined twilight numbers.

Although the actual amount of light depends on weather, topography and land cover, they are defined as:

- Civil twilight: 0° > Solar angle > -6°

  This is what is meant by twilight for the average person: Under clear weather conditions, civil twilight approximates the limit at which solar illumination suffices for the human eye to clearly distinguish terrestrial objects. Enough illumination renders artificial sources unnecessary for most outdoor activities.

- Nautical twilight: -6° > Solar angle > -12°
- Astronomical twilight: -12° > Solar angle > -18°

A very thorough explanation of this is available in the Wikipedia article about the [Twilight](https://en.wikipedia.org/wiki/Twilight).

## Tag trigger

Fires when a [tag](/integrations/tag) is scanned. For example, a NFC tag is
scanned using the Home Assistant Companion mobile application.

```yaml
automation:
  trigger:
    - platform: tag
      tag_id: A7-6B-90-5F
```

Additionally, you can also only trigger if a card is scanned by a specific
device/scanner by setting the `device_id`:

```yaml
automation:
  trigger:
    - platform: tag
      tag_id: A7-6B-90-5F
      device_id: 0e19cd3cf2b311ea88f469a7512c307d
```

Or trigger on multiple possible devices for multiple tags:

```yaml
automation:
  trigger:
    - platform: tag
      tag_id:
        - "A7-6B-90-5F"
        - "A7-6B-15-AC"
      device_id:
        - 0e19cd3cf2b311ea88f469a7512c307d
        - d0609cb25f4a13922bb27d8f86e4c821
```

## Template trigger

Template triggers work by evaluating a [template](/docs/configuration/templating/) when any of the recognized entities change state. The trigger will fire if the state change caused the template to render 'true' (a non-zero number or any of the strings `true`, `yes`, `on`, `enable`) when it was previously 'false' (anything else).

This is achieved by having the template result in a true boolean expression (for example `{% raw %}{{ is_state('device_tracker.paulus', 'home') }}{% endraw %}`) or by having the template render `true` (example below).

With template triggers you can also evaluate attribute changes by using is_state_attr (like `{% raw %}{{ is_state_attr('climate.living_room', 'away_mode', 'off') }}{% endraw %}`)

{% raw %}

```yaml
automation:
  trigger:
    - platform: template
      value_template: "{% if is_state('device_tracker.paulus', 'home') %}true{% endif %}"

      # If given, will trigger when template remains true for X time.
      for: "00:01:00"
```

{% endraw %}

You can also use templates in the `for` option.

{% raw %}

```yaml
automation:
  trigger:
    - platform: template
      value_template: "{{ is_state('device_tracker.paulus', 'home') }}"
      for:
        minutes: "{{ states('input_number.minutes')|int(0) }}"
```

{% endraw %}

The `for` template(s) will be evaluated when the `value_template` becomes 'true'.

Templates that do not contain an entity will be rendered once per minute.

## Time trigger

The time trigger is configured to fire once a day at a specific time, or at a specific time on a specific date. There are three allowed formats:

### Time String

A string that represents a time to fire on each day. Can be specified as `HH:MM` or `HH:MM:SS`. If the seconds are not specified, `:00` will be used.

```yaml
automation:
  - trigger:
    - platform: time
      # Military time format. This trigger will fire at 3:32 PM
      at: "15:32:00"
```

### Input Datetime

The Entity ID of an [Input Datetime](/integrations/input_datetime/).

has_date | has_time | Description
-|-|-
`true` | `true` | Will fire at specified date & time.
`true` | `false` | Will fire at midnight on specified date.
`false` | `true` | Will fire once a day at specified time.

{% raw %}

```yaml
automation:
  - trigger:
      - platform: state
        entity_id: binary_sensor.motion
        to: "on"
    action:
      - service: climate.turn_on
        target:
          entity_id: climate.office
      - service: input_datetime.set_datetime
        target:
          entity_id: input_datetime.turn_off_ac
        data:
          datetime: >
            {{ (now().timestamp() + 2*60*60)
               | timestamp_custom('%Y-%m-%d %H:%M:%S') }}
  - trigger:
      - platform: time
        at: input_datetime.turn_off_ac
    action:
      - service: climate.turn_off
        target:
          entity_id: climate.office
```

{% endraw %}

### Sensors of datetime device class

The Entity ID of a [sensor](/integrations/sensor/) with the "timestamp" device class.

```yaml
automation:
  - trigger:
      - platform: time
        at: sensor.phone_next_alarm
    action:
      - service: light.turn_on
        target:
          entity_id: light.bedroom
```

### Multiple Times

Multiple times can be provided in a list. Both formats can be intermixed.

```yaml
automation:
  trigger:
    - platform: time
      at:
        - input_datetime.leave_for_work
        - "18:30:00"
```

## Time pattern trigger

With the time pattern trigger, you can match if the hour, minute or second of the current time matches a specific value. You can prefix the value with a `/` to match whenever the value is divisible by that number. You can specify `*` to match any value (when using the web interface this is required, the fields cannot be left empty).

```yaml
automation:
  trigger:
    - platform: time_pattern
      # Matches every hour at 5 minutes past whole
      minutes: 5

automation 2:
  trigger:
    - platform: time_pattern
      # Trigger once per minute during the hour of 3
      hours: "3"
      minutes: "*"

automation 3:
  trigger:
    - platform: time_pattern
      # You can also match on interval. This will match every 5 minutes
      minutes: "/5"
```

<div class='note warning'>

Do not prefix numbers with a zero - using `'00'` instead of '0' for example will result in errors.

</div>

## Webhook trigger

Webhook trigger fires when a web request is made to the webhook endpoint: `/api/webhook/<webhook_id>`. The webhook endpoint is created automatically when you set it as the `webhook_id` in an automation trigger.

```yaml
automation:
  trigger:
    - platform: webhook
      webhook_id: "some_hook_id"
```

You can run this automation by sending an HTTP POST request to `http://your-home-assistant:8123/api/webhook/some_hook_id`. Here is an example using the **curl** command line program, with an empty data payload:

```shell
curl -X POST https://your-home-assistant:8123/api/webhook/some_hook_id
```

Webhook endpoints don't require authentication, other than knowing a valid webhook ID. You can send a data payload, either as encoded form data or JSON data. The payload is available in an automation template as either `trigger.json` or `trigger.data`. URL query parameters are available in the template as `trigger.query`. Remember to use an HTTPS URL if you've secured your Home Assistant installation with SSL/TLS.

Note that a given webhook can only be used in one automation at a time. That is, only one automation trigger can use a specific webhook ID.

## Zone trigger

Zone trigger fires when an entity is entering or leaving the zone. The entity can be either a person, or a device_tracker. For zone automation to work, you need to have setup a device tracker platform that supports reporting GPS coordinates. This includes [GPS Logger](/integrations/gpslogger/), the [OwnTracks platform](/integrations/owntracks/) and the [iCloud platform](/integrations/icloud/).

```yaml
automation:
  trigger:
    - platform: zone
      entity_id: person.paulus
      zone: zone.home
      # Event is either enter or leave
      event: enter # or "leave"
```

## Geolocation trigger

Geolocation trigger fires when an entity is appearing in or disappearing from a zone. Entities that are created by a [Geolocation](/integrations/geo_location/) platform support reporting GPS coordinates.
Because entities are generated and removed by these platforms automatically, the entity id normally cannot be predicted. Instead, this trigger requires the definition of a `source`, which is directly linked to one of the Geolocation platforms.

<div class='note'>

This isn't for use with `device_tracker` entities. For those look above at the `zone` trigger.

</div>

```yaml
automation:
  trigger:
    - platform: geo_location
      source: nsw_rural_fire_service_feed
      zone: zone.bushfire_alert_zone
      # Event is either enter or leave
      event: enter # or "leave"
```

## Device triggers

Device triggers encompass a set of events that are defined by an integration. This includes, for example, state changes of sensors as well as button events from remotes.
[MQTT device triggers](/integrations/device_trigger.mqtt/) are set up through autodiscovery.

In contrast to state triggers, device triggers are tied to a device and not necessarily an entity.
To use a device trigger, set up an automation through the browser frontend.
If you would like to use a device trigger for an automation that is not managed through the browser frontend, you can copy the YAML from the trigger widget in the frontend and paste it into your automation's trigger list.

## Multiple triggers

It is possible to specify multiple triggers for the same rule. To do so just prefix the first line of each trigger with a dash (-) and indent the next lines accordingly. Whenever one of the triggers fires, [processing](#what-are-triggers) of your automation rule begins.

```yaml
automation:
  trigger:
    # first trigger
    - platform: time_pattern
      minutes: 5
      # our second trigger is the sunset
    - platform: sun
      event: sunset
```

## Multiple Entity IDs for the same Trigger

It is possible to specify multiple entities for the same trigger. To do so add multiple entities using a nested list. The trigger will fire and start, [processing](#what-are-triggers) your automation each time the trigger is true for each entity listed.

```yaml
automation:
  trigger:
    - platform: state
      entity_id:
        - sensor.one
        - sensor.two
        - sensor.three
```
