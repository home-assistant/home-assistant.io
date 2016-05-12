---
layout: page
title: "Automation Templating"
description: "Advanced automation documentation using templating."
date: 2016-04-24 08:30 +0100
sidebar: true
comments: false
sharing: true
footer: true
---

In Home Assistant 0.19 we introduced a new powerful feature: variables in scripts and automations. This makes it possible to adjust your condition and action based on the information of the trigger.

The trigger data made is available during template rendering as the `trigger` variable.

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
      notify.{{ trigger.topic.split('/')[-1] }}
    data_template:
      message: {% raw %}{{ trigger.payload }}{% endraw %}
```

### {% linkable_title Available Trigger Data %}

The following tables show the available trigger data per platform.

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `event`.
| `trigger.event` | Event object that matched.

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `mqtt`.
| `trigger.topic` | Topic that received payload.
| `trigger.payload` | Payload.
| `trigger.qos` | QOS of payload.

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `numeric_state`
| `trigger.entity_id` | Entity ID that we observe.
| `trigger.below` | The below treshold, if any.
| `trigger.above` | The above treshold, if any.
| `trigger.from_state` | The previous state of the entity.
| `trigger.to_state` | The new state that triggered trigger.

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `state`
| `trigger.entity_id` | Entity ID that we observe.
| `trigger.from_state` | The previous state of the entity.
| `trigger.to_state` | The new state that triggered trigger.
| `trigger.for` | Timedelta object how long state has been to state, if any.

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `sun`
| `trigger.event` | The event that just happened: `sunset` or `sunrise`.
| `trigger.offset` | Timedelta object with offset to the event, if any.

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `template`
| `trigger.entity_id` | Entity ID that caused change.
| `trigger.from_state` | Previous state of entity that caused change.
| `trigger.to_state` | New state of entity that caused template to change.

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `time`
| `trigger.now` | DateTime object that triggered the time trigger.

| Template variable | Data |
| ---- | ---- |
| `trigger.platform` | Hardcoded: `zone`
| `trigger.entity_id` | Entity ID that we are observing.
| `trigger.from_state` | Previous state of the entity.
| `trigger.to_state` | New state of the entity.
| `trigger.zone` | State object of zone
| `trigger.event` | Event that trigger observed: `enter` or `leave`.
