---
title: "Debugging templates"
description: "Find and fix mistakes in your templates using the template editor and a few good habits."
related:
  - docs: /docs/templating/errors/
    title: Error messages and fixes
  - docs: /docs/templating/types/
    title: Types and conversion
  - docs: /template-functions/typeof/
    title: "`typeof` function"
  - docs: /template-functions/has_value/
    title: "`has_value` function"
  - docs: /template-functions/default/
    title: "`default` filter"
  - docs: /docs/templating/yaml/
    title: Templates in YAML
  - url: https://community.home-assistant.io/
    title: Home Assistant Community Forum
---

Every template author has stared at a template that refuses to work and wondered if they're losing it. You are not. Templates are fiddly, and even experienced people make the same mistakes over and over. This page walks through the tools and habits that turn "why isn't this working?" into "ah, that's the problem".

## The template editor

Home Assistant has a built-in template editor that shows the result of a template while you type. Open it from {% my developer_template title="**Settings** > **Tools** > **Template**" %}.

The editor is the fastest feedback loop you have. It:

- Shows the output of your template live.
- Points at errors with a red message.
- Has access to all your entities, which means you can try the template against real data.

When a template misbehaves in an automation or template entity, copy it into the editor, adjust until it produces what you want, then paste it back.

## Read the error message

When a template has a mistake, Home Assistant shows an error. The message is often more helpful than it looks.

**`UndefinedError: 'foo' is undefined`**
Something in your template refers to a variable that does not exist. Check the spelling and make sure anything you `{% set %}` is defined before you use it.

**`TypeError: unsupported operand type(s)`**
You are trying to do something to a value of the wrong type, like adding a number to some text. Convert with [`float`](/template-functions/float/) or [`int`](/template-functions/int/) first, and remember to add a fallback.

**`TemplateSyntaxError`**
A typo in the template itself. Count your brackets, check that every `{% if %}` has an `{% endif %}`, and that every `{% for %}` has an `{% endfor %}`.

**`No first item, sequence was empty`**
You used [`first`](/template-functions/first/) or [`last`](/template-functions/last/) on an empty list. Add an `if` check, or use the [`default`](/template-functions/default/) filter.

## Narrow down the problem

When a long template does not work, the trick is to take it apart. Start with the smallest piece you can and add one thing at a time. The moment the result goes wrong, you know exactly which piece broke. This sounds slow but it is always faster than staring at the whole thing and hoping the problem jumps out.

