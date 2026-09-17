---
title: "Get lock user code"
action: zwave_js.get_lock_usercode
domain: zwave_js
description: "Gets user codes from a Z-Wave lock."
related_actions:
  - zwave_js.set_lock_usercode
  - zwave_js.clear_lock_usercode
---

Use this action to read the user codes from a Z-Wave lock. You can query a single code slot or retrieve all code slots at once, for example to check which slots are in use before assigning a new code.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get lock user codes from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the locks to read.
6. From the actions shown for that target, select **Get lock user code**.
7. Optionally set a **Code slot** to read a single slot.
8. In the **Response variable** field, enter a name to store the result, for example, `codes`.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Code slot:
  description: The code slot to read. When not set, all code slots are returned.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.get_lock_usercode`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: zwave_js.get_lock_usercode
  target:
    entity_id: lock.front_door
  response_variable: codes
{% endexample %}

### Options in YAML

{% options_yaml %}
code_slot:
  description: The code slot to read. When not set, all code slots are returned.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

## Response data

The response is keyed by code slot. Each slot includes the following fields:

- `usercode`: The user code stored in the slot. Empty when the slot is not in use.
- `in_use`: Whether the slot currently holds a code.

A shortened example of the response looks like this:

```yaml
"1":
  usercode: "1234"
  in_use: true
"2":
  usercode: ""
  in_use: false
```

## Good to know

- Query a single slot with a code slot, or leave it out to read every slot at once.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
