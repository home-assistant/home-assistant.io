---
title: "Working with states"
description: "Read states, attributes, and entity information in your templates."
related:
  - docs: /docs/templating/types/
    title: Types and conversion
  - docs: /template-functions/states/
    title: "`states` function"
  - docs: /template-functions/state_attr/
    title: "`state_attr` function"
  - docs: /template-functions/is_state/
    title: "`is_state` function"
  - docs: /template-functions/has_value/
    title: "`has_value` function"
  - docs: /template-functions/#state
    title: All state functions
  - docs: /template-functions/#entity
    title: All entity functions
---

Home Assistant keeps track of everything in your home as a collection of {% term entities %}. Each entity has a **state** (its current value) and often a few **attributes** (extra details about it). When you write a template, you are almost always reading state or attributes from one or more entities.

This page explains how to get at that information inside a template.

## First, go look at your states

Before you write a single line of template, spend five minutes at {% my developer_states title="**Settings** > **Tools** > **States**" %}. This is where Home Assistant shows you every entity it knows about, its current state, and all of its attributes.

For example, you might see something like this for your outdoor thermometer:

```text
Entity:     sensor.outdoor_temperature
State:      22.5
Attributes:
  unit_of_measurement: °C
  device_class: temperature
  friendly_name: Outdoor temperature
```

This one entity has:

- An **entity ID** (`sensor.outdoor_temperature`). This is the name you use to look it up.
- A **state** (`22.5`). That is the entity's main value.
- Several **attributes** (unit of measurement, device class, friendly name). These are extra pieces of information that go along with the state.

When you write `{{ states('sensor.outdoor_temperature') }}`, Home Assistant looks up that exact entity ID and gives you back its state. It is that direct.

{% tip %}
Keep the Developer Tools > States page open in a separate browser tab while you write templates. You can search for entities, see exactly what state and attributes they have, and make sure you are spelling entity IDs correctly. It is the single most useful debugging habit you can build.
{% endtip %}

## Reading a state

The [`states`](/template-functions/states/) function gives you the current state of an entity. You pass it the entity ID as text.

{% example %}
template: |
  The kitchen light is {{ states('light.kitchen') }}.
output: "The kitchen light is on."
{% endexample %}

### Every state is text

Here is something that catches _everyone_ at least once. **Home Assistant stores every entity state as text.** Even when a sensor looks like it's giving you a number, `states()` hands it back as a piece of text. So `states('sensor.outdoor_temperature')` returns the text `'22.5'`, not the number `22.5`.

Why does that matter? Because you can't do math with text, and comparing text to a number gives surprising results. For example, `'6' < '10'` is `False` (text is sorted alphabetically, so `'6'` comes after `'1'`). If you try to do math directly, you will get an error or the wrong answer.

{% example %}
template: |
  {{ states('sensor.outdoor_temperature') | float(0) + 5 }}
output: "27.5"
{% endexample %}

The `| float(0)` part converts the text to a number. The `0` is a fallback: if the conversion fails (maybe the sensor is offline), the template uses `0` instead of crashing.

**Rule of thumb:** whenever you do math or number comparisons on a sensor state, add `| float(0)` or `| int(0)` first. It is not optional, it is how templates work.

### States have a 255 character limit

The text stored in an entity's state can be at most 255 characters long. Home Assistant enforces this limit so the state can fit in the database and dashboards. If your template sensor needs to produce something longer (say, a list of names, a formatted table, or a long paragraph), store it in an attribute instead. Attributes don't have the same limit.

### When an entity is missing or unavailable

Home Assistant has two special state values for when things go wrong:

- **`unknown`** means the entity exists but Home Assistant does not know its value right now.
- **`unavailable`** means the entity cannot be reached at all. Maybe a device is offline or an integration failed to load.

And if you ask for an entity that does not exist at all, you get the text `unknown` back as well.

Templates that depend on live values should handle these cases gracefully. Adding a number fallback (`| float(0)`) fixes most math problems. For decisions, use [`has_value`](/template-functions/has_value/) (covered below).

## Reading an attribute

Attributes carry extra details about an entity. A light has attributes for brightness and color. A weather entity has attributes for forecast data. A media player has attributes for the current track.

To read one, use [`state_attr`](/template-functions/state_attr/):

{% example %}
template: |
  The kitchen light is at {{ state_attr('light.kitchen', 'brightness') }}.
output: "The kitchen light is at 192."
{% endexample %}

Like with states, if the entity does not exist or the attribute is not set, you get nothing back (`none`). For math, add a fallback:

{% example %}
template: |
  {{ state_attr('light.kitchen', 'brightness') | int(0) }}
output: "192"
{% endexample %}

You can find an entity's attribute names by looking at Developer Tools > States.

## Checking a state

