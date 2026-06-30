---
title: "Add a PIN code to a Schlage lock"
action: schlage.add_code
domain: schlage
description: "Adds a PIN code to a Schlage lock."
related_actions:
  - schlage.delete_code
  - schlage.get_codes
---

Use this action to add a new PIN code to a Schlage lock, for example to give a guest or family member their own code.

{% include actions/ui_header.md %}

To add a PIN code from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Schlage lock.
6. From the actions shown for that target, select **Schlage: Add PIN code**.
7. Enter the **PIN name** and the **PIN code**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
PIN name:
  description: A name for the PIN code. Must be unique to the lock, regardless of capitalization.
PIN code:
  description: The PIN code to add. Must be unique to the lock and between 4 and 8 digits long.
Notify when PIN is used:
  description: Send the native Schlage notification when this PIN is used. On by default.
  required: false
{% endoptions_ui %}

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

### Options in YAML

{% options_yaml %}
name:
  description: A name for the PIN code. Must be unique to the lock, regardless of capitalization.
  required: true
  type: string
code:
  description: The PIN code to add. Must be unique to the lock and between 4 and 8 digits long.
  required: true
  type: string
notify_on_use:
  description: Send the native Schlage notification when this PIN is used.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
