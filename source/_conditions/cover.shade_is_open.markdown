---
title: "Shade is open"
condition: cover.shade_is_open
domain: cover
description: "Tests if one or more shades are open."
related_conditions:
  - cover.shade_is_closed
---

The **Shade is open** condition passes when one or more targeted shades are currently open. Use it when an automation should continue only if a shade is still open at the moment the automation runs.

This condition is useful for reminders, lighting checks, and routines that depend on whether a shade is open.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Shade is open**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your shade is in, like your living room or bedroom. You can also select a floor, a device, a specific entity, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, enter how long the shade must have stayed open before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple shades are targeted, controls how results combine. Pick **Any** to pass if at least one targeted shade is open, or **All** to pass only when every targeted shade is open. The default is **Any**.
  required: false
For at least:
  description: How long the shade must have stayed open before the condition passes. The default is `0` (passes immediately).
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `cover.shade_is_open`. A basic example looks like this:

{% example %}
condition: |
  condition: cover.shade_is_open
  target:
    entity_id: cover.bedroom_shade
{% endexample %}

This passes when `cover.bedroom_shade` is currently open.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple shades are targeted, controls how results combine. Accepts
    `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the shade must have stayed open before the condition
    passes. Accepts a duration like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition works only with `cover` entities that use the `shade` device class.
- Entities in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- With **Any**, the condition passes if at least one available targeted shade is open.
- With **All**, the condition passes only if every available targeted shade is open. If every targeted shade is `unavailable` or `unknown`, **All** passes and **Any** fails.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: close the shade at sunset if it is still open

At sunset, this automation checks whether the shade is still open. If it is, Home Assistant closes it for the night.

- **Trigger**: Sun: Sunset
- **Condition**: Shade is open
  - **Target**: Bedroom shade
- **Action**: Close cover

{% details "YAML example for closing the shade at sunset" %}

{% example %}
automation: |
  alias: "Close the shade at sunset"
  triggers:
    - trigger: sun
      event: sunset
  conditions:
    - condition: cover.shade_is_open
      target:
        entity_id: cover.bedroom_shade
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.bedroom_shade
{% endexample %}

{% enddetails %}

### Automation: notify you if the shade is still open when you leave home

When you leave home, this automation checks whether the shade is still open. If it is, Home Assistant sends a reminder so you can close it.

- **Trigger**: Person leaves home zone
- **Condition**: Shade is open
  - **Target**: Bedroom shade
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for checking the shade when you leave home" %}

{% example %}
automation: |
  alias: "Warn me if the shade is open when I leave home"
  triggers:
    - trigger: zone
      entity_id: person.morgan
      zone: zone.home
      event: leave
  conditions:
    - condition: cover.shade_is_open
      target:
        entity_id: cover.bedroom_shade
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Cover still open"
        message: >
          The shade is still open while you are leaving.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
