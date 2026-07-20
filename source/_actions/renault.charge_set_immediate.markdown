---
title: "Set a Renault vehicle to immediate charging mode"
action: renault.charge_set_immediate
domain: renault
description: "Sets a Renault vehicle to immediate charging mode."
related_actions:
  - renault.charge_start
  - renault.charge_set_schedules
---

Use this action to set a Renault electric vehicle to immediate charging mode, so charging can start as soon as the vehicle is plugged in and ready.

Charge control may require an active subscription, such as the *Pack EV Remote Control*, and is not available on all vehicles.

{% include actions/ui_header.md %}

To set immediate charging from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for the action **Renault: Set immediate charging** and select it.
6. Select the vehicle in the **Vehicle** field.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Vehicle:
  description: The Renault vehicle to send the command to.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `renault.charge_set_immediate`. A basic example looks like this:

{% example %}
action: |
  action: renault.charge_set_immediate
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
