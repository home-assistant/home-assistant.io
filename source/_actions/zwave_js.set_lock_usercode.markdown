---
title: "Set lock user code"
action: zwave_js.set_lock_usercode
domain: zwave_js
description: "Sets a user code in a code slot on a Z-Wave lock."
related_actions:
  - zwave_js.clear_lock_usercode
  - zwave_js.get_lock_usercode
---

Use this action to set a user code in a specific code slot on a Z-Wave lock, for example to give a guest or cleaner their own PIN. Valid user codes are at least 4 digits.

For locks that support multiple credentials per user, consider the newer [Set user](/actions/zwave_js.set_user/) and [Set credential](/actions/zwave_js.set_credential/) actions instead.

{% include actions/ui_header.md %}

To set a lock user code from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the locks to set the code on.
6. From the actions shown for that target, select **Set lock user code**.
7. Set the **Code slot** and **Code**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Code slot:
  description: The code slot to set the user code in.
  required: true
Code:
  description: The user code to set in the slot.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.set_lock_usercode`. A basic example looks like this:

{% example %}
action: |
  action: zwave_js.set_lock_usercode
  target:
    entity_id: lock.front_door
  data:
    code_slot: 1
    usercode: "1234"
{% endexample %}

### Options in YAML

{% options_yaml %}
code_slot:
  description: The code slot to set the user code in.
  required: true
  type: integer
usercode:
  description: The user code to set in the slot.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

## Good to know

- Valid user codes are at least 4 digits.
- Quote the user code in YAML, for example `"0123"`, to preserve leading zeros.

{% include actions/stuck.md %}

{% include actions/related.md %}
