---
title: "Vacuum cleaner paused cleaning"
trigger: vacuum.paused_cleaning
domain: vacuum
description: "Triggers when one or more vacuum cleaners pause cleaning."
related_triggers:
  - vacuum.started_cleaning
  - vacuum.started_returning
---

The **Vacuum cleaner paused cleaning** trigger fires when a vacuum interrupts its cleaning session by pausing.
Use this to send reminders, alert for stuck devices, or to chain additional automations.

Use it to send a message when the robot needs help, turn on a nearby light so you can find it, or record how often it gets stuck in the same place.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Vacuum cleaner paused cleaning**.
5. Under **Targets**, pick the vacuums, area, or group you want.
6. Under **Trigger when**, pick **Each**, **First**, or **All**.
7. Under **For at least**, enter how long the vacuum must stay paused before the trigger fires.
8. Save the automation.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When monitoring more than one vacuum, controls when the trigger fires. Pick **Each** to fire every time any targeted vacuum pauses, **First** to fire only on the first pause event, or **All** to fire only after all targeted vacuums have paused.
  required: false
For at least:
  description: The time the vacuum must remain paused before the trigger fires.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `vacuum.paused_cleaning`. A basic example looks like this:

{% example %}
trigger: |
  trigger: vacuum.paused_cleaning
  target:
    entity_id:
      - vacuum.upstairs
      - vacuum.downstairs
  options:
    behavior: first
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple vacuums are targeted, controls when the trigger fires. Accepts `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: >
    The time the vacuum must remain paused before the trigger fires.
    Accepts a duration like `00:00:10` for 10 seconds.
  required: false
  type: string
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires only when a vacuum actually pauses.
- If a vacuum comes back online from `unavailable` or `unknown`, that does not count as a pause event.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send a notification when the vacuum pauses

If the vacuum pauses unexpectedly, it may be stuck under furniture, wrapped in a cable, or waiting for you to empty the bin. This automation sends a phone alert so you can check on it.

- **Trigger**: Vacuum cleaner paused cleaning
  - **Target**: Hallway vacuum
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a paused vacuum alert" %}

{% example %}
automation: |
  alias: "Vacuum paused alert"
  triggers:
    - trigger: vacuum.paused_cleaning
      target:
        entity_id: vacuum.hallway
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Vacuum paused"
        message: "The hallway vacuum paused and may need attention."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
