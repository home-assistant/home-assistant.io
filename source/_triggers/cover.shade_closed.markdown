---
title: "Shade closed"
trigger: cover.shade_closed
domain: cover
description: "Triggers when one or more shades close."
related_triggers:
  - cover.shade_opened
---

The **Shade closed** trigger fires when a targeted shade changes to closed. Use it when you want Home Assistant to react as soon as a shade closes.

This trigger is useful for lighting, notifications, and routines that should run as soon as a shade closes.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Shade closed**.
5. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your shade is in, like your living room or bedroom. You can also select a floor, a device, a specific entity, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, enter how long the shade must stay closed before the trigger fires. Leave it at zero to fire right away.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple shades are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted shade closes, **First** to fire only when the first targeted shade closes, or **All** to fire only after every targeted shade is closed. The default is **Each**.
  required: false
For at least:
  description: How long the shade must stay closed before the trigger fires. The default is `0` (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `cover.shade_closed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: cover.shade_closed
  target:
    entity_id: cover.bedroom_shade
{% endexample %}

This fires when `cover.bedroom_shade` changes to closed.

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
    How long the shade must stay closed before the trigger fires.
    Accepts a duration like `00:00:10` for 10 seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger works only with `cover` entities that use the `shade` device class.
- If a shade comes back from `unavailable` or `unknown`, that recovery does not count as the closing.
- The `for` option fires the automation only if the shade stays closed for the entire time you set.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the nearby light when the shade closes after sunset

When the shade closes after dark, this automation turns on a nearby light so the area stays easy to use.

- **Trigger**: Shade closed
  - **Target**: Bedroom shade
- **Action**: Turn on light
  - **Target**: Bedroom lamp

{% details "YAML example for turning on the nearby light when the shade closes" %}

{% example %}
automation: |
  alias: "Turn on the nearby light when the shade closes"
  triggers:
    - trigger: cover.shade_closed
      target:
        entity_id: cover.bedroom_shade
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.bedroom_lamp
{% endexample %}

{% enddetails %}

### Automation: notify you if the shade closes while you are away

If the shade changes while nobody is home, this automation sends a notification so you can check whether it was expected.

- **Trigger**: Shade closed
  - **Target**: Bedroom shade
  - **For at least**: 00:00:10
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification when the shade closes" %}

{% example %}
automation: |
  alias: "Notify me if the shade closes while I am away"
  triggers:
    - trigger: cover.shade_closed
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
          The shade closed while nobody was home.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
