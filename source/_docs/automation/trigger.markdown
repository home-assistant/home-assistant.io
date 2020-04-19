---
title: "Automation Trigger"
description: "All the different ways how automations can be triggered."
redirect_from: /getting-started/automation-trigger/
---

### What are triggers
Triggers are what starts the processing of an automation rule. When _any_ of the automation's triggers becomes true (trigger _fires_), Home Assistant will validate the [conditions](/docs/automation/condition/), if any, and call the [action](/docs/automation/action/).

### Event trigger

Fires when an event is being received. Events are the raw building blocks of Home Assistant. You can match events on just the event name or also require specific event data to be present.

Events can be fired by integrations or via the API. There is no limitation to the types. A list of built-in events can be found [here](/docs/configuration/events/).

```yaml
automation:
  trigger:
    platform: event
    event_type: MY_CUSTOM_EVENT
    # optional
    event_data:
      mood: happy
```

### Home Assistant trigger

Fires when Home Assistant starts up or shuts down.

```yaml
automation:
  trigger:
    platform: homeassistant
    # Event can also be 'shutdown'
    event: start
```

### MQTT trigger

Fires when a specific message is received on given MQTT topic. Optionally can match on the payload being sent over the topic. The default payload encoding is 'utf-8'. For images and other byte payloads use `encoding: ''` to disable payload decoding completely.

```yaml
automation:
  trigger:
    platform: mqtt
    topic: living_room/switch/ac
    # Optional
    payload: "on"
    encoding: "utf-8"
```

### Numeric state trigger

Fires when numeric value of an entity's state crosses a given threshold. On state change of a specified entity, attempts to parse the state as a number and fires if value is changing from above to below or from below to above the given threshold.

{% raw %}

```yaml
automation:
  trigger:
    platform: numeric_state
    entity_id: sensor.temperature
    # Optional
    value_template: "{{ state.attributes.battery }}"
    # At least one of the following required
    above: 17
    below: 25

    # If given, will trigger when condition has been for X time, can also use days and milliseconds.
    for:
      hours: 1
      minutes: 10
      seconds: 5
```

{% endraw %}

<div class='note'>
Listing above and below together means the numeric_state has to be between the two values.
In the example above, the trigger would fire if a numeric_state goes to 17.1-24.9 (from 17 or below, or 25 or above).
</div>

The `for:` can also be specified as `HH:MM:SS` like this:

{% raw %}

```yaml
automation:
  trigger:
    platform: numeric_state
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
    platform: numeric_state
    entity_id:
      - sensor.temperature_1
      - sensor.temperature_2
    above: 80
    for:
      minutes: "{{ states('input_number.high_temp_min')|int }}"
      seconds: "{{ states('input_number.high_temp_sec')|int }}"
  action:
    service: persistent_notification.create
    data_template:
      message: >
        {{ trigger.to_state.name }} too high for {{ trigger.for }}!
```

{% endraw %}

The `for` template(s) will be evaluated when an entity changes as specified.

### State trigger

Fires when the state of any of given entities changes. If only `entity_id` is given trigger will fire for all state changes, even if only state attributes change.

<div class='note'>

The values you see in your overview will often not be the same as the actual state of the entity. For instance, the overview may show `Connected` when the underlying entity is actually `on`. You should check the state of the entity by looking in the _States_ menu under _Developer tools_.

</div>

```yaml
automation:
  trigger:
    platform: state
    entity_id: device_tracker.paulus, device_tracker.anne_therese
    # Optional
    from: "not_home"
    # Optional
    to: "home"

    # If given, will trigger when state has been the to state for X time.
    for: "01:10:05"
```

You can also use templates in the `for` option.

{% raw %}

```yaml
automation:
  trigger:
    platform: state
    entity_id: device_tracker.paulus, device_tracker.anne_therese
    to: "home"
    for:
      minutes: "{{ states('input_number.lock_min')|int }}"
      seconds: "{{ states('input_number.lock_sec')|int }}"
  action:
    service: lock.lock
    entity_id: lock.my_place
```

{% endraw %}

The `for` template(s) will be evaluated when an entity changes as specified.

<div class='note warning'>

Use quotes around your values for `from` and `to` to avoid the YAML parser interpreting values as booleans.

</div>

### Sun trigger

#### Sunset / Sunrise trigger

Fires when the sun is setting or rising, i.e., when the sun elevation reaches 0°.

An optional time offset can be given to have it fire a set time before or after the sun event (e.g.,  45 minutes before sunset).

<div class='note'>

Since the duration of twilight is different throughout the year, it is recommended to use [sun elevation triggers][sun_elevation_trigger] instead of `sunset` or `sunrise` with a time offset to trigger automations during dusk or dawn.

</div>

[sun_elevation_trigger]: /docs/automation/trigger/#sun-elevation-trigger

```yaml
automation:
  trigger:
    platform: sun
    # Possible values: sunset, sunrise
    event: sunset
    # Optional time offset. This example will trigger 45 minutes before sunset.
    offset: "-00:45:00"
```

#### Sun elevation trigger

Sometimes you may want more granular control over an automation than simply sunset or sunrise and specify an exact elevation of the sun. This can be used to layer automations to occur as the sun lowers on the horizon or even after it is below the horizon. This is also useful when the "sunset" event is not dark enough outside and you would like the automation to run later at a precise solar angle instead of the time offset such as turning on exterior lighting. For most automations intended to run during dusk or dawn, a number between 0° and -6° is suitable; -4° is used in this example:

{% raw %}

```yaml
automation:
  alias: "Exterior Lighting on when dark outside"
  trigger:
    platform: numeric_state
    entity_id: sun.sun
    value_template: "{{ state_attr('sun.sun', 'elevation') }}"
    # Can be a positive or negative number
    below: -4.0
  action:
    service: switch.turn_on
    entity_id: switch.exterior_lighting
```

