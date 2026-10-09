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

If you only show or check the variable, as in `{{ foo }}` or `{% if foo %}`, there's no error. The result is empty, and the log shows a warning instead: `Template variable warning: 'foo' is undefined when rendering '...'`. In the template editor, the same message appears as a warning above the result. The error only appears when the template uses the variable further, for example in `{{ foo + 1 }}` or `{{ foo.bar }}`.

**How to fix it.**

- Check the spelling of every name in the template. [`states`](/template-functions/states/) and `state` are different; `trigger.to_state` and `trigger.tostate` are different.
- If you use a variable with `{% set name = value %}`, make sure the `set` runs before the variable is used.
- If you expect the variable to come from an automation trigger (`trigger.*`) or a template entity (`this.*`), remember these only exist in those contexts. They are not available in the {% my tools_template title="Template editor" %}.

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

## ValueError: Template error: float got invalid input 'unavailable' when rendering template '...' but no default was specified

**What it means.** A conversion function got a value it can't convert, and you didn't give it a default to use instead. The value in quotes shows what it got. Common values are `unavailable` or `unknown` from an entity that isn't ready, and `None` from an attribute that doesn't exist.

The same message comes from other functions, with their name instead of `float`. These include [`int`](/template-functions/int/), [`as_datetime`](/template-functions/as_datetime/), [`as_timestamp`](/template-functions/as_timestamp/), [`strptime`](/template-functions/strptime/), [`round`](/template-functions/round/), and the `timestamp_*` functions.

**How to fix it.** Give the function a default value to use instead, for example, `| float(0)` for [`float`](/template-functions/float/), or `as_datetime(value, None)` for [`as_datetime`](/template-functions/as_datetime/):

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

## UndefinedError: 'None' has no attribute 'state'

**What it means.** You used dot notation like `states.sensor.temperature.state`, and the entity `sensor.temperature` doesn't exist, or isn't set up yet. `states.sensor.temperature` then returns `None`, which has no `state`. Usually, the entity ID is misspelled.

If you only show the value, as in `{{ states.sensor.temperature.state }}`, the result is empty, and the log shows a warning instead of the error. In the template editor, the same message appears as a warning above the result.

**How to fix it.**

- Use `states('sensor.temperature')` instead. The function version returns the text `'unknown'` for missing entities instead of raising an error, which is safer.
- Verify the entity ID in {% my tools_states title="**Settings** > **Tools** > **States**" %}.

## TemplateError: Invalid entity ID 'sensor.Temperature'

**What it means.** The entity ID in the template isn't a valid entity ID at all, for example, because it contains capital letters or spaces. Entity IDs only use lowercase letters, numbers, and underscores, with one period between the domain and the name.

**How to fix it.** Copy the entity ID from {% my tools_states title="**Settings** > **Tools** > **States**" %}.

## No first item, sequence was empty

**What it means.** You used [`first`](/template-functions/first/) or [`last`](/template-functions/last/) on a list that turned out to be empty. There is nothing to return.

**How to fix it.** Check the list length first, or use [`default`](/template-functions/default/):

{% example %}
template: |
  {% set items = ['a', 'b', 'c'] %}
  {{ items | first | default('nothing') }}
output: "a"
{% endexample %}

## TemplateError: Use of 'states' is not supported in limited templates

**What it means.** The template runs in a place that only supports [limited templates](/docs/templating/where-to-use/#limited-templates), such as `trigger_variables`, some trigger options, or the `enabled` option of a trigger, condition, or action. The name in quotes shows which function you used. These functions aren't available there:

- Functions that read the state of entities, like `states`, `state_attr`, or `is_state`
- Date and time functions, like `now`, `utcnow`, `today_at`, or `relative_time`
- Some area, floor, label, and device functions, like `area_name` or `device_attr`
- `md5`, the `sha` functions, and `base64_encode` and `base64_decode`

People most often run into this with `now()` in `trigger_variables`.

**How to fix it.** Move the part that uses these functions to a place that supports full templates. For example, use `variables` instead of `trigger_variables` in an automation. `variables` supports full templates, but is only evaluated after the automation starts.

## SecurityError: access to attribute 'append' of 'list' object is unsafe

**What it means.** Templates run in a protected environment that doesn't allow changing lists or dictionaries, or accessing internal attributes. Calling `append`, `update`, or `pop` causes this error right away. If you only read an attribute that starts with `_`, the result is empty, and the log shows a warning. The error only appears when the value is called or used further.

**How to fix it.** Build a new list instead of changing the existing one. For example, use `{% set items = items + ['new'] %}` instead of `{{ items.append('new') }}`. To collect values in a loop, use a `namespace`:

{% example %}
template: |
  {% set ns = namespace(items=[]) %}
  {% for name in ['kitchen', 'hall'] %}
    {% set ns.items = ns.items + [name] %}
  {% endfor %}
  {{ ns.items }}
output: "['kitchen', 'hall']"
{% endexample %}

## TemplateError: Template output exceeded maximum size of 262144 characters

**What it means.** The template produced more than 262,144 characters of text. Home Assistant limits the output size, so a template can't slow down or overload the system.

**How to fix it.** Return less data. For example, filter a list down to the entities you need, or return a count instead of the full list.

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
