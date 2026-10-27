---
title: "Trigger data in templates"
description: "Look up the data that each type of trigger passes to the templates in your automation, and the state and run context of the automation."
---

When a trigger starts an automation, the trigger passes data to the automation about what happened, such as which entity changed, and its old and new state. You can use this trigger data in the [templates](/docs/templating/) of your conditions and actions. For example, you can turn off the light that triggered the automation, or put the name of the sensor that triggered it in a notification.

## Template variables

The trigger data is in the `trigger` variable. To use a property of the trigger data in a template, write `trigger.` followed by the name of the property, such as `{{ trigger.to_state.state }}`. Each type of trigger passes different properties. For the full list, refer to [Trigger properties](#trigger-properties).

Automations also have two more variables:

- `this`: The [state of the automation](#state-of-the-automation) itself.
- `context`: The [context of the run](#context-of-the-run). Only available in the actions.

For example:

- `{{ trigger.platform }}` is the type of trigger, such as `state` or `calendar`
- `{{ trigger.to_state.name }}` is the name of the entity that triggered a state trigger
- `{{ this.attributes.friendly_name }}` is the name of the automation

## Seeing the trigger data of a run

To find out which properties a trigger passes, look at the trigger data of a real run:

- In the automation editor, when a trigger reacts, select the **Triggered** message on its row. The **Triggering event detail** dialog shows the trigger data. For details, refer to [Checking what triggered an automation](/docs/automation/testing/#checking-what-triggered-an-automation).
- In the [trace](/docs/automation/testing/#traces) of a run, select the trigger. Under **Step details**, **Changed variables** shows the trigger data.

When you run the actions of an automation with **Run actions**, or start the automation with the **Trigger automation** action, there's no trigger data. `trigger.platform` is `None`, and templates that use other trigger properties fail. To test an automation with real trigger data, [use a simulated trigger](/docs/automation/testing/#using-a-simulated-trigger-to-test-an-automation).

## Trigger properties

The template variable `trigger` contains the data of the [trigger](/docs/automation/trigger/) that started the automation. All triggers include a few shared properties, and each type of trigger adds its own.

### Properties of all triggers

All triggers include the following properties:

- `trigger.platform`: The type of trigger, such as `state` or `calendar`. For a trigger whose key contains a dot, such as an [entity trigger](#entity-triggers), it's the full trigger key, such as `light.turned_on`.
- `trigger.alias`: The alias of the trigger, or `None` if the trigger has no alias.
- `trigger.id`: The [`id` of the trigger](/docs/automation/trigger/#trigger-id). If you didn't set an `id`, it's the same as `trigger.idx`. To do something different depending on which trigger started the automation, use the [**Triggered by**](/conditions/trigger/) condition.
- `trigger.idx`: The position of the trigger in the list of triggers, as a string. The first trigger is `"0"`, so compare it with a string, such as `trigger.idx == "0"`.

Most triggers also include `trigger.description`, a short text that describes what triggered the automation, such as `state of light.kitchen`. The [sentence](#sentence-triggers) and [persistent notification](#persistent-notification-triggers) triggers don't include `trigger.description`.

### Entity triggers

Entity triggers react to a change of one or more entities, such as **Light turned on**. In YAML, an entity trigger uses the domain of the entities and the name of the trigger, such as `trigger: light.turned_on`.

These are the properties available for an entity trigger:

- `trigger.platform`: The full trigger key, such as `light.turned_on`.
- `trigger.entity_id`: The entity ID of the entity that changed.
- `trigger.from_state`: The previous [state object] of the entity.
- `trigger.to_state`: The new [state object] of the entity.
- `trigger.for`: Timedelta object of how long the entity had to stay in the new state, or `None` if the trigger has no duration.
- `trigger.description`: `state of` followed by the entity ID, such as `state of light.kitchen`.

Some other triggers with a full trigger key include different properties:

- The [calendar](#calendar-triggers), [moon](#moon-triggers), and [sun](#sun-triggers) triggers, described on this page
- [**Timer remaining time reached**](/triggers/timer.remaining_time_reached/#trigger-variables), described on its own page
- The to-do item triggers, such as [**To-do item added**](/triggers/todo.item_added/#trigger-variables), described on their own pages

### Calendar triggers

These are the properties available for a [**Calendar** trigger](/integrations/calendar/#automation).

- `trigger.platform`: `calendar`. For the **Calendar event started** and **Calendar event ended** triggers, it's the full trigger key: `calendar.event_started` or `calendar.event_ended`.
- `trigger.event`: The trigger event type, either `start` or `end`.
- `trigger.entity_id`: The entity ID of the calendar.
- `trigger.offset`: Timedelta object with the offset to the event. If the trigger has no offset, the offset is zero.
- `trigger.calendar_event`: The calendar event object that matched.
- `trigger.calendar_event.summary`: The title or summary of the calendar event.
- `trigger.calendar_event.start`: The start date or date and time of the calendar event, as an ISO 8601 string, for example `2026-10-17` or `2026-10-17T11:30:00-07:00`.
- `trigger.calendar_event.end`: The end date or date and time of the calendar event, as an ISO 8601 string, for example `2026-10-18` or `2026-10-17T11:45:00-07:00`. For an all-day event, the end date is the day after the last day of the event.
- `trigger.calendar_event.all_day`: `true` if the event spans the entire day, otherwise `false`.
- `trigger.calendar_event.description`: A detailed description of the calendar event, if available.
- `trigger.calendar_event.location`: Location information for the calendar event, if available.
- `trigger.calendar_event.status`: The status of the calendar event, either `confirmed` or `tentative`, if available. This is the status of the event itself, not your reply to an invitation.
- `trigger.calendar_event.uid`: The unique ID of the calendar event, if available.
- `trigger.calendar_event.rrule`: The recurrence rule of a recurring calendar event, such as `FREQ=WEEKLY;BYDAY=MO`, if available.
- `trigger.calendar_event.recurrence_id`: The ID of this occurrence of a recurring calendar event, if available.

The time zone in `start` and `end` depends on the calendar integration.

### Device triggers

These are the properties available for a [**Device** trigger](/triggers/device/).

A device trigger is built on another type of trigger, such as a [state](#state-triggers), [numeric state](#numeric-state-triggers), [event](#event-triggers), or [zone](#zone-triggers) trigger. It includes the properties of that trigger, except for `trigger.platform`:

- `trigger.platform`: `device` for most device triggers. Some integrations use a different value. For example, MQTT device triggers use `mqtt`.

### Event triggers

An event trigger reacts when an [event](/docs/configuration/events/) of the configured event type fires.

These are the properties available for a [**Manual event received** trigger](/triggers/event/).

- `trigger.platform`: `event`.
- `trigger.event`: Event object that matched.
- `trigger.event.event_type`: Event type.
- `trigger.event.data`: Optional event data.
- `trigger.event.context`: The context of the event. For example, `trigger.event.context.user_id` is the ID of the user who caused the event, if any.

### Geolocation triggers

These are the properties available for a [**Geolocation** trigger](/triggers/geo_location/).

- `trigger.platform`: `geo_location`.
- `trigger.entity_id`: Entity ID of the geolocation entity.
- `trigger.from_state`: Previous [state object] of the entity. `None` if the entity was just created.
- `trigger.to_state`: New [state object] of the entity. `None` if the entity was removed.
- `trigger.event`: The trigger event type, either `enter` or `leave`.
- `trigger.source`: The Geolocation platform creating the trigger event.
- `trigger.zone`: State object of the zone.

### Home Assistant triggers

The Home Assistant trigger is recommended for automations instead of [homeassistant_start or homeassistant_stop events](/docs/configuration/events/#homeassistant_start-homeassistant_started).

The Home Assistant triggers with a full trigger key include these properties:

- [**Restart required**](/triggers/homeassistant.restart_required/) (`homeassistant.restart_required`): `trigger.sources`, a list of the integrations that asked for a restart, by their domain. `trigger.description` is `Home Assistant restart required`.
- [**Host reboot required**](/triggers/homeassistant.host_reboot_required/) (`homeassistant.host_reboot_required`): no more properties. `trigger.description` is `host reboot required`.

These are the properties available for a [**Home Assistant** trigger](/triggers/homeassistant/).

- `trigger.platform`: `homeassistant`.
- `trigger.event`: The trigger event type, either `start` or `shutdown`.

### Moon triggers

These are the properties available for the [**Moon phase changed**](/triggers/moon.phase_changed/) trigger.

- `trigger.platform`: `moon.phase_changed`.
- `trigger.phase`: The new moon phase, such as `full_moon`.
- `trigger.previous_phase`: The previous moon phase, such as `waxing_gibbous`.
- `trigger.description`: `moon phase changed`.

### MQTT triggers

These are the properties available for an [**MQTT message received** trigger](/triggers/mqtt/).

- `trigger.platform`: `mqtt`.
- `trigger.topic`: Topic that received the payload.
- `trigger.payload`: Payload.
- `trigger.payload_json`: The payload parsed as JSON. Only available if the payload is valid JSON. It can be a dictionary, a list, or a single value, such as a number.
- `trigger.qos`: QoS of the payload.

### Numeric state triggers

These are the properties available for a [**Numeric state crossed threshold** trigger](/triggers/numeric_state/).

- `trigger.platform`: `numeric_state`.
- `trigger.entity_id`: Entity ID that the trigger monitors.
- `trigger.below`: The below threshold, if any. If the threshold is set by an entity, this is the entity ID.
- `trigger.above`: The above threshold, if any. If the threshold is set by an entity, this is the entity ID.
- `trigger.from_state`: The previous [state object] of the entity. `None` if the entity was just created.
- `trigger.to_state`: The new [state object] that triggered the trigger.
- `trigger.for`: Timedelta object of how long the state has met the above/below criteria, or `None` if the trigger has no duration.

### Persistent notification triggers

These properties are available for a [**Persistent notification** trigger](/triggers/persistent_notification/).

- `trigger.platform`: `persistent_notification`.
- `trigger.update_type`: Type of persistent notification update: `added`, `removed`, or `updated`.
- `trigger.notification`: Notification object that triggered the persistent notification trigger.
- `trigger.notification.notification_id`: The notification ID.
- `trigger.notification.title`: Title of the notification, if any.
- `trigger.notification.message`: Message of the notification.
- `trigger.notification.created_at`: DateTime object indicating when the notification was created, in UTC.

### Sentence triggers

These are the properties available for a [**Sentence** trigger](/triggers/conversation/).

- `trigger.platform`: `conversation`.
- `trigger.sentence`: The text of the sentence that you said or typed.
- `trigger.slots`: Object with matched slot values.
- `trigger.details`: Object with matched slot details by name, such as [wildcards](/triggers/conversation/#sentence-wildcards). Each detail contains:
  - `name`: The name of the slot.
  - `text`: The matched text.
  - `value`: The output value. For more information, refer to [lists](https://contributors.home-assistant.io/translate/voice/template-syntax/#lists).
- `trigger.device_id`: The device ID that captured the command, if any.
- `trigger.satellite_id`: The entity ID of the satellite that captured the command, if any.
- `trigger.user_input`: Object with details about the command, such as `text`, `language`, `conversation_id`, `agent_id`, `device_id`, and `satellite_id`.

### State triggers

These are the properties available for a [**State changed** trigger](/triggers/state/).

- `trigger.platform`: `state`.
- `trigger.entity_id`: Entity ID that the trigger monitors.
- `trigger.from_state`: The previous [state object] of the entity. `None` if the entity was just created.
- `trigger.to_state`: The new [state object] that triggered the trigger. `None` if the entity was removed.
- `trigger.for`: Timedelta object of how long the state has been in the new state, or `None` if the trigger has no duration.
- `trigger.attribute`: The attribute that the trigger monitors, or `None` if the trigger monitors the state.

### Sun triggers

These are the properties available for a [**Sun** trigger](/docs/automation/trigger/#sun-trigger).

- `trigger.platform`: `sun`.
- `trigger.event`: The event that just happened: `sunset` or `sunrise`.
- `trigger.offset`: Timedelta object with the offset to the event. If the trigger has no offset, the offset is zero.

The sun triggers with a full trigger key, such as **Sunrise** (`sun.sunrise`), have these properties instead:

- `trigger.platform`: The full trigger key, such as `sun.sunrise`.
- `trigger.description`: `sun event` followed by the event, such as `sun event sunrise` or `sun event golden_hour_started`.
- `trigger.type`: Only for **Dawn** (`sun.dawn`) and **Dusk** (`sun.dusk`). The type of twilight that you set: `civil`, `nautical`, or `astronomical`.
- `trigger.period`: Only for the golden hour and blue hour triggers, such as **Golden hour started** (`sun.golden_hour_started`). The period that you set: `any`, `morning`, or `evening`. It's the option of the trigger, not the time of day when it reacted.

**Sun elevation changed** (`sun.elevation_changed`) and **Sun elevation crossed threshold** (`sun.elevation_crossed_threshold`) have different properties because they're [entity triggers](#entity-triggers) of `sun.sun`.

### Tag triggers

These are the properties available for a [**Tag** trigger](/triggers/tag/).

- `trigger.platform`: `tag`.
- `trigger.event`: The `tag_scanned` event object.
- `trigger.event.data.tag_id`: The tag ID captured.
- `trigger.event.data.name`: The name of the tag, or `None` if the tag has no name.
- `trigger.event.data.device_id`: The device ID that captured the tag, or `None` if not known.

### Template triggers

These are the properties available for a [**Template** trigger](/triggers/template/).

- `trigger.platform`: `template`.
- `trigger.entity_id`: Entity ID that caused the change.
- `trigger.from_state`: Previous [state object] of the entity that caused the change.
- `trigger.to_state`: New [state object] of the entity that caused the template to change.
- `trigger.for`: Timedelta object of how long the template has been true, or `None` if the trigger has no duration.

If the template changed because of time, for example because it uses `now()`, `trigger.entity_id`, `trigger.from_state`, and `trigger.to_state` are `None`.

### Time triggers

These are the properties available for a [**Time** trigger](/triggers/time/).

- `trigger.platform`: `time`.
- `trigger.now`: DateTime object that triggered the time trigger, in your local time zone.
- `trigger.entity_id`: The entity ID of the **Date and/or time** helper or the sensor that set the time, or `None` if the trigger uses a fixed time.

### Time pattern triggers

These are the properties available for a [**Time pattern** trigger](/triggers/time_pattern/).

- `trigger.platform`: `time_pattern`.
- `trigger.now`: DateTime object that triggered the time pattern trigger, in your local time zone. If the trigger reacts every second, for example with `seconds: "*"`, `trigger.now` is in UTC instead. To get the local time in that case, use [`as_local(trigger.now)`](/template-functions/as_local/).

### Webhook triggers

These are the properties available for a [**Webhook** trigger](/triggers/webhook/).

- `trigger.platform`: `webhook`.
- `trigger.webhook_id`: The webhook ID that was triggered.
- `trigger.json`: The JSON data of the request, if the request has a JSON content type.
- `trigger.data`: The form data of the request, if the request doesn't have a JSON content type.
- `trigger.query`: The URL query parameters of the request. Empty if the request has none.

### Zone triggers

These are the properties available for a [**Zone** trigger](/docs/automation/trigger/#zone-trigger).

- `trigger.platform`: `zone`.
- `trigger.entity_id`: Entity ID that the trigger monitors.
- `trigger.from_state`: Previous [state object] of the entity. `None` if the entity was just created.
- `trigger.to_state`: New [state object] of the entity. `None` if the entity was removed.
- `trigger.zone`: State object of the zone.
- `trigger.event`: Event that the trigger observed: `enter` or `leave`.

Zone triggers with a full trigger key, such as **Zone entered** (`zone.entered`), are [entity triggers](#entity-triggers).

## State of the automation

The template variable `this` contains the [state object] of the automation at the moment the automation is triggered, before the new run starts. You can also use `this` in [`trigger_variables`](/docs/automation/trigger/#trigger-variables). `this` doesn't change while the {% term actions %} run, even if the state of the automation changes. To find out who or what caused the run, refer to [Context of the run](#context-of-the-run).

These are the most useful properties of `this`:

- `this.attributes.last_triggered`: When the automation last ran before this run, or `None` if the automation never ran. A run only counts if the conditions of the automation were met. Use it to limit how often the automation does something, for example, to send a notification at most once an hour.
- `this.entity_id`: The entity ID of the automation. Use it to refer to the automation itself, for example, in a {% term blueprint %}, where you don't know the entity ID in advance.
- `this.attributes.friendly_name`: The name of the automation.
- `this.attributes.current`: The number of runs of the automation that already existed. In **Queued** mode, this includes the runs that are waiting in the queue. Only useful if the [mode](/docs/automation/modes/) of the automation is **Parallel** or **Queued**.
- `this.attributes.id`: The ID of the automation, if it has one.

## Context of the run

The template variable `context` contains the context of the current run. You can use `context` in the actions of an automation and in scripts. `context` isn't available in the `variables` section of an automation or script, or in the conditions of an automation.

`context` has the following properties:

- `context.id`: The ID of the run.
- `context.parent_id`: In an automation, the ID of the context of the event that triggered the automation.
- `context.user_id`: The ID of the user who started the run, if any. In an automation, `context.user_id` is always empty.

To find out which user caused an automation to run, use the context of the trigger instead. For example, use `trigger.to_state.context.user_id` for a state trigger, or `trigger.event.context.user_id` for an event trigger.

## Examples

### Notify when a person changes location

The notification uses the old and new state of the entity, and the ID of the trigger.

{% example %}
automation: |
  triggers:
    - trigger: state
      entity_id: device_tracker.paulus
      id: paulus_device
  actions:
    - action: notify.notify
      data:
        message: >
          Paulus just changed from {{ trigger.from_state.state }}
          to {{ trigger.to_state.state }}

          This was triggered by {{ trigger.id }}
{% endexample %}

### Send an MQTT message to a notifier named in the topic

The last part of the MQTT topic picks the notifier, and the payload is the message.

<!-- Disable terminology test, because the MQTT trigger key is lowercase. -->
<!-- textlint-disable terminology -->

{% example %}
automation: |
  triggers:
    - trigger: mqtt
      topic: "/notify/+"
  actions:
    - action: >
        notify.{{ trigger.topic.split('/')[-1] }}
      data:
        message: "{{ trigger.payload }}"
{% endexample %}

<!-- textlint-enable terminology -->

### Turn off a light that was left on

One trigger monitors several lights. The action turns off whichever light triggered the automation.

{% example %}
automation: |
  triggers:
    # Multiple entities for which you want to perform the same action.
    - trigger: state
      entity_id:
        - light.bedroom_closet
        - light.kiddos_closet
        - light.linen_closet
      to: "on"
      # Trigger when someone leaves one of those lights on for 10 minutes.
      for: "00:10:00"
  actions:
    - action: light.turn_off
      target:
        # Turn off whichever entity triggered the automation.
        entity_id: "{{ trigger.entity_id }}"
{% endexample %}

### Turn off lights when certain people scan a tag

The trigger only reacts to tag scans by certain users. The condition checks the ID of the scanned tag in the event data.

{% example %}
automation: |
  triggers:
    # When an NFC tag is scanned by Home Assistant...
    - trigger: event
      event_type: tag_scanned
      # ...By certain people
      context:
        user_id:
          - 06cbf6deafc54cf0b2ffa49552a396ba
          - 2df8a2a6e0be4d5d962aad2d39ed4c9c
  conditions:
    # Check NFC tag (ID) is the one by the front door
    - condition: template
      value_template: >
        {{ trigger.event.data.tag_id
           == '8b6d6755-b4d5-4c23-818b-cf224d221ab7' }}
  actions:
    # Turn off various lights
    - action: light.turn_off
      target:
        entity_id:
          - light.kitchen
          - light.bedroom
          - light.living_room
{% endexample %}

[state object]: /docs/configuration/state_object/
