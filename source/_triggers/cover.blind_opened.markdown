---
title: "Blind opened"
trigger: cover.blind_opened
domain: cover
description: "Triggers when one or more blinds open."
related_triggers:
  - cover.blind_closed
---

The **Blind opened** trigger fires when a targeted blind changes to open. Use it when you want Home Assistant to react as soon as a blind opens.

This trigger is useful for lighting, notifications, and routines that should run as soon as a blind opens.

## Prerequisites

- Use a cover entity with the `blind` device class.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Blind opened**.
5. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your blind is in, like your living room or bedroom. You can also select a floor, a device, a specific entity, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, enter how long the blind must stay open before the trigger fires. Leave it at zero to fire right away.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple blinds are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted blind opens, **First** to fire only when the first targeted blind opens, or **All** to fire only after every targeted blind is open. The default is **Each**.
  required: false
For at least:
  description: How long the blind must stay open before the trigger fires. The default is `0` (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `cover.blind_opened`. A basic example looks like this:

{% example %}
trigger: |
  trigger: cover.blind_opened
  target:
    entity_id: cover.office_blind
{% endexample %}

This fires when `cover.office_blind` changes to open.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple blinds are targeted, controls when the trigger fires.
    Accepts `any`, `first`, or `last`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the blind must stay open before the trigger fires.
    Accepts a duration like `00:00:10` for 10 seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- If a blind comes back from `unavailable` or `unknown`, that recovery does not count as the opening.
- The `for` option fires the automation only if the blind stays open for the entire time you set.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off the nearby light when the blind opens after sunrise

When daylight is enough for the room, this automation turns off a nearby light as soon as the blind opens.

- **Trigger**: Blind opened
  - **Target**: Office blind
- **Action**: Turn off light
  - **Target**: Office lamp

{% details "YAML example for turning off the nearby light when the blind opens" %}

{% example %}
automation: |
  alias: "Turn off the nearby light when the blind opens"
  triggers:
    - trigger: cover.blind_opened
      target:
        entity_id: cover.office_blind
  conditions:
    - condition: sun
      after: sunrise
  actions:
    - action: light.turn_off
      target:
        entity_id: light.office_lamp
{% endexample %}

{% enddetails %}

### Automation: notify you if the blind opens while you are away

If the blind changes while nobody is home, this automation sends a notification so you can check whether it was expected.

- **Trigger**: Blind opened
  - **Target**: Office blind
  - **For at least**: 00:00:10
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification when the blind opens" %}

{% example %}
automation: |
  alias: "Notify me if the blind opens while I am away"
  triggers:
    - trigger: cover.blind_opened
      target:
        entity_id: cover.office_blind
      options:
        for: "00:00:10"
  conditions:
    - condition: state
      entity_id: person.morgan
      state: "not_home"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Blind changed"
        message: >
          The blind opened while nobody was home.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
