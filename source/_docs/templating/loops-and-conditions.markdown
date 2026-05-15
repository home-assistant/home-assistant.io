---
title: "Loops and conditions"
description: "Make decisions and repeat work in your templates with if, for, and set."
related:
  - docs: /template-functions/namespace/
    title: "`namespace` function"
  - docs: /template-functions/range/
    title: "`range` function"
  - docs: /template-functions/iif/
    title: "`iif` function"
  - docs: /docs/templating/patterns/
    title: Common template patterns
  - docs: /docs/templating/syntax/
    title: Template syntax
---

So far, the templates we've looked at have been straightforward: read a value, show it, maybe do a small calculation. But the moment your template needs to decide something ("is it cold outside?") or go through a list of things ("show me every light that is on"), you need a couple more tools.

That is what this page is about. We will cover two ideas that work together to make templates much more useful:

- A **condition** is a question with a yes-or-no answer that decides what happens next. "Is the front door open?" "Is the temperature below zero?"
- A **loop** is a way to do the same thing once for each item in a list. "For every light in the house, show its name and state."

Both live inside `{% ... %}` markers, because they run logic without adding anything to the output by themselves. And both will feel familiar if you've ever written a shopping list ("if I'm out of milk, add it to the list") or followed a recipe ("for each onion, chop it finely").

## Conditions with if

The `if` statement runs the text inside it only when its condition is true. When the condition is false, that text is skipped.

{% example %}
template: |
  {% if is_state('sun.sun', 'above_horizon') %}
    The sun is up.
  {% else %}
    The sun is down.
  {% endif %}
output: "The sun is up."
{% endexample %}

Read that out loud: "If the sun is above the horizon, show 'The sun is up'. Otherwise, show 'The sun is down'." That is exactly what the template does.

Every `if` must be closed with `{% endif %}`. The `{% else %}` part is optional but often useful.

### Multiple paths with elif

When you have more than two outcomes, use `{% elif %}` ("else if") to chain conditions together. Home Assistant checks them in order and runs the first one that is true.

{% example %}
template: |
  {% set temp = states('sensor.outdoor_temperature') | float(0) %}
  {% if temp < 0 %}
    Freezing.
  {% elif temp < 15 %}
    Cold.
  {% elif temp < 25 %}
    Comfortable.
  {% else %}
    Warm.
  {% endif %}
output: "Comfortable."
{% endexample %}

You can add as many `elif` branches as you need.

### Inline if for one-liners

If you only need to pick between two values, you can write the `if` on one line. This is often handier inside `{{ ... }}` than writing a whole `if/else` block.

{% example %}
template: |
  {% set temp = 22 %}
  It is {{ 'warm' if temp > 20 else 'cool' }}.
output: "It is warm."
{% endexample %}

Read it left to right: "warm, if the temperature is over 20, otherwise cool". Natural English.

## Loops with for

A `for` loop repeats whatever is inside it once for each item in a list. The word right after `for` is a name you pick; each time the loop runs, it holds the current item.

{% example %}
template: |
  {% for light in states.light %}
    {{ light.name }}: {{ light.state }}
  {% endfor %}
output: |
  Kitchen: on
  Living Room: off
  Bedroom: off
{% endexample %}

In plain English: "for each light in the list of lights, show its name and state". The name `light` is only a label; you could call it `x` or `item` or `thingy` and it would still work.

Every `for` must be closed with `{% endfor %}`.

### Filtering with if inside a for

You can tell a `for` loop to skip items that don't match a condition by adding `if` at the end:

{% example %}
template: |
  Lights that are on:
  {% for light in states.light if light.state == 'on' %}
    - {{ light.name }}
  {% endfor %}
output: |
  Lights that are on:
    - Kitchen
    - Hallway
{% endexample %}

That reads as: "for each light in the list of lights, where its state is 'on', show a bullet with the name". Items that don't match are skipped.

### Knowing where you are: the loop variable

Inside a loop, templates give you a special variable called `loop` that tells you where you are. These are the fields you'll use most:

