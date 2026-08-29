---
title: "Add a PIN code to a Schlage lock"
action: schlage.add_code
domain: schlage
description: "Adds a PIN code to a Schlage lock."
related_actions:
  - schlage.delete_code
  - schlage.get_codes
---

Use this action to add a new PIN code to a Schlage lock, for example to give a guest or family member their own code. You can create a permanent PIN or a temporary PIN that is only active during a specific time window.

{% include actions/ui_header.md %}

To add a PIN code from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Schlage lock.
6. From the actions shown for that target, select **Schlage: Add PIN code**.
7. Enter the **PIN name** and the **PIN code**.
8. To create a temporary PIN, enter a **Start time** and **End time**. Leave both empty for a permanent PIN.
9. Select **Save**.

### Options in the UI

{% options_ui %}
PIN name:
  description: Name for PIN code. Must be case insensitively unique to the lock.
PIN code:
  description: The PIN code to add. Must be unique to the lock and be between 4 and 8 digits long.
Notify when PIN is used:
  description: Whether the native Schlage notification should be sent when this PIN is used. On by default.
  required: false
Start time:
  description: When this PIN becomes active. Providing a start time makes the PIN temporary; both a start and an end time are required.
  required: false
End time:
  description: When this PIN stops working. Required together with the start time; leaving both empty creates a permanent PIN.
  required: false
{% endoptions_ui %}

### Temporary vs. permanent PINs

When you add a PIN without a start or end time, it becomes a permanent PIN that works until you delete it. If you provide both a start time and an end time, the PIN becomes a temporary PIN that is only active during that window.

You must provide both times together or leave both empty. If you provide only one, you get an error: _Start and end times are required together. Provide both to create a temporary PIN, or neither for a permanent one._

The start time must be before the end time. If the start time is the same as or after the end time, you get an error: _Start time must be before end time._

{% include actions/yaml_header.md %}

In YAML, refer to this action as `schlage.add_code`. A basic example looks like this:

{% example %}
action: |
  action: schlage.add_code
  target:
    entity_id: lock.front_door
  data:
    name: Example Person
    code: "3333"
{% endexample %}

To add a temporary PIN in YAML:

{% example %}
action: |
  action: schlage.add_code
  target:
    entity_id: lock.front_door
  data:
    name: Guest
    code: "1234"
    start_datetime: "2026-09-01T15:00:00"
    end_datetime: "2026-09-01T16:00:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
name:
  description: Name for PIN code. Must be case insensitively unique to the lock.
  required: true
  type: string
code:
  description: The PIN code to add. Must be unique to the lock and be between 4 and 8 digits long.
  required: true
  type: string
notify_on_use:
  description: Whether the native Schlage notification should be sent when this PIN is used.
  required: false
  type: boolean
  default: true
start_datetime:
  description: When this PIN becomes active. Providing a start time makes the PIN temporary; both a start and an end time are required.
  required: false
  type: string
end_datetime:
  description: When this PIN stops working. Required together with the start time; leaving both empty creates a permanent PIN.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
