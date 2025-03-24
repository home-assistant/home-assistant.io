---
title: "Automation Trigger"
description: "All the different ways how automations can be triggered."
related:
  - docs: /voice_control/custom_sentences/#adding-a-custom-sentence-to-trigger-an-automation
    title: Adding a custom sentence to trigger an automation
---

Triggers are what starts the processing of an {% term automation %} rule. When _any_ of the automation's triggers becomes true (trigger _fires_), Home Assistant will validate the [conditions](/docs/automation/condition/), if any, and call the [action](/docs/automation/action/).

An {% term automation %} can be triggered by an {% term event %}, a certain {% term entity %} {% term state %}, at a given time, and more. These can be specified directly or more flexible via templates. It is also possible to specify multiple triggers for one automation.

- [Trigger ID](#trigger-id)
- [Trigger variables](#trigger-variables)
- [Event trigger](#event-trigger)
- [Home Assistant trigger](#home-assistant-trigger)
- [MQTT trigger](#mqtt-trigger)
- [Numeric state trigger](#numeric-state-trigger)
- [State trigger](#state-trigger)
- [Sun trigger](#sun-trigger)
- [Tag trigger](#tag-trigger)
- [Template trigger](#template-trigger)
- [Time trigger](#time-trigger)
- [Time pattern trigger](#time-pattern-trigger)
- [Persistent notification trigger](#persistent-notification-trigger)
- [Webhook trigger](#webhook-trigger)
- [Zone trigger](#zone-trigger)
- [Geolocation trigger](#geolocation-trigger)
- [Device triggers](#device-triggers)
- [Calendar trigger](#calendar-trigger)
- [Sentence trigger](#sentence-trigger)
- [Multiple triggers](#multiple-triggers)
- [Multiple Entity IDs for the same Trigger](#multiple-entity-ids-for-the-same-trigger)
- [Disabling a trigger](#disabling-a-trigger)
- [Merging lists of triggers](#merging-lists-of-triggers)

## Trigger ID

All triggers can be assigned an optional `id`. If the ID is omitted, it will instead be set to the index of the trigger. The `id` can be referenced from [trigger conditions and actions](/docs/scripts/conditions/#trigger-condition). The `id` does not have to be unique for each trigger, and it can be used to group similar triggers for use later in the automation (i.e., several triggers of different types that should all turn some entity on).

### Video tutorial

This video tutorial explains how trigger IDs work.

<lite-youtube videoid="fE_MYcXYwMI" videotitle="How to use Trigger IDs in Home Assistant - Tutorial" posterquality="maxresdefault"></lite-youtube>

```yaml
automation:
  triggers:
    - trigger: event
      event_type: "MY_CUSTOM_EVENT"
      id: "custom_event"
    - trigger: mqtt
      topic: "living_room/switch/ac"
      id: "ac_on"
    - trigger: state  # This trigger will be assigned id="2"
      entity_id:
        - device_tracker.paulus
        - device_tracker.anne_therese
      to: "home"
```

## Trigger variables

There are two different types of variables available for triggers. Both work like [script level variables](/integrations/script/#variables).

The first variant allows you to define variables that will be set when the trigger fires. The variables will be able to use templates and have access to [the `trigger` variable](/docs/automation/templating#available-trigger-data).

The second variant is setting variables that are available when attaching a trigger when the trigger can contain templated values. These are defined using the `trigger_variables` key at an automation level. These variables can only contain [limited templates](/docs/configuration/templating/#limited-templates). The triggers will not re-apply if the value of the template changes. Trigger variables are a feature meant to support using blueprint inputs in triggers.

{% raw %}

```yaml
automation:
  trigger_variables:
    my_event: example_event
  triggers:
    - trigger: event
      # Able to use `trigger_variables`
      event_type: "{{ my_event }}"
      # These variables are evaluated and set when this trigger is triggered
      variables:
        name: "{{ trigger.event.data.name }}"
```

{% endraw %}

## Event trigger

An event trigger fires when an [event](/docs/configuration/events/) is being received. Events are the raw building blocks of Home Assistant. You can match events on just the event name or also require specific event data or context to be present.

Events can be fired by integrations or via the API. There is no limitation to the types. A list of built-in events can be found [here](/docs/configuration/events/).

```yaml
automation:
  triggers:
    - trigger: event
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
  triggers:
    - trigger: event
      event_type:
        - automation_reloaded
        - scene_reloaded
```

It's also possible to use [limited templates](/docs/configuration/templating/#limited-templates) in the `event_type`, `event_data` and `context` options.

{% important %}
The `event_type`, `event_data` and `context` templates are only evaluated when setting up the trigger, they will not be reevaluated for every event.
{% endimportant %}

{% raw %}

```yaml
automation:
  trigger_variables:
    sub_event: ABC
    node: ac
    value: on
  triggers:
    - trigger: event
      event_type: "{{ 'MY_CUSTOM_EVENT_' ~ sub_event }}"
```

{% endraw %}

## Home Assistant trigger

Fires when Home Assistant starts up or shuts down.

```yaml
automation:
  triggers:
    - trigger: homeassistant
      # Event can also be 'shutdown'
      event: start
```

{% note %}
Automations triggered by the `shutdown` event have 20 seconds to run, after which they are stopped to continue with the shutdown.
{% endnote %}

## MQTT trigger

Fires when a specific message is received on given MQTT topic. Optionally can match on the payload being sent over the topic. The default payload encoding is 'utf-8'. For images and other byte payloads use `encoding: ''` to disable payload decoding completely.

```yaml
automation:
  triggers:
    - trigger: mqtt
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
  triggers:
    - trigger: mqtt
      topic: "living_room/switch/ac"
      payload: "on"
      value_template: "{{ value_json.state }}"
```

{% endraw %}

It's also possible to use [limited templates](/docs/configuration/templating/#limited-templates) in the `topic` and `payload` options.

{% note %}
The `topic` and `payload` templates are only evaluated when setting up the trigger, they will not be re-evaluated for every incoming MQTT message.
{% endnote %}

{% raw %}

```yaml
automation:
  trigger_variables:
    room: "living_room"
    node: "ac"
    value: "on"
  triggers:
    - trigger: mqtt
      topic: "{{ room ~ '/switch/' ~ node}}"
      # Optional
      payload: "{{ 'state:' ~ value }}"
      encoding: "utf-8"
```

{% endraw %}

## Numeric state trigger

Fires when the numeric value of an entity's state (or attribute's value if using the `attribute` property, or the calculated value if using the `value_template` property) **crosses** a given threshold (equal excluded). On state change of a specified entity, attempts to parse the state as a number and fires if the value is changing from above to below or from below to above the given threshold (equal excluded).

{% note %}
Crossing the threshold means that the trigger only fires if the state wasn't previously within the threshold.
If the current state of your entity is `50` and you set the threshold to `below: 75`, the trigger would not fire if the state changed to e.g. `49` or `72` because the threshold was never crossed. The state would first have to change to e.g. `76` and then to e.g. `74` for the trigger to fire.
{% endnote %}

{% raw %}

```yaml
automation:
  triggers:
    - trigger: numeric_state
      entity_id: sensor.temperature
      # If given, will trigger when the value of the given attribute for the given entity changes..
      attribute: attribute_name
      # ..or alternatively, will trigger when the value given by this evaluated template changes.
      value_template: "{{ state.attributes.value - 5 }}"
      # At least one of the following required
      above: 17
      below: 25
      # If given, will trigger when the condition has been true for X time; you can also use days and milliseconds.
      for:
        hours: 1
        minutes: 10
        seconds: 5
```

{% endraw %}

{% note %}
Listing above and below together means the numeric_state has to be between the two values.
In the example above, the trigger would fire a single time if a numeric_state goes into the 17.1-24.9 range (above 17 and below 25). It will only fire again, once it has left the defined range and enters it again.
{% endnote %}

When the `attribute` option is specified the trigger is compared to the given `attribute` instead of the state of the entity.

{% raw %}

```yaml
automation:
  triggers:
    - trigger: numeric_state
      entity_id: climate.kitchen
      attribute: current_temperature
      above: 23
```

{% endraw %}

More dynamic and complex calculations can be done with `value_template`. The variable 'state' is the [state object](/docs/configuration/state_object) of the entity specified by `entity_id`.

The state of the entity can be referenced like this:

{% raw %}

```yaml
automation:
  triggers:
    - trigger: numeric_state
      entity_id: sensor.temperature
      value_template: "{{ state.state | float * 9 / 5 + 32 }}"
      above: 70
```

{% endraw %}

Attributes of the entity can be referenced like this:

{% raw %}

```yaml
automation:
  triggers:
    - trigger: numeric_state
      entity_id: climate.kitchen
      value_template: "{{ state.attributes.current_temperature - state.attributes.temperature_set_point }}"
      above: 3
```

{% endraw %}

Number helpers (`input_number` entities), `number`, `sensor`, and `zone` entities
that contain a numeric value, can be used in the `above` and `below` thresholds.
However, the comparison will only be made when the entity specified in the trigger is updated. This would look like:

```yaml
automation:
  triggers:
    - trigger: numeric_state
      entity_id: sensor.outside_temperature
      # Other entity ids can be specified for above and/or below thresholds
      above: sensor.inside_temperature
```

The `for:` can also be specified as `HH:MM:SS` like this:

{% raw %}

```yaml
automation:
  triggers:
    - trigger: numeric_state
      entity_id: sensor.temperature
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
  triggers:
    - trigger: numeric_state
      entity_id:
        - sensor.temperature_1
        - sensor.temperature_2
      above: 80
      for:
        minutes: "{{ states('input_number.high_temp_min')|int }}"
        seconds: "{{ states('input_number.high_temp_sec')|int }}"
  actions:
    - action: persistent_notification.create
      data:
        message: >
          {{ trigger.to_state.name }} too high for {{ trigger.for }}!
```

{% endraw %}

The `for` template(s) will be evaluated when an entity changes as specified.

{% important %}
Use of the `for` option will not survive Home Assistant restart or the reload of automations. During restart or reload, automations that were awaiting `for` the trigger to pass, are reset.

If for your use case this is undesired, you could consider using the automation to set an [`input_datetime`](/integrations/input_datetime) to the desired time and then use that [`input_datetime`](/integrations/input_datetime) as an automation trigger to perform the desired actions at the set time.
{% endimportant %}

## State trigger

In general, the state trigger fires when the state of any of given entities **changes**. The behavior is as follows:

- If only the `entity_id` is given, the trigger fires for **all** state changes, even if only a state attribute changed.
- If at least one of `from`, `to`, `not_from`, or `not_to` are given, the trigger fires on any matching state change, but not if only an attribute changed.
  - To trigger on all state changes, but not on changed attributes, set at least one of `from`, `to`, `not_from`, or `not_to` to `null`.
- Use of the `for` option doesn't survive a Home Assistant restart or the reload of automations. 
  - During restart or reload, automations that were awaiting `for` the trigger to pass, are reset.
  - If for your use case this is undesired, you could consider using the automation to set an [`input_datetime`](/integrations/input_datetime) to the desired time and then use that [`input_datetime`](/integrations/input_datetime) as an automation trigger to perform the desired actions at the set time.

{% tip %}
The values you see in your overview will often not be the same as the actual state of the entity. For instance, the overview may show `Connected` when the underlying entity is actually `on`. You should check the state of the entity by checking the states in the developer tool, under {% my developer_states title="**Developer Tools** > **States**" %}.
{% endtip %}

### Examples

This automation triggers if either Paulus or Anne-Therese are home for one minute.

```yaml
automation:
  triggers:
    - trigger: state
      entity_id:
        - device_tracker.paulus
        - device_tracker.anne_therese
      # Optional
      from: "not_home"
      # Optional
      to: "home"
      # If given, will trigger when the condition has been true for X time; you can also use days and milliseconds.
      for:
        hours: 0
        minutes: 1
        seconds: 0
```

It's possible to give a list of `from` states or `to` states:

```yaml
automation:
  triggers:
    - trigger: state
      entity_id: vacuum.test
      from:
        - "cleaning"
        - "returning"
      to: "error"
```

If you want to trigger on all state changes, but not on attribute changes, you can `to` to `null` (this would also work by setting `from`, `not_from`, or `not_to` to `null`):

```yaml
automation:
  triggers:
    - trigger: state
      entity_id: vacuum.test
      to:
```

If you want to trigger on all state changes *except* specific ones, use `not_from` or `not_to`  The `not_from` and `not_to` options are the counter parts of `from` and `to`. They can be used to trigger on state changes that are **not** the specified state.

```yaml
automation:
  triggers:
    - trigger: state
      entity_id: vacuum.test
      not_from:
        - "unknown"
        - "unavailable"
      to: "on"
```

You cannot use `from` and `not_from` at the same time. The same applies to `to` and `not_to`.

### Triggering on attribute changes

When the `attribute` option is specified, the trigger only fires
when the specified attribute **changes**. Changes to other attributes or
state changes are ignored.

For example, this trigger only fires when the boiler has been heating for 10 minutes:

```yaml
automation:
  triggers:
    - trigger: state
      entity_id: climate.living_room
      attribute: hvac_action
      to: "heating"
      for: "00:10:00"
```

This trigger fires whenever the boiler's `hvac_action` attribute changes:

```yaml
automation:
  triggers:
    - trigger: state
      entity_id: climate.living_room
      attribute: hvac_action
```

### Holding a state or attribute

You can use `for` to have the state trigger only fire if the state holds for some time.

This example fires, when the entity state changed to `"on"` and holds that
state for 30 seconds:

```yaml
automation:
  triggers:
    - trigger: state
      entity_id: light.office
      # Must stay "on" for 30 seconds
      to: "on"
      for: "00:00:30"
```

When holding a state, changes to attributes are ignored. Changes to attributes
don't cancel the hold time.

You can also fire the trigger when the state value changed from a specific
state, but hasn't returned to that state value for the specified time.

This can be useful, e.g., checking if a media player hasn't turned "off" for
the time specified, but doesn't care about "playing" or "paused".

```yaml
automation:
  triggers:
    - trigger: state
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
  triggers:
    - trigger: state
      entity_id: media_player.kitchen
      # The media player remained in its current state for 1 hour
      for: "01:00:00"
```

You can also use templates in the `for` option.

{% raw %}

```yaml
automation:
  triggers:
    - trigger: state
      entity_id:
        - device_tracker.paulus
        - device_tracker.anne_therese
      to: "home"
      for:
        minutes: "{{ states('input_number.lock_min')|int }}"
        seconds: "{{ states('input_number.lock_sec')|int }}"
  actions:
    - action: lock.lock
      target:
        entity_id: lock.my_place
```

{% endraw %}

The `for` template(s) will be evaluated when an entity changes as specified.

{% tip %}
Use quotes around your values for `from` and `to` to avoid the YAML parser from interpreting values as booleans.
{% endtip %}

## Sun trigger

### Sunset / Sunrise trigger

Fires when the sun is setting or rising, i.e., when the sun elevation reaches 0°.

An optional time offset can be given to have it fire a set time before or after the sun event (e.g.,  45 minutes before sunset). A negative value makes it fire before sunrise or sunset, a positive value afterwards. The offset needs to be specified in number of seconds, or in a hh:mm:ss format.

{% tip %}
Since the duration of twilight is different throughout the year, it is recommended to use [sun elevation triggers][sun_elevation_trigger] instead of `sunset` or `sunrise` with a time offset to trigger automations during dusk or dawn.
{% endtip %}

[sun_elevation_trigger]: /docs/automation/trigger/#sun-elevation-trigger

```yaml
automation:
  triggers:
    - trigger: sun
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
    triggers:
      - trigger: numeric_state
        entity_id: sun.sun
        attribute: elevation
        # Can be a positive or negative number
        below: -4.0
    actions:
      - action: switch.turn_on
        target:
          entity_id: switch.exterior_lighting
```

{% endraw %}

If you want to get more precise, you can use this [solar calculator](https://gml.noaa.gov/grad/solcalc/), which will help you estimate what the solar elevation will be at any specific time. Then from this, you can select from the defined twilight numbers.

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
  triggers:
    - trigger: tag
      tag_id: A7-6B-90-5F
```

Additionally, you can also only trigger if a card is scanned by a specific
device/scanner by setting the `device_id`:

```yaml
automation:
  triggers:
    - trigger: tag
      tag_id: A7-6B-90-5F
      device_id: 0e19cd3cf2b311ea88f469a7512c307d
```

Or trigger on multiple possible devices for multiple tags:

```yaml
automation:
  triggers:
    - trigger: tag
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
  triggers:
    - trigger: template
      value_template: "{% if is_state('device_tracker.paulus', 'home') %}true{% endif %}"

      # If given, will trigger when template remains true for X time.
      for: "00:01:00"
```

{% endraw %}

You can also use templates in the `for` option.

{% raw %}

```yaml
automation:
  triggers:
    - trigger: template
      value_template: "{{ is_state('device_tracker.paulus', 'home') }}"
      for:
        minutes: "{{ states('input_number.minutes')|int(0) }}"
```

{% endraw %}

The `for` template(s) will be evaluated when the `value_template` becomes 'true'.

Templates that do not contain an entity will be rendered once per minute.

{% important %}
Use of the `for` option will not survive Home Assistant restart or the reload of automations. During restart or reload, automations that were awaiting `for` the trigger to pass, are reset.

If for your use case this is undesired, you could consider using the automation to set an [`input_datetime`](/integrations/input_datetime) to the desired time and then use that [`input_datetime`](/integrations/input_datetime) as an automation trigger to perform the desired actions at the set time.
{% endimportant %}

## Time trigger

The time trigger is configured to fire once a day at a specific time, or at a specific time on a specific date. There are three allowed formats:

### Time string

A string that represents a time to fire on each day. Can be specified as `HH:MM` or `HH:MM:SS`. If the seconds are not specified, `:00` will be used.

```yaml
automation:
  - triggers:
    - trigger: time
      # Military time format. This trigger will fire at 3:32 PM
      at: "15:32:00"
```

### Input datetime

The entity ID of an [input datetime](/integrations/input_datetime/).

| has_date | has_time | Description                              |
| -------- | -------- | ---------------------------------------- |
| `true`   | `true`   | Will fire at specified date & time.      |
| `true`   | `false`  | Will fire at midnight on specified date. |
| `false`  | `true`   | Will fire once a day at specified time.  |

{% raw %}

```yaml
automation:
  - triggers:
      - trigger: state
        entity_id: binary_sensor.motion
        to: "on"
    actions:
      - action: climate.turn_on
        target:
          entity_id: climate.office
      - action: input_datetime.set_datetime
        target:
          entity_id: input_datetime.turn_off_ac
        data:
          datetime: >
            {{ (now().timestamp() + 2*60*60)
               | timestamp_custom('%Y-%m-%d %H:%M:%S') }}
  - triggers:
      - trigger: time
        at: input_datetime.turn_off_ac
    actions:
      - action: climate.turn_off
        target:
          entity_id: climate.office
```

{% endraw %}

### Sensors of datetime device class

The Entity ID of a [sensor](/integrations/sensor/) with the "timestamp" device class.

```yaml
automation:
  - triggers:
      - trigger: time
        at: sensor.phone_next_alarm
    actions:
      - action: light.turn_on
        target:
          entity_id: light.bedroom
```

### Sensors of datetime device class with offsets

When the time is provided using a sensor of the timestamp device class, an offset can be provided. This offset will be added to (or subtracted from when negative) the sensor value.

For example, this trigger fires 5 minutes before the phone alarm goes off.

```yaml
automation:
  - triggers:
      - trigger: time
        at:
          entity_id: sensor.phone_next_alarm
          offset: -00:05:00
    actions:
      - action: light.turn_on
        target:
          entity_id: light.bedroom
```

{% important %}
When using a positive offset the trigger might never fire. This is due to the sensor changing before the offset is reached. For example, when using a phone alarm as a trigger, the sensor value will change to the new alarm time when the alarm goes off, which means this trigger will change to the new time as well.
{% endimportant %}

### Multiple times

Multiple times can be provided in a list. All formats can be intermixed.

```yaml
automation:
  triggers:
    - trigger: time
      at:
        - input_datetime.leave_for_work
        - "18:30:00"
        - entity_id: sensor.bus_arrival
          offset: "-00:10:00"
```

### Limited templates

It's also possible to use [limited templates](/docs/configuration/templating/#limited-templates) for times.

{% raw %}

```yaml
blueprint:
  input:
    alarm:
      name: Alarm
      selector: 
        text:
    hour:
      name: Hour
      selector:
        number:
          min: 0
          max: 24

  trigger_variables:
    my_alarm: !input alarm
    my_hour: !input hour
  trigger:
    - platform: time
      at:
      - "sensor.{{ my_alarm | slugify }}_time"
      - "{{ my_hour }}:30:00"
```

{% endraw %}

## Time pattern trigger

With the time pattern trigger, you can match if the hour, minute or second of the current time matches a specific value. You can prefix the value with a `/` to match whenever the value is divisible by that number. You can specify `*` to match any value (when using the web interface this is required, the fields cannot be left empty).

```yaml
automation:
  triggers:
    - trigger: time_pattern
      # Matches every hour at 5 minutes past whole
      minutes: 5

automation 2:
  triggers:
    - trigger: time_pattern
      # Trigger once per minute during the hour of 3
      hours: "3"
      minutes: "*"

automation 3:
  triggers:
    - trigger: time_pattern
      # You can also match on interval. This will match every 5 minutes
      minutes: "/5"
```

{% note %}
Do not prefix numbers with a zero - using `'01'` instead of `'1'` for example will result in errors.
{% endnote %}

## Persistent notification trigger

Persistent notification triggers are fired when a `persistent_notification` is `added` or `removed` that matches the configuration options.

```yaml
automation:
  triggers:
    - trigger: persistent_notification
      update_type:
        - added
        - removed
      notification_id: invalid_config
```

See the [Persistent Notification](/integrations/persistent_notification/) integration for more details on event triggers and the additional event data available for use by an automation.

## Webhook trigger

Webhook trigger fires when a web request is made to the webhook endpoint: `/api/webhook/<webhook_id>`. The webhook endpoint is created automatically when you set it as the `webhook_id` in an automation trigger.

```yaml
automation:
  triggers:
    - trigger: webhook
      webhook_id: "some_hook_id"
      allowed_methods:
        - POST
        - PUT
      local_only: true
```

You can run this automation by sending an HTTP POST request to `http://your-home-assistant:8123/api/webhook/some_hook_id`. Here is an example using the **curl** command line program, with an example form data payload:

```shell
curl -X POST -d 'key=value&key2=value2' https://your-home-assistant:8123/api/webhook/some_hook_id
```

Webhooks support HTTP POST, PUT, HEAD, and GET requests; PUT requests are recommended. HTTP GET and HEAD requests are not enabled by default but can be enabled by adding them to the `allowed_methods` option. The request methods can also be configured in the UI by clicking the settings gear menu button beside the Webhook ID.

By default, webhook triggers can only be accessed from devices on the same network as Home Assistant or via [Nabu Casa Cloud webhooks](https://www.nabucasa.com/config/webhooks/). The `local_only` option should be set to `false` to allow webhooks to be triggered directly via the internet. This option can also be configured in the UI by clicking the settings gear menu button beside the Webhook ID.

Remember to use an HTTPS URL if you've secured your Home Assistant installation with SSL/TLS.

Note that a given webhook can only be used in one automation at a time. That is, only one automation trigger can use a specific webhook ID.

### Webhook data

Payloads may either be encoded as form data or JSON. Depending on that, its data will be available in an automation template as either `trigger.data` or `trigger.json`. URL query parameters are also available in the template as `trigger.query`.

Note that to use JSON encoded payloads, the `Content-Type` header must be set to `application/json`, e.g.:

```bash
curl -X POST -H "Content-Type: application/json" -d '{ "key": "value" }' https://your-home-assistant:8123/api/webhook/some_hook_id
```

### Webhook security

Webhook endpoints don't require authentication, other than knowing a valid webhook ID. Security best practices for webhooks include:

- Do not use webhooks to trigger automations that are destructive, or that can create safety issues. For example, do not use a webhook to unlock a lock, or open a garage door.
- Treat a webhook ID like a password: use a unique, non-guessable value, and keep it secret.
- Do not copy-and-paste webhook IDs from public sources, including blueprints. Always create your own.
- Keep the `local_only` option enabled for webhooks if access from the internet is not required.

## Zone trigger

Zone trigger fires when an entity is entering or leaving the zone. The entity can be either a person, or a device_tracker. For zone automation to work, you need to have setup a device tracker platform that supports reporting GPS coordinates. This includes [GPS Logger](/integrations/gpslogger/), the [OwnTracks platform](/integrations/owntracks/) and the [iCloud platform](/integrations/icloud/).

```yaml
automation:
  triggers:
    - trigger: zone
      entity_id: person.paulus
      zone: zone.home
      # Event is either enter or leave
      event: enter # or "leave"
```

## Geolocation trigger

Geolocation trigger fires when an entity is appearing in or disappearing from a zone. Entities that are created by a [Geolocation](/integrations/geo_location/) platform support reporting GPS coordinates.
Because entities are generated and removed by these platforms automatically, the entity ID normally cannot be predicted. Instead, this trigger requires the definition of a `source`, which is directly linked to one of the Geolocation platforms.

{% tip %}
This isn't for use with `device_tracker` entities. For those look above at the `zone` trigger.
{% endtip %}

```yaml
automation:
  triggers:
    - trigger: geo_location
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

## Calendar trigger

Calendar trigger fires when a [Calendar](/integrations/calendar/) event starts or ends, allowing
for much more flexible automations than using the Calendar entity state which only supports a single
event start at a time.

An optional time offset can be given to have it fire a set time before or after the calendar event (e.g., 5 minutes before event start).

```yaml
automation:
  triggers:
    - trigger: calendar
      # Possible values: start, end
      event: start
      # The calendar entity_id
      entity_id: calendar.light_schedule
      # Optional time offset
      offset: "-00:05:00"
```

See the [Calendar](/integrations/calendar/) integration for more details on event triggers and the
additional event data available for use by an automation.

## Sentence trigger

A sentence trigger fires when [Assist](/voice_control/) matches a sentence from a voice assistant using the default [conversation agent](/integrations/conversation/). Sentence triggers only work with Home Assistant Assist. External conversation agents such as OpenAI or Google Generative AI cannot be used to trigger automations.

Sentences are allowed to use some basic [template syntax](https://developers.home-assistant.io/docs/voice/intent-recognition/template-sentence-syntax/#sentence-templates-syntax) like optional and alternative words. For example, `[it's ]party time` will match both "party time" and "it's party time".

```yaml
automation:
  triggers:
    - trigger: conversation
      command:
        - "[it's ]party time"
        - "happy (new year|birthday)"
```

The sentences matched by this trigger will be:

- party time
- it's party time
- happy new year
- happy birthday

Punctuation and casing are ignored, so "It's PARTY TIME!!!" will also match.

### Related topic

- [Adding a custom sentence to trigger an automation](/voice_control/custom_sentences/#adding-a-custom-sentence-to-trigger-an-automation)

### Sentence wildcards

Adding one or more `{lists}` to your trigger sentences will capture any text at that point in the sentence. A `slots` object will be [available in the trigger data](/docs/automation/templating#sentence).
This allows you to match sentences with variable parts, such as album/artist names or a description of a picture.

For example, the sentence `play {album} by {artist}` will match "play the white album by the beatles" and have the following variables available in the action templates:

{% raw %}

- `{{ trigger.slots.album }}` - "the white album"
- `{{ trigger.slots.artist }}` - "the beatles"

{% endraw %}

Wildcards will match as much text as possible, which may lead to surprises: "play day by day by taken by trees" will match `album` as "day" and `artist` as "day by taken by trees".
Including extra words in your template can help: `play {album} by artist {artist}` can now correctly match "play day by day by artist taken by trees".

## Multiple triggers

It is possible to specify multiple triggers for the same rule. To do so just prefix the first line of each trigger with a dash (-) and indent the next lines accordingly. Whenever one of the triggers fires, processing of your automation rule begins.

```yaml
automation:
  triggers:
    # first trigger
    - trigger: time_pattern
      minutes: 5
      # our second trigger is the sunset
    - trigger: sun
      event: sunset
```

## Multiple entity IDs for the same trigger

It is possible to specify multiple entities for the same trigger. To do so add multiple entities using a nested list. The trigger will fire and start, processing your automation each time the trigger is true for any entity listed.

```yaml
automation:
  triggers:
    - trigger: state
      entity_id:
        - sensor.one
        - sensor.two
        - sensor.three
```

## Disabling a trigger

Every individual trigger in an automation can be disabled, without removing it.
To do so, add `enabled: false` to the trigger. For example:

```yaml
# Example script with a disabled trigger
automation:
  triggers:
    # This trigger will not trigger, as it is disabled.
    # This automation does not run when the sun is set.
    - enabled: false
      trigger: sun
      event: sunset

    # This trigger will fire, as it is not disabled.
    - trigger: time
      at: "15:32:00"
```

Triggers can also be disabled based on limited templates or blueprint inputs. These are only evaluated once when the automation is loaded.

{% raw %}

```yaml
blueprint:
  input:
    input_boolean:
      name: Boolean
      selector: 
        boolean:
    input_number:
      name: Number
      selector:
        number:
          min: 0
          max: 100

  trigger_variables:
    _enable_number: !input input_number

  triggers:
    - trigger: sun
      event_type: sunrise
      enabled: !input input_boolean
    - trigger: sun
      event_type: sunset
      enabled: "{{ _enable_number < 50 }}"
```

{% endraw %}

## Merging lists of triggers

{% caution %}
This feature requires Home Assistant version 2024.10 or later. If using this in a blueprint, set the `min_version` for the blueprint to at least this version. See the [blueprint schema documentation](/docs/blueprint/schema/#min_version) for more details.
{% endcaution %}

In some advanced cases (like for blueprints with trigger selectors), it may be necessary to insert a second list of triggers into the main trigger list. This can be done by adding a dictionary in the main trigger list with the sole key `triggers`, and the value for that key contains a second list of triggers. These will then be flattened into a single list of triggers. For example:

```yaml
blueprint:
  name: Nested Trigger Blueprint
  domain: automation
  input:
    usertrigger:
      selector:
        trigger:

triggers:
  - trigger: event
    event_type: manual_event
  - triggers: !input usertrigger
```

This blueprint automation can then be triggered either by the fixed manual_event trigger, or additionally by any triggers selected in the trigger selector. This is also applicable for `wait_for_trigger` action.
