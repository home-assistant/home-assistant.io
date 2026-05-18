---
title: "Vacuum encountered an error"
trigger: vacuum.errored
domain: vacuum
description: "Triggers when a vacuum cleaner reports an error."
related_triggers:
  - vacuum.paused_cleaning
  - vacuum.docked
---

The **Vacuum encountered an error** trigger fires as soon as your vacuum reports an error state.
You can use it to create alerts, notifications, or proactive automations when something interrupts a cleaning session.

This is useful when you want to know right away that the robot is tangled, blocked, out of water, or needs another kind of manual help before it can continue.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Vacuum: Vacuum encountered an error**.
5. Under **Targets**, pick the vacuum entities (or an area/floor) you want to monitor.
6. Under **Trigger when**, pick **Each**, **First**, or **All** to control group behavior.
7. Under **For at least**, enter how long the vacuum must remain in the error state before the trigger fires.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When more than one vacuum is targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted vacuum reports an error, **First** to fire only on the first error event, or **All** to fire only after all targeted vacuums have reported an error.
  required: true
For at least:
  description: The time the vacuum must remain in the error state before the trigger fires.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `vacuum.errored`. A basic example looks like this:

{% example %}
trigger: |
  trigger: vacuum.errored
  target:
    entity_id:
      - vacuum.upstairs
      - vacuum.downstairs
  options:
    behavior: first
{% endexample %}

This fires after the first vacuum reports an error.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple vacuums are targeted, controls when the trigger fires. Accepts `any`, `first`, or `last`.
  required: true
  type: string
  default: any
for:
  description: The time the vacuum must remain in the error state before the trigger fires.
  required: false
  type: time
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires only when a vacuum actually enters an error state.
- If a vacuum comes back online from `unavailable` or `unknown`, that does not count as an error event.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: alert when the vacuum reports an error

When the vacuum enters an error state, send a notification right away so you can clear the problem before the cleaning run is abandoned for the rest of the day.

- **Trigger**: Vacuum encountered an error
  - **Target**: Upstairs vacuum
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a vacuum error alert" %}

{% example %}
automation: |
  alias: "Vacuum error alert"
  triggers:
    - trigger: vacuum.errored
      target:
        entity_id: vacuum.upstairs
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Vacuum error"
        message: "The upstairs vacuum reported an error."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
