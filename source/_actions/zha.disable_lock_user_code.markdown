---
title: "Disable a lock user code"
action: zha.disable_lock_user_code
domain: zha
description: "Disables a user code in a slot on a Zigbee lock."
related_actions:
  - zha.enable_lock_user_code
  - zha.set_lock_user_code
  - zha.clear_lock_user_code
---

Use this action to disable a user code that is stored in a slot on a Zigbee lock. The code stays in the slot, so you can enable it again later. This is handy for temporarily turning off a guest code without removing it, for example between visits.

{% include actions/ui_header.md %}

To disable a lock user code from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the lock with the code you want to disable.
6. From the actions shown for that target, select **Disable lock user**.
7. Set the code slot.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Code slot:
  description: The slot of the code to disable.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zha.disable_lock_user_code`. A basic example looks like this:

{% example %}
action: |
  action: zha.disable_lock_user_code
  target:
    entity_id: lock.front_door
  data:
    code_slot: 1
{% endexample %}

### Options in YAML

{% options_yaml %}
code_slot:
  description: The slot of the code to disable.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

## Good to know

- The code is kept in the slot. To enable it again, use the [Enable a lock user code](/actions/zha.enable_lock_user_code/) action. To remove it entirely, use the [Clear a lock user code](/actions/zha.clear_lock_user_code/) action.

{% include actions/stuck.md %}

{% include actions/related.md %}
