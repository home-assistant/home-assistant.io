---
title: "Templates in YAML"
description: "Quoting rules, multi-line strings, and escaping templates inside YAML."
related:
  - docs: /docs/templating/syntax/
    title: Template syntax
  - docs: /docs/templating/debugging/
    title: Debugging templates
  - docs: /docs/configuration/yaml/
    title: YAML configuration
---

Most of the time, templates live inside YAML files. YAML has its own rules about quoting and multi-line text, and those rules interact with templates in ways that trip everyone up at least once. This page covers the traps and the patterns that get around them.

Don't feel bad when YAML bites you. It bites everyone. Come back to this page whenever Home Assistant refuses to load your config and the error message makes no sense.

## The quoting rule

A single-line template _must_ be wrapped in quotes. Either single (`'`) or double (`"`) will do.

{% example %}
automation: |
  # Correct: template is quoted
  value_template: "{{ states('sensor.temp') | float > 20 }}"
output: "True (when the sensor reports a value above 20)"
{% endexample %}

Without the quotes, YAML tries to interpret `{{` as the start of a flow-style mapping and fails. The error message you get in that case can be confusing, so if something refuses to load, check your quotes first.

There is no difference in behavior between single and double quotes as far as Home Assistant is concerned. Pick one style and stick with it.

## Quotes inside the template

If the template itself contains quotes, wrap it in the other kind to avoid clashes.

{% example %}
automation: |
  # Template contains single quotes, so wrap in double quotes
  value_template: "{{ is_state('light.kitchen', 'on') }}"

  # Template contains double quotes, so wrap in single quotes
  value_template: '{{ states["sensor.temp"] }}'
output: "Both templates evaluate correctly without quote conflicts"
{% endexample %}

If you need both kinds of quotes in the same template, switch to a multi-line string (see below).

## Multi-line templates

When a template grows beyond a single line, quoting gets painful. YAML has two styles for writing text across multiple lines without needing quotes at all: the `>` style and the `|` style. Pick whichever matches what you want the output to look like.

**The `>` style (folded)** joins your lines back into one, with a single space between them. Use this when your template is really one long piece of code that you broke into multiple lines to fit on the page nicely.

{% example %}
automation: |
  value_template: >
    {{
      states('sensor.temp') | float(0) > 20
      and states('sensor.humidity') | float(0) < 60
    }}
output: "True (when both conditions are true)"
{% endexample %}

**The `|` style (literal)** keeps every line break exactly as you wrote it. Use this when your template output needs the line breaks preserved, like a multi-line notification message.

{% example %}
automation: |
  message: |
    Today's summary:
    Temperature: {{ states('sensor.temp') }}°C
    Humidity: {{ states('sensor.humidity') }}%
output: |
  Today's summary:
  Temperature: 22.5°C
  Humidity: 54%
{% endexample %}

### The `>-` and `|-` variants

A trailing `-` strips the final newline. You will see this used often for `value_template` where you do not want a trailing blank line.

{% example %}
automation: |
  value_template: >-
    {% if states('sensor.outdoor_temp') | float(0) < 0 %}
      freezing
    {% else %}
      not freezing
    {% endif %}
output: "not freezing"
{% endexample %}

## Indentation inside multi-line blocks

Inside a `|` or `>` block, YAML figures out the indentation from the first non-empty line. Every following line must be indented at least as far. If you mix indents, YAML will cut the block off at the less-indented line, and the rest will look like a new key to YAML.

{% example %}
automation: |
  # Wrong: second line is less indented than the first
  message: |
          Status Report
    Temperature: 22
{% endexample %}

{% example %}
automation: |
  # Correct: all lines share the same base indent
  message: |
    Status Report
    Temperature: 22
output: |
  Status Report
  Temperature: 22
{% endexample %}

If you need more indentation on specific lines (for example, centered text), add it with the template itself rather than with extra YAML indentation.

## Common mistakes

- **Unquoted single-line template**. YAML will complain about the `{{`. Add quotes.
- **Starting with a quote but forgetting to close it**. A common slip with long templates. Switch to a `>-` multi-line block when in doubt.
- **Using `>` when you need line breaks preserved**. The output becomes one long line. Use `|` instead.
- **Inconsistent indentation inside `|` or `>` blocks**. YAML truncates the block at the lowest indent.

When a template refuses to work, the [Debugging templates](/docs/templating/debugging/) page walks through how to narrow the problem down.

## Next steps

- For the core language itself, see [Template syntax](/docs/templating/syntax/).
- When a template does not behave, the [Debugging templates](/docs/templating/debugging/) page walks through the process.
- For ready-made examples you can adapt, see [Common template patterns](/docs/templating/patterns/).

{% include template_functions/stuck.md %}
