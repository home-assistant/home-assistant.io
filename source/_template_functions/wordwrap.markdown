---
title: "Wrap text at a line width: wordwrap"
function_name: "wordwrap"
description: "Wraps text at a given line width by inserting line breaks."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - truncate
  - indent
  - wordcount
---

The `wordwrap` filter inserts line breaks into a string so that each line is no longer than the specified width. By default, it wraps at word boundaries so words are not split.
This is useful when you need to format long text for display in contexts that do not automatically wrap, such as fixed-width notification templates or text-based displays. For example, you might wrap a long status message to a specific width for a text-only notification.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "The quick brown fox jumps over the lazy dog" | wordwrap(20) }}'
type: string
output: "The quick brown fox\njumps over the lazy\ndog"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
wordwrap(
    value: str,
    width: int = 79,
    break_long_words: bool = True,
    break_on_hyphens: bool = True,
    wrapstring: str | None = None,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string to wrap.
  required: true
  type: string
width:
  description: >
    The maximum number of characters per line. Defaults to `79`.
  required: false
  default: "79"
  type: integer
break_long_words:
  description: >
    If `true`, words longer than the width will be broken. If `false`, long words are kept intact and may exceed the width. Defaults to `true`.
  required: false
  default: "true"
  type: boolean
break_on_hyphens:
  description: >
    If `true`, wrapping can occur at hyphens in compound words. Defaults to `true`.
  required: false
  default: "true"
  type: boolean
wrapstring:
  description: >
    The string to use for line breaks. Defaults to a newline character.
  required: false
  type: string
{% endfunction_parameters %}

## Using a custom wrap string

Use an HTML `<br>` tag instead of a newline for wrapping in HTML contexts.

{% example %}
template: |
  {{
    "A long message that needs wrapping for HTML display"
    | wordwrap(25, wrapstring="<br>")
  }}
title: Wrap with HTML line breaks
type: string
output: "A long message that needs<br>wrapping for HTML<br>display"
{% endexample %}

## Good to know

- Existing newlines in the input are preserved and treated as paragraph breaks.
- With `break_long_words` set to `false`, words longer than the width stay intact on their own line, potentially exceeding the target width.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Format a notification for a text display

Wrap a message so it fits within a fixed-width display.

{% example %}
template: |
  {{ states("sensor.daily_summary") | wordwrap(40) }}
type: string
output: |-
  Today was sunny with a high of 28
  degrees. Expected to cool down
  overnight.
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
