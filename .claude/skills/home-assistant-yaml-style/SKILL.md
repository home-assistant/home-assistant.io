---
name: home-assistant-yaml-style
description: Use this when editing Home Assistant YAML examples, automation examples, script examples, service action calls, templates, or configuration snippets.
---

# Home Assistant YAML style

Follow this style for all YAML examples in Home Assistant documentation.

## General YAML style

- Use 2 spaces for indentation.
- Use `true` and `false` for booleans. Do not use truthy values like `yes`, `no`, `on`, or `off`.
- Prefer block style sequences.
- Indent block style sequences under the key they belong to.
- Avoid flow style sequences. If used, put a space after each comma and no whitespace before opening or closing brackets.
- Use only block style mappings. Do not use flow style mappings that look like JSON.
- Mark null values implicitly. Avoid explicit null values such as `~` and `null`.
- Prefer double quotes for strings.
- Use literal style and folded style strings instead of `\n` or long single-line strings.
- Prefer no-chomping operators (`|`, `>`) unless the example requires the strip operator (`|-`, `>-`) or keep operator (`|+`, `>+`).
- Keep content inside fenced code blocks to 80 characters per line.

## YAML comments

- Use comments when they help the reader understand an example.
- Put the comment above the line it applies to when possible.
- Match the comment indentation to the current indentation level.
- Start comments with a capital letter.
- Put a space between `#` and the comment text.

```yaml
example:
  # Comment
  one: true
```

## Home Assistant YAML examples

- Omit configuration options that use their default value unless the example specifically teaches that option.
- Omit empty conditions, such as `conditions: []`.
- Omit `mode: single` because it is the default.
- Omit empty `data` sections, such as `data: {}`.
- Textual content in YAML parameters must follow the documentation writing style. For example, `title` parameter content should use sentence-style capitalization.
- All examples should be formatted to be included in `configuration.yaml` unless explicitly stated otherwise.
- Use capital letters and `_` to indicate values readers need to replace, for example `api_key: YOUR_API_KEY` or `api_key: REPLACE_ME`.

## String exceptions

Strings are preferably quoted with double quotes. These value types may stay unquoted when that improves readability:

- Entity IDs, for example `binary_sensor.motion`
- Entity attributes, for example `temperature`
- Device IDs
- Area IDs
- Platform types, for example `light` or `switch`
- Condition types, for example `numeric_state` or `state`
- Trigger types, for example `state` or `time`
- Action names, for example `light.turn_on`
- Device classes, for example `problem` or `motion`
- Event names
- Values that accept a limited set of hardcoded values, such as `mode` in automations

```yaml
actions:
  - action: notify.frenck
    data:
      message: "Hi there!"
  - action: light.turn_on
    target:
      entity_id: light.office_desk
      area_id: living_room
    data:
      transition: 10
```

## Service action targets

Use service action targets for entity IDs, area IDs, and device IDs. They are the most modern and flexible option.

```yaml
actions:
  - action: light.turn_on
    target:
      entity_id: light.living_room
  - action: light.turn_on
    target:
      area_id: living_room
  - action: light.turn_on
    target:
      area_id: living_room
      entity_id: light.office_desk
      device_id: 21349287492398472398
```

Do not put the entity ID at the action level or inside `data` when `target` is available.

## Scalars, lists, and mappings

For properties that accept a single scalar or a list of scalars:

- Do not put multiple values in a comma-separated string.
- If a list is used, use block style.
- Do not use a list with a single scalar value.
- A single scalar value is allowed.

```yaml
entity_id: light.living_room
entity_id:
  - light.living_room
  - light.office
```

For properties that accept a mapping or a list of mappings, such as `condition`, `action`, and `sequence`, use a list of mappings even when only a single mapping is passed in.

```yaml
actions:
  - action: light.turn_on
    target:
      entity_id: light.living_room
```

## Templates

- Avoid templates if a pure YAML version is available.
- Templates are strings and must be double-quoted. Use single quotes inside templates.
- Avoid long template lines. Split them across multiple lines so they are easier to read.
- Prefer shorthand style templates over the more expressive `condition: template` format when the shorthand is supported.
- Use spacing around the filter pipe marker: ` | `. If that hurts readability, add parentheses.
- Do not use the `states` object directly if a helper method is available. Use `states()`, `is_state()`, `state_attr()`, and `is_state_attr()` to avoid errors when the entity is not ready, such as during Home Assistant startup.

```yaml
conditions:
  - condition: numeric_state
    entity_id: sun.sun
    attribute: elevation
    below: 4
```

```yaml
value_template: >-
  {{
    is_state('sensor.bedroom_co_status', 'Ok')
    and is_state('sensor.kitchen_co_status', 'Ok')
    and is_state('sensor.wardrobe_co_status', 'Ok')
  }}
```

```yaml
one: "{{ states('sensor.temperature') }}"
two: "{{ state_attr('climate.living_room', 'temperature') }}"
```
