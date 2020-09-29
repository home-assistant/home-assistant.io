---
title: "Automation Templating"
description: "Advanced automation documentation using templating."
redirect_from: /getting-started/automation-templating/
---

In Home Assistant 0.19 we introduced a new powerful feature: variables in scripts and automations. This makes it possible to adjust your condition and action based on the information of the trigger.

The trigger data made is available during [template](/docs/configuration/templating/) rendering as the `trigger` variable.

{% raw %}
```yaml
# Example configuration.yaml entries
automation:
  trigger:
    platform: state
    entity_id: device_tracker.paulus
  action:
    service: notify.notify
    data:
      message: >
        Paulus just changed from {{ trigger.from_state.state }}
        to {{ trigger.to_state.state }}

automation 2:
  trigger:
    platform: mqtt
    topic: /notify/+
  action:
    service: >
      notify.{{ trigger.topic.split('/')[-1] }}
    data:
      message: '{{ trigger.payload }}'

automation 3:
  trigger:
    # Multiple entities for which you want to perform the same action.
    - platform: state
      entity_id:
        - light.bedroom_closet
        - light.kiddos_closet
        - light.linen_closet
      to: 'on'
      # Trigger when someone leaves one of those lights on for 10 minutes.
      for: '00:10:00'
  action:
    - service: light.turn_off
      data:
        # Turn off whichever entity triggered the automation.
        entity_id: "{{ trigger.entity_id }}"
```
{% endraw %}

## Important Template Rules

There are a few very important rules to remember when writing automation templates:

1. You **must** surround single-line templates with double quotes (`"`) or single quotes (`'`).
1. It is advised that you prepare for undefined variables by using `if ... is not none` or the [`default` filter](http://jinja.pocoo.org/docs/dev/templates/#default), or both.
1. It is advised that when comparing numbers, you convert the number(s) to a [`float`](http://jinja.pocoo.org/docs/dev/templates/#float) or an [`int`](http://jinja.pocoo.org/docs/dev/templates/#int) by using the respective [filter](http://jinja.pocoo.org/docs/dev/templates/#list-of-builtin-filters).
1. While the [`float`](http://jinja.pocoo.org/docs/dev/templates/#float) and [`int`](http://jinja.pocoo.org/docs/dev/templates/#int) filters do allow a default fallback value if the conversion is unsuccessful, they do not provide the ability to catch undefined variables.

Remembering these simple rules will help save you from many headaches and endless hours of frustration when using automation templates.

## Trigger State Object

Knowing how to access the [state object](/docs/configuration/state_object/) of a trigger entity can be useful in automations. Here are a few ways to access the [`state`](#state), [`numeric_state`](#numeric_state) and [`template`](#template) triggers:

* `trigger.from_state` will return the **previous** [state object](/docs/configuration/state_object/) of the entity.
* `trigger.to_state` will return the **new** [state object](/docs/configuration/state_object/) that triggered trigger.
* `states[trigger.to_state.domain][trigger.to_state.object_id]` will return the **current** [state object](/docs/configuration/state_object/) of the entity.

<div class='note'>
  
  Be aware that if you reference a `trigger` state object in templates of automation `action`, attempting to test that automation by calling the `automation.trigger` service or by clicking EXECUTE in the More Info box for the automation will not work. This is because the trigger state object doesn't exist in those contexts. One way to test automations like these is to manually check that the templates work as expected by pasting them in Developer Tools > Template together with your trigger's definition like:

{%raw%}
```yaml
{% set trigger={'to_state':{'state': 'heat'}} %}
{% set option = trigger.to_state.state %}
{{ 'on' if option == 'heat' else 'off' }}
```
{%endraw%}
  
</div>

## Available Trigger Data

The following tables show the available trigger data per platform.

### Event

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `event`.
| `trigger.event` | Event object that matched.
| `trigger.event.data` | Optional data

### MQTT

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `mqtt`.
| `trigger.topic` | Topic that received payload.
| `trigger.payload` | Payload.
| `trigger.payload_json` | Dictonary of the JSON parsed payload.
| `trigger.qos` | QOS of payload.

### Numeric State

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `numeric_state`
| `trigger.entity_id` | Entity ID that we observe.
| `trigger.below` | The below threshold, if any.
| `trigger.above` | The above threshold, if any.
| `trigger.from_state` | The previous [state object] of the entity.
| `trigger.to_state` | The new [state object] that triggered trigger.
| `trigger.for` | Timedelta object how long state has met above/below criteria, if any.

### State

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `state`
| `trigger.entity_id` | Entity ID that we observe.
| `trigger.from_state` | The previous [state object] of the entity.
| `trigger.to_state` | The new [state object] that triggered trigger.
| `trigger.for` | Timedelta object how long state has been to state, if any.

### Sun

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `sun`
| `trigger.event` | The event that just happened: `sunset` or `sunrise`.
| `trigger.offset` | Timedelta object with offset to the event, if any.

### Template

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `template`
| `trigger.entity_id` | Entity ID that caused change.
| `trigger.from_state` | Previous [state object] of entity that caused change.
| `trigger.to_state` | New [state object] of entity that caused template to change.
| `trigger.for` | Timedelta object how long state has been to state, if any.

### Time

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `time`
| `trigger.now` | DateTime object that triggered the time trigger.

### Time Pattern

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `time_pattern`
| `trigger.now` | DateTime object that triggered the time_pattern trigger.

### Webhook

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `webhook`
| `trigger.webhook_id` | The webhook ID that was triggered.
| `trigger.json` | The JSON data of the request (if it had a JSON content type).
| `trigger.data` | The form data of the request (if it had a form data content type).

### Zone

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `zone`
| `trigger.entity_id` | Entity ID that we are observing.
| `trigger.from_state` | Previous [state object] of the entity.
| `trigger.to_state` | New [state object] of the entity.
| `trigger.zone` | State object of zone
| `trigger.event` | Event that trigger observed: `enter` or `leave`.

[state object]: /docs/configuration/state_object/
