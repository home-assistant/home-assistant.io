---
layout: page
title: "Service Calls"
description: "Instructions on how to call services in Home Assistant."
date: 2016-03-12 12:00 -0800
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/scripts-service-calls/
---

Various components allow calling services when a certain event occurs. The most common one is calling a service when an automation trigger happens. But a service can also be called from a script or via the Amazon Echo.

The configuration options to call a config are the same between all components and are described on this page.

Examples on this page will be given as part of an automation component configuration but different approaches can be used for other components too.

<p class='note'>
Use the <img src='/images/screenshots/developer-tool-services-icon.png' class='no-shadow' height='38' /> service developer tool in the frontend to discover available services.
</p>

### {% linkable_title The basics %}

Call the service `homeassistant.turn_on` on the entity `group.living_room`. This will turn all members of `group.living_room` on. You can also omit `entity_id` and it will turn on all possible entities.

```yaml
service: homeassistant.turn_on
entity_id: group.living_room
```

### {% linkable_title Passing data to the service call %}

You can also specify other parameters beside the entity to target. For example, the light turn on service allows specifying the brightness.

```yaml
service: light.turn_on
entity_id: group.living_room
data:
  brightness: 120
  rgb_color: [255, 0, 0]
```

### {% linkable_title Use templates to decide which service to call %}

You can use [templating] support to dynamically choose which service to call. For example, you can call a certain service based on if a light is on.

```yaml
service_template: >
  {% raw %}{% if states.sensor.temperature.state | float > 15 %}
    switch.turn_on
  {% else %}
    switch.turn_off
  {% endif %}{% endraw %}
entity_id: switch.ac
```

### {% linkable_title Using the Services Developer Tool %}

You can use the Services Developer Tool to test data to pass in a service call.
For example, you may test turning on or off a 'group' (See [groups] for more info)

To turn a group on or off, pass the following info:
Domain: `homeassistant`
Service: `turn_on`
Service Data: `{ "entity_id": "group.kitchen" }`


### {% linkable_title Use templates to determine the attributes %}

Templates can also be used for the data that you pass to the service call.

```yaml
service: thermostat.set_temperature
data_template:
  entity_id: >
    {% raw %}{% if is_state('device_tracker.paulus', 'home') %}
      thermostat.upstairs
    {% else %}
      thermostat.downstairs
    {% endif %}{% endraw %}
  temperature: {% raw %}{{ 22 - distance(states.device_tracker.paulus) }}{% endraw %}
```

[templating]: /topics/templating/
