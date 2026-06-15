---
title: "Clear lock user code"
action: zwave_js.clear_lock_usercode
domain: zwave_js
description: "Clears the user code from a code slot on a Z-Wave lock."
related_actions:
  - zwave_js.set_lock_usercode
  - zwave_js.get_lock_usercode
---

Use this action to clear the user code from a specific code slot on a Z-Wave lock, for example to revoke a guest's PIN after their stay. Valid code slots are between 1 and 254.

{% include actions/ui_header.md %}

To clear a lock user code from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the locks to clear the code from.
6. From the actions shown for that target, select **Clear lock user code**.
7. Set the **Code slot** to clear.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Code slot:
  description: The code slot to clear the user code from.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.clear_lock_usercode`. A basic example looks like this:

{% example %}
action: |
  action: zwave_js.clear_lock_usercode
  target:
    entity_id: lock.front_door
  data:
    code_slot: 1
{% endexample %}

### Options in YAML

{% options_yaml %}
code_slot:
  description: The code slot to clear the user code from.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

## Good to know

- Valid code slots are between 1 and 254.

{% include actions/stuck.md %}

{% include actions/related.md %}
