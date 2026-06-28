---
title: "Delete a PIN code from a Schlage lock"
action: schlage.delete_code
domain: schlage
description: "Deletes a PIN code from a Schlage lock."
related_actions:
  - schlage.add_code
  - schlage.get_codes
---

Use this action to delete a PIN code from a Schlage lock, for example to revoke access for a guest who no longer needs it.

{% include actions/ui_header.md %}

To delete a PIN code from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Schlage lock.
6. From the actions shown for that target, select **Schlage: Delete PIN code**.
7. Enter the **PIN name** of the code to delete.
8. Select **Save**.

### Options in the UI

{% options_ui %}
PIN name:
  description: The name of the PIN code to delete. The name is matched regardless of capitalization.
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

### Options in YAML

{% options_yaml %}
name:
  description: The name of the PIN code to delete. The name is matched regardless of capitalization.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
