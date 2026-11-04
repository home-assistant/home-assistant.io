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

Home Assistant has a built-in template editor that shows the result of a template while you type. Open it from {% my tools_template title="**Settings** > **Tools** > **Template**" %}.

The editor is the fastest feedback loop you have. It:

- Shows the output of your template live.
- Shows errors and warnings as a message above the result.
- Shows the type of the result, for example **Result type: string** or **Result type: boolean**.
- Shows when the template updates, for example, when an entity it listens to changes.
- Has access to all your entities, so you can try a template against real data.

For everything the editor shows, refer to [Template editor tab](/docs/tools/dev-tools/#template-editor-tab).

## Finding the problem in a template

If a template in an automation or script misbehaves, start with the trace of the run. It shows which step went wrong and the error message. For the steps to open a trace, refer to [Viewing the traces of an automation](/docs/automation/testing/#viewing-the-traces-of-an-automation).

To fix a template in an automation, a script, or a template entity, use the template editor:

1. Copy the template from your automation, script, or template entity.
2. Go to {% my tools_template title="**Settings** > **Tools** > **Template**" %} and paste the template into the **Template editor**.
   - If the template uses `trigger` or `this`, define them at the top with `{% set %}`. For the steps, refer to [Testing a template](/docs/tools/dev-tools/#testing-a-template).
3. Under **Result**, check the output.
   - If a message is shown above or instead of the result, refer to [Troubleshooting template errors](/docs/templating/errors/).
   - Check the **Result type**. Home Assistant converts the final result of a template to the type it looks like, so a numeric-looking sensor state can appear as a number even though its value is text inside the template. To check a value inside the template, refer to [Check what a value actually is](#check-what-a-value-actually-is).
   - Below the result, check what the template listens to. If neither the entity you expect nor its domain is listed, the template doesn't update when that entity changes. If the editor says that the template listens for all state changed events, it updates when any entity changes. For details, refer to [When does my template run?](#when-does-my-template-run).
4. Change the template until the result is what you expect. If the template is long, take it apart first. For the steps, refer to [Narrow down the problem](#narrow-down-the-problem).
5. If you defined `trigger` or `this` with `{% set %}`, remove those lines. Then copy the template, and paste it back into your automation, script, or template entity.

## Narrow down the problem

When a long template doesn't work, the trick is to take it apart. Start with the smallest piece you can and add one thing at a time. The moment the result goes wrong, you know exactly which piece broke. This sounds slow, but it's usually faster than staring at the whole thing and hoping the problem jumps out.

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

When a template gives the wrong result, show the raw value to see what you're working with.

{% example %}
template: |
  {{ states('sensor.outdoor_temperature') }}
output: "22.5"
{% endexample %}

In the editor, this result shows as a number, because Home Assistant converts the final result of a template to the type it looks like. Inside the template, the value is text. Entity states are always text, even when they look like numbers. Use [`typeof`](/template-functions/typeof/) to see the type inside the template:

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

**Time functions.** Templates that use `now()`, `utcnow()`, `today_at`, `relative_time`, `time_since`, or `time_until` re-run at the start of every minute. For details, refer to [Getting the current time](/docs/templating/dates-and-times/#getting-the-current-time).

**Other variables.** Templates that depend on `this`, `trigger`, or other context variables only re-run when the context changes (a new trigger fires, the entity updates).

If you write a template that does not read any state or use one of these time functions, it runs _once_ at startup and never again. That is fine for constant values, but it's a common trap when you want a template to react to something.

<a id="why-does-it-work-in-tools-but-not-in-my-automation"></a>

## Why does my template behave differently in Tools?

The **Template editor** shows the result of your template right away. It updates the result while you type, and when the states that the template uses change. That makes it great for testing, but the editor does not run your template the same way as an automation or a template entity. A template can work in the editor and not in your automation, or the other way around.

{% details "Template with `this` or `trigger` shows an error or an empty result in the editor" %}

### Symptom 1

Your template uses `this` or `trigger`, for example, `{{ trigger.to_state.state }}`. In the **Template editor**, it shows an error, or a warning and an empty result.

#### Cause

The editor does not have the variables `this` and `trigger`. Home Assistant only provides them when the template runs in certain places, such as an automation or a template entity.

#### Resolution

1. In the **Template editor**, at the top of the template, define the variables yourself with `{% set %}`, using the values you expect. For an example, refer to [testing an incoming-data template](/docs/templating/where-to-use/#testing-an-incoming-data-template).
2. Check the result.
   - Result: The editor shows the result that the template gives with these values.

{% enddetails %}

{% details "Template trigger does not react" %}

### Symptom 2

In the **Template editor**, the result of your template is true, but the automation with the template trigger does not start.

#### Cause

A template trigger only reacts when the result of the template changes from false to true. The editor only shows the current result. If the result is already true when you load the automation, the trigger does not react until the result has been false again.

#### Resolution

1. Make sure the result of the template is false, for example, by changing the state that the template checks.
2. Cause the change that makes the result true.
   - Result: The trigger reacts, and the automation starts.

{% enddetails %}

## Common mistakes

- **Sensor gives text, not a number.** Use `| float(0)` or `| int(0)`.
- **Entity is `unknown` or `unavailable`.** Check it first with `if has_value(...)`, or give `float` and `int` a fallback, such as `| float(0)`.
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
- **Tests are lowercase.** In Python, you write `is None`. In templates, `is` runs a test, and test names are lowercase, so write `is none`. `is None` gives the error `No test named 'None'`. As values, `None`, `True`, and `False` work in either case, such as `none` or `None`.
- **No f-strings.** Python's `f"hello {name}"` is not template syntax. Use `"hello " ~ name` (the `~` joins text) or `{{ name }}` directly.
- **No `while` loops.** Templates only support `for` loops.
- **List and dict methods are limited.** Read-only methods like `.items()`, `.values()`, `.keys()`, `.get()`, `.split()`, `.lower()`, and `.upper()` work fine. Methods that mutate a value in place, like `.append()`, `.pop()`, or `.update()`, are blocked as unsafe. To build up a list across loop iterations, use a [`namespace`](/template-functions/namespace/) instead. For the blocked methods and their alternatives, refer to [Methods that change a list](/docs/templating/python-methods/#methods-that-change-a-list).

## Next steps

- Looking up a specific error message? See [Error messages and fixes](/docs/templating/errors/).
- Need a working example to compare against? Browse [Common template patterns](/docs/templating/patterns/).
- Want to refresh the basics? Review [Template syntax](/docs/templating/syntax/).

## Still stuck?

The Home Assistant community is quick to help: join [Discord](https://discord.gg/home-assistant) for real-time chat, post on the [community forum](https://community.home-assistant.io) with your template and expected result, or share on [our subreddit](https://reddit.com/r/homeassistant). When you ask, include these four things and the answer usually comes within minutes:

- The template you are using (copied from the editor, where you can see what it runs against).
- What you expected the result to be.
- What the actual result or error was.
- The entity IDs involved (from {% my tools_states title="**Settings** > **Tools** > **States**" %}).

{% tip %}
AI assistants like ChatGPT or Claude can also explain or fix templates when you describe what you want in plain language.
{% endtip %}
