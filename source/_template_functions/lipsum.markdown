---
title: "Generate placeholder text: lipsum"
function_name: "lipsum"
description: "Generates lorem ipsum placeholder text. Useful for testing and prototyping templates."
available_as:
  - function
category: functional
return_type: string
limited: true
since: "0.7"
related_functions:
  - random
---

The `lipsum` template function generates lorem ipsum placeholder text. By default, it produces 5 paragraphs of HTML-formatted text with sentences of varying length. You can control the number of paragraphs, whether to output HTML or plain text, and the minimum and maximum number of words per sentence.

This is mainly useful for testing and prototyping. If you are developing a custom dashboard card or testing how a notification handles long text, `lipsum` provides a quick way to generate filler content without writing it yourself.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ lipsum(1, html=false, min=5, max=10) }}'
type: string
output: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
lipsum(
    n: int = 5,
    html: bool = true,
    min: int = 20,
    max: int = 100,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
n:
  description: >
    The number of paragraphs to generate. Defaults to `5`.
  required: false
  default: "5"
  type: integer
html:
  description: >
    If `true`, wraps each paragraph in `<p>` tags. If `false`, separates paragraphs with double newlines. Defaults to `true`.
  required: false
  default: "true"
  type: boolean
min:
  description: >
    The minimum number of words per sentence. Defaults to `20`.
  required: false
  default: "20"
  type: integer
max:
  description: >
    The maximum number of words per sentence. Defaults to `100`.
  required: false
  default: "100"
  type: integer
{% endfunction_parameters %}

## Good to know

- HTML output is the default and wraps paragraphs in `<p>` tags. Pass `html=false` for plain text.
- The sentence length range is 20-100 words by default, which is longer than typical sentences.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Generate plain text paragraphs

Produce two paragraphs of plain text without HTML tags.

{% example %}
template: '{{ lipsum(2, html=false, min=5, max=15) }}'
type: string
output: |
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.

  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
