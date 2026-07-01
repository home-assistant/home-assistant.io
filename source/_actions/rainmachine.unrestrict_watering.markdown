---
title: "Unrestrict all watering"
action: rainmachine.unrestrict_watering
domain: rainmachine
description: "Removes all watering restrictions."
related_actions:
  - rainmachine.restrict_watering
---

The **Unrestrict all watering** action removes any watering restriction on a RainMachine controller that was set with [Restrict all watering](/actions/rainmachine.restrict_watering/). After this, watering can start again according to the controller's schedule.

{% include actions/ui_header.md %}

To remove watering restrictions from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **RainMachine: Unrestrict all watering**.
6. Select the **Controller**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Controller:
  description: The controller whose watering activities should be unrestricted.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rainmachine.unrestrict_watering`. A basic example looks like this:

{% example %}
action: |
  action: rainmachine.unrestrict_watering
  data:
    device_id: 4de41b1e3d8f0b6e3c0e2a3b1f5a7c9d
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The controller whose watering activities should be unrestricted.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
