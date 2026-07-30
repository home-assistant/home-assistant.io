---
title: "Enable a lock user code"
action: zha.enable_lock_user_code
domain: zha
description: "Enables a user code in a slot on a Zigbee lock."
related_actions:
  - zha.disable_lock_user_code
  - zha.set_lock_user_code
  - zha.clear_lock_user_code
---

Use this action to enable a user code that is stored in a slot on a Zigbee lock. This lets you turn a code back on after it was disabled, for example to re-activate a guest code for a returning visitor without setting it again.

## Prerequisites

- The slot must already hold a code. To store a new code, use the [Set a lock user code](/actions/zha.set_lock_user_code/) action.

{% include actions/ui_header.md %}

To enable a lock user code from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the lock with the code you want to enable.
6. From the actions shown for that target, select **Enable lock user**.
7. Set the code slot.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Code slot:
  description: The slot of the code to enable.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zha.enable_lock_user_code`. A basic example looks like this:

{% example %}
action: |
  action: zha.enable_lock_user_code
  target:
    entity_id: lock.front_door
  data:
    code_slot: 1
{% endexample %}

### Options in YAML

{% options_yaml %}
code_slot:
  description: The slot of the code to enable.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

{% include actions/stuck.md %}

{% include actions/related.md %}
