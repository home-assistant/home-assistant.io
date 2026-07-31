---
title: "Update became available"
trigger: update.became_available
domain: update
description: "Triggers after one or more updates become available."
---

The **Update became available** trigger fires when a targeted update entity
changes to available. Use it when you want Home Assistant to respond as soon as
there is a new update ready for a device or service.

This trigger is useful for sending a notification, starting a reminder, or
waiting a little while before taking action on an available update.

## Prerequisites

- The target must be an update entity that reports available updates to Home Assistant.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** >
   **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Update became available**.
5. Select what you want to monitor. Under **By target** (see
   [Targets](#targets)), pick the device, area, floor, label, or specific
   update entity you want to watch.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)),
   pick **Each**, **First**, or **All**.
7. Under **For at least**, enter how long the update must stay available before
   the trigger fires. Leave it at zero to fire right away.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple update entities are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted update becomes available, **First** to fire only when the first targeted update becomes available, or **All** to fire only after every targeted update is available. The default is **Each**.
For at least:
  description: How long the update must stay available before the trigger fires. Set it to zero to fire immediately. The default is `00:00:00`.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `update.became_available`. A basic
example looks like this:

{% example %}
trigger: |
  trigger: update.became_available
  target:
    entity_id: update.office_router_firmware
{% endexample %}

This fires when `update.office_router_firmware` becomes available.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are
not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple update entities are targeted, controls when the trigger
    fires. Accepts `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: >
    How long the update must stay available before the trigger fires. Use the
    `HH:MM:SS` format, like `00:10:00` for 10 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger watches update entities whose state changes to `on`, which means
  an update is available.
- If an entity returns from `unavailable` or `unknown` to `on`, that recovery
  does not fire this trigger.
- If you use `for`, the update must stay available for the full time you set.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send a notification when an update becomes available

If an update for a device or service becomes available, this automation sends a
notification to your phone right away.

- **Trigger**: Update became available
  - **Target**: Office router update
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying you about a new update" %}

{% example %}
automation: |
  alias: "Send a notification when an update becomes available"
  triggers:
    - trigger: update.became_available
      target:
        entity_id: update.office_router_firmware
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Update available"
        message: >
          A new update is available for the office router.
{% endexample %}

{% enddetails %}

### Automation: turn on a reminder light if an update stays available for a week

If you want a visual reminder for updates you have been putting off, this
automation turns on a light after an update has stayed available for 7 days.

- **Trigger**: Update became available
  - **Target**: Guest room speaker update
- **For at least**: 168:00:00
- **Action**: Turn on light

{% details "YAML example for turning on an update reminder light" %}

{% example %}
automation: |
  alias: "Turn on a reminder light if an update stays available for a week"
  triggers:
    - trigger: update.became_available
      target:
        entity_id: update.guest_room_speaker_firmware
      options:
        for: "168:00:00"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway_lamp
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
