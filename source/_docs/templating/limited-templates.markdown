---
title: "Limited templates"
description: "Learn what limited templates are, which fields use them, what they can and can't use, and which variables they can use."
related:
  - docs: /docs/templating/where-to-use/
    title: Where to use templates
  - docs: /docs/automation/trigger/#trigger-variables
    title: Trigger variables
  - docs: /docs/templating/errors/
    title: Troubleshooting template errors
  - docs: /template-functions/
    title: Template functions
---

A limited template is a template that can only use part of what templates normally can. A limited template can't read the state of your home or the current time.

Limited templates are used in fields that set up an automation, rather than run the automation, such as the MQTT topic an automation listens to, the time an automation triggers at, or whether a trigger is turned on. Home Assistant needs the values of setup fields before anything can happen. So Home Assistant works out most limited templates once, when the automation is set up, and keeps the result until you reload the automation. Limited templates are allowed in setup fields so that a blueprint can build setup values from your inputs, such as an MQTT topic that contains a device name you picked.

Limited templates can't read your home, because a limited template would only see the state of your home at the moment the automation is set up. The automation wouldn't follow later changes, and Home Assistant wouldn't warn you. To make an automation depend on the current state of your home, use a [condition](/docs/automation/condition/) instead.

## What limited templates can use

Limited templates support most of what templates can do. You can use:

- Math, such as `+`, `round`, and `max`
- Text and list filters, such as `replace`, `lower`, and `join`
- `if` statements and `for` loops
- Values that are known in advance, such as blueprint inputs and [trigger variables](/docs/automation/trigger/#trigger-variables)
- All [template functions](/template-functions/) that aren't listed in [What limited templates can't use](#what-limited-templates-cant-use)

## What limited templates can't use

Limited templates can't use functions that read the state of your home or the current time, and a few other functions. The following functions aren't available in limited templates:

- Functions that read the state of entities, such as `states`, `is_state`, `state_attr`, `has_value`, and `expand`
- Date and time functions, such as `now`, `utcnow`, `today_at`, `relative_time`, `time_since`, `time_until`, and `timedelta_string`
- Some area, floor, label, device, and entity functions, such as `area_name`, `device_attr`, `floor_name`, `label_name`, and `entity_name`
- The location functions `distance` and `closest`
- The hash and encoding functions `md5`, `sha1`, `sha256`, `sha512`, `base64_encode`, and `base64_decode`

Each [template function](/template-functions/) page shows whether the function is available in limited templates. If a limited template calls a function that isn't available, such as `states('light.kitchen')`, the limited template fails with the error `Use of 'states' is not supported in limited templates`. For how to fix the error, refer to [Use of 'states' is not supported in limited templates](/docs/templating/errors/#templateerror-use-of-states-is-not-supported-in-limited-templates).

If a limited template uses `states` without calling it, the result is different. For example, `states.light.kitchen.state` fails with the error `'function object' has no attribute 'light'`. And `states.light | list` doesn't fail at all: the result is an empty list, and Home Assistant only logs a warning.

## Fields that use limited templates

Only a few fields use limited templates. Other fields that accept templates support all template features. The following fields use limited templates:

- In automations, the [`trigger_variables`](/docs/automation/trigger/#trigger-variables) section, and the `enabled` option of triggers
- In automations and scripts, the `enabled` option of conditions and of other steps
- The following trigger options:
  - [Event trigger](/triggers/event/): `event_type`, `event_data`, and `context`
  - [MQTT trigger](/triggers/mqtt/): `topic`
  - [Time trigger](/triggers/time/): `at`
  - [Webhook trigger](/docs/automation/trigger/#webhook-trigger): `webhook_id`

## Variables in limited templates

Which variables a limited template can use depends on the field that contains the limited template.

### In trigger options, `trigger_variables`, and the `enabled` option of triggers

Limited templates in trigger options, in `trigger_variables`, and in the `enabled` option of triggers can use:

- The values from `trigger_variables`
- [`this`](/docs/automation/templating/#available-state-data)

The `trigger` variable isn't available, because nothing has triggered yet.

### In the triggers of a Wait for a trigger step

Home Assistant works out the limited templates in the triggers of a **Wait for a trigger** step each time the wait starts. Limited templates in the triggers of a **Wait for a trigger** step can use:

- All variables defined before the wait, including `trigger`

### In the `enabled` option of conditions and other steps

Limited templates in the `enabled` option of conditions and other steps can't use any variables. Instead of a variable, use one of the following:

- A fixed value
- A blueprint input
