---
title: "Force-escape HTML characters: forceescape"
function_name: "forceescape"
description: "Escapes HTML special characters, even on strings already marked as safe."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - escape
  - safe
  - striptags
---

The `forceescape` filter escapes HTML special characters (`&`, `<`, `>`, `"`, `'`) just like the [`escape`](/template-functions/escape/) filter, but it enforces escaping even on strings that have already been marked as safe. Normally, once a string is marked safe with the [`safe`](/template-functions/safe/) filter, [`escape`](/template-functions/escape/) will not escape it again. The `forceescape` filter overrides that behavior.
This is useful when you need to guarantee that a value is escaped regardless of how it was produced earlier in a template chain. For example, if a value was marked as safe somewhere upstream but you want to display it as literal text rather than rendered HTML, `forceescape` ensures it gets escaped.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "<b>bold</b>" | safe | forceescape }}'
type: string
output: "&lt;b&gt;bold&lt;/b&gt;"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
forceescape(
    value: str,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string to escape. All HTML special characters are converted to their entity equivalents, even if the string was previously marked as safe.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Use this instead of [`escape`](/template-functions/escape/) when an upstream [`safe`](/template-functions/safe/) call has already marked a string as trusted HTML.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Escape a pre-marked safe string

Show the raw HTML markup of a value that was previously marked as safe.

{% example %}
template: |
  {% set html_content = "<em>Important</em>" | safe %}
  {{ html_content | forceescape }}
type: string
output: "&lt;em&gt;Important&lt;/em&gt;"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