- `loop.first`: `True` on the first time through, `False` otherwise.
- `loop.last`: `True` on the last time through.
- `loop.index`: the current position, starting at 1.
- `loop.index0`: the current position, starting at 0 (handy if you're used to programming).
- `loop.length`: the total number of items.

That last-item check is useful when you want to format a list neatly:

{% example %}
template: |
  {% for person in states.person %}
    {{ loop.index }}. {{ person.name }}{% if not loop.last %},{% endif %}
  {% endfor %}
output: |
  1. Frenck,
  2. Paulus,
  3. Zack
{% endexample %}

The comma is added for every item except the last one.

## Variables with set

Templates can get long, and typing the same thing twice makes them harder to read. `set` lets you give a value a name so you can reuse it.

{% example %}
template: |
  {% set temp = states('sensor.outdoor_temperature') | float(0) %}
  {% set unit = state_attr('sensor.outdoor_temperature',
                            'unit_of_measurement') %}
  It is {{ temp | round(1) }} {{ unit }} outside.
output: "It is 22.5 °C outside."
{% endexample %}

Now `temp` and `unit` can be used anywhere in the template. If the name of the sensor changes, you only need to update it once.

### A common gotcha: variables and loops

Here is something that catches everyone at least once. A variable changed inside a loop does not stick around after the loop ends.

{% example %}
template: |
  {% set count = 0 %}
  {% for light in states.light if light.state == 'on' %}
    {% set count = count + 1 %}
  {% endfor %}
  {{ count }}
output: "0"
{% endexample %}

You'd think `count` would end up at 3 (or however many lights are on), but it doesn't. The `set count = count + 1` inside the loop creates a brand new `count` each time, one that only exists inside that loop iteration. The outer `count` never changes.

The fix is to use a [`namespace`](/template-functions/namespace/). Think of a namespace as a small box that holds values. Changes to what's inside the box persist, because you're updating the box, not replacing it.

{% example %}
template: |
  {% set ns = namespace(count=0) %}
  {% for light in states.light if light.state == 'on' %}
    {% set ns.count = ns.count + 1 %}
  {% endfor %}
  {{ ns.count }}
output: "3"
{% endexample %}

This looks weird the first time, but it becomes natural quickly. Whenever you need to count something or build up a result inside a loop, reach for [`namespace`](/template-functions/namespace/).

## Breaking out of loops early

Sometimes you want a loop to stop before reaching the end of the list. Home Assistant has two extra statements for that:

- `{% break %}` stops the loop right away.
- `{% continue %}` skips to the next item without finishing the current one.

{% example %}
template: |
  {# Show the first three lights that are on #}
  {% set ns = namespace(shown=0) %}
  {% for light in states.light %}
    {% if light.state != 'on' %}
      {% continue %}
    {% endif %}
    {% if ns.shown >= 3 %}
      {% break %}
    {% endif %}
    {{ light.name }}
    {% set ns.shown = ns.shown + 1 %}
  {% endfor %}
output: |
  Kitchen
  Hallway
  Desk
{% endexample %}

This one skips lights that are off (with `continue`), and stops entirely once three have been shown (with `break`).

## The do statement

You may see `{% do %}` mentioned in Jinja documentation elsewhere. It runs an expression without printing anything, which in plain Jinja is useful for things like `{% do items.append(value) %}` to mutate a list.

Home Assistant's template environment is sandboxed. Mutation methods like `.append()`, `.pop()`, and `.update()` are blocked for safety, so `{% do %}` is rarely needed in Home Assistant templates. To build up a list or counter across loop iterations, use a [`namespace`](/template-functions/namespace/) with `{% set %}` instead.

## Next steps

- For the full list of filters and tests you can use inside `if` conditions, see the [template functions reference](/template-functions/).
- Common counting and aggregation patterns live on the [Common template patterns](/docs/templating/patterns/) page.
- When using these statements inside YAML, keep the [Templates in YAML](/docs/templating/yaml/) page handy for quoting rules.
