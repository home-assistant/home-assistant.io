---
title: "Trigger automation"
action: abode.trigger_automation
domain: abode
description: "Triggers an automation on your Abode system."
related_actions:
  - abode.capture_image
  - abode.change_setting
---

The **Trigger automation** action triggers an automation that is set up in your Abode system.

Abode automations are represented in Home Assistant as switch entities, so you select the switch that matches the automation you want to run.

{% include actions/ui_header.md %}

To trigger an Abode automation from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Abode: Trigger automation**.
6. Select the **Entity** for the Abode automation to trigger.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: The switch, or switches, that represent the Abode automations to trigger.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `abode.trigger_automation`. A basic example looks like this:

{% example %}
action: |
  action: abode.trigger_automation
  data:
    entity_id: switch.away_mode
{% endexample %}

This triggers the Abode automation represented by `switch.away_mode`.

### Options in YAML

{% options_yaml %}
entity_id:
  description: >
    The entity ID, or list of entity IDs, of the switches that represent your
    Abode automations.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
