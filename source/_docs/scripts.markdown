---
layout: page
title: "Script Syntax"
description: "Documention for the Home Assistant Script Syntax."
date: 2016-04-24 08:30 +0100
sidebar: true
comments: false
sharing: true
footer: true
---

Scripts are a sequence of actions that Home Assistant will execute. Scripts are available as an entity through the standalone [Script component] but can also be embedded in [automations] and [Alexa/Amazon Echo] configurations.

The script syntax basic structure is a list of key/value maps that contain actions. If a script contains only 1 action, the wrapping list can be omitted.

```yaml
# Example script component containing script syntax
script:
  example_script:
    sequence:
      # This is written using the Script Syntax
      - service: light.turn_on
        entity_id: light.ceiling
      - service: notify.notify
        data:
          message: 'Turned on the ceiling light!'
```

### {% linkable_title Call a Service %}

The most important one is the action to call a service. This can be done in various ways. For all the different possibilities, have a look at the [service calls page].

```yaml
alias: Bedroom lights on
service: light.turn_on
data:
  entity_id: group.bedroom
  brightness: 100
```

### {% linkable_title Test a Condition %}

While executing a script you can add a condition to stop further execution. When a condition does not return `true`, the script will finish. There are many different conditions which are documented at the [conditions page].

```yaml
condition: state
entity_id: device_tracker.paulus
state: 'home'
```

### {% linkable_title Delay %}

Delays are useful for temporarily suspending your script and start it at a later moment. We support different syntaxes for a delay as shown below.

```yaml
# Waits 1 hour
delay: 01:00
```

```yaml
# Waits 1 minute, 30 seconds
delay: 00:01:30
```

```yaml
# Waits 1 minute
delay:
  # supports seconds, minutes, hours, days
  minutes: 1
```

```yaml
# Waits however many minutes input_slider.minute_delay is set to
# Valid formats include HH:MM and HH:MM:SS
delay: {% raw %}'00:{{ states.input_slider.minute_delay.state | int }}:00'{% endraw %}
```

### {% linkable_title Fire an Event %}

This action allows you to fire an event. Events can be used for many things. It could trigger an automation or indicate to another component that something is happening. For instance, in the below example it is used to create an entry in the logbook.

```yaml
event: LOGBOOK_ENTRY
event_data:
  name: Paulus
  message: is waking up
  entity_id: device_tracker.paulus
  domain: light
```

[Script component]: /components/script/
[automations]: /getting-started/automation-action/
[Alexa/Amazon Echo]: /components/alexa/
[service calls page]: /getting-started/scripts-service-calls/
[conditions page]: /getting-started/scripts-conditions/
