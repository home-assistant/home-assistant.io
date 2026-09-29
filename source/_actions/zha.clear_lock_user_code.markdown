---
title: "Clear a lock user code"
action: zha.clear_lock_user_code
domain: zha
description: "Removes a user code from a slot on a Zigbee lock."
related_actions:
  - zha.set_lock_user_code
  - zha.enable_lock_user_code
  - zha.disable_lock_user_code
---

Use this action to remove a user code from a slot on a Zigbee lock. This frees up the slot and permanently deletes the code, for example to revoke a guest's access after their stay.

{% include actions/ui_header.md %}

To clear a lock user code from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the lock with the code you want to clear.
6. From the actions shown for that target, select **Clear lock user**.
7. Set the code slot.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Code slot:
  description: The slot to clear the code from.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zha.clear_lock_user_code`. A basic example looks like this:

{% example %}
action: |
  action: zha.clear_lock_user_code
  target:
    entity_id: lock.front_door
  data:
    code_slot: 1
{% endexample %}

### Options in YAML

{% options_yaml %}
code_slot:
  description: The slot to clear the code from.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

## Good to know

- Clearing a code is permanent. To use the code again, store it with the [Set a lock user code](/actions/zha.set_lock_user_code/) action. To keep it but turn it off, use the [Disable a lock user code](/actions/zha.disable_lock_user_code/) action instead.

{% include actions/stuck.md %}

{% include actions/related.md %}
