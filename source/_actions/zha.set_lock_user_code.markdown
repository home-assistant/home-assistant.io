---
title: "Set a lock user code"
action: zha.set_lock_user_code
domain: zha
description: "Stores a user code in a slot on a Zigbee lock."
related_actions:
  - zha.enable_lock_user_code
  - zha.disable_lock_user_code
  - zha.clear_lock_user_code
---

Use this action to store a user code in a slot on a Zigbee lock. This lets you set or change a PIN code from an automation or a script, for example to hand out a temporary code to a guest and change it after they leave.

{% include actions/ui_header.md %}

To set a lock user code from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the lock you want to set a code on.
6. From the actions shown for that target, select **Set lock user code**.
7. Set the code slot and the code.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Code slot:
  description: The slot to store the code in.
Code:
  description: The code to store in the slot.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zha.set_lock_user_code`. A basic example looks like this:

{% example %}
action: |
  action: zha.set_lock_user_code
  target:
    entity_id: lock.front_door
  data:
    code_slot: 1
    user_code: "1234"
{% endexample %}

### Options in YAML

{% options_yaml %}
code_slot:
  description: The slot to store the code in.
  required: true
  type: integer
user_code:
  description: The code to store in the slot.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

## Good to know

- The number of available slots and the allowed code length depend on the lock. For example, a Kwikset 954 supports slots 1 to 32 and codes of 4 to 8 digits.
- Setting a code in a slot that already has one overwrites the existing code.

{% include actions/stuck.md %}

{% include actions/related.md %}
