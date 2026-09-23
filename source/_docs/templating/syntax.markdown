---
title: "Template syntax"
description: "The building blocks of a template, explained in plain language."
related:
  - docs: /docs/templating/loops-and-conditions/
    title: Loops and conditions
  - docs: /docs/templating/types/
    title: Types and conversion
  - docs: /docs/templating/yaml/
    title: Templates in YAML
  - docs: /template-functions/
    title: Template functions reference
  - docs: /template-functions/float/
    title: "`float` filter"
  - docs: /template-functions/default/
    title: "`default` filter"
---

Templates are made of a handful of pieces that show up everywhere. Once you've seen them a few times, you will recognize them instantly and templates will stop looking like gibberish. This page introduces each piece one at a time.

Don't try to memorize everything at once. Read through, keep this page open while you experiment in the [template editor](/docs/templating/debugging/#the-template-editor), and come back when you need a refresher. That is honestly how most people learn this.

## Code lives inside markers

When Home Assistant reads a template, it gives you back the regular text exactly as you wrote it. But when it sees certain markers, it knows the text in between is code that needs to be calculated. Those markers are called **delimiters** (a fancy word for "the thing that marks where something starts and stops").

Templates have three delimiters. You will use the first one most of the time:

- `{{ ... }}` says "calculate this and show me the result".
- `{% ... %}` says "run this logic, but don't add anything to the output directly".
- `{# ... #}` says "this is a note for me, ignore it".

Here is all three working together:

