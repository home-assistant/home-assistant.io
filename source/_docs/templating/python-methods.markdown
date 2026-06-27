---
title: "Python methods you can use in templates"
description: "A reference of common Python string, list, and dictionary methods available in templates."
related:
  - docs: /template-functions/
    title: Template functions reference
  - docs: /template-functions/upper/
    title: "`upper` filter"
  - docs: /template-functions/replace/
    title: "`replace` filter"
  - docs: /template-functions/join/
    title: "`join` filter"
  - docs: /docs/templating/dates-and-times/
    title: Working with dates and times
---

Templates are built on top of Python, and many standard Python methods are available to you. You call them the same way you would in Python: put a dot after the value, then the method name and parentheses. These methods are not listed in the [template functions reference](/template-functions/) because they come from Python itself, but they solve a lot of common tasks.

This page is a cheat sheet of the ones that come up most often in Home Assistant templates. When in doubt, open the {% my developer_template title="template editor" %} and try it.

## String methods

Everything Home Assistant stores as text supports these. Since entity states are always text (until you convert them), these work directly on `states()` results.

### split

Splits a piece of text into a list at each occurrence of a separator.

{% example %}
template: |
  {{ "light.living_room".split(".") }}
output: "['light', 'living_room']"
{% endexample %}

Useful for breaking entity IDs into their domain and name, splitting comma-separated strings, or pulling words out of a sentence.

### replace

Replaces one piece of text with another.

{% example %}
template: '{{ "light.living_room".replace("_", " ") }}'
output: "light.living room"
{% endexample %}

### lower, upper, title, capitalize

Change the case of a piece of text.

{% example %}
template: |
  Lower:      {{ "Living Room".lower() }}
  Upper:      {{ "Living Room".upper() }}
  Title:      {{ "living room".title() }}
  Capitalize: {{ "living room".capitalize() }}
output: |
  Lower:      living room
  Upper:      LIVING ROOM
  Title:      Living Room
  Capitalize: Living room
{% endexample %}

### strip

Removes whitespace from the start and end of a piece of text.

{% example %}
template: "'{{ '  hello world  '.strip() }}'"
output: "'hello world'"
{% endexample %}

### startswith, endswith

Check whether a piece of text begins or ends with another piece of text.

{% example %}
template: |
  {{ "sensor.outdoor_temperature".startswith("sensor.") }}
  {{ "image.jpg".endswith(".jpg") }}
output: |
  True
  True
{% endexample %}

These are very handy for filtering entity IDs by domain.

### find, index, count

`find` returns the position of a piece of text, or `-1` if not found. `index` does the same but raises an error when not found. `count` counts how many times it appears.

{% example %}
template: |
  {{ "sensor.outdoor_temperature".find("outdoor") }}
  {{ "hello world hello".count("hello") }}
output: |
  7
  2
{% endexample %}

### join

Joins a list into a single piece of text using a separator.

{% example %}
template: "{{ ', '.join(['apples', 'oranges', 'pears']) }}"
output: "apples, oranges, pears"
{% endexample %}

Note the order: you call `.join()` on the separator, passing the list in. There is also a [`join` filter](/template-functions/join/) that reads more naturally: `['apples', 'oranges', 'pears'] | join(', ')`.

### format

Inserts values into a piece of text using placeholders.

{% example %}
template: '{{ "Temperature: {} {}".format(22.5, "°C") }}'
output: "Temperature: 22.5 °C"
{% endexample %}

## Dictionary methods

Dictionaries show up in entity attributes, JSON responses, and action responses.

### items

Iterate over a dictionary's key-value pairs.

{% example %}
template: |
  {% for key, value in {"a": 1, "b": 2}.items() %}
    {{ key }} = {{ value }}
  {% endfor %}
output: |
  a = 1
  b = 2
{% endexample %}

### keys, values

Get only the keys or only the values.

{% example %}
template: |
  {% set data = {"temp": 22.5, "humidity": 54} %}
  Keys: {{ data.keys() | list }}
  Values: {{ data.values() | list }}
output: |
  Keys: ['temp', 'humidity']
  Values: [22.5, 54]
{% endexample %}

### get

Fetch a value by key, with a fallback if the key is missing. This is safer than bracket lookup, which errors on missing keys.

{% example %}
template: |
  {% set data = {"name": "Frenck"} %}
  Name: {{ data.get("name", "unknown") }}
  Age: {{ data.get("age", "unknown") }}
output: |
  Name: Frenck
  Age: unknown
{% endexample %}

### When a key name conflicts with a dict method

If a dictionary has a key with the same name as a dict method (like `values`, `keys`, `items`, or `get`), dot notation returns the method, not the value. This commonly happens when parsing API responses.

{% example %}
template: |
  {% set response = {"status": "ok", "values": [1, 2, 3]} %}
  {{ response['values'] }}
output: "[1, 2, 3]"
{% endexample %}

Use bracket notation (`response['values']`) when a key might collide with a method. It always reaches the dictionary value first.

## Datetime methods

When you have a datetime (for example, from `now()`), you can reach into its parts or format it.

### Accessing parts

{% example %}
template: |
  Hour:    {{ now().hour }}
  Minute:  {{ now().minute }}
  Weekday: {{ now().weekday() }}
  Day:     {{ now().day }}
output: |
  Hour:    14
  Minute:  30
  Weekday: 5
  Day:     4
{% endexample %}

`weekday()` returns Monday as `0` through Sunday as `6`. Use `isoweekday()` if you prefer Monday as `1` through Sunday as `7`.

### Formatting with strftime

`strftime` formats a datetime using format codes. It is covered in detail on the [Working with dates and times](/docs/templating/dates-and-times/) page, but here is the short version:

{% example %}
template: |
  {{ now().strftime('%A, %B %-d, %Y') }}
output: "Saturday, April 4, 2026"
{% endexample %}

### Parsing with strptime

The reverse of `strftime`. Parses a piece of text into a datetime using a format string. See [`strptime`](/template-functions/strptime/).

## Number methods

Numbers have a few helpful methods.

### is_integer

Check whether a floating-point number has no decimal part.

{% example %}
template: |
  {{ (10.0).is_integer() }}
  {{ (10.5).is_integer() }}
output: |
  True
  False
{% endexample %}

## When to use methods vs filters

Both work for many tasks. Pick whichever reads better:

- **Methods** (with a dot) come from Python. `"text".upper()`, `data.get("key")`.
- **Filters** (with a pipe) come from the template engine and Home Assistant. `"text" | upper`, `data | default("key")`.

Filters chain more naturally when you have several transformations. Methods can be clearer for a single transformation or when the method returns something unusual. The [template functions reference](/template-functions/) lists all the filters Home Assistant provides.

## Next steps

- If you're looking for a specific transformation, check the [template functions reference](/template-functions/) first.
- For template debugging, see [Debugging templates](/docs/templating/debugging/).
- For date and time formatting in particular, read [Working with dates and times](/docs/templating/dates-and-times/).
