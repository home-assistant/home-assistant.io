---
title: "Template error messages and fixes"
description: "Common template error messages with plain-language explanations and fixes."
related:
  - docs: /docs/templating/debugging/
    title: Debugging templates
  - docs: /docs/templating/types/
    title: Types and conversion
  - docs: /template-functions/typeof/
    title: "`typeof` function"
  - docs: /template-functions/has_value/
    title: "`has_value` function"
---

This page lists template error messages you might run into, what each one means in plain language, and how to fix it. If the message you are seeing does not match exactly, look for the closest one. The names of types and variables change, but the shape of each error stays the same.

For a general debugging workflow, see [Debugging templates](/docs/templating/debugging/).

## UndefinedError: 'foo' is undefined

**What it means.** The template is trying to use a variable named `foo` that does not exist. Either the name is misspelled, or the variable was never set.

**How to fix it.**

- Check the spelling of every name in the template. [`states`](/template-functions/states/) and `state` are different; `trigger.to_state` and `trigger.tostate` are different.
- If you use a variable with `{% set name = value %}`, make sure the `set` runs before the variable is used.
- If you expect the variable to come from an automation trigger (`trigger.*`) or a template entity (`this.*`), remember these only exist in those contexts. They are not available in the {% my developer_template title="Template editor" %}.

## UndefinedError: 'dict object' has no attribute 'foo'

**What it means.** You tried to read a key named `foo` from a dictionary, but that key does not exist.

**How to fix it.**

- Use `.get("foo", default_value)` to return a default when the key is missing: `data.get("foo", 0)`.
- Or check for the key first with `if "foo" in data`.
- If the dictionary comes from a JSON response, print it with `{{ data | tojson }}` to see exactly which keys are there.

## TypeError: unsupported operand type(s) for +: 'str' and 'int'

**What it means.** You are trying to do math between a piece of text and a number. This happens most often with entity states, because every state is stored as text. `"22.5" + 5` does not work.

**How to fix it.** Convert the text to a number first with `| float(0)` or `| int(0)`:

{% example %}
template: |
  {{ states('sensor.temperature') | float(0) + 5 }}
output: "27.5"
{% endexample %}

The `0` is a fallback used when the conversion fails (for example, when the sensor is `unavailable`). See [Types and conversion](/docs/templating/types/).

## TypeError: float() argument must be a string or a real number, not 'NoneType'

**What it means.** You tried to convert `None` to a number, and `None` is not a number. This usually comes from reading an attribute that does not exist, or calling [`state_attr`](/template-functions/state_attr/) for an entity that has not been set up yet.

**How to fix it.** Add a default value to [`float`](/template-functions/float/) or [`int`](/template-functions/int/):

{% example %}
template: |
  {{ state_attr('light.kitchen', 'brightness') | float(0) }}
output: "0"
{% endexample %}

Or skip the calculation when the value is missing using [`has_value`](/template-functions/has_value/).

## TypeError: object of type 'generator' has no len()

**What it means.** You tried to count or measure an iterable directly. Filters like [`map`](/template-functions/map/), [`select`](/template-functions/select/), [`reject`](/template-functions/reject/), [`selectattr`](/template-functions/selectattr/), and [`rejectattr`](/template-functions/rejectattr/) return iterables, not lists. Iterables cannot be counted until you materialize them.

**How to fix it.** Add `| list` to turn the iterable into a list first:

{% example %}
template: |
  {{ states.light | selectattr('state', 'eq', 'on') | list | count }}
output: "3"
{% endexample %}

See [Types and conversion](/docs/templating/types/#iterables-look-like-lists-but-are-not) for more on iterables.

## TemplateSyntaxError: expected token 'end of statement block', got 'X'

**What it means.** There is a typo or an unexpected character inside a `{% ... %}` block. Something is written that the template engine doesn't recognize.

**How to fix it.**

- Look at the template line number in the error.
- Check for missing commas, brackets, or quotes.
- Verify that operators are spelled right (`==`, `!=`, `and`, `or`, `not`, `in`).
- Python comparisons like `is not None` work; make sure you used `is not`, not `not is`.

## TemplateSyntaxError: Unexpected end of template

**What it means.** A `{% if %}`, `{% for %}`, `{% set %}`, or `{% macro %}` block was opened but not closed. Every block tag needs a matching `{% endif %}`, `{% endfor %}`, `{% endset %}`, or `{% endmacro %}`.

**How to fix it.**

- Count the opening and closing tags. If you have two `{% if %}`, you need two `{% endif %}`.
- Indent the template in the editor so you can see the structure.

## TemplateSyntaxError: tag name expected

**What it means.** You have a `{% %}` block with nothing inside, or with something the engine cannot parse as a statement.

**How to fix it.** Check the line. Remove empty `{% %}` markers. If you intended a comment, use `{# ... #}` instead.

## TemplateAssertionError: no test named 'foo'

**What it means.** After `is`, you used a test name the engine does not know.

**How to fix it.** Check the test name against the [template functions reference](/template-functions/#comparison). Common tests are [`defined`](/template-functions/defined/), [`none`](/template-functions/none/), `number`, [`string`](/template-functions/string/), `boolean`, [`iterable`](/template-functions/iterable/), [`mapping`](/template-functions/mapping/), [`even`](/template-functions/even/), [`odd`](/template-functions/odd/), [`eq`](/template-functions/eq/), [`gt`](/template-functions/gt/), [`lt`](/template-functions/lt/), and `in`. Aliases like `equalto`, `greaterthan`, and `lessthan` also work.

## UndefinedError: 'states' has no attribute 'sensor'

**What it means.** When using dot notation like `states.sensor.temperature.state`, one of the pieces in the chain does not exist. Usually this means the entity ID is wrong, or the entity has not been set up yet.

**How to fix it.**

- Use `states('sensor.temperature')` instead. The function version returns the text `'unknown'` for missing entities instead of raising an error, which is safer.
- Verify the entity ID in {% my developer_states title="**Settings** > **Developer tools** > **States**" %}.

## No first item, sequence was empty

**What it means.** You used [`first`](/template-functions/first/) or [`last`](/template-functions/last/) on a list that turned out to be empty. There is nothing to return.

**How to fix it.** Check the list length first, or use [`default`](/template-functions/default/):

{% example %}
template: |
  {% set items = ['a', 'b', 'c'] %}
  {{ items | first | default('nothing') }}
output: "a"
{% endexample %}

## YAML error: could not find expected ':'

**What it means.** Your YAML file contains a template with unquoted braces (`{{` or `{%`). YAML tries to parse `{` as the start of a flow-style mapping and fails.

**How to fix it.** Wrap the single-line template in quotes, or use a multi-line block scalar:

```yaml
# Correct: quoted
value_template: "{{ states('sensor.temperature') }}"

# Correct: multi-line
value_template: >
  {{ states('sensor.temperature') }}
```

See [Templates in YAML](/docs/templating/yaml/) for the full set of quoting rules.

## Next steps

- For a systematic approach to narrowing down any template problem, see [Debugging templates](/docs/templating/debugging/).
- If the error came from a quoting or indentation issue, head to [Templates in YAML](/docs/templating/yaml/).
- If the error involves state values being text, see [Working with states](/docs/templating/states/).

## Still stuck?

The Home Assistant community is quick to help: join [Discord](https://discord.gg/home-assistant) for real-time chat, post on the [community forum](https://community.home-assistant.io) with your template and the exact error message, or share on [our subreddit](https://reddit.com/r/homeassistant).

{% tip %}
AI assistants like ChatGPT or Claude can also explain or fix templates when you describe what you want in plain language. Paste in your template and the error message.
{% endtip %}
