---
title: "Durations in automations and scripts"
description: "Formats you can use for durations in automations and scripts, such as the For at least option of triggers and conditions, and where you can use templates."
related:
  - docs: /docs/automation/trigger/
    title: Automation triggers
  - docs: /docs/automation/condition/
    title: Automation conditions
  - docs: /building-blocks/delay/
    title: Delay
---

Several options in automations and scripts take a duration. For example, the **For at least** option of triggers and conditions, the **Delay** action, and the timeout of the wait actions. They all accept durations in the same formats.

## Entering a duration in the UI

In the UI, you enter a duration in hours, minutes, and seconds. For the **Delay** action and the timeout of the wait actions, you can also enter milliseconds.

The **State changed**, **Numeric state crossed threshold**, and **Template** triggers also let you use a {% term template %} for **For at least**. Under **For at least**, choose **Template** instead of **Duration**, and enter the template. For details, refer to [Templates in durations](#templates-in-durations).

## Duration formats in YAML

In YAML, a duration accepts these formats:

- A number of seconds, such as `300` for 5 minutes.
- A time in `HH:MM:SS` format, such as `"00:01:30"` for 1 minute and 30 seconds.
- A time in `HH:MM` format, such as `"01:30"` for 1 hour and 30 minutes. This is hours and minutes, not minutes and seconds.
- A mapping with one or more of `days`, `hours`, `minutes`, `seconds`, and `milliseconds`. For example:

  ```yaml
  for:
    minutes: 5
    seconds: 30
  ```

[Device triggers](/triggers/device/) and device conditions only accept the mapping format.

Most triggers and conditions, such as [Door opened](/triggers/door.opened/), expect `for` under `options:`. Each trigger and condition page shows where `for` goes in its YAML example.

## Templates in durations

These options also accept a template:

- **For at least** on the **State changed**, **Numeric state crossed threshold**, and **Template** triggers.
- **For at least** on the **State** condition.
- The [Delay](/building-blocks/delay/) action, and the timeout of the [Wait for a template](/building-blocks/wait_template/) and [Wait for a trigger](/building-blocks/wait_for_trigger/) actions.

The template can return any of the formats above, including a number of seconds. In a mapping, you can also use a template for each value. This example waits as many seconds as `input_number.delay_in_seconds` is set to:

```yaml
for: "{{ states('input_number.delay_in_seconds') | int }}"
```

Other triggers and conditions, such as **Door opened** or **Temperature crossed threshold**, currently don't accept templates for **For at least**.

## Durations that can only be edited in YAML

Some durations work, but the UI can't show them. For these, the automation editor switches to YAML:

- On the **State changed** trigger and the **State** condition, a mapping with `milliseconds`, or a mapping with a template for a value.
- On the **Delay** action, any template.
