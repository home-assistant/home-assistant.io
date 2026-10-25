---
title: "Troubleshooting template errors"
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

This page lists template error messages you might run into, what each one means in plain language, and how to fix it. If the message you see doesn't match exactly, look for the closest one. The names of types and variables change, but the shape of each error stays the same.

You can find most of these messages in the template editor and in the logs. If a template in the conditions or actions of an automation or script fails, the trace of the run also shows the error, on the step where it happened. For the steps to open a trace, refer to [Viewing the traces of an automation](/docs/automation/testing/#viewing-the-traces-of-an-automation).

For a general debugging workflow, refer to [Debugging templates](/docs/templating/debugging/).

## Undefined value errors

<a id="undefinederror-foo-is-undefined"></a>

{% details "UndefinedError: 'foo' is undefined" %}

<h3 class="no_toc">Symptom</h3>

The template editor or the log shows the error `UndefinedError: 'foo' is undefined`. Or, the result is empty, and the template editor shows `'foo' is undefined` as a warning. In the log, the warning reads `Template variable warning: 'foo' is undefined when rendering '...'`.

#### Description

The template is trying to use a variable named `foo` that doesn't exist. Either the name is misspelled, or the variable was never set.

If you only show or check the variable, as in `{{ foo }}` or `{% if foo %}`, you get the warning. The error only appears when the template uses the variable further, for example in `{{ foo + 1 }}` or `{{ foo.bar }}`.

#### Resolution

- Check the spelling of every name in the template. [`states`](/template-functions/states/) and `state` are different; `trigger.to_state` and `trigger.tostate` are different.
- If you use a variable with `{% set name = value %}`, make sure the `set` runs before the variable is used.
- If you expect the variable to come from an automation trigger (`trigger.*`) or a template entity (`this.*`), remember these only exist in those contexts. They aren't available in the template editor under {% my tools_template title="**Settings** > **Tools** > **Template**" %}. To test the template in the editor anyway, define the variables yourself. For the steps, refer to [Testing a template](/docs/tools/dev-tools/#testing-a-template).

{% enddetails %}

<a id="undefinederror-dict-object-has-no-attribute-foo"></a>

{% details "UndefinedError: 'dict object' has no attribute 'foo'" %}

<h3 class="no_toc">Symptom</h3>

The template editor or the log shows the error `UndefinedError: 'dict object' has no attribute 'foo'`. Or, the result is empty, and the template editor shows the same message as a warning.

#### Description

You tried to read a key named `foo` from a dictionary, but that key doesn't exist.

If you only show the value, as in `{{ data.foo }}`, you get the warning. The error only appears when the template uses the value further, for example in `{{ data.foo + 1 }}`.

#### Resolution

- Use `.get('foo', default_value)` to return a default when the key is missing: `data.get('foo', 0)`.
- Or check for the key first with `if 'foo' in data`.
- If the dictionary comes from a JSON response, show it with `{{ data | tojson }}` to see exactly which keys are there.

{% enddetails %}

<a id="undefinederror-none-has-no-attribute-state"></a>

{% details "UndefinedError: 'None' has no attribute 'state'" %}

<h3 class="no_toc">Symptom</h3>

The template editor or the log shows the error `UndefinedError: 'None' has no attribute 'state'`. Or, the result is empty, and the template editor shows the same message as a warning.

#### Description

You used dot notation like `states.sensor.temperature.state`, and the entity `sensor.temperature` doesn't exist, or isn't set up yet. `states.sensor.temperature` then returns `None`, which has no `state`. Usually, the entity ID is misspelled.

If you only show the value, as in `{{ states.sensor.temperature.state }}`, you get the warning. The error only appears when the template uses the value further, for example in `{{ states.sensor.temperature.state | float }}`.

#### Resolution

- Use `states('sensor.temperature')` instead. The function version returns the text `'unknown'` for missing entities instead of raising an error, which is safer.
- Verify the entity ID in {% my tools_states title="**Settings** > **Tools** > **States**" %}.

{% enddetails %}

<a id="no-first-item-sequence-was-empty"></a>

{% details "No first item, sequence was empty" %}

<h3 class="no_toc">Symptom</h3>

The template editor or the log shows the error `UndefinedError: No first item, sequence was empty`. Or, the result is empty, and the template editor shows `No first item, sequence was empty` as a warning. For [`last`](/template-functions/last/), the message is `No last item, sequence was empty`.

#### Description

You used [`first`](/template-functions/first/) or [`last`](/template-functions/last/) on a list that turned out to be empty. There is nothing to return.

If you only show the result, you get the warning. The error only appears when the template uses the result further, for example in `{{ (items | first).name }}`.

#### Resolution

Check the list length first, or use [`default`](/template-functions/default/):

{% example %}
template: |
  {% set items = [] %}
  {{ items | first | default('nothing') }}
output: "nothing"
{% endexample %}

{% enddetails %}

## Type errors

<a id="typeerror-can-only-concatenate-str-not-int-to-str"></a>
<a id="typeerror-unsupported-operand-types-for--str-and-int"></a>

{% details "TypeError: can only concatenate str (not &quot;int&quot;) to str" %}

<h3 class="no_toc">Symptom</h3>

The template editor or the log shows the error `TypeError: can only concatenate str (not "int") to str`. Other math operations give a similar message. For example, `"22.5" - 5` gives `TypeError: unsupported operand type(s) for -: 'str' and 'int'`.

#### Description

You're trying to do math between a piece of text and a number. This happens most often with entity states, because every state is stored as text. `"22.5" + 5` doesn't work.

#### Resolution

Convert the text to a number first with `| float(0)` or `| int(0)`:

{% example %}
template: |
  {{ states('sensor.temperature') | float(0) + 5 }}
output: "27.5"
{% endexample %}

The `0` is a fallback used when the conversion fails (for example, when the sensor is `unavailable`). For details, refer to [Types and conversion](/docs/templating/types/).

{% enddetails %}

<a id="typeerror-not-supported-between-instances-of-str-and-int"></a>

{% details "TypeError: '>' not supported between instances of 'str' and 'int'" %}

<h3 class="no_toc">Symptom</h3>

The template editor or the log shows the error `TypeError: '>' not supported between instances of 'str' and 'int'`. The message shows the operator you used, such as `<` or `>=`.

#### Description

You compared a piece of text with a number, for example, `states('sensor.temperature') > 20`. Entity states are stored as text, so the comparison doesn't work.

#### Resolution

Convert the text to a number first with `| float(0)` or `| int(0)`:

{% example %}
template: |
  {{ states('sensor.temperature') | float(0) > 20 }}
output: "True"
{% endexample %}

{% enddetails %}

<a id="valueerror-template-error-float-got-invalid-input-unavailable-when-rendering-template--but-no-default-was-specified"></a>

{% details "ValueError: Template error: float got invalid input 'unavailable' when rendering template '...' but no default was specified" %}

<h3 class="no_toc">Symptom</h3>

The template editor or the log shows the error `ValueError: Template error: float got invalid input 'unavailable' when rendering template '...' but no default was specified`. The same message comes from other functions, with their name instead of `float`. These include [`int`](/template-functions/int/), [`as_timestamp`](/template-functions/as_timestamp/), [`strptime`](/template-functions/strptime/), [`round`](/template-functions/round/), and the `timestamp_*` functions.

#### Description

A conversion function got a value it can't convert, and you didn't give it a default to use instead. The value in quotes shows what it got. Common values are `unavailable` or `unknown` from an entity that isn't ready, and `None` from an attribute that doesn't exist.

#### Resolution

Give the function a default value to use instead, for example, `| float(0)` for [`float`](/template-functions/float/):

{% example %}
template: |
  {{ state_attr('light.kitchen', 'brightness') | float(0) }}
output: "0"
{% endexample %}

If the value is the state of an entity, you can also check first whether the entity has a valid state, using [`has_value`](/template-functions/has_value/). `has_value` only checks entity states, not attributes.

[`as_datetime`](/template-functions/as_datetime/) only gives this error for a value that isn't text, such as `None`. If it gets text it can't read as a date, such as `unavailable`, it returns `None` instead of an error.

{% enddetails %}

<a id="typeerror-object-of-type-generator-has-no-len"></a>

{% details "TypeError: object of type 'generator' has no len()" %}

<h3 class="no_toc">Symptom</h3>

The template editor or the log shows the error `TypeError: object of type 'generator' has no len()`.

#### Description

You tried to count or measure an iterable directly. Filters like [`map`](/template-functions/map/), [`select`](/template-functions/select/), [`reject`](/template-functions/reject/), [`selectattr`](/template-functions/selectattr/), and [`rejectattr`](/template-functions/rejectattr/) return iterables, not lists. You can only count them after you turn them into a list.

#### Resolution

Add `| list` to turn the iterable into a list first:

{% example %}
template: |
  {{ states.light | selectattr('state', 'eq', 'on') | list | count }}
output: "3"
{% endexample %}

For details, refer to [Iterables look like lists, but are not](/docs/templating/types/#iterables-look-like-lists-but-are-not).

{% enddetails %}

## Syntax errors

<a id="templatesyntaxerror-expected-token-end-of-statement-block-got-x"></a>

{% details "TemplateSyntaxError: expected token 'end of statement block', got 'X'" %}

<h3 class="no_toc">Symptom</h3>

The template editor or the log shows the error `TemplateSyntaxError: expected token 'end of statement block', got 'X'`. Inside `{{ ... }}`, the message says `'end of print statement'` instead.

#### Description

There is a typo or an unexpected character inside a `{% ... %}` or `{{ ... }}` block. Something is written that the template engine doesn't recognize. The message shows what it found instead of `X`.

#### Resolution

- Check for missing commas, brackets, or quotes.
- Verify that operators are spelled right (`==`, `!=`, `and`, `or`, `not`, `in`).
- Make sure you used `is not`, not `not is`.

{% enddetails %}

<a id="templatesyntaxerror-unexpected-end-of-template"></a>

{% details "TemplateSyntaxError: Unexpected end of template" %}

<h3 class="no_toc">Symptom</h3>

The template editor or the log shows the error `TemplateSyntaxError: Unexpected end of template`. The rest of the message names the block that isn't closed, for example, `The innermost block that needs to be closed is 'if'`.

#### Description

A `{% if %}`, `{% for %}`, `{% set %}`, or `{% macro %}` block was opened but not closed. Every block tag needs a matching `{% endif %}`, `{% endfor %}`, `{% endset %}`, or `{% endmacro %}`.

#### Resolution

- Count the opening and closing tags. If you have two `{% if %}`, you need two `{% endif %}`.
- Indent the template in the editor so you can see the structure.

{% enddetails %}

<a id="templatesyntaxerror-tag-name-expected"></a>

{% details "TemplateSyntaxError: tag name expected" %}

<h3 class="no_toc">Symptom</h3>

The template editor or the log shows the error `TemplateSyntaxError: tag name expected`.

#### Description

You have a `{% %}` block with nothing inside, or with something the engine can't parse as a statement.

#### Resolution

Remove empty `{% %}` markers. If you intended a comment, use `{# ... #}` instead.

{% enddetails %}

<a id="templateassertionerror-no-test-named-foo"></a>

{% details "TemplateAssertionError: No test named 'foo'" %}

<h3 class="no_toc">Symptom</h3>

The template editor or the log shows the error `TemplateAssertionError: No test named 'foo'.` If the test is inside an `{% if %}` block or an inline `if`, the message is `TemplateRuntimeError: No test named 'foo' found.` instead.

#### Description

After `is`, you used a test name the engine doesn't know. Test names are lowercase. For example, `is none` works, but `is None` gives the error `No test named 'None'`.

Inside an `{% if %}` block or an inline `if`, the template engine only checks the test name when that part of the template runs. If it doesn't run, there's no error until the condition changes.

#### Resolution

Check the test name against the [template functions reference](/template-functions/#comparison). Common tests are [`defined`](/template-functions/defined/), [`none`](/template-functions/none/), `number`, [`string`](/template-functions/string/), `boolean`, [`iterable`](/template-functions/iterable/), [`mapping`](/template-functions/mapping/), [`even`](/template-functions/even/), [`odd`](/template-functions/odd/), [`eq`](/template-functions/eq/), [`gt`](/template-functions/gt/), [`lt`](/template-functions/lt/), and `in`. Aliases like `equalto`, `greaterthan`, and `lessthan` also work.

{% enddetails %}

<a id="templateassertionerror-no-filter-named-foo"></a>

{% details "TemplateAssertionError: No filter named 'foo'" %}

<h3 class="no_toc">Symptom</h3>

The template editor or the log shows the error `TemplateAssertionError: No filter named 'foo'.` If the filter is inside an `{% if %}` block or an inline `if`, the message is `TemplateRuntimeError: No filter named 'foo' found.` instead.

#### Description

After `|`, you used a filter name the engine doesn't know. Usually, the name is misspelled.

Inside an `{% if %}` block or an inline `if`, the template engine only checks the filter name when that part of the template runs. If it doesn't run, there's no error until the condition changes.

#### Resolution

Check the filter name against the [template functions reference](/template-functions/).

{% enddetails %}

## Other template errors

<a id="templateerror-invalid-entity-id-sensortemperature"></a>

{% details "TemplateError: Invalid entity ID 'sensor.Temperature'" %}

<h3 class="no_toc">Symptom</h3>

The template editor or the log shows the error `TemplateError: Invalid entity ID 'sensor.Temperature'`.

#### Description

The entity ID in the template isn't a valid entity ID, and no entity matches it. For example, it contains capital letters or spaces. Entity IDs only use lowercase letters, numbers, and underscores, with one period between the domain and the name. Neither part can start or end with an underscore, and the entity ID can't contain two underscores in a row.

You only get this error with dot or bracket notation, such as `states.sensor.Temperature` or `states['sensor.Temperature']`, and with [`state_translated`](/template-functions/state_translated/) and [`state_attr_translated`](/template-functions/state_attr_translated/). Functions like [`states`](/template-functions/states/), [`is_state`](/template-functions/is_state/), and [`state_attr`](/template-functions/state_attr/) don't check the entity ID. If they can't find the entity, they return `unknown`, `false`, or `none`.

#### Resolution

Copy the entity ID from {% my tools_states title="**Settings** > **Tools** > **States**" %}.

{% enddetails %}

<a id="templateerror-use-of-states-is-not-supported-in-limited-templates"></a>

{% details "TemplateError: Use of 'states' is not supported in limited templates" %}

<h3 class="no_toc">Symptom</h3>

The log shows the error `TemplateError: Use of 'states' is not supported in limited templates`. The name in quotes shows which function you used.

#### Description

The template runs in a place that only supports [limited templates](/docs/templating/limited-templates/), such as `trigger_variables`, some trigger options, or the `enabled` option of a trigger, condition, or action. For the functions that aren't available there, refer to [What limited templates can't use](/docs/templating/limited-templates/#what-limited-templates-cant-use). For what else happens, depending on the field, refer to [How you notice a limited template error](/docs/templating/limited-templates/#how-you-notice-a-limited-template-error).

People most often run into this with `now()` in `trigger_variables`.

#### Resolution

Move the part that uses these functions to a place that supports full templates. For example, if you only need the value in the conditions or actions of an automation, use `variables` instead of `trigger_variables`. `variables` supports full templates, but is only evaluated after the automation starts. That's why the trigger options themselves can't use it.

{% enddetails %}

<a id="securityerror-access-to-attribute-append-of-list-object-is-unsafe"></a>

{% details "SecurityError: access to attribute 'append' of 'list' object is unsafe" %}

<h3 class="no_toc">Symptom</h3>

The template editor or the log shows the error `SecurityError: access to attribute 'append' of 'list' object is unsafe.` Or, the result is empty, and the template editor shows the same kind of message as a warning.

#### Description

Templates run in a protected environment that doesn't allow changing lists or dictionaries, or accessing internal attributes. Calling `append`, `update`, or `pop` causes this error right away. If you only read an attribute that starts with `_`, you get the warning. The error only appears when the value is called or used further.

#### Resolution

Build a new list instead of changing the existing one. For example, use `{% set items = items + ['new'] %}` instead of `{{ items.append('new') }}`. To collect values in a loop, use a `namespace`:

{% example %}
template: |
  {% set ns = namespace(items=[]) %}
  {% for name in ['kitchen', 'hall'] %}
    {% set ns.items = ns.items + [name] %}
  {% endfor %}
  {{ ns.items }}
output: "['kitchen', 'hall']"
{% endexample %}

For other ways to build a new list, such as sorting or removing items, refer to [Methods that change a list](/docs/templating/python-methods/#methods-that-change-a-list).

{% enddetails %}

<a id="templateerror-template-output-exceeded-maximum-size-of-262144-characters"></a>

{% details "TemplateError: Template output exceeded maximum size of 262144 characters" %}

<h3 class="no_toc">Symptom</h3>

The template editor or the log shows the error `TemplateError: Template output exceeded maximum size of 262144 characters`.

#### Description

The template produced more than 262,144 characters of text. Home Assistant limits how large the result of a template can be.

#### Resolution

Return less data. For example, filter a list down to the entities you need, or return a count instead of the full list.

{% enddetails %}

## YAML errors

<a id="invalid-key-in-yaml"></a>
<a id="yaml-error-could-not-find-expected-"></a>

{% details "invalid key: &quot;{&quot;states('sensor.temperature')&quot;: None}&quot;" %}

<h3 class="no_toc">Symptom</h3>

When Home Assistant loads your YAML configuration, it shows the error `invalid key: "{"states('sensor.temperature')": None}"`, with the file and line. If the template starts with `{%`, the message is `found character '%' that cannot start any token` instead.

#### Description

Your YAML file contains a template with unquoted braces. If the value starts with `{{`, YAML reads the braces as a mapping, and the template ends up as an invalid key.

#### Resolution

Wrap the single-line template in quotes, or use a multi-line block scalar:

```yaml
# Correct: quoted
value_template: "{{ states('sensor.temperature') }}"

# Correct: multi-line
value_template: >
  {{ states('sensor.temperature') }}
```

For the full set of quoting rules, refer to [Templates in YAML](/docs/templating/yaml/).

{% enddetails %}

## Next steps

- For a systematic approach to narrowing down any template problem, refer to [Debugging templates](/docs/templating/debugging/).
- If the error came from a quoting or indentation issue, refer to [Templates in YAML](/docs/templating/yaml/).
- If the error involves state values being text, refer to [Working with states](/docs/templating/states/).

## Still stuck?

The Home Assistant community is quick to help: join [Discord](https://discord.gg/home-assistant) for real-time chat, post on the [community forum](https://community.home-assistant.io) with your template and the exact error message, or share on [our subreddit](https://reddit.com/r/homeassistant).

{% tip %}
AI assistants like ChatGPT or Claude can also explain or fix templates when you describe what you want in plain language. Paste in your template and the error message.
{% endtip %}
