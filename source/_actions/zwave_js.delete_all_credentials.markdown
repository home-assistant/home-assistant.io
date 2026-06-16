---
title: "Delete all credentials"
action: zwave_js.delete_all_credentials
domain: zwave_js
description: "Removes every credential belonging to a single user on a Z-Wave lock."
related_actions:
  - zwave_js.delete_credential
  - zwave_js.set_credential
---

Use this action to remove every credential, such as PIN codes and passwords, belonging to a single user on a Z-Wave lock. The user itself is not deleted and can have new credentials added later. This is handy when you want to reset someone's access without removing their user slot.

{% include actions/ui_header.md %}

To delete all of a user's credentials from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the locks to delete the credentials from.
6. From the actions shown for that target, select **Delete all credentials**.
7. Set the **User index** whose credentials should be removed.
8. Select **Save**.

### Options in the UI

{% options_ui %}
User index:
  description: The user slot index whose credentials should all be removed.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.delete_all_credentials`. A basic example looks like this:

{% example %}
action: |
  action: zwave_js.delete_all_credentials
  target:
    entity_id: lock.front_door
  data:
    user_id: 1
{% endexample %}

### Options in YAML

{% options_yaml %}
user_id:
  description: The user slot index whose credentials should all be removed.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

## Good to know

- The user is kept and can have new credentials added later.
- To remove the user as well, use the [Delete user](/actions/zwave_js.delete_user/) action.

{% include actions/stuck.md %}

{% include actions/related.md %}