{% example %}
template: |
  {# Say hello to whoever is home #}
  Hello, {{ states('person.frenck') }}.
  {% if is_state('sun.sun', 'below_horizon') %}
  It is dark outside.
  {% endif %}
output: |
  Hello, home.
  It is dark outside.
{% endexample %}

Notice what happened:

- The comment (`{# ... #}`) was removed from the output.
- The `{{ states('person.frenck') }}` was replaced with the person's current state.
- The `{% if ... %}` decided whether to include the "It is dark outside." line.

That is the whole trick. Everything else on this page is details about what you can put inside those markers.

## Expressions: anything that produces a value

When you write `{{ ... }}`, whatever goes inside is called an **expression**. An expression is "something that can be turned into a value". The value could be a number, a piece of text, a list, or anything else.

These are all valid expressions:

- Text: `'hello'` or `"hello"` (both kinds of quotes work).
- Numbers: `42`, `3.14`.
- True and false: `true`, `false`.
- Nothing at all: `none`.
- A list of things: `[1, 2, 3]` or `['kitchen', 'bedroom']`.
- A calculation: `10 + 5`.
- A call to a function: `states('sensor.temperature')` or `now()`.
- A variable you defined earlier (more on those in [loops and conditions](/docs/templating/loops-and-conditions/)).

When a value has parts inside it (like a state that carries attributes), you reach them with a dot or with square brackets:

{% example %}
template: |
  Temperature: {{ states.sensor.outdoor.state }}
  Friendly name: {{ states.sensor.outdoor.attributes.friendly_name }}
  Same thing: {{ states.sensor.outdoor.attributes['friendly_name'] }}
output: |
  Temperature: 22.5
  Friendly name: Outdoor temperature
  Same thing: Outdoor temperature
{% endexample %}

Dots look cleaner. Brackets are needed when the name has a space or other character that dots don't handle. The most common place you'll hit this is with entity IDs that start with a number, like `device_tracker.2008_gmc`. Writing `states.device_tracker.2008_gmc` fails because names cannot start with a digit, so use `states.device_tracker['2008_gmc']` instead.

## Operators: doing things with values

An **operator** is a symbol that combines or compares values. You already know these from arithmetic at school. They work exactly the same here.

### Math

{% example %}
template: |
  Addition:         {{ 10 + 5 }}
  Subtraction:      {{ 10 - 5 }}
  Multiplication:   {{ 10 * 5 }}
  Division:         {{ 10 / 3 }}
  Integer division: {{ 10 // 3 }}
  Remainder:        {{ 10 % 3 }}
  Power:            {{ 10 ** 2 }}
output: |
  Addition:         15
  Subtraction:      5
  Multiplication:   50
  Division:         3.3333333333333335
  Integer division: 3
  Remainder:        1
  Power:            100
{% endexample %}

The last three are less common. `//` is division that throws away the decimals (so `10 // 3` is `3`, not `3.33`). `%` gives you what is left over after division. `**` raises one number to the power of another.

### Comparison

Comparison operators ask "how does this value relate to that one?". They always answer with `True` or `False`.

{% example %}
template: |
  Equal:              {{ 10 == 10 }}
  Not equal:          {{ 10 != 5 }}
  Greater than:       {{ 10 > 5 }}
  Less than or equal: {{ 5 <= 5 }}
output: |
  Equal:              True
  Not equal:          True
  Greater than:       True
  Less than or equal: True
{% endexample %}

Watch out for the double equals in `==`. A single `=` is used for assignment (giving a name to a value), while `==` is the question "are these two the same?".

### Logic

Logic operators combine multiple true-or-false answers into one. `and` needs both to be true. `or` needs at least one. `not` flips the answer. `in` checks whether something is inside a list or a piece of text.

{% example %}
template: |
  Both true:    {{ true and false }}
  Either true:  {{ true or false }}
  Flipped:      {{ not false }}
  Contains:     {{ 'bedroom' in 'bedroom light' }}
output: |
  Both true:    False
  Either true:  True
  Flipped:      True
  Contains:     True
{% endexample %}

## Filters: changing a value

A **filter** takes a value and transforms it into something new. Filters use the `|` symbol (called a pipe). The pipe points at the filter, like handing the value over to it.

You can read a filter chain out loud left to right: "take `hello`, make it upper case" or "take these numbers, sort them, then join them with commas".

{% example %}
template: |
  Upper case: {{ 'hello' | upper }}
  Rounded:    {{ 3.14159 | round(2) }}
  Chained:    {{ [3, 1, 2] | sort | join(', ') }}
output: |
  Upper case: HELLO
  Rounded:    3.14
  Chained:    1, 2, 3
{% endexample %}

Home Assistant has dozens of filters for converting between types, formatting text, calculating with numbers, and working with lists. The [template functions reference](/template-functions/) lists them all, each with examples.

### Many filters are also functions

A lot of Home Assistant's template functions can be used either as a filter (with `|`) or as a regular function call. These two are exactly the same:

{% example %}
template: |
  As a function: {{ float(states('sensor.outdoor_temperature')) }}
  As a filter:   {{ states('sensor.outdoor_temperature') | float }}
output: |
  As a function: 22.5
  As a filter:   22.5
{% endexample %}

The filter form reads more naturally when you are chaining several steps together. The function form can be clearer when you need an explicit fallback: `float(value, 0)` versus `value | float(0)`. Use whichever feels more readable in each situation. The reference page for each function notes which forms it supports.

### Watch out: filters run before math

Here is a gotcha that catches everyone at least once. The `|` symbol binds tighter than `+`, `-`, `*`, `/`, and all the other math operators. That means this template does not do what it looks like it should:

{% example %}
template: |
  {{ 10 / 3 | round(2) }}
output: "3.3333333333333335"
{% endexample %}

You might read that as "ten divided by three, rounded to two decimals", which should be `3.33`. But because filters take priority, it actually runs as "ten divided by (three rounded to two decimals)", which is `10 / 3.0 = 3.3333333333333335`.

The gotcha bites hardest when the filter changes the value meaningfully. When in doubt, add parentheses so the order you want is clear:

{% example %}
template: |
  With parentheses:    {{ (10 / 3) | round(2) }}
  Without parentheses: {{ 10 / 3 | round(2) }}
output: |
  With parentheses:    3.33
  Without parentheses: 3.3333333333333335
{% endexample %}

In the "without parentheses" version, `3 | round(2)` runs first (rounding `3` gives `3`), then `10 / 3` divides as normal. The rounding had no effect. Parentheses force `10 / 3` to happen first, then round.

Whenever a template looks right but gives an unexpected result, suspect operator precedence and reach for parentheses.

## Tests: asking questions about a value

A **test** is a yes-or-no question you ask about a value. Tests are written with the word `is`, which reads naturally.

{% example %}
template: |
  Is a number:  {{ 42 is number }}
  Is text:      {{ 'hello' is string }}
  Is even:      {{ 6 is even }}
  Is in a list: {{ 3 is in [1, 2, 3] }}
output: |
  Is a number:  True
  Is text:      True
  Is even:      True
  Is in a list: True
{% endexample %}

To ask the opposite, write `is not`:

{% example %}
template: |
  {{ 42 is not number }}
output: "False"
{% endexample %}

Tests are most useful inside [`if` statements](/docs/templating/loops-and-conditions/#conditions-with-if), where you want to react differently based on what kind of value you have.

## Whitespace: trimming unwanted spaces

Templates keep every space and newline you write. That includes the line breaks around `{% if %}` and `{% set %}` tags. This is often fine for notifications, but when you need clean output (like a sensor value), those extra spaces become a problem.

### The problem

{% example %}
template: |
  {% set temp = 22 %}
  {% if temp > 20 %}
  Warm
  {% else %}
  Cool
  {% endif %}
  outside.
output: |


  Warm

  outside.
{% endexample %}

The output has blank lines everywhere. Each `{% %}` tag occupies a line, and that line break stays in the output even though the tag itself produces nothing visible.

### What trimming does

Adding a `-` inside a tag marker removes all whitespace (spaces, tabs, and line breaks) on that side, up to the next non-whitespace character.

- `{% ... %}` trims nothing (default).
- `{%- ... %}` trims the left side: everything before the tag.
- `{% ... -%}` trims the right side: everything after the tag.
- `{%- ... -%}` trims both sides.

The same works for expressions: `{{- ... }}`, `{{ ... -}}`, `{{- ... -}}`.

### Trimming one side

Trimming the right side (`-%}`) removes the line break after a tag. This is the most common form because the blank lines come from the line break that follows each tag:

{% example %}
template: |
  {% set temp = 22 -%}
  {% if temp > 20 -%}
  Warm
  {% else -%}
  Cool
  {% endif -%}
  outside.
output: |
  Warm
  outside.
{% endexample %}

The `-%}` on each tag eats the line break after it, so the tag and the content after it end up on the same line. "Warm" and "outside." each get their own line, which is clean output.

Trimming the left side (`{%-`) removes whitespace before the tag. This pulls the tag toward whatever came before it:

{% example %}
template: |
  The door is
  {%- if true %} open{% endif %}.
output: "The door is open."
{% endexample %}

The `{%-` on the `if` tag eats the line break and spaces before it, so "is" and "open" connect without a gap. Without the `-`, there would be a line break between "is" and "open".

### Trimming both sides

When every tag trims both sides, the output becomes as tight as possible:

{% example %}
template: |
  {%- set temp = 22 -%}
  {%- if temp > 20 -%}
  Warm
  {%- else -%}
  Cool
  {%- endif -%}
output: "Warm"
{% endexample %}

Everything collapses onto one line. The `{%- ... -%}` on every tag removes all surrounding whitespace.

### Mixing trimmed and untrimmed

You do not have to trim every tag. Choose based on what the output should look like:

{% example %}
template: |
  {%- set temp = 22 -%}
  {%- set humidity = 65 -%}
  Temperature: {{ temp }}°C
  Humidity: {{ humidity }}%
output: |
  Temperature: 22°C
  Humidity: 65%
{% endexample %}

The `{%- set ... -%}` tags are fully trimmed (they are setup, not output). The `{{ }}` expressions are not trimmed because we want each reading on its own line.

### Expressions can trim too

The `-` works inside `{{ }}` the same way:

{% example %}
template: |
  Status:
  {{- ' OK' if true else ' Error' }}
output: "Status: OK"
{% endexample %}

The `{{-` eats the line break between "Status:" and the expression, so the result is one line. The space before "OK" is inside the string itself, so it survives.

### When to trim

- **Notifications and messages**: Usually no trimming needed. Extra blank lines are harmless and can improve readability.
- **Sensor values**: Trim aggressively. A template sensor's state should be a clean value like `22.5`, not `  22.5\n` with extra whitespace.
- **Building values on one line**: Trim both sides of every `set`, `if`, and `endif` tag.
- **Multi-line output**: Trim the `set` and logic tags but leave the output expressions untrimmed so each result gets its own line.

## Putting it all together

Most real templates mix several of these pieces. Here is one you might see in an automation:

{% example %}
template: |
  {% set temp = states('sensor.outdoor_temperature') | float(0) %}
  It is {{ temp | round(1) }}°C outside,
  which is {{ 'warm' if temp > 20 else 'cool' }}.
output: "It is 22.5°C outside, which is warm."
{% endexample %}

Let's read it piece by piece:

1. **`{% set temp = ... | float(0) %}`** reads the outdoor temperature, converts it to a number (with `0` as a fallback in case the sensor is offline), and stores the result in a variable named `temp`.
2. **`{{ temp | round(1) }}`** shows that number rounded to one decimal place.
3. **`{{ 'warm' if temp > 20 else 'cool' }}`** picks between two words. If `temp` is more than 20, it picks "warm"; otherwise, "cool".

If that feels like a lot, read the [Loops and conditions](/docs/templating/loops-and-conditions/) page next. It explains `set`, `if`, and `for` in detail.

## Next steps

- Learn about [loops and conditions](/docs/templating/loops-and-conditions/) to make your templates smarter.
- Writing templates inside automations or scripts? Read [Templates in YAML](/docs/templating/yaml/) for the quoting rules.
- Browse the [template functions reference](/template-functions/) for the full list of filters, tests, and functions.
- Try every example on this page in the [template editor](/docs/templating/debugging/#the-template-editor). Experimenting is the fastest way to learn.
