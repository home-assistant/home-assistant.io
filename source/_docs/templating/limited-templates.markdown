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

## When to use limited templates

You don't choose to write a limited template. You write a limited template when you put a template in a field that sets up an automation, such as the MQTT topic an automation listens to, the time an automation triggers at, or whether a trigger is turned on.

The automation editor doesn't mark which fields only accept limited templates. The documentation of each trigger says which options are limited, and [Fields that use limited templates](#fields-that-use-limited-templates) lists all of them. If a limited template uses a function that isn't available, Home Assistant logs an error. For what else happens, depending on the field, refer to [How you notice a limited template error](#how-you-notice-a-limited-template-error).

Most limited templates are in blueprints. A blueprint can use a limited template to build a setup value from your inputs, such as an MQTT topic that contains a device name you picked.

To make an automation depend on the current state of your home, don't use a limited template. Use a [condition](/docs/automation/condition/) instead.

## Why some fields only accept limited templates

Home Assistant needs the values of setup fields before anything can happen. So Home Assistant works out most limited templates once, when the automation is set up, and keeps the result until the triggers of the automation are set up again, for example, when you reload the automation or turn the automation off and on.

If a limited template could read your home, the limited template would only see the state of your home at the moment the automation is set up. The automation wouldn't follow later changes, and Home Assistant wouldn't warn you. That's why limited templates can't read the state of your home or the current time.

## What limited templates can use

Limited templates support most of what templates can do. You can use:

- Math, such as `+`, `round`, and `max`
- Text and list filters, such as `replace`, `lower`, and `join`
- `if` statements and `for` loops
- Values that are known in advance, such as blueprint inputs and [trigger variables](/docs/automation/trigger/#trigger-variables)
- Most other [template functions](/template-functions/)

## What limited templates can't use

Limited templates can't use functions that read the state of your home or the current time, and a few other functions. The following functions aren't available in limited templates:

- Functions that read the state of entities, such as `states`, `is_state`, `state_attr`, `has_value`, and `expand`
- Date and time functions, such as `now`, `utcnow`, `today_at`, `relative_time`, `time_since`, `time_until`, and `timedelta_string`
- Some area, floor, label, device, and entity functions, such as `area_name`, `device_attr`, `floor_name`, `label_name`, and `entity_name`
- The location functions `distance` and `closest`
- The hash and encoding functions `md5`, `sha1`, `sha256`, `sha512`, `base64_encode`, and `base64_decode`

Each [template function](/template-functions/) page shows whether the function is available in limited templates.

## Fields that use limited templates

Only a few fields use limited templates. Other fields that accept templates support all template features. The following fields use limited templates:

- In automations, the [`trigger_variables`](/docs/automation/trigger/#trigger-variables) section, and the `enabled` option of triggers
- In automations and scripts, the `enabled` option of conditions and of other steps
- The following trigger options:
  - [Event trigger](/triggers/event/): `event_type`, `event_data`, and `context`
  - [MQTT trigger](/triggers/mqtt/): `topic`
  - [Time trigger](/triggers/time/): `at`

## Variables in limited templates

Which variables a limited template can use depends on the field that contains the limited template.

### In trigger options, `trigger_variables`, and the `enabled` option of triggers

Limited templates in trigger options, in `trigger_variables`, and in the `enabled` option of triggers can use:

- The values from `trigger_variables`
- [`this`](/docs/automation/trigger-data/#state-of-the-automation)

The `trigger` variable isn't available, because nothing has triggered yet.

Home Assistant also works out `trigger_variables` again each time the automation runs, for the conditions and actions of the automation. A value that changes, such as a value that uses `random`, can then differ from the value the triggers use.

### In the triggers of a Wait for a trigger step

Home Assistant works out the limited templates in the triggers of a **Wait for a trigger** step each time the wait starts. Limited templates in the triggers of a **Wait for a trigger** step can use:

- All variables defined before the wait, including `trigger`

### In the `enabled` option of conditions and other steps

Limited templates in the `enabled` option of conditions and other steps can't use any variables. Instead of a variable, use one of the following:

- A fixed value
- A blueprint input

## How you notice a limited template error

If a limited template uses a function that isn't available, Home Assistant logs an error. To find the error, go to {% my logs title="**Settings** > **System** > **Logs**" %}. What else happens depends on the field that contains the limited template:

- In a trigger option or the `enabled` option of a trigger, the trigger doesn't react. The automation still shows as turned on.
- In `trigger_variables`, none of the triggers react. The automation still shows as turned on.
- In the `enabled` option of a condition in **And if**, the automation doesn't load.
- In the `enabled` option of a step, the run stops at the step.
- In a **Wait for a trigger** step, a trigger whose limited template fails isn't set up. The step still waits for any remaining triggers or the timeout. If no triggers can be set up, the wait ends right away, and the run continues with the next step.

For how to fix the error, refer to [Use of 'states' is not supported in limited templates](/docs/templating/errors/#templateerror-use-of-states-is-not-supported-in-limited-templates).
