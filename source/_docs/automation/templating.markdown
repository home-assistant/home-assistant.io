---
title: "Automation trigger variables"
description: "List all available variables made available by triggers."
---

Automations support [templating](/docs/configuration/templating/) in the same way as scripts do. In addition to the [Home Assistant template extensions](/docs/configuration/templating/#home-assistant-template-extensions) available to scripts, the `trigger` and `this` template variables are available.

The template variable `this` is also available when evaluating any `trigger_variables` declared in the configuration.

## Available `this` data

The variable `this` is the [state object](/docs/configuration/state_object) of the automation at the moment of triggering the actions. State objects also contain context data which can be used to identify the user that caused a {% term script %} or {% term automation %} to execute. Note that `this` will not change while executing the {% term actions %}.

## Available trigger data

The variable `trigger` is an object that contains details about which {% term trigger %} triggered the automation.

Templates can use the data to modify the actions performed by the automation or displayed in a message. For example, you could create an automation that multiple sensors can trigger and then use the sensor's location to specify a light to activate; or you could send a notification containing the friendly name of the sensor that triggered it.

Each [trigger platform](/docs/automation/trigger/#event-trigger) can include additional data specific to that platform.

### All

Triggers from all platforms will include the following data.

| Template variable | Data |
| ---- | ---- |
| `trigger.alias` | Alias of the trigger.
| `trigger.id` | The [`id` of the trigger](/docs/automation/trigger/#trigger-id).
| `trigger.idx` | Index of the trigger. (The first trigger idx is `0`.)

### Calendar

These are the properties available for a [Calendar trigger](/docs/automation/trigger/#calendar-trigger).

| Template variable                    | Data                                                                                                                            |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `trigger.platform`                   | Hardcoded: `calendar`                                                                                                           |
| `trigger.event`                      | The trigger event type, either `start`  or `end`                                                                                |
| `trigger.calendar_event`             | The calendar event object matched.                                                                                              |
| `trigger.calendar_event.summary`     | The title or summary of the calendar event.                                                                                     |
| `trigger.calendar_event.start`       | String representation of the start date or date time of the calendar event e.g. `2022-04-10`, or `2022-04-10 11:30:00-07:00`    |
| `trigger.calendar_event.end`         | String representation of the end time of date time the calendar event in UTC  e.g. `2022-04-11`, or `2022-04-10 11:45:00-07:00` |
| `trigger.calendar_event.all_day`     | Indicates the event spans the entire day.                                                                                       |
| `trigger.calendar_event.description` | A detailed description of the calendar event, if available.                                                                     |
| `trigger.calendar_event.location`    | Location information for the calendar event, if available.                                                                      |
| `trigger.offset`                     | Timedelta object with offset to the event, if any |

### Device

These are the properties available for a [Device trigger](/docs/automation/trigger/#device-trigger).

Inherites template variables from [event](#event) or [state](#state) template based on the type of trigger selected for the device.

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `device`.

### Event

These are the properties available for a [Event trigger](/docs/automation/trigger/#event-trigger).

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `event`.
| `trigger.event` | Event object that matched.
| `trigger.event.event_type` | Event type.
| `trigger.event.data` | Optional event data.

### MQTT

These are the properties available for a [MQTT trigger](/docs/automation/trigger/#mqtt-trigger).

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `mqtt`.
| `trigger.topic` | Topic that received payload.
| `trigger.payload` | Payload.
| `trigger.payload_json` | Dictionary of the JSON parsed payload.
| `trigger.qos` | QOS of payload.

### Numeric state

These are the properties available for a [numeric state trigger](/docs/automation/trigger/#numeric-state-trigger).

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `numeric_state`
| `trigger.entity_id` | Entity ID that we observe.
| `trigger.below` | The below threshold, if any.
| `trigger.above` | The above threshold, if any.
| `trigger.from_state` | The previous [state object] of the entity.
| `trigger.to_state` | The new [state object] that triggered trigger.
| `trigger.for` | Timedelta object how long state has met above/below criteria, if any.

### Sentence

These are the properties available for a [Sentence trigger](/docs/automation/trigger/#sentence-trigger).

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `conversation`
| `trigger.sentence` | Text of the sentence that was matched
| `trigger.slots`    | Object with matched slot values
| `trigger.details` | Object with matched slot details by name, such as [wildcards](/docs/automation/trigger/#sentence-wildcards). Each detail contains: <ul><li>`name` - name of the slot</li><li>`text` - matched text</li><li>`value` - output value (see [lists](https://developers.home-assistant.io/docs/voice/intent-recognition/template-sentence-syntax/#lists))</li></ul>
| `trigger.device_id` | The device ID that captured the command, if any.

### State

These are the properties available for a [State trigger](/docs/automation/trigger/#state-trigger).

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `state`
| `trigger.entity_id` | Entity ID that we observe.
| `trigger.from_state` | The previous [state object] of the entity.
| `trigger.to_state` | The new [state object] that triggered trigger.
| `trigger.for` | Timedelta object how long state has been to state, if any.

### Sun

These are the properties available for a [Sun trigger](/docs/automation/trigger/#sun-trigger).

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `sun`
| `trigger.event` | The event that just happened: `sunset` or `sunrise`.
| `trigger.offset` | Timedelta object with offset to the event, if any.

### Template

These are the properties available for a [Template trigger](/docs/automation/trigger/#template-trigger).

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `template`
| `trigger.entity_id` | Entity ID that caused change.
| `trigger.from_state` | Previous [state object] of entity that caused change.
| `trigger.to_state` | New [state object] of entity that caused template to change.
| `trigger.for` | Timedelta object how long state has been to state, if any.

### Time

These are the properties available for a [Time trigger](/docs/automation/trigger/#time-trigger).

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `time`
| `trigger.now` | DateTime object that triggered the time trigger.

### Time pattern

These are the properties available for a [time pattern trigger](/docs/automation/trigger/#time-pattern-trigger).

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `time_pattern`
| `trigger.now` | DateTime object that triggered the time_pattern trigger.

### Persistent notification

These properties are available for a [persistent notification trigger](/docs/automation/trigger/#persistent-notification-trigger).

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `persistent_notification`
| `trigger.update_type` | Type of persistent notification update `added`, `removed`, `current`, or `updated`.
| `trigger.notification` | Notification object that triggered the persistent notification trigger.
| `trigger.notification.notification_id` | The notification ID
| `trigger.notification.title` | Title of the notification
| `trigger.notification.message` | Message of the notification
| `trigger.notification.created_at` | DateTime object indicating when the notification was created.

### Webhook

These are the properties available for a [Webhook trigger](/docs/automation/trigger/#webhook-trigger).

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `webhook`
| `trigger.webhook_id` | The webhook ID that was triggered.
| `trigger.json` | The JSON data of the request (if it had a JSON content type) as a mapping.
| `trigger.data` | The form data of the request (if it had a form data content type).
| `trigger.query` | The URL query parameters of the request (if provided).

### Zone

These are the properties available for a [Zone trigger](/docs/automation/trigger/#zone-trigger).

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `zone`
| `trigger.entity_id` | Entity ID that we are observing.
| `trigger.from_state` | Previous [state object] of the entity.
| `trigger.to_state` | New [state object] of the entity.
| `trigger.zone` | State object of zone
| `trigger.event` | Event that trigger observed: `enter` or `leave`.

## Examples

{% raw %}

```yaml
# Example configuration.yaml entries
automation:
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

automation 2:
  triggers:
    - trigger: mqtt
      topic: "/notify/+"
  actions:
    - action: >
        notify.{{ trigger.topic.split('/')[-1] }}
      data:
        message: "{{ trigger.payload }}"

automation 3:
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

automation 4:
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
      value_template: "{{ trigger.event.data.tag_id == '8b6d6755-b4d5-4c23-818b-cf224d221ab7'}}"
  actions:
    # Turn off various lights
    - action: light.turn_off
      target:
        entity_id:
          - light.kitchen
          - light.bedroom
          - light.living_room
```

{% endraw %}

[state object]: /docs/configuration/state_object/
