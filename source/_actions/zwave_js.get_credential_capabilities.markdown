---
title: "Get credential capabilities"
action: zwave_js.get_credential_capabilities
domain: zwave_js
description: "Queries the user and credential management capabilities of a Z-Wave lock."
related_actions:
  - zwave_js.get_users
  - zwave_js.set_user
  - zwave_js.set_credential
---

Use this action to find out what a Z-Wave lock supports for user and credential management, such as the maximum number of users, the supported user types and credential rules, and the slot count and length range for each credential type. Run this before calling the other user and credential actions so you know what your specific lock allows.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get the credential capabilities from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the locks to query.
6. From the actions shown for that target, select **Get credential capabilities**.
7. In the **Response variable** field, enter a name to store the result, for example, `capabilities`.
8. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.get_credential_capabilities`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: zwave_js.get_credential_capabilities
  target:
    entity_id: lock.front_door
  response_variable: capabilities
{% endexample %}

{% include actions/targets.md domain="lock" %}

## Response data

The response is keyed by lock entity. Each entry reports the user and credential limits of the lock. A shortened example looks like this:

```yaml
lock.front_door:
  supports_user_management: true
  max_users: 20
  supported_user_types:
    - general
    - programming
  max_user_name_length: 16
  supported_credential_rules:
    - single
    - dual
  supported_credential_types:
    pin_code:
      num_slots: 20
      min_length: 4
      max_length: 10
      supports_learn: false
    password:
      num_slots: 20
      min_length: 4
      max_length: 16
      supports_learn: false
```

## Good to know

- Use the reported limits to choose valid user indexes, credential slots, and credential lengths before calling the other actions.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