{% endraw %}

If you want to get more precise, start with the US Naval Observatory [tool](https://aa.usno.navy.mil/data/docs/AltAz.php) which will help you estimate what the solar elevation will be at any specific time. Then from this, you can select from the defined twilight numbers.

Although the actual amount of light depends on weather, topography and land cover, they are defined as:

- Civil twilight: 0° > Solar angle > -6°

  This is what is meant by twilight for the average person: Under clear weather conditions, civil twilight approximates the limit at which solar illumination suffices for the human eye to clearly distinguish terrestrial objects. Enough illumination renders artificial sources unnecessary for most outdoor activities.

- Nautical twilight: -6° > Solar angle > -12°
- Astronomical twilight: -12° > Solar angle > -18°

A very thorough explanation of this is available in the Wikipedia article about the [Twilight](https://en.wikipedia.org/wiki/Twilight).

### Template trigger

Template triggers work by evaluating a [template](/docs/configuration/templating/) on every state change for all of the recognized entities. The trigger will fire if the state change caused the template to render 'true'. This is achieved by having the template result in a true boolean expression (`{% raw %}{{ is_state('device_tracker.paulus', 'home') }}{% endraw %}`) or by having the template render 'true' (example below). Being a boolean expression the template must evaluate to false (or anything other than true) before the trigger will fire again.
With template triggers you can also evaluate attribute changes by using is_state_attr (`{% raw %}{{ is_state_attr('climate.living_room', 'away_mode', 'off') }}{% endraw %}`)

{% raw %}

```yaml
automation:
  trigger:
    platform: template
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
    platform: template
    value_template: "{{ is_state('device_tracker.paulus', 'home') }}"
    for:
      minutes: "{{ states('input_number.minutes')|int(0) }}"
```

{% endraw %}

The `for` template(s) will be evaluated when the `value_template` becomes `true`.

<div class='note warning'>
Rendering templates with time (`now()`) is dangerous as trigger templates are only updated based on entity state changes.
</div>


As an alternative, providing you include the sensor [time](/integrations/time_date/) in your configuration, you can use the following template:

{% raw %}

```yaml
automation:
  trigger:
    platform: template
    value_template: "{{ (states.sensor.time.last_changed - states.YOUR.ENTITY.last_changed).total_seconds() > 300 }}"
```

{% endraw %}

which will evaluate to `True` if `YOUR.ENTITY` changed more than 300 seconds ago.

### Time trigger

The time trigger is configured to fire once at a specific point in time each day.

```yaml
automation:
  trigger:
    platform: time
    # Military time format. This trigger will fire at 3:32 PM
    at: "15:32:00"
```

### Time pattern trigger

With the time pattern trigger, you can match if the hour, minute or second of the current time matches a specific value. You can prefix the value with a `/` to match whenever the value is divisible by that number. You can specify `*` to match any value (when using the web interface this is required, the fields cannot be left empty).

```yaml
automation:
  trigger:
    platform: time_pattern
    # Matches every hour at 5 minutes past whole
    minutes: 5

automation 2:
  trigger:
    platform: time_pattern
    # Trigger once per minute during the hour of 3
    hours: "3"
    minutes: "*"

automation 3:
  trigger:
    platform: time_pattern
    # You can also match on interval. This will match every 5 minutes
    minutes: "/5"
```

<div class='note warning'>

Do not prefix numbers with a zero - using `'00'` instead of '0' for example will result in errors.

</div>

### Webhook trigger

Webhook trigger fires when a web request is made to the webhook endpoint: `/api/webhook/<webhook_id>`. The webhook endpoint is created automatically when you set it as the `webhook_id` in an automation trigger. 

```yaml
automation:
  trigger:
    platform: webhook
    webhook_id: some_hook_id
```

You can run this automation by sending an HTTP POST request to `http://your-home-assistant:8123/api/webhook/some_hook_id`. Here is an example using the **curl** command line program, with an empty data payload:

```
curl -d "" https://your-home-assistant:8123/api/webhook/some_hook_id
```

Webhook endpoints don't require authentication, other than knowing a valid webhook ID. You can send a data payload, either as encoded form data or JSON data. The payload is available in an automation template as either `trigger.json` or `trigger.data`. URL query parameters are available in the template as `trigger.query`. Remember to use an HTTPS URL if you've secured your Home Assistant installation with SSL/TLS. 

Note that a given webhook can only be used in one automation at a time. That is, only one automation trigger can use a specific webhook ID.

### Zone trigger

Zone trigger fires when an entity is entering or leaving the zone. For zone automation to work, you need to have setup a device tracker platform that supports reporting GPS coordinates. This includes [GPS Logger](/integrations/gpslogger/), the [OwnTracks platform](/integrations/owntracks/) and the [iCloud platform](/integrations/icloud/).

```yaml
automation:
  trigger:
    platform: zone
    entity_id: device_tracker.paulus
    zone: zone.home
    # Event is either enter or leave
    event: enter # or "leave"
```

### Geolocation trigger

Geolocation trigger fires when an entity is appearing in or disappearing from a zone. Entities that are created by a [Geolocation](/integrations/geo_location/) platform support reporting GPS coordinates.
Because entities are generated and removed by these platforms automatically, the entity id normally cannot be predicted. Instead, this trigger requires the definition of a `source`, which is directly linked to one of the Geolocation platforms.

```yaml
automation:
  trigger:
    platform: geo_location
    source: nsw_rural_fire_service_feed
    zone: zone.bushfire_alert_zone
    # Event is either enter or leave
    event: enter # or "leave"
```

### Multiple triggers

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
