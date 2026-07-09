---
title: "Blind is open"
condition: cover.blind_is_open
domain: cover
description: "Tests if one or more blinds are open."
related_conditions:
  - cover.blind_is_closed
---

The **Blind is open** condition passes when one or more targeted blinds are currently open. Use it when an automation should continue only if a blind is still open at the moment the automation runs.

This condition is useful for reminders, lighting checks, and routines that depend on whether a blind is open.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Blind is open**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your blind is in, like your living room or bedroom. You can also select a floor, a device, a specific entity, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, enter how long the blind must have stayed open before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple blinds are targeted, controls how results combine. Pick **Any** to pass if at least one targeted blind is open, or **All** to pass only when every targeted blind is open. The default is **Any**.
  required: false
For at least:
  description: How long the blind must have stayed open before the condition passes. The default is `0` (passes immediately).
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `cover.blind_is_open`. A basic example looks like this:

{% example %}
condition: |
  condition: cover.blind_is_open
  target:
    entity_id: cover.office_blind
{% endexample %}

This passes when `cover.office_blind` is currently open.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple blinds are targeted, controls how results combine. Accepts
    `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the blind must have stayed open before the condition
    passes. Accepts a duration like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition works only with `cover` entities that use the `blind` device class.
- Entities in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- With **Any**, the condition passes if at least one available targeted blind is open.
- With **All**, the condition passes only if every available targeted blind is open. If every targeted blind is `unavailable` or `unknown`, **All** passes and **Any** fails.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: close the blind at sunset if it is still open

At sunset, this automation checks whether the blind is still open. If it is, Home Assistant closes it for the night.

- **Trigger**: Sun: Sunset
- **Condition**: Blind is open
  - **Target**: Office blind
- **Action**: Close cover

{% details "YAML example for closing the blind at sunset" %}

{% example %}
automation: |
  alias: "Close the blind at sunset"
  triggers:
    - trigger: sun
      event: sunset
  conditions:
    - condition: cover.blind_is_open
      target:
        entity_id: cover.office_blind
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.office_blind
{% endexample %}

{% enddetails %}

### Automation: notify you if the blind is still open when you leave home

When you leave home, this automation checks whether the blind is still open. If it is, Home Assistant sends a reminder so you can close it.

- **Trigger**: Person leaves home zone
- **Condition**: Blind is open
  - **Target**: Office blind
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for checking the blind when you leave home" %}

{% example %}
automation: |
  alias: "Warn me if the blind is open when I leave home"
  triggers:
    - trigger: zone
      entity_id: person.morgan
      zone: zone.home
      event: leave
  conditions:
    - condition: cover.blind_is_open
      target:
        entity_id: cover.office_blind
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Cover still open"
        message: >
          The blind is still open while you are leaving.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
