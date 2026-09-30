---
title: "Curtain opened"
trigger: cover.curtain_opened
domain: cover
description: "Triggers when one or more curtains open."
related_triggers:
  - cover.curtain_closed
---

The **Curtain opened** trigger fires when a targeted curtain changes to open. Use it when you want Home Assistant to react as soon as a curtain opens.

This trigger is useful for lighting, notifications, and routines that should run as soon as a curtain opens.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Curtain opened**.
5. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your curtain is in, like your living room or bedroom. You can also select a floor, a device, a specific entity, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, enter how long the curtain must stay open before the trigger fires. Leave it at zero to fire right away.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple curtains are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted curtain opens, **First** to fire only when the first targeted curtain opens, or **All** to fire only after every targeted curtain is open. The default is **Each**.
  required: false
For at least:
  description: How long the curtain must stay open before the trigger fires. The default is `0` (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `cover.curtain_opened`. A basic example looks like this:

{% example %}
trigger: |
  trigger: cover.curtain_opened
  target:
    entity_id: cover.living_room_curtain
{% endexample %}

This fires when `cover.living_room_curtain` changes to open.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple curtains are targeted, controls when the trigger fires.
    Accepts `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: >
    How long the curtain must stay open before the trigger fires.
    Accepts a duration like `00:00:10` for 10 seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Use a cover entity with the curtain device class.
- If a curtain comes back from **Unavailable** or **Unknown**, that recovery does not count as the opening.
- The **For at least** option fires the automation only if the curtain stays open for the entire time you set.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off the nearby light when the curtain opens after sunrise

When daylight is enough for the room, this automation turns off a nearby light as soon as the curtain opens.

- **Trigger**: Curtain opened
  - **Target**: Living room curtain
- **Action**: Turn off light
  - **Target**: Living room lamp

{% details "YAML example for turning off the nearby light when the curtain opens" %}

{% example %}
automation: |
  alias: "Turn off the nearby light when the curtain opens"
  triggers:
    - trigger: cover.curtain_opened
      target:
        entity_id: cover.living_room_curtain
  conditions:
    - condition: sun
      after: sunrise
  actions:
    - action: light.turn_off
      target:
        entity_id: light.living_room_lamp
{% endexample %}

{% enddetails %}

### Automation: notify you if the curtain opens while you are away

If the curtain changes while nobody is home, this automation sends a notification so you can check whether it was expected.

- **Trigger**: Curtain opened
  - **Target**: Living room curtain
  - **For at least**: 00:00:10
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification when the curtain opens" %}

{% example %}
automation: |
  alias: "Notify me if the curtain opens while I am away"
  triggers:
    - trigger: cover.curtain_opened
      target:
        entity_id: cover.living_room_curtain
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
        title: "Curtain changed"
        message: >
          The curtain opened while nobody was home.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
