---
title: "Truncate text to a length: truncate"
function_name: "truncate"
description: "Truncates a string to a given length, appending an ellipsis if it was shortened."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - wordwrap
  - trim
---

The `truncate` filter shortens a string to a specified maximum length and appends an end marker (by default `...`) if the string was truncated. By default, it tries to break at a word boundary so words are not cut in half.
This is useful when you need to limit the length of text for display in notifications, dashboard cards, or other contexts with limited space. For example, a {% term sensor %} that provides a long description or error message can be truncated to a manageable length so it does not overflow your display.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "This is a very long string that should be truncated" | truncate(20) }}'
type: string
output: "This is a very..."
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
truncate(
    value: str,
    length: int = 255,
    killwords: bool = False,
    end: str = "...",
    leeway: int = 5,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string to truncate.
  required: true
  type: string
length:
  description: >
    The maximum length of the output string, including the end marker. Defaults to `255`.
  required: false
  default: "255"
  type: integer
killwords:
  description: >
    If `true`, words may be cut in half at the exact length. If `false` (the default), the string is truncated at the last word boundary before the length limit.
  required: false
  default: "false"
  type: boolean
end:
  description: >
    The string to append when the text is truncated. Defaults to `...`.
  required: false
  default: '"..."'
  type: string
leeway:
  description: >
    If the string is only this many characters longer than the length, it is not truncated. Defaults to `5`.
  required: false
  default: "5"
  type: integer
{% endfunction_parameters %}

## Cutting at exact length

Set `killwords` to `true` to truncate at the exact character position, even if it is in the middle of a word.

{% example %}
template: '{{ "Hello beautiful world" | truncate(12, true) }}'
title: Cut at exact length
type: string
output: "Hello bea..."
{% endexample %}

## Custom end marker

Use a different end marker instead of the default ellipsis.

{% example %}
template: |
  {{ "A very long status message here" | truncate(20, end=" [more]") }}
title: Custom end marker
type: string
output: "A very long [more]"
{% endexample %}

## Good to know

- The `length` limit includes the end marker. Truncating to 20 characters with the default `...` gives you 17 characters of text plus the three-dot ending.
- Strings within `leeway` characters of the limit are returned unchanged. Set `leeway=0` if you want a strict cutoff every time.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Shorten a notification message

Truncate a long sensor message so it fits in a mobile notification.

{% example %}
template: '{{ states("sensor.error_log") | truncate(80) }}'
type: string
output: |
  Connection timed out while attempting to reach the remote server.
  Please check...
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
