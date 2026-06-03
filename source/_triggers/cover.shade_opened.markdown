---
title: "Shade opened"
trigger: cover.shade_opened
domain: cover
description: "Triggers after one or more shades open."
related_triggers:
  - cover.shade_closed
---

The **Shade opened** trigger fires when a targeted shade changes to open. Use it when you want Home Assistant to react as soon as a shade opens.

This trigger is useful for lighting, notifications, and routines that should run as soon as a shade opens.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Shade opened**.
5. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your shade is in, like your living room or bedroom. You can also select a floor, a device, a specific entity, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, enter how long the shade must stay open before the trigger fires. Leave it at zero to fire right away.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple shades are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted shade opens, **First** to fire only when the first targeted shade opens, or **All** to fire only after every targeted shade is open. The default is **Each**.
  required: false
For at least:
  description: How long the shade must stay open before the trigger fires. The default is `0` (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `cover.shade_opened`. A basic example looks like this:

{% example %}
trigger: |
  trigger: cover.shade_opened
  target:
    entity_id: cover.bedroom_shade
{% endexample %}

This fires when `cover.bedroom_shade` changes to open.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple shades are targeted, controls when the trigger fires.
    Accepts `any`, `first`, or `last`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the shade must stay open before the trigger fires.
    Accepts a duration like `00:00:10` for 10 seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger works only with `cover` entities that use the `shade` device class.
- If a shade comes back from `unavailable` or `unknown`, that recovery does not count as the opening.
- The `for` option fires the automation only if the shade stays open for the entire time you set.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off the nearby light when the shade opens after sunrise

When daylight is enough for the room, this automation turns off a nearby light as soon as the shade opens.

- **Trigger**: Shade opened
  - **Target**: Bedroom shade
- **Action**: Turn off light
  - **Target**: Bedroom lamp

{% details "YAML example for turning off the nearby light when the shade opens" %}

{% example %}
automation: |
  alias: "Turn off the nearby light when the shade opens"
  triggers:
    - trigger: cover.shade_opened
      target:
        entity_id: cover.bedroom_shade
  conditions:
    - condition: sun
      after: sunrise
  actions:
    - action: light.turn_off
      target:
        entity_id: light.bedroom_lamp
{% endexample %}

{% enddetails %}

### Automation: notify you if the shade opens while you are away

If the shade changes while nobody is home, this automation sends a notification so you can check whether it was expected.

- **Trigger**: Shade opened
  - **Target**: Bedroom shade
  - **For at least**: 00:00:10
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification when the shade opens" %}

{% example %}
automation: |
  alias: "Notify me if the shade opens while I am away"
  triggers:
    - trigger: cover.shade_opened
      target:
        entity_id: cover.bedroom_shade
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
        title: "Shade changed"
        message: >
          The shade opened while nobody was home.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