{% example %}
template: |
  {# Start here #}
  {{ states('sensor.outdoor_temperature') }}
output: "22.5"
{% endexample %}

{% example %}
template: |
  {# Add the conversion #}
  {{ states('sensor.outdoor_temperature') | float(0) }}
output: "22.5"
{% endexample %}

{% example %}
template: |
  {# Add the rounding #}
  {{ states('sensor.outdoor_temperature') | float(0) | round(1) }}
output: "22.5"
{% endexample %}

{% example %}
template: |
  {# Add the full sentence #}
  It is {{ states('sensor.outdoor_temperature')
           | float(0) | round(1) }}°C outside.
output: "It is 22.5°C outside."
{% endexample %}

## Check what a value actually is

When a template gives the wrong result, show the raw value to see what you are working with.

{% example %}
template: |
  {{ states('sensor.outdoor_temperature') }}
output: "22.5"
{% endexample %}

That result looks like a number, but it is actually text. Many sensors return text even when the content looks numeric. Use [`typeof`](/template-functions/typeof/) to be sure:

{% example %}
template: |
  {{ states('sensor.outdoor_temperature') | typeof }}
output: "str"
{% endexample %}

`str` is short for "string", which is how templates refer to text. If you see `str` where you expected a number, that's your clue to convert with [`float`](/template-functions/float/) or [`int`](/template-functions/int/). `int` and `float` in the output mean the value is already a whole number or decimal number.

## Inspect attributes

When you are not sure what attributes an entity has, show them all with [`tojson`](/template-functions/tojson/):

{% example %}
template: |
  {{ state_attr('media_player.living_room', 'source_list') | tojson }}
output: '["Spotify", "Bluetooth", "TV", "Radio"]'
{% endexample %}

Or list every attribute:

{% example %}
template: |
  {% for key, value in states.media_player.living_room.attributes.items() %}
    {{ key }}: {{ value }}
  {% endfor %}
output: |
  friendly_name: Living room
  volume_level: 0.35
  source: Spotify
  source_list: ['Spotify', 'Bluetooth', 'TV', 'Radio']
{% endexample %}

## When does my template run?

A common source of confusion is "why isn't my template updating?", or the opposite: "why is it running so often?". Home Assistant decides when to re-evaluate a template based on what is _inside_ it.

**Entity states.** When your template reads a state, like `states('sensor.temperature')`, Home Assistant watches that entity. The template runs again every time the entity's state changes.

**`now()` and `utcnow()`.** Templates that use `now()` or `utcnow()` re-run once per minute.

**Other variables.** Templates that depend on `this`, `trigger`, or other context variables only re-run when the context changes (a new trigger fires, the entity updates).

If you write a template that does not read any state or use `now()`, it runs _once_ at startup and never again. That is fine for constant values, but it's a common trap when you want a template to react to something.

### Why does it work in Developer Tools but not in my automation?

The **Template editor** runs your template once, right when you open it, and shows the result. There is no ongoing re-evaluation. That makes it great for testing, but a working template in the editor does not guarantee it works in an automation.

Two things commonly differ:

- **`this` and `trigger` are not available** in the editor. If your template refers to them, the editor shows an error. In a template entity or automation, they exist.
- **Automations re-evaluate on change.** A template trigger only fires when the template's result goes from false to true. If you load an automation while the condition is already true, nothing fires.

When a template works in the editor but not in an automation, check whether you are using `this`, `trigger`, or expecting a specific "on-change" behavior.

## Common mistakes

- **Sensor gives text, not a number.** Use `| float(0)` or `| int(0)`.
- **Entity is `unknown` or `unavailable`.** Add a fallback with `| default(...)` or an `if has_value(...)` check.
- **Variable changes inside a loop are lost.** Use [`namespace`](/template-functions/namespace/).
- **YAML refuses to load your template.** Check quoting. See [Templates in YAML](/docs/templating/yaml/).
- **Template appears as literal text in output.** The field does not support templating, or the template is inside a `{% raw %}` / `{% endraw %}` block.
- **Template evaluates at the wrong time.** Triggers and conditions are checked on change, not continuously. A template condition that depends on `now()` only re-checks when something else triggers.
- **Comparing text to a number.** `'6' < '10'` is `False` because text is compared alphabetically, not numerically. Convert with `| float(0)` or `| int(0)` on both sides first.

## Common Python mistakes

Templates use [Jinja2](https://jinja.palletsprojects.com/), a templating engine built on top of Python, but the syntax is not the same as Python. A few things that work in Python don't work in templates:

- **No `print()`.** Write `{{ expression }}` to show a value. There is no print statement.
- **No `import`.** You cannot import modules. The functions available to you are the ones in the [template functions reference](/template-functions/) plus the standard Jinja filters.
- **No `=` inside `{{ }}` for assignment.** Use `{% set name = value %}` to create a variable. Inside `{{ }}`, `=` does not exist.
- **`None` must be capitalized.** Python writes `None`, `True`, `False` with a capital first letter. Template tests and literals use lowercase `none`, `true`, `false`. Both work in most places, but be consistent.
- **No f-strings.** Python's `f"hello {name}"` is not template syntax. Use `"hello " ~ name` (the `~` joins text) or `{{ name }}` directly.
- **No `while` loops.** Templates only support `for` loops.
- **List and dict methods are limited.** Read-only methods like `.items()`, `.values()`, `.keys()`, `.get()`, `.split()`, `.lower()`, and `.upper()` work fine. Methods that mutate a value in place, like `.append()`, `.pop()`, or `.update()`, are blocked as unsafe. To build up a list across loop iterations, use a [`namespace`](/template-functions/namespace/) instead.

## Next steps

- Looking up a specific error message? See [Error messages and fixes](/docs/templating/errors/).
- Need a working example to compare against? Browse [Common template patterns](/docs/templating/patterns/).
- Want to refresh the basics? Review [Template syntax](/docs/templating/syntax/).

## Still stuck?

The Home Assistant community is quick to help: join [Discord](https://discord.gg/home-assistant) for real-time chat, post on the [community forum](https://community.home-assistant.io) with your template and expected result, or share on [our subreddit](https://reddit.com/r/homeassistant). When you ask, include these four things and the answer usually comes within minutes:

- The template you are using (copied from the editor, where you can see what it runs against).
- What you expected the result to be.
- What the actual result or error was.
- The entity IDs involved (from {% my developer_states title="**Settings** > **Tools** > **States**" %}).

{% tip %}
AI assistants like ChatGPT or Claude can also explain or fix templates when you describe what you want in plain language.
{% endtip %}
