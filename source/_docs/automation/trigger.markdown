---
title: "Automation triggers"
description: "Triggers are the events that start an automation, such as a sensor changing state, a time of day, the sun setting, or a person arriving home."
related:
  - docs: /voice_control/custom_sentences/#adding-a-custom-sentence-to-trigger-an-automation
    title: Adding a custom sentence to trigger an automation
---

A trigger is what wakes an automation up. Until something triggers it, an automation just sits there quietly, waiting. The moment a trigger fires, Home Assistant checks any [conditions](/docs/automation/condition/) you set, and if they pass, it runs the [actions](/docs/automation/action/).

Triggers can be almost anything that happens in your home or in Home Assistant itself. A motion sensor detecting movement. The sun going down. A specific time of day. A person arriving home. A button on a remote being pressed. Even a voice command spoken to Assist. You can give a single automation more than one trigger, and the automation will start as soon as _any_ of them fires.

## Elements of a trigger in YAML

The main elements of a trigger that are defined in the `configuration.yaml` file are:

- trigger ID
- trigger variables.

### Trigger ID

All triggers can be assigned an optional `id`. If the ID is omitted, it will instead be set to the index of the trigger. The `id` can be referenced from [trigger conditions and actions](/docs/scripts/conditions/#trigger-condition). The `id` does not have to be unique for each trigger, and it can be used to group similar triggers for use later in the automation (such as several triggers of different types that should all turn some entity on).

Trigger IDs also allow you to set up an automation with many actions, each action depending on a different trigger. An action will be connected to a trigger through the trigger ID and fires only if that trigger is verified. To know how to create an automation using trigger IDs, refer to [Creating an automation with actions that depend on different triggers](/docs/automation/trigger/#creating-an-automation-with-actions-that-depend-on-different-triggers).

#### YAML example

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

### Trigger variables

There are two different types of variables available for triggers. Both work like [script level variables](/integrations/script/#variables).

The first variant allows you to define variables that will be set when the trigger fires. The variables will be able to use templates and have access to [the `trigger` variable](/docs/automation/templating#available-trigger-data).

The second variant is setting variables that are available when attaching a trigger when the trigger can contain templated values. These are defined using the `trigger_variables` key at an automation level. These variables can only contain [limited templates](/docs/templating/where-to-use/#limited-templates). The triggers will not re-apply if the value of the template changes. Trigger variables are a feature meant to support using blueprint inputs in triggers.

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

## Types of triggers

Each trigger has a type that depends on the target of the trigger, usually corresponding to the {% term domain %} of the target. The following types are available.

### Button trigger

{% include integrations/labs_entity_triggers_note.md %}

Fires when a button entity is pressed. See [Button triggers](/integrations/button/#triggers).

In YAML, use: `trigger: button`.

### Calendar triggers

Calendar trigger fires when a [Calendar](/integrations/calendar/) event starts or ends, allowing
for much more flexible automations than using the Calendar entity state which only supports a single
event start at a time.

An optional time offset can be given to have it fire a set time before or after the calendar event (such as 5 minutes before event start).

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

### Climate triggers

{% include integrations/labs_entity_triggers_note.md %}

Fires when a climate device turns on or off, starts heating, cooling, or drying, when the HVAC mode changes, or when a target temperature or humidity setpoint changes or crosses a threshold. See [Climate triggers](/integrations/climate/#triggers).

In YAML, use: `trigger: climate`.

### Device tracker triggers

{% include integrations/labs_entity_triggers_note.md %}

Fires when a tracked device arrives home or leaves home, or when the first device arrives or the last device leaves. See [Device tracker integration](/integrations/device_tracker/#triggers).

In YAML, use: `trigger: device_tracker`.

### Device triggers

Device triggers encompass a set of events that are defined by an integration. This includes, for example, state changes of sensors as well as button events from remotes.
[MQTT device triggers](/integrations/device_trigger.mqtt/) are set up through autodiscovery.

In contrast to state triggers, device triggers are tied to a device and not necessarily an entity.
To use a device trigger, set up an automation through the browser frontend.
If you would like to use a device trigger for an automation that is not managed through the browser frontend, you can copy the YAML from the trigger widget in the frontend and paste it into your automation's trigger list.

### Door triggers

{% include integrations/labs_entity_triggers_note.md %}

Fires when a door opens or closes. See [Door triggers](/integrations/door/).

In YAML, use: `trigger: door`.

### Event trigger

For setup steps, YAML options, and examples for the event trigger, see [Event trigger](/triggers/event/).

### Fan triggers

{% include integrations/labs_entity_triggers_note.md %}

Fires when a fan turns on or turns off. See [Fan triggers](/integrations/fan/#triggers).

In YAML, use: `trigger: fan`.

### Garage door triggers

{% include integrations/labs_entity_triggers_note.md %}

Fires when a garage door opens or closes. See [Garage door triggers](/integrations/garage_door/).

In YAML, use: `trigger: door`.

### Geolocation trigger

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

### Home Assistant trigger

For setup steps, YAML options, and examples for the Home Assistant trigger, see [Home Assistant trigger](/triggers/homeassistant/).

### Humidifier triggers

{% include integrations/labs_entity_triggers_note.md %}

Fires when a humidifier turns on or off, or starts humidifying or drying. See [Humidifier triggers](/integrations/humidifier/#triggers).

In YAML, use: `trigger: humidifier`.

### Humidity triggers

{% include integrations/labs_entity_triggers_note.md %}

Fires when humidity changes or crosses a threshold on a humidity sensor, climate, humidifier, or weather entity. See [Humidity triggers](/integrations/humidity/).

In YAML, use: `trigger: humidity`.

#### Example: Trigger when bedroom humidity rises above 70%

```yaml
automation:
  triggers:
    - trigger: humidity.crossed_threshold
      target:
        entity_id: sensor.bedroom_humidity
      options:
        threshold_type: above
        lower_limit: 70
```

### Light triggers

{% include integrations/labs_entity_triggers_note.md %}

Fires when a light turns on or off, or when its brightness changes or crosses a threshold. See [Light triggers](/integrations/light/#triggers).

In YAML, use: `trigger: light`.

#### Example: Trigger when the living room light turns on

```yaml
automation:
  triggers:
    - trigger: light.turned_on
      target:
        entity_id: light.living_room
      options:
        behavior: any
```

### Lock triggers

{% include integrations/labs_entity_triggers_note.md %}

Fires when a lock is locked, unlocked, opened, or jammed. See [Lock triggers](/integrations/lock/#triggers).

In YAML, use: `trigger: lock`.

### MQTT trigger

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

```yaml
automation:
  triggers:
    - trigger: mqtt
      topic: "living_room/switch/ac"
      payload: "on"
      value_template: "{{ value_json.state }}"
```

It's also possible to use [limited templates](/docs/templating/where-to-use/#limited-templates) in the `topic` and `payload` options.

{% note %}
The `topic` and `payload` templates are only evaluated when setting up the trigger, they will not be re-evaluated for every incoming MQTT message.
{% endnote %}

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

### Numeric state trigger

For setup steps, YAML options, and examples for the numeric state trigger, see [Numeric state trigger](/triggers/numeric_state/).

### Persistent notification trigger

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

### Person triggers

{% include integrations/labs_entity_triggers_note.md %}

Fires when a person arrives home or leaves home. See [Person triggers](/integrations/person/#triggers).

In YAML, use: `trigger: person`.

### Scene trigger

{% include integrations/labs_entity_triggers_note.md %}

Fires when a scene is activated. See [Scene triggers](/integrations/scene/#triggers).

In YAML, use: `trigger: scene`.

### Sentence trigger

A sentence trigger fires when [Assist](/voice_control/) matches a sentence from a voice assistant using the default [conversation agent](/integrations/conversation/). Sentence triggers work with Home Assistant Assist. They will not work with external conversation agents such as OpenAI or Google Generative AI unless "Prefer handling commands locally" is enabled in the conversation agent settings.

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

#### Related topic

- [Adding a custom sentence to trigger an automation](/voice_control/custom_sentences/#adding-a-custom-sentence-to-trigger-an-automation)

#### Sentence wildcards

Adding one or more `{lists}` to your trigger sentences will capture any text at that point in the sentence. A `slots` object will be [available in the trigger data](/docs/automation/templating#sentence).
This allows you to match sentences with variable parts, such as album/artist names or a description of a picture.

For example, the sentence `play {album} by {artist}` will match "play the white album by the beatles" and have the following variables available in the action templates:

{% raw %}

- `{{ trigger.slots.album }}` - "the white album"
- `{{ trigger.slots.artist }}` - "the beatles"

{% endraw %}

Wildcards will match as much text as possible, which may lead to surprises: "play day by day by taken by trees" will match `album` as "day" and `artist` as "day by taken by trees".
Including extra words in your template can help: `play {album} by artist {artist}` can now correctly match "play day by day by artist taken by trees".

### Siren triggers

{% include integrations/labs_entity_triggers_note.md %}

Fires when a siren turns on or turns off. See [Siren triggers](/integrations/siren/#triggers).

In YAML, use: `trigger: siren`.

### State trigger

For setup steps, YAML options, and examples for the state trigger, see [State trigger](/triggers/state/).

### Sun trigger

#### Sunset and Sunrise trigger

Fires when the sun is setting or rising—that is, when the sun elevation reaches 0°.

An optional time offset can be given to have it fire a set time before or after the sun event (for example, 45 minutes before sunset). A negative value makes it fire before sunrise or sunset, a positive value afterwards. The offset needs to be specified in number of seconds, or in a hh:mm:ss format.

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

#### Sun elevation trigger

Sometimes you may want more granular control over an automation than simply sunset or sunrise and specify an exact elevation of the sun. This can be used to layer automations to occur as the sun lowers on the horizon or even after it is below the horizon. This is also useful when the "sunset" event is not dark enough outside and you would like the automation to run later at a precise solar angle instead of the time offset such as turning on exterior lighting. For most automations intended to run during dusk or dawn, a number between 0° and -6° is suitable; -4° is used in this example:

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

If you want to get more precise, you can use this [solar calculator](https://gml.noaa.gov/grad/solcalc/), which will help you estimate what the solar elevation will be at any specific time. Then from this, you can select from the defined twilight numbers.

Although the actual amount of light depends on weather, topography and land cover, they are defined as:

- Civil twilight: 0° > Solar angle > -6°

  This is what is meant by twilight for the average person: Under clear weather conditions, civil twilight approximates the limit at which solar illumination suffices for the human eye to clearly distinguish terrestrial objects. Enough illumination renders artificial sources unnecessary for most outdoor activities.

- Nautical twilight: -6° > Solar angle > -12°
- Astronomical twilight: -12° > Solar angle > -18°

A very thorough explanation of this is available in the Wikipedia article about the [Twilight](https://en.wikipedia.org/wiki/Twilight).

### Tag trigger

Fires when a [tag](/integrations/tag) is scanned. For example, an NFC tag is
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

### Template trigger

Template triggers work by evaluating a [template](/docs/templating/) when any of the recognized entities change state. The trigger will fire if the state change caused the template to render 'true' (a non-zero number or any of the strings `true`, `yes`, `on`, `enable`) when it was previously 'false' (anything else).

This is achieved by having the template result in a true boolean expression (for example `{{ is_state('device_tracker.paulus', 'home') }}`) or by having the template render `true` (example below).

With template triggers you can also evaluate attribute changes by using is_state_attr (like `{{ is_state_attr('climate.living_room', 'away_mode', 'off') }}`)

```yaml
automation:
  triggers:
    - trigger: template
      value_template: "{% if is_state('device_tracker.paulus', 'home') %}true{% endif %}"

      # If given, will trigger when template remains true for X time.
      for: "00:01:00"
```

You can also use templates in the `for` option.

```yaml
automation:
  triggers:
    - trigger: template
      value_template: "{{ is_state('device_tracker.paulus', 'home') }}"
      for:
        minutes: "{{ states('input_number.minutes')|int(0) }}"
```

The `for` template(s) will be evaluated when the `value_template` becomes 'true'.

Templates that do not contain an entity will be rendered once per minute.

{% important %}
Use of the `for` option will not survive Home Assistant restart or the reload of automations. During restart or reload, automations that were awaiting `for` the trigger to pass, are reset.

If for your use case this is undesired, you could consider using the automation to set an [`input_datetime`](/integrations/input_datetime) to the desired time and then use that [`input_datetime`](/integrations/input_datetime) as an automation trigger to perform the desired actions at the set time.
{% endimportant %}

### Time pattern trigger

With the time pattern trigger, you can match if the hour, minute or second of the current time matches a specific value. You can prefix the value with a `/` to match whenever the value is divisible by that number. You can specify `*` to match any value.

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

### Time trigger

For setup steps, YAML options, and examples for the time trigger, see [Time trigger](/triggers/time/).

### Update trigger

For setup steps, YAML options, and examples for the time pattern trigger, see [Time pattern trigger](/triggers/time_pattern/).

Fires when a vacuum cleaner starts cleaning, pauses, starts returning, docks, or encounters an error. See [Vacuum triggers](/integrations/vacuum/#triggers).

In YAML, use: `trigger: vacuum`.

### Webhook trigger

Webhook trigger fires when a web request is made to the webhook endpoint: `/api/webhook/<webhook_id>`. The webhook endpoint is created automatically when you set it as the `webhook_id` in an automation trigger. The `webhook_id` can either be a static value or computed using [limited templates](/docs/templating/where-to-use/#limited-templates).

{% note %}
The `webhook_id` template is only evaluated when setting up the trigger, they will not be re-evaluated for incoming webhook triggers.
{% endnote %}

```yaml
automation:
  trigger_variables:
    webhook_id_variable: "template_webhook_id"
  triggers:
    - trigger: webhook
      webhook_id: "some_hook_id"
      allowed_methods:
        - POST
        - PUT
      local_only: true
    - trigger: webhook
      webhook_id: "{{ webhook_id_variable }}"
      allowed_methods:
        - POST
```

You can run this automation by sending an HTTP POST request to `http://your-home-assistant:8123/api/webhook/some_hook_id`. Here is an example using the **curl** command line program, with an example form data payload:

```shell
curl -X POST -d 'key=value&key2=value2' https://your-home-assistant:8123/api/webhook/some_hook_id
```

Webhooks support HTTP POST, PUT, HEAD, and GET requests; PUT requests are recommended. HTTP GET and HEAD requests are not enabled by default but can be enabled by adding them to the `allowed_methods` option. The request methods can also be configured in the UI by selecting the settings gear menu button beside the Webhook ID.

By default, webhook triggers can only be accessed from devices on the same network as Home Assistant or via [Nabu Casa Cloud webhooks](https://www.nabucasa.com/config/webhooks/). The `local_only` option should be set to `false` to allow webhooks to be triggered directly via the internet. This option can also be configured in the UI by selecting the settings gear menu button beside the Webhook ID.

Remember to use an HTTPS URL if you've secured your Home Assistant installation with SSL/TLS.

Note that a given webhook can only be used in one automation at a time. That is, only one automation trigger can use a specific webhook ID.

#### Webhook data

Payloads may either be encoded as form data or JSON. Depending on that, its data will be available in an automation template as either `trigger.data` or `trigger.json`. URL query parameters are also available in the template as `trigger.query`.

Note that to use JSON encoded payloads, the `Content-Type` header must be set to `application/json`, for example:

```bash
curl -X POST -H "Content-Type: application/json" -d '{ "key": "value" }' https://your-home-assistant:8123/api/webhook/some_hook_id
```

#### Webhook security

Webhook endpoints don't require authentication, other than knowing a valid webhook ID. Security best practices for webhooks include:

- Do not use webhooks to trigger automations that are destructive, or that can create safety issues. For example, do not use a webhook to unlock a lock, or open a garage door.
- Treat a webhook ID like a password: use a unique, non-guessable value, and keep it secret.
- Do not copy-and-paste webhook IDs from public sources, including blueprints. Always create your own.
- Keep the `local_only` option enabled for webhooks if access from the internet is not required.

### Zone trigger

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

## Unavailable and unknown state behavior in triggers

Most triggers that have an entity as the target do not fire when an entity transitions _from_ an `unavailable` or `unknown` state. For example, if a light goes offline and comes back on, the `light.turned_on` trigger does not fire for that recovery.

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

## Entity triggers

Entity triggers, also called *purpose-specific triggers*, let you trigger automations based on what an entity *does*. Instead of writing a [numeric state trigger](#numeric-state-trigger) or a [state trigger](#state-trigger) to detect a technical state change, you can say things like "When a light turns on" or "When the climate starts heating".

{% include integrations/labs_entity_triggers_note.md %}

Entity triggers allow you to target a specific entity, an area, a floor, or a label. This means you can trigger when any light in your living room turns on, without listing each light individually or creating a group first. When you add or remove devices in an area, your automations automatically stay in sync. This also makes your automations much easier to read at a glance, since the target makes the intent of the automation immediately clear.

### Entity trigger YAML structure

Entity triggers use the following YAML structure:

```yaml
automation:
  triggers:
    - trigger: <domain>.<trigger_type>
      target:
        entity_id: <entity_id>
      options: {}
```

The `trigger` key combines the entity domain and trigger type (such as `light.turned_on` or `humidity.changed`). Use the `target` key to specify which entity or entities to monitor. Use the `options` key to configure trigger-specific settings, such as `behavior`, `above`/`below` range limits, or `threshold_type`.

### Unavailable and unknown state behavior

Most entity triggers do not fire when an entity transitions *from* an `unavailable` or `unknown` state. For example, if a light goes offline and comes back on, the `light.turned_on` trigger does not fire for that recovery.

The exception is *origin-state triggers* — triggers that fire when an entity *leaves* a specific state. The `person.left_home` and `device_tracker.left_home` triggers fire whenever the entity changes *from* `home` to any other state, including `unavailable` or `unknown`. This means a device going offline while at home fires the `left_home` trigger. If you're using `left_home` to turn off lights when everyone has left, consider adding a [`person.is_not_home`](/integrations/person/#condition-person-is-not-home) or [`device_tracker.is_not_home`](/integrations/device_tracker/#condition-device-tracker-is-not-home) condition to avoid acting on unavailability.

### List of entity trigger types

The following trigger types are available per domain:

- **Button** (`trigger: button`): Fires when a button entity is pressed. See [Button triggers](/integrations/button/#triggers).
- **Calendar** (`trigger: calendar`): Fires when a calendar event starts or ends.
- **Climate** (`trigger: climate`): Fires when a climate device turns on or off, starts heating, cooling, or drying, when the HVAC mode changes, or when a target temperature or humidity setpoint changes or crosses a threshold. See [Climate triggers](/integrations/climate/#triggers).
- **Device tracker** (`trigger: device_tracker`): Fires when a tracked device arrives home or leaves home, or when the first device arrives or the last device leaves. See [Device tracker triggers](/integrations/device_tracker/#triggers).
- **Door** (`trigger: door`): Fires when a door opens or closes. See [Door triggers](/integrations/door/).
- **Fan** (`trigger: fan`): Fires when a fan turns on or turns off. See [Fan triggers](/integrations/fan/#triggers).
- **Garage door** (`trigger: door`): Fires when a garage door opens or closes. See [Garage door triggers](/integrations/garage_door/).
- **Humidity** (`trigger: humidity`): Fires when humidity changes or crosses a threshold on a humidity sensor, climate, humidifier, or weather entity. See [Humidity triggers](/integrations/humidity/).
- **Humidifier** (`trigger: humidifier`): Fires when a humidifier turns on or off, or starts humidifying or drying. See [Humidifier triggers](/integrations/humidifier/#triggers).
- **Light** (`trigger: light`): Fires when a light turns on or off, or when its brightness changes or crosses a threshold. See [Light triggers](/integrations/light/#triggers).
- **Lock** (`trigger: lock`): Fires when a lock is locked, unlocked, opened, or jammed. See [Lock triggers](/integrations/lock/#triggers).
- **Person** (`trigger: person`): Fires when a person arrives home or leaves home. See [Person triggers](/integrations/person/#triggers).
- **Scene** (`trigger: scene`): Fires when a scene is activated. See [Scene triggers](/integrations/scene/#triggers).
- **Siren** (`trigger: siren`): Fires when a siren turns on or turns off. See [Siren triggers](/integrations/siren/#triggers).
- **Update** (`trigger: update`): Fires when an update becomes available for a device or add-on (`update_became_available`). See [Update triggers](/integrations/update/#triggers).
- **Vacuum** (`trigger: vacuum`): Fires when a vacuum cleaner starts cleaning, pauses, starts returning, docks, or encounters an error. See [Vacuum triggers](/integrations/vacuum/#triggers).

### Example: Trigger when bedroom humidity rises above 70%

```yaml
automation:
  triggers:
    - trigger: humidity.crossed_threshold
      target:
        entity_id: sensor.bedroom_humidity
      options:
        threshold_type: above
        lower_limit: 70
```

### Example: Trigger when the living room light turns on

```yaml
automation:
  triggers:
    - trigger: light.turned_on
      target:
        entity_id: light.living_room
      options:
        behavior: any
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

An optional time offset can be given to have it fire a set time before or after the calendar event (such as 5 minutes before event start).

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

A sentence trigger fires when [Assist](/voice_control/) matches a sentence from a voice assistant using the default [conversation agent](/integrations/conversation/). Sentence triggers work with Home Assistant Assist. They will not work with external conversation agents such as OpenAI or Google Generative AI unless "Prefer handling commands locally" is enabled in the conversation agent settings.

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

- `{{ trigger.slots.album }}` - "the white album"
- `{{ trigger.slots.artist }}` - "the beatles"

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

## Merging lists of triggers

{% note %}
This feature requires Home Assistant version 2024.10 or later. If using this in a blueprint, set the `min_version` for the blueprint to at least this version. See the [blueprint schema documentation](/docs/blueprint/schema/#min_version) for more details.
{% endnote %}

In some cases, like when using blueprints with trigger selectors, you may need to insert a second list of triggers into the main trigger list. You can do this by adding a dictionary in the main trigger list with only the `triggers` key, and the value for that key contains a second list of triggers. These will then be flattened into a single list of triggers. For example:

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

## Creating an automation with actions that depend on different triggers

Instead of creating many automations for different groups of related triggers and actions, you can build a single one in the visual editor of the UI by following the steps below.

1. Go to **Settings** > **Automations & scenes**.
2. In the lower right corner, select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for the trigger using the search box, for example, and then select it.
5. In the trigger window on the right, edit the **Trigger ID** by going to the three dots {% icon "mdi:dots-vertical" %} menu > **Edit ID**.
6. In the **Then do** section, select **Add action** and then select the **Choose** block.
7. Expand the option section, select **Add condition** and, from the **By type** list, select the **Triggered by** condition.
8. In the condition window on the right, select the trigger ID that you added in step 5 and then **Save**.
9. In the section of the same option, select **Add action** and choose the action that will be fired by the related trigger.
10. In the action window on the right, select the target or group of targets, input any other requested data and select **Save**.
11. You can add more conditions and actions to that option by repeating steps 6 to 10.
12. Repeat steps 3 to 11 to add another trigger and related option for the new condition and action.
