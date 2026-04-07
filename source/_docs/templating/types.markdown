---
title: "Types and type conversion"
description: "Understand the data types in templates and how to convert between them."
related:
  - docs: /template-functions/float/
    title: "`float` filter"
  - docs: /template-functions/int/
    title: "`int` filter"
  - docs: /template-functions/list/
    title: "`list` filter"
  - docs: /template-functions/typeof/
    title: "`typeof` function"
  - docs: /docs/templating/debugging/
    title: Debugging templates
---

Templates work with several kinds of values: text, numbers, lists, and a few others. Each kind is called a **type**, and knowing which type you have matters because most operations only work with specific types. Trying to do math on text, or count items in an iterable, gives you surprising results until you convert first.

This page walks through the types you will meet, how they interact, and when you need to convert between them.

## The types you will meet

- **Text** (`str` or `string`): a piece of text, written in single or double quotes. Every entity state in Home Assistant is stored as text.
- **Integer** (`int` or `integer`): a whole number without a decimal point. Examples: `0`, `42`, `-7`.
- **Float** (`float`): a number with a decimal point. Examples: `3.14`, `-0.5`, `22.0`.
- **Boolean** (`bool` or `boolean`): either `True` or `False`. The answer to yes-or-no questions.
- **None** (`NoneType` or `None`): the absence of a value. Returned when something does not exist.
- **List**: an ordered collection of values, written with square brackets. Example: `[1, 2, 3]` or `['kitchen', 'bedroom']`. Also called an array or sequence.
- **Dictionary** (`dict`): a set of key/value pairs, written with curly braces. Example: `{'temp': 22, 'humidity': 54}`. Also called a map or mapping.
- **Iterable**: a sequence of values you can loop over **once**. Also called a generator. Filters like [`map`](/template-functions/map/), [`select`](/template-functions/select/), and [`selectattr`](/template-functions/selectattr/) return iterables. You cannot count them, index them, or use them twice until you turn them into a list. Covered in detail [below](#iterables-look-like-lists-but-are-not).
- **Datetime**: a moment in time with a date, time, and time zone. Returned by `now()` and the `last_changed` attribute on states.

## Why types matter

Most functions and operators only work with specific types. Here are some examples:

- Math operators (`+`, `-`, `*`, `/`) need **numbers**. Using them on text fails.
- `| count` or `| length` needs a **list** or similar countable. It does not work on an iterable.
- Comparison with `<`, `>` works on numbers correctly, but on text it compares alphabetically (`'6' > '10'` is `True` because `'6'` comes after `'1'`).
- The `in` operator works on lists, text, and dicts, but the behavior is different for each.

When a template produces an unexpected result, the type of the values involved is usually the first thing to check.

## Every state is text

This is the single most important type fact in Home Assistant templates: **every entity state is stored as text**. Even when a sensor looks like it reports a number, `states('sensor.temperature')` returns the text `'22.5'`, not the number `22.5`.

{% example %}
template: "{{ states('sensor.temperature') | typeof }}"
output: "str"
{% endexample %}

This is why you see `| float(0)` or `| int(0)` everywhere in template examples. Before you can do math, compare numerically, or average a bunch of values, you have to convert them to numbers.

{% example %}
template: |
  {# This looks like math but is text concatenation #}
  {{ states('sensor.a') + states('sensor.b') }}
output: "22.518.5"
{% endexample %}

{% example %}
template: |
  {# This does real math #}
  {{ states('sensor.a') | float(0) + states('sensor.b') | float(0) }}
output: "41.0"
{% endexample %}

## Converting between types

Each type has a matching filter (and function) to convert a value to that type:

- [`| float(default)`](/template-functions/float/): converts to a decimal number. If the value cannot be converted, the default is used.
- [`| int(default)`](/template-functions/int/): converts to a whole number. Decimals are dropped.
- [`| string`](/template-functions/string/): converts anything to text.
- [`| bool(default)`](/template-functions/bool/): converts to `True` or `False`.
- [`| list`](/template-functions/list/): materializes an iterable into a list.

The `default` arguments for [`float`](/template-functions/float/), [`int`](/template-functions/int/), and [`bool`](/template-functions/bool/) are fallbacks used when the conversion fails (for example, a sensor that reports `unavailable`).

{% example %}
template: |
  {{ "3.14" | float(0) }}
  {{ "seven" | float(0) }}
  {{ "42" | int(0) }}
  {{ 3.7 | int }}
  {{ 1 | string }}
  {{ "yes" | bool }}
output: |
  3.14
  0.0
  42
  3
  1
  True
{% endexample %}

**Rule of thumb:** whenever you read a state and need to do math with it, add `| float(0)` or `| int(0)` with a sensible fallback.

## Iterables look like lists, but are not

Some filters return an iterable instead of a list. An iterable is a lazy sequence. It gives you values one at a time when you loop over it, but it is not a list. You cannot count it, index it, or use it twice.

The Home Assistant filters that return iterables are:

- [`map`](/template-functions/map/)
- [`select`](/template-functions/select/)
- [`reject`](/template-functions/reject/)
- [`selectattr`](/template-functions/selectattr/)
- [`rejectattr`](/template-functions/rejectattr/)

If you try to count an iterable directly, you get an error:

{% example %}
template: |
  {# This fails #}
  {{ states.light | selectattr('state', 'eq', 'on') | count }}
output: "Error: object of type 'generator' has no len()"
{% endexample %}

The fix is to add `| list` to turn the iterable into a list first:

{% example %}
template: |
  {# This works #}
  {{ states.light | selectattr('state', 'eq', 'on') | list | count }}
output: "3"
{% endexample %}

You will see `| list` at the end of filter chains all over Home Assistant templates. It is not optional decoration, it is the step that makes the result countable, sortable, and reusable. A good habit: if you feed the result of [`map`](/template-functions/map/), [`select`](/template-functions/select/), [`reject`](/template-functions/reject/), [`selectattr`](/template-functions/selectattr/), or [`rejectattr`](/template-functions/rejectattr/) into anything that needs a list, add `| list`.

## Getting items from lists and dictionaries

Collections give you several ways to reach the items inside them.

### From a list

Use the [`first`](/template-functions/first/) and [`last`](/template-functions/last/) filters to grab the ends, or square brackets with an index to reach a specific position. Indices start at `0`, and negative numbers count from the end.

{% example %}
template: |
  {% set rooms = ['kitchen', 'bedroom', 'garage'] %}
  First:    {{ rooms | first }}
  Last:     {{ rooms | last }}
  Index 0:  {{ rooms[0] }}
  Index 1:  {{ rooms[1] }}
  Index -1: {{ rooms[-1] }}
output: |
  First:    kitchen
  Last:     garage
  Index 0:  kitchen
  Index 1:  bedroom
  Index -1: garage
{% endexample %}

### From a dictionary

Dictionaries support two ways to read a value: bracket notation (`data['key']`) and dot notation (`data.key`). Both usually work.

{% example %}
template: |
  {% set data = {'temp': 22.5, 'humidity': 54} %}
  Bracket: {{ data['temp'] }}
  Dot:     {{ data.temp }}
output: |
  Bracket: 22.5
  Dot:     22.5
{% endexample %}

**Use bracket notation when a key name could conflict with a dict method.** If a key is named `values`, `keys`, `items`, `get`, or any other built-in dict method, dot notation returns the method instead of your value. This is common with API responses.

{% example %}
template: |
  {% set response = {'status': 'ok', 'values': [1, 2, 3]} %}
  {{ response['values'] }}
output: "[1, 2, 3]"
{% endexample %}

When in doubt, reach for bracket notation. It always looks up the dictionary value first.

## Checking what type you have

When you are not sure what type a value is, use [`typeof`](/template-functions/typeof/) to inspect it:

{% example %}
template: |
  {{ 42 | typeof }}
  {{ 3.14 | typeof }}
  {{ "hello" | typeof }}
  {{ [1, 2, 3] | typeof }}
  {{ {"a": 1} | typeof }}
  {{ None | typeof }}
output: |
  int
  float
  str
  list
  dict
  NoneType
{% endexample %}

The names you get back are the Python type names: `str` for text, `int` for whole numbers, `float` for decimals, `bool` for booleans, `list`, `dict`, `NoneType` for `None`.

## Testing types with tests

Tests let you check a type inside an [`if` condition](/docs/templating/loops-and-conditions/#conditions-with-if), without calling [`typeof`](/template-functions/typeof/):

{% example %}
template: |
  {{ 42 is number }}
  {{ "hello" is string }}
  {{ [1, 2, 3] is iterable }}
  {{ {"a": 1} is mapping }}
  {{ None is none }}
output: |
  True
  True
  True
  True
  True
{% endexample %}

Useful type tests: `number`, [`string`](/template-functions/string/), `boolean`, `integer`, [`float`](/template-functions/float/), [`iterable`](/template-functions/iterable/), [`mapping`](/template-functions/mapping/), [`none`](/template-functions/none/), [`defined`](/template-functions/defined/). See the [Comparison](/template-functions/#comparison) category in the reference for the full list.

## Common type mistakes

- **Doing math on a sensor state without `| float(0)`**. Always convert first.
- **Comparing text to a number**. `states('sensor.temp') < 20` compares text to a number. Always `| float(0)` first.
- **Using `< `or `>` on text**. Text compares alphabetically, which rarely does what you want for numbers.
- **Forgetting `| list` after [`map`](/template-functions/map/), [`select`](/template-functions/select/), [`reject`](/template-functions/reject/), [`selectattr`](/template-functions/selectattr/), [`rejectattr`](/template-functions/rejectattr/)**. The result is an iterable, not a list, so `| count` and `| length` fail.
- **Expecting `None` or `unknown` to be a number**. Both break math operations. Use a fallback.

## Next steps

- For hands-on debugging, see [Debugging templates](/docs/templating/debugging/).
- For more on working with states, see [Working with states](/docs/templating/states/).
- For recipes that use these conversions, see [Common template patterns](/docs/templating/patterns/).
