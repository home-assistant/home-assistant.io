---
title: "Start charging a Renault vehicle"
action: renault.charge_start
domain: renault
description: "Starts charging a Renault vehicle."
related_actions:
  - renault.charge_set_schedules
---

Use this action to start charging a Renault vehicle, for example to begin charging right away or at a scheduled time.

Charge control may require an active subscription, such as the *Pack EV Remote Control*, and is not available on all vehicles.

{% include actions/ui_header.md %}

To start charging from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for the action **Renault: Start charging** and select it.
6. Select the vehicle in the **Vehicle** field. Optionally, set **When** to schedule the start.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Vehicle:
  description: The Renault vehicle to send the command to.
When:
  description: The time at which charging starts. Defaults to now.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `renault.charge_start`. A basic example looks like this:

{% example %}
action: |
  action: renault.charge_start
  data:
    vehicle: abcde1234567890abcde1234567890ab
{% endexample %}

### Options in YAML

{% options_yaml %}
vehicle:
  description: The ID of the Renault vehicle to send the command to.
  required: true
  type: string
when:
  description: The time at which charging starts. Defaults to now.
  required: false
  type: datetime
{% endoptions_yaml %}

This action does not support targets. Select the vehicle through the **Vehicle** field.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
