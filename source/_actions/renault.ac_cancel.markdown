---
title: "Cancel the air conditioning of a Renault vehicle"
action: renault.ac_cancel
domain: renault
description: "Cancels the air conditioning of a Renault vehicle."
related_actions:
  - renault.ac_start
  - renault.ac_set_schedules
---

Use this action to cancel the air conditioning of a Renault vehicle, for example to stop pre-conditioning the cabin.

Air conditioning control may require an active subscription, such as the *Pack EV Remote Control*, and is not available on all vehicles.

{% include actions/ui_header.md %}

To cancel the air conditioning from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for the action **Renault: Cancel A/C** and select it.
6. Select the vehicle in the **Vehicle** field.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Vehicle:
  description: The Renault vehicle to send the command to.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `renault.ac_cancel`. A basic example looks like this:

{% example %}
action: |
  action: renault.ac_cancel
  data:
    vehicle: abcde1234567890abcde1234567890ab
{% endexample %}

### Options in YAML

{% options_yaml %}
vehicle:
  description: The ID of the Renault vehicle to send the command to.
  required: true
  type: string
{% endoptions_yaml %}

This action does not support targets. Select the vehicle through the **Vehicle** field.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
