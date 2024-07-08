---
title: "Service calls"
description: "Instructions on how to call services in Home Assistant."
---

Various integrations allow calling {% term services %} when a certain event occurs. The most common one is calling a service when an automation {% term trigger %} happens. But a service can also be called from a {% term script %}, a dashboard or via voice command devices such as Amazon Echo.

The configuration options to call a configuration are the same between all integrations and are described on this page.

Examples on this page will be given as part of an automation integration configuration but different approaches can be used for other integrations too.

{% tip %}
Use the "Services" tab under Developer Tools to discover available services.
{% endtip %}

### The basics

Call the service `homeassistant.turn_on` on the {% term entity %} `group.living_room`. This will turn all members of `group.living_room` on. You can also use `entity_id: all` and it will turn on all possible entities.

```yaml
service: homeassistant.turn_on
entity_id: group.living_room
```

### Targeting areas and devices

Instead of targeting an entity, you can also target an {% term area %} or {% term device %}. Or a combination of these.
This is done with the `target` key.

A `target` is a map that contains at least one of the following: `area_id`, `device_id`, `entity_id`.
Each of these can be a list. The values should be lower-cased.

The following example uses a single service call to turn on the lights in the
living room area, 2 additional light devices and 2 additional light entities:

```yaml
service: light.turn_on
target:
  area_id: living_room
  device_id:
    - ff22a1889a6149c5ab6327a8236ae704
    - 52c050ca1a744e238ad94d170651f96b
  entity_id:
    - light.hallway
    - light.landing
```

### Passing data to the service call

You can also specify other parameters beside the entity to target. For example, the `light.turn_on` service allows specifying the brightness.

```yaml
service: light.turn_on
entity_id: group.living_room
data:
  brightness: 120
  rgb_color: [255, 0, 0]
```

A full list of the parameters for a service can be found on the documentation page of each integration, in the same way as it's done for the `light.turn_on` [service](/integrations/light/#service-lightturn_on).

### Use templates to decide which service to call

You can use [templating] support to dynamically choose which service to call. For example, you can call a certain service based on if a light is on.

{% raw %}

```yaml
service: >
  {% if states('sensor.temperature') | float > 15 %}
    switch.turn_on
  {% else %}
    switch.turn_off
  {% endif %}
entity_id: switch.ac
```

{% endraw %}

### Using the Services Developer Tool

You can use the Services Developer Tool to test data to pass in a service call.
For example, you may test turning on or off a 'group' (See [groups](/integrations/group/) for more info)

To turn a group on or off, pass the following info:

- Domain: `homeassistant`
- Service: `turn_on`
- Service Data: `{ "entity_id": "group.kitchen" }`

### Use templates to determine the attributes

Templates can also be used for the data that you pass to the service call.

{% raw %}

```yaml
service: thermostat.set_temperature
target:
  entity_id: >
    {% if is_state('device_tracker.paulus', 'home') %}
      thermostat.upstairs
    {% else %}
      thermostat.downstairs
    {% endif %}
data:
  temperature: "{{ 22 - distance(states.device_tracker.paulus) }}"
```

{% endraw %}

You can use a template returning a native dictionary as well, which is useful if the attributes to be set depend on the situation.

{% raw %}

```yaml
service: climate.set_temperature
data: >
  {% if states('sensor.temperature_living') < 19 %}
    {"hvac_mode": "heat", "temperature": 19 }
  {% else %}
    {"hvac_mode": "auto" }
  {% endif %}
```

{% endraw %}

### Use templates to handle response data

Some services may respond with data that can be used in automation. This data is called _service response data_. Service response data
is typically used for data that is dynamic or large and which may not be suited for use in entity state.
Examples of service response data are upcoming calendar events for the next week or detailed driving directions.

Templates can also be used for handling response data. The service call can specify
a `response_variable`. This is the [variable](/docs/scripts/#variables)
that contains the response data. You can define any name for your `response_variable`. This example calls a service and stores the response in the variable called `agenda`.

{% raw %}

```yaml
service: calendar.get_events
target:
  entity_id: calendar.school
data:
  duration:
    hours: 24
response_variable: agenda
```

{% endraw %}

You may then use the response data in the variable `agenda` in another action
in the same script. The example below sends a notification using the response
data.

{% important %}
Which data fields can be used in a service call depends on the type of notification service that is used.
{% endimportant %}

{% raw %}

```yaml
service: notify.gmail_com
data:
  target: "gduser1@workspacesamples.dev"
  title: "Daily agenda for {{ now().date() }}"
  message: >-
    Your agenda for today:
    <p>
    {% for event in agenda['calendar.school'].events %}
    {{ event.start}}: {{ event.summary }}<br>
    {% endfor %}
    </p>
```

{% endraw %}

### `homeassistant` services

There are four `homeassistant` services that aren't tied to any single domain, these are:

- `homeassistant.turn_on` - Turns on an entity (that supports being turned on), for example an `automation`, `switch`, etc.
- `homeassistant.turn_off` - Turns off an entity (that supports being turned off), for example an `automation`, `switch`, etc.
- `homeassistant.toggle` - Turns off an entity that is on, or turns on an entity that is off (that supports being turned on and off)
- `homeassistant.update_entity` - Request the update of an entity, rather than waiting for the next scheduled update, for example [Google travel time] sensor, a [template sensor], or a [light]

Complete service details and examples can be found on the [Home Assistant integration][homeassistant-integration-services] page.

[templating]: /docs/configuration/templating/
[google travel time]: /integrations/google_travel_time/
[template sensor]: /integrations/template/
[light]: /integrations/light/
[homeassistant-integration-services]: /integrations/homeassistant#services
