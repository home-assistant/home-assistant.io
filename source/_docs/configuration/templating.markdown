---
layout: page
title: "Templating"
description: "Instructions how to use the templating feature of Home Assistant."
date: 2015-12-12 12:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /topics/templating/
---

This is an advanced feature of Home Assistant. You'll need a basic understanding of the following things:

- [Home Assistant architecture](/developers/architecture/), especially states.
- [State object](/topics/state_object/)

Templating is a powerful feature in Home Assistant that allows the user control over information that is going into and out of the system. It is used for:

- Formatting outgoing messages in, for example, the [notify] and [alexa] components.
- Process incoming data from sources that provide raw data, like [MQTT], [REST sensor], or the [command line sensor].
- [Automation Templating].

[notify]: /components/notify/
[alexa]: /components/alexa/
[MQTT]: /components/mqtt/
[REST sensor]: /components/sensor.rest/
[command line sensor]: /components/sensor.command_line/
[Automation Templating]: /docs/automation/templating/

## {% linkable_title Building templates %}

Templating in Home Assistant is powered by the [Jinja2](http://jinja.pocoo.org/) templating engine. This means that we are using their syntax and make some custom Home Assistant variables available to templates during rendering. We will not go over the basics of the syntax, as Jinja2 does a lot better job at this in their [Jinja2 documentation](http://jinja.pocoo.org/docs/dev/templates/).

<p class='note'>
The frontend has a template editor developer tool to help develop and debug templates.
</p>

Templates can get big pretty fast. To keep a clear overview, consider using YAML multiline strings to define your templates:

```yaml
script:
  msg_who_is_home:
    sequence:
      - service: notify.notify
        data_template:
          message: >
            {% raw %}{% if is_state('device_tracker.paulus', 'home') %}
              Ha, Paulus is home!
            {% else %}
              Paulus is at {{ states('device_tracker.paulus') }}.
            {% endif %}{% endraw %}
```

[Jinja2](http://jinja.pocoo.org/) supports a wide variety of operations:

- [Mathematical operation](http://jinja.pocoo.org/docs/dev/templates/#math)
- [Comparisons](http://jinja.pocoo.org/docs/dev/templates/#comparisons)
- [Logic](http://jinja.pocoo.org/docs/dev/templates/#logic)


## {% linkable_title Home Assistant template extensions %}

Home Assistant adds extensions to allow templates to access all of the current states:

- Iterating `states` will yield each state sorted alphabetically by entity ID.
- Iterating `states.domain` will yield each state of that domain sorted alphabetically by entity ID.
- `states.sensor.temperature` returns the state object for `sensor.temperature`.
- `states('device_tracker.paulus')` will return the state string (not the object) of the given entity or `unknown` if it doesn't exist.
- `is_state('device_tracker.paulus', 'home')` will test if the given entity is specified state.
- `is_state_attr('device_tracker.paulus', 'battery', 40)` will test if the given entity is specified state.
- `now()` will be rendered as current time in your time zone.
  - For specific values: `now().second`, `now().minute`, `now().hour`, `now().day`, `now().month`, `now().year`, `now().weekday()` and `now().isoweekday()`
- `utcnow()` will be rendered as UTC time.
  - For specific values: `utcnow().second`, `utcnow().minute`, `utcnow().hour`, `utcnow().day`, `utcnow().month`, `utcnow().year`, `utcnow().weekday()` and `utcnow().isoweekday()`.
- `as_timestamp()` will convert datetime object or string to UNIX timestamp
- `distance()` will measure the distance in meters between home, entity, coordinates.
- `closest()` will find the closest entity.
- `float` will format the output as float.
- `strptime(string, format)` will parse a string to a datetime based on a [format][strp-format].
- `log(value, base)` will take the logarithm of the input. When the base is omitted, it defaults to `e` - the natural logarithm. Can also be used as a filter.
- Filter `round(x)` will convert the input to a number and round it to `x` decimals.
- Filter `timestamp_local`  will convert an UNIX timestamp to local time/data.
- Filter `timestamp_utc` will convert an UNIX timestamp to UTC time/data.
- Filter `timestamp_custom(format_string, local_boolean)` will convert an UNIX timestamp to a custom format, the use of a local timestamp is default, supporting [Python format options](https://docs.python.org/3/library/time.html#time.strftime).
- Filter `max` will obtain the larget item in a sequence.
- Filter `min` will obtain the smallest item in a sequence.

[strp-format]: https://docs.python.org/3.4/library/datetime.html#strftime-and-strptime-behavior

<p class='note'>
If your template uses an `entity_id` that begins with a number (example: `states.device_tracker.2008_gmc`) you must use a bracket syntax to avoid errors caused by rendering the `entity_id` improperly. In the example given, the correct syntax for the device tracker would be: `states.device_tracker['2008_gmc']`
</p>

<p class='note warning'>
Rendering templates with time is dangerous as updates only trigger templates in sensors based on entity state changes.
</p>

## {% linkable_title Home Assistant template extensions %}

In templates, besides the normal [state object methods and properties](/topics/state_object/), there are also some extra things available:

- `states.sensor.temperature.state_with_unit` will print the state of the entity and, if available, the unit.

## {% linkable_title Examples %}

### {% linkable_title States %}
The next two statements result in same value if state exists. The second one will result in an error if state does not exist.

```text
{% raw %}{{ states('device_tracker.paulus') }}
{{ states.device_tracker.paulus.state }}{% endraw %}
```

### {% linkable_title Attributes %}

Print an attribute if state is defined

```text
{% raw %}{% if states.device_tracker.paulus %}
  {{ states.device_tracker.paulus.attributes.battery }}
{% else %}
  ??
{% endif %}{% endraw %}
```

### {% linkable_title Sensor states %}

Print out a list of all the sensor states.

```text
{% raw %}{% for state in states.sensor %}
  {{ state.entity_id }}={{ state.state }},
{% endfor %}

{% if is_state('device_tracker.paulus', 'home') %}
  Ha, Paulus is home!
{% else %}
  Paulus is at {{ states('device_tracker.paulus') }}.
{% endif %}

{{ states.sensor.temperature | float + 1 }}

{{ (states.sensor.temperature | float * 10) | round(2) }}

{% if states('sensor.temperature') | float > 20 %}
  It is warm!
{%endif %}

{{ as_timestamp(states.binary_sensor.garage_door.last_changed) }}

{{ as_timestamp(now()) - as_timestamp(states.binary_sensor.garage_door.last_changed) }}{% endraw %}
```

### {% linkable_title Distance examples %}

If only 1 location is passed in, Home Assistant will measure the distance from home.

```text
{% raw %}Using Lat Lng coordinates: {{ distance(123.45, 123.45) }}

Using State: {{ distance(states.device_tracker.paulus) }}

These can also be combined in any combination:
{{ distance(123.45, 123.45, 'device_tracker.paulus') }}
{{ distance('device_tracker.anne_therese', 'device_tracker.paulus') }}{% endraw %}
```

### {% linkable_title Closest examples %}

Find entities closest to the Home Assistant location:

```text
{% raw %}Query all entities: {{ closest(states) }}
Query all entities of a specific domain: {{ closest('states.device_tracker') }}
Query all entities in group.children: {{ closest('group.children') }}
Query all entities in group.children: {{ closest(states.group.children) }}{% endraw %}
```

Find entities closest to a coordinate or another entity. All previous arguments still apply for 2nd argument.

```text
{% raw %}Closest to a coordinate: {{ closest(23.456, 23.456, 'group.children') }}
Closest to an entity: {{ closest('zone.school', 'group.children') }}
Closest to an entity: {{ closest(states.zone.school, 'group.children') }}{% endraw %}
```

### {% linkable_title Combined %}
Since closest returns a state, we can combine it with distance too.

```text
{% raw %}{{ closest(states).name }} is {{ distance(closest(states)) }} meters away.{% endraw %}
```

## {% linkable_title Processing incoming data %}

The other part of templating is processing incoming data. It will allow you to modify incoming data and extract only the data you care about. This will work only for platforms and components that mentioned support for this in their documentation.

It depends per component or platform, but it is common to be able to define a template using the `value_template` configuration key. When a new value arrives, your template will be rendered while having access to the following values on top of the usual Home Assistant extensions:

| Variable     | Description                            |
| ------------ | -------------------------------------- |
| `value`      | The incoming value.                    |
| `value_json` | The incoming value parsed as JSON.     |

This means that if the incoming values looks like the sample below:

```json
{
  "on": "true",
  "temp": 21
}
```

The template for `on` would be:

```yaml
'{% raw %}{{value_json.on}}{% endraw %}'
```

Nested JSON in a response is supported as well

```json
{
  "sensor": {
    "type": "air",
    "id": "12345"
  },
  "values": {
    "temp": 26.09,
    "hum": 56.73,
  }
}
```

Just use the "Square bracket notation" to get the value.

```yaml
'{% raw %}{{ value_json["values"]["temp"] }}{% endraw %}'
```


The following overview contains a couple of options to get the needed values:

```text
# Incoming value:
{"primes": [2, 3, 5, 7, 11, 13]}

# Extract third prime number
{% raw %}{{ value_json.primes[2] }}{% endraw %}

# Format output
{% raw %}{{ "%+.1f" | value_json }}{% endraw %}

# Math
{% raw %}{{ value_json | float * 1024 }}{% endraw %}
{% raw %}{{ float(value_json) * (2**10) }}{% endraw %}
{% raw %}{{ value_json | log }}{% endraw %}
{% raw %}{{ log(1000, 10) }}{% endraw %}

# Timestamps
{% raw %}{{ value_json.tst | timestamp_local }}{% endraw %}
{% raw %}{{ value_json.tst | timestamp_utc }}{% endraw %}
{% raw %}{{ value_json.tst | timestamp_custom('%Y' True) }}{% endraw %}
```

To evaluate a response, go to the <img src='/images/screenshots/developer-tool-templates-icon.png' alt='template developer tool icon' class="no-shadow" height="38" /> template developer tools, create your output into "Template", and check the result.

```yaml
{% raw %}
{% set value_json=
    {"name":"Outside",
	 "device":"weather-ha",
     "data":
	    {"temp":"24C",
		 "hum":"35%"
		 }	}%}

{{value_json.data.hum[:-1]}}{% endraw %}
```
