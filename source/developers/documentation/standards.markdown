---
layout: page
title: "Documentation Standards"
description: "Standards for the creation and maintenance of documentation for Home Assistant."
date: 2017-09-16 03:51
sidebar: true
comments: false
sharing: true
footer: true
---

To ensure that the documentation for Home Assistant is consistent and easy to follow for both novice and expert users, we ask that you follow a very strict set of standards for developing the documentation.

## {% linkable_title General Documentation %}

* The language of the documentation should be American-English.
* Don't put two spaces after a period and avoid the "Oxford comma".
* Be objective and not gender favoring, polarizing, race related or religion inconsiderate.
* The case of brand names, services, protocols, components, and platforms must match its respective counterpart. e.g., "Z-Wave" **not** "Zwave", "Z-wave", "Z Wave" or "ZWave". Also, "Input Select" **not** "input select" or "Input select".
* All headings should use the {% raw %}`{% linkable_title %}`{% endraw %} tag.

## {% linkable_title Component and Platform Pages %}

* The **Configuration Variables** section must use the {% raw %}`{% configuration %}`{% endraw %} tag.
* Configuration variables must document the requirement status.
* Configuration variables must document the default value, if any.
* Configuration variables must document the accepted value types.
  * For configuration variables that accept multiple types, separate the types with a comma (i.e. `string, int`).
* Use YAML sequence syntax in the sample code if it is supported.
* All examples should be formatted to be included in `configuration.yaml` unless explicitly stated.
  * Use capital letters and `_` to indicate that the value needs to be replaced. E.g., `api_key: YOUR_API_KEY` or `api_key: REPLACE_ME`.
  * If you know that the API key or value contains [control characters](https://en.wikipedia.org/wiki/YAML#Syntax), e.g., `#`, `[`, `?`, etc., wrap it in quotes and add a note.
* Component and platform names should be a link to their respective documentation pages.

## {% linkable_title Templates %}

* All examples containing Jinja2 templates should be wrapped **outside** of the code markdown with the {% raw %}`{% raw %}`{% endraw %} tag.
* Do not use `states.switch.source.state` in templates. Instead use `states()` and `is_state()`.
* Use double quotes (`"`) for ([more information](#single-vs-double-quotation-marks)):
  * `friendly_name`
  * Single-line templates:
    * `value_template`
    * `level_template`
    * `icon_template`
    * Children of `data_template`
* Use single quotes (`'`) for ([more information](#single-vs-double-quotation-marks):
  * Strings inside of templates:
    * States
    * Entity IDs
  * `unit_of_measurement`
* No whitespace around pipe character (`|`) for Jinja2 filters.
* Single whitespace after Jinja2 opening delimiters ({% raw %}`{{`{% endraw %}).
* Single whitespace before Jinja2 closing delimiters ({% raw %}`}}`{% endraw %}).
* Do not quote values for:
  * `device_class`
  * `platform`
  * `condition`
  * `service`

## {% linkable_title Renaming Pages %}

It can happen that a component or platform is renamed, in this case the documentation needs to be updated as well. If you rename a page, add  `redirect_from:` to the file header and let it point to the old location/name of the page. Please consider to add details, like release number or old component/platform name, to the page in a [note](/developers/documentation/create_page/#html).

```text
---
...
redirect_from: /getting-started/android/
---
```

Adding a redirect also applies if you move content around in the [documentation](/docs/).

## {% linkable_title Single vs. Double Quotation Marks %}

Use single quotes (`'`) for strings inside of a template. It is more obvious to escape a single quote when necessary (i.e. `name` is a possessive noun), because the single quotes that wrap the string are closer in position to the apostrophe inside the string. Use double quotes (`"`) outside of a template (unless it is a multi-line template, in which case outside quotes are not required).

### {% linkable_title Examples %}

#### {% linkable_title Double Quotes Outside, Single Quotes Inside (Valid) %}

{% raw %}
```yaml
automation:
  ...
  action:
    - service: notify.notify
      data_template:
        message: "{% if trigger.to_state.name == 'Dale\'s Bedroom' %}Someone's in your base, killing your noobs!{% else %}It's just another door.{% endif %}"
```
{% endraw %}

#### {% linkable_title Single Quotes Outside, Double Quotes Inside (Invalid) %}

{% raw %}
```yaml
automation:
  ...
  action:
    - service: notify.notify
      data_template:
        message: '{% if trigger.to_state.name == "Dale's Bedroom" %}Someone's in your base, killing your noobs!{% else %}It's just another door.{% endif %}'
```
{% endraw %}

#### {% linkable_title Multi-Line Template (Valid) %}

{% raw %}
```yaml
automation:
  ...
  action:
    - service: notify.notify
      data_template:
        message: >-
          {% if trigger.to_state.name == 'Dale\'s Bedroom' %}
            Someone's in your base, killing your noobs!
          {% else %}
            It's just another door.
          {% endif %}
```
{% endraw %}
