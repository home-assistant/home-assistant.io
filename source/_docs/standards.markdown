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

To ensure that the documentation for Home Assistant is consistent and easy to
follow for both novice and expert users, we ask that you follow a very strict
set of standards for developing the documentation.

## {% linkable_title General Documentation %}

* The case of brand names, services, protocols, components, and platforms must match its respective counterpart.
  * Z-Wave (**not** Zwave, Z-wave, Z Wave, or ZWave)
  * Zigbee (**not** ZigBee)
  * iCloud (**not** Icloud, icloud, or ICloud)
  * Pushover (**not** PushOver, pushover, or push over)
  * OwnTracks (**not** Owntracks, ownTracks, owntracks, or own tracks)
  * Input Select (**not** input select or Input select)
* All headings should use the {% raw %}`{% linkable_title %}`{% endraw %} tag.

## {% linkable_title Component and Platform Pages %}

* The ***Configuration Variables*** section must use the {% raw %}`{% configuration %}`{% endraw %} tag.
* Configuration variables must document the requirement status.
* Configuration variables must document the default value, if any.
* Configuration variables must document the accepted value types.
  * Use `[string, int]` for configuration variables that accept multiple types.
* Use YAML sequence syntax in the sample code if it is supported.
* All examples should be formatted to be included in `configuration.yaml` unless explicitly stated.
* All examples containing Jinja2 templates should be wrapped ***outside*** of the code markdown with {% raw %}`{% raw %}`{% endraw %} tag.
* Component and platform names should be a link to their respective documentation pages.
* Do not use `states.switch.source.state` in templates. Instead use `states()` and `is_state()`.
* Use double quotes (`"`) for:
  * `friendly_name`
  * Single-line templates:
    * `value_template`
    * `level_template`
    * `icon_template`
    * Children of `data_template`
* Use single quotes (`'`) for:
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
