---
title: "Update a PIN code on a Schlage lock"
action: schlage.update_code
domain: schlage
description: "Updates an existing PIN code on a Schlage lock."
related_actions:
  - schlage.add_code
  - schlage.delete_code
  - schlage.get_codes
---

Use this action to update an existing PIN code on a Schlage lock. You can change the name, PIN value, notification settings, or schedule of a code that is already on the lock.

{% include actions/ui_header.md %}

To update a PIN code from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Schlage lock.
6. From the actions shown for that target, select **Schlage: Update a PIN code**.
7. Enter the **Access code ID** of the code you want to update. You can get IDs from the **Schlage: Get PIN codes** action.
8. Configure the fields you want to change. Leave any field you don't want to change empty.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Access code ID:
description: The unique ID of the access code to update. You can get IDs from the **Schlage: Get PIN codes** action.
PIN name:
description: New name for the PIN code.
required: false
PIN code:
description: New PIN code value (4-8 digits).
required: false
Notify when PIN is used:
description: Whether the native Schlage notification should be sent when this PIN is used.
required: false
Disabled:
description: Whether the PIN code should be disabled.
required: false
Start time:
description: When this PIN becomes active. Providing a start time makes the PIN temporary; both a start and an end time are required. Omitting both preserves the code's existing schedule.
required: false
End time:
description: When this PIN stops working. Required together with the start time. Omitting both preserves the code's existing schedule.
required: false
{% endoptions_ui %}

### Preserving the existing schedule

When you update a PIN code, you can leave the start and end time fields empty to keep the code's existing schedule unchanged. If you provide only one of the two time fields, you get an error: _Start and end times are required together. Provide both to create a temporary PIN, or neither for a permanent one._

If you provide both a start time and an end time, the new times replace the existing schedule. The start time must be before the end time. If the start time is the same as or after the end time, you get an error: _Start time must be before end time._

{% include actions/yaml_header.md %}

In YAML, refer to this action as `schlage.update_code`. A basic example looks like this:

{% example %}
action: |
action: schlage.update_code
target:
entity_id: lock.front_door
data:
access_code_id: "abc123"
name: Updated Name
{% endexample %}

To change a PIN's schedule in YAML:

{% example %}
action: |
action: schlage.update_code
target:
entity_id: lock.front_door
data:
access_code_id: "abc123"
start_datetime: "2026-09-01T15:00:00"
end_datetime: "2026-09-01T16:00:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
access_code_id:
description: The unique ID of the access code to update.
required: true
type: string
name:
description: New name for the PIN code.
required: false
type: string
code:
description: New PIN code value (4-8 digits).
required: false
type: string
notify_on_use:
description: Whether the native Schlage notification should be sent when this PIN is used.
required: false
type: boolean
disabled:
description: Whether the PIN code should be disabled.
required: false
type: boolean
start_datetime:
description: When this PIN becomes active. Providing a start time makes the PIN temporary; both a start and an end time are required. Omitting both preserves the code's existing schedule.
required: false
type: string
end_datetime:
description: When this PIN stops working. Required together with the start time. Omitting both preserves the code's existing schedule.
required: false
type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
