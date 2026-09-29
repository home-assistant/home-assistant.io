---
title: "Clear a Matter lock credential"
action: matter.clear_lock_credential
domain: matter
description: "Removes a credential, such as a PIN, from a Matter lock."
related_actions:
  - matter.set_lock_credential
  - matter.get_lock_credential_status
  - matter.clear_lock_user
---

Use this action to remove a single credential, such as a PIN code or an RFID tag, from a Matter lock. A common use is to revoke one credential while keeping the user and their other credentials in place.

{% include actions/ui_header.md %}

To clear a lock credential from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the lock you want to manage.
6. From the actions shown for that target, select **Clear a Matter lock credential**.
7. Set the **Credential type** and **Credential index** to remove.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Credential type:
  description: The type of credential to remove. See the credential types on the Set a Matter lock credential action.
Credential index:
  description: The credential slot index (0-based) to clear.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `matter.clear_lock_credential`. A basic example looks like this:

{% example %}
action: |
  action: matter.clear_lock_credential
  target:
    entity_id: lock.front_door
  data:
    credential_type: pin
    credential_index: 1
{% endexample %}

### Options in YAML

{% options_yaml %}
credential_type:
  description: The type of credential to remove. See the credential types on the [Set a Matter lock credential](/actions/matter.set_lock_credential/) action.
  required: true
  type: string
credential_index:
  description: The credential slot index (0-based) to clear.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action removes only the credential you specify. The user it belonged to stays on the lock, along with any of their other credentials. To remove a user and all their credentials, use the [Clear a Matter lock user](/actions/matter.clear_lock_user/) action.

{% include actions/stuck.md %}

{% include actions/related.md %}