You can compare a state with `==`, but there is a dedicated function that is cleaner and handles missing entities without surprises: [`is_state`](/template-functions/is_state/).

{% example %}
template: |
  {{ is_state('light.kitchen', 'on') }}
output: "True"
{% endexample %}

This reads naturally: "is the state of `light.kitchen` equal to `on`?". The answer is `True` or `False`.

There is a matching function for attributes, [`is_state_attr`](/template-functions/is_state_attr/):

{% example %}
template: |
  {{ is_state_attr('media_player.living_room', 'source', 'Spotify') }}
output: "True"
{% endexample %}

And [`has_value`](/template-functions/has_value/) checks whether an entity has a usable state at all (not `unknown` or `unavailable`):

{% example %}
template: |
  {% if has_value('sensor.outdoor_temperature') %}
    It is {{ states('sensor.outdoor_temperature') }}°C outside.
  {% else %}
    The outdoor sensor is unavailable.
  {% endif %}
output: "It is 22.5°C outside."
{% endexample %}

Use [`has_value`](/template-functions/has_value/) whenever you want to fall back to a friendly message instead of showing "unavailable" on a dashboard or in a notification.

## Getting a list of entities

`states.domain` gives you every entity in that {% term domain %} (the first part of an entity ID, like `light.` or `sensor.`). This is how you count, filter, and iterate over groups of entities.

{% example %}
template: |
  There are {{ states.light | count }} lights in total.
output: "There are 12 lights in total."
{% endexample %}

Combine it with [`selectattr`](/template-functions/selectattr/) to filter the list down to what you care about. [`selectattr`](/template-functions/selectattr/) reads as "select entities where this attribute equals this value":

{% example %}
template: |
  Lights that are on:
  {% for light in states.light | selectattr('state', 'eq', 'on') %}
    - {{ light.name }}
  {% endfor %}
output: |
  Lights that are on:
    - Kitchen
    - Hallway
    - Desk
{% endexample %}

## Finding entities by area, device, label, or floor

Home Assistant comes with a family of functions for finding entities grouped by how you've organized them:

- [`area_entities`](/template-functions/area_entities/) returns every entity in an {% term area %}.
- [`device_entities`](/template-functions/device_entities/) returns every entity tied to a {% term device %}.
- [`label_entities`](/template-functions/label_entities/) returns every entity carrying a given {% term label %}.
- [`floor_entities`](/template-functions/floor_entities/) returns every entity on a {% term floor %}.
- [`integration_entities`](/template-functions/integration_entities/) returns every entity created by a given {% term integration %}.

Each has matching functions for going the other way (for example, [`area_devices`](/template-functions/area_devices/) lists the devices in an area). Browse the [Areas](/template-functions/areas/), [Devices](/template-functions/devices/), [Floors](/template-functions/floors/), and [Labels](/template-functions/labels/) categories in the reference for the full set.

Here is how you'd list the bedroom lights that are on:

{% example %}
template: |
  Bedroom lights on:
  {% for entity in area_entities('bedroom') %}
    {% if entity.startswith('light.') and is_state(entity, 'on') %}
      - {{ state_attr(entity, 'friendly_name') }}
    {% endif %}
  {% endfor %}
output: |
  Bedroom lights on:
    - Bedroom ceiling
    - Bedside lamp
{% endexample %}

## The `this` variable (in template entities)

When you write a template that defines a [template entity](/integrations/template/), `this` refers to the entity itself. That is useful when the entity needs to read its own state or attributes without hardcoding its entity ID.

{% example %}
automation: |
  template:
    - sensor:
        - name: "Kitchen helper"
          state: "{{ this.attributes.get('counter', 0) + 1 }}"
          attributes:
            counter: "{{ this.state | int(0) + 1 }}"
output: "1 (the sensor increments its own value each time it updates)"
{% endexample %}

`this` only exists where Home Assistant knows which entity the template belongs to. That means template entities and some automation contexts, but not the Developer Tools template editor.

## The `trigger` variable (in automations)

When an automation runs, it receives a `trigger` variable with details about what caused it. The fields depend on the {% term trigger %} type; the [Automation trigger variables](/docs/automation/templating/) page lists them all.

{% example %}
automation: |
  - trigger: state
    entity_id: binary_sensor.front_door
    to: "on"
  action:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          {{ trigger.to_state.name }} was opened at
          {{ trigger.to_state.last_changed.strftime('%H:%M') }}.
output: "Front door was opened at 14:32."
{% endexample %}

## Next steps

- Ready-made examples that combine these tools live on the [Common template patterns](/docs/templating/patterns/) page.
- The full list of state and entity functions is in the [template functions reference](/template-functions/).
- When a template does not give you what you expected, see [Debugging templates](/docs/templating/debugging/).
