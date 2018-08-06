---
layout: page
title: "Automation Templating"
description: "Advanced automation documentation using templating."
date: 2016-04-24 08:30 +0100
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/automation-templating/
---

In Home Assistant 0.19 we introduced a new powerful feature: variables in scripts and automations. This makes it possible to adjust your condition and action based on the information of the trigger.

The trigger data made is available during [template](/docs/configuration/templating/) rendering as the `trigger` variable.

```yaml
# Example configuration.yaml entries
automation:
  trigger:
    platform: state
    entity_id: device_tracker.paulus
  action:
    service: notify.notify
    data_template:
      message: >{% raw %}
        Paulus just changed from {{ trigger.from_state.state }}
        to {{ trigger.to_state.state }}{% endraw %}

automation 2:
  trigger:
    platform: mqtt
    topic: /notify/+
  action:
    service_template: >{% raw %}
      notify.{{ trigger.topic.split('/')[-1] }}{% endraw %}
    data_template:
      message: {% raw %}'{{ trigger.payload }}'{% endraw %}
```

## {% linkable_title Important Template Rules %}

There are a few very important rules to remember when writing automation templates:

1. You ***must*** use `data_template` in place of `data` when using templates in the `data` section of a service call.
1. You ***must*** use `service_template` in place of `service` when using templates in the `service` section of a service call.
1. You ***must*** surround single-line templates with double quotes (`"`) or single quotes (`'`).
1. It is advised that you prepare for undefined variables by using `if ... is not none` or the [`default` filter](http://jinja.pocoo.org/docs/dev/templates/#default), or both.
1. It is advised that when comparing numbers, you convert the number(s) to a [`float`](http://jinja.pocoo.org/docs/dev/templates/#float) or an [`int`](http://jinja.pocoo.org/docs/dev/templates/#int) by using the respective [filter](http://jinja.pocoo.org/docs/dev/templates/#list-of-builtin-filters).
1. While the [`float`](http://jinja.pocoo.org/docs/dev/templates/#float) and [`int`](http://jinja.pocoo.org/docs/dev/templates/#int) filters do allow a default fallback value if the conversion is unsuccessful, they do not provide the ability to catch undefined variables.

Remembering these simple rules will help save you from many headaches and endless hours of frustration when using automation templates.

## {% linkable_title Trigger State Object %}

Knowing how to access the [state object](/docs/configuration/state_object/) of a trigger entity could be one of the more common questions. Here are a few ways for the [`state`](#state), [`numeric_state`](#numeric_state) and [`template`](#template) triggers:

* `trigger.from_state` will return the **previous** [state object](/docs/configuration/state_object/) of the entity.
* `trigger.to_state` will return the **new** [state object](/docs/configuration/state_object/) that triggered trigger.
* `states[trigger.to_state.domain][trigger.to_state.object_id]` will return the **current** [state object](/docs/configuration/state_object/) of the entity.

## {% linkable_title Available Trigger Data %}

The following tables show the available trigger data per platform.

### {% linkable_title event %}

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `event`.
| `trigger.event` | Event object that matched.
| `trigger.event.data` | Optional data

### {% linkable_title mqtt %}

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `mqtt`.
| `trigger.topic` | Topic that received payload.
| `trigger.payload` | Payload.
| `trigger.payload_json` | Dictonary of the JSON parsed payload.
| `trigger.qos` | QOS of payload.

### {% linkable_title numeric_state %}

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `numeric_state`
| `trigger.entity_id` | Entity ID that we observe.
| `trigger.below` | The below threshold, if any.
| `trigger.above` | The above threshold, if any.
| `trigger.from_state` | The previous [state object] of the entity.
| `trigger.to_state` | The new [state object] that triggered trigger.

### {% linkable_title state %}

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `state`
| `trigger.entity_id` | Entity ID that we observe.
| `trigger.from_state` | The previous [state object] of the entity.
| `trigger.to_state` | The new [state object] that triggered trigger.
| `trigger.for` | Timedelta object how long state has been to state, if any.

### {% linkable_title sun %}

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `sun`
| `trigger.event` | The event that just happened: `sunset` or `sunrise`.
| `trigger.offset` | Timedelta object with offset to the event, if any.

### {% linkable_title template %}

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `template`
| `trigger.entity_id` | Entity ID that caused change.
| `trigger.from_state` | Previous [state object] of entity that caused change.
| `trigger.to_state` | New [state object] of entity that caused template to change.

### {% linkable_title time %}

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `time`
| `trigger.now` | DateTime object that triggered the time trigger.

### {% linkable_title zone %}

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `zone`
| `trigger.entity_id` | Entity ID that we are observing.
| `trigger.from_state` | Previous [state object] of the entity.
| `trigger.to_state` | New [state object] of the entity.
| `trigger.zone` | State object of zone
| `trigger.event` | Event that trigger observed: `enter` or `leave`.

[state object]: /docs/configuration/state_object/
