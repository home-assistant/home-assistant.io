---
title: "Vacuum returned to dock"
trigger: vacuum.returned_to_dock
domain: vacuum
description: "Triggers when a vacuum cleaner docks."
related_triggers:
  - vacuum.started_returning
  - vacuum.started_cleaning
---

The **Vacuum returned to dock** trigger fires when your vacuum docks at its charging station.
Use it to automate notifications or actions when cleaning has finished.

This is a good fit when you want to send a completion message, reset a cleaning status helper, or start another task only after the robot is safely back on the charger.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Vacuum: Vacuum returned to dock**.
5. Under **Targets**, choose a single vacuum, an area, floor, or multiple vacuums.
6. Under **Trigger when**, pick **Each**, **First**, or **All** to control how the trigger fires when more than one vacuum is targeted.
7. Under **For at least**, enter how long the vacuum must stay docked before the trigger fires.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When monitoring more than one vacuum, controls when the trigger fires. Pick **Each** to fire every time any targeted vacuum returns to dock, **First** to fire only on the first dock event, or **All** to fire only after all targeted vacuums have returned to dock.
  required: true
For at least:
  description: The time the vacuum must remain docked before the trigger fires.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `vacuum.returned_to_dock`. A basic example looks like this:

{% example %}
trigger: |
  trigger: vacuum.returned_to_dock
  target:
    entity_id:
      - vacuum.upstairs
      - vacuum.downstairs
  options:
    behavior: all
{% endexample %}

This example fires after both vacuums have docked.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple vacuums are targeted, controls when the trigger fires. Options: `each` (every time any targeted vacuum docks), `first` (only when the first returns), or `all` (only after all have docked).
  required: true
  type: string
  default: each
for:
  description: >
    The time the vacuum must remain docked before the trigger fires.
    Accepts a duration like `00:00:10` for 10 seconds.
  required: false
  type: string
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires only on a real transition to docked.
- If a vacuum comes back online from `unavailable` or `unknown`, that does not count as docking.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send a notification when cleaning is finished

When the vacuum docks, the cleaning run is usually complete. This automation sends a quick message so you know the robot is done and back on the charger.

- **Trigger**: Vacuum returned to dock
  - **Target**: Downstairs vacuum
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a cleaning finished notification" %}

{% example %}
automation: |
  alias: "Vacuum finished cleaning"
  triggers:
    - trigger: vacuum.returned_to_dock
      target:
        entity_id: vacuum.downstairs
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Vacuum finished"
        message: "The downstairs vacuum returned to its dock."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
