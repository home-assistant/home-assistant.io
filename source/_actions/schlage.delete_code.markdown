---
title: "Delete a PIN code from a Schlage lock"
action: schlage.delete_code
domain: schlage
description: "Deletes a PIN code from a Schlage lock."
related_actions:
  - schlage.add_code
  - schlage.get_codes
  - schlage.update_code
---

Use this action to delete a PIN code from a Schlage lock, for example to revoke access for a guest who no longer needs it.

You can identify the PIN by its name or by its access code ID. Do not provide both — if you do, you get an error: _Provide either name or access_code_id, not both._

{% include actions/ui_header.md %}

To delete a PIN code from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Schlage lock.
6. From the actions shown for that target, select **Schlage: Delete PIN code**.
7. Enter the **PIN name** or **Access code ID** of the code to delete.
8. Select **Save**.

### Options in the UI

{% options_ui %}
PIN name:
  description: The name of the PIN code to delete. The name is matched regardless of capitalization.
  required: false
Access code ID:
  description: The access code ID to delete. More stable than the name. Either name or access_code_id is required.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `schlage.delete_code`. A basic example looks like this:

{% example %}
action: |
  action: schlage.delete_code
  target:
    entity_id: lock.front_door
  data:
    name: Example Person
{% endexample %}

To delete by access code ID:

{% example %}
action: |
  action: schlage.delete_code
  target:
    entity_id: lock.front_door
  data:
    access_code_id: "93ab517c-0000-0000-0000-000000000000"
{% endexample %}

### Options in YAML

{% options_yaml %}
name:
  description: The name of the PIN code to delete. The name is matched regardless of capitalization.
  required: false
  type: string
access_code_id:
  description: The access code ID to delete. More stable than the name. Either name or access_code_id is required.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
