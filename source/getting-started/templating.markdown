---
layout: page
title: "Templating"
description: "Instructions how to use the templating feature of Home Assistant."
date: 2015-12-12 12:00
sidebar: false
comments: false
sharing: true
footer: true
---

<p class='note'>
This is an advanced feature of Home Assistant. You'll need a basic understanding of the [Home Assistant architecture], especially states.
</p>

[Home Assistant architecture]: /developers/architecture/

Templating is a powerful feature in Home Assistant that allows the user control over information that is going into and out of the system. It is used for:

 - Formatting outgoing messages in, for example, the [notify] and [alexa] components.
 - Process incoming data from sources that provide raw data, like [MQTT], [Rest sensor] or the [command line sensor].

[notify]: /components/notify/
[alexa]: /components/alexa/
[MQTT]: /components/mqtt/
[Rest sensor]: /components/sensor.rest/
[command line sensor]: /components/sensor.command_line/

## {% linkable_title Building templates %}

Templating in Home Assistant is powered by the Jinja2 templating engine. This means that we are using their syntax and make some custom Home Assistant variables available to templates during rendering. We will not go over the basics of the syntax, as Jinja2 does a lot better job at this in their [Jinja2 documentation].

[Jinja2 documentation]: http://jinja.pocoo.org/docs/dev/templates/

<p class='note'>
The frontend has a template editor developer tool to help develop and debug templates.
</p>

Templates can get big pretty fast. To keep a clear overview, consider using YAML multiline strings to define your templates:

```yaml
script:
  msg_who_is_home:
    sequence:
      - service: notify.notify
        data:
          message: >
            {% raw %}{% if is_state('device_tracker.paulus', 'home') %}
              Ha, Paulus is home!
            {% else %}
              Paulus is at {{ states('device_tracker.paulus')) }}.
            {% endif %}{% endraw %}
```

### {% linkable_title Home Assistant template extensions %}

Home Assistant adds extensions to allow templates to access all of the current states:

 - Iterating `states` will yield each state sorted alphabetically by entity ID
 - Iterating `states.domain` will yield each state of that domain sorted alphabetically by entity ID
 - `states.sensor.temperature` returns the state object for `sensor.temperature`
 - `states('device_tracker.paulus')` will return the state string (not the object) of the given entity or `unknown` if it doesn't exist.
 - `is_state('device_tracker.paulus', 'home')` will test if the given entity is specified state.
 - `is_state_attr('device_tracker.paulus', 'battery', 40)` will test if the given entity is specified state.
 - Filter `multiply(x)` will convert the input to a number and multiply it with `x`
 - Filter `round(x)` will convert the input to a number and round it to `x` decimals.
 - `now` will be rendered as current time in your time zone.
 - `utcnow` will be rendered as UTC time.

#### {% linkable_title Examples %}

```jinja2
{% raw %}
# Next two statements result in same value if state exists
# Second one will result in an error if state does not exist
{{ states('device_tracker.paulus') }}
{{ states.device_tracker.paulus.state }}

# Print an attribute if state is defined
{% if states.device_tracker.paulus %}
{{ states.device_tracker.paulus.attributes.battery }}
{% else %}
??
{% endif %}

# Print out a list of all the sensor states
{% for state in states.sensor %}
  {{ state.entity_id }}={{ state.state }},
{% endfor %}

{% if is_state('device_tracker.paulus', 'home') %}
  Ha, Paulus is home!
{% else %}
  Paulus is at {{ states('device_tracker.paulus')) }}.
{% endif %}

{{ states.sensor.temperature | multiply(10) | round(2) }}

{% if states('sensor.temperature') | float > 20 %}
  It is warm!
{%endif %}{% endraw %}
```

## {% linkable_title Processing incoming data %}

The other part of templating is processing incoming data. It will allow you to modify incoming data and extract only the data you care about. This will work only for platforms and components that mentioned support for this in their documentation.

It depends per component or platform but it is common to be able to define a template using the `value_template` configuration key. When a new value arrives, your template will be rendered while having access to the following values on top of the usual Home Assistant extensions:

| Variable     | Description |
| ------------ | ----------- |
| `value`      | The incoming value.
| `value_json` | The incoming value parsed as JSON.

```jinja2
# Incoming value:
{"primes": [2, 3, 5, 7, 11, 13]}

# Extract third prime number
{% raw %}{{ value_json.primes[2] }}{% endraw %}
```
