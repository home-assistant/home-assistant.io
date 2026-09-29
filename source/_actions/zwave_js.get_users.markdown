---
title: "Get users"
action: zwave_js.get_users
domain: zwave_js
description: "Lists all access-control users and their credential references on a Z-Wave lock."
related_actions:
  - zwave_js.set_user
  - zwave_js.get_credential_capabilities
---

Use this action to list all access-control users on a Z-Wave lock, along with each user's type, credential rule, active state, and the credentials assigned to them. This is handy for auditing who has access or for finding a free user slot.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To list the users from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the locks to read.
6. From the actions shown for that target, select **Get users**.
7. In the **Response variable** field, enter a name to store the result, for example, `users`.
8. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.get_users`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: zwave_js.get_users
  target:
    entity_id: lock.front_door
  response_variable: users
{% endexample %}

{% include actions/targets.md domain="lock" %}

## Response data

The response is keyed by lock entity. Each entry reports the maximum number of users and a list of the configured users, with their credential references. A shortened example looks like this:

```yaml
lock.front_door:
  max_users: 20
  users:
    - user_id: 1
      user_name: "Jane"
      active: true
      user_type: general
      credential_rule: single
      credentials:
        - type: pin_code
          slot: 1
          data: "1234"
    - user_id: 2
      user_name: "Cleaner"
      active: true
      user_type: disposable
      credential_rule: single
      credentials:
        - type: pin_code
          slot: 2
          data: "5678"
```

## Good to know

- The response includes only the credential types the lock can report. Some credential types, such as biometrics, may not expose their data.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
